"use client";

import { Toaster } from "@/components/ui/sonner";

/** Mount notifications only on routes with actions that can produce a toast. */
export function SiteToaster() {
  return (
    <Toaster
      position="bottom-center"
      dir="rtl"
      toastOptions={{
        classNames: {
          toast:
            "cn-toast rounded-[18px] border border-[color:color-mix(in_srgb,#177f84_22%,var(--border))] bg-[color:color-mix(in_srgb,var(--background)_94%,#c8eee7)] px-4 py-[14px] text-[var(--foreground)] shadow-[0_20px_55px_rgb(18_47_65_/_19%)] backdrop-blur-[14px]",
          description: "text-[#576172]! opacity-100! dark:text-[#c7d3e1]!",
          actionButton:
            "rounded-[10px] [background-image:linear-gradient(115deg,#147d80,#315f9b)] font-[750] text-white",
        },
      }}
    />
  );
}
