"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLiveReducedMotion } from "./use-live-reduced-motion";
import { motion } from "motion/react";

const MotionLink = motion.create(Link);
const navLinkClassName =
  "nav-link relative inline-flex min-h-11 items-center rounded-[999px] px-[.7rem] py-[.35rem] text-[.9375rem] font-semibold no-underline transition-[color,background-color] duration-300 ease-[ease] motion-reduce:transition-none hover:bg-[var(--hover)] hover:text-[var(--fg)] min-[769px]:max-[1023.02px]:px-[.42rem] min-[769px]:max-[1023.02px]:text-[.82rem]";
const navUnderlineClassName =
  "pointer-events-none absolute inset-x-[.85rem] bottom-[.3rem] h-[2px] origin-right rounded-[99px] [background-image:var(--grad-sunset)]";

const links = [
  { href: "/about", label: "درباره من" },
  { href: "/areas", label: "حوزه‌های کار" },
  { href: "/approach", label: "روش کار" },
  { href: "/fees", label: "تعرفه‌ها" },
  { href: "/articles", label: "مقاله‌ها" },
] as const;

function DesktopNavLink({
  href,
  label,
  active,
  reduceMotion,
}: {
  href: string;
  label: string;
  active: boolean;
  reduceMotion: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <MotionLink
      className={`${navLinkClassName} ${active ? "is-active text-[var(--fg)]" : "text-[var(--muted)]"}`}
      href={href}
      aria-current={active ? "page" : undefined}
      initial={false}
      animate={{ y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.025 }}
      whileFocus={reduceMotion ? undefined : { y: -2, scale: 1.025 }}
      transition={{
        duration: reduceMotion ? 0 : 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {label}
      <motion.span
        aria-hidden="true"
        className={navUnderlineClassName}
        initial={false}
        animate={{ scaleX: active || hovered ? 1 : 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.35,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      />
    </MotionLink>
  );
}

export function DesktopNavigation() {
  const path = usePathname();
  const reduceMotion = useLiveReducedMotion();
  return (
    <nav
      className="ref-desktop-nav block min-w-0 max-[768.02px]:hidden!"
      aria-label="ناوبری اصلی"
    >
      <ul className="flex items-center gap-0.5">
        {links.map(({ href, label }) => {
          const active = path === href || path.startsWith(`${href}/`);
          return (
            <li key={href}>
              <DesktopNavLink
                href={href}
                label={label}
                active={active}
                reduceMotion={reduceMotion}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
