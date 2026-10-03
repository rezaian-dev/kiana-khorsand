"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import type { CSSProperties } from "react";
import { CircleCheck, Info, TriangleAlert, CircleX, LoaderCircle } from "lucide-react";

export function Toaster(props: ToasterProps) {
  const { resolvedTheme } = useTheme();
  return <Sonner theme={resolvedTheme === "dark" ? "dark" : "light"} dir="rtl" containerAriaLabel="اعلان‌ها" position="top-center" className="toaster" closeButton={false} icons={{ success: <CircleCheck aria-hidden="true" />, info: <Info aria-hidden="true" />, warning: <TriangleAlert aria-hidden="true" />, error: <CircleX aria-hidden="true" />, loading: <LoaderCircle aria-hidden="true" /> }} style={{ "--normal-bg": "var(--popover)", "--normal-text": "var(--popover-foreground)", "--normal-border": "var(--input)", "--border-radius": "var(--radius-card)" } as CSSProperties} toastOptions={{ classNames: { toast: "brand-toast" } }} {...props} />;
}
