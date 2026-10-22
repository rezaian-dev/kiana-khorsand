"use client";

import Link from "next/link";
import { m } from "motion/react";
import type { ReactNode } from "react";
import { hoverNudge, press, motionTiming } from "@/lib/motion-tokens";

const MotionLink = m.create(Link);

/**
 * A breadcrumb link only hydrates for its hover/tap feedback; colour and the pill
 * background stay in CSS so the paint path never waits for JavaScript.
 */
export function BreadcrumbMotionLink({
  href,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <MotionLink
      href={href}
      aria-label={ariaLabel}
      className={className}
      whileHover={hoverNudge}
      whileTap={press}
      transition={motionTiming.hover}
    >
      {children}
    </MotionLink>
  );
}
