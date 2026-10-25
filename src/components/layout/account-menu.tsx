"use client";

import { publicAccountTriggerClassName } from "@/components/layout/public-styles";
import Link from "next/link";
import { safeAvatarUrl } from "@/lib/avatar-url";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useTransition } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { m } from "motion/react";
import { useLiveReducedMotion } from "@/components/layout/use-live-reduced-motion";
import {
  BellRing,
  CalendarDays,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { signOutInPlaceAction } from "@/actions/auth";

const accountIconVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -2, scale: 1.06 },
};
const publicAccountIconFallback =
  "[@media(scripting:none)]:transition-transform [@media(scripting:none)]:duration-[250ms] [@media(scripting:none)]:ease-[cubic-bezier(0.22,1,0.36,1)] [@media(scripting:none)]:group-hover/account:-translate-y-0.5 [@media(scripting:none)]:group-hover/account:scale-[1.06] group-data-[state=open]/account:transform-none! group-data-[state=open]/account:[translate:0]! group-data-[state=open]/account:[scale:1]! motion-reduce:[transition:none]! motion-reduce:[transform:none]! [@media(scripting:enabled)]:motion-reduce:group-hover/account:[transform:translateY(-2px)_scale(1.06)]!";

/**
 * The one account menu for every signed-in visitor.
 *
 * It intentionally has no administrator destinations: an administrator who signs in
 * through the public form is, for the public site, simply a customer. The admin area
 * is reached by its own address (`/admin`) and its own sign-in page.
 */
