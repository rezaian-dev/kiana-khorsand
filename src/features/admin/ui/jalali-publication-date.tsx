"use client";
import { useState } from "react";
import { DayPicker } from "@daypicker/persian";
import {
  adminCalendarDismissClassName,
  adminCalendarInlineClassName,
  adminDayPickerClassNames,
  adminJalaliCompactTriggerClassName,
} from "./admin-daypicker-styles";
import "@daypicker/react/style.css";
const keyOf = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
const label = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
export function JalaliPublicationDate({ value }: { value: string }) {
  const [day, setDay] = useState<Date | undefined>(
    value ? new Date(`${value}T12:00:00`) : undefined,
  );
  const [open, setOpen] = useState(false);
  return (
    <div className="admin-publication-date relative">
      <input
        id="article-date"
        type="hidden"
        name="publishedAt"
        value={day ? keyOf(day) : ""}
      />
      <button
        type="button"
        className={adminJalaliCompactTriggerClassName}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {day ? label.format(day) : "انتخاب تاریخ شمسی (اختیاری)"}
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
            className={adminCalendarDismissClassName}
            type="button"
            onClick={() => {
              setDay(undefined);
              setOpen(false);
            }}
          >
            بدون تاریخ · ثبت خودکار هنگام انتشار
          </button>
        </div>
      )}
    </div>
  );
}
