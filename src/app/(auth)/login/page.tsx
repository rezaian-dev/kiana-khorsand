import type { Metadata } from "next";
import { Suspense } from "react";
import { Login } from "@/components/sections/login/login";
import { getViewer } from "@/server/viewer";
import { canAuthenticate } from "@/server/auth";
import { routes } from "@/lib/constants";

import { getReturn } from "@/lib/booking";
import type { SearchParams } from "@/lib/catalog";

const title = "ورود / ثبت‌نام";
const description = "ورود یا ساخت حساب شخصی در وب‌سایت دکتر کیانا خرسند؛ ساخت حساب به معنی رزرو جلسه یا شروع درمان نیست.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.login }, robots: { index: false, follow: false }, openGraph: { type: "website", locale: "fa_IR", siteName: "دکتر کیانا خرسند", title, description, url: routes.login }, twitter: { card: "summary_large_image", title, description } };

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [viewer, params] = await Promise.all([getViewer(), searchParams]);
  const returnTo = getReturn(params.next);
  const isReady = canAuthenticate();
  return <Suspense fallback={<Login returnTo={returnTo} viewer={viewer} isReady={isReady} isLoading />}><Login returnTo={returnTo} viewer={viewer} isReady={isReady} /></Suspense>;
}
