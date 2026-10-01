import type { Metadata } from "next";
import { Suspense } from "react";
import { Clients } from "@/components/sections/clients/clients";
import { readClients } from "@/server/clients";
import { routes } from "@/lib/constants";
import type { SearchParams } from "@/lib/catalog";

const title = "مدیریت حساب‌های مراجعان";
const description = "فضای خصوصی اطلاعات ضروری هماهنگی و تاریخچهٔ نوبت‌ها.";
export const metadata: Metadata = { title, description, robots: { index: false, follow: false }, alternates: { canonical: routes.clients }, openGraph: { title, description, locale: "fa_IR", url: routes.clients }, twitter: { card: "summary", title, description } };
type Props = { searchParams: Promise<SearchParams> };

export default async function Page({ searchParams }: Props) {
  const snapshot = await readClients(await searchParams);
  return <Suspense fallback={<Clients snapshot={snapshot} isLoading />}><Clients snapshot={snapshot} /></Suspense>;
}
