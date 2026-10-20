import type { AuthState } from "@/types/auth";

export const normalizePhone = (raw: string) =>
  raw
    .replace(/[۰-۹]/g, (x) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(x)))
    .replace(/[٠-٩]/g, (x) => String("٠١٢٣٤٥٦٧٨٩".indexOf(x)))
    .replace(/\D/g, "");
const phonePattern = /^09\d{9}$/;
const passwordPattern = /^(?=.{8,128}$)(?=.*\d)(?=.*[A-Za-z\u0600-\u06ff]).+$/;

export function validateRegistration(data: FormData) {
  const name = String(data.get("name") ?? "")
    .trim()
    .slice(0, 120);
  const phone = normalizePhone(String(data.get("phone") ?? ""));
  const password = String(data.get("password") ?? "");
  const confirm = String(data.get("confirm") ?? "");
  const fields: AuthState["fields"] = {};
  if (name.length < 3) fields.name = "نام باید دست‌کم ۳ نویسه باشد.";
  if (!phonePattern.test(phone))
    fields.phone = "شماره را به‌شکل ۰۹XXXXXXXXX وارد کنید.";
  if (!passwordPattern.test(password))
    fields.password = "رمز باید دست‌کم ۸ نویسه و شامل حرف و رقم باشد.";
  if (password !== confirm)
    fields.confirm = "تکرار رمز با رمز عبور یکسان نیست.";
  if (data.get("consent") !== "on")
    fields.consent = "برای ادامه شرایط استفاده را بپذیرید.";
  return { name, phone, password, fields };
}

export function validateLogin(data: FormData) {
  const phone = normalizePhone(String(data.get("phone") ?? ""));
  const password = String(data.get("password") ?? "");
  const fields: AuthState["fields"] = {};
  if (!phonePattern.test(phone))
    fields.phone = "شماره را به‌شکل ۰۹XXXXXXXXX وارد کنید.";
  if (!password) fields.password = "رمز عبور را وارد کنید.";
  return { phone, password, fields };
}
