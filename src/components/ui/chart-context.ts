"use client";

import { createContext, useContext, type ComponentType, type ReactNode } from "react";

export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = Record<string, { label?: ReactNode; icon?: ComponentType } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> })>;

export const ChartContext = createContext<{ config: ChartConfig } | null>(null);

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within ChartContainer");
  return context;
}
