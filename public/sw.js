/* Kiana Khorsand service worker.
 *
 * The site must open and move between pages on a dead or censored connection.
 * That is the whole design goal here.
 *
 * Strategy, per request kind:
 *   • pages   — network wins if it answers within `FRESH_MS`, otherwise the cached copy
 *               is served immediately and the network result refreshes the cache behind
 *               the scenes. A page the reader has seen is never lost, and a slow or
 *               blocked network never turns a tap into a browser error screen.
 *   • assets  — cache first. They are content-hashed, so a hit is always current.
 *   • private — network only, never written to disk, offline screen when it fails.
 *
 * Two rules that keep this honest:
 *   1. Every intercepted request resolves to a real `Response`. Answering a navigation
 *      with `undefined` is a hard network failure (`net::ERR_FAILED`) and Chrome shows
 *      its own "This page couldn't load" screen — the bug this file exists to prevent.
 *   2. Nothing is written to disk unless the server marked it anonymous
 *      (`x-offline-cacheable`), so a signed-in render never survives a sign-out.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 * https://developer.chrome.com/docs/workbox/caching-strategies-overview
 */

const CACHE_VERSION = "kiana-v2026-10-27";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const OFFLINE_URL = "/offline";

/** How long a navigation waits for a fresh render before falling back to cache. */
const FRESH_MS = 2500;
/** A request that has produced no response by now is treated as failed. */
const DEAD_MS = 7000;

const PRECACHE = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
];

/**
 * Public pages kept on the device at install time, so the app is fully usable
 * offline from the very first launch rather than only for pages already visited.
 */
const PAGES = [
  "/",
  "/about",
  "/approach",
  "/articles",
  "/fees",
  "/contact",
  "/workshops",
  "/faq",
  "/areas",
  "/testimonials",
  "/privacy",
  "/terms",
];

/** Never cached and never read from cache: these render one specific person. */
const PRIVATE_PREFIXES = [
  "/admin",
  "/dashboard",
  "/login",
  "/register",
  "/forgot-password",
  "/book",
  "/api/",
];

const PAGE_LIMIT = 40;
const STATIC_EXTENSION =
  /\.(?:css|js|png|jpe?g|gif|svg|webp|avif|ico|woff2?|ttf)$/i;
/** Scripts and styles a rendered page points at, wherever they appear. */
const CHUNK_PATTERN = /\/_next\/static\/[^\s"'<>()\\]+/g;
/** Images a rendered page points at: `src` and every `srcset` candidate. */
const IMAGE_PATTERN = /(?:src|srcset)="([^"]+)"/g;

const IMAGE_OPTIMIZER = "/_next/image";

/**
 * The file behind an optimizer URL.
 *
 * `/_next/image?url=…&w=1080` is one rendition of a picture we can also keep whole.
 * Storing the original once beats storing every width the layout might ask for, and
 * it lets an offline request at any width be answered.
 */
function originalOf(url) {
  const source = url.searchParams.get("url");
  if (!source) return null;
  try {
    const decoded = decodeURIComponent(source);
    return decoded.startsWith("/") ? decoded : null;
  } catch {
    return null;
  }
}

/** Everything a page needs to look finished rather than merely load. */
function assetUrls(html) {
  const urls = new Set(html.match(CHUNK_PATTERN) || []);
  for (const [, value] of html.matchAll(IMAGE_PATTERN)) {
    for (const candidate of value.split(",")) {
      let url = candidate.trim().split(/\s+/)[0].replace(/&amp;/g, "&");
      if (!url.startsWith("/")) continue;
      // Keep the whole picture, not the rendition the layout happened to ask for.
      if (url.startsWith(IMAGE_OPTIMIZER)) {
        url = originalOf(new URL(url, self.location.origin)) || "";
        if (!url) continue;
      }
      urls.add(url);
    }
  }
  return urls;
}

const isPrivate = (path) =>
  PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

const timeout = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`timeout ${ms}ms`)), ms),
  );

/** A request that hangs is worse than one that fails: bound it. */
const fetchWithDeadline = (request, ms = DEAD_MS) =>
  Promise.race([fetch(request), timeout(ms)]);

/**
 * Fetches without touching the HTTP cache, so a refresh really is a refresh.
 *
 * Credentials are dropped on purpose: the copy kept on disk must be the anonymous
 * render, never a page that greets one particular person.
 */
async function fetchFresh(url) {
  const response = await fetch(url, {
    cache: "reload",
    credentials: "omit",
  });
  return response.ok ? response : null;
}

/** Keeps the page cache from growing without bound; oldest entries go first. */
async function trimPages() {
  const cache = await caches.open(PAGE_CACHE);
  const keys = await cache.keys();
  await Promise.all(
    keys
      .slice(0, Math.max(0, keys.length - PAGE_LIMIT))
      .map((key) => cache.delete(key)),
  );
}

/**
 * Stores a navigation the server described as anonymous. Failures are silent:
 * a full disk must never break the page the reader is looking at.
 */
