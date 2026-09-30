import type { Metadata } from "next";
import { Home } from "@/components/sections/home/home";
import { routes } from "@/lib/constants";

const title = "دکتر کیانا خرسند | روان‌شناس بالینی و مشاور خانواده";
const description = "آشنایی با دکتر کیانا خرسند و مسیرهای مشاورهٔ فردی، زوج‌ها و خانواده؛ اطلاعات شروع جلسهٔ اول، آموزش‌ها و مطالب روان‌شناسی با احترام به حریم خصوصی شما.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: routes.home },
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title, description, url: routes.home },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Home />;
}
