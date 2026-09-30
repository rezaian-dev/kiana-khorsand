"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import type { CSSProperties } from "react";
import { CircleCheck, Info, TriangleAlert, CircleX, LoaderCircle } from "lucide-react";

export function Toaster(props: ToasterProps) {
  return <Sonner theme="light" dir="rtl" containerAriaLabel="اعلان‌ها" position="top-center" className="toaster" closeButton={false} icons={{ success: <CircleCheck aria-hidden="true" />, info: <Info aria-hidden="true" />, warning: <TriangleAlert aria-hidden="true" />, error: <CircleX aria-hidden="true" />, loading: <LoaderCircle aria-hidden="true" /> }} style={{ "--normal-bg": "var(--popover)", "--normal-text": "var(--popover-foreground)", "--normal-border": "var(--input)", "--border-radius": "var(--radius)" } as CSSProperties} toastOptions={{ classNames: { toast: "brand-toast" } }} {...props} />;
}
