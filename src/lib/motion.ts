export const motionTokens = {
  fast: 0.12,
  quick: 0.18,
  ui: 0.26,
  scene: 0.42,
  slow: 0.7,
  stagger: 0.06,
  travel: 8,
  ease: [0.22, 1, 0.36, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  spring: { type: "spring", stiffness: 300, damping: 38, mass: 0.8 },
} as const;

export function getTravel(distance: number, direction: "rtl" | "ltr" = "rtl") {
  return direction === "rtl" ? distance : -distance;
}
