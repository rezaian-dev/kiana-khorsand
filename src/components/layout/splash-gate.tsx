"use client";

import { useEffect } from "react";

const MIN_VISIBLE_MS = 900;

/**
 * Lifts the launch screen.
 *
 * Waits for the quickest of: fonts ready, `load`, or a hard cap — and never less
 * than `MIN_VISIBLE_MS`, so the logo does not flash for two frames on a fast
 * device. The flag lives on `<html>`; the fade itself is a Tailwind transition on
 * the splash element, so this file ships no styles.
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
        // One frame after the fade, drop the node so it can never trap a tap.
        window.setTimeout(() => {
          document.getElementById("boot-splash")?.remove();
        }, 700);
      }, wait);
    };

    Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolve) =>
        window.addEventListener("load", resolve, { once: true }),
      ),
      new Promise((resolve) => window.setTimeout(resolve, 1600)),
    ]).then(release);
  }, []);

  return null;
}
