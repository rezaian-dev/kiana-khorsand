/* Kiana Khorsand service worker.
 *
 * Strategy, in one paragraph: the shell and static files are cached first so the app
 * opens instantly and keeps opening offline; page navigations go to the network and are
 * only *kept* when the server marked them anonymous (`x-offline-cacheable`), so a
 * signed-in render never ends up on disk; private routes are never cached.
 *
 * The hard rule below: **every intercepted request must resolve to a real Response.**
 * A worker that answers a navigation with `undefined` makes Chrome show its own
 * "This page couldn't load" screen, which is exactly what happens when the offline page
 * is missing from the cache. `offlineDocument()` therefore has three fallbacks and
 * always returns HTML we control.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 * https://developer.chrome.com/docs/workbox/caching-strategies-overview
 */

const CACHE_VERSION = "kiana-v2026-10-26";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const OFFLINE_URL = "/offline";
/** Static shell the app needs to open at all. */
const PRECACHE = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
];
/** Pages kept for offline reading; oldest go first when the cap is reached. */
const PAGE_LIMIT = 40;
const PRIVATE_PREFIXES = [
  "/admin",
  "/dashboard",
  "/login",
  "/register",
  "/forgot-password",
  "/book",
  "/api/",
];
const STATIC_EXTENSION =
  /\.(?:css|js|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf)$/i;

const isPrivate = (path) =>
  PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

/** Keeps the offline page cache from growing without bound. */
async function trimPages() {
  const cache = await caches.open(PAGE_CACHE);
  const keys = await cache.keys();
  await Promise.all(
    keys
      .slice(0, Math.max(0, keys.length - PAGE_LIMIT))
      .map((key) => cache.delete(key)),
  );
}

/** Caches one URL without ever failing the caller. */
async function precacheOne(url) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    await cache.add(url);
  } catch {
    // A flaky install must not leave the worker half-dead; we retry at activate.
  }
}

/**
 * The offline document, always as a Response.
 *
 * 1. the precached `/offline` page,
 * 2. a live copy of it,
 * 3. an inline screen in the site's own colours.
 */
async function offlineDocument() {
  const cached = await caches.match(OFFLINE_URL);
  if (cached) return cached;

  try {
    const live = await fetch(OFFLINE_URL, { cache: "reload" });
    if (live.ok) {
      const copy = live.clone();
      caches
        .open(STATIC_CACHE)
        .then((cache) => cache.put(OFFLINE_URL, copy))
        .catch(() => {});
      return live;
    }
  } catch {
    // fall through to the inline screen
  }

  return new Response(
    `<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0d736b"><title>آفلاین — کیانا خرسند</title>
<style>
:root{color-scheme:light dark}
body{margin:0;min-height:100dvh;display:grid;place-items:center;padding:2rem 1.25rem;
font-family:Vazirmatn,Tahoma,system-ui,sans-serif;text-align:center;
background:radial-gradient(120% 90% at 80% -10%,#e9f5f3,#f8faf9 60%);color:#1d2b33}
@media (prefers-color-scheme:dark){body{background:radial-gradient(120% 90% at 80% -10%,#14313a,#0b1418 60%);color:#eef5f4}}
.card{max-width:26rem;border:1px solid rgb(13 115 107 / .18);border-radius:26px;padding:2rem 1.5rem;
background:#fff;box-shadow:0 30px 70px -50px #0d3b3b}
@media (prefers-color-scheme:dark){.card{background:#121c22;border-color:rgb(255 255 255 / .1)}}
.dot{width:56px;height:56px;margin:0 auto 1rem;border-radius:18px;display:grid;place-items:center;
background:rgb(13 115 107 / .12);color:#0d736b;font-size:24px}
@media (prefers-color-scheme:dark){.dot{color:#6fe0d0;background:rgb(111 224 208 / .14)}}
h1{margin:0 0 .5rem;font-size:1.25rem}
p{margin:0 0 1.25rem;font-size:.85rem;line-height:1.9;color:#5b6b74}
@media (prefers-color-scheme:dark){p{color:#9fb3ba}}
a{display:inline-block;min-height:44px;line-height:44px;padding:0 1.4rem;border-radius:999px;
background:#0d736b;color:#fff;text-decoration:none;font-weight:800;font-size:.85rem}
</style></head><body><main class="card"><div class="dot">⚠</div>
<h1>شما آفلاین هستید</h1>
<p>اتصال برقرار نیست. صفحه‌هایی که قبلاً دیده‌اید از حافظهٔ دستگاه باز می‌شوند.</p>
<a href="/">تلاش دوباره</a></main></body></html>`,
    {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all(PRECACHE.map(precacheOne)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== PAGE_CACHE)
          .map((key) => caches.delete(key)),
      );
      // A previous install may have missed the offline page; try once more.
      if (!(await caches.match(OFFLINE_URL))) await precacheOne(OFFLINE_URL);
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  // Signing out must not leave another person's pages behind on a shared device.
  if (event.data?.type === "CLEAR_PRIVATE_CACHE") {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
    );
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Router payloads: a failed one must fail cleanly, so the app falls back to a
  // full navigation that we can answer. Never let it become an ERR_FAILED.
  if (url.searchParams.has("_rsc") || request.headers.get("rsc") === "1") {
    return;
  }

  // Private pages: straight to the network, never cached, offline screen when it fails.
  if (isPrivate(url.pathname)) {
    if (request.mode === "navigate") {
      event.respondWith(fetch(request).catch(offlineDocument));
    }
    return;
  }

  // Navigations: network first, keep only what the server called anonymous.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (
            response.ok &&
            response.headers.get("x-offline-cacheable") === "1"
          ) {
            const copy = response.clone();
            caches
              .open(PAGE_CACHE)
              .then((cache) => cache.put(request, copy))
              .then(trimPages)
              .catch(() => {});
          }
          return response;
        })
        .catch(async () => {
          // A query string must not cost the reader the page they already have.
          const cached = await caches.match(request, { ignoreSearch: true });
          return cached || offlineDocument();
        })
        .catch(() => offlineDocument()),
    );
    return;
  }

  // Static files: cache first — they are content-hashed, so a hit is always current.
  if (STATIC_EXTENSION.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches
                .open(STATIC_CACHE)
                .then((cache) => cache.put(request, copy))
                .catch(() => {});
            }
            return response;
          }),
      ),
    );
  }
});
