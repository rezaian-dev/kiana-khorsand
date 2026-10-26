"use client";

import { m, useReducedMotion } from "motion/react";

import { BrandMark } from "@/components/shared/brand-mark";
import { AdminSidebarItem } from "@/components/motion/admin-sidebar-item";
import { DockSpotlight } from "@/components/layout/dock-spotlight";

import {
  mobileDockClassName,
  mobileDockIconClassName,
  mobileDockItemClassName,
} from "@/components/layout/public-styles";
import {
  adminGlassClassName,
  adminSidebarClassName,
  panelSheetClassName,
} from "./panel-styles";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, ExternalLink, LogOut } from "lucide-react";
import { adminSignOutAction } from "@/actions/admin-auth";
import { adminLinks } from "@/features/admin/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  motionTiming,
  sidebarItem,
  sidebarItemGesture,
} from "@/lib/motion-tokens";

// --- section grouping for the desktop sidebar ---------------------------------
// هر بخش یک کِکر کوچک دارد و آیتم‌های آن با تاخیر stagger وارد می‌شوند.
const sections = [
  {
    kicker: "پیشخوان و نوبت‌ها",
    hrefs: ["/admin", "/admin/calendar", "/admin/availability"],
  },
  {
    kicker: "محتوای سایت",
    hrefs: ["/admin/articles", "/admin/workshops", "/admin/testimonials"],
  },
  {
    kicker: "مراجعین و کاربران",
    hrefs: ["/admin/clients", "/admin/users"],
  },
  {
    kicker: "پرداخت‌ها و خدمات",
    hrefs: ["/admin/payments", "/admin/services"],
  },
  {
    kicker: "تنظیمات",
    hrefs: ["/admin/settings"],
  },
  {
    kicker: "ارتباطات",
    hrefs: ["/admin/inbox"],
  },
];

const prominent = [
  "/admin",
  "/admin/calendar",
  "/admin/clients",
  "/admin/articles",
];

const mobileItemClass = `${mobileDockItemClassName}`;

const labelFor = (href: string, original: string) =>
  ({
    "/admin": "پیشخوان مدیریت",
    "/admin/calendar": "تقویم و نوبت‌ها",
    "/admin/clients": "مراجعین",
    "/admin/articles": "مقالات",
  })[href] ?? original;

export function AdminTopbarTitle() {
  const path = usePathname();
  const item = adminLinks.find(({ href }) => href === path);
  const title = item
    ? labelFor(item.href, item.label)
    : path === "/admin/article-editor"
      ? "ویرایشگر مقاله"
      : path === "/admin/client"
        ? "پروندهٔ مراجع"
        : "پنل مدیریت";
  return (
    <div>
      <p className="admin-ref-top-title m-0 text-[.95rem] font-bold max-[480.02px]:text-[.9rem] max-[480.02px]:whitespace-nowrap">
        {title}
      </p>
      <p className="admin-ref-top-subtitle m-0 text-[.75rem] text-(--panel-muted) max-[480.02px]:hidden">
        مدیریت نوبت‌ها، محتوا و تنظیمات سایت
      </p>
    </div>
  );
}

const selectedHref = (path: string): string => {
  const exact = adminLinks.find(({ href }) => href === path);
  if (exact) return exact.href;
  if (path === "/admin/article-editor") return "/admin/articles";
  return "/admin";
};

