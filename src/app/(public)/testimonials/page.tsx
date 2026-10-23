import {
  siteContainerClassName,
  siteGridClassName,
} from "@/components/shared/site-styles";
import { ScrollReveal } from "@/components/motion/reveal";
import { pageNumber } from "@/lib/list-search";
import type { CategorySearchProps } from "@/types/routes";
import { ListFilter, RotateCcw } from "lucide-react";
import { permanentRedirect } from "next/navigation";
import { PanelSelect } from "@/components/panels/panel-select";
import Link from "next/link";
import { listTestimonials } from "@/features/testimonials/queries";
import { getSession } from "@/lib/session";
import { ReviewSubmission } from "@/features/community/ui/review-submission";
import { Intro } from "@/components/shared/intro";
import { SiteToaster } from "@/components/shared/site-toaster";
import { labels } from "@/lib/labels";
import { TestimonialCard } from "@/features/testimonials/ui/testimonial-card";
import { TestimonialStoryMotion } from "@/features/testimonials/ui/testimonial-card-motion";
import { MotionLink } from "@/components/motion/motion-link";
import { publicMetadata } from "@/lib/public-metadata";
import {
  pageNavClass,
  pageNavLabelClass,
  pageNavLinksClass,
  pageNavItemClass,
  pageNavDisabledClass,
} from "@/components/shared/pagination-styles";

const pageSize = 6;

