import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { SITE_ORIGIN } from "@/lib/site-urls";

const vazirmatn = localFont({
  src: [
    { path: "../../public/assets/fonts/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/Vazirmatn-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-vazirmatn",
  preload: true,
  fallback: ["Tahoma", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const siteDescription =
  "آشنایی با رویکرد درمان، خدمات مشاوره روان‌شناسی، نوشته‌ها و درخواست وقت با کیانا خرسند.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: "کیانا خرسند", template: "%s — کیانا خرسند" },
  description: siteDescription,
  applicationName: "کیانا خرسند",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "کیانا خرسند" },
  formatDetection: { telephone: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "کیانا خرسند",
    title: "کیانا خرسند",
    description: siteDescription,
    url: SITE_ORIGIN,
    images: [{ url: "/assets/images/hero-therapist.jpg", alt: "فضای مشاورهٔ روان‌شناسی", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d736b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="scroll-smooth font-sans has-[.reference-home]:overflow-x-clip max-[1023.02px]:[scrollbar-width:none] min-[1024px]:has-[.panel-shell]:[scrollbar-gutter:stable] max-[1023.02px]:[&::-webkit-scrollbar]:hidden"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${vazirmatn.variable} bg-bg text-fg [font-family:var(--font-vazirmatn),Vazirmatn,Tahoma,sans-serif] antialiased has-[.site-shell]:overflow-x-clip! has-[.site-shell]:bg-[var(--bg)]! has-[.site-shell]:text-[var(--fg)]! data-[scroll-locked]:mr-0!`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
