import type { Metadata } from "next";
import { Suspense } from "react";
import { Booking } from "@/components/sections/booking/booking";
import { readAvailability } from "@/server/booking";
import { getViewer } from "@/server/viewer";
import { parseBooking } from "@/lib/booking";
import type { SearchParams } from "@/lib/catalog";
import { routes } from "@/lib/constants";

type Props = { searchParams: Promise<SearchParams> };
const title = "رزرو وقت مشاوره";
const shareTitle = `${title} | دکتر کیانا خرسند`;
const description = "انتخاب نوع جلسه، روز و ساعت از برنامهٔ ثبت‌شده و ارسال درخواست نوبت؛ ثبت درخواست به معنی تأیید نهایی نیست و زمان‌ها به وقت تهران‌اند.";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const [params, availability] = await Promise.all([searchParams, readAvailability()]);
  return { title, description, alternates: { canonical: routes.booking }, robots: { index: availability.isEnabled && Object.keys(params).length === 0, follow: true }, openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title: shareTitle, description, url: routes.booking }, twitter: { card: "summary_large_image", title: shareTitle, description } };
}

export default async function Page({ searchParams }: Props) {
  const [params, availability, viewer] = await Promise.all([searchParams, readAvailability(), getViewer()]);
  const parsed = parseBooking(params);
  const isOutside = !!parsed.selection.date && (parsed.selection.date < availability.today || parsed.selection.date > availability.until);
  const selection = isOutside ? { service: parsed.selection.service } : parsed.selection;
  const content = { availability, viewer, selection, hasError: parsed.hasError || isOutside };
  return <Suspense fallback={<Booking {...content} isLoading />}><Booking {...content} /></Suspense>;
}
