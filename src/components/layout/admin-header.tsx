import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { HeaderBar } from "./header-bar";
import { Logo } from "./logo";
import { AdminDrawer } from "./admin-drawer";
import { AdminNav } from "./admin-nav";
import { CommandMenu } from "./command-menu";
import { Notifications } from "./notifications";
import { LiveRefresh } from "@/components/shared/live-refresh";
import { MessagePreview } from "@/components/sections/dashboard/message-preview";
import { routes } from "@/lib/constants";
import type { AdminMessage } from "@/lib/admin";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer; unread: number; messages: AdminMessage[] };

export function AdminHeader({ viewer, unread, messages }: Props) {
  return (
    <HeaderBar className="admin-header" viewer={viewer} menu={<AdminDrawer brand={<Logo />}><AdminNav /></AdminDrawer>}>
      <div className="admin-toolbar site-width">
        <nav className="admin-breadcrumb" aria-label="مسیر صفحه"><Link href={routes.home} prefetch={false} data-interact="control">سایت</Link><ChevronLeft aria-hidden="true" /><span>مدیریت</span></nav>
        <div className="admin-tools">
          <CommandMenu />
          <Notifications unread={unread}><MessagePreview messages={messages} /><p className="muted">حداکثر چهار پیام تازه؛ بازکردن پیام وضعیتش را تغییر نمی‌دهد. این سایت پاسخ ایمیلی ارسال نمی‌کند.</p></Notifications>
        </div>
      </div>
      <div className="admin-connection"><div className="site-width"><span>فضای خصوصی مدیریت</span><LiveRefresh isEnabled viewer={{ id: viewer.id, role: viewer.role }} isVisible /></div></div>
    </HeaderBar>
  );
}
