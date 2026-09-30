"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="desktop-nav" aria-label="ناوبری اصلی">
      {navigation.map((link) => {
        const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return <Link key={link.href} href={link.href} prefetch={false} aria-current={isActive ? "page" : undefined}>{link.label}</Link>;
      })}
    </nav>
  );
}
