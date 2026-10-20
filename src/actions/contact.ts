"use server";

import { contactInput, normalizeContactPhone } from "@/validations/contact";

import type { ContactState } from "@/types/contact";

import { collection } from "@/db/collections";
import { getSession } from "@/lib/session";
import { throttle } from "@/lib/throttle";

export async function sendContact(
  _previous: ContactState,
  data: FormData,
): Promise<ContactState> {
  const session = await getSession();
  const raw = Object.fromEntries(data.entries());
  const parsed = contactInput.safeParse({
    ...raw,
    phone: normalizeContactPhone(raw.phone),
  });
  if (!parsed.success)
    return {
      error: "اطلاعات فرم را بررسی و دوباره تلاش کنید.",
      success: false,
    };
  if (!(await throttle("contact", 5)))
    return {
      error: "تعداد پیام‌ها بیش از حد مجاز است؛ بعداً دوباره تلاش کنید.",
      success: false,
    };
  await collection("contacts").insertOne({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    subject: parsed.data.subject,
    body: parsed.data.message,
    status: "new",
    createdAt: new Date(),
    ...(session ? { userId: session.user.id } : {}),
  });
  return { error: "", success: true };
}
