import { FilePenLine } from "lucide-react";
import { Body } from "./body";
import { Related } from "./related";
import { PageHeading } from "@/components/shared/page-heading";
import { SectionSurface } from "@/components/shared/section-surface";
import { Photo } from "@/components/shared/photo";
import { JsonLd } from "@/components/shared/json-ld";
import { BookingPrompt } from "@/components/shared/booking-prompt";
import { BookingBar } from "@/components/layout/booking-bar";
import type { Article as ArticleContent } from "@/lib/published";
import { routes, topics } from "@/lib/constants";
import type { Profile } from "@/lib/published";
import { formatDate } from "@/lib/format";
import { getEnv } from "@/lib/env";

type Props = { article: ArticleContent; related: ArticleContent[]; profile: Profile; isLoading?: boolean };

export function Article({ article, related, profile, isLoading = false }: Props) {
  const origin = getEnv().NEXT_PUBLIC_SITE_URL;
  const url = `${origin}${routes.articles}/${article.slug}`;
  return <>{isLoading && <p className="load-status" role="status">در حال آماده‌سازی نوشته…</p>}<main id="main-content" className="article-page booking-page" inert={isLoading} aria-busy={isLoading}>
    {!isLoading && <JsonLd schema={{ "@context": "https://schema.org", "@graph": [
      { "@type": "Article", "@id": `${url}#article`, url, mainEntityOfPage: url, headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.updatedAt, author: { "@type": "Person", name: article.author, ...(article.author === profile.name ? { url: `${origin}${routes.about}` } : {}) }, image: `${origin}${article.image.path}`, articleSection: topics[article.category], inLanguage: "fa-IR", citation: article.sources.map((source) => source.href), isPartOf: { "@id": `${origin}/#website` } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "صفحه اصلی", item: `${origin}${routes.home}` },
        { "@type": "ListItem", position: 2, name: "مقالات", item: `${origin}${routes.articles}` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ] },
    ] }} />}
    <article><SectionSurface tone="aurora" className="article-intro"><div className="article-lead"><div><PageHeading title={article.title} description={article.description} eyebrow={topics[article.category]} parents={[{ label: "مقالات", href: routes.articles }]} /><p className="draft-label"><FilePenLine aria-hidden="true" />مطلب آموزشی · منتشرشده پس از بازبینی</p><p className="section-disclosure">نویسنده: {article.author}<br />انتشار: <time dateTime={article.publishedAt}>{formatDate(new Date(article.publishedAt))}</time> · آخرین ویرایش: <time dateTime={article.updatedAt}>{formatDate(new Date(article.updatedAt))}</time></p></div><figure className="article-cover"><Photo image={article.image} sizes="(min-width: 1024px) 40vw, 90vw" />{article.image.isSample && <figcaption>تصویر مفهومی ساخته‌شده با هوش مصنوعی</figcaption>}</figure></div></SectionSurface><SectionSurface tone="mint-dew" aria-label="متن نوشته"><Body article={article} profile={profile} /></SectionSurface></article>
    <Related articles={related} /><BookingPrompt tone="dream" title="خواندن، جای گفت‌وگوی شخصی را نمی‌گیرد." description="اگر موضوعی به تجربهٔ شما نزدیک است، می‌توانید دربارهٔ مناسب‌بودن مشاوره اطلاعات بیشتری بگیرید. این متن برای تشخیص یا تصمیم درمانی کافی نیست." secondaryHref={routes.services} secondaryLabel="آشنایی با خدمات مشاوره" /><BookingBar />
  </main></>;
}
