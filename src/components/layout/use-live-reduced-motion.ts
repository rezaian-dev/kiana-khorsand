import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => false;

/** Unlike Motion's snapshot-only hook, update when the OS preference changes. */
export function useLiveReducedMotion() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
