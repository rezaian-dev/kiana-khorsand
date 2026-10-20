"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/** Decorative hover only; the server page keeps the card content and data. */
export function TestimonialStoryMotion({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={className}
      whileHover={{
        y: reduce ? 0 : -5,
        borderColor: "color-mix(in srgb, var(--c-teal) 35%, var(--line))",
        boxShadow: "var(--shadow-lift)",
      }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
      }
    >
      {children}
    </motion.article>
  );
}
