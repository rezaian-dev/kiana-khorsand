"use server";

import type { AuthState } from "@/types/auth";
import { validateRegistration, validateLogin } from "@/validations/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { authCopy, isRateLimited } from "@/lib/auth-throttle";
import { safeReturnPath } from "@/lib/session";

/**
 * Public authentication only. Administrators use this flow like any other customer
 * and land on `/dashboard`; the admin panel has its own entrance (`/admin/login`)
 * and its own action (`actions/admin-auth.ts`).
 */

export async function registerAction(
  _state: AuthState,
  data: FormData,
): Promise<AuthState> {
  const { name, phone, password, fields } = validateRegistration(data);
  if (Object.keys(fields).length) return { error: "", fields };
  try {
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
  } catch (error) {
    return {
      error: isRateLimited(error)
        ? authCopy.signUpThrottled
        : "ثبت‌نام انجام نشد؛ اگر این شماره قبلاً ثبت شده است، وارد شوید.",
      fields: {},
    };
  }
  redirect(safeReturnPath(data.get("next")));
}

export async function loginAction(
  _state: AuthState,
  data: FormData,
): Promise<AuthState> {
  const { phone, password, fields } = validateLogin(data);
  if (Object.keys(fields).length) return { error: "", fields };
  try {
    await auth.api.signInUsername({
      body: { username: phone, password },
      headers: await headers(),
    });
  } catch (error) {
    return {
      error: isRateLimited(error) ? authCopy.throttled : authCopy.credentials,
      fields: {},
    };
  }
  redirect(safeReturnPath(data.get("next")));
}

export async function signOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/");
}

/** Public pages stay put after sign-out; protected panels use signOutAction. */
export async function signOutInPlaceAction() {
  await auth.api.signOut({ headers: await headers() });
}
