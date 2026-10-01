import type { Metadata } from "next";
import { Suspense } from "react";
import { Queue } from "@/components/sections/queue/queue";
import { readQueue } from "@/server/queue";
import { routes } from "@/lib/constants";
import type { SearchParams } from "@/lib/catalog";

const title = "صندوق پیام‌ها";
const description = "صندوق خصوصی پیام‌های تماس؛ خواندن مورد انتخاب‌شده و ثبت صریح وضعیت پیگیری داخلی.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.inbox }, robots: { index: false, follow: false }, openGraph: { title, description, locale: "fa_IR", url: routes.inbox }, twitter: { card: "summary", title, description } };
type Props = { searchParams: Promise<SearchParams> };
export default async function Page({ searchParams }: Props) {
  const snapshot = await readQueue("messages", await searchParams);
  return <Suspense fallback={<Queue snapshot={snapshot} isLoading />}><Queue snapshot={snapshot} /></Suspense>;
}
