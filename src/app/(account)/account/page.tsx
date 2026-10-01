import type { Metadata } from "next";
import { Suspense } from "react";
import { Account } from "@/components/sections/account/account";
import { readMember, readVisits } from "@/server/member";
import { routes, visitScopes } from "@/lib/constants";

const title = "حساب من";
const description = "نمای کلی حساب شخصی و نوبت‌های آینده؛ اطلاعات خصوصی فقط پس از تأیید نشست نمایش داده می‌شوند.";
export const metadata: Metadata = { title, description, alternates: { canonical: routes.account }, robots: { index: false, follow: false }, openGraph: { type: "website", locale: "fa_IR", title, description, url: routes.account }, twitter: { card: "summary_large_image", title, description } };

export default async function Page() {
  const [member, visits] = await Promise.all([readMember(), readVisits(visitScopes.upcoming, 1)]);
  return <Suspense fallback={<Account member={member} visits={visits} isLoading />}><Account member={member} visits={visits} /></Suspense>;
}
