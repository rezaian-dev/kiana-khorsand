import Link from "next/link";
import { ArrowUpLeft, CircleAlert, Clock3, MapPin } from "lucide-react";
import { MessageForm } from "./message-form";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { Photo } from "@/components/shared/photo";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import { JsonLd } from "@/components/shared/json-ld";
import { ContactLinks } from "@/components/layout/contact-links";
import { BookingBar } from "@/components/layout/booking-bar";
import { images } from "@/content/images";
import { notices } from "@/content/profile";
import type { Profile } from "@/lib/published";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { profile: Profile; isLoading?: boolean };

export function Contact({ profile, isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی صفحهٔ تماس…</p>}<main id="main-content" className="contact-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <><BreadcrumbSchema title="تماس" path={routes.contact} /><JsonLd schema={{ "@context": "https://schema.org", "@type": "ContactPage", url: `${origin}${routes.contact}`, name: "تماس", inLanguage: "fa-IR", about: { "@id": `${origin}/#person` } }} /></>}
    <SectionSurface tone="aurora"><div className="contact-lead"><div><PageHeading breadcrumb="تماس" eyebrow="ارتباط، با احترام به حریم شما" title="برای پرسیدن، لازم نیست همهٔ جزئیات را بگویید." description="این صفحه برای آشنایی با راه‌های ارتباط است. راه‌های ارتباط ثبت‌شده در این صفحه نمایش داده می‌شوند. فرم فعلی فقط نمونهٔ بررسی محلی است و از طریق آن هیچ پیام یا درخواست نوبتی دریافت نمی‌شود." /><p className="bio-name">{profile.name}<span>{profile.role}</span></p><Link href={routes.faq} className="quiet-link">پاسخ پرسش‌های متداول<ArrowUpLeft aria-hidden="true" /></Link></div><figure className="contact-portrait"><Photo image={images.portrait} sizes="(min-width: 768px) 280px, 80vw" /><figcaption>پرترهٔ هوش مصنوعی؛ عکس واقعی دکتر نیست.</figcaption></figure></div><div className="emergency-note" role="note"><CircleAlert aria-hidden="true" /><div><h2>برای کمک فوری، منتظر این سایت نمانید.</h2><p>{notices.emergency}</p></div></div></SectionSurface>
    <SectionSurface tone="cotton-candy" aria-label="راه‌های ارتباط و نمونهٔ فرم"><div className="contact-grid"><aside className="contact-options"><p className="section-eyebrow">راه‌های ارتباط</p><h2>اطلاعات روشن، پیش از تماس</h2><p className="muted">شماره یا نشانی فرضی درج نمی‌کنیم. فقط راه‌های ارتباط ثبت‌شده قابل‌استفاده‌اند؛ پیش از مراجعه هماهنگ کنید.</p><ContactLinks profile={profile} /><div className="contact-detail"><Clock3 aria-hidden="true" /><div><h3>زمان پاسخ‌گویی</h3><p>ساعات پاسخ‌گویی در این صفحه اعلام نشده است؛ پاسخ فوری یا زمان مشخص وعده داده نمی‌شود.</p></div></div><div className="contact-detail"><MapPin aria-hidden="true" /><div><h3>مراجعهٔ حضوری</h3><p>{profile.address ?? "آدرس مراجعه هنوز ثبت نشده است. پیش از مراجعه هماهنگ کنید."}</p></div></div><Link href={routes.services} className="quiet-link">آشنایی با مسیرهای مشاوره<ArrowUpLeft aria-hidden="true" /></Link></aside><MessageForm /></div></SectionSurface><BookingBar />
  </main></>;
}
