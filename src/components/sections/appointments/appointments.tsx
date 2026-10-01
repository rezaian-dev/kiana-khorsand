import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { AppointmentCard } from "@/components/shared/appointment-card";
import { AccountNav } from "@/components/layout/account-nav";
import { formatNumber } from "@/lib/format";
import { routes, visitScopes } from "@/lib/constants";
import { buildVisits, type Visits } from "@/lib/visits";

type Props = { visits: Visits; hasError: boolean; isLoading?: boolean };
const filters = [{ scope: visitScopes.upcoming, label: "پیش رو" }, { scope: visitScopes.past, label: "سوابق" }, { scope: visitScopes.all, label: "همهٔ نوبت‌ها" }] as const;

export function Appointments({ visits, hasError, isLoading = false }: Props) {
  return <>{isLoading && <p role="status" className="load-status">در حال دریافت نوبت‌های شما…</p>}<main id="main-content" className="member-page" inert={isLoading} aria-busy={isLoading}>
    <SectionSurface tone="ocean" className="member-intro"><PageHeading breadcrumb="نوبت‌های من" parents={[{ label: "حساب من", href: routes.account }]} eyebrow="پیگیری، با خیال روشن‌تر" title="نوبت‌های من" description="فقط نوبت‌های متعلق به حساب شما نمایش داده می‌شوند. زمان‌ها به وقت تهران‌اند؛ وضعیت «در انتظار تأیید» به معنی تأیید نهایی جلسه نیست." /><AccountNav current={routes.appointments} /></SectionSurface>
    <SectionSurface tone="mint-dew" aria-labelledby="visits-title"><div className="member-panel"><div className="member-heading"><div><h2 id="visits-title">وضعیت نوبت‌ها</h2><p className="muted">{formatNumber(visits.count)} نوبت در این انتخاب</p></div></div><nav className="filter-links member-filters" aria-label="نمایش نوبت‌ها">{filters.map(({ scope, label }) => <Link data-interact="control" key={scope} href={buildVisits({ scope, page: 1 })} prefetch={false} scroll={false} aria-current={scope === visits.query.scope ? "true" : undefined}>{label}</Link>)}</nav>
      <p className="section-disclosure">پیش رو: نوبت آیندهٔ فعال، از نزدیک‌ترین زمان. سوابق: زمان‌های شروع‌شده، برگزارشده یا لغوشده، از تازه‌ترین زمان. ساعت‌های گذشته خودکار «برگزارشده» فرض نمی‌شوند.</p>
      {hasError && <p className="query-notice" role="status">فیلتر نشانی معتبر نبود؛ نوبت‌های پیش رو نمایش داده شدند.</p>}
      {visits.entries.length ? <div className="visit-grid">{visits.entries.map((visit) => <AppointmentCard key={visit.id} visit={visit} />)}</div> : <div className="member-empty"><CalendarDays aria-hidden="true" /><h3>در این بخش نوبتی ندارید.</h3><p>می‌توانید «همهٔ نوبت‌ها» را بررسی کنید. اگر نتیجهٔ درخواست قبلی نامشخص بود، پیش از تکرار وضعیت را تازه کنید.</p></div>}
      <nav className="pagination" aria-label="صفحه‌بندی نوبت‌ها"><span>صفحهٔ {formatNumber(visits.query.page)} از {formatNumber(visits.pageCount)}</span><div>{visits.query.page > 1 && <Link href={buildVisits({ ...visits.query, page: visits.query.page - 1 })} prefetch={false}>قبلی</Link>}{visits.query.page < visits.pageCount && <Link href={buildVisits({ ...visits.query, page: visits.query.page + 1 })} prefetch={false}>بعدی</Link>}</div></nav>
      <p className="section-disclosure">لغو فقط برای نوبت آیندهٔ در انتظار تأیید یا تأییدشده در دسترس است و با بررسی مجدد سرور انجام می‌شود؛ این قاعدهٔ فنی، سیاست هزینه یا بازپرداخت نیست.</p>
    </div></SectionSurface>
  </main></>;
}
