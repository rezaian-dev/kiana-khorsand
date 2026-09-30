"use client";

import { useState } from "react";
import { TZDate } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/lib/format";

// Fixed demonstration dates, never the browser clock or a claim of availability.
const reference = new TZDate("2026-10-01T12:00:00+03:30", "Asia/Tehran");
const start = new TZDate("2026-09-23T12:00:00+03:30", "Asia/Tehran");
const end = new TZDate("2026-12-21T12:00:00+03:30", "Asia/Tehran");

export function CalendarDemo() {
  const [selected, setSelected] = useState<Date | undefined>(reference);
  return (
    <div className="calendar-demo">
      <div className="tool-heading"><span className="section-eyebrow">تقویم فارسی</span><h3>زمان، به زبان خودمان.</h3><p className="muted">نمونهٔ ثابتِ مهر ۱۴۰۵، با منطقهٔ زمانی تهران؛ جمعه‌ها غیرفعال‌اند. این تقویم امکان رزرو واقعی ندارد.</p></div>
      <div className="calendar-frame"><Calendar mode="single" today={reference} defaultMonth={reference} startMonth={start} endMonth={end} selected={selected} onSelect={setSelected} disabled={[{ dayOfWeek: [5] }, { before: start }, { after: end }]} labels={{ labelDayButton: (date, modifiers) => `${formatDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}${modifiers.selected ? "، انتخاب‌شده" : ""}${modifiers.today ? "، روز مرجع نمونه" : ""}` }} /></div>
      <p className="calendar-selection" role="status">{selected ? `انتخاب نمونه: ${formatDate(selected)}` : "برای دیدن حالت انتخاب، یک روز را لمس کنید."}</p>
      <p className="muted tool-caption">انتخاب فقط در همین صفحه باقی می‌ماند؛ چیزی ارسال یا ذخیره نمی‌شود.</p>
    </div>
  );
}
