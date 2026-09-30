"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import type { DayButton } from "react-day-picker";
import { cn } from "cn";
import { Button } from "./button";
import { formatDate } from "@/lib/format";

type Props = ComponentProps<typeof DayButton>;

export function CalendarDayButton({ className, day, modifiers, ...props }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (modifiers.focused) ref.current?.focus({ preventScroll: true }); }, [modifiers.focused]);
  return <Button {...props} ref={ref} variant="ghost" size="icon" className={cn("calendar-day", className)} data-day={formatDate(day.date, { year: "numeric", month: "2-digit", day: "2-digit" })} data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle} data-range-start={modifiers.range_start} data-range-end={modifiers.range_end} data-range-middle={modifiers.range_middle} />;
}
