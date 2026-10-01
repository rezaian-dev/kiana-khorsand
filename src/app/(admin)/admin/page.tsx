import type { Metadata } from "next";
import { Suspense } from "react";
import { Dashboard } from "@/components/sections/dashboard/dashboard";
import { readAdmin, readDashboard } from "@/server/admin";
import { routes } from "@/lib/constants";

const title = "داشبورد مدیریت";
const description = "فضای خصوصی مدیریت؛ دسترسی تنها برای حساب مدیر تأییدشده.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.admin }, robots: { index: false, follow: false }, openGraph: { title, description, locale: "fa_IR", url: routes.admin }, twitter: { card: "summary", title, description } };

export default async function Page() {
  const viewer = await readAdmin();
  const snapshot = await readDashboard();
  return <Suspense fallback={<Dashboard name={viewer.name} snapshot={snapshot} isLoading />}><Dashboard name={viewer.name} snapshot={snapshot} /></Suspense>;
}
