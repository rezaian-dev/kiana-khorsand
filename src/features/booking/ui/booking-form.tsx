"use client";

import { fieldPolishClassName } from "@/components/layout/field-polish-classes";

import {
  siteDetailClassName,
  siteHeadingClassName,
} from "@/components/shared/public-layout-classes";

import {
  startTransition,
  useActionState,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DayPicker } from "@daypicker/persian";
import { motion } from "motion/react";
import "@daypicker/react/style.css";
import { getDefaultClassNames } from "@daypicker/react";
import { CalendarDays, Clock3, HeartHandshake, RefreshCw } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { PanelSelect } from "@/components/panels/panel-select";
import { createBooking } from "@/actions/booking";
import type { BookingState, BookingFormProps } from "@/types/booking";
import { formatNumber, formatTime, formatToman } from "@/lib/format";
import { labels } from "@/lib/labels";

// Motion's reduced-motion hook is a mount-time snapshot in this installed version.
// Subscribe to OS preference changes without changing the server-rendered button.
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (notify: () => void) => {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const readReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const serverReducedMotion = () => false;

/** Keep DayPicker's structural vendor classes; customize through its documented classNames API. */
const dayPickerDefaults = getDefaultClassNames();
const bookingCalendarClassNames = {
  ...dayPickerDefaults,
  root: `${dayPickerDefaults.root} m-0 max-w-full text-[.83rem] [--rdp-accent-color:#1c7773]! [--rdp-day_button-width:clamp(31px,2.6vw,39px)]! [--rdp-day_button-height:clamp(31px,2.6vw,39px)]! [--rdp-day-width:clamp(31px,2.6vw,39px)]! [--rdp-day-height:clamp(31px,2.6vw,39px)]! max-[480.02px]:[--rdp-day_button-width:clamp(30px,9vw,37px)]! max-[480.02px]:[--rdp-day_button-height:clamp(30px,9vw,37px)]! max-[480.02px]:[--rdp-day-width:clamp(30px,9vw,37px)]! max-[480.02px]:[--rdp-day-height:clamp(30px,9vw,37px)]!`,
  months: `${dayPickerDefaults.months} max-w-full! justify-center`,
  month: `${dayPickerDefaults.month} max-w-full`,
  month_grid: `${dayPickerDefaults.month_grid} w-full`,
  day_button: `${dayPickerDefaults.day_button} rounded-[10px]! focus-visible:outline-2! focus-visible:outline-[#176d6c]! focus-visible:outline-offset-2!`,
  selected: `${dayPickerDefaults.selected} [&[data-selected=true]_button]:bg-[#176d6c]! [&[data-selected=true]_button]:text-white! [&[data-selected=true]_button]:font-bold! dark:[&[data-selected=true]_button]:text-white!`,
};
const bookingCalendarModifiersClassNames = {
  available:
    "rdp-available [&_button]:bg-[color:color-mix(in_srgb,#419d8b_10%,var(--site-surface))]! [&_button]:text-[#155f5e]! [&_button]:font-[850]! dark:[&_button]:text-[#a6ebdc]!",
};

const initial: BookingState = { error: "", id: "" };
const tehranDay = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tehran",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const persianDay = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  timeZone: "Asia/Tehran",
  weekday: "long",
  month: "long",
  day: "numeric",
});
const dayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const localDate = (key: string) => new Date(`${key}T12:00:00`);
const dayLabel = (key: string) =>
  persianDay.format(new Date(`${key}T12:00:00Z`));

