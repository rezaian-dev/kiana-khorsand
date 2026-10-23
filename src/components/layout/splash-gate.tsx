"use client";

import { useEffect } from "react";

const MIN_VISIBLE_MS = 520;

/**
 * Lifts the launch screen.
 *
 * It waits for the shortest of: fonts ready, the window load event, or a hard cap — and
 * never less than `MIN_VISIBLE_MS`, so a fast device does not flash the logo for two
 * frames. The flag lives on `<html>` and the fade itself is CSS, which keeps this
 * component at a few hundred bytes.
 */
export function SplashGate() {
  useEffect(() => {
    const started = performance.now();
    let released = false;

    const release = () => {
      if (released) return;
      released = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - started));
      window.setTimeout(() => {
        document.documentElement.dataset.splash = "done";
      }, wait);
    };

    const fonts = document.fonts?.ready ?? Promise.resolve();
    Promise.race([
      fonts,
      new Promise((resolve) => window.addEventListener("load", resolve, { once: true })),
      new Promise((resolve) => window.setTimeout(resolve, 1600)),
    ]).then(release);
  }, []);

  return null;
}
