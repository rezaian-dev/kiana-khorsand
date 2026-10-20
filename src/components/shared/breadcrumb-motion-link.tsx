"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

const MotionLink = motion.create(Link);
const mediaQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(mediaQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const getReduced = () => window.matchMedia(mediaQuery).matches;
const serverReduced = () => false;

/** Only these links hydrate; the breadcrumb, JSON-LD, and remaining page stay server-rendered. */
export function BreadcrumbMotionLink(props: {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const reduced = useSyncExternalStore(subscribe, getReduced, serverReduced);
  return (
    <MotionLink
      {...props}
      initial={false}
      animate={{ color: "var(--site-muted)", "--breadcrumb-opacity": 0 }}
      whileHover={{ color: "var(--site-violet)", "--breadcrumb-opacity": 0.11 }}
      transition={{
        duration: reduced ? 0 : 0.18,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    />
  );
}
