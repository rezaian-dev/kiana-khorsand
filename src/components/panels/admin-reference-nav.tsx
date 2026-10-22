"use client";

import { BrandMark } from "@/components/shared/brand-mark";

import {
  adminGlassClassName,
  panelSheetClassName,
} from "./panel-layout-classes";

import Link from "next/link";
import { motion } from "motion/react";
import { DockSpotlight } from "@/components/layout/dock-spotlight";
import {
  mobileDockClassName,
  mobileDockIconClassName,
  mobileDockItemClassName,
} from "@/components/layout/mobile-dock-classes";
import { usePathname } from "next/navigation";
import { LayoutGrid, ExternalLink, LogOut } from "lucide-react";
import { signOutAction } from "@/actions/auth";
import { adminLinks } from "@/features/admin/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MotionLink = motion.create(Link);

// One semantic nav skin for desktop, the mobile sheet, and the sidebar footer.
const navItemClass =
  "admin-ref-nav-item flex min-h-11 w-full items-center gap-[.7rem] rounded-[14px] [background:transparent] px-[.7rem] py-2 text-start text-[.92rem] font-medium text-[var(--ar-text2)] no-underline hover:bg-[var(--ar-brand-soft)] hover:text-[var(--ar-brand-ink)] aria-[current=page]:bg-[var(--ar-brand-soft)] aria-[current=page]:font-bold aria-[current=page]:text-[var(--ar-brand-ink)] [&_svg]:flex-none [.admin-ref-frame_&]:aria-[current=page]:[border-inline-start-width:3px]! max-[1023.02px]:[.admin-ref-frame_&]:aria-[current=page]:[border-inline-start:3px_solid_var(--panel-accent)] [.admin-ref-sidebar_&]:hover:[@media(scripting:none)]:[transform:translateX(-2px)]! motion-reduce:[.admin-ref-sidebar_&]:hover:[transform:translateX(-2px)]! min-[1024px]:[.admin-ref-sidebar_&]:transition-[background-color,color]! min-[1024px]:[.admin-ref-sidebar_&]:duration-200! min-[1024px]:[.admin-ref-sidebar_&]:ease-[ease]! motion-reduce:[.admin-ref-sidebar_&]:transition-none! motion-reduce:min-[1024px]:[.admin-ref-frame_.admin-ref-sidebar_&]:transition-[background-color,color]! motion-reduce:min-[1024px]:[.admin-ref-frame_.admin-ref-sidebar_&]:duration-200! motion-reduce:min-[1024px]:[.admin-ref-frame_.admin-ref-sidebar_&]:ease-[ease]!";
// Radix portals the sheet to body: these tokens cannot inherit from .admin-ref-frame.
const adminSheetPaletteClassName =
  "[--panel-surface:#fff] [--panel-text:#182234] [--panel-muted:#526074] [--panel-line:#e4e9f0] [--ar-text2:#415064] [--ar-brand-soft:#e6f3f2] [--ar-brand-ink:#176c67] dark:[--panel-surface:#151a27] dark:[--panel-text:#eef1f7] dark:[--panel-muted:#aab5c7] dark:[--panel-line:#344052] dark:[--ar-text2:#c1cbd8] dark:[--ar-brand-soft:#213d42] dark:[--ar-brand-ink:#a3e8dc]";
const sheetItemClass = `${navItemClass} flex-none min-h-[46px] font-[650]! rounded-none! aria-[current=page]:rounded-[14px_0_0_14px]! aria-[current=page]:[background:linear-gradient(100deg,#e7f8f4,#eaf2fa)]! aria-[current=page]:[box-shadow:inset_3px_0_#36ab9d]! aria-[current=page]:text-[#145b6b]! dark:aria-[current=page]:[background:linear-gradient(100deg,#244b4e,#263a58)]! dark:aria-[current=page]:text-[#bcf1e4]!`;
const sheetFooterItemClass = `${sheetItemClass} min-h-[42px]!`;
const mobileItemClass = `${mobileDockItemClassName}`;

