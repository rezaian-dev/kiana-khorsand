"use client";

import Link from "next/link";
import { m, useReducedMotion } from "motion/react";
import type { MouseEventHandler, ReactNode } from "react";
import {
  hoverLift,
  hoverNudge,
  motionTiming,
  press,
} from "@/lib/motion-tokens";

/** How much a link answers a pointer or a finger. */
export type LinkEffect = "nudge" | "lift" | "none";

type BaseProps = {
  className?: string;
  children: ReactNode;
  effect?: LinkEffect;
  "aria-label"?: string;
  "aria-current"?: "page";
  title?: string;
};

const NextLink = m.create(Link);

/**
 * The one animated link on the site.
 *
 * Motion owns only the gesture: colour, underline and focus rings stay in CSS, so the
 * link is complete before hydration and a user with JavaScript off loses nothing. Taps
 * get the same short spring as hovers, which is what makes the app feel native on a
 * phone. `useReducedMotion` removes the travel and keeps the press.
 * https://motion.dev/docs/react-gestures
 */
export function MotionLink({
  href,
  effect = "nudge",
  className,
  children,
  ...aria
}: BaseProps & { href: string }) {
  const reduce = useReducedMotion();
  const hover =
    effect === "nudge" ? hoverNudge : effect === "lift" ? hoverLift : undefined;

  return (
    <NextLink
      href={href}
      className={className}
      {...aria}
      whileHover={reduce || !hover ? undefined : hover}
      whileTap={reduce ? undefined : press}
      transition={reduce ? { duration: 0 } : motionTiming.hover}
    >
      {children}
    </NextLink>
  );
}

/** The same gestures for anchors that must stay native (in-page jumps, pagination). */
export function MotionAnchor({
  href,
  effect = "nudge",
  className,
  children,
  onClick,
  ...aria
}: BaseProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const reduce = useReducedMotion();
  const hover =
    effect === "nudge" ? hoverNudge : effect === "lift" ? hoverLift : undefined;

  return (
    <m.a
      href={href}
      onClick={onClick}
      className={className}
      {...aria}
      whileHover={reduce || !hover ? undefined : hover}
      whileTap={reduce ? undefined : press}
      transition={reduce ? { duration: 0 } : motionTiming.hover}
    >
      {children}
    </m.a>
  );
}
