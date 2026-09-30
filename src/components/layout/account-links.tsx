"use client";

import Link from "next/link";
import { CalendarDays, LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu-item";
import { formatNumber } from "@/lib/format";
import { roles, routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer; isDropdown?: boolean; onChoose?: () => void; onSignOut?: () => void };

export function AccountLinks({ viewer, isDropdown = false, onChoose, onSignOut }: Props) {
  const links = [
    { href: routes.account, label: "حساب من", icon: UserRound },
    { href: routes.appointments, label: "نوبت‌های من", icon: CalendarDays },
    ...(viewer.role === roles.admin ? [{ href: routes.admin, label: "پنل مدیریت", icon: LayoutDashboard }] : []),
    { href: routes.settings, label: "تنظیمات حساب", icon: Settings },
  ];
  return (
    <div className="account-links">
      {links.map((link) => {
        const anchor = <Link href={link.href} prefetch={false} onClick={onChoose}><link.icon aria-hidden="true" /><span>{link.label}</span>{link.href === routes.appointments && <span className="count-badge" aria-hidden="true">{formatNumber(Math.min(viewer.appointments, 99))}{viewer.appointments > 99 ? "+" : ""}</span>}{link.href === routes.appointments && <span className="sr-only">، {formatNumber(viewer.appointments)} نوبت</span>}</Link>;
        return isDropdown ? <DropdownMenuItem key={link.href} asChild>{anchor}</DropdownMenuItem> : <div key={link.href}>{anchor}</div>;
      })}
      {isDropdown ? <DropdownMenuItem variant="destructive" disabled={!onSignOut} onSelect={onSignOut}><LogOut aria-hidden="true" />خروج از حساب</DropdownMenuItem> : <button type="button" className="account-exit" disabled={!onSignOut} onClick={onSignOut}><LogOut aria-hidden="true" />خروج از حساب</button>}
    </div>
  );
}
