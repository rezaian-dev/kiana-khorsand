"use client";

import type { ComponentProps } from "react";
import type { TooltipContentProps } from "recharts";
import { cn } from "cn";
import { useChart } from "./chart-context";
import { formatNumber } from "@/lib/format";

type Props = ComponentProps<"div"> & Partial<Pick<TooltipContentProps<number, string>, "active" | "payload" | "label">>;

export function ChartTooltipContent({ active, payload, label, className, ...props }: Props) {
  const { config } = useChart();
  if (!active || !payload?.length) return null;
  return <div {...props} className={cn("chart-tooltip", className)} dir="rtl"><p>{typeof label === "string" ? label : typeof label === "number" ? formatNumber(label) : "دادهٔ نمونه"}</p>{payload.filter((entry) => entry.type !== "none").map((entry, index) => {
    const key = typeof entry.dataKey === "string" ? entry.dataKey : typeof entry.name === "string" ? entry.name : "";
    return <div className="chart-value" key={`${key}-${index}`}><span className="chart-key" style={{ background: entry.color }} aria-hidden="true" /><span>{config[key]?.label ?? "مقدار"}</span><strong>{typeof entry.value === "number" ? formatNumber(entry.value) : "—"}</strong></div>;
  })}</div>;
}