function keepPage(request, response) {
  if (!response.ok || response.headers.get("x-offline-cacheable") !== "1") {
    return response;
  }
  const copy = response.clone();
  caches
    .open(PAGE_CACHE)
    .then((cache) => cache.put(request, copy))
    .then(trimPages)
    .catch(() => {});
  return response;
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
    const live = await fetchFresh(OFFLINE_URL);
    if (live) {
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
.card{max-width:26rem;width:100%;border:1px solid rgb(13 115 107 / .18);border-radius:26px;
padding:2rem 1.5rem;background:#fff;box-shadow:0 30px 70px -50px #0d3b3b}
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

/**
 * A navigation that cannot fail.
 *
 * The fresh render is given a short head start; if it is slower than the reader's
 * patience we hand over the copy we already have. When there is no copy at all the
 * offline screen takes its place, never the browser's error page.
 */
function navigate(event, request) {
  const network = fetchWithDeadline(request)
    .then((response) => keepPage(request, response))
    .catch(() => null);
  // Called before the first await: an event that has already settled rejects this.
  event.waitUntil(network);

  return (async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (!cached) return (await network) || (await offlineDocument());

    const fresh = await Promise.race([
      network,
      new Promise((resolve) => setTimeout(() => resolve(null), FRESH_MS)),
    ]);
    return fresh || cached;
  })();
}

/**
 * Reads a rendered page and keeps the files it depends on.
 *
 * Without this the app opens offline with its markup but none of its styles or
 * scripts: the HTML came from the cache, the chunks were never fetched through a
 * controlled page. Warming them at install time is what makes the promise real.
 */
async function warmPage(pageCache, staticCache, url) {
  try {
    const response = await fetchFresh(url);
    // The server decides what may live on disk; a personalized render never does.
    if (!response || response.headers.get("x-offline-cacheable") !== "1")
      return;
    const html = await response.clone().text();
    await pageCache.put(url, response);

    for (const asset of assetUrls(html)) {
      if (await staticCache.match(asset)) continue;
      await staticCache.add(asset).catch(() => {});
    }
  } catch {
    // A page that misses this round is cached the first time it is opened.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const staticCache = await caches.open(STATIC_CACHE);
      const pageCache = await caches.open(PAGE_CACHE);

      // One unreachable file must not abort the install, which would leave no worker.
      await Promise.all(
        PRECACHE.map((url) => staticCache.add(url).catch(() => {})),
      );

      for (const url of [OFFLINE_URL, ...PAGES]) {
        await warmPage(pageCache, staticCache, url);
      }

      await self.skipWaiting();
    })(),
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
      // An earlier install may have missed the offline page; try once more.
      if (!(await caches.match(OFFLINE_URL))) {
        const response = await fetchFresh(OFFLINE_URL).catch(() => null);
        if (response) {
          const cache = await caches.open(STATIC_CACHE);
          await cache.put(OFFLINE_URL, response).catch(() => {});
        }
      }
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("message", (event) => {
  // A fixed worker must not wait for every tab to close before it takes over.
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
    return;
  }

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

  // Private pages: straight to the network, never cached, offline screen when it fails.
  if (isPrivate(url.pathname)) {
    if (request.mode === "navigate") {
      event.respondWith(
        fetchWithDeadline(request).catch(() => offlineDocument()),
      );
    }
    return;
  }

  if (request.mode === "navigate") {
    // `.catch` on the outside is the last line of defence: `respondWith` given a
    // rejected promise is exactly what produces the browser's error page.
    event.respondWith(navigate(event, request).catch(() => offlineDocument()));
    return;
  }

  // Router payloads: this is what a client-side navigation asks for, and the one
  // request whose failure shows Next.js's own "This page couldn't load" dead end.
  //
  // If the network cannot answer, hand back the cached *document* instead. Next.js
  // sees a non-RSC response and falls back to a full navigation, which lands on the
  // page we already have. A slow reload beats a dead end.
  if (url.searchParams.has("_rsc") || request.headers.get("rsc") === "1") {
    // A prefetch is an optimisation: failing it costs nothing, while handing it a
    // document would put the wrong payload in the router's cache.
    if (
      isPrivate(url.pathname) ||
      request.headers.get("next-router-prefetch") === "1"
    ) {
      return;
    }

    event.respondWith(
      (async () => {
        const fresh = await Promise.race([
          fetchWithDeadline(request).catch(() => null),
          new Promise((resolve) => setTimeout(() => resolve(null), FRESH_MS)),
        ]);
        if (fresh) return fresh;

        return (
          (await caches.match(url.pathname, { ignoreSearch: true })) ||
          (await offlineDocument())
        );
      })(),
    );
    return;
  }

  // Static files: cache first — they are content-hashed, so a hit is always current.
  // An optimized image: the exact rendition if it is stored, else the whole picture.
  if (url.pathname === IMAGE_OPTIMIZER) {
    event.respondWith(
      (async () => {
        const hit = await caches.match(request);
        if (hit) return hit;
        const fresh = await fetch(request).catch(() => null);
        if (fresh) return fresh;
        return (
          (await caches.match(originalOf(url) || "")) ||
          new Response(null, { status: 504 })
        );
      })(),
    );
    return;
  }

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
