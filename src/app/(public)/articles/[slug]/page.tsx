import {
  siteBadgeClassName,
  siteDetailClassName,
} from "@/components/shared/public-layout-classes";
import { readingSurfaceClassName } from "@/components/shared/reading-surface";
import { ScrollReveal } from "@/components/layout/page-reveal";
import { publicMetadata } from "@/lib/public-metadata";
import type { SlugPageProps } from "@/types/routes";
import { notFound } from "next/navigation";
import { getArticle, listArticles } from "@/features/articles/queries";
import { Intro } from "@/components/shared/intro";
import { ArticleProse } from "@/features/articles/ui/article-prose";
import { ArticleEmblem } from "@/features/articles/ui/article-emblem";
import { cleanEditorialBody } from "@/lib/clean-copy";
import { formatDate } from "@/lib/format";
import { StructuredData } from "@/components/shared/structured-data";
import { absoluteUrl } from "@/lib/site-urls";

export async function generateStaticParams() {
  return (await listArticles()).map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return publicMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/articles/${slug}`,
    image: article.cover,
    publishedTime: article.publishedAt,
  });
}
export default async function Page({ params }: SlugPageProps) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  const url = absoluteUrl(`/articles/${article.slug}`);
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          mainEntityOfPage: url,
          headline: article.title,
          description: article.excerpt,
          ...(article.cover ? { image: absoluteUrl(article.cover) } : {}),
          ...(article.publishedAt
            ? { datePublished: article.publishedAt }
            : {}),
          inLanguage: "fa-IR",
        }}
      />
      <Intro
        story="journal"
        parent={{ label: "مقالات", href: "/articles" }}
        title={article.title}
        description={article.excerpt}
        image={article.cover}
      />
      <ScrollReveal
        as="article"
        className={`${siteDetailClassName} reading-surface reading-surface-article ${readingSurfaceClassName}`}
      >
        <div className="article-detail-meta mb-[1.2rem] flex flex-wrap items-center gap-[0.8rem] border-b border-[var(--site-line)] pb-4">
          <span
            className="article-detail-symbol relative block size-[68px] flex-none [--art-surface:var(--site-surface)]"
            role="img"
            aria-label={`نشان موضوعی: ${article.visual.label}`}
          >
            <ArticleEmblem visual={article.visual} slug={article.slug} />
          </span>
          <div className="article-detail-meta-text flex min-w-0 flex-col items-start gap-[0.4rem]">
            <p className={siteBadgeClassName}>{article.category}</p>
            {article.publishedAt && (
              <time
                className="my-0! block text-[var(--site-muted)]"
                dateTime={article.publishedAt}
              >
                {formatDate(article.publishedAt)}
              </time>
            )}
          </div>
        </div>
        {article.tags.length > 0 && (
          <ul
            className="mt-[.8rem] mb-5 flex list-none flex-wrap gap-[.55rem] p-0"
            aria-label="برچسب‌های مقاله"
          >
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-[999px] border border-[color:color-mix(in_srgb,var(--c-teal)_30%,var(--line))] bg-[color:color-mix(in_srgb,var(--c-teal)_8%,var(--surface))] px-[.85rem] py-[.35rem] text-[.83rem] font-bold text-[var(--fg)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <ArticleProse body={cleanEditorialBody(article.body, "article")} />
      </ScrollReveal>
    </>
  );
}
