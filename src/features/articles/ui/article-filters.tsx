"use client";

import { LayoutGroup, m } from "motion/react";
import { RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motionTiming } from "@/lib/motion-tokens";

const pill =
  "relative isolate inline-flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-[.85rem] font-extrabold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#08665d]";
const pillIdle =
  "border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:border-[#8fc3bc] hover:text-[#08665d] dark:hover:text-[#8de6d8]";
const pillActive = "border-transparent bg-transparent text-white";

export function ArticleFilters({
  query,
  category,
  categories,
  resultCount,
  isFiltered,
  onSearch,
  onSelectCategory,
  onReset,
}: {
  query: string;
  category: string;
  categories: string[];
  resultCount: number;
  isFiltered: boolean;
  onSearch: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onReset: () => void;
}) {
  const options = [
    { value: "", label: "همهٔ موضوع‌ها" },
    ...categories.map((value) => ({ value, label: value })),
  ];

  return (
    <section
      role="search"
      aria-label="جست‌وجو و فیلتر مقاله‌ها"
      className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-[clamp(1rem,3vw,2rem)] shadow-[var(--shadow-soft)]"
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
          {new Intl.NumberFormat("fa-IR").format(resultCount)} مقاله
        </p>
      </div>

      <label
        htmlFor="article-q"
        className="group flex min-h-12 items-center gap-[.6rem] rounded-[16px] border border-[var(--line)] bg-[var(--bg)] px-[.85rem] text-[var(--muted)] transition-[border-color,background-color,box-shadow] duration-200 focus-within:border-[var(--c-teal)] focus-within:bg-[var(--surface)] focus-within:[box-shadow:0_0_0_3px_color-mix(in_srgb,var(--c-teal)_14%,transparent)]"
      >
        <Search
          size={19}
          aria-hidden="true"
          className="shrink-0 transition-colors group-focus-within:text-[var(--c-teal)]"
        />
        <span className="sr-only">جست‌وجوی مقاله</span>
        <input
          id="article-q"
          type="search"
          name="q"
          value={query}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="عنوان یا موضوع مقاله را جست‌وجو کنید..."
          maxLength={100}
          autoComplete="off"
          className="h-[46px] min-w-0 flex-1 border-0 bg-transparent text-[var(--fg)] outline-none placeholder:text-[var(--muted)]"
        />
      </label>

      <LayoutGroup id="article-categories">
        <div
          role="group"
          aria-label="دسته‌بندی مقاله‌ها"
          className="mt-[1.1rem] flex flex-wrap items-center gap-2"
        >
          {options.map((option) => {
            const active = category === option.value;
            return (
              <m.button
                key={option.value || "all"}
                type="button"
                aria-pressed={active}
                onClick={() => onSelectCategory(option.value)}
                whileHover={active ? undefined : { y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={motionTiming.hover}
                className={cn(pill, active ? pillActive : pillIdle)}
              >
                {active && (
                  <m.span
                    layoutId="article-category-indicator"
                    aria-hidden="true"
                    className="absolute inset-0 -z-1 rounded-full bg-[#08665d]"
                    transition={motionTiming.indicator}
                  />
                )}
                <span className="relative">{option.label}</span>
              </m.button>
            );
          })}
        </div>
      </LayoutGroup>

      <div className="mt-[1.2rem] flex flex-wrap items-center justify-between gap-x-[1.2rem] gap-y-[.8rem] border-t border-[var(--line)] pt-[1.15rem]">
        <p className="inline-flex items-center gap-[.65rem] text-[.83rem] leading-[1.8] text-[var(--muted)]">
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-[#2b9185] shadow-[0_0_0_4px_color-mix(in_srgb,#2b9185_14%,transparent)]"
          />
          {isFiltered
            ? "فیلترهای انتخابی اعمال شده‌اند؛ برای شروع دوباره پاکشان کنید."
            : "موضوعی انتخاب کنید یا میان نوشته‌ها جست‌وجو کنید."}
        </p>
        {isFiltered && (
          <m.button
            type="button"
            onClick={onReset}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={motionTiming.hover}
            className="inline-flex min-h-11 items-center gap-[.65rem] rounded-[13px] border border-[color:color-mix(in_srgb,#2d7e78_35%,var(--line))] bg-[color:color-mix(in_srgb,#3d9188_6%,var(--surface))] py-[.3rem] ps-3 pe-[1.05rem] text-[.85rem] font-extrabold text-[var(--fg)] hover:border-[#248178] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2d8980] max-[480px]:w-full max-[480px]:justify-center"
          >
            <span className="grid size-[29px] shrink-0 place-items-center rounded-[9px] bg-[#dff2ec] text-[#166b65] dark:bg-[#284b4e] dark:text-[#c5f1e7]">
              <RotateCcw size={17} aria-hidden="true" />
            </span>
            پاک‌کردن فیلتر
          </m.button>
        )}
      </div>
    </section>
  );
}