const prominent = [
  "/admin",
  "/admin/calendar",
  "/admin/clients",
  "/admin/articles",
];
const labelFor = (href: string, original: string) =>
  ({
    "/admin": "داشبورد",
    "/admin/calendar": "نوبت‌ها",
    "/admin/clients": "مراجعین",
    "/admin/articles": "محتوا",
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
      <p className="admin-ref-top-subtitle m-0 text-[.75rem] text-[var(--panel-muted)] max-[480.02px]:hidden">
        مدیریت نوبت‌ها، محتوا و تنظیمات سایت
      </p>
    </div>
  );
}

export function AdminReferenceNav() {
  const path = usePathname();
  const selected = (href: string) =>
    path === href ||
    (href === "/admin/articles" && path === "/admin/article-editor");
  return (
    <>
      <aside
        className={`admin-ref-sidebar admin-ref-glass ${adminGlassClassName} fixed inset-y-4 start-4 z-40 hidden w-[264px] flex-col gap-[.35rem] overflow-y-auto p-[.875rem] min-[1024px]:flex min-[1024px]:border-[#cee0e2] min-[1024px]:[padding:.9rem_.7rem] min-[1024px]:[box-shadow:-12px_16px_40px_-24px_#36657672] min-[1024px]:[backdrop-filter:none] min-[1024px]:[background:radial-gradient(circle_at_12%_6%,#d7e8f8a8,transparent_34%),radial-gradient(circle_at_100%_95%,#ebdff59c,transparent_38%),linear-gradient(157deg,#f6fbfb_0%,#edf5f7_55%,#f7f3fa_100%)] dark:min-[1024px]:border-[#365464] dark:min-[1024px]:[box-shadow:-12px_16px_40px_-24px_#030c1bc9] dark:min-[1024px]:[background:radial-gradient(circle_at_12%_6%,#31536980,transparent_34%),radial-gradient(circle_at_100%_95%,#403b6b55,transparent_38%),linear-gradient(157deg,#213743_0%,#172b38_55%,#1b283a_100%)] min-[1024px]:[&_.admin-ref-nav-item]:relative min-[1024px]:[&_.admin-ref-nav-item]:isolate min-[1024px]:[&_.admin-ref-nav-item]:min-h-11 min-[1024px]:[&_.admin-ref-nav-item]:rounded-none min-[1024px]:[&_.admin-ref-nav-item]:font-bold min-[1024px]:[&_.admin-ref-nav-item]:text-[#345368] min-[1024px]:[&_.admin-ref-nav-item]:[border:1px_solid_transparent] dark:min-[1024px]:[&_.admin-ref-nav-item]:text-[#d2e7eb] min-[1024px]:[&_.admin-ref-nav-item_svg]:size-[22px] min-[1024px]:[&_.admin-ref-nav-item_svg]:rounded-[7px] min-[1024px]:[&_.admin-ref-nav-item_svg]:bg-[#cfe5e58a] min-[1024px]:[&_.admin-ref-nav-item_svg]:p-[2px] dark:min-[1024px]:[&_.admin-ref-nav-item_svg]:bg-[#385767] min-[1024px]:[&_.admin-ref-nav-item:focus-visible]:[outline:3px_solid_#146e83] min-[1024px]:[&_.admin-ref-nav-item:focus-visible]:[outline-offset:-3px] min-[1024px]:[&_.admin-ref-nav-item:hover]:bg-[#dcefee] min-[1024px]:[&_.admin-ref-nav-item:hover]:text-[#165e69] dark:min-[1024px]:[&_.admin-ref-nav-item:hover]:bg-[#304f5c] dark:min-[1024px]:[&_.admin-ref-nav-item:hover]:text-[#f6fffc] min-[1024px]:[&_.admin-ref-nav-item>svg]:relative min-[1024px]:[&_.admin-ref-nav-item>svg]:z-[1] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:rounded-[18px_0_0_18px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:[border-color:transparent] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:text-[#144e60] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:[background:transparent] dark:min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:text-[#effffb] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]_svg]:bg-[#c5e5e1] dark:min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]_svg]:bg-[#397879] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:absolute min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:[inset-inline-start:2px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:top-1/2 min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:z-[2] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:h-[22px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:w-1 min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:[transform:translateY(-50%)] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:rounded-[9px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:bg-[#138c8f] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:content-[''] dark:min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:bg-[#91ead8] min-[1024px]:[&_.admin-ref-nav-label]:relative min-[1024px]:[&_.admin-ref-nav-label]:z-[1]`}
        aria-label="ناوبری اصلی"
      >
        <Link
          className="admin-ref-brand mb-1 flex items-center gap-2.5 rounded-[.4rem] border-b border-[var(--panel-line)] px-2 pt-1.5 pb-3.5 text-inherit no-underline transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#146e83] focus-visible:ring-offset-2 min-[1024px]:border-[#cedfe3] min-[1024px]:text-[#183c4d] dark:min-[1024px]:border-[#486674] dark:min-[1024px]:text-[#effffb]"
          href="/"
          aria-label="بازگشت به صفحه اصلی"
          title="بازگشت به صفحه اصلی"
        >
          <BrandMark
            size={42}
            className="admin-ref-logo size-[42px] flex-none rounded-[14px]"
          />
          <span className="flex min-w-0 flex-col">
            <strong className="text-[.95rem] font-bold">کیانا خرسند</strong>
            <small className="text-[.72rem] text-[var(--panel-muted)] min-[1024px]:text-[#547082] dark:min-[1024px]:text-[#b7d0da]">
              پنل مدیریت
            </small>
          </span>
        </Link>
        <p
          className="admin-ref-nav-kicker min-[1024px]:[margin:.05rem_.7rem_.15rem_0] min-[1024px]:text-[.68rem] min-[1024px]:font-[750] min-[1024px]:tracking-[.01em] min-[1024px]:text-[#617b87] dark:min-[1024px]:text-[#b7d0da]"
          aria-hidden="true"
        >
          فضای مدیریت
        </p>
        <nav
          className="admin-ref-side-nav flex flex-col gap-[.2rem] min-[1024px]:-ms-[.58rem] min-[1024px]:min-h-0 min-[1024px]:[scrollbar-width:thin] min-[1024px]:[scrollbar-color:#92b7bf78_transparent] min-[1024px]:overflow-x-hidden min-[1024px]:overflow-y-auto min-[1024px]:overscroll-contain min-[1024px]:[padding:.25rem_.15rem_.25rem_.25rem]"
          aria-label="بخش‌های پنل"
        >
          {adminLinks.map(({ href, label, icon: Icon }) => (
            <MotionLink
              key={href}
              href={href}
              className={navItemClass}
              initial={false}
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              aria-current={selected(href) ? "page" : undefined}
            >
              {selected(href) && (
                <span
                  className="admin-ref-rail-selection motion-safe:transition-opacity motion-safe:duration-300 min-[1024px]:pointer-events-none min-[1024px]:absolute min-[1024px]:inset-0 min-[1024px]:z-0 min-[1024px]:rounded-[18px_0_0_18px] min-[1024px]:[box-shadow:0_9px_24px_-14px_#27728574] min-[1024px]:[background:linear-gradient(104deg,#d9f1eb,#e2eef9)] min-[1024px]:[border:1px_solid_#a4d3d0] dark:min-[1024px]:border-[#598f90] dark:min-[1024px]:[box-shadow:0_9px_24px_-14px_#071426] dark:min-[1024px]:[background:linear-gradient(104deg,#245a63,#334e6c)]"
                  aria-hidden="true"
                />
              )}
              <Icon size={19} aria-hidden="true" />
              <span className="admin-ref-nav-label">
                {labelFor(href, label)}
              </span>
            </MotionLink>
          ))}
        </nav>
        <div className="admin-ref-side-foot mt-auto pt-3 [border-top:1px_solid_var(--panel-line)] min-[1024px]:border-[#c8dce0] dark:min-[1024px]:border-[#486674]">
          <MotionLink
            className={navItemClass}
            href="/"
            initial={false}
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ExternalLink size={19} aria-hidden="true" />
            مشاهده سایت
          </MotionLink>
          <form action={signOutAction}>
            <motion.button
              type="submit"
              className={navItemClass}
              initial={false}
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <LogOut size={19} aria-hidden="true" />
              خروج از حساب
            </motion.button>
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
          className={`${mobileDockClassName} admin-ref-mobnav z-[45]! lg:hidden!`}
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
                <span className={`${mobileDockIconClassName} relative z-10 ${selected(href) ? "text-white" : ""}`}>
                  <Icon size={24} aria-hidden="true" className="relative z-10" />
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
              <span className={`${mobileDockIconClassName} relative z-10 ${extraActive ? "text-white" : ""}`}>
                <LayoutGrid size={24} aria-hidden="true" className="relative z-10" />
              </span>
              <span className="relative z-10">بیشتر</span>
            </button>
          </SheetTrigger>
        </nav>
        <SheetContent
          side="right"
          showCloseButton={true}
          className={`${panelSheetClassName} ${adminSheetPaletteClassName} admin-ref-sheet box-border h-dvh min-h-0 w-[min(340px,calc(100vw-16px))]! max-w-none! overflow-hidden rounded-[22px_0_0_22px]! [padding:1rem_.85rem_calc(1rem+env(safe-area-inset-bottom,0px))]! text-[var(--panel-text)]! [box-shadow:-18px_0_52px_rgb(18_35_48_/_17%)] [background:#fff]! [border-inline-start:0]! [border:1px_solid_#dfe7ec] motion-reduce:animate-none! motion-reduce:[transition:none]! dark:[border-color:#344052]! dark:[background:#151a27]! [&_:is(a,button):focus-visible]:[outline:3px_solid_var(--ar-brand-ink)]! [&_:is(a,button):focus-visible]:outline-offset-2! [&_:is(a,button):focus-visible]:outline-[#186778]! dark:[&_:is(a,button):focus-visible]:outline-[#bcefe4]! [&_[data-slot=sheet-close]]:rounded-[10px] [&_[data-slot=sheet-close]]:text-[var(--panel-text)]`}
          overlayClassName="admin-ref-overlay motion-reduce:animate-none! motion-reduce:[transition:none]! [background:rgb(10_19_34_/_42%)]! [backdrop-filter:blur(2px)]!"
        >
          <div className="admin-sheet-head flex min-h-[45px]! flex-none items-center [padding:.4rem_.35rem_.7rem] px-1! pt-1! pb-[.8rem]! [border-bottom:1px_solid_var(--panel-line)]!">
            <div className="admin-sheet-brand flex min-w-0 items-center gap-[.65rem] pe-9">
              <BrandMark size={36} className="flex-none rounded-[11px]" />
              <SheetTitle className="font-extrabold! text-[var(--panel-text)]">
                بخش‌های پنل مدیریت
              </SheetTitle>
            </div>
            <SheetDescription className="sr-only">
              یکی از بخش‌های پنل را انتخاب کنید یا فهرست را ببندید.
            </SheetDescription>
          </div>
          <nav
            aria-label="سایر بخش‌های پنل مدیریت"
            className="admin-ref-side-nav admin-sheet-links flex min-h-0 flex-[1_1_auto] [scrollbar-width:thin] [scrollbar-color:#abbcc4_transparent] flex-col gap-[.2rem] overflow-x-hidden overflow-y-auto overscroll-contain px-[.1rem] py-[.35rem]"
          >
            {adminLinks
              .filter(({ href }) => !prominent.includes(href))
              .map(({ href, label, icon: Icon }) => (
                <SheetClose asChild key={href}>
                  <Link
                    href={href}
                    className={sheetItemClass}
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
              <Link href="/" className={sheetFooterItemClass}>
                <ExternalLink size={19} aria-hidden="true" />
                مشاهده سایت
              </Link>
            </SheetClose>
            <form action={signOutAction}>
              <button type="submit" className={sheetFooterItemClass}>
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
