import type { Metadata } from "next";
import { Services } from "@/components/sections/services/services";
import { routes } from "@/lib/constants";

const title = "خدمات مشاوره";
const description = "آشنایی با مشاورهٔ فردی، زوج‌ها و خانواده با دکتر کیانا خرسند؛ شرایط کلی جلسات آنلاین و نکته‌های آمادگی برای نخستین گفت‌وگو، بدون وعدهٔ نتیجهٔ قطعی.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: routes.services },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.services },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export default function Page() {
  return <Services />;
}
