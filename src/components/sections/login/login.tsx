import Link from "next/link";
import { Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { SectionSurface } from "@/components/shared/section-surface";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import { PageHeading } from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { AuthTabs } from "./auth-tabs";
import { routes } from "@/lib/constants";
import type { Viewer } from "@/lib/viewer";

type Props = { isReady: boolean; viewer?: Viewer | null; isLoading?: boolean };

export function Login({ isReady, viewer = null, isLoading = false }: Props) {
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی ورود…</p>}<main id="main-content" className="login-page" inert={isLoading} aria-busy={isLoading}>{!isLoading && <BreadcrumbSchema title="ورود / ثبت‌نام" path={routes.login} />}<SectionSurface tone="aurora"><div className="login-grid"><div className="login-copy"><PageHeading breadcrumb="ورود / ثبت‌نام" eyebrow="فضایی برای ادامهٔ مسیر" title="خوش آمدید؛ از همین‌جا شروع کنیم." description="حساب شخصی برای دسترسی به خدمات حساب و پیگیری نوبت‌هاست؛ ساخت حساب به‌تنهایی به معنی رزرو جلسه یا شروع رابطهٔ درمانی نیست." /><div className="login-note"><LockKeyhole aria-hidden="true" /><div><h2>کمترین اطلاعات لازم</h2><p>برای ساخت حساب، نام، ایمیل و رمز کافی است. تأیید ایمیل و بازیابی رمز با ایمیل هنوز فراهم نشده‌اند؛ رمزتان را در جای امن نگه دارید.</p></div></div><div className="login-note"><ShieldCheck aria-hidden="true" /><div><h2>هر مرحله روشن و جداست</h2><p>پس از ورود می‌توانید مشخصات و نوبت‌های حساب خود را پیگیری کنید؛ رزرو آنلاین هنوز در حال تکمیل است. این صفحه خدمات اورژانسی ارائه نمی‌کند و جای گفت‌وگوی محرمانهٔ درمانی نیست.</p></div></div><Link href={routes.faq} className="quiet-link">پاسخ پرسش‌های پیش از شروع</Link></div><section className="auth-panel" aria-label="دسترسی به حساب">{viewer ? <div className="auth-confirmed"><span className="auth-symbol"><Check aria-hidden="true" /></span><h2>{viewer.name}، خوش آمدید.</h2><p>نشست شما در سرور تأیید شده است. می‌توانید وارد بخش شخصی شوید یا از منوی حساب خارج شوید؛ رزرو آنلاین هنوز در حال تکمیل است.</p><Button asChild size="lg"><Link href={routes.account} prefetch={false}>رفتن به حساب من</Link></Button></div> : <><div className="auth-heading"><span className="auth-symbol"><LockKeyhole aria-hidden="true" /></span><h2>حساب شما</h2><p>وارد شوید یا یک حساب تازه بسازید.</p></div><AuthTabs isReady={isReady} /></>}</section></div></SectionSurface></main></>;
}
