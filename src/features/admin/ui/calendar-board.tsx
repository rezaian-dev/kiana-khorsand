import { panelCardClassName } from "@/components/panels/panel-styles";
import Link from "next/link";
import { JalaliDatePicker } from "./jalali-date-picker";
import clsx from "clsx";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import {
  addDays,
  dayKey,
  monthStart,
  nextPersianMonth,
  periodFor,
  tehranInstant,
  weekStart,
} from "@/lib/tehran-calendar";
import { formatDate, formatDay, formatNumber, formatTime } from "@/lib/format";
import { appointmentLabels } from "@/components/panels/labels";

/** Sticky toolbar above the calendar grid. */
const boardHeaderClassName =
  "flex flex-wrap items-center justify-between gap-[.35rem] rounded-[16px] bg-(--ar-surface2) px-4 py-[.7rem] [border:1px_solid_var(--panel-line)] max-[420.02px]:p-[.55rem]";

type Event = {
  id: string;
  startsAt: Date;
  endsAt: Date;
  status: keyof typeof appointmentLabels;
  name: string;
  service: string;
};
type View = "day" | "week" | "month";
// Presentation belongs to this server-rendered board; DayPicker remains the sole client island.
// Keep the historical concatenated today's-week class untouched in this phase.
// Fixing it would reveal a new card skin and needs a separate design review.
const weekdayClassName =
  "admin-calendar-weekday [transition:transform_.24s_ease,box-shadow_.24s_ease,border-color_.24s_ease] motion-reduce:[transition:none]! min-h-[196px] min-w-0 overflow-hidden rounded-[17px] bg-[var(--panel-surface)] [border:1px_solid_var(--panel-line)] [box-shadow:0_10px_25px_-25px_rgba(38,44,76,.7)] max-[767.02px]:min-h-[100px] hover:[transform:translateY(-3px)]! hover:[box-shadow:var(--ar-shadow)]! hover:border-[var(--panel-accent)]!";
const monthdayClassName =
  "admin-calendar-monthday [transition:background-color_.2s,box-shadow_.2s,transform_.2s] motion-reduce:[transition:none]! flex min-h-[100px] min-w-0 flex-col items-start gap-[.3rem] rounded-[13px] bg-[var(--ar-surface2)] p-[.55rem] text-[.82rem] text-[var(--panel-text)]! [border:1px_solid_var(--panel-line)] max-[767.02px]:min-h-16 max-[767.02px]:p-[.3rem] max-[420.02px]:min-h-[50px] hover:[background:var(--ar-brand-soft)]! [&.is-today]:border-[var(--panel-accent)]! [&.outside]:opacity-[.42] hover:[transform:translateY(-2px)]! hover:[box-shadow:var(--ar-shadow)]!";
const eventClassName =
  "admin-calendar-event grid gap-1 rounded-[11px] p-[.55rem] text-[.72rem] [overflow-wrap:anywhere] [border-inline-start:4px_solid_#159489]";
const eventToneClassName = {
  pending: "[background:rgba(211,145,55,.12)] [border-color:#d39137]!",
  confirmed: "[background:rgba(20,148,137,.11)]",
  completed: "[background:rgba(98,127,174,.1)] [border-color:#627fae]!",
  cancelled: "[background:rgba(202,104,114,.1)] [border-color:#ca6872]!",
  no_show: "[background:rgba(202,104,114,.1)] [border-color:#ca6872]!",
} as const;
const tabClassName =
  "grid min-h-[39px] min-w-[52px] place-items-center rounded-[11px] text-[.83rem] font-[750]! text-[var(--panel-muted)]! aria-[current=page]:bg-[var(--ar-brand-soft)] aria-[current=page]:text-[var(--ar-brand-ink)]!";
const navLinkClassName =
  "grid min-h-10 min-w-10 place-items-center rounded-[11px] p-[.4rem] text-[.83rem] font-bold text-[var(--panel-text)]! hover:[background:var(--ar-brand-soft)]! hover:text-[var(--ar-brand-ink)]! [border:1px_solid_var(--panel-line)]";
const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const hourFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Tehran",
  hour: "numeric",
  hourCycle: "h23",
});
const hourOf = (date: Date) => Number(hourFormatter.format(date));
const href = (view: View, date: string) =>
  `/admin/calendar?view=${view}&date=${date}`;
