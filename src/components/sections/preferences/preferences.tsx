import Link from "next/link";
import { SettingsForm } from "./settings-form";
import { routes } from "@/lib/constants";
import type { SettingsSnapshot } from "@/lib/preferences";

type Props = { snapshot: SettingsSnapshot; isLoading?: boolean };

export function Preferences({ snapshot, isLoading = false }: Props) {
  return <>{isLoading && <p className="load-status" role="status">در حال دریافت تنظیمات…</p>}<main id="main-content" className="admin-records" inert={isLoading} aria-busy={isLoading}><div className="dashboard-title"><div><nav className="breadcrumbs" aria-label="مسیر صفحه"><Link href={routes.admin}>مدیریت</Link><span aria-hidden="true">/</span><span aria-current="page">تنظیمات سایت</span></nav><h1>تنظیمات خدمت شخصی</h1><p>مشخصات عمومی، برنامهٔ هفتگی و راه‌های تماس.</p></div></div><section className="dashboard-panel"><h2>ویرایش تنظیمات سایت</h2><SettingsForm snapshot={snapshot} /></section><p className="dashboard-caption">این صفحه جای تأیید مجوز حرفه‌ای، شرایط خدمت، سیاست نگهداری داده یا تنظیم کلیدهای محرمانهٔ میزبان نیست. برای نام/شماره/رمز حساب ورود، <Link href={routes.settings}>تنظیمات حساب خودم</Link> را باز کنید.</p></main></>;
}
