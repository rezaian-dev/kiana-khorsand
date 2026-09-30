"use client";

import { useScroll } from "motion/react";
import * as m from "motion/react-m";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <m.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
