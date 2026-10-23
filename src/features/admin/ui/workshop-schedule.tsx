"use client";

import { panelMutedClassName } from "@/components/panels/panel-styles";

import { useState } from "react";
import { DayPicker } from "@daypicker/persian";
import {
  adminCalendarDismissClassName,
  adminCalendarInlineClassName,
  adminDayPickerClassNames,
} from "./admin-daypicker-styles";
import { PanelSelect } from "@/components/panels/panel-select";
import { dayKey } from "@/lib/tehran-calendar";

const keyOf = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const label = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
const times = Array.from({ length: 27 }, (_, index) => {
  const hour = 8 + Math.floor(index / 2);
  const minute = index % 2 ? "30" : "00";
  const value = `${String(hour).padStart(2, "0")}:${minute}`;
  return { value, label: value };
});
const localTime = (value?: string | null) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(value))
    : "";

export function WorkshopSchedule({
  start,
  end,
}: {
  start?: string | null;
  end?: string | null;
}) {
  const [day, setDay] = useState<Date | undefined>(
    start ? new Date(`${dayKey(new Date(start))}T12:00:00`) : undefined,
  );
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-3 rounded-[16px] border border-[var(--panel-line,var(--line))] p-4">
      <span>روز برگزاری (تقویم شمسی)</span>
      <input type="hidden" name="day" value={day ? keyOf(day) : ""} />
      <button
        type="button"
        className="admin-jalali-trigger"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {day ? label.format(day) : "انتخاب روز برگزاری"}
      </button>
      {open && (
        <div className={adminCalendarInlineClassName}>
          <DayPicker
            classNames={adminDayPickerClassNames}
            mode="single"
            dir="rtl"
            weekStartsOn={6}
            selected={day}
            defaultMonth={day || new Date()}
            onSelect={(value) => {
              setDay(value);
              setOpen(false);
            }}
          />
          <button
            type="button"
            className={adminCalendarDismissClassName}
            onClick={() => {
              setDay(undefined);
              setOpen(false);
            }}
          >
            پاک‌کردن زمان‌بندی
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 max-[440.02px]:grid-cols-1">
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`start-${start || "new"}`}>ساعت شروع</label>
          <PanelSelect
            id={`start-${start || "new"}`}
            name="startTime"
            defaultValue={localTime(start) || "10:00"}
            options={times}
          />
        </div>
        <div className="grid min-w-0 gap-2">
          <label htmlFor={`end-${start || "new"}`}>ساعت پایان</label>
          <PanelSelect
            id={`end-${start || "new"}`}
            name="endTime"
            defaultValue={localTime(end) || "12:00"}
            options={times}
          />
        </div>
      </div>
      <p className={panelMutedClassName}>
        زمان پایان باید بعد از شروع باشد. ثبت نظر فقط بعد از پایان و تأیید حضور
        توسط مدیر امکان دارد.
      </p>
    </div>
  );
}
