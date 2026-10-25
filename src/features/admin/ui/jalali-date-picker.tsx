"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DayPicker } from "@daypicker/persian";
import {
  adminCalendarDismissClassName,
  adminCalendarPopoverClassName,
  adminDayPickerClassNames,
  adminJalaliCompactTriggerClassName,
} from "./admin-daypicker-styles";
import "@daypicker/react/style.css";
import { CalendarDays } from "lucide-react";

const keyOf = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
const localDate = (key: string) => new Date(`${key}T12:00:00`);
const persian = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** DayPicker Persian returns Gregorian Date objects, matching the existing server action and URLs. */
export function JalaliDatePicker({
  date,
  view,
}: {
  date: string;
  view: "day" | "week" | "month";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <div className="admin-jalali-jump relative">
      <button
        className={adminJalaliCompactTriggerClassName}
        type="button"
        aria-expanded={open}
        aria-label="رفتن به تاریخ شمسی"
        onClick={() => setOpen(!open)}
      >
        <CalendarDays size={17} aria-hidden="true" /> انتخاب تاریخ
      </button>
      {open && (
        <div
          className={adminCalendarPopoverClassName}
          role="dialog"
          aria-label="انتخاب روز شمسی"
          tabIndex={-1}
        >
          <DayPicker
            classNames={adminDayPickerClassNames}
            mode="single"
            dir="rtl"
            weekStartsOn={6}
            selected={localDate(date)}
            defaultMonth={localDate(date)}
            onSelect={(day) => {
              if (day) {
                setOpen(false);
                router.push(`/admin/calendar?view=${view}&date=${keyOf(day)}`);
              }
            }}
            footer={
              <span>
                روز دلخواه را انتخاب کنید · {persian.format(localDate(date))}
              </span>
            }
          />
          <button
            type="button"
            className={adminCalendarDismissClassName}
            onClick={() => setOpen(false)}
          >
            بستن تقویم
          </button>
        </div>
      )}
    </div>
  );
}

export function JalaliRangePicker({ today }: { today: string }) {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: localDate(today),
    to: localDate(today),
  });
  return (
    <div className="admin-range-picker max-w-[370px] rounded-[20px] border border-(--panel-line) bg-(--ar-surface2) p-4">
      <p className="panel-help">
        شروع و پایان را روی تقویم شمسی انتخاب کنید؛ هر دو روز در بازه لحاظ
        می‌شوند.
      </p>
      <DayPicker
        classNames={adminDayPickerClassNames}
        mode="range"
        dir="rtl"
        weekStartsOn={6}
        min={1}
        max={180}
        selected={range}
        defaultMonth={localDate(today)}
        onSelect={(value) => setRange(value ?? { from: undefined })}
      />
      <div
        className="admin-range-summary mt-3 flex flex-wrap justify-between gap-2 text-[.78rem] font-[750] text-(--ar-brand-ink)"
        aria-live="polite"
      >
        <span>
          از {range.from ? persian.format(range.from) : "انتخاب نشده"}
        </span>
        <span>تا {range.to ? persian.format(range.to) : "انتخاب نشده"}</span>
      </div>
      <input
        type="hidden"
        name="from"
        value={range.from ? keyOf(range.from) : ""}
      />
      <input type="hidden" name="to" value={range.to ? keyOf(range.to) : ""} />
    </div>
  );
}
