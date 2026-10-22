import Image from "next/image";
import Link from "next/link";

import { publicH3ClassName } from "@/components/layout/public-type-classes";
import { publicChipClassName } from "@/components/layout/public-visual-classes";
import { publicCardClassName } from "@/components/layout/public-card-classes";
import { publicSpotClassName } from "@/components/layout/public-spot-classes";
import {
  artMediaMaskClassName,
  artSealClassName,
  artSealCompactClassName,
  artSurfaceClassName,
} from "@/components/shared/art-card-styles";
import { ArticleEmblem } from "@/features/articles/ui/article-emblem";
import {
  articleActionClassName,
  articleActionIconClassName,
} from "@/features/articles/article-action-styles";
import type { ArticleVisual } from "@/features/articles/article-visual";
import { TestimonialCard } from "@/features/testimonials/ui/testimonial-card";
import { workshopPrice, type WorkshopDiscount } from "@/features/workshops/pricing";
import { formatToman } from "@/lib/format";
import {
  neonArticleCardClassName,
  neonCarouselSectionClassName,
} from "./carousel-neon-classes";
import { SliderSection } from "./slider-section";

type TestimonialItem = {
  slug: string;
  name: string;
  quote: string;
  category: string;
  experience: string;
  avatar: string | null;
};

type ArticleItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  visual: ArticleVisual;
  cover: string | null;
};

type WorkshopItem = {
  slug: string;
  title: string;
  description: string;
  mode: string;
  price: number;
  discount: WorkshopDiscount | null;
  cover: string | null;
};

type HomeSliderProps =
  | { kind: "testimonials"; reviews: TestimonialItem[]; articles?: never; workshops?: never }
  | { kind: "articles"; articles: ArticleItem[]; reviews?: never; workshops?: never }
  | { kind: "workshops"; workshops: WorkshopItem[]; reviews?: never; articles?: never };

const META = {
  testimonials: {
    id: "testimonials-title",
    eyebrow: "تجربه‌ها",
    title: "از زبان کسانی که مسیر را آمده‌اند",
    description: "تجربه‌ها با رضایت و نام خودِ مراجعان منتشر شده است.",
  },
  articles: {
    id: "articles-title",
    eyebrow: "نوشته‌ها",
    title: "خواندنی‌های کوتاه برای روزهای سخت",
    href: "/articles",
    linkLabel: "همهٔ مقاله‌ها",
  },
  workshops: {
    id: "workshops-title",
    eyebrow: "کارگاه‌ها",
    title: "یادگیری گروهی، در فضایی امن",
    href: "/workshops",
    linkLabel: "همهٔ کارگاه‌ها",
  },
} as const;

const coverClassName = `relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)] [background-image:radial-gradient(75%_65%_at_18%_18%,color-mix(in_srgb,var(--c-violet)_45%,transparent),transparent_72%),radial-gradient(65%_65%_at_88%_82%,color-mix(in_srgb,var(--c-plum)_38%,transparent),transparent_72%)] ${artMediaMaskClassName}`;

/**
 * Home sliders (Server Component): builds the cards and hands them to the client
 * slider shell as slots. Testimonials: no autoplay and no loop, so Previous/Next
 * expose real disabled states. Articles and workshops: loop + autoplay with a
 * visible pause control (WCAG 2.2.2).
 */
export function HomeSlider(props: HomeSliderProps) {
  if (props.kind === "testimonials") {
    const meta = META.testimonials;
    return (
      <SliderSection
        {...meta}
        slides={props.reviews.map((item) => (
          <TestimonialCard key={item.slug} item={item} />
        ))}
        loop={false}
        autoplay={false}
        live
        mobileBasis="basis-[88%] sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-1rem)]"
        className="pt-10! pb-10! md:pt-16! md:pb-16!"
      />
    );
  }

  if (props.kind === "articles") {
    const meta = META.articles;
    return (
      <SliderSection
        {...meta}
        variant="editorial"
        slides={props.articles.map((item) => (
          <ArticleCard key={item.slug} item={item} />
        ))}
        loop={props.articles.length > 1}
        autoplay={props.articles.length > 1}
        className={`${neonCarouselSectionClassName} pt-8! pb-12! md:pt-16! md:pb-24!`}
      />
    );
  }

  const meta = META.workshops;
  return (
    <SliderSection
      {...meta}
      slides={props.workshops.map((item) => (
        <WorkshopCard key={item.slug} item={item} />
      ))}
      loop={props.workshops.length > 1}
      autoplay={props.workshops.length > 1}
    />
  );
}

