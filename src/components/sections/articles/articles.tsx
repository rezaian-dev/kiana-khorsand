import { BookOpen } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { Photo } from "@/components/shared/photo";
import { ArticleCard } from "@/components/shared/article-card";
import { CatalogFilters } from "@/components/shared/catalog-filters";
import { CatalogResults } from "@/components/shared/catalog-results";
import { JsonLd } from "@/components/shared/json-ld";
import { BookingBar } from "@/components/layout/booking-bar";
import type { Catalog, Article } from "@/lib/published";
import { images } from "@/content/images";

import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { result: Catalog<Article>; hasError: boolean; isLoading?: boolean };

export function Articles({ result, hasError, isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی مقاله‌ها…</p>}<main id="main-content" className="public-page catalog-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
      { "@type": "ListItem", position: 2, name: "مقالات", item: `${origin}${routes.articles}` },
    ] }} />}
    <SectionSurface tone="peach-glow" className="catalog-intro"><div className="catalog-lead"><div><PageHeading breadcrumb="مقالات" eyebrow="یادداشت‌هایی برای مکث" title="کمی بخوانیم؛ با نگاه مهربان‌تر به خودمان." description="نوشته‌های کوتاه دربارهٔ شروع مشاوره، فشار روزمره و مراقبت از خود. می‌توانید از موضوعی شروع کنید که این روزها به تجربهٔ شما نزدیک‌تر است." /><div className="editorial-notice"><BookOpen aria-hidden="true" /><p>اینجا فقط نوشته‌های منتشرشده پس از بازبینی نمایش داده می‌شوند. آموزش عمومی جایگزین ارزیابی فردی نیست؛ نام نویسنده، تاریخ‌ها و منابع هر نوشته در صفحهٔ آن آمده‌اند.</p></div></div><figure className="catalog-photo"><Photo image={images.journal} sizes="(min-width: 1024px) 32vw, 90vw" /><figcaption>جایی برای خواندن و فکرکردن · تصویر نمونهٔ هوش مصنوعی</figcaption></figure></div></SectionSurface>
    <SectionSurface tone="cotton-candy" aria-label="فهرست مقاله‌ها"><CatalogFilters path={routes.articles} query={result.query} categories={result.categories} /><CatalogResults path={routes.articles} query={result.query} count={result.count} pageCount={result.pageCount} hasError={hasError} label="برای مطالعه"><div className="catalog-grid">{result.entries.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></CatalogResults></SectionSurface>
    <BookingBar />
  </main></>;
}
