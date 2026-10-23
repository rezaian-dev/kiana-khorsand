import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  MessagesSquare,
  Settings,
  Stethoscope,
  UserCog,
  UsersRound,
} from "lucide-react";
import type { PanelLink } from "@/types/navigation";

/**
 * The administrator's navigation. It is the only navigation that exposes admin
 * destinations — the public account menu and the user dashboard never import it.
 */
export const adminLinks: readonly PanelLink[] = [
  { href: "/admin", label: "پیشخوان مدیریت", icon: LayoutDashboard },
  { href: "/admin/calendar", label: "تقویم و نوبت‌ها", icon: CalendarDays },
  { href: "/admin/availability", label: "ساعات کاری", icon: ClipboardList },
  { href: "/admin/clients", label: "مراجعین", icon: UsersRound },
  { href: "/admin/users", label: "مدیریت کاربران", icon: UserCog },
  { href: "/admin/inbox", label: "صندوق پیام‌ها", icon: MessageCircle },
  { href: "/admin/payments", label: "مدیریت پرداخت‌ها", icon: CreditCard },
  { href: "/admin/services", label: "خدمات درمانی", icon: Stethoscope },
  { href: "/admin/articles", label: "مقالات", icon: FileText },
  { href: "/admin/workshops", label: "کارگاه‌ها", icon: GraduationCap },
  {
    href: "/admin/testimonials",
    label: "دیدگاه مراجعین",
    icon: MessagesSquare,
  },
  { href: "/admin/settings", label: "تنظیمات سایت", icon: Settings },
] as const;
