"use client";

import { useEffect } from "react";

/** Long enough for the progress rail to reach its end, short enough to not annoy. */
const MIN_VISIBLE_MS = 950;
const CAP_MS = 1500;

/**
 * Lifts the launch screen.
 *
 * Waits for the quickest of: fonts ready, `load`, or a hard cap — and never less than
 * `MIN_VISIBLE_MS`, so the rail finishes its fill instead of vanishing mid-way. The
 * flag lives on `<html>`; the fade itself is a Tailwind transition on the splash
 * element, so this file ships no styles.
 *
 * A skipped splash (another route, or a second visit) is left alone entirely: the
 * session flag stays unset, so the next cold start still gets its launch screen.
 */
export function SplashGate() {
  useEffect(() => {
    const splash = document.getElementById("boot-splash");
    if (!splash) return;

    // A skipped launch screen is not just hidden: it leaves the document, so no
    // full-screen layer sits on top of the app for the rest of the visit.
    if (document.documentElement.dataset.splash === "skip") {
      splash.remove();
      return;
    }

    const started = performance.now();
    let released = false;

    // While the launch screen is up the status bar is part of it, not of the page.
    const bars = Array.from(
      document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]'),
    );
    const original = bars.map((meta) => meta.content);
    for (const meta of bars) meta.content = "#0a1219";
    const restoreBars = () => {
      bars.forEach((meta, index) => {
        meta.content = original[index];
      });
    };

    const release = () => {
      if (released) return;
      released = true;
      restoreBars();
      try {
        sessionStorage.setItem("kk:boot", "1");
      } catch {
        // Storage can be unavailable; the splash then simply shows again.
      }
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
      new Promise((resolve) => window.setTimeout(resolve, CAP_MS)),
    ]).then(release);
  }, []);

  return null;
}
