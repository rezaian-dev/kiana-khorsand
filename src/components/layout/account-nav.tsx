import Link from "next/link";
import { CalendarDays, Settings, UserRound } from "lucide-react";
import { routes } from "@/lib/constants";

type Props = { current: string };

export function AccountNav({ current }: Props) {
  const links = [
    { href: routes.account, label: "حساب من", icon: UserRound },
    { href: routes.appointments, label: "نوبت‌های من", icon: CalendarDays },
    { href: routes.settings, label: "تنظیمات حساب", icon: Settings },
  ];
  return <nav className="member-nav" aria-label="بخش‌های حساب">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} prefetch={false} aria-current={current === href ? "page" : undefined}><Icon aria-hidden="true" />{label}</Link>)}</nav>;
}