export const revalidate = 3600;
export async function generateMetadata({ searchParams }: CategorySearchProps) {
  const { category, page } = await searchParams;
  const items = await listTestimonials();
  const selected =
    typeof category === "string" &&
    category.length <= 80 &&
    items.some((item) => item.category === category)
      ? category
      : "";
  const count = selected
    ? items.filter((item) => item.category === selected).length
    : items.length;
  const last = Math.max(1, Math.ceil(count / pageSize));
  const requested = pageNumber(page);
  const current = Math.min(requested, last);
  const invalidPage =
    requested > last ||
    (page !== undefined &&
      (typeof page !== "string" ||
        (page !== "1" && !/^[1-9]\d{0,4}$/.test(page))));
  const params = new URLSearchParams();
  if (selected) params.set("category", selected);
  if (current > 1) params.set("page", String(current));
  return publicMetadata({
    title:
      current > 1
        ? `${labels.testimonials} — صفحهٔ ${new Intl.NumberFormat("fa-IR").format(current)}`
        : labels.testimonials,
    description:
      "روایت همراهان از تجربه مسیر مشاوره؛ با توجه به حریم خصوصی و رضایت.",
    path: invalidPage
      ? "/testimonials"
      : `/testimonials${params.size ? `?${params}` : ""}`,
    image: "/assets/images/intro-journal.jpg",
    canonical: !category,
    index: !category && !invalidPage,
  });
}
export default async function Page({ searchParams }: CategorySearchProps) {
  const { category, page } = await searchParams;
  if (category === "all") permanentRedirect("/testimonials");
  const [items, session] = await Promise.all([
    listTestimonials(),
    getSession(),
  ]);
  const categories = [...new Set(items.map((item) => item.category))];
  const selected =
    typeof category === "string" && categories.includes(category)
      ? category
      : "";
  const filtered = items.filter(
    (item) => !selected || item.category === selected,
  );
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(pageNumber(page), pages);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);
  const href = (number: number) => {
    const params = new URLSearchParams();
    if (selected) params.set("category", selected);
    if (number > 1) params.set("page", String(number));
    return `/testimonials${params.size ? `?${params}` : ""}`;
  };
  return (
    <>
      <SiteToaster />
      <Intro
        story="gather"
        title={labels.testimonials}
        description={items[0]?.quote}
      />
      <div className={siteContainerClassName}>
        <ReviewSubmission authenticated={Boolean(session)} />
        <form
          className="public-search-panel mt-[clamp(1.3rem,3vw,2.5rem)] grid items-stretch gap-[1.15rem] rounded-[23px] border border-[color:color-mix(in_srgb,#569b96_15%,var(--site-line))] bg-[var(--site-surface)] [background-image:radial-gradient(circle_at_96%_8%,color-mix(in_srgb,#67ad9b_8%,transparent),transparent_36%)] p-[clamp(1.05rem,2.7vw,1.8rem)] shadow-[0_18px_42px_-34px_#1b566250]"
          method="get"
          role="search"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-[color:color-mix(in_srgb,#318b85_13%,var(--site-surface))] text-[#257b78] dark:text-[#a6e4d7]">
              <ListFilter size={20} aria-hidden="true" />
            </span>
            <div className="grid min-w-0 gap-[.15rem]">
              <label
                className="text-[1.06rem] font-[850]"
                htmlFor="testimonial-category"
              >
                دسته‌بندی روایت‌ها
              </label>
              <small className="text-[.8rem] leading-[1.7] text-[var(--site-muted)]">
                روایت‌ها را بر اساس موضوع مرور کنید.
              </small>
            </div>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-[.65rem] max-[620px]:grid max-[620px]:grid-cols-[minmax(0,1fr)]">
            <PanelSelect
              id="testimonial-category"
              triggerClassName="min-h-[50px]! min-w-0! w-auto! flex-[1_1_250px] rounded-xl! border-[color:color-mix(in_srgb,#4e8d8d_18%,var(--site-line))]! bg-[var(--site-surface)]! px-[.9rem]! text-[var(--site-ink)]! shadow-[0_5px_18px_-16px_#24434a75] max-[620px]:w-full!"
              name="category"
              defaultValue={selected || "all"}
              options={[
                { value: "all", label: "همهٔ روایت‌ها" },
                ...categories.map((value) => ({ value, label: value })),
              ]}
            />
            <button
              type="submit"
              className="site-button min-h-[50px] shrink-0 max-[620px]:w-full"
            >
              نمایش
            </button>
            {selected && (
              <Link
                href="/testimonials"
                className="inline-flex min-h-[46px] items-center justify-center gap-[.35rem] rounded-[10px] px-[.6rem] py-[.4rem] text-[.83rem] font-extrabold text-[#22746e] no-underline hover:bg-[color:color-mix(in_srgb,#3d9486_10%,var(--site-surface))] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#22746e] max-[620px]:justify-self-start dark:text-[#a4e5d7]"
              >
                <RotateCcw size={16} aria-hidden="true" /> نمایش همه
              </Link>
            )}
          </div>
        </form>
        {visible.length ? (
          <section
            className="testimonial-list"
            aria-labelledby="testimonial-list-title"
          >
            <div className="testimonial-list-heading flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-[clamp(.6rem,2vw,1rem)]">
              <h2
                id="testimonial-list-title"
                className="text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.55] font-[850] text-[var(--site-ink)]"
              >
                روایت‌های همراهان
              </h2>
              <p className="rounded-full bg-[color:color-mix(in_srgb,var(--c-teal)_8%,var(--site-surface))] px-3 py-[.4rem] text-[.82rem] font-[750] text-[var(--site-ink)]">
                {new Intl.NumberFormat("fa-IR").format(filtered.length)} روایت
              </p>
            </div>
            <ScrollReveal
              className={`${siteGridClassName} testimonial-story-grid items-stretch pt-[1.3rem]! pb-[2.2rem]!`}
            >
              {visible.map((item) => (
                <TestimonialStoryMotion
                  key={item.slug}
                  className="testimonial-story-card h-full"
                >
                  <TestimonialCard item={item} />
                </TestimonialStoryMotion>
              ))}
            </ScrollReveal>
          </section>
        ) : (
          <p className="site-empty py-16 text-[var(--site-muted)]">
            {labels.unavailable}
          </p>
        )}
        {pages > 1 && (
          <nav className={pageNavClass} aria-label="صفحه‌بندی روایت‌ها">
            <p className={pageNavLabelClass}>
              صفحهٔ {new Intl.NumberFormat("fa-IR").format(current)} از{" "}
              {new Intl.NumberFormat("fa-IR").format(pages)}
            </p>
            <div className={pageNavLinksClass}>
              {current > 1 ? (
                <MotionLink
                  effect="lift"
                  href={href(current - 1)}
                  aria-label="صفحهٔ قبل"
                  className={pageNavItemClass}
                >
                  قبلی
                </MotionLink>
              ) : (
                <span className={pageNavDisabledClass} aria-hidden="true">
                  قبلی
                </span>
              )}
              {Array.from({ length: pages }, (_, index) => index + 1).map(
                (number) => (
                  <MotionLink
                    effect="lift"
                    key={number}
                    href={href(number)}
                    className={pageNavItemClass}
                    aria-label={`صفحهٔ ${new Intl.NumberFormat("fa-IR").format(number)}`}
                    aria-current={number === current ? "page" : undefined}
                  >
                    {new Intl.NumberFormat("fa-IR").format(number)}
                  </MotionLink>
                ),
              )}
              {current < pages ? (
                <MotionLink
                  effect="lift"
                  href={href(current + 1)}
                  aria-label="صفحهٔ بعد"
                  className={pageNavItemClass}
                >
                  بعدی
                </MotionLink>
              ) : (
                <span className={pageNavDisabledClass} aria-hidden="true">
                  بعدی
                </span>
              )}
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
