import Link from "next/link";
import { BookOpen, CalendarDays, GraduationCap, House, LayoutDashboard, Mail, MessageCircle, Settings, Users } from "lucide-react";
import { routes } from "@/lib/constants";

export function AdminNav() {
  const pending = [
    { label: "نوبت‌ها", icon: CalendarDays }, { label: "مراجعان", icon: Users },
    { label: "مقالات", icon: BookOpen }, { label: "دوره‌ها", icon: GraduationCap },
    { label: "دیدگاه‌ها", icon: MessageCircle }, { label: "پیام‌ها", icon: Mail }, { label: "تنظیمات", icon: Settings },
  ];
  return <nav className="admin-nav" aria-label="مدیریت سایت"><p className="admin-label">فضای مدیریت</p><Link href={routes.admin} prefetch={false} aria-current="page" aria-label="داشبورد" title="داشبورد"><LayoutDashboard aria-hidden="true" /><span className="admin-label">داشبورد</span></Link>{pending.map(({ label, icon: Icon }) => <span className="admin-nav-pending" key={label} aria-disabled="true" title={`${label}؛ در حال تکمیل`}><Icon aria-hidden="true" /><span className="admin-label">{label}<small>در حال تکمیل</small></span><span className="sr-only">{label}؛ هنوز قابل استفاده نیست</span></span>)}<Link href={routes.home} prefetch={false} aria-label="بازگشت به سایت" title="بازگشت به سایت"><House aria-hidden="true" /><span className="admin-label">بازگشت به سایت</span></Link></nav>;
}
