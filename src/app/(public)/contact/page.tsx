import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact/contact";
import { routes } from "@/lib/constants";

const title = "تماس";
const description = "وضعیت راه‌های ارتباط با دکتر کیانا خرسند و نمونهٔ فرم با بررسی محلی؛ ارسال پیام و رزرو هنوز فعال نیستند. این سایت برای کمک اورژانسی نیست.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export const metadata: Metadata = {
  title, description, alternates: { canonical: routes.contact },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.contact },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export default function Page() {
  return <Contact />;
}
