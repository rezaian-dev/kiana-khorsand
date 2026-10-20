import { siteContainerClassName } from "@/components/shared/public-layout-classes";
import { ScrollReveal } from "@/components/layout/page-reveal";
import { publicMetadata } from "@/lib/public-metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  HeartHandshake,
  MonitorPlay,
  UsersRound,
} from "lucide-react";
import { getPage } from "@/features/pages/queries";
import { listServices } from "@/features/services/queries";
import { Intro } from "@/components/shared/intro";
import { Section } from "@/components/shared/section";
import { formatNumber } from "@/lib/format";
import * as motion from "motion/react-client";
import { motionTiming } from "@/lib/motion-tokens";
import { labels } from "@/lib/labels";

export const revalidate = 86400;
export async function generateMetadata() {
  const page = await getPage("fees");
  return publicMetadata({
    title: page?.title || "تعرفه‌ها",
    description: page?.description || "آشنایی با خدمات و رویکرد مشاوره.",
    path: "/fees",
    image: "/assets/images/intro-fees.jpg",
  });
}

export default async function Page() {
  const [page, services] = await Promise.all([getPage("fees"), listServices()]);
  if (!page) notFound();
  return (
    <>
      <Intro
        story="fees"
        title={page.sections[0]?.title || page.title}
        description={page.description}
      />
      <section
        className="bg-[var(--site-canvas)] [background-image:radial-gradient(circle_at_5%_90%,color-mix(in_srgb,#65b1a7_8%,transparent),transparent_34%)] pt-[clamp(2.8rem,5vw,5rem)] pb-[clamp(4rem,6vw,6rem)]"
        aria-labelledby="fees-services-heading"
      >
        <div className={siteContainerClassName}>
          <div className="mb-[clamp(1.5rem,3vw,2.2rem)] flex flex-wrap items-end justify-between gap-x-8 gap-y-[.7rem]">
            <div>
              <span className="text-[.83rem] font-extrabold text-[#237c78] dark:text-[#8bdfd0]">
                خدمت مناسب شما
              </span>
              <h2
                className="mt-[.45rem] text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.55] font-black"
                id="fees-services-heading"
              >
                زمان و تعرفهٔ هر جلسه
              </h2>
            </div>
            <p className="max-w-[38ch] text-[.88rem] leading-[1.9] text-[var(--site-muted)]">
              مدت، شیوهٔ برگزاری و هزینهٔ هر خدمت را یک‌جا ببینید.
            </p>
          </div>
          <ScrollReveal className="grid auto-rows-fr grid-cols-[repeat(auto-fit,minmax(min(100%,252px),1fr))] items-stretch gap-[clamp(.8rem,1.6vw,1.2rem)]">
            {services.map((item, index) => {
              const group =
                item.name.includes("گروه") || item.name.includes("کارگاه");
              const Icon = group
                ? UsersRound
                : item.mode === "online"
                  ? MonitorPlay
                  : HeartHandshake;
              return (
                <motion.article
                  key={item.slug}
                  className={`fees-detail-card relative flex min-h-[385px] min-w-0 flex-col overflow-hidden rounded-3xl border border-[color:color-mix(in_srgb,var(--fee-accent)_18%,var(--site-line))] bg-[var(--site-surface)] p-[clamp(1.2rem,2vw,1.65rem)] shadow-[0_20px_45px_-35px_#1b566259] before:absolute before:inset-x-0 before:top-0 before:h-1 before:[background-image:linear-gradient(90deg,var(--fee-accent),color-mix(in_srgb,var(--fee-accent)_32%,#efb68d))] before:content-[''] hover:border-[color:color-mix(in_srgb,var(--fee-accent)_38%,var(--site-line))] hover:shadow-[0_26px_50px_-29px_color-mix(in_srgb,var(--fee-accent)_30%,#2a3a4e)] motion-reduce:transform-none! max-[620px]:min-h-0 ${index % 2 ? "[--fee-accent:#78629b]" : "[--fee-accent:#267f7a]"}`}
                  whileHover={{ y: -5 }}
                  transition={motionTiming.standard}
                  data-tone={index % 2 ? "violet" : "teal"}
                >
                  <div className="flex items-center justify-between gap-[.6rem]">
                    <span className="grid size-12 shrink-0 place-items-center rounded-[15px] bg-[color:color-mix(in_srgb,var(--fee-accent)_13%,var(--site-surface))] text-[var(--fee-accent)] dark:text-[#e2daff]">
                      <Icon size={23} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-[color:color-mix(in_srgb,var(--fee-accent)_18%,var(--site-line))] px-[.65rem] py-[.3rem] text-[.73rem] font-extrabold text-[var(--site-muted)]">
                      {group
                        ? "گروهی"
                        : item.mode === "online"
                          ? "آنلاین"
                          : "حضوری"}
                    </span>
                  </div>
                  <h3 className="mt-[1.3rem] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.65] font-[850] text-balance">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[.8rem] text-[var(--site-muted)]">
                    مدت جلسه: {formatNumber(item.duration)} دقیقه
                  </p>
                  <div
                    className="mt-[1.2rem] flex flex-wrap items-baseline gap-[.4rem] border-b border-[var(--site-line)] pb-4"
                    aria-label={`هزینهٔ ${item.name}`}
                  >
                    <strong className="text-[clamp(1.65rem,2.3vw,2.15rem)] leading-[1.3] font-black text-[var(--site-ink)]">
                      {formatNumber(item.price)}
                    </strong>
                    <span className="text-[.83rem] font-extrabold text-[var(--site-muted)]">
                      تومان
                    </span>
                  </div>
                  <ul className="my-[1.05rem] mb-[1.4rem] grid flex-1 list-none content-start gap-[.65rem] p-0">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-[.55rem] text-[.81rem] leading-[1.7] text-[var(--site-muted)]"
                      >
                        <Check
                          size={16}
                          className="mt-[.2rem] w-[17px] shrink-0 text-[var(--fee-accent)] dark:text-[#a4e7d7]"
                          aria-hidden="true"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    className="fees-detail-action flex min-h-[46px] items-center justify-between gap-[.6rem] rounded-[13px] border border-[color:color-mix(in_srgb,var(--fee-accent)_21%,var(--site-line))] bg-[color:color-mix(in_srgb,var(--fee-accent)_8%,var(--site-surface))] px-[.9rem] py-[.55rem] text-[.85rem] font-[850] text-[var(--site-ink)] no-underline hover:bg-[var(--fee-accent)] hover:text-white focus-visible:outline-3 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--fee-accent)]"
                  >
                    {labels.book}
                    <ArrowLeft
                      size={18}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.article>
              );
            })}
          </ScrollReveal>
        </div>
      </section>
      {page.sections.map((section, index) => (
        <Section
          key={`${section.kind}-${index}`}
          section={section}
          index={index}
        />
      ))}
    </>
  );
}
