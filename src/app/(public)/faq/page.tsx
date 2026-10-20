import {
  siteContainerClassName,
  siteHeadingClassName,
} from "@/components/shared/public-layout-classes";
import { ScrollReveal } from "@/components/layout/page-reveal";
import { publicMetadata } from "@/lib/public-metadata";
import Link from "next/link";
import { RotateCcw, Search } from "lucide-react";
import { searchText } from "@/lib/list-search";
import type { QueryPageProps } from "@/types/routes";
import { listFaqs } from "@/features/faqs/queries";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Intro } from "@/components/shared/intro";
import { labels } from "@/lib/labels";

const baseMetadata = {
  title: labels.faq,
  description:
    "پاسخ پرسش‌های رایج درباره جلسات مشاوره، زمان‌بندی، هزینه و حریم خصوصی.",
};
export async function generateMetadata({ searchParams }: QueryPageProps) {
  const params = await searchParams;
  return publicMetadata({
    ...baseMetadata,
    path: "/faq",
    image: "/assets/images/intro-path.jpg",
    canonical: !params.q,
    index: !params.q,
  });
}

export default async function Page({ searchParams }: QueryPageProps) {
  const q = searchText((await searchParams).q);
  const groups = await listFaqs();
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      questions: group.questions.filter(
        (item) => !q || `${item.question} ${item.answer}`.includes(q),
      ),
    }))
    .filter((group) => group.questions.length);
  return (
    <>
      <Intro
        story="journal"
        title={labels.faq}
        description={groups[0]?.questions[0]?.answer}
      />
      <div className={`${siteContainerClassName} site-section faq-page`}>
        <form
          method="get"
          role="search"
          className="public-search-panel mt-0 mb-[clamp(2rem,4vw,3.25rem)] grid items-stretch gap-[1.15rem] rounded-[23px] border border-[color:color-mix(in_srgb,#569b96_15%,var(--site-line))] bg-[var(--site-surface)] [background-image:radial-gradient(circle_at_96%_8%,color-mix(in_srgb,#67ad9b_8%,transparent),transparent_36%)] p-[clamp(1.05rem,2.7vw,1.8rem)] shadow-[0_18px_42px_-34px_#1b566250]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-[color:color-mix(in_srgb,#318b85_13%,var(--site-surface))] text-[#257b78] dark:text-[#a6e4d7]">
              <Search size={20} aria-hidden="true" />
            </span>
            <div className="grid min-w-0 gap-[.15rem]">
              <label className="text-[1.06rem] font-[850]" htmlFor="faq-q">
                پرسش خود را جست‌وجو کنید
              </label>
              <small className="text-[.8rem] leading-[1.7] text-[var(--site-muted)]">
                پاسخ‌های رایج را سریع‌تر پیدا کنید.
              </small>
            </div>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-[.65rem] max-[620px]:grid max-[620px]:grid-cols-[minmax(0,1fr)]">
            <input
              className="min-h-[50px] w-auto min-w-0 flex-[1_1_250px] rounded-xl border border-[color:color-mix(in_srgb,#4e8d8d_18%,var(--site-line))] bg-[var(--site-surface)] px-[.9rem] text-[var(--site-ink)] shadow-[0_5px_18px_-16px_#24434a75] placeholder:text-[var(--site-muted)] placeholder:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)] max-[620px]:w-full"
              id="faq-q"
              type="search"
              name="q"
              maxLength={100}
              placeholder="مثلاً تعرفه یا زمان جلسه..."
              defaultValue={q}
            />
            <button
              type="submit"
              className="site-button min-h-[50px] shrink-0 max-[620px]:w-full"
            >
              جست‌وجو
            </button>
            {q && (
              <Link
                href="/faq"
                className="inline-flex min-h-[46px] items-center justify-center gap-[.35rem] rounded-[10px] px-[.6rem] py-[.4rem] text-[.83rem] font-extrabold text-[#22746e] no-underline hover:bg-[color:color-mix(in_srgb,#3d9486_10%,var(--site-surface))] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#22746e] max-[620px]:justify-self-start dark:text-[#a4e5d7]"
              >
                <RotateCcw size={16} aria-hidden="true" /> پاک‌کردن جست‌وجو
              </Link>
            )}
          </div>
        </form>
        {visibleGroups.length > 0 && (
          <div className="faq-layout grid grid-cols-[minmax(0,1fr)_minmax(225px,260px)] items-start gap-[clamp(1.5rem,4vw,3rem)] max-[900px]:grid-cols-[minmax(0,1fr)]">
            <div className="faq-list min-w-0">
              {visibleGroups.map((group) => (
                <ScrollReveal
                  as="section"
                  id={`faq-${group.slug}`}
                  className="site-faq-group mt-[clamp(2.3rem,5vw,3.5rem)]! scroll-mt-24 first:mt-0! max-[600px]:mt-[2.4rem]! max-[600px]:first:mt-0!"

                  key={group.slug}
                >
                  <h2
                    className={`${siteHeadingClassName} mb-[1.15rem]! max-w-none! border-s-[3px] border-[var(--c-teal)] ps-[.9rem] text-[clamp(1.35rem,2.25vw,1.85rem)]! leading-[1.55]! text-balance`}
                  >
                    {group.title}
                  </h2>
                  <FaqAccordion items={group.questions} />
                </ScrollReveal>
              ))}
            </div>
            <aside className="faq-sidebar sticky top-[6.4rem] min-w-0 max-[900px]:static">
              <div className="faq-sidebar-inner overflow-hidden rounded-[20px] border border-[var(--site-line)] bg-[var(--site-surface)] p-[1.15rem] shadow-[var(--shadow-soft)]">
                <nav
                  className="faq-topic-nav max-[900px]:hidden"
                  aria-label="موضوع‌های پرسش‌ها"
                >
                  <p className="font-[850] text-[var(--site-ink)]">موضوع‌ها</p>
                  <ul className="mt-[.8rem] grid list-none gap-[.15rem] p-0">
                    {visibleGroups.map((group) => (
                      <li key={group.slug}>
                        <a
                          href={`#faq-${group.slug}`}
                          className="block min-h-[42px] rounded-[10px] px-[.75rem] py-[.6rem] text-[.91rem] leading-[1.65] text-[var(--site-muted)] no-underline hover:bg-[color:color-mix(in_srgb,var(--c-teal)_9%,var(--site-surface))] hover:text-[var(--site-ink)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--c-teal)]"
                        >
                          {group.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="faq-contact-prompt mt-[1.2rem] grid gap-[.65rem] border-t border-[var(--site-line)] pt-[1.15rem] max-[900px]:mt-0 max-[900px]:border-0 max-[900px]:pt-0">
                  <p className="font-[850] text-[var(--site-ink)]">
                    پاسخ پرسشت را پیدا نکردی؟
                  </p>
                  <span className="text-[.86rem] leading-[1.8] text-[var(--site-muted)]">
                    می‌توانی سؤال خودت را برای ما بفرستی.
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-[11px] bg-[color:color-mix(in_srgb,var(--c-teal)_11%,var(--site-surface))] px-4 py-[.55rem] font-extrabold text-[var(--site-ink)] no-underline hover:bg-[color:color-mix(in_srgb,var(--c-teal)_20%,var(--site-surface))] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--c-teal)]"
                  >
                    ارسال پرسش
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
        {!visibleGroups.length && (
          <div
            className="public-search-empty mt-[clamp(1.5rem,3vw,2.5rem)] mb-16 grid justify-items-start gap-2 rounded-[21px] border border-dashed border-[var(--site-line)] bg-[var(--site-surface)] p-[clamp(1.3rem,3vw,2.1rem)] leading-[1.8] text-[var(--site-muted)]"
            role="status"
          >
            <Search size={24} className="text-[#267f78]" aria-hidden="true" />
            <h2 className="text-[1.15rem] font-[850] text-[var(--site-ink)]">
              پاسخی با این عبارت پیدا نشد
            </h2>
            <p>عبارت دیگری امتحان کنید یا همهٔ پرسش‌ها را ببینید.</p>
            <Link
              href="/faq"
              className="font-extrabold text-[#267f78] underline underline-offset-[3px] dark:text-[#a4e5d7]"
            >
              نمایش همهٔ پرسش‌ها
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
