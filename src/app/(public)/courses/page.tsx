import type { Metadata } from "next";
import { Suspense } from "react";
import { Courses } from "@/components/sections/courses/courses";
import { parseCatalog, type SearchParams } from "@/lib/catalog";
import { readCourses } from "@/server/published";
import { routes } from "@/lib/constants";

type Props = { searchParams: Promise<SearchParams> };
const title = "دوره‌های آموزشی";
const description = "معرفی دوره‌های آموزشی تأییدشده، مخاطبان و سرفصل‌های آن‌ها در وب‌سایت دکتر کیانا خرسند؛ آموزش جایگزین مشاورهٔ فردی نیست و ثبت‌نام از طریق سایت فعال نیست.";
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
  const { q, category, sort, page } = selection.query;
  const result = await readCourses(q, category, sort, page);
  return <Suspense fallback={<Courses result={result} hasError={selection.hasError} isLoading />}><Courses result={result} hasError={selection.hasError} /></Suspense>;
}