export function AccountMenu({
  name,
  image,
  userId,
  notifications,
  publicScope = false,
}: {
  name: string;
  image?: string | null;
  userId: string;
  notifications?: { unread: number; latestId: string | null };
  publicScope?: boolean;
}) {
  const avatar = safeAvatarUrl(image, userId);
  const reduceMotion = useLiveReducedMotion();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const lastRefresh = useRef(0);
  // Refresh the server-scoped preview only while the account tab is visible.
  useEffect(() => {
    lastRefresh.current = Date.now();
    const refreshIfDue = () => {
      if (
        document.visibilityState !== "visible" ||
        Date.now() - lastRefresh.current < 120_000
      )
        return;
      lastRefresh.current = Date.now();
      router.refresh();
    };
    const timer = window.setInterval(refreshIfDue, 120_000);
    document.addEventListener("visibilitychange", refreshIfDue);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshIfDue);
    };
  }, [router]);
  return (
    <DropdownMenu.Root dir="rtl" modal={false}>
      <DropdownMenu.Trigger asChild>
        <m.button
          type="button"
          initial={false}
          animate="rest"
          whileHover={publicScope ? "hover" : undefined}
          className={publicAccountTriggerClassName}
          aria-label={`باز کردن منوی حساب کاربری${notifications?.unread ? `؛ ${notifications.unread} پیام خوانده‌نشده` : ""}`}
          title="حساب کاربری"
        >
          <m.svg
            className={`site-account-symbol block! size-6! text-inherit! ${publicScope ? publicAccountIconFallback : ""}`}
            variants={publicScope ? accountIconVariants : undefined}
            transition={{
              duration: reduceMotion ? 0 : 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="3.25" />
            <path d="M5.5 20v-1.5a6.5 6.5 0 0 1 13 0V20" />
          </m.svg>
          {Boolean(notifications?.unread) && (
            <m.span
              key={`${notifications?.unread}-${notifications?.latestId}`}
              initial={false}
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [0.6, 1.15, 1], opacity: [0.65, 1, 1] }
              }
              transition={{ duration: 0.55, ease: [0.2, 1, 0.4, 1] }}
              className="absolute -inset-s-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-teal-700 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900"
              aria-hidden="true"
            >
              {(notifications?.unread ?? 0) > 9 ? "۹+" : notifications?.unread}
            </m.span>
          )}
        </m.button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="site-account-dropdown data-[state=open]:animate-account-menu-in data-[state=closed]:animate-account-menu-out z-65 min-w-[min(90vw,260px)] rounded-[1.1rem] border border-(--site-line) bg-(--site-surface) p-[.55rem] text-(--site-ink) [box-shadow:0_22px_56px_#1b143730] [direction:rtl] motion-reduce:animate-none [&_[role=menuitem]:hover]:bg-[color-mix(in_srgb,var(--site-violet)_10%,var(--site-surface))] [&_[role=menuitem][data-highlighted]]:bg-[color-mix(in_srgb,var(--site-violet)_10%,var(--site-surface))] **:[[role=menuitem]]:flex **:[[role=menuitem]]:min-h-[42px] **:[[role=menuitem]]:w-full **:[[role=menuitem]]:cursor-pointer **:[[role=menuitem]]:items-center **:[[role=menuitem]]:gap-[.7rem] **:[[role=menuitem]]:rounded-[.65rem] **:[[role=menuitem]]:p-[.55rem_.65rem] **:[[role=menuitem]]:text-end **:[[role=menuitem]]:text-[.84rem] **:[[role=menuitem]]:font-bold **:[[role=menuitem]]:outline-none [body:has(.site-shell)_&]:origin-top-left [body:has(.site-shell)_&]:will-change-[transform,opacity]"
          aria-label="منوی حساب کاربری"
        >
          <div className="site-account-identity flex min-w-0 items-center gap-[.7rem] p-[.65rem_.55rem]">
            <span
              className="site-account-avatar grid size-[38px] flex-none place-items-center rounded-[50%] bg-[#ede5fc] font-extrabold text-[#5130ad] has-[.site-account-image]:overflow-hidden! has-[.site-account-image]:p-0! dark:bg-[#44345b] dark:text-[#d7c6ff]"
              aria-hidden="true"
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt=""
                  width={44}
                  height={44}
                  unoptimized
                  className="site-account-image size-full rounded-[50%] object-cover"
                />
              ) : (
                name.trim().slice(0, 1)
              )}
            </span>
            <div className="grid min-w-0">
              <strong className="truncate text-[.86rem]">{name}</strong>
              <small className="text-(--site-muted)">حساب کاربری</small>
            </div>
          </div>
          <DropdownMenu.Separator className="site-account-separator my-[.4rem] h-px bg-(--site-line)" />
          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard/messages"
              aria-label={
                notifications?.unread
                  ? `اعلان‌ها؛ ${new Intl.NumberFormat("fa-IR").format(notifications.unread)} پیام خوانده‌نشده`
                  : "اعلان‌ها"
              }
            >
              <m.span
                key={`${notifications?.unread}-${notifications?.latestId}`}
                className="inline-flex shrink-0 origin-top items-center justify-center"
                initial={false}
                animate={
                  notifications?.unread && !reduceMotion
                    ? {
                        rotate: [0, -18, 14, -8, 4, 0],
                        scale: [1, 1.12, 1.12, 1.05, 1, 1],
                      }
                    : undefined
                }
                transition={
                  notifications?.unread && !reduceMotion
                    ? {
                        duration: 0.85,
                        times: [0, 0.2, 0.42, 0.62, 0.8, 1],
                        ease: [0.2, 0.85, 0.2, 1] as const,
                        repeat: Infinity,
                        repeatDelay: 3.2,
                        repeatType: "loop" as const,
                      }
                    : {
                        duration: 0.85,
                        times: [0, 0.2, 0.42, 0.62, 0.8, 1],
                        ease: [0.2, 0.85, 0.2, 1] as const,
                      }
                }
              >
                <BellRing
                  size={18}
                  aria-hidden="true"
                  className={
                    notifications?.unread
                      ? "text-teal-700 motion-safe:drop-shadow-[0_0_6px_rgba(13,148,136,0.35)] dark:text-teal-300"
                      : ""
                  }
                />
              </m.span>
              <span className="grow">اعلان‌ها</span>
              {Boolean(notifications?.unread) && (
                <span
                  aria-hidden="true"
                  className="grid min-h-5 min-w-5 place-items-center rounded-full bg-teal-700 px-1.5 text-[11px] font-extrabold text-white dark:bg-teal-300 dark:text-slate-950"
                >
                  {(notifications?.unread ?? 0) > 9
                    ? "۹+"
                    : new Intl.NumberFormat("fa-IR").format(
                        notifications?.unread ?? 0,
                      )}
                </span>
              )}
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="site-account-separator my-[.4rem] h-px bg-(--site-line)" />
          <DropdownMenu.Item asChild>
            <Link href="/dashboard">
              <LayoutDashboard size={18} aria-hidden="true" />
              پیشخوان
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link href="/dashboard/appointments">
              <CalendarDays size={18} aria-hidden="true" />
              نوبت‌های من
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link href="/dashboard/settings">
              <CircleUserRound size={18} aria-hidden="true" />
              حساب کاربری من
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="site-account-separator my-[.4rem] h-px bg-(--site-line)" />
          <DropdownMenu.Item
            className="site-account-logout text-[#aa2d50] dark:text-[#ffafc1]"
            disabled={pending}
            onSelect={() =>
              startTransition(async () => {
                // Purge private cache on sign-out per F4 (MDN Cache, Clear-Site-Data via SW message)
                try {
                  if ("caches" in window) {
                    const keys = await caches.keys();
                    await Promise.all(keys.map((k) => caches.delete(k)));
                  }
                  if (navigator.serviceWorker?.controller) {
                    navigator.serviceWorker.controller.postMessage({
                      type: "CLEAR_PRIVATE_CACHE",
                    });
                  }
                } catch {}
                await signOutInPlaceAction();
                if (
                  pathname.startsWith("/admin") ||
                  pathname.startsWith("/dashboard")
                ) {
                  router.replace("/");
                } else {
                  router.refresh();
                }
              })
            }
          >
            <LogOut size={18} />
            خروج از حساب
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
