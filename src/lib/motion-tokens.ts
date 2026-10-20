import type { Transition, Variants } from "motion/react";

/** One vocabulary for interaction speed and spring response across the site. */
export const motionTiming = {
  quick: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
  standard: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  emphasized: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  tile: { type: "spring", stiffness: 400, damping: 38, mass: 0.82 },
  indicator: { type: "spring", stiffness: 520, damping: 42, mass: 0.76 },
} as const satisfies Record<string, Transition>;

export const pageEntrance: Variants = {
  initial: { opacity: 0.96, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export const sectionEntrance: Variants = {
  initial: { opacity: 0.94, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export const tilePresence: Variants = {
  initial: { opacity: 0.5, scale: 0.97, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -6 },
};
