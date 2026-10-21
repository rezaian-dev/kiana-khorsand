"use client";

import Link from "next/link";
import { panelSheetClassName } from "./panel-layout-classes";
import { DockSpotlight } from "@/components/layout/dock-spotlight";
import {
  mobileDockClassName,
  mobileDockIconClassName,
  mobileDockItemClassName,
} from "@/components/layout/mobile-dock-classes";
import type { PanelLink } from "@/types/navigation";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  MessageCircle,
  Settings,
  UsersRound,
  CircleUserRound,
  Stethoscope,
  MessagesSquare,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const adminLinks = [
  { href: "/admin", label: "پیشخوان مدیریت", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "تقویم و نوبت‌ها", icon: CalendarDays },
  { href: "/admin/availability", label: "ساعات کاری", icon: ClipboardList },
  { href: "/admin/clients", label: "مراجعین", icon: UsersRound },
  { href: "/admin/inbox", label: "صندوق پیام‌ها", icon: MessageCircle },
  { href: "/admin/payments", label: "مدیریت پرداخت‌ها", icon: CreditCard },
  { href: "/admin/services", label: "خدمات درمانی", icon: Stethoscope },
  { href: "/admin/articles", label: "مقالات", icon: FileText },
  { href: "/admin/workshops", label: "کارگاه‌ها", icon: GraduationCap },
  { href: "/admin/testimonials", label: "دیدگاه مراجعین", icon: MessagesSquare },
  { href: "/admin/settings", label: "تنظیمات سایت", icon: Settings },
  {
    href: "/dashboard/settings",
    label: "حساب کاربری من",
    icon: CircleUserRound,
  },
] as const;

export const clientLinks = [
  { href: "/dashboard", label: "پیشخوان", icon: LayoutDashboard },
  { href: "/dashboard/appointments", label: "نوبت‌های من", icon: CalendarDays },
  { href: "/dashboard/notes", label: "یادداشت‌های شخصی", icon: FileText },
  { href: "/dashboard/assessments", label: "ارزیابی‌های روان‌شناختی", icon: ClipboardList },
  {
    href: "/dashboard/messages",
    label: "پیام‌ها و اعلان‌ها",
    icon: MessageCircle,
  },
  { href: "/dashboard/payments", label: "پرداخت‌ها و صورتحساب‌ها", icon: CreditCard },
  { href: "/dashboard/courses", label: "دوره‌های آموزشی من", icon: GraduationCap },
  { href: "/dashboard/settings", label: "تنظیمات حساب کاربری", icon: Settings },
] as const;

export function PanelNav({
  links,
  title,
}: {
  links: readonly PanelLink[];
  title: string;
}) {
  const path = usePathname();
  const dockLinks = links.filter(({ href }) =>
    [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/messages",
      "/dashboard/settings",
    ].includes(href),
  );
  const extraActive = !dockLinks.some(({ href }) => path === href);
  const additionalLinks = links.filter(
    ({ href }) => !dockLinks.some((item) => item.href === href),
  );
  // Sidebar items — now without "صفحه اصلی" — return via logo only
  const items = (
    <>
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="panel-nav-item flex min-h-11 items-center gap-3 rounded-[.8rem] px-[.85rem] py-[.55rem] text-[.87rem] font-[650] text-[var(--panel-muted)] hover:bg-[#ede6f8] hover:text-[#3e227e] aria-[current=page]:bg-[#ede6f8] aria-[current=page]:text-[#3e227e] dark:hover:bg-[#392b53] dark:hover:text-[#eee6ff] dark:aria-[current=page]:bg-[#392b53] dark:aria-[current=page]:text-[#eee6ff]"
          aria-current={path === href ? "page" : undefined}
        >
          <Icon size={19} aria-hidden="true" />
          {label}
        </Link>
      ))}
    </>
  );
  return (
    <>
      <aside className="panel-sidebar fixed start-0 top-[76px] bottom-0 w-[244px] overflow-y-auto border-e border-[var(--panel-line)] bg-[var(--panel-surface)] px-[.8rem] py-[1.4rem] max-[900.02px]:hidden">
        <div className="panel-sidebar-title px-[.85rem] pt-[.4rem] pb-4 font-extrabold text-[var(--panel-muted)]">
          {title}
        </div>
        <nav
          aria-label="ناوبری پنل"
          className="panel-nav-items grid gap-[.23rem]"
        >
          {items}
        </nav>
      </aside>
      <div className="panel-mobile-trigger hidden max-[900.02px]:block">
        <Sheet>
          <nav
            className={`panel-bottom-dock ${mobileDockClassName} hidden max-[900.02px]:flex`}
            data-dock-active={
              extraActive ? 4 : dockLinks.findIndex(({ href }) => path === href)
            }
            aria-label="ناوبری پایین پنل کاربر"
          >
            {dockLinks.map(({ href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={mobileDockItemClassName}
                aria-current={path === href ? "page" : undefined}
              >
                {path === href && <DockSpotlight />}
                <span className={`${mobileDockIconClassName} relative z-10 ${path === href ? "text-white" : ""}`}>
                  <Icon size={24} aria-hidden="true" className="relative z-10" />
                </span>
                <span className="relative z-10">
                  {href === "/dashboard"
                    ? "پیشخوان"
                    : href.endsWith("appointments")
                      ? "نوبت‌ها"
                      : href.endsWith("messages")
                        ? "پیام‌ها"
                        : "حساب"}
                </span>
              </Link>
            ))}
            <SheetTrigger asChild>
              <button
                type="button"
                className={mobileDockItemClassName}
                aria-label="باز کردن فهرست پنل"
                aria-current={extraActive ? "page" : undefined}
              >
                {extraActive && <DockSpotlight />}
                <span className={`${mobileDockIconClassName} relative z-10 ${extraActive ? "text-white" : ""}`}>
                  <LayoutGrid size={24} aria-hidden="true" className="relative z-10" />
                </span>
                <span className="relative z-10">بیشتر</span>
              </button>
            </SheetTrigger>
          </nav>
          <SheetContent
            side="right"
            className={panelSheetClassName}
            showCloseButton={true}
          >
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <nav
              aria-label="سایر بخش‌های پنل"
              className="panel-nav-items grid gap-[.23rem]"
            >
              {additionalLinks.map(({ href, label, icon: Icon }) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    className="panel-nav-item flex min-h-11 items-center gap-3 rounded-[.8rem] px-[.85rem] py-[.55rem] text-[.87rem] font-[650] text-[var(--panel-muted)] hover:bg-[#ede6f8] hover:text-[#3e227e] aria-[current=page]:bg-[#ede6f8] aria-[current=page]:text-[#3e227e] dark:hover:bg-[#392b53] dark:hover:text-[#eee6ff] dark:aria-[current=page]:bg-[#392b53] dark:aria-[current=page]:text-[#eee6ff]"
                    aria-current={path === href ? "page" : undefined}
                  >
                    <Icon size={19} aria-hidden="true" />
                    {label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
