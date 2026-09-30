import type { Metadata } from "next";
import { Review } from "@/components/sections/foundation/review";
import { routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: "بازبینی هویت و رنگ",
  description: "صفحهٔ موقت بازبینی نشان تأییدشده، وزیرمتن محلی و رنگ‌های وب‌سایت؛ برای انتشار عمومی نیست.",
  alternates: { canonical: routes.home },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "دکتر کیانا خرسند",
    title: "بازبینی هویت و رنگ",
    description: "نسخهٔ آماده‌سازی هویت بصری؛ صفحهٔ اصلی هنوز ساخته نشده است.",
    url: routes.home,
  },
  twitter: {
    card: "summary_large_image",
    title: "بازبینی هویت و رنگ",
    description: "نسخهٔ آماده‌سازی هویت بصری؛ برای انتشار عمومی نیست.",
  },
};

export default function Page() {
  return <Review />;
}
