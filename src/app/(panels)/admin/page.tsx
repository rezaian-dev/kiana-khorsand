import {
  adminOverviewHeadingClassName,
  adminOverviewTitleClassName,
  adminOverviewLinkClassName,
  adminOverviewStatusClassName,
} from "@/components/panels/admin-overview-classes";
import { panelMutedClassName } from "@/components/panels/panel-layout-classes";
import Link from "next/link";
import { AdminStatLink } from "@/features/admin/ui/admin-stat-link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  FileText,
  Inbox,
  Settings2,
  UsersRound,
  Wallet,
} from "lucide-react";
import {
  adminAppointments,
  adminUsers,
  adminContacts,
  adminMessages,
} from "@/features/admin/queries";
import { PanelHeading, appointmentLabels } from "@/components/panels/ui";
import { adminLinks } from "@/components/panels/panel-nav";
import { formatDate, formatNumber, formatTime } from "@/lib/format";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Palette stays attached to the semantic stat icon; the parent tone is still a hook.
const iconToneClassName = {
  teal: "bg-[rgba(24,145,136,.12)] text-[#0c7975] dark:bg-[rgba(94,204,184,.16)] dark:text-[#83ded1]",
  blue: "bg-[rgba(69,114,178,.12)] text-[#416da4] dark:bg-[rgba(112,162,220,.18)] dark:text-[#9dbff5]",
  coral:
    "bg-[rgba(202,103,105,.12)] text-[#bd5b64] dark:bg-[rgba(220,128,128,.18)] dark:text-[#f6acaa]",
  amber:
    "bg-[rgba(198,142,67,.14)] text-[#9d6d2d] dark:bg-[rgba(216,173,91,.18)] dark:text-[#f0ce88]",
} as const;
const statClassName =
  "admin-overview-stat flex min-h-[174px] flex-col items-start gap-[.6rem] rounded-[20px] bg-[var(--panel-surface)] px-[1.3rem] py-[1.15rem] text-[var(--panel-text)] no-underline [border:1px_solid_var(--panel-line)] [box-shadow:var(--ar-shadow)] [@media(scripting:none)]:hover:[transform:translateY(-3px)]! [@media(scripting:none)]:hover:[box-shadow:0_20px_40px_-22px_rgba(18,86,95,.35)]! motion-reduce:hover:[transform:none]!";
const panelClassName =
  "admin-overview-panel mt-[1.2rem] rounded-[20px] bg-[var(--panel-surface)] p-[clamp(1rem,2vw,1.5rem)] [border:1px_solid_var(--panel-line)] [box-shadow:var(--ar-shadow)]";

