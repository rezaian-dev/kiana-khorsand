"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { motionTokens } from "@/lib/motion";

type Props = { className: string };

export function Drift({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { amount: .1 });
  const isReduced = useReducedMotion();
  const canMove = isVisible && isReduced === false;
  return <m.div ref={ref} className={className} aria-hidden="true" initial={false} animate={canMove ? { x: [0, motionTokens.travel, 0], y: [0, -motionTokens.travel, 0] } : { x: 0, y: 0 }} transition={{ duration: canMove ? motionTokens.slow * 20 : 0, repeat: canMove ? Infinity : 0, ease: motionTokens.easeInOut }} />;
}