export function AdminReferenceNav() {
  const path = usePathname();
  const active = selectedHref(path);
  const reduce = useReducedMotion();

  return (
    <>
      <aside
        className={`admin-ref-sidebar admin-ref-glass ${adminGlassClassName} ${adminSidebarClassName}`}
        aria-label="ناوبری اصلی"
      >
        {/* Brand */}
        <Link
          className="admin-ref-brand mb-3 flex items-center gap-2.5 rounded-[.6rem] border-b border-(--panel-line) px-2.5 pt-2 pb-4 text-inherit no-underline transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#146e83] focus-visible:ring-offset-2 focus-visible:outline-none min-[1024px]:border-[#cedfe3] min-[1024px]:text-[#183c4d] dark:min-[1024px]:border-[#486674] dark:min-[1024px]:text-[#effffb]"
          href="/"
          aria-label="بازگشت به صفحه اصلی"
          title="بازگشت به صفحه اصلی"
        >
          <div className="flex items-center gap-2">
            <BrandMark
              size={40}
              className="admin-ref-logo size-[40px] flex-none rounded-[14px] shadow-[0_0_20px_rgba(20,124,131,0.35)] dark:shadow-[0_0_20px_rgba(163,232,220,0.25)]"
            />
            <div className="flex min-w-0 flex-col">
              <strong className="text-[.98rem] font-extrabold tracking-tight">
                کیانا خرسند
              </strong>
              <small className="text-[.7rem] text-(--panel-muted) min-[1024px]:text-[#547082] dark:min-[1024px]:text-[#b7d0da]">
                پنل مدیریت
              </small>
            </div>
          </div>
        </Link>

        {/* Sections */}
        {sections.map((section, sectionIndex) => (
          <div
            key={section.kicker}
            className="mt-[.9rem] mb-[.6rem] first:mt-0"
          >
            <p
              className="admin-ref-nav-kicker ms-[.1rem] mb-[.35rem] text-[.62rem] font-[750] tracking-[.12em] text-(--panel-muted) uppercase min-[1024px]:text-[#617b87] dark:min-[1024px]:text-[#b7d0da]"
              aria-hidden="true"
            >
              {section.kicker}
            </p>
            <nav
              className="admin-ref-side-nav flex flex-col gap-[.15rem]"
              aria-label={section.kicker}
            >
              {adminLinks
                .filter(({ href }) => section.hrefs.includes(href))
                .map(({ href, label, icon: Icon }, itemIndex) => {
                  const globalIndex = sectionIndex * 10 + itemIndex;
                  return (
                    <AdminSidebarItem
                      key={href}
                      link={{ href, label, icon: Icon }}
                      isActive={href === active}
                      index={globalIndex}
                    />
                  );
                })}
            </nav>
          </div>
        ))}

        {/* Footer */}
        <div className="admin-ref-side-foot mt-auto pt-3 [border-top:1px_solid_var(--panel-line)] min-[1024px]:border-[#c8dce0] dark:min-[1024px]:border-[#486674]">
          <AdminSidebarItem
            link={{
              href: "/",
              label: "مشاهده سایت",
              icon: ExternalLink,
            }}
            isActive={false}
            index={99}
          />
          <form action={adminSignOutAction}>
            <m.button
              type="submit"
              initial={
                reduce
                  ? undefined
                  : { ...sidebarItem.hidden, transition: { delay: 1.05 } }
              }
              animate={{
                ...sidebarItem.visible,
                transition: { delay: 1.05, ...motionTiming.standard },
              }}
              whileHover={reduce ? undefined : sidebarItemGesture.whileHover}
              whileTap={reduce ? undefined : sidebarItemGesture.whileTap}
              transition={motionTiming.hover}
              className="admin-ref-nav-item flex min-h-11 w-full items-center gap-[.7rem] rounded-[14px] px-[.7rem] py-2 text-start text-[.92rem] font-medium text-(--ar-text2) no-underline [background:transparent] [&_svg]:flex-none"
            >
              <LogOut
                size={19}
                className="relative z-10 flex-none shrink-0"
                aria-hidden="true"
              />
              <span className="admin-ref-nav-label relative z-10">
                خروج از حساب
              </span>
            </m.button>
          </form>
        </div>
      </aside>
    </>
  );
}

