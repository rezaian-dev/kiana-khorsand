import type { Metadata } from "next";
import { Suspense } from "react";
import { Settings } from "@/components/sections/settings/settings";
import { readMember } from "@/server/member";
import { routes } from "@/lib/constants";

const title = "تنظیمات حساب";
const description = "ویرایش نام و شمارهٔ تماس و تغییر رمز حساب شخصی؛ بدون نمایش رمز یا اطلاعات نشست.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.settings }, robots: { index: false, follow: false }, openGraph: { type: "website", locale: "fa_IR", title, description, url: routes.settings }, twitter: { card: "summary_large_image", title, description } };

export default async function Page() {
  const member = await readMember();
  return <Suspense fallback={<Settings member={member} isLoading />}><Settings member={member} /></Suspense>;
}