function ArticleCard({ item }: { item: ArticleItem }) {
  return (
    <Link
      href={`/articles/${item.slug}`}
      className={`${publicCardClassName} ${publicSpotClassName} group flex h-full w-full min-w-0 flex-col !p-4 hover:no-underline! focus-visible:no-underline! focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#247d72] ${artSurfaceClassName} ${neonArticleCardClassName}`}
    >
      <div className="relative isolate min-w-0 flex-none">
        <div className={coverClassName}>
          {item.cover && (
            <Image
              src={item.cover}
              unoptimized={item.cover?.startsWith("/api/article-covers/")}
              width={720}
              height={450}
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 31vw"
              alt={`تصویر مقالهٔ ${item.title}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          )}
        </div>
        <ArticleEmblem visual={item.visual} slug={item.slug} className={artSealCompactClassName} />
      </div>
      <div className="mx-[0.65rem] mt-4 flex flex-wrap items-center gap-2.5">
        <span className={`${publicChipClassName} !border-[#84b9aa]/55 !bg-[#87c3ad]/15 !py-1 !text-[.75rem] !text-[#2b7168] dark:!border-[#69c4b3]/35 dark:!bg-[#62c5a5]/10 dark:!text-[#b8f4dc]`}>
          {item.category}
        </span>
      </div>
      <h3 className={`${publicH3ClassName} mx-[0.65rem] mt-3 break-words text-start text-[#244247]! dark:text-[#f0fcf8]!`}>
        {item.title}
      </h3>
      <p className="mx-[0.65rem] mt-3 text-start text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">
        {item.excerpt}
      </p>
      <span
        className={`mx-[.65rem]! mt-auto! group-hover:motion-safe:-translate-y-0.5 motion-reduce:transform-none! ${articleActionClassName} hover:no-underline! [&&]:border-[#9eb6dc]! [&&]:bg-[#ebf1fd]! [&&]:text-[#294d80]! [&&]:hover:bg-[#dce7fa]! [&&]:hover:text-[#213e70]! dark:[&&]:border-[#7287b2]! dark:[&&]:bg-[#293654]! dark:[&&]:text-[#e0eafb]! dark:[&&]:hover:bg-[#3a4b73]! dark:[&&]:hover:text-white!`}
      >
        خواندن مقاله
        <i
          className={`ph-bold ph-arrow-left ${articleActionIconClassName} group-hover:motion-safe:-translate-x-[3px] rtl:rotate-180`}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

function WorkshopCard({ item }: { item: WorkshopItem }) {
  const price = workshopPrice(item);
  return (
    <Link
      href={`/workshops/${item.slug}`}
      className={`${publicCardClassName} ${publicSpotClassName} group flex h-full w-full min-w-0 flex-col !p-4 ${artSurfaceClassName}`}
    >
      <div className="relative isolate min-w-0 flex-none">
        <div className={coverClassName}>
          {item.cover && (
            <Image
              src={item.cover}
              width={720}
              height={450}
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 46vw, 31vw"
              alt={`تصویر کارگاه ${item.title}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          )}
        </div>
        <span className={`${artSealClassName} ${artSealCompactClassName}`} aria-hidden="true">
          <i className="ph-duotone ph-users-three" />
        </span>
      </div>
      <span className="mx-[0.65rem] mt-4 text-start text-xs font-extrabold tracking-wide text-[var(--site-muted)]">
        {item.mode === "online" ? "آنلاین" : "حضوری"}
      </span>
      <h3 className={`${publicH3ClassName} mx-[0.65rem] mt-2 break-words text-start`}>
        {item.title}
      </h3>
      <p className="mx-[0.65rem] mt-2 text-start text-xs font-bold text-[var(--site-muted)]">
        {formatToman(price.total)}
        {price.percent > 0 && (
          <span className="font-extrabold text-[#10665f] dark:text-[#8fe4d6]">
            {" "}
            · ٪{new Intl.NumberFormat("fa-IR").format(price.percent)} تخفیف
          </span>
        )}
      </p>
      <p className="mx-[0.65rem] mt-3 text-start text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">
        {item.description}
      </p>
      <span className="mx-[0.65rem] mt-auto inline-flex items-center gap-1.5 pt-5 text-start text-sm font-bold text-[#126c68] dark:text-[#8fe4d6]">
        جزئیات کارگاه
        <i className="ph-bold ph-arrow-left" aria-hidden="true" />
      </span>
    </Link>
  );
}
