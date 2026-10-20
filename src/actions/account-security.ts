"use server";

import { headers } from "next/headers";
import { requireUser } from "@/lib/session";
import { auth } from "@/lib/auth";
import { throttle } from "@/lib/throttle";
import { changePasswordInput } from "@/validations/account-security";
import type { PanelState } from "@/types/dashboard";

export async function changeAccountPassword(
  _previous: PanelState,
  form: FormData,
): Promise<PanelState> {
  const { user } = await requireUser();
  const parsed = changePasswordInput.safeParse(Object.fromEntries(form));
  if (!parsed.success)
    return {
      error:
        "رمز جدید باید دست‌کم ۸ نویسه شامل حرف و رقم باشد و با تکرار آن یکسان باشد.",
      success: false,
    };
  if (!(await throttle(`password-change:${user.id}`, 8)))
    return {
      error: "تعداد تلاش‌ها زیاد است؛ بعداً دوباره امتحان کنید.",
      success: false,
    };
  try {
    await auth.api.changePassword({
      body: {
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        revokeOtherSessions: false,
      },
      headers: await headers(),
    });
  } catch {
    return {
      error: "رمز کنونی صحیح نیست یا تغییر رمز انجام نشد.",
      success: false,
    };
  }
  try {
    await auth.api.revokeOtherSessions({ headers: await headers() });
  } catch {
    return {
      error:
        "رمز تغییر کرد، اما ابطال نشست‌های دیگر کامل نشد؛ برای بررسی امنیت حساب با پشتیبانی تماس بگیرید.",
      success: false,
    };
  }
  return { error: "", success: true };
}
