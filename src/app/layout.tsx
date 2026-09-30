import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Theme } from "@/components/layout/theme";
import { themeColors } from "@/lib/constants";
import { getEnv } from "@/lib/env";
import "./globals.css";

const vazirmatn = localFont({
  src: "../fonts/vazirmatn.woff2",
  variable: "--font-vazirmatn",
  weight: "100 900",
  style: "normal",
  display: "optional",
  preload: true,
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

const env = getEnv();

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "دکتر کیانا خرسند | روان‌شناس بالینی و مشاور خانواده",
    template: "%s | دکتر کیانا خرسند",
  },
  description: "وب‌سایت شخصی دکتر کیانا خرسند؛ روان‌شناس بالینی و مشاور خانواده.",
  applicationName: "دکتر کیانا خرسند",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "دکتر کیانا خرسند",
    title: "دکتر کیانا خرسند",
    description: "روان‌شناس بالینی و مشاور خانواده",
  },
  twitter: { card: "summary_large_image" },
  verification: { google: env.GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};

export default function Layout({ children }: Props) {
  return (
    // next-themes changes only the root class and color-scheme before hydration.
    <html lang="fa" dir="rtl" className={vazirmatn.variable} suppressHydrationWarning>
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
