import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SocialLinks } from "./social-links";
import { HeaderBar } from "./header-bar";
import { Logo } from "./logo";
import { AdminDrawer } from "./admin-drawer";
import { AdminNav } from "./admin-nav";
import { CommandMenu } from "./command-menu";
import { Notifications } from "./notifications";
import { MessagePreview } from "@/components/sections/dashboard/message-preview";
import { routes } from "@/lib/constants";
import type { AdminMessage } from "@/lib/admin";
import type { ReactNode } from "react";
import type { Profile } from "@/lib/published";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer; unread: number; messages: AdminMessage[]; profile: Profile; connection: ReactNode };

export function AdminHeaderContent({ viewer, unread, messages, profile, connection }: Props) {
  return (
    <HeaderBar className="admin-header" viewer={viewer} socials={<SocialLinks profile={profile} className="header-socials" />} menu={<AdminDrawer brand={<Logo />}><AdminNav /><SocialLinks profile={profile} className="mobile-socials" /></AdminDrawer>}>
      <div className="admin-toolbar site-width">
        <nav className="admin-breadcrumb" aria-label="مسیر صفحه"><Link href={routes.home} prefetch={false} data-interact="control">سایت</Link><ChevronLeft aria-hidden="true" /><span>مدیریت</span></nav>
        <div className="admin-tools">
          <CommandMenu />
          <Notifications unread={unread}><MessagePreview messages={messages} /><p className="muted">حداکثر چهار پیام تازه؛ بازکردن پیام وضعیتش را تغییر نمی‌دهد. این سایت پاسخ ایمیلی ارسال نمی‌کند.</p></Notifications>
        </div>
      </div>
      <div className="admin-connection"><div className="site-width"><span>فضای خصوصی مدیریت</span>{connection}</div></div>
    </HeaderBar>
  );
}
