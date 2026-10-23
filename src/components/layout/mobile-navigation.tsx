"use client";

import { BrandMark } from "@/components/shared/brand-mark";

import Link from "next/link";
import { m } from "motion/react";
import { useLiveReducedMotion } from "./use-live-reduced-motion";
import { usePathname } from "next/navigation";
import { PublicDockSpotlight } from "./dock-spotlight";
import {
  mobileDockClassName,
  mobileDockIconClassName,
  mobileDockItemClassName,
  publicMovingDockClassName,
} from "./public-styles";
import { House, Compass, BookOpen, CalendarDays, Grid2X2 } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menu = [
  { href: "/about", label: "درباره من", icon: "ph-user", tone: "indigo" },
  { href: "/areas", label: "حوزه‌های کار", icon: "ph-compass", tone: "plum" },
  { href: "/approach", label: "روش کار", icon: "ph-path", tone: "teal" },
  { href: "/fees", label: "تعرفه‌ها", icon: "ph-receipt", tone: "amber" },
  { href: "/articles", label: "مقاله‌ها", icon: "ph-article", tone: "rose" },
  {
    href: "/workshops",
    label: "کارگاه‌ها",
    icon: "ph-chalkboard",
    tone: "violet",
  },
  {
    href: "/faq",
    label: "سؤال‌های پرتکرار",
    icon: "ph-question",
    tone: "indigo",
  },
  { href: "/contact", label: "تماس", icon: "ph-chats-circle", tone: "plum" },
] as const;

const menuTileClasses = {
  violet: "[background-image:linear-gradient(135deg,#9e85ff,var(--c-violet))]",
  indigo: "[background-image:linear-gradient(135deg,#92a0ff,var(--c-indigo))]",
  plum: "[background-image:linear-gradient(135deg,#db85c9,var(--c-plum))]",
  teal: "[background-image:linear-gradient(135deg,#6fdcc4,var(--c-teal))]",
  amber: "[background-image:linear-gradient(135deg,#ffc882,var(--c-amber))]",
  rose: "[background-image:linear-gradient(135deg,#ff9baa,var(--c-rose))]",
} as const;

const dockLinks = [
  { href: "/articles", label: "مقالات", icon: BookOpen },
  { href: "/areas", label: "حوزه‌ها", icon: Compass },
  { href: "/", label: "خانه", icon: House },
  { href: "/book", label: "رزرو", icon: CalendarDays },
] as const;

const additionalMenuLinks = menu.filter(
  ({ href }) => !dockLinks.some((item) => item.href === href),
);

const itemInitial = { opacity: 0, x: 44, y: 6 } as const;
const itemVisible = { opacity: 1, x: 0, y: 0 } as const;
const itemTransition = { duration: 0.24, ease: [0.2, 0.8, 0.2, 1] } as const;
const lineTransition = {
  duration: 0.65,
  delay: 0.18,
  ease: [0.16, 1, 0.3, 1],
} as const;

const socials = [
  { key: "instagram", label: "اینستاگرام", icon: "ph-instagram-logo" },
  { key: "telegram", label: "تلگرام", icon: "ph-telegram-logo" },
  { key: "whatsapp", label: "واتساپ", icon: "ph-whatsapp-logo" },
] as const;

const socialToneClasses = {
  instagram: "text-[var(--c-plum)]",
  telegram: "text-[var(--c-teal)]",
  whatsapp: "text-[var(--c-teal)]",
} as const;

type SocialLinks = {
  instagram?: string | null;
  telegram?: string | null;
  whatsapp?: string | null;
};

