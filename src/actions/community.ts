"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { MongoServerError } from "mongodb";
import { collection } from "@/db/collections";
import { getSession } from "@/lib/session";
import { throttle } from "@/lib/throttle";
import { workshopPrice } from "@/features/workshops/pricing";
import { reviewInput, workshopRequestInput } from "@/validations/community";

export type CommunityResult = { ok: boolean; message: string };

export async function requestWorkshop(slug: string): Promise<CommunityResult> {
  const session = await getSession();
  if (!session)
    return { ok: false, message: "برای ثبت‌نام ابتدا وارد حساب شوید." };
  const parsed = workshopRequestInput.safeParse({ slug });
  if (!parsed.success) return { ok: false, message: "کارگاه معتبر نیست." };
  if (!(await throttle("workshop-request", 10)))
    return {
      ok: false,
      message: "تعداد درخواست‌های امروز بیش از حد مجاز است.",
    };
  const workshop = await collection("workshops").findOne({
    slug: parsed.data.slug,
    status: "published",
  });
  if (!workshop) return { ok: false, message: "این کارگاه در دسترس نیست." };
  if (workshop.startsAt && workshop.startsAt <= new Date())
    return {
      ok: false,
      message: "مهلت ثبت‌نام این کارگاه به پایان رسیده است.",
    };
  const pricing = workshopPrice(workshop);
  try {
    const result = await collection("enrollments").updateOne(
      { userId: session.user.id, workshopId: workshop.slug },
      {
        $setOnInsert: {
          userId: session.user.id,
          workshopId: workshop.slug,
          status: "pending",
          createdAt: new Date(),
          priceAtRequest: pricing.total,
          discountPercentAtRequest: pricing.percent,
        },
      },
      { upsert: true },
    );
    revalidatePath(`/workshops/${workshop.slug}`);
    return {
      ok: true,
      message: result.upsertedCount
        ? "درخواست ثبت‌نام ثبت شد؛ پس از بررسی با شما هماهنگ می‌شود."
        : "درخواست شما قبلاً ثبت شده است.",
    };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000)
      return { ok: true, message: "درخواست شما قبلاً ثبت شده است." };
    throw error;
  }
}

export async function submitReview(data: FormData): Promise<CommunityResult> {
  const session = await getSession();
  if (!session)
    return { ok: false, message: "برای ثبت تجربه ابتدا وارد حساب شوید." };
  const parsed = reviewInput.safeParse(Object.fromEntries(data));
  if (!parsed.success)
    return {
      ok: false,
      message:
        "متن تجربه باید ۳۰ تا ۶۰۰ نویسه باشد و رضایت انتشار را تأیید کنید.",
    };
  if (!(await throttle("review-submit", 3)))
    return {
      ok: false,
      message: "تعداد تجربه‌های ارسالی امروز بیش از حد مجاز است.",
    };
  await collection("testimonials").insertOne({
    slug: `review-${randomUUID()}`,
    userId: session.user.id,
    name: session.user.name,
    quote: parsed.data.quote,
    category: "تجربهٔ همراهی",
    experience: parsed.data.experience || undefined,
    avatar: null,
    status: "draft",
    createdAt: new Date(),
  });
  return {
    ok: true,
    message: "تجربهٔ شما برای بررسی ثبت شد و بدون تأیید منتشر نمی‌شود.",
  };
}
