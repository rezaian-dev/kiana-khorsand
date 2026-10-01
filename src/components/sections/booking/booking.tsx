import { ShieldCheck } from "lucide-react";
import { BookingForm } from "./booking-form";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { BreadcrumbSchema } from "@/components/shared/breadcrumb-schema";
import type { Availability, Selection } from "@/lib/booking";
import type { Viewer } from "@/lib/viewer";
import { routes } from "@/lib/constants";
import { services } from "@/content/services";
import { notices } from "@/content/profile";

type Props = { availability: Availability; selection: Selection; viewer: Viewer | null; hasError: boolean; isLoading?: boolean };

export function Booking({ availability, selection, viewer, hasError, isLoading = false }: Props) {
  return <>{isLoading && <p className="load-status" role="status">در حال دریافت زمان‌های مشاوره…</p>}<main id="main-content" className="public-page booking-page reservation-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <BreadcrumbSchema title="رزرو وقت مشاوره" path={routes.booking} />}
    <SectionSurface tone="cotton-candy" className="reservation-intro"><PageHeading breadcrumb="رزرو وقت مشاوره" eyebrow="یک قدم، برای خودتان" title="زمانی برای گفت‌وگو انتخاب کنید." description="نوع جلسه، روز و ساعت را انتخاب کنید و درخواست را ثبت کنید. ثبت درخواست به معنی تأیید نهایی جلسه نیست؛ شرح‌حال یا اطلاعات حساس لازم نداریم." /><ol className="booking-steps" aria-label="مراحل ثبت درخواست"><li><span>۱</span>نوع جلسه</li><li><span>۲</span>روز</li><li><span>۳</span>ساعت</li><li><span>۴</span>ثبت درخواست</li></ol></SectionSurface>
    <SectionSurface tone="cotton-candy" className="booking-layout" aria-label="انتخاب زمان و ثبت درخواست"><div className="booking-update"><p>ظرفیت ممکن است تغییر کند؛ انتخاب نهایی در سرور دوباره بررسی می‌شود.</p></div><BookingForm services={services.map(({ key, title }) => ({ key, title }))} key={viewer?.id ?? "guest"} availability={availability} selection={selection} viewer={viewer ? { name: viewer.name } : null} hasError={hasError} /></SectionSurface>
    <SectionSurface tone="mint-dew" className="reservation-care"><div className="booking-care"><ShieldCheck aria-hidden="true" /><div><h2>پیش از ثبت، با اطلاع تصمیم بگیرید.</h2><p>زمان‌ها فقط از برنامهٔ ثبت‌شده خوانده می‌شوند و نگه داشته نمی‌شوند. هزینه، شیوهٔ برگزاری و شرایط مالی لغو در این نسخه اعلام نشده‌اند؛ پیش از استفادهٔ واقعی باید از صاحب خدمت روشن شوند. پرداختی در سایت انجام نمی‌شود.</p><p>{notices.emergency}</p><p className="section-disclosure">نسخه در حال تکمیل است؛ راه‌اندازی فنی، تأیید حرفه‌ای یا حقوقی و آمادگی پذیرش واقعی نیست.</p></div></div></SectionSurface>
  </main></>;
}
