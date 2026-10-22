"use client";

import { m } from "motion/react";
import { useLiveReducedMotion } from "./use-live-reduced-motion";

/** Unified teal pill — wraps icon+label, spring, inner highlight, no-jank (transform/opacity only) */
export function PublicDockSpotlight({ reduced }: { reduced: boolean }) {
  return (
    <m.span
      layoutId="dock-active-pill"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 shadow-[0_8px_24px_-8px_rgba(13,148,136,0.55),0_2px_8px_rgba(13,148,136,0.22),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.06)] dark:from-teal-500 dark:via-teal-400 dark:to-emerald-500 max-[360px]:rounded-[18px] will-change-transform"
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 420, damping: 32, mass: 0.7 }
      }
    >
      <span
        aria-hidden="true"
        className="absolute inset-[1px] rounded-[21px] bg-gradient-to-b from-white/18 to-transparent pointer-events-none max-[360px]:rounded-[17px]"
      />
      {!reduced && (
        <m.span
          aria-hidden="true"
          className="absolute inset-0 rounded-[22px] bg-white/0 max-[360px]:rounded-[18px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </m.span>
  );
}

export function DockSpotlight() {
  const reduced = useLiveReducedMotion();
  return (
    <m.span
      layoutId="dock-panel-pill"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[22px] bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 shadow-[0_8px_24px_-8px_rgba(13,148,136,0.55),0_2px_8px_rgba(13,148,136,0.22),inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-1px_0_rgba(0,0,0,0.06)] dark:from-teal-500 dark:via-teal-400 dark:to-emerald-500 max-[360px]:rounded-[18px] will-change-transform"
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32, mass: 0.7 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[1px] rounded-[21px] bg-gradient-to-b from-white/18 to-transparent pointer-events-none max-[360px]:rounded-[17px]"
      />
    </m.span>
  );
}
