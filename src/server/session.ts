import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { getSessionCookie } from "better-auth/cookies";
import { roles } from "../lib/constants.ts";
import { getAuth } from "./auth.ts";

export class AccessError extends Error {
  readonly code: "unauthorized" | "forbidden";
  constructor(code: "unauthorized" | "forbidden") {
    super(code === "unauthorized" ? "برای ادامه وارد حساب شوید." : "اجازهٔ دسترسی به این بخش را ندارید.");
    this.name = "AccessError";
    this.code = code;
  }
}

// Request-local RSC memoization only, never a global/shared session cache.
export const getSession = cache(async function readSession() {
  const requestHeaders = await headers();
  if (!getSessionCookie(requestHeaders)) return null;
  return getAuth().api.getSession({
    headers: requestHeaders,
    query: { disableCookieCache: true, disableRefresh: true },
  });
});

export async function requireSession() {
  const session = await getSession();
  if (!session) throw new AccessError("unauthorized");
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  if (session.user.role !== roles.admin) throw new AccessError("forbidden");
  return session;
}
