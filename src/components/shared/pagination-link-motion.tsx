"use client";

import type { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const MotionLink = motion.create(Link);

type PageLinkProps = {
  href: string;
  className: string;
  children: ReactNode;
  "aria-label": string;
  "aria-current"?: "page";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function hoverState(reduce: boolean | null, current?: "page") {
  return current
    ? undefined
    : { y: reduce ? 0 : -3, boxShadow: "var(--shadow-lift)" };
}

function hoverTiming(reduce: boolean | null) {
  return reduce
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const };
}

/** Keep the article browser's native anchor and its intercepted/history-aware click. */
export function PaginationAnchor({ children, ...props }: PageLinkProps) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      {...props}
      whileHover={hoverState(reduce, props["aria-current"])}
      transition={hoverTiming(reduce)}
    >
      {children}
    </motion.a>
  );
}

/** Keep Next's Link routing/prefetch on the server-rendered testimonials route. */
export function PaginationLink({ children, ...props }: PageLinkProps) {
  const reduce = useReducedMotion();
  return (
    <MotionLink
      {...props}
      whileHover={hoverState(reduce, props["aria-current"])}
      transition={hoverTiming(reduce)}
    >
      {children}
    </MotionLink>
  );
}
