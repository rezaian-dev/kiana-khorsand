"use client";

import { useId, type ComponentProps } from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "cn";
import { ChartContext, type ChartConfig } from "./chart-context";
import { ChartStyle } from "./chart-style";

const INITIAL_DIMENSION = { width: 320, height: 288 } as const;
type Props = ComponentProps<"div"> & { config: ChartConfig; children: ComponentProps<typeof ResponsiveContainer>["children"]; initialDimension?: { width: number; height: number } };

export function ChartContainer({ id, className, children, config, initialDimension = INITIAL_DIMENSION, ...props }: Props) {
  const uniqueId = useId();
  const chartId = `chart-${(id ?? uniqueId).replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return <ChartContext.Provider value={{ config }}><div {...props} data-slot="chart" data-chart={chartId} className={cn("brand-chart", className)}><ChartStyle id={chartId} config={config} /><ResponsiveContainer initialDimension={initialDimension} minWidth={0}>{children}</ResponsiveContainer></div></ChartContext.Provider>;
}
