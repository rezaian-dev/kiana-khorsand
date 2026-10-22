"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { animate, hover } from "motion";

// Layout tokens
import {
  publicEyebrowClassName,
  publicH2ClassName,
  publicH3ClassName,
} from "@/components/layout/public-type-classes";
import { publicChipClassName } from "@/components/layout/public-visual-classes";
import {
  publicContainerClassName,
  publicSectionClassName,
} from "@/components/layout/public-layout-classes";
import { publicSpotClassName } from "@/components/layout/public-spot-classes";
import { publicCardClassName } from "@/components/layout/public-card-classes";
import { publicButtonSoftClassName } from "@/components/layout/public-button-classes";
import {
  publicTestimonialClassName,
  publicTestimonialMarkClassName,
} from "@/components/layout/public-testimonial-classes";

// Shared visuals
import {
  artMediaMaskClassName,
  artSealClassName,
  artSealCompactClassName,
  artSurfaceClassName,
} from "@/components/shared/art-card-styles";
import { testimonialPortrait } from "@/features/testimonials/portrait";
import { ArticleEmblem } from "@/features/articles/ui/article-emblem";
import {
  articleActionClassName,
  articleActionIconClassName,
} from "@/features/articles/article-action-styles";
import type { ArticleVisual } from "@/features/articles/article-visual";
import { workshopPrice, type WorkshopDiscount } from "@/features/workshops/pricing";
import { formatToman } from "@/lib/format";
import {
  neonArticleActiveClassName,
  neonArticleCardClassName,
  neonCarouselLinkClassName,
  neonCarouselSectionClassName,
} from "./carousel-neon-classes";

// ---------------------------------------------------------------------------
// Types — readable, concise
// ---------------------------------------------------------------------------

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

type CarouselProps =
  | { kind: "testimonials"; reviews: TestimonialItem[]; articles?: never; workshops?: never }
  | { kind: "articles"; articles: ArticleItem[]; reviews?: never; workshops?: never }
  | { kind: "workshops"; workshops: WorkshopItem[]; reviews?: never; articles?: never };

const META = {
  testimonials: {
    id: "testimonials-title",
    eyebrow: "تجربه‌ها",
    title: "از زبان کسانی که مسیر را آمده‌اند",
    prev: "تجربه‌های قبلی",
    next: "تجربه‌های بعدی",
  },
  articles: {
    id: "articles-title",
    eyebrow: "نوشته‌ها",
    title: "خواندنی‌های کوتاه برای روزهای سخت",
    prev: "مقاله‌های قبلی",
    next: "مقاله‌های بعدی",
  },
  workshops: {
    id: "workshops-title",
    eyebrow: "کارگاه‌ها",
    title: "یادگیری گروهی، در فضایی امن",
    prev: "کارگاه‌های قبلی",
    next: "کارگاه‌های بعدی",
  },
} as const;

const COVER = `cover cover-violet relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)] [background-image:radial-gradient(75%_65%_at_18%_18%,rgba(109,74,255,0.55),transparent_72%),radial-gradient(65%_65%_at_88%_82%,rgba(177,74,158,0.45),transparent_72%)] ${artMediaMaskClassName}`;

// Backward-compat alias
export function ReferenceCarousel(props: CarouselProps) {
  return <HomeSlider {...props} />;
}

export function HomeSlider(props: CarouselProps) {
  return <SectionSlider {...props} />;
}

// ---------------------------------------------------------------------------
// Core — Embla per official docs: https://www.embla-carousel.com/get-started/react
// ---------------------------------------------------------------------------

