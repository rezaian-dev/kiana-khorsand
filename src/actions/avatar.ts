"use server";

import { Binary } from "mongodb";
import sharp from "sharp";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { requireUser } from "@/lib/session";
import { collection } from "@/db/collections";
import { avatarFileSchema } from "@/validations/avatar";
import { throttle } from "@/lib/throttle";

export type AvatarState = { error: string; image: string };

/** Validate size and decoded format on the server, strip metadata and store a tiny image in MongoDB. */
export async function uploadAvatar(
  _previous: AvatarState,
  form: FormData,
): Promise<AvatarState> {
  const session = await requireUser();
  const file = avatarFileSchema.safeParse(form.get("avatar"));
  if (!file.success)
    return {
      error: "تصویر JPG، PNG یا WebP تا سقف ۷۵۰ کیلوبایت انتخاب کنید.",
      image: "",
    };
  if (!(await throttle(`avatar:${session.user.id}`, 8)))
    return {
      error: "تعداد تغییرهای عکس زیاد است؛ کمی بعد دوباره تلاش کنید.",
      image: "",
    };
  let webp: Buffer;
  try {
    const raw = Buffer.from(await file.data.arrayBuffer());
    const processor = sharp(raw, {
      limitInputPixels: 16_000_000,
      failOn: "error",
    });
    const metadata = await processor.metadata();
    if (
      !metadata.width ||
      !metadata.height ||
      metadata.width < 80 ||
      metadata.height < 80 ||
      !["jpeg", "png", "webp"].includes(metadata.format)
    )
      return {
        error: "این تصویر قابل استفاده نیست؛ تصویر دیگری انتخاب کنید.",
        image: "",
      };
    webp = await processor
      .rotate()
      .resize(320, 320, { fit: "cover", position: "attention" })
      .webp({ quality: 78, effort: 4 })
      .toBuffer();
    if (webp.length > 200_000)
      return { error: "خروجی تصویر بیش از حد بزرگ است.", image: "" };
  } catch {
    return { error: "تصویر خوانده نشد؛ فایل دیگری انتخاب کنید.", image: "" };
  }
  const id = session.user.id;
  const image = `/api/avatars/${id}?v=${Date.now()}`;
  // Keep a single image per user, not an unbounded set of uploads.
  await collection("avatars").updateOne(
    { userId: id },
    { $set: { image: new Binary(webp), updatedAt: new Date() } },
    { upsert: true },
  );
  try {
    await auth.api.updateUser({ headers: await headers(), body: { image } });
  } catch {
    return { error: "ذخیرهٔ عکس حساب انجام نشد؛ دوباره تلاش کنید.", image: "" };
  }
  revalidatePath("/dashboard/settings");
  return { error: "", image };
}
