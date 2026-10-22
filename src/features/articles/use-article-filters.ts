"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ARTICLE_PAGE_SIZE, articleListUrl } from "./search";
import type { ArticleSummary } from "./types";

type Filters = {
  query: string;
  category: string;
  page: number;
};

/**
 * Article list state, kept entirely in the browser.
 *
 * The URL is the shareable/bookmarkable mirror of this state — it is written with the
 * native History API, never with a router navigation. That matters twice over:
 * filtering never re-renders the server tree, so the page keeps its scroll position,
 * and a filter click costs no network round trip.
 */
export function useArticleFilters(
  articles: ArticleSummary[],
  initial: Filters,
) {
  const [filters, setFilters] = useState(initial);

  // Back/forward must restore whatever the address bar says.
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get("page") ?? "1";
      setFilters({
        query: params.get("q") ?? "",
        category: params.get("category") ?? "",
        page: /^[1-9]\d{0,4}$/.test(page) ? Number(page) : 1,
      });
    };
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  const categories = useMemo(
    () => [...new Set(articles.map((article) => article.category))],
    [articles],
  );

  const filtered = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase("fa-IR");
    return articles.filter((article) => {
      if (filters.category && article.category !== filters.category)
        return false;
      if (!query) return true;
      const haystack =
        `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(" ")}`.toLocaleLowerCase(
          "fa-IR",
        );
      return haystack.includes(query);
    });
  }, [articles, filters.query, filters.category]);

  const pages = Math.max(1, Math.ceil(filtered.length / ARTICLE_PAGE_SIZE));
  const page = Math.min(Math.max(1, filters.page), pages);
  const visible = filtered.slice(
    (page - 1) * ARTICLE_PAGE_SIZE,
    page * ARTICLE_PAGE_SIZE,
  );

  /** Mirrors `next` into the address bar without touching the router. */
  const apply = useCallback((next: Filters, mode: "push" | "replace") => {
    setFilters(next);
    const href = articleListUrl(next.query, next.category, next.page);
    window.history[mode === "push" ? "pushState" : "replaceState"](
      null,
      "",
      href,
    );
  }, []);

  return {
    ...filters,
    page,
    pages,
    categories,
    filtered,
    visible,
    isFiltered: Boolean(filters.query || filters.category),
    /** Typing must not spam the history stack; the newest keystroke wins. */
    search: (query: string) => apply({ ...filters, query, page: 1 }, "replace"),
    /** A category change is a real destination, so it becomes a history entry. */
    selectCategory: (category: string) =>
      apply({ ...filters, category, page: 1 }, "push"),
    goToPage: (nextPage: number) =>
      apply({ ...filters, page: nextPage }, "push"),
    reset: () => apply({ query: "", category: "", page: 1 }, "push"),
  };
}
