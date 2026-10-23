/* Kiana Khorsand service worker.
 *
 * Strategy, in one paragraph: the shell and static files are cached first so the app
 * opens instantly and keeps opening offline; page navigations go to the network and are
 * only *kept* when the server marked them anonymous (`x-offline-cacheable`), so a
 * signed-in render never ends up on disk; private routes are never cached and fall back
 * to the offline screen. Anything that cannot be answered from the network or the cache
 * gets the offline page instead of the browser's error screen.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
 * https://developer.chrome.com/docs/workbox/caching-strategies-overview
 */

const CACHE_VERSION = "kiana-v2026-10-25";
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      // One missing file must not abort the whole install, which would leave no worker.
      .then((cache) =>
        Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => {}))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== PAGE_CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
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

  // Private pages: straight to the network, never cached, offline screen when it fails.
  if (isPrivate(url.pathname)) {
    if (request.mode === "navigate") {
      event.respondWith(
        fetch(request).catch(async () => {
          const offline = await caches.match(OFFLINE_URL);
          return (
            offline ||
            new Response("Offline", {
              status: 503,
              headers: { "content-type": "text/plain; charset=utf-8" },
            })
          );
        }),
      );
    }
    return;
  }

  // Navigations: network first, keep only what the server called anonymous.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cacheable =
            response.ok && response.headers.get("x-offline-cacheable") === "1";
          if (cacheable) {
            const copy = response.clone();
            caches
              .open(PAGE_CACHE)
              .then((cache) => cache.put(request, copy))
              .then(trimPages);
          }
          return response;
        })
        .catch(async () => {
          // A query string must not cost the reader the page they already have.
          const cached = await caches.match(request, { ignoreSearch: true });
          return cached || (await caches.match(OFFLINE_URL));
        }),
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
                .then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
  }
});
