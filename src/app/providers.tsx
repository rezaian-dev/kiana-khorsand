"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";
import { DirectionProvider } from "@/components/ui/direction";
import { domMax, LazyMotion, MotionConfig } from "motion/react";
import { PwaRegister } from "./pwa-register";

// The static icon.svg responds to the OS before hydration. Sync explicit theme
// changes within this existing client boundary, without making the layout client.
function ThemeFavicon() {
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    const icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/svg+xml";
    icon.setAttribute("data-brand-favicon", "");
    icon.href = `/assets/logo/favicon-${resolvedTheme}.svg`;
    document.head.append(icon);
    return () => icon.remove();
  }, [resolvedTheme]);
  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="kk-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LazyMotion features={domMax} strict>
        <MotionConfig reducedMotion="user">
          <ThemeFavicon />
          <PwaRegister />
          <DirectionProvider dir="rtl" direction="rtl">
            {children}
          </DirectionProvider>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
