export const motionTokens = {
  quick: 0.2,
  ui: 0.25,
  scene: 0.5,
  stagger: 0.08,
  travel: 16,
  ease: [0.2, 0.7, 0.2, 1],
  spring: { type: "spring", stiffness: 280, damping: 28, mass: 0.7 },
} as const;

export function getTravel(distance: number, direction: "rtl" | "ltr" = "rtl") {
  return direction === "rtl" ? distance : -distance;
}
