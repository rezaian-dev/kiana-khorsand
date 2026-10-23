"use client";

import { useSyncExternalStore } from "react";

const STANDALONE = "(display-mode: standalone)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(STANDALONE);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** `display-mode` covers Android and desktop; iOS reports its own flag. */
function read() {
  const ios = (window.navigator as Navigator & { standalone?: boolean })
    .standalone;
  return window.matchMedia(STANDALONE).matches || ios === true;
}

/**
 * True while the page runs as an installed app. Used to decide whether a browser-only
 * affordance (install) or an app-only one (the address command) is the useful one.
 * A browser tab can never satisfy a `display-mode` query, so this is a plain read.
 */
export function useInstalledApp() {
  return useSyncExternalStore(subscribe, read, () => false);
}

const isIosDevice = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  // iPadOS 13+ reports itself as a Mac; the touch points give it away.
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/**
 * Safari never fires `beforeinstallprompt`, so an iPhone has to be taught the manual
 * route: Share → Add to Home Screen. Nothing is guessed until hydration is done.
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
 */
export function useIosInstallable() {
  const installed = useInstalledApp();
  const ios = useSyncExternalStore(subscribe, isIosDevice, () => false);
  return ios && !installed;
}
