import Link from "next/link";
import { ArrowUpLeft, CalendarDays, ShieldCheck, UserRound } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { AppointmentCard } from "@/components/shared/appointment-card";
import { RefreshButton } from "@/components/shared/refresh-button";
import { AccountNav } from "@/components/layout/account-nav";
import { Button } from "@/components/ui/button";
import { formatNumber, getInitials } from "@/lib/format";
import { routes } from "@/lib/constants";
import type { Member } from "@/lib/member";
import type { Visits } from "@/lib/visits";

type Props = { member: Member; visits: Visits; isLoading?: boolean };

export function Account({ member, visits, isLoading = false }: Props) {
  return <>{isLoading && <p role="status" className="load-status">در حال آماده‌سازی حساب…</p>}<main id="main-content" className="member-page" inert={isLoading} aria-busy={isLoading}>
    <SectionSurface tone="aurora" className="member-intro"><div className="member-greeting"><div><PageHeading breadcrumb="حساب من" eyebrow="فضای شخصی شما" title={`${member.name}، خوش آمدید.`} description="وضعیت نوبت‌ها و مشخصات حساب را در یک جای روشن و ساده پیگیری کنید. این بخش پروندهٔ درمانی یا راه ارتباط اورژانسی نیست." /></div><span className="member-avatar" aria-hidden="true">{getInitials(member.name)}</span></div><AccountNav current={routes.account} /></SectionSurface>
    <SectionSurface tone="cotton-candy"><div className="member-overview"><section className="member-panel" aria-labelledby="next-title"><div className="member-heading"><div><span className="section-eyebrow">یک نگاه کوتاه</span><h2 id="next-title">نوبت‌های پیش رو</h2><p className="muted">{formatNumber(visits.count)} نوبت آیندهٔ فعال · ساعت‌ها به وقت تهران</p></div><RefreshButton /></div>{visits.entries.length ? <div className="visit-grid">{visits.entries.slice(0, 2).map((visit) => <AppointmentCard key={visit.id} visit={visit} />)}</div> : <div className="member-empty"><CalendarDays aria-hidden="true" /><h3>نوبت آیندهٔ فعالی ندارید.</h3><p>این وضعیت از حساب شما خوانده شده است؛ نوبت لغوشده یا گذشته را می‌توانید در سوابق ببینید.</p></div>}<Link href={routes.appointments} prefetch={false} className="quiet-link">همهٔ نوبت‌های من<ArrowUpLeft aria-hidden="true" /></Link></section>
      <aside className="member-sidebar"><section className="member-panel"><span className="member-symbol"><UserRound aria-hidden="true" /></span><h2>مشخصات حساب</h2><dl className="member-details"><div><dt>نام</dt><dd>{member.name}</dd></div><div><dt>ایمیل</dt><dd><bdi>{member.email}</bdi></dd></div><div><dt>شمارهٔ همراه</dt><dd><bdi>{member.phone || "ثبت نشده"}</bdi></dd></div></dl><Button asChild variant="outline"><Link href={routes.settings} prefetch={false}>ویرایش مشخصات<ArrowUpLeft aria-hidden="true" /></Link></Button></section><section className="member-panel member-care"><ShieldCheck aria-hidden="true" /><h2>حساب شما، نه شرح‌حال شما</h2><p>برای پیگیری نوبت به نوشتن جزئیات حساس نیاز نیست. ثبت درخواست هم به معنی تأیید نهایی جلسه نیست.</p><p>در صفحهٔ رزرو، زمان‌های برنامهٔ فعال را ببینید و درخواست تازه ثبت کنید.</p><Link href={routes.booking} prefetch={false} className="quiet-link">رزرو وقت مشاوره<ArrowUpLeft aria-hidden="true" /></Link></section></aside>
    </div></SectionSurface>
  </main></>;
}
