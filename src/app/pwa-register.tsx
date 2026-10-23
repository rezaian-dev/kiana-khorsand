"use client";
import { useEffect } from "react";

/**
 * Registers the service worker once the page is interactive.
 *
 * `updateViaCache: "none"` is what the Next.js PWA guide asks for: the worker file is
 * always re-fetched, so a fixed version reaches an installed app on the next launch
 * instead of hiding behind the HTTP cache.
 * https://nextjs.org/docs/app/guides/progressive-web-apps#handling-service-worker-updates
 */
export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || !window.isSecureContext) return;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch(() => {
        // Registration fails in private modes and on insecure origins; the site
        // works exactly the same without it, so there is nothing to report.
      });
  }, []);
  return null;
}
