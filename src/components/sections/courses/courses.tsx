import Link from "next/link";
import { ArrowUpLeft, BookOpen } from "lucide-react";
import { CourseOutline } from "./course-outline";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { CatalogFilters } from "@/components/shared/catalog-filters";
import { CatalogResults } from "@/components/shared/catalog-results";
import { JsonLd } from "@/components/shared/json-ld";
import { BookingBar } from "@/components/layout/booking-bar";
import { courses } from "@/content/courses";
import { selectCatalog, type CatalogQuery } from "@/lib/catalog";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { query: CatalogQuery; hasError: boolean; isLoading?: boolean };

export function Courses({ query, hasError, isLoading = false }: Props) {
  const result = selectCatalog(courses, query);
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی دوره‌ها…</p>}<main id="main-content" className="catalog-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
      { "@type": "ListItem", position: 2, name: "دوره‌ها", item: `${origin}${routes.courses}` },
    ] }} />}
    <SectionSurface tone="dream" className="catalog-intro"><PageHeading breadcrumb="دوره‌ها" eyebrow="فرصتی برای یادگیری" title="یادگیری، یک قدم کوچک برای زندگی روزمره" description="موضوع‌های پیشنهادی برای شناخت خود، گفت‌وگو و روابط خانوادگی. این صفحه فعلاً معرفی طرح‌هاست، نه عرضهٔ دورهٔ آماده یا دعوت به خرید." /><div className="editorial-notice"><BookOpen aria-hidden="true" /><p>این سرفصل‌ها پیش‌نویس‌اند و هنوز تأیید نشده‌اند. آموزش عمومی جایگزین مشاوره و ارزیابی فردی نیست؛ هیچ گواهی، نتیجه، قیمت یا زمان برگزاری وعده داده نمی‌شود.</p></div><nav className="course-index" aria-label="دسترسی به طرح دوره‌ها">{courses.map((course) => <Link key={course.slug} className="quiet-link" href={`${routes.courses}#${course.slug}`} prefetch={false}>{course.title}<ArrowUpLeft aria-hidden="true" /></Link>)}</nav></SectionSurface>
    <SectionSurface tone="mint-dew" aria-label="فهرست طرح‌های آموزشی"><CatalogFilters path={routes.courses} query={result.query} categories={[...new Set(courses.map((course) => course.category))]} /><CatalogResults path={routes.courses} query={result.query} count={result.count} pageCount={result.pageCount} hasError={hasError} label="طرح‌های آموزشی"><div className="course-list">{result.entries.map((course) => <CourseOutline key={course.slug} course={course} />)}</div></CatalogResults></SectionSurface>
    <SectionSurface tone="sunrise" className="learning-note" aria-labelledby="learning-title"><div><p className="section-eyebrow">تا آماده‌شدن آموزش‌ها</p><h2 id="learning-title">می‌توانید از خواندن شروع کنید.</h2><p className="muted">پیش‌نویس یادداشت‌های آموزشی و منابع عمومی آن‌ها در بخش مقاله‌ها در دسترس‌اند؛ با یادآوری اینکه هنوز بازبینی حرفه‌ای نشده‌اند.</p><Link className="quiet-link" href={routes.articles}>دیدن مقاله‌ها<ArrowUpLeft aria-hidden="true" /></Link></div></SectionSurface><BookingBar />
  </main></>;
}
