import type { Metadata } from "next";
import { About } from "@/components/sections/about/about";
import { readProfile } from "@/server/published";
import { routes } from "@/lib/constants";

const title = "درباره من";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await readProfile();
  const description = `آشنایی با ${profile.name}، ${profile.role}؛ معرفی، اصول همکاری و اطلاعات حرفه‌ای برای تصمیم‌گیری آگاهانه پیش از شروع مشاوره.`;
  return {
    title,
    description,
    alternates: { canonical: routes.about },
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.about },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export default async function Page() {
  const profile = await readProfile();
  return <About profile={profile} />;
}
