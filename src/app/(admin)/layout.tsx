import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { readAdmin, readDashboard } from "@/server/admin";
import { sidebarCookie } from "@/lib/admin";
import { AdminNav } from "@/components/layout/admin-nav";
import { AdminHeader } from "@/components/layout/admin-header";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";

export const metadata: Metadata = { title: "مدیریت سایت", robots: { index: false, follow: false } };
type Props = { children: ReactNode };

export default async function Layout({ children }: Props) {
  const viewer = await readAdmin();
  const [snapshot, stored] = await Promise.all([readDashboard(), cookies()]);
  const isCollapsed = stored.get(sidebarCookie)?.value === "collapsed";
  return (
    <div className="admin-shell" key={viewer.id}>
      <AdminHeader viewer={viewer} unread={snapshot.unread} messages={snapshot.messages} />
      <div className="admin-frame" data-collapsed={isCollapsed}>
        <aside className="admin-sidebar" id="admin-sidebar">
          <AdminNav />
          <div className="sidebar-bottom"><SidebarToggle isCollapsed={isCollapsed} /><p className="admin-label">فضایی برای ادارهٔ یک خدمت شخصی؛ نه پروندهٔ درمانی.</p></div>
        </aside>
        <div className="admin-workspace">{children}</div>
      </div>
    </div>
  );
}
