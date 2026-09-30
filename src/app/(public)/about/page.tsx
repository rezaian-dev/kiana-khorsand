import type { Metadata } from "next";
import { About } from "@/components/sections/about/about";
import { routes } from "@/lib/constants";

const title = "درباره من";
const description = "آشنایی با دکتر کیانا خرسند، روان‌شناس بالینی و مشاور خانواده؛ اصول همکاری، حریم خصوصی و اطلاعات حرفه‌ای برای تصمیم‌گیری آگاهانه پیش از شروع مشاوره.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: routes.about },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.about },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export default function Page() {
  return <About />;
}
