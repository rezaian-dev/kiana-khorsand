"use client";
import { useEffect } from "react";

/**
 * Registers the service worker and keeps it current.
 *
 * `updateViaCache: "none"` is what the Next.js PWA guide asks for: the worker file is
 * always re-fetched, so a fixed version reaches an installed app on the next launch
 * instead of hiding behind the HTTP cache. On top of that we push a newly installed
 * worker to take over at once (`SKIP_WAITING`) — an installed app can sit on a stale
 * worker for days otherwise, which is how a fixed bug keeps happening on a phone that
 * already downloaded the fix.
 *
 * https://nextjs.org/docs/app/guides/progressive-web-apps#handling-service-worker-updates
 */
export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !window.isSecureContext) return;

    const promote = (registration: ServiceWorkerRegistration) => {
      registration.waiting?.postMessage({ type: "SKIP_WAITING" });
    };

    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((registration) => {
        promote(registration);
        registration.addEventListener("updatefound", () => {
          registration.installing?.addEventListener("statechange", () => {
            if (registration.waiting) promote(registration);
          });
        });

        // A backgrounded app is the one that comes back stale: check on return.
        const check = () => {
          if (document.visibilityState === "visible") registration.update();
        };
        document.addEventListener("visibilitychange", check);
        return () => document.removeEventListener("visibilitychange", check);
      })
      .catch(() => {
        // Registration fails in private modes and on insecure origins; the site
        // works exactly the same without it, so there is nothing to report.
      });
  }, []);

  return null;
}
