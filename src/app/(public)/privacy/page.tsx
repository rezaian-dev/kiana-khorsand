import type { Metadata } from "next";
import { PolicyPage } from "@/components/shared/policy-page";
import { privacy } from "@/content/policies";
import { routes } from "@/lib/constants";

const title = "حریم خصوصی";
const description = "پیش‌نویس حریم خصوصی وب‌سایت دکتر کیانا خرسند؛ توضیح پردازش فعلی فرم، جست‌وجو، تنظیم تم و اطلاعات فنی، همراه با موارد نیازمند تأیید پیش از انتشار.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export const metadata: Metadata = {
  title, description, alternates: { canonical: routes.privacy },
  robots: { index: false, follow: true },
  openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.privacy },
  twitter: { card: "summary_large_image", title: shareTitle, description },
};

export default function Page() {
  return <PolicyPage policy={privacy} />;
}
