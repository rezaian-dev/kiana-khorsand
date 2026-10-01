import type { Metadata } from "next";
import { Suspense } from "react";
import { ContentList } from "@/components/sections/publishing/content-list";
import { readContent } from "@/server/publishing";
import { routes } from "@/lib/constants";
import type { SearchParams } from "@/lib/catalog";

const title = "مدیریت مقالات";
const description = "فضای خصوصی آماده‌سازی و بازبینی محتوای آموزشی.";
export const metadata: Metadata = { title, description, robots: { index: false, follow: false }, alternates: { canonical: routes.adminArticles }, openGraph: { title, description, locale: "fa_IR" }, twitter: { card: "summary", title, description } };
type Props = { searchParams: Promise<SearchParams> };
export default async function Page({ searchParams }: Props) {
  const snapshot = await readContent("article", await searchParams);
  return <Suspense fallback={<ContentList snapshot={snapshot} isLoading />}><ContentList snapshot={snapshot} /></Suspense>;
}
