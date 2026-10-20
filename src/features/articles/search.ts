import type { ArticleSearchProps } from "@/types/routes";

export const ARTICLE_PAGE_SIZE = 6;

type SearchableArticle = {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
};
type RawSearch = Awaited<ArticleSearchProps["searchParams"]>;

// One URL grammar for SSR, canonical metadata and links in the client.
// Unfiltered paginated pages remain independently crawlable; search/facets do not.
export function articleListUrl(q = "", category = "", page = 1) {
  const params = new URLSearchParams();
  if (q.trim()) params.set("q", q.trim());
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  return `/articles${params.size ? `?${params.toString()}` : ""}`;
}

export function resolveArticleSearch(
  raw: RawSearch,
  articles: SearchableArticle[],
) {
  const { q: rawQuery, category: rawCategory, page: rawPage } = raw;
  if (
    (rawQuery !== undefined && typeof rawQuery !== "string") ||
    (rawCategory !== undefined && typeof rawCategory !== "string") ||
    (rawPage !== undefined &&
      (typeof rawPage !== "string" || !/^[1-9]\d{0,4}$/.test(rawPage)))
  )
    return { valid: false } as const;

  const q = (rawQuery ?? "").trim().slice(0, 100);
  const category = (rawCategory ?? "").trim();
  if (category && !articles.some((item) => item.category === category))
    return { valid: false } as const;

  const normalized = q.toLocaleLowerCase("fa-IR");
  const filtered = articles.filter(
    (item) =>
      (!category || item.category === category) &&
      (!normalized ||
        `${item.title} ${item.excerpt} ${item.category} ${item.tags.join(" ")}`
          .toLocaleLowerCase("fa-IR")
          .includes(normalized)),
  );
  const page = rawPage ? Number(rawPage) : 1;
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ARTICLE_PAGE_SIZE),
  );
  if (page > totalPages) return { valid: false } as const;

  const href = articleListUrl(q, category, page);
  return {
    valid: true,
    q,
    category,
    page,
    href,
    filtered: Boolean(q || category),
    // Unknown keys and redundant/unclean parameter values do not create new URLs.
    redirect:
      Object.keys(raw).some(
        (key) => !["q", "category", "page"].includes(key),
      ) ||
      (rawQuery !== undefined && rawQuery !== q) ||
      (rawCategory !== undefined && rawCategory !== category) ||
      rawPage === "1" ||
      rawQuery === "" ||
      rawCategory === "",
  } as const;
}
