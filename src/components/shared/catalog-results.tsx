import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, SearchX } from "lucide-react";
import { buildHref, type CatalogQuery } from "@/lib/catalog";
import { formatNumber } from "@/lib/format";
import { topics } from "@/lib/constants";

type Props = { path: string; query: CatalogQuery; count: number; pageCount: number; hasError: boolean; children: ReactNode; label: string };

export function CatalogResults({ path, query, count, pageCount, hasError, children, label }: Props) {
  const hasFilters = !!query.q || query.category !== "all" || query.sort !== "featured" || query.page > 1;
  return <div className="catalog-results" id="results">
    {hasError && <p className="query-notice" role="status">پارامترهای نشانی معتبر نبودند؛ فیلترها به حالت اولیه برگشتند.</p>}
    <div className="results-heading"><div><h2>{label}</h2><p>{formatNumber(count)} مورد · {query.category === "all" ? "همهٔ موضوع‌ها" : topics[query.category]}</p></div>{hasFilters && <Link href={path} prefetch={false} scroll={false} className="quiet-link">پاک‌کردن فیلترها</Link>}</div>
    {count ? children : <div className="catalog-empty" role="status"><SearchX aria-hidden="true" /><h3>{hasFilters ? "موردی با این انتخاب پیدا نشد." : "هنوز محتوایی برای نمایش منتشر نشده است."}</h3><p>{hasFilters ? "عبارت کوتاه‌تری بنویسید یا فیلتر موضوع را بردارید." : "فقط محتوای تأییدشده پس از انتشار در این بخش قرار می‌گیرد."}</p><Link href={path} prefetch={false} scroll={false} className="quiet-link">دیدن همهٔ موارد<ArrowLeft aria-hidden="true" /></Link></div>}
    <nav aria-label="صفحه‌بندی" className="pagination"><span>صفحهٔ {formatNumber(query.page)} از {formatNumber(pageCount)}</span>{pageCount > 1 && <div>{query.page > 1 ? <Link href={`${buildHref(path, { ...query, page: query.page - 1 })}#results`} prefetch={false}><ArrowRight aria-hidden="true" />قبلی</Link> : <span aria-disabled="true"><ArrowRight aria-hidden="true" />قبلی</span>}{query.page < pageCount ? <Link href={`${buildHref(path, { ...query, page: query.page + 1 })}#results`} prefetch={false}>بعدی<ArrowLeft aria-hidden="true" /></Link> : <span aria-disabled="true">بعدی<ArrowLeft aria-hidden="true" /></span>}</div>}</nav>
  </div>;
}
