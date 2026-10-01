"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/content/navigation";
import { routes } from "@/lib/constants";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="desktop-nav" aria-label="ناوبری اصلی">
      {navigation.map((link) => {
        const isActive = pathname === link.href || link.href !== routes.home && pathname.startsWith(`${link.href}/`);
        return <Link data-interact="control" key={link.href} href={link.href} prefetch={false} aria-current={isActive ? "page" : undefined}>{link.label}</Link>;
      })}
    </nav>
  );
}