export function MobileNavigation({ social }: { social?: SocialLinks }) {
  const pathname = usePathname();
  const reduceMotion = useLiveReducedMotion();
  // Never show public dock inside account/admin panels — those have their own panel docks
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }
  const current = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  const extraActive = !dockLinks.some(({ href }) => current(href));
  const activeIndex = extraActive
    ? 4
    : dockLinks.findIndex(({ href }) => current(href));

  const handleTap = () => {
    // No haptic vibration — keeps PWA stable, no shake on tap (respects UX best practice: <300ms transform-only)
  };

  return (
    <Sheet>
      <nav
        className={`site-bottom-dock ${mobileDockClassName} ${publicMovingDockClassName} min-[769px]:hidden`}
        data-dock-active={activeIndex}
        aria-label="ناوبری پایین سایت"
      >
        {dockLinks.map(({ href, label, icon: Icon }) => {
          const isActive = current(href);
          return (
            <Link
              key={href}
              href={href}
              prefetch
              onClick={handleTap}
              className={mobileDockItemClassName}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && <PublicDockSpotlight reduced={reduceMotion} />}
              <span
                className={`${mobileDockIconClassName} ${isActive ? "text-white" : ""}`}
              >
                <Icon
                  size={24}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  aria-hidden="true"
                  className="relative z-10"
                />
              </span>
              <span
                className={`relative z-10 text-[11px] leading-none font-bold tracking-wide max-[360px]:text-[10px] ${isActive ? "text-white" : ""}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
        <SheetTrigger asChild>
          <button
            type="button"
            onClick={handleTap}
            className={mobileDockItemClassName}
            aria-label="باز کردن فهرست"
            aria-current={extraActive ? "page" : undefined}
          >
            {extraActive && <PublicDockSpotlight reduced={reduceMotion} />}
            <span
              className={`${mobileDockIconClassName} ${extraActive ? "text-white" : ""}`}
            >
              <Grid2X2
                size={24}
                strokeWidth={extraActive ? 2.4 : 1.8}
                aria-hidden="true"
                className="relative z-10"
              />
            </span>
            <span
              className={`relative z-10 text-[11px] leading-none font-bold tracking-wide max-[360px]:text-[10px] ${extraActive ? "text-white" : ""}`}
            >
              بیشتر
            </span>
          </button>
        </SheetTrigger>
      </nav>

      <SheetContent
        side="right"
        customAnimation
        showCloseButton={false}
        overlayClassName="bg-[rgba(14,13,24,0.55)]! backdrop-filter-none! [&:where([data-state=open],[data-open]:not([data-open=false]))]:animate-ref-overlay-in [&:where([data-state=closed],[data-closed]:not([data-closed=false]))]:animate-ref-overlay-out motion-reduce:animate-none!"
        className="ref-menu-sheet [&:where([data-state=open],[data-open]:not([data-open=false]))]:animate-ref-menu-open [&:where([data-state=closed],[data-closed]:not([data-closed=false]))]:animate-ref-menu-close right-0! left-auto! flex! h-dvh! w-[min(88vw,380px)]! max-w-none! min-w-0 flex-col! gap-0! overflow-hidden! rounded-[28px_0_0_28px]! border! border-r-0! border-[var(--line)]! bg-[var(--glass-strong)]! px-[.875rem]! pt-[env(safe-area-inset-top,0px)]! pb-[calc(.55rem+env(safe-area-inset-bottom,0px))]! text-[var(--fg)]! shadow-[-14px_0_50px_rgba(18,15,43,0.18)]! backdrop-blur-[24px]! backdrop-saturate-[180%]! transition-none! motion-reduce:animate-none!"
        aria-describedby={undefined}
      >
        <m.div
          data-menu-topline
          className="absolute inset-x-5 top-0 z-[2] h-[3px] origin-right rounded-b-[99px] [background-image:var(--grad-sunset)]"
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={lineTransition}
          aria-hidden="true"
        />
        <div className="ref-menu-content min-h-0 flex-1 [scrollbar-width:thin] [scrollbar-color:var(--line)_transparent] overflow-x-hidden overflow-y-auto overscroll-contain pt-4 pb-[.35rem] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--line)] [&::-webkit-scrollbar-track]:bg-transparent">
          <m.div
            className="mb-2 flex items-center justify-between gap-2"
            data-menu-item=""
            initial={reduceMotion ? false : itemInitial}
            animate={itemVisible}
            transition={itemTransition}
          >
            <SheetTitle className="text-base font-extrabold! text-[var(--fg)]!">
              <SheetClose asChild>
                <Link href="/" className="flex items-center gap-2.5 px-1 py-1">
                  <BrandMark
                    size={32}
                    className="h-8 w-8 flex-none rounded-xl object-cover"
                  />
                  <span className="text-base font-extrabold">کیانا خرسند</span>
                </Link>
              </SheetClose>
            </SheetTitle>
            <SheetClose asChild>
              <button
                type="button"
                aria-label="بستن فهرست"
                className="border-line bg-surface group/close grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border text-[var(--fg)]!"
              >
                <i
                  className="ph-bold ph-x text-[1.1rem] transition-[transform] duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/close:[transform:rotate(90deg)] motion-reduce:transition-none motion-reduce:group-hover/close:[transform:none]"
                  aria-hidden="true"
                />
              </button>
            </SheetClose>
          </m.div>
          <nav aria-label="ناوبری موبایل" className="ref-menu-nav">
            <ul className="flex flex-col gap-0.5">
              {additionalMenuLinks.map((item) => (
                <m.li
                  key={item.href}
                  data-menu-item=""
                  initial={reduceMotion ? false : itemInitial}
                  animate={itemVisible}
                  transition={itemTransition}
                >
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="sheet-link group/link relative isolate flex min-h-12 items-center justify-between gap-3 overflow-hidden rounded-[14px] py-[.35rem] pr-[.55rem] pl-5 text-base font-bold text-[var(--fg)] no-underline transition-[transform] duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] before:absolute before:inset-0 before:-z-1 before:origin-right before:[transform:scaleX(0)] before:rounded-[inherit] before:[background-image:linear-gradient(-90deg,color-mix(in_srgb,var(--c-violet)_12%,transparent),color-mix(in_srgb,var(--c-plum)_12%,transparent))] before:transition-[transform] before:duration-[500ms] before:ease-[cubic-bezier(0.2,0.8,0.2,1)] before:content-[''] hover:[transform:translateX(-4px)] hover:before:[transform:scaleX(1)] focus-visible:[transform:translateX(-4px)] focus-visible:before:[transform:scaleX(1)] motion-reduce:transition-none motion-reduce:before:transition-none motion-reduce:hover:[transform:none] motion-reduce:hover:before:[transform:none] motion-reduce:focus-visible:[transform:none] motion-reduce:focus-visible:before:[transform:none]"
                    >
                      <span className="inline-flex min-w-0 items-center gap-[.7rem]">
                        <span
                          className={`grid h-[34px] w-[34px] flex-none place-items-center rounded-[11px] text-[1.05rem] text-white [box-shadow:inset_0_1px_0_rgba(255,255,255,0.28),0_6px_14px_-8px_rgba(25,23,49,0.45)] transition-[transform] duration-[450ms] ease-[ease] group-hover/link:[transform:scale(1.08)_rotate(-6deg)] group-focus-visible/link:[transform:scale(1.08)_rotate(-6deg)] motion-reduce:transition-none motion-reduce:group-hover/link:[transform:none] motion-reduce:group-focus-visible/link:[transform:none] ${menuTileClasses[item.tone]}`}
                          aria-hidden="true"
                        >
                          <i className={`ph-duotone ${item.icon}`} />
                        </span>
                        <span className="break-words">{item.label}</span>
                      </span>
                      <i
                        className="ph-bold ph-arrow-left flex-none text-[.9rem] text-[var(--muted)] transition-[transform,color] [transition-duration:450ms,300ms] [transition-timing-function:ease,ease] group-hover/link:[transform:translateX(-8px)] group-hover/link:text-[var(--fg)] group-focus-visible/link:[transform:translateX(-8px)] group-focus-visible/link:text-[var(--fg)] motion-reduce:transition-none motion-reduce:group-hover/link:[transform:none] motion-reduce:group-focus-visible/link:[transform:none]"
                        aria-hidden="true"
                      />
                    </Link>
                  </SheetClose>
                </m.li>
              ))}
            </ul>
          </nav>
          <div
            data-menu-line
            className="my-4 h-px opacity-[.55] [background:var(--grad-sunset)]"
            aria-hidden="true"
          />
          <m.div
            className="mb-2 text-xs leading-[1.428571] font-extrabold text-[var(--muted)]"
            data-menu-item=""
            initial={reduceMotion ? false : itemInitial}
            animate={itemVisible}
            transition={itemTransition}
          >
            من در شبکه‌های اجتماعی
          </m.div>
          <m.ul
            className="flex items-center gap-2.5"
            data-menu-item=""
            initial={reduceMotion ? false : itemInitial}
            animate={itemVisible}
            transition={itemTransition}
          >
            {socials.map(
              (item) =>
                social?.[item.key] && (
                  <li key={item.key}>
                    <a
                      href={social[item.key]!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-btn grid h-11 w-11 place-items-center overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--surface)] text-[1.15rem] transition-[transform,box-shadow,background,color] [transition-duration:450ms,450ms,450ms,450ms] [transition-timing-function:ease,ease,ease,ease] hover:[transform:translateY(-3px)_rotate(-5deg)] hover:text-white hover:[box-shadow:var(--shadow-soft)] hover:[background:linear-gradient(135deg,var(--c-plum),var(--c-violet))] focus-visible:ring-2 focus-visible:ring-[var(--c-violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--glass-strong)] motion-reduce:transition-none motion-reduce:hover:[transform:none] ${socialToneClasses[item.key]}`}
                      aria-label={item.label}
                    >
                      <i
                        className={`ph-duotone ${item.icon} text-[1.15rem]`}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ),
            )}
          </m.ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
