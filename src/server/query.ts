import "server-only";
import { normalizeSearch, type CatalogQuery } from "../lib/catalog.ts";

export function escapeSearch(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildFilter(query: CatalogQuery) {
  const terms = normalizeSearch(query.q).split(" ").filter(Boolean);
  return {
    ...(query.category === "all" ? {} : { category: query.category }),
    ...(terms.length ? { $and: terms.map((term) => ({ search: { $regex: escapeSearch(term) } })) } : {}),
  };
}
