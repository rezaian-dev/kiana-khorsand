/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  siteContainerClassName,
  siteGridClassName,
} from "@/components/shared/public-layout-classes";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { motionTiming, tilePresence } from "@/lib/motion-tokens";
import { ContentCard } from "@/components/shared/card";
import { PaginationAnchor } from "@/components/shared/pagination-link-motion";
import {
  pageNavClass,
  pageNavLabelClass,
  pageNavLinksClass,
  pageNavEntryClass,
  pageNavItemClass,
  pageNavDisabledClass,
  pageNavEllipsisClass,
} from "@/components/shared/pagination-styles";
import type { ArticleVisual } from "@/features/articles/article-visual";
import { ARTICLE_PAGE_SIZE, articleListUrl } from "@/features/articles/search";

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  visual: ArticleVisual;
  cover: string | null;
};
export function ArticleBrowser({
  articles,
  initialQuery,
  initialCategory,
  initialPage,
}: {
  articles: Article[];
  initialQuery: string;
  initialCategory: string;
  initialPage: number;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();
  const reduce = useReducedMotion();
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const categories = [...new Set(articles.map((item) => item.category))];
  const normalized = query.trim().toLocaleLowerCase("fa-IR");
  const filtered = articles.filter(
    (item) =>
      (!category || item.category === category) &&
      (!normalized ||
        `${item.title} ${item.excerpt} ${item.category} ${item.tags.join(" ")}`
          .toLocaleLowerCase("fa-IR")
          .includes(normalized)),
  );
  const pages = Math.max(1, Math.ceil(filtered.length / ARTICLE_PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const visible = filtered.slice(
    (current - 1) * ARTICLE_PAGE_SIZE,
    current * ARTICLE_PAGE_SIZE,
  );
  const pageNumbers = [
    ...new Set([1, pages, current - 1, current, current + 1]),
  ]
    .filter((value) => value >= 1 && value <= pages)
    .sort((a, b) => a - b);

  useEffect(() => {
    const restore = () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
      const params = new URLSearchParams(window.location.search);
      const rawPage = params.get("page") || "1";
      setQuery(params.get("q") || "");
      setCategory(params.get("category") || "");
      setPage(/^[1-9]\d{0,4}$/.test(rawPage) ? Number(rawPage) : 1);
    };
    window.addEventListener("popstate", restore);
    return () => {
      window.removeEventListener("popstate", restore);
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  const urlFor = articleListUrl;
  function update(
    nextQuery: string,
    nextCategory: string,
    mode: "replace" | "push" = "replace",
  ) {
    setQuery(nextQuery);
    setCategory(nextCategory);
    setPage(1);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    const href = urlFor(nextQuery, nextCategory, 1);
    if (mode === "push") {
      // A filter is a meaningful history step; the URL changes immediately.
      window.history.pushState(null, "", href);
      router.refresh();
    } else {
      // Next integrates the native History API with useSearchParams. Debounce the
      // metadata refresh so every keystroke does not trigger a server request.
      window.history.replaceState(null, "", href);
      searchTimer.current = setTimeout(() => router.refresh(), 350);
    }
  }
  function goTo(event: MouseEvent<HTMLAnchorElement>, nextPage: number) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    if (current === nextPage) return;
    if (searchTimer.current) clearTimeout(searchTimer.current);
    setPage(nextPage);
    router.push(urlFor(query, category, nextPage), { scroll: false });
    document.getElementById("articles-results")?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }
  return (
    <div className={`${siteContainerClassName} article-browser`}>
      <section
        className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-[clamp(1rem,3vw,2rem)] shadow-[var(--shadow-soft)]"
        role="search"
        aria-label="جست‌وجو و فیلتر مقاله‌ها"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[.8rem] font-extrabold text-[#0b635b] dark:text-teal-300">
              مجلهٔ آرامش
            </p>
            <h2 className="text-[clamp(1.15rem,2vw,1.55rem)] font-extrabold text-[var(--fg)]">
              چه موضوعی را دنبال می‌کنید؟
            </h2>
          </div>
          <p className="text-[.85rem] text-[var(--muted)]" aria-live="polite">
            {new Intl.NumberFormat("fa-IR").format(filtered.length)} مقاله
          </p>
        </div>
        <label
          className="group flex min-h-12 items-center gap-[.6rem] rounded-[16px] border border-[var(--line)] bg-[var(--bg)] px-[.85rem] text-[var(--muted)] transition-[border-color,background-color,box-shadow] duration-200 ease-out focus-within:border-[var(--c-teal)] focus-within:bg-[var(--surface)] focus-within:[box-shadow:0_0_0_3px_color-mix(in_srgb,var(--c-teal)_14%,transparent),0_10px_22px_-14px_color-mix(in_srgb,var(--c-teal)_20%,transparent)] focus-within:[outline:none]!"
          htmlFor="article-q"
        >
          <Search
            size={19}
            aria-hidden="true"
            className="shrink-0 transition-colors duration-200 group-focus-within:text-[var(--c-teal)]"
          />
          <span className="sr-only">جست‌وجوی مقاله</span>
          <input
            className="h-[46px] min-w-0 flex-1 border-0 bg-transparent text-[var(--fg)] [box-shadow:none]! outline-none! placeholder:text-[var(--muted)] focus:ring-0! focus:outline-none! focus-visible:ring-0! focus-visible:[box-shadow:none]! focus-visible:outline-none!"
            id="article-q"
            type="search"
            maxLength={100}
            name="q"
            value={query}
            onChange={(e) => update(e.target.value, category)}
            placeholder="عنوان یا موضوع مقاله را جست‌وجو کنید..."
            autoComplete="off"
          />
        </label>
        <LayoutGroup id="article-categories">
          <div
            className="mt-[1.1rem] flex flex-wrap items-center gap-2"
            role="group"
            aria-label="دسته‌بندی مقاله‌ها"
          >
            {[
              { value: "", label: "همهٔ موضوع‌ها" },
              ...categories.map((value) => ({ value, label: value })),
            ].map((item) => (
              <Button
                key={item.value}
                type="button"
                variant="outline"
                size="sm"
                className="relative isolate min-h-10 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 font-bold text-[var(--fg)] aria-pressed:border-[#08665d] aria-pressed:bg-transparent aria-pressed:text-white aria-pressed:hover:bg-transparent"
                aria-pressed={category === item.value}
                onClick={() => update(query, item.value, "push")}
              >
                {category === item.value && (
                  <motion.span
                    layoutId="article-category-indicator"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-full bg-[#08665d]"
                    transition={
                      reduce ? { duration: 0 } : motionTiming.indicator
                    }
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Button>
            ))}
          </div>
        </LayoutGroup>
        <div className="mt-[1.2rem] flex flex-wrap items-center justify-between gap-x-[1.2rem] gap-y-[.8rem] border-t border-[var(--line)] pt-[1.15rem]">
          <p className="inline-flex items-center gap-[.65rem] text-[.83rem] leading-[1.8] text-[var(--muted)]">
            <span
              className="size-2 shrink-0 rounded-full bg-[#2b9185] shadow-[0_0_0_4px_color-mix(in_srgb,#2b9185_14%,transparent)]"
              aria-hidden="true"
            />
            {query || category
              ? "فیلترهای انتخابی اعمال شده‌اند؛ برای شروع دوباره پاکشان کنید."
              : "موضوعی انتخاب کنید یا میان نوشته‌ها جست‌وجو کنید."}
          </p>
          {(query || category) && (
            <Button
              type="button"
              variant="outline"
              className="min-h-11 gap-[.65rem] rounded-[13px] border border-[color:color-mix(in_srgb,#2d7e78_35%,var(--line))] bg-[color:color-mix(in_srgb,#3d9188_6%,var(--surface))] py-[.3rem] ps-3 pe-[1.05rem] font-extrabold text-[var(--fg)] shadow-[0_8px_19px_-18px_#164a48] hover:-translate-y-0.5 hover:border-[#248178] hover:bg-[color:color-mix(in_srgb,#3d9188_13%,var(--surface))] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2d8980] motion-reduce:hover:translate-y-0 max-[480px]:w-full max-[480px]:justify-center"
              onClick={() => update("", "", "push")}
            >
              <span className="grid size-[29px] shrink-0 place-items-center rounded-[9px] bg-[#dff2ec] text-[#166b65] dark:bg-[#284b4e] dark:text-[#c5f1e7]">
                <RotateCcw size={17} aria-hidden="true" />
              </span>
              پاک‌کردن فیلتر
            </Button>
          )}
        </div>
      </section>
      <motion.div
        id="articles-results"
        className={`${siteGridClassName} article-results scroll-mt-[110px] items-stretch`}
        aria-live="polite"
        layout={reduce ? false : true}
        initial={false}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={item.slug}
              layout={reduce ? false : true}
              variants={{
                hidden: { opacity: 0, scale: 0.86, rotate: -3, y: 14 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: 0,
                  transition: reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32, mass: 0.9 },
                },
                exit: {
                  opacity: 0,
                  scale: 0.82,
                  rotate: 3,
                  y: -10,
                  transition: reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={reduce ? undefined : { y: -4, transition: { duration: 0.2 } }}
            >
              <ContentCard
                title={item.title}
                description={item.excerpt}
                href={`/articles/${item.slug}`}
                image={item.cover}
                tag={item.category}
                articleSlug={item.slug}
                articleVisual={item.visual}
                action="خواندن مقاله"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence initial={false}>
        {!filtered.length && (
          <motion.div
            key="empty-articles"
            className="px-4 pt-12 pb-20 text-center text-[var(--muted)]"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, y: -8 }
            }
            transition={reduce ? { duration: 0 } : motionTiming.standard}
          >
            <h2 className="text-xl font-extrabold text-[var(--fg)]">
              مقاله‌ای پیدا نشد
            </h2>
            <p>عبارت کوتاه‌تری بنویسید یا دسته‌بندی را تغییر دهید.</p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => update("", "")}
            >
              نمایش همهٔ مقاله‌ها
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {filtered.length > ARTICLE_PAGE_SIZE && (
        <nav className={pageNavClass} aria-label="صفحه‌بندی مقاله‌ها">
          <p aria-live="polite" className={pageNavLabelClass}>
            صفحهٔ {new Intl.NumberFormat("fa-IR").format(current)} از{" "}
            {new Intl.NumberFormat("fa-IR").format(pages)}
          </p>
          <div className={pageNavLinksClass}>
            {current > 1 ? (
              <PaginationAnchor
                className={pageNavItemClass}
                href={urlFor(query, category, current - 1)}
                aria-label="صفحهٔ قبلی مقاله‌ها"
                onClick={(event) => goTo(event, current - 1)}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </PaginationAnchor>
            ) : (
              <span className={pageNavDisabledClass} aria-hidden="true">
                <ChevronRight size={18} />
              </span>
            )}
            {pageNumbers.map((number, index) => (
              <span className={pageNavEntryClass} key={number}>
                {index > 0 && number > pageNumbers[index - 1] + 1 && (
                  <span className={pageNavEllipsisClass} aria-hidden="true">
                    …
                  </span>
                )}
                <PaginationAnchor
                  className={pageNavItemClass}
                  href={urlFor(query, category, number)}
                  onClick={(event) => goTo(event, number)}
                  aria-label={`صفحهٔ ${new Intl.NumberFormat("fa-IR").format(number)} مقاله‌ها`}
                  aria-current={current === number ? "page" : undefined}
                >
                  {new Intl.NumberFormat("fa-IR").format(number)}
                </PaginationAnchor>
              </span>
            ))}
            {current < pages ? (
              <PaginationAnchor
                className={pageNavItemClass}
                href={urlFor(query, category, current + 1)}
                aria-label="صفحهٔ بعدی مقاله‌ها"
                onClick={(event) => goTo(event, current + 1)}
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
      )}
    </div>
  );
}
