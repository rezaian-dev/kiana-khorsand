"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress: a 3px bar that fills as the page scrolls.
 *
 * The bar is written straight to the element, not through state. A `setState` in
 * the scroll handler re-rendered this component — and everything under it — on
 * every animation frame of every scroll, which is exactly the work that makes
 * INP and scroll smoothness suffer. One `style` write per frame costs nothing and
 * the pixels are identical.
 *
 * `progress` is a percentage of a 3px bar, so no layout of consequence is
 * triggered; the alternative (`transform: scaleX`) would stretch the gradient
 * instead of revealing it, which is a different picture.
 */
export function HeaderProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const write = () => {
      frame = 0;
      const el = bar.current;
      if (!el) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable ? (window.scrollY / scrollable) * 100 : 0;
      el.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div
      ref={bar}
      className="accent-bar h-[3px] w-0 [background-image:var(--grad-sunset)]"
      aria-hidden="true"
    />
  );
}
