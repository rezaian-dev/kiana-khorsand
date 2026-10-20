import {
  siteBadgeClassName,
  siteDetailClassName,
} from "@/components/shared/public-layout-classes";
import { readingSurfaceClassName } from "@/components/shared/reading-surface";
import { ScrollReveal } from "@/components/layout/page-reveal";
import { publicMetadata } from "@/lib/public-metadata";
import type { SlugPageProps } from "@/types/routes";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getWorkshop, listWorkshops } from "@/features/workshops/queries";
import { collection } from "@/db/collections";
import { publishedWorkshopReviews } from "@/features/workshops/reviews";
import { WorkshopReviews } from "@/features/community/ui/workshop-reviews";
import { getSession } from "@/lib/session";
import { WorkshopRequest } from "@/features/community/ui/workshop-request";
import { Intro } from "@/components/shared/intro";
import { SiteToaster } from "@/components/shared/site-toaster";
import { Prose } from "@/components/shared/prose";
import { cleanEditorialBody } from "@/lib/clean-copy";
import { workshopPrice } from "@/features/workshops/pricing";
import { formatDate, formatToman } from "@/lib/format";
import { labels } from "@/lib/labels";

export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() {
  const workshops = await listWorkshops();
  if (workshops.length > 0) return workshops.map((item) => ({ slug: item.slug }));
  return [
    { slug: "emotion-regulation" },
    { slug: "couple-communication" },
    { slug: "mindfulness-intro" },
    { slug: "self-compassion" },
    { slug: "boundaries-workshop" },
    { slug: "sleep-workshop" },
  ];
}
export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const item = await getWorkshop(slug);
  if (!item) notFound();
  return publicMetadata({
    title: item.title,
    description: item.description,
    path: `/workshops/${slug}`,
    image: item.cover,
  });
}
export default async function Page({ params }: SlugPageProps) {
  const item = await getWorkshop((await params).slug);
  if (!item) notFound();
  const session = await getSession();
  const pricing = workshopPrice(item);
  const [reviews, enrollment, ownReview] = await Promise.all([
    publishedWorkshopReviews(item.slug),
    session
      ? collection("enrollments").findOne({
          workshopId: item.slug,
          userId: session.user.id,
        })
      : null,
    session
      ? collection("workshopReviews").findOne({
          workshopId: item.slug,
          userId: session.user.id,
        })
      : null,
  ]);
  const eligible = Boolean(
    item.endsAt &&
    new Date(item.endsAt) <= new Date() &&
    enrollment?.status === "active" &&
    enrollment.attendedAt,
  );
  return (
    <>
      <SiteToaster />
      <Intro
        story="gather"
        parent={{ label: "کارگاه‌ها", href: "/workshops" }}
        title={item.title}
        description={item.description}
        image={item.cover}
      />
      <ScrollReveal
        as="article"
        className={`${siteDetailClassName} reading-surface reading-surface-workshop ${readingSurfaceClassName}`}
      >
        <div className="workshop-detail-summary mb-[clamp(1.6rem,3vw,2rem)] flex flex-wrap items-center justify-between gap-x-8 gap-y-[.9rem] rounded-[18px] border border-[color:color-mix(in_srgb,#328f82_17%,var(--site-line))] bg-[color:color-mix(in_srgb,#44998b_6%,var(--site-surface))] p-[clamp(1rem,2.4vw,1.4rem)]">
          <div>
            <span className="mb-[.65rem] block text-[.78rem] font-[750] text-[var(--site-muted)]">
              هزینهٔ ثبت‌نام
            </span>
            <div className="workshop-price-display mb-[1.3rem] flex flex-wrap items-center gap-3">
              {pricing.percent > 0 && (
                <span className="rounded-[999px] px-[.85rem] py-[.35rem] font-extrabold text-white [background:linear-gradient(105deg,#167870,#385f89)]">
                  ٪{new Intl.NumberFormat("fa-IR").format(pricing.percent)}{" "}
                  تخفیف
                </span>
              )}
              <strong className={`${siteBadgeClassName} font-[850]`}>
                {formatToman(pricing.total)}
              </strong>
              {pricing.percent > 0 && (
                <del className="text-[var(--muted)] decoration-[2px]">
                  {formatToman(pricing.original)}
                </del>
              )}
            </div>
          </div>
          {item.startsAt && (
            <div className="flex min-w-0 items-center gap-[.6rem] border-s border-[var(--site-line)] ps-4 max-[560px]:w-full max-[560px]:border-0 max-[560px]:p-0">
              <CalendarDays
                size={19}
                className="shrink-0 text-[#27827a]"
                aria-hidden="true"
              />
              <span className="grid gap-[.2rem]">
                <small className="text-[.76rem] text-[var(--site-muted)]">
                  زمان برگزاری
                </small>
                <strong className="text-[.84rem] text-[var(--site-ink)]">
                  {formatDate(item.startsAt)}
                </strong>
              </span>
            </div>
          )}
        </div>
        <Prose reading body={cleanEditorialBody(item.body, "workshop")} />
        <div className="workshop-detail-actions mt-8 flex flex-wrap items-center gap-4 max-[560.02px]:grid [&>*]:static [&>*]:max-w-full [&>*]:flex-[0_1_auto] [&>*]:text-center max-[560.02px]:[&>*]:w-full max-[560.02px]:[&>*]:justify-center">
          <WorkshopRequest
            key={session ? "member" : "visitor"}
            slug={item.slug}
            authenticated={Boolean(session)}
            status={enrollment?.status}
            closed={Boolean(
              item.startsAt && new Date(item.startsAt) <= new Date(),
            )}
          />
          <Link
            href="/contact"
            className="site-button border! border-[color:color-mix(in_srgb,var(--site-ink)_16%,transparent)]! text-[var(--site-ink)]! [box-shadow:0_9px_26px_-19px_#243452]! [background:color-mix(in_srgb,var(--site-surface)_82%,transparent)]!"
          >
            {labels.contact}
          </Link>
        </div>
      </ScrollReveal>
      <WorkshopReviews
        reviews={reviews}
        slug={item.slug}
        authenticated={Boolean(session)}
        eligible={eligible}
        alreadyReviewed={Boolean(ownReview)}
      />
    </>
  );
}
