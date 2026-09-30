"use client";

import type { ComponentProps } from "react";
import { DayPicker, faIR } from "@daypicker/persian";
import { getDefaultClassNames } from "react-day-picker";
import { cn } from "cn";
import { CalendarDayButton } from "./calendar-day-button";
import { CalendarChevron } from "./calendar-chevron";
import { formatDate } from "@/lib/format";

type Props = ComponentProps<typeof DayPicker> & { today: Date };

export function Calendar({ className, classNames, components, formatters, showOutsideDays = true, captionLayout = "label", ...props }: Props) {
  return (
    <DayPicker
      {...props}
      today={props.today}
      timeZone="Asia/Tehran"
      locale={faIR}
      dir="rtl"
      numerals="arabext"
      animate={false}
      fixedWeeks
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn("brand-calendar", className)}
      classNames={{ ...getDefaultClassNames(), ...classNames }}
      formatters={{
        formatCaption: (date) => formatDate(date, { month: "long", year: "numeric" }),
        formatMonthDropdown: (date) => formatDate(date, { month: "long" }),
        formatYearDropdown: (date) => formatDate(date, { year: "numeric" }),
        formatDay: (date) => formatDate(date, { day: "numeric" }),
        formatWeekdayName: (date) => formatDate(date, { weekday: "narrow" }),
        ...formatters,
      }}
      components={{ DayButton: CalendarDayButton, Chevron: CalendarChevron, ...components }}
    />
  );
}
