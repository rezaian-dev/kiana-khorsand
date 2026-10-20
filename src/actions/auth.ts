"use server";

import type { AuthState } from "@/types/auth";
import { validateRegistration, validateLogin } from "@/validations/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { throttleAuthPhone } from "@/lib/auth-throttle";

function returnAfterAuth(data: FormData) {
  const next = data.get("next");
  return typeof next === "string" &&
    (next === "/testimonials" || /^\/workshops\/[a-z0-9-]{1,100}$/.test(next))
    ? next
    : "/dashboard";
}

export async function registerAction(
  _state: AuthState,
  data: FormData,
): Promise<AuthState> {
  const { name, phone, password, fields } = validateRegistration(data);
  if (Object.keys(fields).length) return { error: "", fields };
  try {
    await throttleAuthPhone("sign-up", phone);
    await auth.api.signUpEmail({
      body: {
        name,
        // Better Auth needs an email for password accounts. The non-routable .invalid
        // address is derived from the normalized phone; no mail/SMS is sent.
        email: `${phone}@accounts.kianakhorsand.invalid`,
        password,
        username: phone,
      },
      headers: await headers(),
    });
  } catch {
    return {
      error: "ثبت‌نام انجام نشد؛ اگر این شماره قبلاً ثبت شده است، وارد شوید.",
      fields: {},
    };
  }
  redirect(returnAfterAuth(data));
}

export async function loginAction(
  _state: AuthState,
  data: FormData,
): Promise<AuthState> {
  const { phone, password, fields } = validateLogin(data);
  if (Object.keys(fields).length) return { error: "", fields };
  try {
    await throttleAuthPhone("sign-in", phone);
    await auth.api.signInUsername({
      body: { username: phone, password },
      headers: await headers(),
    });
  } catch {
    return { error: "شماره یا رمز عبور درست نیست.", fields: {} };
  }
  redirect(returnAfterAuth(data));
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}

/** Public pages stay put after sign-out; protected panels use signOutAction. */
export async function signOutInPlaceAction() {
  await auth.api.signOut({ headers: await headers() });
}
