"use client";

import { motion } from "motion/react";
import { useLiveReducedMotion } from "./use-live-reduced-motion";

/** Beautiful teal pill — spring, inner highlight, outer glow, haptic-friendly */
export function PublicDockSpotlight({ reduced }: { reduced: boolean }) {
  return (
    <motion.span
      layoutId="dock-active-pill"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-br from-teal-600 via-teal-500 to-emerald-600 shadow-[0_8px_24px_-8px_rgba(13,148,136,0.6),0_2px_8px_rgba(13,148,136,0.25),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.08)] dark:from-teal-500 dark:via-teal-400 dark:to-emerald-500 max-[360px]:rounded-[16px]"
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 400, damping: 30, mass: 0.8 }
      }
    >
      <span
        aria-hidden="true"
        className="absolute inset-[1px] rounded-[19px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none max-[360px]:rounded-[15px]"
      />
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-[20px] bg-white/0 max-[360px]:rounded-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.12, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.span>
  );
}

export function DockSpotlight() {
  const reduced = useLiveReducedMotion();
  return (
    <motion.span
      layoutId="dock-panel-pill"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-teal-600 to-emerald-600 dark:from-teal-500 dark:to-emerald-500"
      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
    />
  );
}
