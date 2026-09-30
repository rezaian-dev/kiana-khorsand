import Link from "next/link";
import { SearchForm } from "./search-form";
import { buildHref, type CatalogQuery } from "@/lib/catalog";
import { routes, sortOrders, topics } from "@/lib/constants";

type Props = { path: typeof routes.articles | typeof routes.courses; query: CatalogQuery; categories: readonly (keyof typeof topics)[] };

export function CatalogFilters({ path, query, categories }: Props) {
  return <div className="catalog-filters"><SearchForm key={buildHref(path, query)} path={path} query={query} /><div className="filter-options"><nav aria-label="فیلتر موضوع"><p className="filter-label">موضوع</p><div className="filter-links"><Link href={buildHref(path, { ...query, category: "all", page: 1 })} prefetch={false} scroll={false} aria-current={query.category === "all" ? "true" : undefined}>همهٔ موضوع‌ها</Link>{categories.map((category) => <Link key={category} href={buildHref(path, { ...query, category, page: 1 })} prefetch={false} scroll={false} aria-current={query.category === category ? "true" : undefined}>{topics[category]}</Link>)}</div></nav><nav aria-label="مرتب‌سازی"><p className="filter-label">ترتیب نمایش</p><div className="sort-links">{(Object.keys(sortOrders) as (keyof typeof sortOrders)[]).map((sort) => <Link key={sort} href={buildHref(path, { ...query, sort, page: 1 })} prefetch={false} scroll={false} aria-current={query.sort === sort ? "true" : undefined}>{sortOrders[sort]}</Link>)}</div></nav></div></div>;
}
