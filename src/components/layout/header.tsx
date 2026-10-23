import {
  publicHeaderShellClassName,
  publicHeaderRowClassName,
  publicContainerClassName,
} from "@/components/layout/public-styles";
import { BrandMark } from "@/components/shared/brand-mark";

import Link from "next/link";
import { getSettings } from "@/features/settings/queries";
import { getSession } from "@/lib/session";
import { AccountMenu } from "@/components/layout/account-menu";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { HeaderProgress } from "@/components/layout/header-progress";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MotionLink } from "@/components/motion/motion-link";
import { UserRoundPlus } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { PwaAddress } from "@/components/layout/pwa-address";
import { InstallApp } from "@/components/layout/install-app";
import { supportPreview } from "@/features/dashboard/support-preview";

export async function Header() {
  const [settings, session] = await Promise.all([getSettings(), getSession()]);
  const notifications = session
    ? await supportPreview(session.user.id, session.user.role === "admin")
    : undefined;
  return (
    <header id="siteHeader" className="fixed inset-x-0 top-0 z-50">
      <div className={publicHeaderShellClassName}>
        <div className={`${publicContainerClassName}`}>
          <div className={publicHeaderRowClassName}>
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-2xl px-1 py-2 max-[350px]:gap-[.35rem]! max-[350px]:px-0!"
              aria-label="کیانا خرسند — صفحه اصلی"
            >
              <BrandMark
                size={34}
                className="h-[34px] w-[34px] flex-none rounded-xl object-cover"
              />
              <span className="text-[1.0625rem] font-extrabold tracking-tight whitespace-nowrap max-[350px]:text-[.94rem]!">
                {settings?.profile.name || "کیانا خرسند"}
              </span>
            </Link>
            <DesktopNavigation />
            <div className="flex items-center gap-1.5 max-[350px]:gap-[.3rem]!">
              <InstallApp />
              <PwaAddress />
              <ThemeToggle className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] [box-shadow:var(--shadow-soft)]" />
              {session ? (
                <AccountMenu
                  publicScope
                  name={session.user.name}
                  image={session.user.image}
                  userId={session.user.id}
                  notifications={notifications}
                />
              ) : (
                <MotionLink
                  effect="lift"
                  href="/login"
                  className="header-login-action border-line bg-surface inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border px-3 text-[.79rem] font-extrabold whitespace-nowrap text-[var(--site-ink)] shadow-[var(--shadow-soft)] hover:border-[#388d92] hover:bg-[color:color-mix(in_srgb,#4bada6_10%,var(--site-surface))] motion-safe:transition-[border-color,background-color] motion-safe:duration-200 max-[480px]:px-[.55rem] max-[480px]:text-[.68rem] max-[350px]:px-[.4rem] max-[350px]:text-[.66rem]"
                  aria-label="ورود یا ثبت‌نام"
                  title="ورود یا ثبت‌نام"
                >
                  <UserRoundPlus
                    size={19}
                    strokeWidth={1.9}
                    className="shrink-0 text-[#166c7b] max-[480px]:w-[17px]!"
                    aria-hidden="true"
                  />
                  <span>ورود / ثبت‌نام</span>
                </MotionLink>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileNavigation social={settings?.contact} />
      <HeaderProgress />
    </header>
  );
}
