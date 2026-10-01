"use client";

import { useId } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart-container";
import { ChartTooltip } from "@/components/ui/chart-tooltip";
import { ChartTooltipContent } from "@/components/ui/chart-tooltip-content";
import type { DailyCount } from "@/lib/admin";
import { formatNumber } from "@/lib/format";

type Props = { daily: DailyCount[] };
const config = { count: { label: "نوبت", color: "var(--chart-1)" } };

export function VisitChart({ daily }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return <ChartContainer config={config} className="visit-chart" aria-label="نمودار تعداد نوبت‌ها بر اساس روز جلسه؛ جدول عددها در ادامه آمده است."><BarChart data={daily} accessibilityLayer aria-label="تعداد نوبت‌های روزانه" margin={{ top: 16, right: 0, left: 0, bottom: 8 }}><CartesianGrid vertical={false} /><XAxis dataKey="label" reversed tickLine={false} axisLine={false} minTickGap={8} /><YAxis orientation="right" allowDecimals={false} tickLine={false} axisLine={false} width={42} tickFormatter={formatNumber} /><ChartTooltip isAnimationActive={false} cursor={false} content={<ChartTooltipContent />} /><Bar id={`visits-${id}`} dataKey="count" fill="var(--color-count)" radius={[6, 6, 0, 0]} maxBarSize={40} isAnimationActive={false} /></BarChart></ChartContainer>;
}
