import {
  siteContainerClassName,
  siteHeadingClassName,
} from "@/components/shared/site-styles";
import { ScrollReveal } from "@/components/motion/reveal";
import { publicMetadata } from "@/lib/public-metadata";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchText } from "@/lib/list-search";
import type { QueryPageProps } from "@/types/routes";
import { listFaqs } from "@/features/faqs/queries";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import {
  SearchEmpty,
  SearchInput,
  SearchPanel,
} from "@/components/shared/search-panel";
import { Intro } from "@/components/shared/intro";
import { labels } from "@/lib/labels";

const baseMetadata = {
  title: labels.faq,
  description:
    "پاسخ پرسش‌های رایج درباره جلسات مشاوره، زمان‌بندی، هزینه و حریم خصوصی.",
};
export const revalidate = 86400;
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
        <SearchPanel
          id="faq-q"
          icon={<Search size={20} aria-hidden="true" />}
          label="پرسش خود را جست‌وجو کنید"
          hint="پاسخ‌های رایج را سریع‌تر پیدا کنید."
          field={
            <SearchInput
              id="faq-q"
              placeholder="مثلاً تعرفه یا زمان جلسه..."
              defaultValue={q}
            />
          }
          submitLabel="جست‌وجو"
          clearHref="/faq"
          clearLabel="پاک‌کردن جست‌وجو"
          clearable={Boolean(q)}
          className="mt-0 mb-[clamp(2rem,4vw,3.25rem)]"
        />
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
                    className={`${siteHeadingClassName} mb-[1.15rem]! max-w-none! border-s-[3px] border-(--c-teal) ps-[.9rem] text-[clamp(1.35rem,2.25vw,1.85rem)]! leading-[1.55]! text-balance`}
                  >
                    {group.title}
                  </h2>
                  <FaqAccordion items={group.questions} />
                </ScrollReveal>
              ))}
            </div>
            <aside className="faq-sidebar sticky top-[6.4rem] min-w-0 max-[900px]:static">
              <div className="faq-sidebar-inner overflow-hidden rounded-[20px] border border-(--site-line) bg-(--site-surface) p-[1.15rem] shadow-(--shadow-soft)">
                <nav
                  className="faq-topic-nav max-[900px]:hidden"
                  aria-label="موضوع‌های پرسش‌ها"
                >
                  <p className="font-[850] text-(--site-ink)">موضوع‌ها</p>
                  <ul className="mt-[.8rem] grid list-none gap-[.15rem] p-0">
                    {visibleGroups.map((group) => (
                      <li key={group.slug}>
                        <a
                          href={`#faq-${group.slug}`}
                          className="block min-h-[42px] rounded-[10px] px-[.75rem] py-[.6rem] text-[.91rem] leading-[1.65] text-(--site-muted) no-underline hover:bg-[color-mix(in_srgb,var(--c-teal)_9%,var(--site-surface))] hover:text-(--site-ink) focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-(--c-teal)"
                        >
                          {group.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="faq-contact-prompt mt-[1.2rem] grid gap-[.65rem] border-t border-(--site-line) pt-[1.15rem] max-[900px]:mt-0 max-[900px]:border-0 max-[900px]:pt-0">
                  <p className="font-[850] text-(--site-ink)">
                    پاسخ پرسشت را پیدا نکردی؟
                  </p>
                  <span className="text-[.86rem] leading-[1.8] text-(--site-muted)">
                    می‌توانی سؤال خودت را برای ما بفرستی.
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-[11px] bg-[color-mix(in_srgb,var(--c-teal)_11%,var(--site-surface))] px-4 py-[.55rem] font-extrabold text-(--site-ink) no-underline hover:bg-[color-mix(in_srgb,var(--c-teal)_20%,var(--site-surface))] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-(--c-teal)"
                  >
                    ارسال پرسش
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
        {!visibleGroups.length && (
          <SearchEmpty
            title="پاسخی با این عبارت پیدا نشد"
            body="عبارت دیگری امتحان کنید یا همهٔ پرسش‌ها را ببینید."
            href="/faq"
            linkLabel="نمایش همهٔ پرسش‌ها"
          />
        )}
      </div>
    </>
  );
}
