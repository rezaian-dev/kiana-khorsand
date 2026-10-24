import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { BootSplash } from "@/components/layout/boot-splash";
import { SplashGate } from "@/components/layout/splash-gate";
import { SITE_NAME, socialMetadata } from "@/lib/public-metadata";
import { SITE_ORIGIN } from "@/lib/site-urls";

const vazirmatn = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-vazirmatn",
  preload: true,
  fallback: ["Tahoma", "system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const siteDescription =
  "آشنایی با رویکرد درمان، خدمات مشاوره روان‌شناسی، نوشته‌ها و درخواست وقت با کیانا خرسند.";

const social = socialMetadata({
  title: SITE_NAME,
  description: siteDescription,
  path: "/",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: siteDescription,
  applicationName: SITE_NAME,
  appleWebApp: { capable: true, statusBarStyle: "default", title: SITE_NAME },
  formatDetection: { telephone: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    // iOS ignores the manifest icons for the home screen; it wants its own tag.
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  ...social,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        {/* The launch screen belongs to the app's entry point, once per session.
            Deciding here — before the splash element is parsed — keeps the choice out
            of a media query, which is what used to let the page paint first and the
            splash pop in after it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=document.documentElement;if(location.pathname!=="/"||sessionStorage.getItem("kk:boot"))s.dataset.splash="skip"}catch(e){}`,
          }}
        />
        <BootSplash />
        <Providers>
          {children}
          <SplashGate />
        </Providers>
      </body>
    </html>
  );
}
