"use client";

import { AnimatePresence, m } from "motion/react";
import { ContentCard } from "@/components/shared/card";
import { siteGridClassName } from "@/components/shared/public-layout-classes";
import {
  hoverLift,
  listItem,
  listStagger,
  motionTiming,
} from "@/lib/motion-tokens";
import type { ArticleSummary } from "../types";

/**
 * The grid only animates keys that survive a filter: shared cards glide to their new
 * slot, removed cards fade in place (`popLayout`), so the section keeps its height
 * rhythm instead of collapsing while the user is reading.
 */
export function ArticleResults({
  articles,
  onReset,
}: {
  articles: ArticleSummary[];
  onReset: () => void;
}) {
  return (
    <>
      <m.div
        id="articles-results"
        className={`${siteGridClassName} article-results scroll-mt-[110px] items-stretch`}
        aria-live="polite"
        layout
        initial="hidden"
        animate="visible"
        variants={listStagger}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {articles.map((article) => (
            <m.div
              key={article.slug}
              layout
              variants={listItem}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={hoverLift}
              transition={motionTiming.tile}
            >
              <ContentCard
                title={article.title}
                description={article.excerpt}
                href={`/articles/${article.slug}`}
                image={article.cover}
                tag={article.category}
                articleSlug={article.slug}
                articleVisual={article.visual}
                action="خواندن مقاله"
              />
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>

      <AnimatePresence initial={false}>
        {articles.length === 0 && (
          <m.div
            key="empty-articles"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={motionTiming.standard}
            className="px-4 pt-12 pb-20 text-center text-[var(--muted)]"
          >
            <h2 className="text-xl font-extrabold text-[var(--fg)]">
              مقاله‌ای پیدا نشد
            </h2>
            <p>عبارت کوتاه‌تری بنویسید یا دسته‌بندی را تغییر دهید.</p>
            <button
              type="button"
              onClick={onReset}
              className="mt-4 min-h-11 cursor-pointer rounded-[13px] border border-[var(--line)] bg-[var(--surface)] px-5 text-[.9rem] font-extrabold text-[var(--fg)] transition-colors hover:border-[#248178] hover:text-[#08665d]"
            >
              نمایش همهٔ مقاله‌ها
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
