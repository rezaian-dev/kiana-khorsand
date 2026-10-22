"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { m } from "motion/react";
import { useLiveReducedMotion } from "@/components/layout/use-live-reduced-motion";

const MotionLink = m.create(Link);

/** A small hover-only island: all labels, numbers and icons stay server-rendered children. */
export function AdminStatLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const reduce = useLiveReducedMotion();
  return (
    <MotionLink
      href={href}
      className={className}
      initial={false}
      whileHover={{
        y: reduce ? 0 : -3,
        boxShadow: "0 20px 40px -22px rgba(18, 86, 95, 0.35)",
      }}
      transition={{ duration: reduce ? 0 : 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionLink>
  );
}
