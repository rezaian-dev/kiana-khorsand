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