export function AdminMobileTrigger() {
  const path = usePathname();
  const selected = (href: string) =>
    path === href ||
    (href === "/admin/articles" && path === "/admin/article-editor");
  const extraActive = !prominent.some((href) => selected(href));

  return (
    <div className="admin-ref-menu-trigger block lg:hidden">
      <Sheet>
        <nav
          className={`${mobileDockClassName} admin-ref-mobnav z-45! lg:hidden!`}
          data-dock-active={
            extraActive ? 4 : prominent.findIndex((href) => selected(href))
          }
          aria-label="ناوبری پایین پنل مدیریت"
        >
          {adminLinks
            .filter(({ href }) => prominent.includes(href))
            .map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={mobileItemClass}
                aria-current={selected(href) ? "page" : undefined}
              >
                {selected(href) && <DockSpotlight />}
                <span
                  className={`${mobileDockIconClassName} relative z-10 ${selected(href) ? "text-white" : ""}`}
                >
                  <Icon
                    size={24}
                    aria-hidden="true"
                    className="relative z-10"
                  />
                </span>
                <span className="relative z-10">{labelFor(href, label)}</span>
              </Link>
            ))}
          <SheetTrigger asChild>
            <button
              className={mobileItemClass}
              aria-label="باز کردن فهرست پنل"
              aria-current={extraActive ? "page" : undefined}
              type="button"
            >
              {extraActive && <DockSpotlight />}
              <span
                className={`${mobileDockIconClassName} relative z-10 ${extraActive ? "text-white" : ""}`}
              >
                <LayoutGrid
                  size={24}
                  aria-hidden="true"
                  className="relative z-10"
                />
              </span>
              <span className="relative z-10">بیشتر</span>
            </button>
          </SheetTrigger>
        </nav>
        <SheetContent
          side="right"
          showCloseButton={true}
          className={`${panelSheetClassName} admin-ref-sheet box-border h-dvh min-h-0 w-[min(340px,calc(100vw-16px))]! max-w-none! overflow-hidden rounded-[22px_0_0_22px]! p-[1rem_.85rem_calc(1rem+env(safe-area-inset-bottom,0px))]! text-(--panel-text)! [box-shadow:-18px_0_52px_rgb(18_35_48/17%)] [background:#fff]! [border-inline-start:0]! [border:1px_solid_#dfe7ec] **:data-[slot=sheet-close]:rounded-[10px] **:data-[slot=sheet-close]:text-(--panel-text) motion-reduce:animate-none! motion-reduce:[transition:none]! dark:border-[#344052]! dark:[background:#151a27]! [&_:is(a,button):focus-visible]:[outline:3px_solid_var(--ar-brand-ink)]! [&_:is(a,button):focus-visible]:outline-offset-2! [&_:is(a,button):focus-visible]:outline-[#186778]! dark:[&_:is(a,button):focus-visible]:outline-[#bcefe4]!`}
          overlayClassName="admin-ref-overlay motion-reduce:animate-none! motion-reduce:[transition:none]! [background:rgb(10_19_34_/_42%)]! [backdrop-filter:blur(2px)]!"
        >
          <div className="admin-sheet-head flex min-h-[45px]! flex-none items-center p-[.4rem_.35rem_.7rem] px-1! pt-1! pb-[.8rem]! [border-bottom:1px_solid_var(--panel-line)]!">
            <div className="admin-sheet-brand flex min-w-0 items-center gap-[.65rem] pe-9">
              <BrandMark size={36} className="flex-none rounded-[11px]" />
              <SheetTitle className="font-extrabold! text-(--panel-text)">
                بخش‌های پنل مدیریت
              </SheetTitle>
            </div>
            <SheetDescription className="sr-only">
              یکی از بخش‌های پنل را انتخاب کنید یا فهرست را ببندید.
            </SheetDescription>
          </div>
          <nav
            aria-label="سایر بخش‌های پنل مدیریت"
            className="admin-ref-side-nav admin-sheet-links flex min-h-0 flex-[1_1_auto] scrollbar-thin [scrollbar-color:#abbcc4_transparent] flex-col gap-[.2rem] overflow-x-hidden overflow-y-auto overscroll-contain px-[.1rem] py-[.35rem]"
          >
            {adminLinks
              .filter(({ href }) => !prominent.includes(href))
              .map(({ href, label, icon: Icon }) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    className="sheet-item flex min-h-[46px] items-center gap-[.7rem] rounded-[14px] px-[.7rem] py-2 text-start text-[.92rem] font-medium text-(--ar-text2) no-underline hover:bg-(--ar-brand-soft) hover:text-(--ar-brand-ink) aria-[current=page]:bg-(--ar-brand-soft) aria-[current=page]:font-bold aria-[current=page]:text-(--ar-brand-ink) [&_svg]:flex-none"
                    aria-current={path === href ? "page" : undefined}
                  >
                    <Icon size={19} aria-hidden="true" />
                    {label}
                  </Link>
                </SheetClose>
              ))}
          </nav>
          <div className="admin-sheet-footer flex-none pt-2 [border-block-start:1px_solid_var(--panel-line)]">
            <SheetClose asChild>
              <Link
                href="/"
                className="sheet-footer-item flex min-h-[42px] items-center gap-[.7rem] rounded-[14px] px-[.7rem] py-2 text-start text-[.92rem] font-medium text-(--ar-text2) no-underline hover:bg-(--ar-brand-soft) hover:text-(--ar-brand-ink) [&_svg]:flex-none"
              >
                <ExternalLink size={19} aria-hidden="true" />
                مشاهده سایت
              </Link>
            </SheetClose>
            <form action={adminSignOutAction}>
              <button
                type="submit"
                className="sheet-footer-item flex min-h-[42px] items-center gap-[.7rem] rounded-[14px] px-[.7rem] py-2 text-start text-[.92rem] font-medium text-(--ar-text2) no-underline hover:bg-(--ar-brand-soft) hover:text-(--ar-brand-ink) [&_svg]:flex-none"
              >
                <LogOut size={19} aria-hidden="true" />
                خروج از حساب
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
