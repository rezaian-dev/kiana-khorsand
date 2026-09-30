import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ContactLinks } from "@/components/layout/contact-links";
import { NavLinks } from "@/components/layout/nav-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AccountMenu } from "@/components/layout/account-menu";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer?: Viewer | null };

export function Header({ viewer = null }: Props) {
  return (
    <header className="site-header" id="page-top">
      <a className="skip-link" href="#main-content">رفتن به محتوای اصلی</a>
      <div className="site-width header-row">
        <Logo />
        <NavLinks />
        <div className="header-actions">
          <ThemeToggle />
          <div className="desktop-account">
            {viewer ? <AccountMenu viewer={viewer} /> : <Button asChild><Link href={routes.login} prefetch={false}>ورود / ثبت‌نام</Link></Button>}
          </div>
          <MobileMenu viewer={viewer} brand={<Logo />} contacts={<ContactLinks />} />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
