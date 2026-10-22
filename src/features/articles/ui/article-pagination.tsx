"use client";

import type { MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationAnchor } from "@/components/shared/pagination-link-motion";
import {
  pageNavClass,
  pageNavDisabledClass,
  pageNavEllipsisClass,
  pageNavEntryClass,
  pageNavItemClass,
  pageNavLabelClass,
  pageNavLinksClass,
} from "@/components/shared/pagination-styles";
import { articleListUrl } from "../search";

const fa = new Intl.NumberFormat("fa-IR");

/** Page numbers to draw: first, last, and the neighbourhood of the current page. */
function pageWindow(page: number, pages: number) {
  return [...new Set([1, pages, page - 1, page, page + 1])]
    .filter((value) => value >= 1 && value <= pages)
    .sort((a, b) => a - b);
}

export function ArticlePagination({
  page,
  pages,
  query,
  category,
  onGoToPage,
}: {
  page: number;
  pages: number;
  query: string;
  category: string;
  onGoToPage: (page: number) => void;
}) {
  if (pages <= 1) return null;

  const href = (target: number) => articleListUrl(query, category, target);
  const handle = (target: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    // Keep modified clicks (new tab, download…) behaving like real links.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === page
    )
      return;
    event.preventDefault();
    onGoToPage(target);
    document
      .getElementById("articles-results")
      ?.scrollIntoView({ block: "start" });
  };

  return (
    <nav className={pageNavClass} aria-label="صفحه‌بندی مقاله‌ها">
      <p aria-live="polite" className={pageNavLabelClass}>
        صفحهٔ {fa.format(page)} از {fa.format(pages)}
      </p>
      <div className={pageNavLinksClass}>
        {page > 1 ? (
          <PaginationAnchor
            href={href(page - 1)}
            className={pageNavItemClass}
            aria-label="صفحهٔ قبلی مقاله‌ها"
            onClick={handle(page - 1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </PaginationAnchor>
        ) : (
          <span className={pageNavDisabledClass} aria-hidden="true">
            <ChevronRight size={18} />
          </span>
        )}

        {pageWindow(page, pages).map((number, index, all) => (
          <span className={pageNavEntryClass} key={number}>
            {index > 0 && number > all[index - 1] + 1 && (
              <span className={pageNavEllipsisClass} aria-hidden="true">
                …
              </span>
            )}
            <PaginationAnchor
              href={href(number)}
              className={pageNavItemClass}
              onClick={handle(number)}
              aria-label={`صفحهٔ ${fa.format(number)} مقاله‌ها`}
              aria-current={number === page ? "page" : undefined}
            >
              {fa.format(number)}
            </PaginationAnchor>
          </span>
        ))}

        {page < pages ? (
          <PaginationAnchor
            href={href(page + 1)}
            className={pageNavItemClass}
            aria-label="صفحهٔ بعدی مقاله‌ها"
            onClick={handle(page + 1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </PaginationAnchor>
        ) : (
          <span className={pageNavDisabledClass} aria-hidden="true">
            <ChevronLeft size={18} />
          </span>
        )}
      </div>
    </nav>
  );
}
