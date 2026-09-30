import type { Metadata } from "next";
import { Showcase } from "@/components/sections/showcase/showcase";
import { routes } from "@/lib/constants";

export const metadata: Metadata = {
  title: "سیستم طراحی",
  description: "صفحهٔ موقت بازبینی سیستم طراحی، منوها و اجزای وب‌سایت؛ برای انتشار عمومی نیست.",
  alternates: { canonical: routes.home },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "دکتر کیانا خرسند",
    title: "سیستم طراحی",
    description: "نمایش موقت رنگ‌ها، منوها، فرم‌ها و اجزای تعاملی؛ صفحهٔ اصلی هنوز ساخته نشده است.",
    url: routes.home,
  },
  twitter: {
    card: "summary_large_image",
    title: "سیستم طراحی",
    description: "نمایش موقت سیستم طراحی وب‌سایت؛ برای انتشار عمومی نیست.",
  },
};

export default function Page() {
  return <Showcase />;
}
