"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionTiming } from "@/lib/motion-tokens";

/**
 * A surface that lifts under the pointer and dips under a finger.
 *
 * Shadow and border still come from CSS classes; Motion only adds the travel, so the
 * card looks right in the server-rendered HTML and in a no-JS browser. The tap gesture
 * is the part that matters on a phone, where there is no hover at all.
 */
export function MotionCard({
  children,
  className = "",
  effect = "lift",
}: {
  children: ReactNode;
  className?: string;
  effect?: "lift" | "rise" | "none";
}) {
  const reduce = useReducedMotion();
  const y = effect === "lift" ? -4 : effect === "rise" ? -2 : 0;

  return (
    <m.div
      className={className}
      whileHover={reduce || effect === "none" ? undefined : { y }}
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={reduce ? { duration: 0 } : motionTiming.tile}
    >
      {children}
    </m.div>
  );
}
