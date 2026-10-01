"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAccount } from "@/lib/account";
import { CalendarDays, LayoutDashboard, LogOut, Settings, UserRound } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu-item";
import { formatNumber } from "@/lib/format";
import { roles, routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer; isDropdown?: boolean; onChoose?: () => void };

export function AccountLinks({ viewer, isDropdown = false, onChoose }: Props) {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function handleLogout() {
    if (isPending) return;
    setPending(true); setMessage("");
    try {
      const result = await logoutAccount();
      if (!result.isSuccess) { setMessage(result.message); return; }
      onChoose?.();
      router.refresh();
    } catch { setMessage("خروج انجام نشد؛ اتصال را بررسی و دوباره تلاش کنید."); }
    finally { setPending(false); }
  }
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
      {isDropdown ? <DropdownMenuItem variant="destructive" disabled={isPending} onSelect={(event) => { event.preventDefault(); void handleLogout(); }}><LogOut aria-hidden="true" />{isPending ? "در حال خروج…" : "خروج از حساب"}</DropdownMenuItem> : <button type="button" className="account-exit" disabled={isPending} onClick={() => void handleLogout()}><LogOut aria-hidden="true" />{isPending ? "در حال خروج…" : "خروج از حساب"}</button>}
      <p className="account-status" role="status">{message}</p>
    </div>
  );
}
