"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

type Props = { children: ReactNode };
const loadFeatures = () => import("./features").then((module) => module.default);

export function Motion({ children }: Props) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: motionTokens.ui, ease: motionTokens.ease }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
