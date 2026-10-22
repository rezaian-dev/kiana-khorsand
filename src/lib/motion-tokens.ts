import type { Transition, Variants } from "motion/react";

/**
 * One motion vocabulary for the whole site: every component pulls its timing from
 * here instead of inventing transitions inline. Values follow the Motion guidance on
 * snappy spatial motion (short, ease-out) and springy interactivity.
 * https://motion.dev/docs/react-transitions
 */
const easeOut = [0.22, 1, 0.36, 1] as const;

export const motionTiming = {
  quick: { duration: 0.16, ease: easeOut },
  standard: { duration: 0.28, ease: easeOut },
  emphasized: { duration: 0.42, ease: easeOut },
  /** Pointer feedback: fast enough to feel direct, never bouncy. */
  hover: { type: "spring", stiffness: 420, damping: 34, mass: 0.7 },
  /** Cards and tiles settling into a new grid position. */
  tile: { type: "spring", stiffness: 400, damping: 38, mass: 0.82 },
  /** Shared layout indicator (active pill, tab, filter). */
  indicator: { type: "spring", stiffness: 520, damping: 42, mass: 0.76 },
} as const satisfies Record<string, Transition>;

/** Entrances are opacity + a short travel; content is never hidden without JS. */
export const pageEntrance: Variants = {
  initial: { opacity: 0.96, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export const sectionEntrance: Variants = {
  initial: { opacity: 0.94, y: 14 },
  visible: { opacity: 1, y: 0 },
};

/** Filter results: keys that survive a filter move instead of flashing. */
export const tilePresence: Variants = {
  initial: { opacity: 0.5, scale: 0.97, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: -6 },
};

/** Parent of a filtered list; children animate one after another. */
export const listStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.03 } },
};

export const listItem: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: motionTiming.tile },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.16, ease: easeOut },
  },
};

/** Gesture presets shared by cards, pills and links. */
export const hoverLift = { y: -3 } as const;
export const hoverNudge = { y: -1 } as const;
export const press = { scale: 0.97 } as const;
