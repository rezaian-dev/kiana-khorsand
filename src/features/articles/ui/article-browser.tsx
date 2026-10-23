"use client";

import { siteContainerClassName } from "@/components/shared/site-styles";

import { useArticleFilters } from "../use-article-filters";
import { ArticleFilters } from "./article-filters";
import { ArticleResults } from "./article-results";
import { ArticlePagination } from "./article-pagination";
import type { ArticleSummary } from "../types";

/**
 * Client-side article experience: search, category facets and pagination over the
 * list already rendered by the server. State lives in the URL, filtering happens in
 * the browser, and the page never scrolls under the reader's fingers.
 */
export function ArticleBrowser({
  articles,
  initialQuery,
  initialCategory,
  initialPage,
}: {
  articles: ArticleSummary[];
  initialQuery: string;
  initialCategory: string;
  initialPage: number;
}) {
  const {
    query,
    category,
    page,
    pages,
    categories,
    filtered,
    visible,
    isFiltered,
    search,
    selectCategory,
    goToPage,
    reset,
  } = useArticleFilters(articles, {
    query: initialQuery,
    category: initialCategory,
    page: initialPage,
  });

  return (
    <div className={`${siteContainerClassName} article-browser`}>
      <ArticleFilters
        query={query}
        category={category}
        categories={categories}
        resultCount={filtered.length}
        isFiltered={isFiltered}
        onSearch={search}
        onSelectCategory={selectCategory}
        onReset={reset}
      />
      <ArticleResults articles={visible} onReset={reset} />
      <ArticlePagination
        page={page}
        pages={pages}
        query={query}
        category={category}
        onGoToPage={goToPage}
      />
    </div>
  );
}
