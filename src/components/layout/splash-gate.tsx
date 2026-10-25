"use client";

import { useEffect } from "react";

/**
 * Both clocks are measured from the **navigation**, not from this effect.
 *
 * The intro's beats are CSS animations: the wordmark lands at 70ms + 450ms, the rail
 * finishes at 600ms, the status line at 260ms + 450ms. `performance.now()` already
 * counts from navigation start, which is when those animations began — so the floor
 * is the moment the choreography has played, not 760ms *after hydration finished*.
 * That distinction was the whole bug: hydration lands at ~600ms on a phone, so the
 * old floor could not lift the screen before ~1.3s and taps stayed on the splash.
 *
 * The cap is the safety net for a font that never settles.
 */
const MIN_VISIBLE_MS = 760;
const CAP_MS = 1400;

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
      document.documentElement.dataset.splash = "done";
      // Once the fade is over, drop the node so it can never trap a tap.
      window.setTimeout(() => {
        document.getElementById("boot-splash")?.remove();
      }, 600);
    };

    // `load` never fires if the document finished before this effect ran.
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true }),
          );

    Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      loaded,
      new Promise((resolve) =>
        window.setTimeout(resolve, Math.max(0, CAP_MS - performance.now())),
      ),
    ]).then(() =>
      window.setTimeout(
        release,
        Math.max(0, MIN_VISIBLE_MS - performance.now()),
      ),
    );
  }, []);

  return null;
}
