import Link from "next/link";
import { ArrowUpLeft, BookOpen } from "lucide-react";
import { CourseOutline } from "./course-outline";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { CatalogFilters } from "@/components/shared/catalog-filters";
import { CatalogResults } from "@/components/shared/catalog-results";
import { JsonLd } from "@/components/shared/json-ld";
import { BookingBar } from "@/components/layout/booking-bar";
import type { Catalog, Course } from "@/lib/published";
import { buildHref } from "@/lib/catalog";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { result: Catalog<Course>; hasError: boolean; isLoading?: boolean };

export function Courses({ result, hasError, isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی دوره‌ها…</p>}<main id="main-content" className="public-page catalog-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
      { "@type": "ListItem", position: 2, name: "دوره‌ها", item: `${origin}${routes.courses}` },
    ] }} />}
    {!isLoading && result.entries.length > 0 && <JsonLd schema={{ "@context": "https://schema.org", "@graph": result.entries.map((course) => ({
      "@type": "Course", "@id": `${origin}${routes.courses}#${course.slug}`, url: `${origin}${buildHref(routes.courses, result.query)}#${course.slug}`,
      name: course.title, description: course.description, image: `${origin}${course.image.path}`, inLanguage: "fa-IR",
      datePublished: course.publishedAt, dateModified: course.updatedAt,
    })) }} />}
    <SectionSurface tone="ocean" className="catalog-intro"><PageHeading breadcrumb="دوره‌ها" eyebrow="فرصتی برای یادگیری" title="یادگیری، یک قدم کوچک برای زندگی روزمره" description="معرفی دوره‌های تأییدشده برای شناخت خود، گفت‌وگو و روابط خانوادگی. می‌توانید مخاطبان و سرفصل‌های هر دوره را مرور کنید؛ ثبت‌نام از طریق این سایت فعال نیست." /><div className="editorial-notice"><BookOpen aria-hidden="true" /><p>فقط معرفی دوره‌های منتشرشده پس از بازبینی نمایش داده می‌شود. آموزش عمومی جایگزین مشاوره و ارزیابی فردی نیست؛ انتشار معرفی به معنی آغاز ثبت‌نام یا وعدهٔ نتیجه نیست.</p></div><nav className="course-index" aria-label="دسترسی به معرفی دوره‌ها">{result.entries.map((course) => <Link key={course.slug} className="quiet-link" href={`#${course.slug}`} prefetch={false}>{course.title}<ArrowUpLeft aria-hidden="true" /></Link>)}</nav></SectionSurface>
    <SectionSurface tone="mint-dew" aria-label="فهرست دوره‌ها"><CatalogFilters path={routes.courses} query={result.query} categories={result.categories} /><CatalogResults path={routes.courses} query={result.query} count={result.count} pageCount={result.pageCount} hasError={hasError} label="معرفی دوره‌ها"><div className="course-list">{result.entries.map((course) => <CourseOutline key={course.slug} course={course} />)}</div></CatalogResults></SectionSurface>
    <SectionSurface tone="sunrise" className="learning-note" aria-labelledby="learning-title"><div><p className="section-eyebrow">مسیر دیگری برای یادگیری</p><h2 id="learning-title">می‌توانید از خواندن شروع کنید.</h2><p className="muted">نوشته‌های منتشرشده و منابع آن‌ها را در بخش مقاله‌ها ببینید؛ آموزش عمومی جایگزین گفت‌وگوی شخصی نیست.</p><Link className="quiet-link" href={routes.articles}>دیدن مقاله‌ها<ArrowUpLeft aria-hidden="true" /></Link></div></SectionSurface><BookingBar />
  </main></>;
}
