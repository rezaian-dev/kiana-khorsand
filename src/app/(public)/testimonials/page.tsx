import type { Metadata } from "next";
import { Suspense } from "react";
import { Testimonials } from "@/components/sections/testimonials/testimonials";
import { routes } from "@/lib/constants";
import type { SearchParams } from "@/lib/catalog";
import { querySchema } from "@/lib/records";
import { readReviews } from "@/server/published";

type Props = { searchParams: Promise<SearchParams> };
const title = "تجربهٔ مراجعان";
const description = "روایت‌های تأییدشده با رضایت انتشار و احترام به حریم خصوصی؛ تجربهٔ هر فرد نتیجهٔ یکسان برای دیگران را تضمین نمی‌کند.";
const shareTitle = `${title} | دکتر کیانا خرسند`;

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const result = await readReviews(1);
  return {
    title, description, alternates: { canonical: routes.testimonials },
    robots: { index: result.count > 0 && Object.keys(params).length === 0, follow: true },
    openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.testimonials },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const parsed = querySchema.shape.page.safeParse(params.page ?? 1);
  const result = await readReviews(parsed.success ? parsed.data : 1);
  return <Suspense fallback={<Testimonials result={result} hasError={!parsed.success} isLoading />}><Testimonials result={result} hasError={!parsed.success} /></Suspense>;
}
