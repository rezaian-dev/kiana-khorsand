import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "cn";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { AccountMenu } from "./account-menu";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer | null; menu: ReactNode; children: ReactNode; socials?: ReactNode; className?: string };

export function HeaderBar({ viewer, menu, children, socials, className }: Props) {
  return (
    <>
      <span className="page-top" id="page-top" aria-hidden="true" />
      <header className={cn("site-header", className)}>
        <a className="skip-link" href="#main-content">رفتن به محتوای اصلی</a>
        <div className="site-width header-row">
          <Logo />
          <NavLinks />
          {socials}
          <div className="header-actions">
            <ThemeToggle />
            <div className="header-account">
              {viewer ? <AccountMenu viewer={viewer} /> : <Button asChild><Link href={routes.login} prefetch={false}>ورود / ثبت‌نام</Link></Button>}
            </div>
          </div>
          {menu}
        </div>
        {children}
        <ScrollProgress />
      </header>
    </>
  );
}
