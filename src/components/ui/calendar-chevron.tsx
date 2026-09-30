import type { ComponentProps } from "react";
import type { Chevron } from "react-day-picker";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "cn";

type Props = ComponentProps<typeof Chevron>;

export function CalendarChevron({ orientation = "left", className, size = 20, style }: Props) {
  const Icon = orientation === "left" ? ChevronRight : orientation === "right" ? ChevronLeft : orientation === "up" ? ChevronUp : ChevronDown;
  return <Icon aria-hidden="true" width={size} height={size} style={style} className={cn("calendar-chevron", className)} />;
}
