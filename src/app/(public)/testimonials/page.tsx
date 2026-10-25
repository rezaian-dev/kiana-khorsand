import { formatNumber } from "@/lib/format";
import {
  siteContainerClassName,
  siteGridClassName,
} from "@/components/shared/site-styles";
import { ScrollReveal } from "@/components/motion/reveal";
import { pageNumber } from "@/lib/list-search";
import type { CategorySearchProps } from "@/types/routes";
import { ListFilter } from "lucide-react";
import { permanentRedirect } from "next/navigation";
import { PanelSelect } from "@/components/panels/panel-select";
import { SearchPanel } from "@/components/shared/search-panel";
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
        ? `${labels.testimonials} — صفحهٔ ${formatNumber(current)}`
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
        <SearchPanel
          id="testimonial-category"
          icon={<ListFilter size={20} aria-hidden="true" />}
          label="دسته‌بندی روایت‌ها"
          hint="روایت‌ها را بر اساس موضوع مرور کنید."
          field={
            <PanelSelect
              id="testimonial-category"
              triggerClassName="min-h-[50px]! min-inline-0! w-auto! flex-[1_1_250px] rounded-xl! border-[color:color-mix(in_srgb,#4e8d8d_18%,var(--site-line))]! bg-[var(--site-surface)]! px-[.9rem]! text-[var(--site-ink)]! shadow-[0_5px_18px_-16px_#24434a75] max-[620px]:w-full!"
              name="category"
              defaultValue={selected || "all"}
              options={[
                { value: "all", label: "همهٔ روایت‌ها" },
                ...categories.map((value) => ({ value, label: value })),
              ]}
            />
          }
          submitLabel="نمایش"
          clearHref="/testimonials"
          clearLabel="نمایش همه"
          clearable={Boolean(selected)}
        />
        {visible.length ? (
          <section
            className="testimonial-list"
            aria-labelledby="testimonial-list-title"
          >
            <div className="testimonial-list-heading flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-[clamp(.6rem,2vw,1rem)]">
              <h2
                id="testimonial-list-title"
                className="text-[clamp(1.35rem,2.2vw,1.8rem)] leading-[1.55] font-[850] text-(--site-ink)"
              >
                روایت‌های همراهان
              </h2>
              <p className="rounded-full bg-[color-mix(in_srgb,var(--c-teal)_8%,var(--site-surface))] px-3 py-[.4rem] text-[.82rem] font-[750] text-(--site-ink)">
                {formatNumber(filtered.length)} روایت
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
          <p className="site-empty py-16 text-(--site-muted)">
            {labels.unavailable}
          </p>
        )}
        {pages > 1 && (
          <nav className={pageNavClass} aria-label="صفحه‌بندی روایت‌ها">
            <p className={pageNavLabelClass}>
              صفحهٔ {formatNumber(current)} از {formatNumber(pages)}
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
                    aria-label={`صفحهٔ ${formatNumber(number)}`}
                    aria-current={number === current ? "page" : undefined}
                  >
                    {formatNumber(number)}
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
