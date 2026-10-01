"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/constants";
import type { ReactNode } from "react";

type Props = { href: string; label: string; children: ReactNode };

export function NavLink({ href, label, children }: Props) {
  const pathname = usePathname();
  return <Link data-interact="control" href={href} prefetch={false} aria-current={pathname === href ? "page" : href !== routes.admin && href !== routes.home && pathname.startsWith(`${href}/`) ? "location" : undefined} aria-label={label} title={label}>{children}</Link>;
}
