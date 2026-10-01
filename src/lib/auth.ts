import { z } from "zod";
import { phoneSchema } from "./records";

const emailSchema = z.string().trim().toLowerCase().pipe(z.email({ error: "یک ایمیل معتبر وارد کنید." }).max(254, "ایمیل بیش از حد طولانی است."));
const passwordSchema = z.string().min(8, "رمز باید دست‌کم ۸ نویسه داشته باشد.").max(128, "رمز باید حداکثر ۱۲۸ نویسه داشته باشد.");
export const credentialsSchema = z.object({ name: z.string().trim().max(80, "نام را کوتاه‌تر بنویسید."), email: emailSchema, password: passwordSchema });
export const signInSchema = credentialsSchema.omit({ name: true });
export const signUpSchema = credentialsSchema.refine((value) => value.name.length >= 2, { path: ["name"], error: "نام را دست‌کم در دو نویسه بنویسید." });
export const profileSchema = z.object({ name: z.string().trim().min(2, "نام را کامل‌تر بنویسید.").max(80, "نام را کوتاه‌تر بنویسید."), phone: phoneSchema });
export const passwordChangeSchema = z.object({ currentPassword: passwordSchema, newPassword: passwordSchema });
export type Credentials = z.infer<typeof credentialsSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type PasswordChange = z.infer<typeof passwordChangeSchema>;

export function getMessage(error: { status?: number; code?: string } | null) {
  if (error?.status === 429) return "تلاش‌ها زیاد شده است؛ کمی صبر کنید و دوباره تلاش کنید.";
  if (error?.status === 503 || (error?.status && error.status >= 500)) return "سرویس فعلاً در دسترس نیست؛ کمی بعد دوباره تلاش کنید.";
  if (error?.code === "INVALID_FIELDS") return "اطلاعات واردشده معتبر نیست؛ فیلدها را بررسی کنید.";
  return "درخواست انجام نشد؛ اطلاعات ورود را بررسی کنید یا دوباره تلاش کنید.";
}
