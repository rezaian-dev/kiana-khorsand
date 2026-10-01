import type { Metadata } from "next";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { routes } from "@/lib/constants";

const title = "تجربهٔ مراجعان";
const description = "اصول رضایت و حریم خصوصی در انتشار تجربهٔ مراجعان دکتر کیانا خرسند؛ صفحهٔ فعلی فقط نمونهٔ چیدمان است و هیچ نظر واقعی یا نتیجهٔ درمانی منتشر نشده است.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export const metadata: Metadata = {
  title, description, alternates: { canonical: routes.testimonials },
  robots: { index: false, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.testimonials },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export default function Page() {
  return <Testimonials />;
}
