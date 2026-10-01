import type { Metadata } from "next";
import { Suspense } from "react";
import { Queue } from "@/components/sections/queue/queue";
import { readQueue } from "@/server/queue";
import { routes } from "@/lib/constants";
import type { SearchParams } from "@/lib/catalog";

const title = "بررسی دیدگاه‌ها";
const description = "فضای خصوصی بررسی دیدگاه‌ها؛ تصمیم انتشار بر پایهٔ اصالت روایت و رضایت معتبر.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.reviews }, robots: { index: false, follow: false }, openGraph: { title, description, locale: "fa_IR", url: routes.reviews }, twitter: { card: "summary", title, description } };
type Props = { searchParams: Promise<SearchParams> };
export default async function Page({ searchParams }: Props) {
  const snapshot = await readQueue("reviews", await searchParams);
  return <Suspense fallback={<Queue snapshot={snapshot} isLoading />}><Queue snapshot={snapshot} /></Suspense>;
}
