"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { authCopy, isRateLimited } from "@/lib/auth-throttle";
import { parseAdminCredentials } from "@/validations/admin-auth";
import { collection } from "@/db/collections";
import type { AuthState } from "@/types/auth";

/**
 * Administrator sign-in — the only way into `/admin`.
 *
 * Order of operations matters:
 * 1. Validate the submitted phone/password shape.
 * 2. Sign in with Better Auth (phone-based username plugin — the site has no email
 *    sign-in; `/sign-in/email` is disabled in `lib/auth.ts`). The per-phone throttle
 *    lives in the auth hook, so this entrance shares the public form's budget and can
 *    never become a faster way to guess a password.
 * 3. Read the role from the returned user. If it is not `admin`, the freshly created
 *    session is destroyed immediately and the visitor is told the account has no
 *    access. No cookie for a non-admin ever survives this action.
 *
 * Better Auth server-side API:
 * https://www.better-auth.com/docs/concepts/session
 */
export async function adminLoginAction(
  _state: AuthState,
  form: FormData,
): Promise<AuthState> {
  const { phone, password, fields } = parseAdminCredentials(form);
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

  // `signInUsername` returns the plugin's base user shape, so the role is read from
  // the same document Better Auth just authenticated instead of trusting the payload.
  const account = await collection("users").findOne(
    { username: phone },
    { projection: { role: 1 } },
  );

  if (account?.role !== "admin") {
    // Undo the sign-in: an ordinary account must not hold a session created from the
    // administrator entrance.
    await auth.api.signOut({ headers: await headers() }).catch(() => {});
    return {
      error: "این حساب دسترسی مدیریت ندارد. از صفحهٔ ورود کاربران وارد شوید.",
      fields: {},
    };
  }

  redirect("/admin");
}

/** Leaves the admin area. Kept separate from the public sign-out for clarity. */
export async function adminSignOutAction() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/admin/login");
}
