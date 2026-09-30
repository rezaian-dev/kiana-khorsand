import { BookOpen } from "lucide-react";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { Photo } from "@/components/shared/photo";
import { ArticleCard } from "@/components/shared/article-card";
import { CatalogFilters } from "@/components/shared/catalog-filters";
import { CatalogResults } from "@/components/shared/catalog-results";
import { JsonLd } from "@/components/shared/json-ld";
import { BookingBar } from "@/components/layout/booking-bar";
import { articles } from "@/content/articles";
import { images } from "@/content/images";
import { selectCatalog, type CatalogQuery } from "@/lib/catalog";
import { routes } from "@/lib/constants";
import { getEnv } from "@/lib/env";

type Props = { query: CatalogQuery; hasError: boolean; isLoading?: boolean };

export function Articles({ query, hasError, isLoading = false }: Props) {
  const result = selectCatalog(articles, query);
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی مقاله‌ها…</p>}<main id="main-content" className="catalog-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
      { "@type": "ListItem", position: 2, name: "مقالات", item: `${origin}${routes.articles}` },
    ] }} />}
    <SectionSurface tone="peach-glow" className="catalog-intro"><div className="catalog-lead"><div><PageHeading breadcrumb="مقالات" eyebrow="یادداشت‌هایی برای مکث" title="کمی بخوانیم؛ با نگاه مهربان‌تر به خودمان." description="نوشته‌های کوتاه دربارهٔ شروع مشاوره، فشار روزمره و مراقبت از خود. می‌توانید از موضوعی شروع کنید که این روزها به تجربهٔ شما نزدیک‌تر است." /><div className="editorial-notice"><BookOpen aria-hidden="true" /><p>متن‌ها پیش‌نویس آموزشیِ تهیه‌شده با کمک هوش مصنوعی‌اند؛ هنوز به تأیید دکتر نرسیده‌اند و جایگزین ارزیابی فردی نیستند. منابع عمومی در پایان هر نوشته آمده‌اند.</p></div></div><figure className="catalog-photo"><Photo image={images.journal} sizes="(min-width: 1024px) 32vw, 90vw" /><figcaption>جایی برای خواندن و فکرکردن · تصویر نمونهٔ هوش مصنوعی</figcaption></figure></div></SectionSurface>
    <SectionSurface tone="cotton-candy" aria-label="فهرست مقاله‌ها"><CatalogFilters path={routes.articles} query={result.query} categories={[...new Set(articles.map((article) => article.category))]} /><CatalogResults path={routes.articles} query={result.query} count={result.count} pageCount={result.pageCount} hasError={hasError} label="برای مطالعه"><div className="catalog-grid">{result.entries.map((article) => <ArticleCard key={article.slug} article={article} />)}</div></CatalogResults></SectionSurface>
    <BookingBar />
  </main></>;
}
