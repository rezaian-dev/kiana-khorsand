import type { Metadata } from "next";
import { Faq } from "@/components/sections/faq/faq";
import { routes } from "@/lib/constants";

const title = "پرسش‌های متداول";
const description = "پاسخ به پرسش‌های شروع مشاوره، رزرو، هزینه، حریم خصوصی و آموزش در وب‌سایت دکتر کیانا خرسند.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export const metadata: Metadata = {
  title, description, alternates: { canonical: routes.faq },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.faq },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export default function Page() {
  return <Faq />;
}
