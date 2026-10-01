import { getSessionCookie } from "better-auth/cookies";
import { canAuthenticate, getAuth } from "@/server/auth";
import { reserveStream, subscribeChanges } from "@/server/live";
import { getEnv } from "@/lib/env";
import { scopeSchema } from "@/lib/live";
import { liveScopes, roles } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const baseHeaders = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  if (!canAuthenticate()) return new Response(null, { status: 503, headers: baseHeaders });
  const origin = request.headers.get("origin");
  const expectedOrigin = new URL(process.env.BETTER_AUTH_URL || getEnv().NEXT_PUBLIC_SITE_URL).origin;
  if ((origin && origin !== expectedOrigin) || request.headers.get("sec-fetch-site") === "cross-site") return new Response(null, { status: 403, headers: baseHeaders });
  const parsed = scopeSchema.safeParse(new URL(request.url).searchParams.get("scope") ?? liveScopes.public);
  if (!parsed.success) return new Response(null, { status: 400, headers: baseHeaders });
  const readSession = () => getAuth().api.getSession({ headers: request.headers, query: { disableCookieCache: true, disableRefresh: true } });
  let session;
  try { session = getSessionCookie(request.headers) ? await readSession() : null; }
  catch { return new Response(null, { status: 503, headers: baseHeaders }); }
  if (parsed.data !== liveScopes.public && !session) return new Response(null, { status: 401, headers: baseHeaders });
  if (parsed.data === liveScopes.admin && session?.user.role !== roles.admin) return new Response(null, { status: 403, headers: baseHeaders });
  const userId = session?.user.id ?? null;
  const role = session?.user.role ?? null;
  const release = reserveStream(userId);
  if (!release) return new Response(null, { status: 429, headers: { ...baseHeaders, "Retry-After": "30" } });
  const releaseStream = release;
  let handleClose = () => { releaseStream(); };
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      let isClosed = false;
      let isChecking = false;
      let pending = 0;
      let queue = Promise.resolve();
      let unsubscribe = () => {};
      function closeStream() {
        if (isClosed) return;
        isClosed = true;
        if (heartbeat) clearInterval(heartbeat);
        if (lifetime) clearTimeout(lifetime);
        unsubscribe(); releaseStream();
        request.signal.removeEventListener("abort", closeStream);
        try { controller.close(); } catch { /* Already cancelled by the consumer. */ }
      }
      handleClose = closeStream;
      function sendEvent(value: string) {
        if (isClosed) return;
        if (controller.desiredSize !== null && controller.desiredSize <= 0) { closeStream(); return; }
        try { controller.enqueue(encoder.encode(value)); } catch { closeStream(); }
      }
      async function verifySession() {
        if (!userId) return true;
        try {
          const current = await readSession();
          if (current?.user.id === userId && current.user.role === role) return true;
        } catch { /* Never retain private access on an unverifiable session. */ }
        sendEvent("event: reset\ndata: {}\n\n");
        closeStream(); return false;
      }
      unsubscribe = subscribeChanges((notice) => {
        const isPublic = notice.audience === "public";
        const canReceive = isPublic || (parsed.data !== liveScopes.public && (notice.audience === `user:${userId}` || (parsed.data === liveScopes.admin && notice.audience === "admin")));
        if (!canReceive || isClosed) return;
        if (pending >= 32) { closeStream(); return; }
        pending += 1;
        queue = queue.then(async () => {
          if (!isClosed && (isPublic || await verifySession())) sendEvent(`event: change\ndata: ${JSON.stringify({ topic: notice.topic, id: notice.id })}\n\n`);
        }).catch(closeStream).finally(() => { pending -= 1; });
      });
      request.signal.addEventListener("abort", closeStream, { once: true });
      const heartbeat = setInterval(() => {
        if (isChecking || isClosed) return;
        isChecking = true;
        void verifySession().then((isValid) => { if (isValid) sendEvent(": heartbeat\n\n"); }).finally(() => { isChecking = false; });
      }, 20_000);
      const lifetime = setTimeout(() => { sendEvent("event: renew\ndata: {}\n\n"); closeStream(); }, 5 * 60_000);
      sendEvent("retry: 1000\n: connected\n\n");
      if (request.signal.aborted) closeStream();
    },
    cancel() { handleClose(); },
  });
  return new Response(stream, { headers: { ...baseHeaders, "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-store, no-transform", "X-Accel-Buffering": "no" } });
}
