/* Kiana PWA — per https://nextjs.org/docs/app/guides/progressive-web-apps and Workbox strategies */
const CACHE_VERSION = "kiana-v2026-10-24";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const OFFLINE_URL = "/offline";
const PRECACHE = [OFFLINE_URL, "/manifest.webmanifest", "/icon.svg"];

// Install: precache the offline fallback, tolerating a single missing file.
// `cache.addAll` rejects as a whole on one 404, which would abort the install and
// leave the app with no worker at all — so each entry stands on its own.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => {}))),
      )
      .then(() => self.skipWaiting()),
  );
});

// Activate: delete old caches (versioned, F4)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== STATIC_CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// Message: purge private content on sign-out (F4 — Clear-Site-Data alternative via message)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "CLEAR_PRIVATE_CACHE") {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
    );
  }
});

const PRIVATE_PREFIXES = [
  "/dashboard",
  "/admin",
  "/login",
  "/register",
  "/book",
  "/api/",
];

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Private pages are never cached (F4). They still get the offline page when the
  // network is gone — otherwise the installed app would show the browser's error
  // page, which looks like the panel itself is broken.
  if (
    PRIVATE_PREFIXES.some(
      (p) => url.pathname === p || url.pathname.startsWith(`${p}/`),
    )
  ) {
    if (req.mode === "navigate") {
      event.respondWith(
        fetch(req).catch(async () => {
          // Show the offline page instead of the browser's error page, which in an
          // installed app makes the panel itself look broken.
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
  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Navigate: network-first, never cache non-OK or no-store/private, fallback to offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Never cache non-OK or no-store/private per Workbox https://developer.chrome.com/docs/workbox/caching-strategies-overview
          if (!res.ok) return res;
          const cc = res.headers.get("Cache-Control") || "";
          if (/no-store|private/i.test(cc)) return res;
          // Clone and cache only public navigations
          const copy = res.clone();
          caches.open(STATIC_CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() =>
          caches.match(req).then((c) => c || caches.match(OFFLINE_URL)),
        ),
    );
    return;
  }

  // Static assets: cache-first, only if ok
  if (url.pathname.match(/\.(png|jpg|jpeg|svg|webp|avif|woff2|css|js)$/)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req)
            .then((res) => {
              if (res.ok) {
                const copy = res.clone();
                caches.open(STATIC_CACHE).then((c) => c.put(req, copy));
              }
              return res;
            })
            .catch(() => cached),
      ),
    );
  }
});
