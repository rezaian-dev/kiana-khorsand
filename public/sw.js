/* Kiana Khorsand PWA — lightweight offline cache */
const CACHE_NAME = "kiana-v1";
const OFFLINE_URL = "/offline";
const PRECACHE = [
  "/",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/icon.svg",
  "/og-image.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // API & auth: network only
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/_next/webpack")) return;

  // Navigate requests: network-first, fallback to cache/offline
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match(OFFLINE_URL) || caches.match("/")))
    );
    return;
  }

  // Assets: cache-first
  if (url.pathname.startsWith("/assets/") || url.pathname.match(/\.(png|jpg|jpeg|svg|webp|avif|woff2|css|js)$/)) {
    event.respondWith(
      caches.match(req).then((cached) =>
        cached ||
        fetch(req)
          .then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => cached)
      )
    );
  }
});
