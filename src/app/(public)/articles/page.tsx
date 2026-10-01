import type { Metadata } from "next";
import { Suspense } from "react";
import { Articles } from "@/components/sections/articles/articles";
import { parseCatalog, type SearchParams } from "@/lib/catalog";
import { readArticles } from "@/server/published";
import { routes } from "@/lib/constants";

type Props = { searchParams: Promise<SearchParams> };
const title = "مقالات روان‌شناسی";
const description = "مقاله‌های منتشرشده دربارهٔ شروع مشاوره، تجربهٔ روزمره و مراقبت از خود؛ همراه با نام نویسنده، تاریخ انتشار و منابع، برای مطالعهٔ عمومی و نه تشخیص فردی.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  return {
    title, description, alternates: { canonical: routes.articles },
    robots: { index: Object.keys(params).length === 0, follow: true },
    openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.articles },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export default async function Page({ searchParams }: Props) {
  const selection = parseCatalog(await searchParams);
  const { q, category, sort, page } = selection.query;
  const result = await readArticles(q, category, sort, page);
  return <Suspense fallback={<Articles result={result} hasError={selection.hasError} isLoading />}><Articles result={result} hasError={selection.hasError} /></Suspense>;
}
