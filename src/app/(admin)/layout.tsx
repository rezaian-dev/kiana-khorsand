import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { readAdmin, readDashboard } from "@/server/admin";
import { sidebarCookie } from "@/lib/admin";
import { Logo } from "@/components/layout/logo";
import { AdminNav } from "@/components/layout/admin-nav";
import { AdminHeader } from "@/components/layout/admin-header";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { notices } from "@/content/profile";

export const metadata: Metadata = { title: "مدیریت سایت", robots: { index: false, follow: false } };
type Props = { children: ReactNode };

export default async function Layout({ children }: Props) {
  const viewer = await readAdmin();
  const [snapshot, stored] = await Promise.all([readDashboard(), cookies()]);
  const isCollapsed = stored.get(sidebarCookie)?.value === "collapsed";
  return <div className="admin-frame" data-collapsed={isCollapsed} key={viewer.id}><aside className="admin-sidebar" id="admin-sidebar"><div className="sidebar-brand"><Logo form={isCollapsed ? "emblem" : "lockup"} /></div><AdminNav /><div className="sidebar-bottom"><SidebarToggle isCollapsed={isCollapsed} /><p className="admin-label">فضایی برای ادارهٔ یک خدمت شخصی؛ نه پروندهٔ درمانی.</p></div></aside><div className="admin-workspace"><AdminHeader viewer={viewer} unread={snapshot.unread} messages={snapshot.messages} />{children}<footer className="admin-footer"><p>{notices.emergency}</p><p>اطلاعات این بخش خصوصی است؛ روی دستگاه مشترک از حساب خارج شوید.</p></footer></div></div>;
}
