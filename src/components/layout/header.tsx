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
import { readProfile } from "@/server/published";
import { getViewer } from "@/server/viewer";
import { canAuthenticate } from "@/server/auth";
import { LiveRefresh } from "@/components/shared/live-refresh";

export async function Header() {
  const [viewer, profile] = await Promise.all([getViewer(), readProfile()]);
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
          <MobileMenu viewer={viewer} brand={<Logo />} contacts={<ContactLinks profile={profile} />} />
        </div>
      </div>
      <ScrollProgress /><LiveRefresh isEnabled={canAuthenticate()} viewer={viewer ? { id: viewer.id, role: viewer.role } : null} />
    </header>
  );
}
