import type { Metadata } from "next";
import { Suspense } from "react";
import { Agenda } from "@/components/sections/agenda/agenda";
import { readAgenda } from "@/server/agenda";
import { routes } from "@/lib/constants";
import type { SearchParams } from "@/lib/catalog";

const title = "مدیریت نوبت‌ها";
const description = "فضای خصوصی بررسی و هماهنگی نوبت‌های مشاوره.";
export const metadata: Metadata = { title, description, robots: { index: false, follow: false }, alternates: { canonical: routes.agenda }, openGraph: { title, description, locale: "fa_IR", url: routes.agenda }, twitter: { card: "summary", title, description } };
type Props = { searchParams: Promise<SearchParams> };

export default async function Page({ searchParams }: Props) {
  const snapshot = await readAgenda(await searchParams);
  return <Suspense fallback={<Agenda snapshot={snapshot} isLoading />}><Agenda snapshot={snapshot} /></Suspense>;
}