function SectionSlider(props: CarouselProps) {
  const items =
    props.kind === "testimonials" ? props.reviews : props.kind === "articles" ? props.articles : props.workshops;
  const meta = META[props.kind];
  const isTestimonial = props.kind === "testimonials";
  const isImmersive = props.kind !== "workshops";
  const canLoop = items.length > 1;

  // Official Embla setup: direction rtl for Persian, loop, center align
  // Autoplay plugin handles auto-advance, pause on hover/focus per docs
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: canLoop,
      align: "center",
      direction: "rtl",
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
        playOnInit: true,
      }),
    ],
  );

  const [selected, setSelected] = useState(0);

  // Sync selected index for styling (testimonials coverflow focus)
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    // Ensure autoplay starts (required per official docs)
    emblaApi.plugins().autoplay?.play();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Hover zoom for article/workshop covers — kept lightweight
  useEffect(() => {
    if (props.kind === "testimonials" || !emblaApi) return;
    const root = emblaApi.rootNode() as HTMLElement | null;
    if (!root) return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const imgs = [...root.querySelectorAll<HTMLImageElement>(".art-carousel-card img")];
    const reset = () => {
      if (m.matches) for (const img of imgs) animate(img, { scale: 1 }, { duration: 0 });
    };
    const stops = [...root.querySelectorAll<HTMLElement>(".art-carousel-card")].map((card) =>
      hover(card, () => {
        const img = card.querySelector<HTMLImageElement>("img");
        if (!img || m.matches) return;
        animate(img, { scale: 1.035 }, { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] });
        return () => animate(img, { scale: 1 }, { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] });
      }),
    );
    m.addEventListener("change", reset);
    return () => {
      stops.forEach((s) => s());
      m.removeEventListener("change", reset);
    };
  }, [emblaApi, props.kind]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      className={`${publicSectionClassName} ${isImmersive ? neonCarouselSectionClassName : ""} ${props.kind === "testimonials" ? "pt-10! pb-10! md:pt-24! md:pb-16!" : props.kind === "articles" ? "pt-8! pb-12! md:pt-16! md:pb-24!" : ""}`}
      aria-labelledby={meta.id}
    >
      <div className={`${publicContainerClassName} flex items-end justify-between gap-5 max-[620.02px]:flex-col max-[620.02px]:items-start`}>
        <div className="max-w-[52ch] min-w-0">
          <p
            className={`${publicEyebrowClassName} ${isImmersive ? "text-[#19776e]! before:[background-image:linear-gradient(90deg,#3c9f87,#84c3ad)]! dark:text-[#9ce5d2]! dark:before:[background-image:linear-gradient(90deg,#85ebd3,#4aa9af)]!" : ""}`}
          >
            {meta.eyebrow}
          </p>
          <h2
            id={meta.id}
            className={`${publicH2ClassName} mt-4 ${isImmersive ? "text-[var(--fg)]! dark:text-[#f0faf5]! dark:[text-shadow:0_0_28px_#67ddba35]" : ""}`}
          >
            {meta.title}
          </h2>
          {isTestimonial && (
            <p className="text-muted mt-3 text-sm leading-7 text-[#52716b]! dark:text-[#b1cec6]!">
              تجربه‌ها با رضایت و نام خودِ مراجعان منتشر شده است.
            </p>
          )}
        </div>
        {!isTestimonial && (
          <Link
            href={props.kind === "articles" ? "/articles" : "/workshops"}
            className={`${publicButtonSoftClassName} flex-none max-[620.02px]:self-start ${isImmersive ? neonCarouselLinkClassName : ""}`}
          >
            {props.kind === "articles" ? "همهٔ مقاله‌ها" : "همهٔ کارگاه‌ها"}
            <i className="ph-bold ph-arrow-left" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div
        className={
          isTestimonial
            ? "testimonials-stage relative mt-4 pt-6 pb-4 [perspective-origin:50%_45%] [perspective:1500px] before:pointer-events-none before:absolute before:[inset:12%_8%_4%] before:z-0 before:rounded-[999px] before:opacity-[.55] before:blur-[60px] before:content-[''] before:[background:radial-gradient(60%_50%_at_30%_40%,rgba(74,189,161,.25),transparent_70%),radial-gradient(60%_55%_at_75%_60%,rgba(44,138,146,.22),transparent_70%)] motion-reduce:[perspective:none] sm:mt-6 sm:pt-8 lg:pt-12 lg:pb-6 dark:before:opacity-[.35]"
            : `${publicContainerClassName} ${isImmersive ? "mt-6 sm:mt-10" : "mt-10"}`
        }
      >
        {/* Embla viewport — official structure */}
        <div
          ref={emblaRef}
          dir="rtl"
          className={`embla relative z-10 overflow-hidden ${isTestimonial ? "pt-4 pb-8" : "pt-[.6rem] pb-4"}`}
          aria-roledescription="اسلایدر"
          aria-label={meta.title}
        >
          <div className={`embla__container flex touch-pan-y gap-4 sm:gap-5 lg:gap-6 py-4 ${isTestimonial ? "before:shrink-0 before:basis-[9%] after:shrink-0 after:basis-[9%] sm:before:basis-[20%] sm:after:basis-[20%] lg:before:basis-[30.5%] lg:after:basis-[30.5%]" : "before:shrink-0 before:basis-[9%] after:shrink-0 after:basis-[9%] min-[480px]:before:basis-[10%] min-[480px]:after:basis-[10%] sm:before:basis-[26%] sm:after:basis-[26%] lg:before:basis-[34.5%] lg:after:basis-[34.5%]"}`}>
            {items.map((item, index) => {
              const active = index === selected;
              const isPrev = index === (selected - 1 + items.length) % items.length;
              const isNext = index === (selected + 1) % items.length;
              return (
                <div
                  key={item.slug}
                  className={`embla__slide flex-[0_0_auto] min-w-0 ${isTestimonial ? "basis-[80%] [perspective:900px] [transform-style:preserve-3d] min-[480px]:basis-[78%] sm:basis-[60%] lg:basis-[39%]" : "basis-[72%] min-[480px]:basis-[76%] sm:basis-[46%] lg:basis-[31%]"}`}
                  aria-hidden={canLoop ? undefined : !active}
                >
                  <div
                    className={`h-full ${isTestimonial ? "transition-opacity duration-500 ease-out motion-reduce:transition-none" : ""} ${isTestimonial ? (active ? "opacity-100" : isPrev || isNext ? "opacity-70" : "opacity-35") : "opacity-100"} motion-reduce:opacity-100`}
                  >
                    {props.kind === "testimonials" ? (
                      <TestimonialCard
                        item={item as TestimonialItem}
                        depth={
                          active
                            ? ""
                            : isNext
                              ? "[transform:translate3d(48px,0,-170px)_rotateY(-23deg)] blur-[0.7px] motion-reduce:blur-none"
                              : isPrev
                                ? "[transform:translate3d(-48px,0,-170px)_rotateY(23deg)] blur-[0.7px] motion-reduce:blur-none"
                                : "[transform:translate3d(0,0,-180px)_scale(.95)]"
                        }
                      />
                    ) : props.kind === "articles" ? (
                      <ArticleCard item={item as ArticleItem} active={active} />
                    ) : (
                      <WorkshopCard item={item as WorkshopItem} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={publicContainerClassName}>
        <div className="flex items-center justify-end gap-3 pt-6">
          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-zinc-700 dark:hover:text-white"
              aria-label={meta.next}
              onClick={scrollNext}
              disabled={items.length < 2}
            >
              <i className="ph-bold ph-arrow-left text-[14px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-zinc-700 dark:hover:text-white"
              aria-label={meta.prev}
              onClick={scrollPrev}
              disabled={items.length < 2}
            >
              <i className="ph-bold ph-arrow-right text-[14px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Cards — small, single purpose
// ---------------------------------------------------------------------------

function TestimonialCard({ item, depth }: { item: TestimonialItem; depth: string }) {
  return (
    <figure className={`${publicTestimonialClassName} h-full flex-auto ${depth}`}>
      <span className={publicTestimonialMarkClassName} aria-hidden="true">
        <i className="ph-fill ph-quotes" />
      </span>
      <blockquote className="testimonial-body relative z-[1] mt-[1.6rem] mr-0 mb-[1.9rem] ml-0 ps-[.55rem] text-[clamp(.95rem,1.3vw,1.05rem)] leading-[2.1] font-[550] text-pretty text-zinc-700 dark:text-zinc-200">
        {item.quote}
      </blockquote>
      <figcaption className="testimonial-author relative z-[1] mt-auto flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-5 dark:border-white/10">
        <span
          className="testimonial-avatar relative grid size-12 flex-none place-items-center overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
          role="img"
          aria-label={`پرترهٔ تولیدشده برای ${item.name}`}
        >
          {(() => {
            const a = testimonialPortrait(item);
            return a ? <Image src={a} width={120} height={120} sizes="48px" className="absolute inset-0 size-full rounded-full object-cover" alt="" /> : null;
          })()}
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.name}</span>
          <span className="text-xs text-zinc-500 dark:text-zinc-300">
            {item.category === "couples" ? "مشاورهٔ زوجی" : item.category === "individual" ? "مشاورهٔ فردی" : item.category}
          </span>
        </span>
        <span className="ms-auto rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-teal-500">{item.experience}</span>
      </figcaption>
    </figure>
  );
}

function ArticleCard({ item, active }: { item: ArticleItem; active: boolean }) {
  return (
    <Link
      href={`/articles/${item.slug}`}
      className={`${publicCardClassName} ${publicSpotClassName} group flex h-full w-full min-w-0 flex-col !p-4 hover:no-underline! focus-visible:no-underline! focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#247d72] ${artSurfaceClassName} ${neonArticleCardClassName} ${active ? neonArticleActiveClassName : ""}`}
    >
      <div className="relative isolate min-w-0 flex-none">
        <div className={COVER}>
          {item.cover && (
            <Image
              src={item.cover}
              unoptimized={item.cover?.startsWith("/api/article-covers/")}
              width={720}
              height={450}
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, 30vw"
              alt={`تصویر مقالهٔ ${item.title}`}
              className="absolute inset-0 h-full w-full object-cover"
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
      <h3 className={`${publicH3ClassName} mx-[0.65rem] mt-3 break-words text-[#244247]! dark:text-[#f0fcf8]!`}>{item.title}</h3>
      <p className="mx-[0.65rem] mt-3 text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">{item.excerpt}</p>
      <span
        className={`mx-[.65rem]! mt-auto! group-hover:motion-safe:-translate-y-0.5 motion-reduce:transform-none! ${articleActionClassName} hover:no-underline! [&&]:border-[#9eb6dc]! [&&]:bg-[#ebf1fd]! [&&]:text-[#294d80]! [&&]:hover:bg-[#dce7fa]! [&&]:hover:text-[#213e70]! dark:[&&]:border-[#7287b2]! dark:[&&]:bg-[#293654]! dark:[&&]:text-[#e0eafb]! dark:[&&]:hover:bg-[#3a4b73]! dark:[&&]:hover:text-white!`}
      >
        خواندن مقاله <i className={`ph-bold ph-arrow-left ${articleActionIconClassName} group-hover:motion-safe:-translate-x-[3px]`} aria-hidden="true" />
      </span>
    </Link>
  );
}

function WorkshopCard({ item }: { item: WorkshopItem }) {
  return (
    <Link
      href={`/workshops/${item.slug}`}
      className={`${publicCardClassName} ${publicSpotClassName} group flex h-full w-full min-w-0 flex-col !p-4 ${artSurfaceClassName}`}
    >
      <div className="relative isolate min-w-0 flex-none">
        <div className={COVER}>
          {item.cover && (
            <Image
              src={item.cover}
              width={720}
              height={450}
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 44vw, 30vw"
              alt={`تصویر کارگاه ${item.title}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <span className={`${artSealClassName} ${artSealCompactClassName}`} aria-hidden="true">
          <i className="ph-duotone ph-users-three" />
        </span>
      </div>
      <span className="mx-[0.65rem] mt-4 text-xs font-extrabold tracking-wide text-zinc-500 dark:text-zinc-400">{item.mode === "online" ? "آنلاین" : "حضوری"}</span>
      <h3 className={`${publicH3ClassName} mx-[0.65rem] mt-2 break-words`}>{item.title}</h3>
      <p className="mx-[0.65rem] mt-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
        {formatToman(workshopPrice(item).total)}
        {workshopPrice(item).percent > 0 && (
          <span className="font-extrabold text-[#10665f] dark:text-[#8fe4d6]">
            {" "}
            · ٪{new Intl.NumberFormat("fa-IR").format(workshopPrice(item).percent)} تخفیف
          </span>
        )}
      </p>
      <p className="mx-[0.65rem] mt-3 text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">{item.description}</p>
      <span className="mx-[0.65rem] mt-5 inline-flex grow items-center gap-1.5 pt-2 text-sm font-bold text-[#126c68] dark:text-[#8fe4d6]">
        جزئیات کارگاه <i className="ph-bold ph-arrow-left" aria-hidden="true" />
      </span>
    </Link>
  );
}