export const metadata = { title: "مدیریت سایت" };
export default async function Page() {
  const [appointments, users, contacts, messages] = await Promise.all([
    adminAppointments(),
    adminUsers(),
    adminContacts(),
    adminMessages(),
  ]);
  const stats = [
    {
      label: "درخواست‌های در انتظار",
      value: appointments.filter((item) => item.status === "pending").length,
      href: "/admin/calendar",
      icon: CalendarDays,
      tone: "teal",
    },
    {
      label: "حساب‌های ثبت‌شده",
      value: users.length,
      href: "/admin/clients",
      icon: UsersRound,
      tone: "blue",
    },
    {
      label: "پیام‌های تازه",
      value: contacts.filter((item) => item.status === "new").length,
      href: "/admin/inbox",
      icon: Inbox,
      tone: "coral",
    },
    {
      label: "پیام‌های پنل",
      value: messages.length,
      href: "/admin/inbox",
      icon: FileText,
      tone: "amber",
    },
  ] as const;
  const quick = [
    {
      href: "/admin/calendar",
      label: "تقویم نوبت‌ها",
      icon: CalendarDays,
      hint: "بررسی و تغییر وضعیت نوبت‌ها",
    },
    {
      href: "/admin/availability",
      label: "زمان‌های آزاد",
      icon: Clock3,
      hint: "تنظیم ساعت‌های قابل رزرو",
    },
    {
      href: "/admin/inbox",
      label: "صندوق پیام",
      icon: Inbox,
      hint: "فرم تماس و گفت‌وگوها",
    },
    {
      href: "/admin/payments",
      label: "پرداخت‌ها",
      icon: Wallet,
      hint: "بررسی وضعیت پرداخت",
    },
    {
      href: "/admin/articles",
      label: "مدیریت محتوا",
      icon: FileText,
      hint: "مقاله‌ها و مطالب منتشرشده",
    },
    {
      href: "/admin/settings",
      label: "تنظیمات سایت",
      icon: Settings2,
      hint: "اطلاعات تماس و امنیت",
    },
  ] as const;
  return (
    <>
      <PanelHeading
        title="نمای کلی مدیریت"
        description="نمایی از داده‌های ثبت‌شده در پایگاه داده و مسیرهای کاری روزانه."
      />
      <section
        className="admin-overview-stats grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4"
        aria-label="آمار مدیریتی"
      >
        {stats.map(({ label, value, href, icon: Icon, tone }) => (
          <AdminStatLink
            href={href}
            key={`${href}-${label}`}
            className={`${statClassName} tone-${tone}`}
          >
            <span
              className={`admin-overview-icon inline-grid size-[39px] flex-none place-items-center rounded-[13px] ${iconToneClassName[tone]}`}
            >
              <Icon size={21} aria-hidden="true" />
            </span>
            <span className="admin-overview-label text-[.84rem] font-bold text-[var(--panel-muted)]">
              {label}
            </span>
            <strong className="text-[clamp(1.65rem,2vw,2.15rem)] leading-none font-extrabold">
              {formatNumber(value)}
            </strong>
            <span className="admin-overview-more mt-auto inline-flex items-center gap-[.35rem] text-[.75rem] font-bold text-[var(--ar-brand-ink)]">
              مشاهده <ArrowLeft size={15} aria-hidden="true" />
            </span>
          </AdminStatLink>
        ))}
      </section>
      <section className={panelClassName} aria-labelledby="recent-heading">
        <div className={adminOverviewHeadingClassName}>
          <h2 id="recent-heading" className={adminOverviewTitleClassName}>
            نوبت‌های اخیر
          </h2>
          <Link href="/admin/calendar" className={adminOverviewLinkClassName}>
            همهٔ نوبت‌ها <ArrowLeft size={16} aria-hidden="true" />
          </Link>
        </div>
        {appointments.length ? (
          <div className="admin-overview-recent">
            {appointments.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="admin-overview-appointment flex items-center gap-[.7rem] py-[.8rem] text-[.88rem] [border-top:1px_solid_var(--panel-line)] max-[480.02px]:flex-wrap"
              >
                <span
                  className={`admin-overview-icon tone-teal inline-grid size-[39px] flex-none place-items-center rounded-[13px] ${iconToneClassName.teal}`}
                >
                  <CalendarDays size={19} aria-hidden="true" />
                </span>
                <span>
                  {formatDate(item.startsAt)} · {formatTime(item.startsAt)}
                </span>
                <span
                  className={`${adminOverviewStatusClassName} status-${item.status}`}
                >
                  {appointmentLabels[item.status]}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={panelMutedClassName}>هنوز نوبتی ثبت نشده است.</p>
        )}
      </section>
      <section className={panelClassName} aria-labelledby="quick-heading">
        <div className={adminOverviewHeadingClassName}>
          <div>
            <h2 id="quick-heading" className={adminOverviewTitleClassName}>
              دسترسی سریع
            </h2>
            <p className={panelMutedClassName}>
              برای شروع، بخش موردنظرت را انتخاب کن.
            </p>
          </div>
        </div>
        <div className="admin-overview-quick grid grid-cols-[repeat(auto-fit,minmax(min(100%,245px),1fr))] gap-[.65rem]">
          {quick.map(({ href, label, icon: Icon, hint }) => (
            <Link
              href={href}
              key={href}
              className="flex min-w-0 items-center gap-[.8rem] rounded-[15px] bg-[var(--ar-surface2)] p-4 text-[var(--ar-brand-ink)] [border:1px_solid_var(--panel-line)] hover:bg-[var(--ar-brand-soft)]"
            >
              <Icon size={22} aria-hidden="true" />
              <span className="flex min-w-0 flex-1 flex-col gap-[.15rem]">
                <strong className="text-[.86rem] text-[var(--panel-text)]">
                  {label}
                </strong>
                <small className="text-[.73rem] text-[var(--panel-muted)]">
                  {hint}
                </small>
              </span>
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="admin-overview-footnote mt-4 text-[.75rem] text-[var(--panel-muted)]">
          همهٔ {formatNumber(adminLinks.length)} بخش مدیریتی از فهرست کناری در
          دسترس‌اند.
        </p>
      </section>
    </>
  );
}
