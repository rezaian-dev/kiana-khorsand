import type { Metadata } from "next";
import { Suspense } from "react";
import { Appointments } from "@/components/sections/appointments/appointments";
import { readVisits } from "@/server/member";
import { routes } from "@/lib/constants";
import { parseVisits } from "@/lib/visits";
import type { SearchParams } from "@/lib/catalog";

type Props = { searchParams: Promise<SearchParams> };

const title = "نوبت‌های من";
const description = "پیگیری نوبت‌های متعلق به حساب، وضعیت تأیید و لغو نوبت آینده؛ ساعت‌ها به وقت تهران.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.appointments }, robots: { index: false, follow: false }, openGraph: { type: "website", locale: "fa_IR", title, description, url: routes.appointments }, twitter: { card: "summary_large_image", title, description } };

export default async function Page({ searchParams }: Props) {
  const selection = parseVisits(await searchParams);
  const visits = await readVisits(selection.query.scope, selection.query.page);
  return <Suspense fallback={<Appointments visits={visits} hasError={selection.hasError} isLoading />}><Appointments visits={visits} hasError={selection.hasError} /></Suspense>;
}
