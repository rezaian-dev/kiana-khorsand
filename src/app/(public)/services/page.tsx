import type { Metadata } from "next";
import { Services } from "@/components/sections/services/services";
import { readProfile } from "@/server/published";
import { routes } from "@/lib/constants";

const title = "خدمات مشاوره";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await readProfile();
  const description = `مسیرهای مشاوره با ${profile.name}؛ آشنایی با خدمات فردی، زوج‌ها و خانواده، شرایط همکاری و آمادگی برای نخستین گفت‌وگو، بدون وعدهٔ نتیجهٔ قطعی.`;
  return {
    title,
    description,
    alternates: { canonical: routes.services },
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.services },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export default async function Page() {
  const profile = await readProfile();
  return <Services profile={profile} />;
}
