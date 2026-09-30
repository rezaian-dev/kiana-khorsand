import type { Metadata } from "next";
import { Suspense } from "react";
import { Courses } from "@/components/sections/courses/courses";
import { parseCatalog, type SearchParams } from "@/lib/catalog";
import { routes } from "@/lib/constants";

type Props = { searchParams: Promise<SearchParams> };
const title = "دوره‌های آموزشی";
const description = "آشنایی با طرح‌های پیشنهادی آموزش دربارهٔ استرس، گفت‌وگو و مرزهای خانوادگی در وب‌سایت دکتر کیانا خرسند؛ سرفصل‌ها در انتظار تأیید و ثبت‌نام غیرفعال است.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  return {
    title, description, alternates: { canonical: routes.courses },
    robots: { index: Object.keys(params).length === 0, follow: true },
    openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.courses },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export default async function Page({ searchParams }: Props) {
  const selection = parseCatalog(await searchParams);
  return <Suspense fallback={<Courses {...selection} isLoading />}><Courses {...selection} /></Suspense>;
}
