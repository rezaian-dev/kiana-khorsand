"use client";

import { useState } from "react";
import { DayPicker } from "@daypicker/persian";
import {
  adminCalendarDismissClassName,
  adminCalendarInlineClassName,
  adminDayPickerClassNames,
} from "./admin-daypicker-classes";
import "@daypicker/react/style.css";
import { dayKey } from "@/lib/tehran-calendar";

const persian = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
const local = (value?: string | null) =>
  value ? new Date(`${dayKey(new Date(value))}T12:00:00`) : undefined;
const keyOf = (value?: Date) =>
  value
    ? `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`
    : "";

export function WorkshopDiscount({
  value,
}: {
  value?: { percent: number; startsAt: string; endsAt: string } | null;
}) {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date }>({
    from: local(value?.startsAt),
    to: value?.endsAt
      ? local(new Date(new Date(value.endsAt).getTime() - 1).toISOString())
      : undefined,
  });
  const [open, setOpen] = useState(false);
  return (
    <fieldset className="workshop-discount-editor grid min-w-0 gap-[.7rem] rounded-[20px] bg-[var(--surface)] p-4 [border:1px_solid_var(--line)]">
      <legend className="px-[.4rem] font-extrabold">
        تخفیف درصدی زمان‌دار
      </legend>
      <p className="panel-help">
        صفر یعنی بدون تخفیف. شروع و پایان را از تقویم شمسی انتخاب کنید؛ روز
        پایان نیز شامل می‌شود.
      </p>
      <label htmlFor={`discount-percent-${value?.startsAt || "new"}`}>
        درصد تخفیف (۱ تا ۹۰)
      </label>
      <input
        id={`discount-percent-${value?.startsAt || "new"}`}
        name="discountPercent"
        type="number"
        min="0"
        max="90"
        defaultValue={value?.percent ?? 0}
      />
      <input type="hidden" name="discountFrom" value={keyOf(range.from)} />
      <input type="hidden" name="discountTo" value={keyOf(range.to)} />
      <button
        type="button"
        className="admin-jalali-trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {range.from && range.to
          ? `${persian.format(range.from)} تا ${persian.format(range.to)}`
          : "انتخاب بازهٔ تخفیف"}
      </button>
      {open && (
        <div className={adminCalendarInlineClassName}>
          <DayPicker
            classNames={adminDayPickerClassNames}
            mode="range"
            dir="rtl"
            weekStartsOn={6}
            min={0}
            max={366}
            selected={range}
            defaultMonth={range.from || new Date()}
            onSelect={(value) => setRange(value ?? { from: undefined })}
          />
          <button
            type="button"
            className={adminCalendarDismissClassName}
            onClick={() => {
              setRange({ from: undefined });
              setOpen(false);
            }}
          >
            پاک‌کردن بازه
          </button>
        </div>
      )}
    </fieldset>
  );
}