export function BookingForm({
  services,
  slots,
  name,
  phone,
}: BookingFormProps) {
  const [state, action, pending] = useActionState(createBooking, initial);
  const [serviceId, setServiceId] = useState("");
  const [selectedDay, setSelectedDay] = useState(() =>
    slots.length ? tehranDay.format(new Date(slots[0].startsAt)) : "",
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [localError, setLocalError] = useState("");
  const router = useRouter();
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    readReducedMotion,
    serverReducedMotion,
  );
  const days = new Map<string, typeof slots>();
  for (const slot of slots) {
    const key = tehranDay.format(new Date(slot.startsAt));
    days.set(key, [...(days.get(key) ?? []), slot]);
  }
  const availableDays = new Set(days.keys());
  const activeDay = availableDays.has(selectedDay)
    ? selectedDay
    : slots.length
      ? tehranDay.format(new Date(slots[0].startsAt))
      : "";
  const times = days.get(activeDay) ?? [];
  const activeTime = times.some((slot) => slot.startsAt === selectedTime)
    ? selectedTime
    : "";
  const selectedService = services.find(
    (service) => service.slug === serviceId,
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!serviceId || !activeTime || data.get("consent") !== "on") {
      setLocalError(
        !serviceId
          ? "لطفاً خدمت موردنظر را انتخاب کنید."
          : !activeTime
            ? "لطفاً یک ساعت آزاد را از تقویم انتخاب کنید."
            : "برای ثبت درخواست، شرایط استفاده و حریم خصوصی را تأیید کنید.",
      );
      return;
    }
    setLocalError("");
    // Keep the selected day, service and note when the server rejects a stale slot.
    startTransition(() => action(data));
  }
  if (state.id)
    return (
      <div
        className={`${siteDetailClassName} booking-complete grid gap-4`}
        role="status"
      >
        <CalendarDays size={34} className="text-[#227b75]" aria-hidden="true" />
        <h2 className={siteHeadingClassName}>درخواست رزرو ثبت شد</h2>
        <p className="leading-[1.8] text-[var(--site-muted)]">
          برای دیدن وضعیت درخواست و جزئیات زمان انتخابی به حساب خود بروید.
        </p>
        <Link className="site-button" href={`/book/done?id=${state.id}`}>
          مشاهده جزئیات درخواست
        </Link>
      </div>
    );
  return (
    <form
      action={action}
      onSubmit={submit}
      className={`${siteDetailClassName} ${fieldPolishClassName} site-form booking-form grid min-w-0 gap-[1.4rem]!`}
      aria-busy={pending}
    >
      <div className="booking-form-heading flex items-center gap-[0.8rem]">
        <span className="booking-form-heading-icon grid size-12 flex-none place-items-center rounded-[15px] bg-[color:color-mix(in_srgb,#389b92_13%,var(--site-surface))] text-[#217c75]">
          <CalendarDays size={23} aria-hidden="true" />
        </span>
        <div>
          <span className="booking-form-kicker text-[0.78rem] font-extrabold text-[#247b77] dark:text-[#a8e2d7]">
            فرم درخواست وقت
          </span>
          <h2 className="mt-[0.2rem] text-[clamp(1.18rem,2vw,1.45rem)] font-[850]">
            زمان مناسب‌تان را پیدا کنید
          </h2>
        </div>
      </div>
      <div className="booking-account flex min-w-0 flex-wrap items-center gap-x-[0.65rem] gap-y-[0.35rem] rounded-[14px] bg-[color:color-mix(in_srgb,var(--site-violet)_5%,var(--site-surface))] px-4 py-3 text-[0.86rem]">
        <span
          className="booking-account-dot size-[9px] flex-none rounded-[50%] bg-[#368f82] [box-shadow:0_0_0_4px_rgb(54_143_130_/_12%)]"
          aria-hidden="true"
        />
        <span>در حال رزرو برای {name}</span>
        <span dir="ltr" className="ms-auto text-[var(--site-muted)]">
          {phone}
        </span>
      </div>
      <div className="booking-field-group grid min-w-0 gap-[0.65rem]">
        <label htmlFor="serviceId" className="text-[0.96rem] font-[850]">
          ۱. خدمت مورد نظر
        </label>
        <PanelSelect
          id="serviceId"
          name="serviceId"
          required
          triggerClassName="min-h-[52px]! w-full! rounded-[13px]! border-[color:color-mix(in_srgb,var(--site-violet)_17%,var(--site-line))]! bg-[var(--site-surface)]! px-4! text-[0.94rem]! text-[var(--site-ink)]! [box-shadow:0_5px_19px_-17px_rgb(40_48_82_/_38%)]!"
          value={serviceId}
          onValueChange={(value) => {
            setServiceId(value);
            setLocalError("");
          }}
          placeholder="خدمت خود را انتخاب کنید"
          options={services.map((service) => ({
            value: service.slug,
            label: service.name,
          }))}
        />
        <div
          className="booking-service-summary flex min-h-[60px] items-center gap-[0.7rem] rounded-[13px] bg-[color:color-mix(in_srgb,#4c9b91_7%,var(--site-surface))] px-[0.9rem] py-3 text-[0.82rem] leading-[1.75] text-[var(--site-muted)]"
          aria-live="polite"
        >
          {selectedService ? (
            <>
              <HeartHandshake
                size={20}
                className="flex-none text-[#277d75]"
                aria-hidden="true"
              />
              <span>
                <strong className="block text-[var(--site-ink)]">
                  {selectedService.name}
                </strong>
                <small className="block text-[0.78rem]">
                  {formatNumber(selectedService.duration)} دقیقه ·{" "}
                  {formatToman(selectedService.price)}
                </small>
              </span>
            </>
          ) : (
            <span>
              پس از انتخاب، مدت و هزینهٔ خدمت همین‌جا نمایش داده می‌شود.
            </span>
          )}
        </div>
      </div>
      <div className="booking-field-group booking-date-field grid min-w-0 gap-[0.65rem] border-t border-[var(--site-line)] pt-[0.4rem]">
        <div className="booking-field-header flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3
              id="booking-calendar-title"
              className="text-[0.96rem] font-[850]"
            >
              ۲. روز و ساعت جلسه
            </h3>
            <p className="mt-[0.35rem] text-[0.8rem] leading-[1.7] text-[var(--site-muted)]">
              روزهای رنگی وقت آزاد دارند؛ ساعت‌ها به وقت تهران هستند.
            </p>
          </div>
          {slots.length > 0 && (
            <button
              type="button"
              className="booking-refresh inline-flex min-h-9 items-center gap-[0.3rem] rounded-[9px] px-[0.55rem] py-[0.35rem] text-[0.78rem] font-extrabold text-[#176b68] hover:bg-[color:color-mix(in_srgb,#3b8e85_10%,var(--site-surface))] dark:text-[#a0e2d6]"
              onClick={() => router.refresh()}
              aria-label="به‌روزرسانی وقت‌های آزاد"
            >
              <RefreshCw size={16} aria-hidden="true" /> تازه‌سازی
            </button>
          )}
        </div>
        {slots.length ? (
          <div className="booking-calendar-layout grid min-w-0 grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-[0.8rem] max-[1000.02px]:grid-cols-1">
            <div
              className="booking-calendar min-w-0 rounded-[17px] border border-[var(--site-line)] bg-[color:color-mix(in_srgb,var(--site-violet)_2%,var(--site-surface))] p-[0.8rem] max-[480.02px]:p-2"
              role="group"
              aria-labelledby="booking-calendar-title"
            >
              <DayPicker
                classNames={bookingCalendarClassNames}
                modifiersClassNames={bookingCalendarModifiersClassNames}
                mode="single"
                dir="rtl"
                weekStartsOn={6}
                selected={activeDay ? localDate(activeDay) : undefined}
                defaultMonth={activeDay ? localDate(activeDay) : new Date()}
                disabled={(date) => !availableDays.has(dayKey(date))}
                modifiers={{
                  available: (date) => availableDays.has(dayKey(date)),
                }}
                onSelect={(date) => {
                  if (!date) return;
                  setSelectedDay(dayKey(date));
                  setSelectedTime("");
                  setLocalError("");
                }}
              />
            </div>
            <div className="booking-times min-w-0 rounded-[17px] border border-[var(--site-line)] bg-[color:color-mix(in_srgb,var(--site-violet)_2%,var(--site-surface))] p-[0.8rem] max-[1000.02px]:min-h-[120px] max-[480.02px]:p-2">
              <div className="booking-times-heading flex items-center gap-[0.4rem] text-[0.84rem]">
                <Clock3
                  size={17}
                  className="flex-none text-[#277d75]"
                  aria-hidden="true"
                />
                <strong>
                  {activeDay ? dayLabel(activeDay) : "روز مورد نظر"}
                </strong>
              </div>
              <div
                className="booking-time-list mt-[0.9rem] grid grid-cols-2 gap-[0.45rem] max-[480.02px]:grid-cols-[repeat(auto-fit,minmax(70px,1fr))]"
                role="group"
                aria-label="ساعت‌های آزاد روز انتخابی"
              >
                {times.map((slot) => (
                  <motion.button
                    key={slot.startsAt}
                    type="button"
                    className="booking-time-option min-h-11 min-w-0 rounded-[11px] border border-[color:color-mix(in_srgb,#388f86_22%,var(--site-line))] bg-[var(--site-surface)] px-[.4rem] py-2 text-[.88rem] font-extrabold hover:border-[#277d75] focus-visible:outline-2! focus-visible:outline-offset-2! focus-visible:outline-[#277d75]! aria-pressed:border-[#176d6c] aria-pressed:bg-[#176d6c] aria-pressed:text-white aria-pressed:hover:border-[#176d6c]"
                    whileHover={{ y: reduceMotion ? 0 : -1 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.2,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    aria-pressed={activeTime === slot.startsAt}
                    onClick={() => {
                      setSelectedTime(slot.startsAt);
                      setLocalError("");
                    }}
                  >
                    {formatTime(slot.startsAt)}
                  </motion.button>
                ))}
              </div>
              <p className="booking-time-hint mt-[0.85rem] text-[0.78rem] leading-[1.8] text-[var(--site-muted)]">
                {activeTime
                  ? `انتخاب شما: ${dayLabel(activeDay)}، ساعت ${formatTime(activeTime)} به وقت تهران`
                  : `یکی از ${formatNumber(times.length)} زمان آزاد این روز را انتخاب کنید.`}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="booking-empty-slots grid justify-items-start gap-2 rounded-[17px] border border-dashed border-[var(--site-line)] p-[1.2rem] leading-[1.8] text-[var(--site-muted)]"
            role="status"
          >
            <CalendarDays
              size={24}
              className="text-[var(--site-ink)]"
              aria-hidden="true"
            />
            <strong className="text-[var(--site-ink)]">
              فعلاً وقت آزادی در ۲۱ روز آینده ثبت نشده است.
            </strong>
            <p>
              کمی بعد دوباره سر بزنید یا از صفحهٔ تماس برای هماهنگی پیام
              بفرستید.
            </p>
            <Link
              href="/contact"
              className="font-extrabold text-[#176d6c] underline"
            >
              راه‌های تماس
            </Link>
          </div>
        )}
        <input type="hidden" name="startsAt" value={activeTime} />
      </div>
      <div className="booking-field-group grid min-w-0 gap-[0.65rem]">
        <label htmlFor="note" className="text-[0.96rem] font-[850]">
          یادداشت برای جلسه (اختیاری)
        </label>
        <textarea
          className="min-h-[92px]! w-full! rounded-[13px]! border-[color:color-mix(in_srgb,var(--site-violet)_17%,var(--site-line))]! bg-[var(--site-surface)]! text-[var(--site-ink)]!"
          id="note"
          name="note"
          maxLength={1000}
          rows={3}
          placeholder="اگر نکته‌ای هست که دوست دارید پیش از جلسه بدانیم…"
        />
      </div>
      <label
        className="site-consent booking-consent items-center!"
        htmlFor="booking-consent"
      >
        <Checkbox
          className="mt-[.12rem]"
          id="booking-consent"
          name="consent"
          value="on"
          required
          aria-label="تأیید رضایت"
        />
        <span>
          با <Link href="/terms">{labels.terms}</Link> و{" "}
          <Link href="/privacy">{labels.privacy}</Link> آشنا شدم.
        </span>
      </label>
      {(state.error || localError) && (
        <p role="alert" className="site-error">
          {localError || state.error}
        </p>
      )}
      <button
        type="submit"
        className="site-button min-h-[50px]! w-full!"
        disabled={pending || !slots.length || !services.length}
      >
        {pending ? "در حال ثبت درخواست…" : "ثبت درخواست رزرو"}
      </button>
      <p className="booking-form-disclaimer text-center text-[0.75rem] leading-[1.8] text-[var(--site-muted)]">
        ثبت درخواست به معنی قطعی‌شدن نوبت یا پرداخت هزینه نیست.
      </p>
    </form>
  );
}
