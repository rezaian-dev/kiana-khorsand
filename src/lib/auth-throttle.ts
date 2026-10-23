import "server-only";
import { createHmac } from "node:crypto";
import { db } from "@/db/client";
import { env } from "@/lib/env";

type AuthAttemptKind = "sign-in" | "sign-up";

/** Windows and ceilings live in one place; both entry points share the counter. */
const WINDOW_MS: Record<AuthAttemptKind, number> = {
  "sign-in": 15 * 60_000,
  "sign-up": 24 * 60 * 60_000,
};
const LIMIT: Record<AuthAttemptKind, number> = {
  "sign-in": env.AUTH_SIGNIN_LIMIT,
  "sign-up": 3,
};

/**
 * Counts one credential attempt and reports whether the caller is over the ceiling.
 *
 * Per OWASP's Authentication Cheat Sheet the counter is keyed on the phone number
 * (never the account alone, so one attacker cannot lock a victim out from another
 * address) hashed with an HMAC and bucketed into a fixed window — the database only
 * ever sees opaque keys.
 * https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
 */
export async function registerAuthAttempt(
  kind: AuthAttemptKind,
  phone: string,
  scope = "",
) {
  const windowMs = WINDOW_MS[kind];
  const key = createHmac("sha256", env.BETTER_AUTH_SECRET)
    .update(`${kind}:${phone}:${scope}:${Math.floor(Date.now() / windowMs)}`)
    .digest("hex");

  const record = await db
    .collection<{ key: string; count: number }>("limits")
    .findOneAndUpdate(
      { key },
      {
        $inc: { count: 1 },
        $setOnInsert: { expiresAt: new Date(Date.now() + windowMs * 2) },
      },
      { upsert: true, returnDocument: "after" },
    );

  return Boolean(record && record.count > LIMIT[kind]);
}

/** Better Auth throws `APIError` with `statusCode: 429` when the hook blocks a try. */
export function isRateLimited(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { statusCode?: number }).statusCode === 429
  );
}

/** Shared Persian copy so the four sign-in surfaces never drift apart. */
export const authCopy = {
  credentials: "شماره یا رمز عبور درست نیست.",
  throttled:
    "تلاش‌های ورود بیش از حد مجاز است؛ چند دقیقه بعد دوباره امتحان کنید.",
  signUpThrottled:
    "ثبت‌نام‌های این شماره بیش از حد مجاز است؛ فردا دوباره تلاش کنید.",
} as const;
