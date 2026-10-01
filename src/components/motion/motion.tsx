"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/lib/motion";
import { Interactions } from "./interactions";

type Props = { children: ReactNode };

export function Motion({ children }: Props) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: motionTokens.ui, ease: motionTokens.ease }}>
        {children}<Interactions />
      </MotionConfig>
    </LazyMotion>
  );
}
