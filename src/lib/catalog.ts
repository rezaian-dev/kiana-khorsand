import { z } from "zod";
import { sortOrders, topics } from "./constants.ts";

export type SearchParams = Record<string, string | string[] | undefined>;
const topicKeys = Object.keys(topics) as (keyof typeof topics)[];
const sortKeys = Object.keys(sortOrders) as (keyof typeof sortOrders)[];

export const searchSchema = z.object({ q: z.string().trim().max(80, "حداکثر ۸۰ نویسه بنویسید.") });
export const catalogSchema = searchSchema.extend({
  category: z.enum(["all", ...topicKeys]),
  sort: z.enum(sortKeys),
  page: z.coerce.number().int().min(1).max(1000),
});
export type Search = z.infer<typeof searchSchema>;
export type CatalogQuery = z.infer<typeof catalogSchema>;
const initialQuery: CatalogQuery = { q: "", category: "all", sort: "featured", page: 1 };

export function parseCatalog(params: SearchParams) {
  const result = catalogSchema.safeParse({ q: params.q ?? "", category: params.category ?? "all", sort: params.sort ?? "featured", page: params.page ?? 1 });
  return { query: result.success ? result.data : initialQuery, hasError: !result.success };
}

export function buildHref(path: string, query: CatalogQuery) {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category !== "all") params.set("category", query.category);
  if (query.sort !== "featured") params.set("sort", query.sort);
  if (query.page > 1) params.set("page", String(query.page));
  const suffix = params.toString();
  return suffix ? `${path}?${suffix}` : path;
}

export function normalizeSearch(value: string) {
  return value.normalize("NFKC").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u064b-\u065f\u0670]/g, "").replace(/\u200c/g, " ").replace(/\s+/g, " ").trim().toLocaleLowerCase("fa-IR");
}

export function selectCatalog<T extends { title: string; description: string; category: keyof typeof topics; slug: string }>(entries: readonly T[], query: CatalogQuery) {
  const terms = normalizeSearch(query.q).split(" ").filter(Boolean);
  const matches = entries.filter((entry) => {
    const text = normalizeSearch(`${entry.title} ${entry.description} ${topics[entry.category]}`);
    return (query.category === "all" || query.category === entry.category) && terms.every((term) => text.includes(term));
  });
  if (query.sort === "title") {
    const collator = new Intl.Collator("fa-IR");
    matches.sort((a, b) => collator.compare(a.title, b.title) || a.slug.localeCompare(b.slug, "en"));
  }
  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  const page = Math.min(query.page, pageCount);
  return { entries: matches.slice((page - 1) * pageSize, page * pageSize), count: matches.length, pageCount, query: { ...query, page } };
}
