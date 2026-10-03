import type { Metadata } from "next";
import { PolicyPage } from "@/components/shared/policy-page";
import { terms } from "@/content/policies";
import { routes } from "@/lib/constants";

const title = "شرایط استفاده";
const description = "شرایط استفاده از وب‌سایت دکتر کیانا خرسند؛ حدود محتوای آموزشی، وضعیت رزرو و دوره‌ها.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export const metadata: Metadata = {
  title, description, alternates: { canonical: routes.terms },
  robots: { index: false, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.terms },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export default function Page() {
  return <PolicyPage policy={terms} />;
}
