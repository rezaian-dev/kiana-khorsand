import { notFound, permanentRedirect } from "next/navigation";
import type { ArticleSearchProps } from "@/types/routes";
import { listArticles } from "@/features/articles/queries";
import { resolveArticleSearch } from "@/features/articles/search";
import { Intro } from "@/components/shared/intro";
import { ArticleBrowser } from "@/features/articles/ui/article-browser";
import { labels } from "@/lib/labels";
import { publicMetadata } from "@/lib/public-metadata";

const description =
  "نوشته‌های آموزشی درباره سلامت روان، روابط، اضطراب و مراقبت از خود را بخوانید.";

export async function generateMetadata({ searchParams }: ArticleSearchProps) {
  const [params, articles] = await Promise.all([searchParams, listArticles()]);
  const view = resolveArticleSearch(params, articles);
  if (!view.valid) notFound();
  return publicMetadata({
    title:
      view.page > 1 && !view.filtered
        ? `مقاله‌ها — صفحهٔ ${new Intl.NumberFormat("fa-IR").format(view.page)}`
        : labels.articles,
    description,
    path: view.href,
    image: "/assets/images/intro-journal.jpg",
    index: !view.filtered,
    canonical: !view.filtered,
  });
}

export default async function Page({ searchParams }: ArticleSearchProps) {
  const [params, articles] = await Promise.all([searchParams, listArticles()]);
  const view = resolveArticleSearch(params, articles);
  if (!view.valid) notFound();
  if (view.redirect) permanentRedirect(view.href);
  return (
    <>
      <Intro
        story="journal"
        title={labels.articles}
        description="نوشته‌هایی برای مکث، فهمیدن و مراقبت از خود؛ با خیال راحت موضوع دلخواهتان را پیدا کنید."
      />
      <ArticleBrowser
        articles={articles}
        initialQuery={view.q}
        initialCategory={view.category}
        initialPage={view.page}
      />
    </>
  );
}
