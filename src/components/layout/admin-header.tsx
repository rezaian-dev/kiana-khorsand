import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { AdminDrawer } from "./admin-drawer";
import { AdminNav } from "./admin-nav";
import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme-toggle";
import { CommandMenu } from "./command-menu";
import { Notifications } from "./notifications";
import { LiveRefresh } from "@/components/shared/live-refresh";
import { MessagePreview } from "@/components/sections/dashboard/message-preview";
import { routes } from "@/lib/constants";
import type { AdminMessage } from "@/lib/admin";
import type { Viewer } from "@/lib/viewer";

type Props = { viewer: Viewer; unread: number; messages: AdminMessage[] };

export function AdminHeader({ viewer, unread, messages }: Props) {
  return <header className="admin-header" id="page-top"><a className="skip-link" href="#main-content">رفتن به محتوای اصلی</a><div className="admin-toolbar"><AdminDrawer><AdminNav /></AdminDrawer><nav className="admin-breadcrumb" aria-label="مسیر صفحه"><Link href={routes.home}>سایت</Link><ChevronLeft aria-hidden="true" /><span>مدیریت</span></nav><div className="admin-tools"><CommandMenu /><Notifications unread={unread}><MessagePreview messages={messages} /><p className="muted">حداکثر چهار پیام تازه. ابزار خواندن و پاسخ‌گویی هنوز در حال تکمیل است.</p></Notifications><ThemeToggle /><AccountMenu viewer={viewer} /></div></div><div className="admin-connection"><span>فضای خصوصی مدیریت</span><LiveRefresh isEnabled viewer={{ id: viewer.id, role: viewer.role }} isVisible /></div></header>;
}
