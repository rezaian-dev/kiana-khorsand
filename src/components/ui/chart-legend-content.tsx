"use client";

import type { ComponentProps } from "react";
import type { DefaultLegendContentProps } from "recharts";
import { cn } from "cn";
import { useChart } from "./chart-context";

type Props = ComponentProps<"div"> & Pick<DefaultLegendContentProps, "payload">;

export function ChartLegendContent({ payload, className, ...props }: Props) {
  const { config } = useChart();
  if (!payload?.length) return null;
  return <div {...props} className={cn("chart-legend", className)} dir="rtl">{payload.filter((entry) => entry.type !== "none").map((entry, index) => {
    const key = typeof entry.dataKey === "string" ? entry.dataKey : "";
    return <span key={`${key}-${index}`}><span className="chart-key" style={{ background: entry.color }} aria-hidden="true" />{config[key]?.label ?? "دادهٔ نمونه"}</span>;
  })}</div>;
}
