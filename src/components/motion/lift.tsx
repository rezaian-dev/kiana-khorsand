"use client";

import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion";

type Props = { children: ReactNode; className?: string };

export function Lift({ children, className }: Props) {
  const isReduced = useReducedMotion();
  return <m.div initial={false} className={className} whileHover={isReduced ? undefined : { y: -8 }} transition={motionTokens.spring}>{children}</m.div>;
}
