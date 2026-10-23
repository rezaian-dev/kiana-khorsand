"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { motionTiming, sectionEntrance } from "@/lib/motion-tokens";

/**
 * Fades and lifts a block the first time it scrolls into view.
 *
 * The initial state is applied by Motion only after hydration, so the content is always
 * readable without JavaScript — nothing is hidden behind an animation. `once` keeps the
 * work to a single intersection per block, which matters on a phone scrolling a long
 * page; reduced-motion users get the finished state immediately.
 */
export function ScrollReveal({
  children,
  className,
  id,
  as = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section" | "article";
  delay?: number;
}) {
  const Tag = m[as];
  return (
    <Tag
      id={id}
      className={className}
      initial="initial"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={sectionEntrance}
      transition={{ ...motionTiming.standard, delay }}
    >
      {children}
    </Tag>
  );
}