const monthLabel = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: "Asia/Tehran",
  month: "long",
  year: "numeric",
});
function EventItem({
  item,
  compact = false,
}: {
  item: Event;
  compact?: boolean;
}) {
  return (
    <div
      className={`${eventClassName} status-${item.status} ${eventToneClassName[item.status]}`}
      title={`${item.name} · ${item.service}`}
    >
      <strong className="leading-[1.65] font-extrabold">
        {formatTime(item.startsAt)} · {item.name}
      </strong>
      {!compact && (
        <>
          <small className="leading-normal text-(--panel-muted)">
            {item.service}
          </small>
          <small className="leading-normal text-(--panel-muted)">
            {appointmentLabels[item.status]}
          </small>
        </>
      )}
    </div>
  );
}
export function CalendarBoard({
  view,
  date,
  today,
  items,
}: {
  view: View;
  date: string;
  today: string;
  items: Event[];
}) {
  const period = periodFor(date, view);
  const previous =
    view === "day"
      ? addDays(date, -1)
      : view === "week"
        ? addDays(date, -7)
        : addDays(monthStart(date), -1);
  const next =
    view === "day"
      ? addDays(date, 1)
      : view === "week"
        ? addDays(date, 7)
        : nextPersianMonth(date);
  const label =
    view === "day"
      ? formatDay(tehranInstant(date, "12:00"))
      : view === "week"
        ? `${formatDate(tehranInstant(period.start, "12:00"))} تا ${formatDate(tehranInstant(addDays(period.end, -1), "12:00"))}`
        : monthLabel.format(tehranInstant(period.start, "12:00"));
  const grouped = new Map<string, Event[]>();
  for (const item of items) {
    const key = dayKey(item.startsAt);
    grouped.set(key, [...(grouped.get(key) || []), item]);
  }
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart(date), index),
  );
  const monthGridStart = weekStart(period.start);
  const monthGridEnd = addDays(weekStart(addDays(period.end, -1)), 7);
  const monthDays = Array.from(
    {
      length: Math.round(
        (Date.parse(monthGridEnd) - Date.parse(monthGridStart)) / 86400000,
      ),
    },
    (_, index) => addDays(monthGridStart, index),
  );
  const hours = [
    ...new Set([
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      ...items.map((item) => hourOf(item.startsAt)),
    ]),
  ].sort((a, b) => a - b);
  return (
    <section
      className={`admin-calendar-board ${panelCardClassName} overflow-visible rounded-[26px]! p-[clamp(1rem,2.5vw,2rem)]! [box-shadow:var(--ar-shadow)]! [background:linear-gradient(135deg,color-mix(in_srgb,var(--panel-surface)_93%,var(--panel-accent)),var(--panel-surface)_52%)]! [border:1px_solid_var(--panel-line)]`}
      aria-label="تقویم نوبت‌ها"
    >
      <div className="admin-calendar-toolbar flex flex-wrap items-center justify-between gap-3 max-[360px]:gap-2 max-[320px]:gap-1.5">
        <div
          className="admin-calendar-tabs flex flex-wrap items-center gap-[.4rem] rounded-[14px] bg-(--ar-surface2) p-1 [border:1px_solid_var(--panel-line)] max-[320px]:gap-[.2rem] max-[320px]:p-0.5"
          role="navigation"
          aria-label="نمای تقویم"
        >
          {(["week", "day", "month"] as const).map((item) => (
            <Link
              key={item}
              href={href(item, date)}
              className={tabClassName}
              aria-current={view === item ? "page" : undefined}
            >
              {{ week: "هفته", day: "روز", month: "ماه" }[item]}
            </Link>
          ))}
        </div>
        <div className="admin-calendar-nav flex flex-wrap items-center gap-[.4rem] max-[420.02px]:gap-1 max-[320px]:gap-0.5 max-[320px]:[&_a]:min-h-8 max-[320px]:[&_a]:min-w-8 max-[320px]:[&_a]:p-0.5 max-[320px]:[&_a]:text-[.75rem]">
          <JalaliDatePicker date={date} view={view} />
          <Link
            className={`admin-calendar-today ${navLinkClassName} px-4`}
            href={href(view, today)}
          >
            امروز
          </Link>
          <Link
            className={navLinkClassName}
            aria-label="دورهٔ قبل"
            href={href(view, previous)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
          <Link
            className={navLinkClassName}
            aria-label="دورهٔ بعد"
            href={href(view, next)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <h2 className="admin-calendar-period m-[1.6rem_0_1rem]! flex items-center gap-[.55rem] text-[clamp(1.2rem,2.3vw,1.7rem)]! font-extrabold text-(--panel-text)">
        <CalendarDays
          size={20}
          aria-hidden="true"
          className="text-(--ar-brand-ink)"
        />
        {label}
      </h2>
      <div
        className="admin-calendar-insights mb-[1.4rem] grid grid-cols-3 gap-[.7rem] max-[420.02px]:gap-[.3rem] max-[360px]:gap-[.25rem] max-[320px]:grid-cols-1 max-[320px]:gap-[.35rem]"
        aria-label="خلاصهٔ زمان‌بندی"
      >
        <div className={boardHeaderClassName}>
          <span className="text-[.78rem] text-(--panel-muted) max-[420.02px]:text-[.65rem]">
            نوبت‌های این بازه
          </span>
          <strong className="text-[1.2rem] text-(--ar-brand-ink)">
            {formatNumber(items.length)}
          </strong>
        </div>
        <div className={boardHeaderClassName}>
          <span className="text-[.78rem] text-(--panel-muted) max-[420.02px]:text-[.65rem]">
            تأییدشده
          </span>
          <strong className="text-[1.2rem] text-(--ar-brand-ink)">
            {formatNumber(
              items.filter((item) => item.status === "confirmed").length,
            )}
          </strong>
        </div>
        <div className={boardHeaderClassName}>
          <span className="text-[.78rem] text-(--panel-muted) max-[420.02px]:text-[.65rem]">
            در انتظار
          </span>
          <strong className="text-[1.2rem] text-(--ar-brand-ink)">
            {formatNumber(
              items.filter((item) => item.status === "pending").length,
            )}
          </strong>
        </div>
      </div>
      {view === "day" && (
        <div className="admin-calendar-hours grid [border-top:1px_solid_var(--panel-line)]">
          {hours.map((hour) => {
            const events = (grouped.get(date) || []).filter(
              (item) => hourOf(item.startsAt) === hour,
            );
            return (
              <div
                className="admin-calendar-hour grid min-h-[49px] grid-cols-[60px_minmax(0,1fr)] [align-items:start] gap-[.65rem] py-[.4rem] [border-bottom:1px_solid_var(--panel-line)]"
                key={hour}
              >
                <time className="text-center text-[.8rem] text-(--panel-muted) [direction:ltr]!">
                  {formatNumber(hour).padStart(2, "۰")}:۰۰
                </time>
                <div className="grid gap-[.4rem]">
                  {events.length ? (
                    events.map((item) => (
                      <EventItem key={item.id} item={item} />
                    ))
                  ) : (
                    <span
                      aria-hidden="true"
                      className="admin-calendar-empty-slot block min-h-[35px]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {view === "week" && (
        <div className="admin-calendar-week grid grid-cols-7 gap-[.4rem] max-[767.02px]:grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))]">
          {weekDays.map((key) => (
            <section
              key={key}
              className={
                key === today
                  ? "admin-calendar-weekdayis-today"
                  : weekdayClassName
              }
              aria-label={formatDay(tehranInstant(key, "12:00"))}
            >
              <Link
                className="admin-calendar-dayhead block min-h-16 content-center px-[.35rem] py-[.65rem] text-center text-[.8rem] leading-[1.7] font-extrabold! [border-bottom:1px_solid_var(--panel-line)] hover:text-(--ar-brand-ink)! hover:[background:var(--ar-brand-soft)]!"
                href={href("day", key)}
              >
                {formatDay(tehranInstant(key, "12:00"))}
              </Link>
              <div className="admin-calendar-dayitems grid [align-content:start] gap-[.3rem] p-[.4rem]">
                {(grouped.get(key) || []).length ? (
                  grouped
                    .get(key)!
                    .map((item) => <EventItem key={item.id} item={item} />)
                ) : (
                  <span className="admin-calendar-no-events mx-auto my-[.9rem] block text-center text-[.7rem] text-(--panel-muted)">
                    بدون نوبت
                  </span>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
      {view === "month" && (
        <div className="admin-calendar-month" aria-label="روزهای ماه">
          <div
            className="admin-calendar-weeklabels grid grid-cols-7 gap-0.5 max-[420.02px]:gap-px"
            aria-hidden="true"
          >
            {weekdays.map((label, index) => (
              <span
                key={index}
                className="grid min-h-8 place-items-center text-[.78rem] font-bold text-(--panel-muted)"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="admin-calendar-monthgrid grid grid-cols-7 gap-[.35rem]">
            {monthDays.map((key) => {
              const events = grouped.get(key) || [];
              return (
                <Link
                  href={href("day", key)}
                  key={key}
                  className={clsx(
                    monthdayClassName,
                    (key < period.start || key >= period.end) && "outside",
                    key === today && "is-today",
                  )}
                  aria-label={`${formatDay(tehranInstant(key, "12:00"))}؛ ${formatNumber(events.length)} نوبت`}
                >
                  <span
                    className={clsx(
                      "admin-calendar-daynumber font-extrabold",
                      key === today &&
                        "grid min-h-[26px] min-w-[26px] place-items-center rounded-[50%] bg-(--ar-brand-ink) px-1 text-(--panel-surface)",
                    )}
                  >
                    {new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
                      timeZone: "Asia/Tehran",
                      day: "numeric",
                    }).format(tehranInstant(key, "12:00"))}
                  </span>
                  {events.length > 0 && (
                    <>
                      <span className="admin-calendar-count inline-flex items-center gap-[.2rem] rounded-[99px] bg-(--ar-brand-soft) px-[.4rem] py-[.1rem] text-[.69rem] text-(--ar-brand-ink)">
                        <Clock3
                          size={12}
                          aria-hidden="true"
                          className="max-[420.02px]:hidden"
                        />
                        {formatNumber(events.length)}
                      </span>
                      <span className="admin-calendar-monthpreview grid max-w-full gap-[.15rem] text-[.68rem] text-(--panel-muted) max-[767.02px]:hidden">
                        {events.slice(0, 2).map((item) => (
                          <span key={item.id} className="truncate">
                            {formatTime(item.startsAt)} {item.name}
                          </span>
                        ))}
                      </span>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      <p className="admin-calendar-hint mt-[.85rem] text-[.73rem] text-(--panel-muted)">
        برای دیدن جزئیات یک روز، روی تاریخ آن بزنید. ساعت‌ها بر اساس منطقهٔ
        زمانی تهران نمایش داده می‌شوند.
      </p>
    </section>
  );
}
