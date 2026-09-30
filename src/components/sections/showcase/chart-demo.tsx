"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart-container";
import { ChartTooltip } from "@/components/ui/chart-tooltip";
import { ChartTooltipContent } from "@/components/ui/chart-tooltip-content";
import { ChartLegend } from "@/components/ui/chart-legend";
import { ChartLegendContent } from "@/components/ui/chart-legend-content";
import type { ChartConfig } from "@/components/ui/chart-context";
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs-list";
import { TabsTrigger } from "@/components/ui/tabs-trigger";
import { TabsContent } from "@/components/ui/tabs-content";
import { formatNumber } from "@/lib/format";

const samples = [
  { month: "فروردین", count: 4 }, { month: "اردیبهشت", count: 6 },
  { month: "خرداد", count: 8 }, { month: "تیر", count: 5 },
  { month: "مرداد", count: 9 }, { month: "شهریور", count: 7 },
];
const config = { count: { label: "تعداد آزمایشی", color: "var(--primary)" } } satisfies ChartConfig;

export function ChartDemo() {
  const [view, setView] = useState("table");
  return (
    <div className="chart-demo">
      <div className="tool-heading"><span className="section-eyebrow">نمودار و داده</span><h3>اطلاعات، روشن و خوانا.</h3><p className="muted">این اعداد کاملاً ساختگی‌اند و آمار مراجعان نیستند. برای دیدن نمودار تعاملی، زبانهٔ نمودار را انتخاب کنید.</p></div>
      <Tabs value={view} onValueChange={setView} dir="rtl">
        <TabsList className="chart-tabs"><TabsTrigger value="table">جدول داده‌ها</TabsTrigger><TabsTrigger value="chart">نمودار</TabsTrigger></TabsList>
        <TabsContent value="table" className="chart-panel"><table className="sample-table"><caption className="sr-only">مقادیر ساختگی شش ماه برای نمایش سیستم طراحی</caption><thead><tr><th scope="col">ماه نمونه</th><th scope="col">تعداد آزمایشی</th></tr></thead><tbody>{samples.map((sample) => <tr key={sample.month}><th scope="row">{sample.month}</th><td>{formatNumber(sample.count)}</td></tr>)}</tbody></table></TabsContent>
        <TabsContent value="chart" className="chart-panel">{view === "chart" && <ChartContainer config={config}><BarChart data={samples} aria-label="نمودار داده‌های ساختگی شش ماه؛ با کلیدهای جهت جابه‌جا شوید" accessibilityLayer margin={{ top: 12, right: 8, left: 8, bottom: 0 }}><CartesianGrid vertical={false} /><XAxis dataKey="month" reversed tickLine={false} axisLine={false} tickMargin={10} height={44} minTickGap={16} /><YAxis orientation="right" tickLine={false} axisLine={false} width={36} domain={[0, 12]} ticks={[0, 4, 8, 12]} tickFormatter={formatNumber} /><ChartTooltip isAnimationActive={false} cursor={false} content={<ChartTooltipContent />} /><ChartLegend content={<ChartLegendContent />} /><Bar dataKey="count" name="تعداد آزمایشی" fill="var(--color-count)" radius={[8, 8, 0, 0]} isAnimationActive={false} maxBarSize={44} /></BarChart></ChartContainer>}</TabsContent>
      </Tabs>
      <p className="muted tool-caption">جدول از اولین HTML خواناست؛ نمودار فقط با انتخاب شما نمایش داده می‌شود. داده‌ای از پایگاه‌داده خوانده نمی‌شود.</p>
    </div>
  );
}
