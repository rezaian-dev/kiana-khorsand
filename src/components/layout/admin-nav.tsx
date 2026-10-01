import { NavLink } from "./nav-link";
import { BookOpen, CalendarDays, GraduationCap, House, LayoutDashboard, Mail, MessageCircle, Settings, Users } from "lucide-react";
import { routes } from "@/lib/constants";

export function AdminNav() {
  const pending = [
    { label: "دیدگاه‌ها", icon: MessageCircle }, { label: "پیام‌ها", icon: Mail }, { label: "تنظیمات", icon: Settings },
  ];
  return <nav className="admin-nav" aria-label="مدیریت سایت"><p className="admin-label">فضای مدیریت</p><NavLink href={routes.admin} label="داشبورد"><LayoutDashboard aria-hidden="true" /><span className="admin-label">داشبورد</span></NavLink><NavLink href={routes.agenda} label="نوبت‌ها"><CalendarDays aria-hidden="true" /><span className="admin-label">نوبت‌ها</span></NavLink><NavLink href={routes.clients} label="مراجعان"><Users aria-hidden="true" /><span className="admin-label">مراجعان</span></NavLink><NavLink href={routes.adminArticles} label="مقالات"><BookOpen aria-hidden="true" /><span className="admin-label">مقالات</span></NavLink><NavLink href={routes.adminCourses} label="دوره‌ها"><GraduationCap aria-hidden="true" /><span className="admin-label">دوره‌ها</span></NavLink>{pending.map(({ label, icon: Icon }) => <span className="admin-nav-pending" key={label} aria-disabled="true" title={`${label}؛ در حال تکمیل`}><Icon aria-hidden="true" /><span className="admin-label">{label}<small>در حال تکمیل</small></span><span className="sr-only">{label}؛ هنوز قابل استفاده نیست</span></span>)}<NavLink href={routes.home} label="بازگشت به سایت"><House aria-hidden="true" /><span className="admin-label">بازگشت به سایت</span></NavLink></nav>;
}
