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
      className="admin-ref-nav-item relative isolate flex min-h-9 w-full items-center gap-[.6rem] overflow-hidden rounded-[12px] px-[.6rem] py-[.35rem] text-start text-[.88rem] font-medium text-(--ar-text2) no-underline [background:transparent] [&_svg]:flex-none"
      aria-current={isActive ? "page" : undefined}
    >
      <AnimatePresence mode="popLayout">
        {isActive && (
          <>
            {/* ریل اصلی که با layoutId بین ردیف‌ها می‌لغزد */}
            <m.span
              layoutId="sidebar-rail"
              layout
              className="pointer-events-none absolute inset-0 z-0 rounded-[12px] [box-shadow:0_7px_18px_-12px_#2772855a] [background:linear-gradient(104deg,#d9f1eb,#e2eef9)] [border:1px_solid_#a4d3d0] dark:border-[#598f90] dark:[box-shadow:0_7px_18px_-12px_#071426c0] dark:[background:linear-gradient(104deg,#245a63,#334e6c)]"
              transition={motionTiming.indicator}
            />
            {/* درخشش ظریف هنگام فعال شدن */}
            <m.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute inset-0 z-0 rounded-[12px] [background:radial-gradient(120%_120%_at_18%_50%,rgba(255,255,255,.55),transparent_58%)] dark:[background:radial-gradient(120%_120%_at_18%_50%,rgba(255,255,255,.08),transparent_58%)]"
              aria-hidden="true"
            />
            {/* نوار باریک کناری که با spring قد می‌کشد */}
            <m.span
              layoutId="sidebar-rail-accent"
              className="pointer-events-none absolute inset-y-[6px] inset-s-[3px] z-10 w-[3px] rounded-full bg-[#138c8f] dark:bg-[#91ead8]"
              transition={motionTiming.indicator}
              aria-hidden="true"
            />
          </>
        )}
      </AnimatePresence>
      <m.span
        animate={isActive && !reduce ? { scale: 1.06 } : { scale: 1 }}
        transition={motionTiming.hover}
        className="relative z-10 flex-none shrink-0 rounded-[7px] p-[2px] data-[active=true]:bg-[#c5e5e1] dark:data-[active=true]:bg-[#397879]"
        data-active={isActive}
      >
        <Icon size={18} aria-hidden="true" />
      </m.span>
      <span className="admin-ref-nav-label relative z-10">{link.label}</span>
    </AdminLink>
  );
}
