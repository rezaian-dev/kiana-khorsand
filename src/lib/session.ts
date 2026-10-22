import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/** Routes that are allowed to receive a `next` target after signing in. */
const PUBLIC_RETURN_PATHS = [/^\/testimonials$/, /^\/workshops\/[a-z0-9-]{1,100}$/];

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

export const isAdminSession = (
  session: Awaited<ReturnType<typeof getSession>>,
): session is NonNullable<typeof session> & { user: { role: "admin" } } =>
  session?.user.role === "admin";

export async function requireUser() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

/**
 * Guard for the administrator area.
 *
 * The admin panel is a separate entrance: an unauthenticated visitor is sent to
 * `/admin/login` (not the public `/login`), and a signed-in non-admin is sent to the
 * user dashboard. This keeps the two sign-in paths from ever sharing a session
 * exchange — see docs/admin-separation.md.
 *
 * Next.js redirect in Server Components / Server Actions:
 * https://nextjs.org/docs/app/api-reference/functions/redirect
 */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (session.user.role !== "admin") redirect("/dashboard");
  return session;
}

/** Resolves the signed-in administrator, or `null` — never redirects. */
export async function getAdminSession() {
  const session = await getSession();
  return isAdminSession(session) ? session : null;
}

/** Keeps post-login return targets inside the public site. */
export function safeReturnPath(value: FormDataEntryValue | null) {
  return typeof value === "string" &&
    PUBLIC_RETURN_PATHS.some((pattern) => pattern.test(value))
    ? value
    : "/dashboard";
}
