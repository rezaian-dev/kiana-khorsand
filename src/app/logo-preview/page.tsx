import type { Metadata } from "next";
import { Gallery } from "@/components/sections/logo-preview/gallery";
import { getEnv } from "@/lib/env";
import { routes } from "@/lib/constants";

const title = "سه طرح لوگو | کیانا خرسند";
const description = "پیش‌نمایش موقت سه مفهوم لوگوی کیانا خرسند؛ نماد و ترکیب نام در حالت‌های روشن، تیره و تک‌رنگ برای انتخاب هویت بصری.";
const url = new URL(routes.logoPreview, getEnv().NEXT_PUBLIC_SITE_URL);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: false, follow: false },
  openGraph: { title, description, url, locale: "fa_IR", type: "website" },
  twitter: { card: "summary", title, description },
};

export default function Page() {
  return <Gallery />;
}
