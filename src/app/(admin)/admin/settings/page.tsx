import type { Metadata } from "next";
import { Suspense } from "react";
import { Preferences } from "@/components/sections/preferences/preferences";
import { readPreferences } from "@/server/preferences";
import { routes } from "@/lib/constants";

const title = "تنظیمات حرفه‌ای سایت";
const description = "تنظیمات خصوصی مشخصات حرفه‌ای، برنامهٔ هفتگی رزرو و راه‌های ارتباط عمومی سایت.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.adminSettings }, robots: { index: false, follow: false }, openGraph: { title, description, locale: "fa_IR", url: routes.adminSettings }, twitter: { card: "summary", title, description } };
export default async function Page() {
  const snapshot = await readPreferences();
  return <Suspense fallback={<Preferences snapshot={snapshot} isLoading />}><Preferences snapshot={snapshot} /></Suspense>;
}
