"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";
import { routes } from "@/lib/constants";

export function NavLinks() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  return (
    <nav className="desktop-nav" aria-label="ناوبری اصلی">
      {navigation.map((link) => {
        const isActive = pathname === link.href || link.href !== routes.home && pathname.startsWith(`${link.href}/`);
        return <Link data-interact="control" key={link.href} href={link.href} prefetch={false} aria-current={isActive ? "page" : undefined}>{isActive && <m.span aria-hidden="true" className="nav-active-pill" layoutId={reduced ? undefined : "primary-nav-active"} initial={false} transition={{ duration: reduced ? 0 : motionTokens.quick, ease: motionTokens.ease }} />}<span>{link.label}</span></Link>;
      })}
    </nav>
  );
}
