import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact/contact";
import { readProfile } from "@/server/published";
import { routes } from "@/lib/constants";

const title = "تماس";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await readProfile();
  const description = `راه‌های ارتباط ثبت‌شده با ${profile.name}؛ فرم پیام در این نسخه فقط بررسی محلی دارد. این سایت برای کمک اورژانسی نیست.`;
  return {
    title, description, alternates: { canonical: routes.contact },
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.contact },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export default async function Page() {
  const profile = await readProfile();
  return <Contact profile={profile} />;
}
