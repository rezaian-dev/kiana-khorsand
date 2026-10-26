"use client";

import { m, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { PanelLink } from "@/types/navigation";
import {
  motionTiming,
  sidebarItem,
  sidebarItemGesture,
} from "@/lib/motion-tokens";

/**
 * یک آیتم ناوبری سایدبار مدیریت.
 *
 * Motion فقط حرکت را مالک است: رنگ، حاشیه، فوکوس و آیکون همچنان در CSS هستند، بنابراین
 * بدون جاوااسکریپت هیچ چیزی مخفی نمی‌شود. `layoutId` ریل فعال را بین ردیف‌ها
 * به‌صورت انیمیشنی جابه‌جا می‌کند؛ `useReducedMotion` هر حرکت تزئینی را حذف می‌کند.
 */
type AdminSidebarItemProps = {
  link: PanelLink;
  isActive: boolean;
  index: number;
};

const AdminLink = m.create(Link);

export function AdminSidebarItem({
  link,
  isActive,
  index,
}: AdminSidebarItemProps) {
  const reduce = useReducedMotion();
  const Icon = link.icon;
  const gesture = reduce ? undefined : sidebarItemGesture;

  return (
    <AdminLink
      href={link.href}
      initial={
        reduce
          ? undefined
          : { ...sidebarItem.hidden, transition: { delay: index * 0.05 } }
      }
      animate={{
        ...sidebarItem.visible,
        transition: { delay: index * 0.05, ...motionTiming.standard },
      }}
      whileHover={gesture?.whileHover}
      whileTap={gesture?.whileTap}
      transition={motionTiming.hover}
      className="admin-ref-nav-item relative isolate flex min-h-11 w-full items-center gap-[.7rem] overflow-hidden rounded-[14px] px-[.7rem] py-2 text-start text-[.92rem] font-medium text-(--ar-text2) no-underline [background:transparent] [&_svg]:flex-none"
      aria-current={isActive ? "page" : undefined}
    >
      <AnimatePresence mode="popLayout">
        {isActive && (
          <m.span
            layoutId="sidebar-rail"
            layout
            className="pointer-events-none absolute inset-0 z-0 rounded-[18px_0_0_18px] [box-shadow:0_9px_24px_-14px_#27728574] [background:linear-gradient(104deg,#d9f1eb,#e2eef9)] [border:1px_solid_#a4d3d0] dark:border-[#598f90] dark:[box-shadow:0_9px_24px_-14px_#071426] dark:[background:linear-gradient(104deg,#245a63,#334e6c)]"
            transition={motionTiming.indicator}
          />
        )}
      </AnimatePresence>
      <Icon
        size={19}
        className="relative z-10 flex-none shrink-0"
        aria-hidden="true"
      />
      <span className="admin-ref-nav-label relative z-10">{link.label}</span>
    </AdminLink>
  );
}
