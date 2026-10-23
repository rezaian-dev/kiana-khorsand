import { NextResponse, type NextRequest } from "next/server";

/**
 * Marks anonymous page responses as safe to keep for offline reading.
 *
 * Every public page renders the account menu, so its HTML is personalized the moment a
 * session exists: caching it would leave one person's name on a shared device. Rather
 * than guess on the client, the server states the fact — this header is set only when
 * the request carries no session cookie, and the service worker caches navigations
 * only when it sees it.
 *
 * Next.js 16 proxy (the renamed middleware):
 * https://nextjs.org/docs/app/api-reference/file-conventions/proxy
 */
const SESSION_COOKIE = /(^|__Secure-|__Host-)better-auth\./;

function hasSessionCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some(
      (cookie) => SESSION_COOKIE.test(cookie.name) && cookie.value.length > 0,
    );
}

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (request.method === "GET" && !hasSessionCookie(request)) {
    response.headers.set("x-offline-cacheable", "1");
  }
  return response;
}

export const config = {
  // Pages only: never assets, never the API, never the private panels.
  matcher: [
    "/((?!api|_next|assets|admin|dashboard|icon|sw\\.js|manifest|robots|sitemap|screenshot).*)",
  ],
};
