"use client";

import { useEffect, useState } from "react";

export function HeaderProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const available =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(
          available
            ? Math.max(0, Math.min(100, (window.scrollY / available) * 100))
            : 0,
        );
        setScrolled(window.scrollY > 16);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <>
      <div
        className="accent-bar h-[3px] [background-image:var(--grad-sunset)]"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      {scrolled && <span className="header-progress-scrolled" hidden />}
    </>
  );
}
