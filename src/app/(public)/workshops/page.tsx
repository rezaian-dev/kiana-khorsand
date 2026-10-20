import {
  siteContainerClassName,
  siteGridClassName,
} from "@/components/shared/public-layout-classes";
import { publicMetadata } from "@/lib/public-metadata";
import Link from "next/link";
import { RotateCcw, Search } from "lucide-react";
import { searchText } from "@/lib/list-search";
import type { QueryPageProps } from "@/types/routes";
import { listWorkshops } from "@/features/workshops/queries";
import { Intro } from "@/components/shared/intro";
import { ContentCard } from "@/components/shared/card";
import { labels } from "@/lib/labels";
import { workshopPrice } from "@/features/workshops/pricing";
import { formatToman } from "@/lib/format";

export const revalidate = 3600;

const baseMetadata = {
  title: labels.workshops,
  description:
    "کارگاه‌های آموزشی مهارت‌های زندگی، رابطه و مراقبت از خود را ببینید.",
};

export async function generateMetadata({ searchParams }: QueryPageProps) {
  const params = await searchParams;
  return publicMetadata({
    ...baseMetadata,
    path: "/workshops",
    image: "/assets/images/intro-gather.jpg",
    canonical: !params.q,
    index: !params.q,
  });
}

export default async function Page({ searchParams }: QueryPageProps) {
  const q = searchText((await searchParams).q);
  const items = await listWorkshops();
  const visible = items.filter(
    (item) => !q || `${item.title} ${item.description}`.includes(q.trim()),
  );
  return (
    <>
      <Intro
        story="gather"
        title={labels.workshops}
        description={items[0]?.description}
      />
      <div className={siteContainerClassName}>
        <form
          method="get"
          role="search"
          className="public-search-panel mt-[clamp(1.3rem,3vw,2.5rem)] grid items-stretch gap-[1.15rem] rounded-[23px] border border-[color:color-mix(in_srgb,#569b96_15%,var(--site-line))] bg-[var(--site-surface)] [background-image:radial-gradient(circle_at_96%_8%,color-mix(in_srgb,#67ad9b_8%,transparent),transparent_36%)] p-[clamp(1.05rem,2.7vw,1.8rem)] shadow-[0_18px_42px_-34px_#1b566250]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-[color:color-mix(in_srgb,#318b85_13%,var(--site-surface))] text-[#257b78] dark:text-[#a6e4d7]">
              <Search size={20} aria-hidden="true" />
            </span>
            <div className="grid min-w-0 gap-[.15rem]">
              <label className="text-[1.06rem] font-[850]" htmlFor="workshop-q">
                جست‌وجوی کارگاه‌ها
              </label>
              <small className="text-[.8rem] leading-[1.7] text-[var(--site-muted)]">
                از میان کارگاه‌ها، موضوع دلخواهتان را پیدا کنید.
              </small>
            </div>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-[.65rem] max-[620px]:grid max-[620px]:grid-cols-[minmax(0,1fr)]">
            <input
              className="min-h-[50px] w-auto min-w-0 flex-[1_1_250px] rounded-xl border border-[color:color-mix(in_srgb,#4e8d8d_18%,var(--site-line))] bg-[var(--site-surface)] px-[.9rem] text-[var(--site-ink)] shadow-[0_5px_18px_-16px_#24434a75] placeholder:text-[var(--site-muted)] placeholder:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)] max-[620px]:w-full"
              id="workshop-q"
              name="q"
              type="search"
              maxLength={100}
              placeholder="نام یا موضوع کارگاه..."
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
                href="/workshops"
                className="inline-flex min-h-[46px] items-center justify-center gap-[.35rem] rounded-[10px] px-[.6rem] py-[.4rem] text-[.83rem] font-extrabold text-[#22746e] no-underline hover:bg-[color:color-mix(in_srgb,#3d9486_10%,var(--site-surface))] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#22746e] max-[620px]:justify-self-start dark:text-[#a4e5d7]"
              >
                <RotateCcw size={16} aria-hidden="true" /> پاک‌کردن جست‌وجو
              </Link>
            )}
          </div>
        </form>
        {visible.length ? (
          <div className={siteGridClassName}>
            {visible.map((item) => (
              <ContentCard
                key={item.slug}
                title={item.title}
                description={item.description}
                href={`/workshops/${item.slug}`}
                image={item.cover}
                tag={formatToman(workshopPrice(item).total)}
              />
            ))}
          </div>
        ) : (
          <div
            className="public-search-empty mt-[clamp(1.5rem,3vw,2.5rem)] mb-16 grid justify-items-start gap-2 rounded-[21px] border border-dashed border-[var(--site-line)] bg-[var(--site-surface)] p-[clamp(1.3rem,3vw,2.1rem)] leading-[1.8] text-[var(--site-muted)]"
            role="status"
          >
            <Search size={24} className="text-[#267f78]" aria-hidden="true" />
            <h2 className="text-[1.15rem] font-[850] text-[var(--site-ink)]">
              کارگاهی با این عبارت پیدا نشد
            </h2>
            <p>عبارت کوتاه‌تری جست‌وجو کنید یا همهٔ کارگاه‌ها را ببینید.</p>
            <Link
              href="/workshops"
              className="font-extrabold text-[#267f78] underline underline-offset-[3px] dark:text-[#a4e5d7]"
            >
              نمایش همهٔ کارگاه‌ها
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
