"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = { href: string; label: string; children: ReactNode };

export function NavLink({ href, label, children }: Props) {
  const pathname = usePathname();
  return <Link href={href} prefetch={false} aria-current={pathname === href ? "page" : undefined} aria-label={label} title={label}>{children}</Link>;
}
