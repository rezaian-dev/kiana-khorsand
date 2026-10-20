"use client";

import {
  publicTestimonialClassName,
  publicTestimonialMarkClassName,
} from "@/components/layout/public-testimonial-classes";

import { publicSpotClassName } from "@/components/layout/public-spot-classes";

import { publicCardClassName } from "@/components/layout/public-card-classes";

import { publicButtonSoftClassName } from "@/components/layout/public-button-classes";

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
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { publicSliderControlClassName } from "@/components/layout/public-slider-control-classes";
import { animate, hover } from "motion";
import Image from "next/image";
import Link from "next/link";
import { testimonialPortrait } from "@/features/testimonials/portrait";
import {
  artMediaMaskClassName,
  artSealClassName,
  artSealCompactClassName,
  artSurfaceClassName,
} from "@/components/shared/art-card-styles";
import {
  workshopPrice,
  type WorkshopDiscount,
} from "@/features/workshops/pricing";
import { formatToman } from "@/lib/format";
import { ArticleEmblem } from "@/features/articles/ui/article-emblem";
import {
  articleActionClassName,
  articleActionIconClassName,
} from "@/features/articles/article-action-styles";
import type { ArticleVisual } from "@/features/articles/article-visual";
import {
  neonCarouselSectionClassName,
  neonCarouselLinkClassName,
  neonCarouselControlClassName,
  neonArticleCardClassName,
  neonArticleActiveClassName,
} from "./carousel-neon-classes";

const referenceCoverClassName = `cover cover-violet relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)] [background-image:radial-gradient(75%_65%_at_18%_18%,rgba(109,74,255,0.55),transparent_72%),radial-gradient(65%_65%_at_88%_82%,rgba(177,74,158,0.45),transparent_72%)] ${artMediaMaskClassName}`;

type Review = {
  slug: string;
  name: string;
  quote: string;
  category: string;
  experience: string;
  avatar: string | null;
};
type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  visual: ArticleVisual;
  cover: string | null;
};
type Workshop = {
  slug: string;
  title: string;
  description: string;
  mode: string;
  price: number;
  discount: WorkshopDiscount | null;
  cover: string | null;
};
const config = {
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
type Props =
  | {
      kind: "testimonials";
      reviews: Review[];
      articles?: never;
      workshops?: never;
    }
  | {
      kind: "articles";
      articles: Article[];
      reviews?: never;
      workshops?: never;
    }
  | {
      kind: "workshops";
      workshops: Workshop[];
      reviews?: never;
      articles?: never;
    };

/** Native scroll snap + Tailwind slide depth; Motion only animates review avatars. */
export function ReferenceCarousel(props: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLLIElement | null)[]>([]);
  const [position, setPosition] = useState(1);
  const current = useRef(1);
  const programmaticTarget = useRef<number | null>(null);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(
    null,
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const items =
    props.kind === "testimonials"
      ? props.reviews
      : props.kind === "articles"
        ? props.articles
        : props.workshops;
  const c = config[props.kind];
  const coverflow = props.kind === "testimonials";
  const immersive = props.kind !== "workshops";
  const looping = items.length > 1;
  const rendered = looping
    ? [items[items.length - 1], ...items, items[0]]
    : items;
  const realIndex = (physical: number) =>
    looping ? (physical - 1 + items.length) % items.length : physical;

  const center = (index: number, immediate = false) => {
    const root = viewport.current;
    const slide = slides.current[index];
    if (!root || !slide) return;
    const element = slide.getBoundingClientRect();
    const frame = root.getBoundingClientRect();
    const delta =
      element.left + element.width / 2 - (frame.left + frame.width / 2);
    root.scrollBy({ left: delta, behavior: immediate ? "instant" : "auto" });
  };
  const settle = () => {
    const root = viewport.current;
    if (!root || !looping) return;
    if (programmaticTarget.current !== null) {
      const target = slides.current[programmaticTarget.current];
      if (!target) return;
      const box = target.getBoundingClientRect();
      const frame = root.getBoundingClientRect();
      if (Math.abs(box.left + box.width / 2 - frame.left - frame.width / 2) > 3)
        return;
      programmaticTarget.current = null;
    }
    // Edge copies give both sides a real neighbor; jump to the matching original
    // after snapping, without traversing the entire carousel in view.
    if (current.current === 0 || current.current === items.length + 1) {
      const landing = current.current === 0 ? items.length : 1;
      current.current = landing;
      setPosition(landing);
      center(landing, true);
    }
  };
  const move = (step: number) => {
    if (!looping) return;
    settle();
    const next = Math.max(
      0,
      Math.min(items.length + 1, current.current + step),
    );
    current.current = next;
    setPosition(next);
    programmaticTarget.current = next;
    center(next);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (props.kind === "testimonials") return;
    const root = viewport.current;
    if (!root) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const images = [
      ...root.querySelectorAll<HTMLImageElement>(".art-carousel-card img"),
    ];
    const reset = () => {
      if (media.matches)
        for (const image of images)
          animate(image, { scale: 1 }, { duration: 0 });
    };
    const listeners = [
      ...root.querySelectorAll<HTMLElement>(".art-carousel-card"),
    ].map((card) =>
      hover(card, () => {
        const image = card.querySelector<HTMLImageElement>("img");
        if (!image || media.matches) return;
        animate(
          image,
          { scale: 1.035 },
          { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
        );
        return () => {
          animate(
            image,
            { scale: 1 },
            { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
          );
        };
      }),
    );
    media.addEventListener("change", reset);
    return () => {
      listeners.forEach((stop) => stop());
      media.removeEventListener("change", reset);
    };
  }, [props.kind, items.length]);
  useEffect(() => {
    center(looping ? 1 : 0, true);
    // Re-center if a filtered carousel changes between one and multiple cards.
  }, [looping]);
  const trackScroll = () => {
    const root = viewport.current;
    if (!root || drag.current) return;
    const frame = root.getBoundingClientRect();
    const middle = frame.left + frame.width / 2;
    if (programmaticTarget.current !== null) {
      const target = slides.current[programmaticTarget.current];
      if (target) {
        const box = target.getBoundingClientRect();
        if (Math.abs(box.left + box.width / 2 - middle) <= 3) {
          programmaticTarget.current = null;
          // Scrollend performs the edge jump after native snap has finished.
        }
      }
      // Ignore intermediate cards during a smooth jump.
      return;
    }
    const nearest = slides.current.reduce(
      (best, slide, index) => {
        if (!slide) return best;
        const box = slide.getBoundingClientRect();
        const gap = Math.abs(box.left + box.width / 2 - middle);
        return gap < best.gap ? { index, gap } : best;
      },
      { index: current.current, gap: Infinity },
    );
    if (nearest.index !== current.current) {
      current.current = nearest.index;
      setPosition(nearest.index);
    }
  };
  return (
    <section
      className={`${publicSectionClassName} reference-carousel ${immersive ? neonCarouselSectionClassName : ""} ${props.kind === "testimonials" ? "pt-10! pb-10! md:pt-24! md:pb-16!" : props.kind === "articles" ? "pt-8! pb-12! md:pt-16! md:pb-24!" : ""}`}
      aria-labelledby={c.id}
      data-slider=""
      data-effect={coverflow ? "coverflow" : undefined}
    >
      <div
        className={`${publicContainerClassName} flex items-end justify-between gap-5 max-[620.02px]:flex-col max-[620.02px]:items-start`}
      >
        <div className="max-w-[52ch] min-w-0">
          <p
            className={`${publicEyebrowClassName} ${immersive ? "text-[#19776e]! before:[background-image:linear-gradient(90deg,#3c9f87,#84c3ad)]! dark:text-[#9ce5d2]! dark:before:[background-image:linear-gradient(90deg,#85ebd3,#4aa9af)]!" : ""}`}
          >
            {c.eyebrow}
          </p>
          <h2
            id={c.id}
            className={`${publicH2ClassName} mt-4 ${immersive ? "text-[var(--fg)]! dark:text-[#f0faf5]! dark:[text-shadow:0_0_28px_#67ddba35]" : ""}`}
          >
            {c.title}
          </h2>
          {coverflow && (
            <p className="text-muted mt-3 text-sm leading-7 text-[#52716b]! dark:text-[#b1cec6]!">
              تجربه‌ها با رضایت و نام خودِ مراجعان منتشر شده است.
            </p>
          )}
        </div>
        {!coverflow && (
          <Link
            href={props.kind === "articles" ? "/articles" : "/workshops"}
            className={`${publicButtonSoftClassName} carousel-section-link flex-none max-[620.02px]:self-start ${immersive ? neonCarouselLinkClassName : ""}`}
          >
            {props.kind === "articles" ? "همهٔ مقاله‌ها" : "همهٔ کارگاه‌ها"}
            <i className="ph-bold ph-arrow-left" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div
        className={
          coverflow
            ? "testimonials-stage relative mt-4 pt-6 pb-4 [perspective-origin:50%_45%] [perspective:1500px] before:pointer-events-none before:absolute before:[inset:12%_8%_4%] before:z-0 before:rounded-[999px] before:opacity-[.55] before:blur-[60px] before:content-[''] before:[background:radial-gradient(60%_50%_at_30%_40%,rgba(74,189,161,.25),transparent_70%),radial-gradient(60%_55%_at_75%_60%,rgba(44,138,146,.22),transparent_70%)] motion-reduce:[perspective:none] sm:mt-6 sm:pt-8 lg:pt-12 lg:pb-6 dark:before:opacity-[.35]"
            : `${publicContainerClassName} ${immersive ? "mt-6 sm:mt-10" : "mt-10"}`
        }
      >
        {/* The focusable scroll region deliberately handles arrow keys; it is not a button. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={viewport}
          className={`carousel ${coverflow && !reduceMotion ? "carousel-coverflow carousel-3d" : ""} relative z-10 snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] overflow-x-auto! overflow-y-hidden! overscroll-x-contain scroll-smooth motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden ${coverflow ? "pt-4 pb-8" : "pt-[.6rem] pb-4"}`}
          // A scrollable region needs a keyboard focus target (WCAG 2.1.1).
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          role="region"
          aria-roledescription="اسلایدر"
          aria-label={c.title}
          onScroll={trackScroll}
          // React 19 supports scrollend; eslint's DOM attribute list lags behind.
          // eslint-disable-next-line react/no-unknown-property
          onScrollEnd={settle}
          onKeyDown={(event) => {
            if (
              event.altKey ||
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey
            )
              return;
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            if (
              ["INPUT", "TEXTAREA", "SELECT"].includes(
                (event.target as HTMLElement).tagName,
              )
            )
              return;
            event.preventDefault();
            move(event.key === "ArrowLeft" ? 1 : -1);
          }}
          onTouchStart={() => {
            programmaticTarget.current = null;
          }}
          onPointerDown={(event) => {
            programmaticTarget.current = null;
            if (event.pointerType !== "mouse") return;
            event.currentTarget.classList.add("scroll-auto!", "snap-none!");
            drag.current = {
              x: event.clientX,
              scroll: event.currentTarget.scrollLeft,
              moved: false,
            };
          }}
          onDragStart={(event) => event.preventDefault()}
          onPointerCancel={(event) => {
            drag.current = null;
            event.currentTarget.classList.remove("scroll-auto!", "snap-none!");
          }}
          onPointerMove={(event) => {
            const state = drag.current;
            if (!state || event.buttons !== 1) return;
            if (Math.abs(event.clientX - state.x) > 5) state.moved = true;
            if (state.moved) {
              event.preventDefault();
              event.currentTarget.scrollLeft =
                state.scroll + state.x - event.clientX;
            }
          }}
          onPointerUp={(event) => {
            const state = drag.current;
            drag.current = null;
            event.currentTarget.classList.remove("scroll-auto!", "snap-none!");
            if (state?.moved) {
              event.currentTarget.dataset.dragged = "true";
              const viewportElement = event.currentTarget;
              queueMicrotask(() => {
                delete viewportElement.dataset.dragged;
              });
              trackScroll();
              center(current.current);
              window.setTimeout(settle, 600);
            }
          }}
          onClickCapture={(event) => {
            if (event.currentTarget.dataset.dragged) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          <ul
            className={`carousel-wrapper flex items-stretch gap-4 py-4 sm:gap-5 lg:gap-6 ${coverflow ? "before:shrink-0 before:basis-[9%] after:shrink-0 after:basis-[9%] sm:before:basis-[20%] sm:after:basis-[20%] lg:before:basis-[30.5%] lg:after:basis-[30.5%]" : "before:shrink-0 before:basis-[9%] after:shrink-0 after:basis-[9%] min-[480px]:before:basis-[10%] min-[480px]:after:basis-[10%] sm:before:basis-[26%] sm:after:basis-[26%] lg:before:basis-[34.5%] lg:after:basis-[34.5%]"}`}
          >
            {rendered.map((item, physical) => {
              const index = realIndex(physical);
              const selected = physical === (looping ? position : 0);
              const next = looping && position + 1 === physical;
              const previous = looping && position - 1 === physical;
              const clone =
                looping && (physical === 0 || physical === items.length + 1);
              return (
                <li
                  key={`${item.slug}-${physical}`}
                  ref={(node) => {
                    slides.current[physical] = node;
                  }}
                  data-clone={clone ? "" : undefined}
                  aria-hidden={clone ? true : undefined}
                  inert={clone}
                  className={`carousel-slide flex h-auto shrink-0 snap-center items-stretch transition-opacity duration-500 ease-out motion-reduce:transition-none ${coverflow ? "basis-[80%] [perspective:900px] [transform-style:preserve-3d] min-[480px]:basis-[78%] sm:basis-[60%] lg:basis-[39%]" : "basis-[72%] min-[480px]:basis-[76%] sm:basis-[46%] lg:basis-[31%]"} ${selected ? "carousel-slide-active opacity-100" : next ? "carousel-slide-next opacity-75" : previous ? "carousel-slide-prev opacity-75" : "opacity-35"} motion-reduce:opacity-100`}
                  aria-label={`اسلاید ${new Intl.NumberFormat("fa-IR").format(index + 1)} از ${new Intl.NumberFormat("fa-IR").format(items.length)}`}
                >
                  {props.kind === "testimonials" ? (
                    <ReviewCard
                      item={item as Review}
                      active={selected}
                      reduceMotion={reduceMotion}
                      depthClass={
                        selected
                          ? ""
                          : next
                            ? "[transform:translate3d(48px,0,-170px)_rotateY(-23deg)] blur-[0.7px] motion-reduce:blur-none"
                            : previous
                              ? "[transform:translate3d(-48px,0,-170px)_rotateY(23deg)] blur-[0.7px] motion-reduce:blur-none"
                              : "[transform:translate3d(0,0,-180px)_scale(.95)]"
                      }
                    />
                  ) : props.kind === "articles" ? (
                    <ArticleCard
                      item={item as Article}
                      active={selected}
                      reduceMotion={reduceMotion}
                    />
                  ) : (
                    <WorkshopCard item={item as Workshop} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${publicContainerClassName}`}>
        <div className="slider-footer flex items-center justify-end gap-3 pt-6">
          <div className="slider-arrows inline-flex items-center gap-2">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-zinc-700 dark:hover:text-white"
              aria-label={c.next}
              onClick={() => move(1)}
              disabled={items.length < 2}
            >
              <i className="ph-bold ph-arrow-right text-[14px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-zinc-700 dark:hover:text-white"
              aria-label={c.prev}
              onClick={() => move(-1)}
              disabled={items.length < 2}
            >
              <i className="ph-bold ph-arrow-left text-[14px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
// A restrained, slow border breath: no card movement, and no loop for reduced motion.
function BorderBreath({
  reduceMotion,
  article = false,
}: {
  reduceMotion: boolean;
  article?: boolean;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`carousel-breathing-rim pointer-events-none absolute inset-[2px] z-[2] border border-[#62ad9a] [box-shadow:inset_0_0_9px_#6ab9a323] dark:border-[#80dec4] dark:[box-shadow:inset_0_0_12px_#6fe2bc27] ${article ? "rounded-[22px]" : "rounded-[28px]"}`}
      initial={reduceMotion ? false : { opacity: 0.18 }}
      animate={reduceMotion ? { opacity: 0.3 } : { opacity: 0.48 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 3.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }
      }
    />
  );
}
function ReviewCard({
  item,
  depthClass,
  active,
  reduceMotion,
}: {
  item: Review;
  depthClass: string;
  active: boolean;
  reduceMotion: boolean;
}) {
  const avatar = testimonialPortrait(item);
  const [hovered, setHovered] = useState(false);
  return (
    <figure
      className={`${publicTestimonialClassName} h-full flex-auto ${depthClass}`}
    >
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
          {avatar && (
            <Image
              src={avatar}
              width={120}
              height={120}
              sizes="48px"
              className="absolute inset-0 size-full rounded-full object-cover"
              alt=""
            />
          )}
        </span>
        <span className="testimonial-who flex min-w-0 flex-col gap-0.5">
          <span className="testimonial-name text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {item.name}
          </span>
          <span className="testimonial-role text-xs text-zinc-500 dark:text-zinc-400">
            {item.category === "couples"
              ? "مشاورهٔ زوجی"
              : item.category === "individual"
                ? "مشاورهٔ فردی"
                : item.category}
          </span>
        </span>
        <span className="testimonial-badge ms-auto rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-teal-500">
          {item.experience}
        </span>
      </figcaption>
    </figure>
  );
}
function ArticleCard({
  item,
  active,
  reduceMotion,
}: {
  item: Article;
  active: boolean;
  reduceMotion: boolean;
}) {
  return (
    <Link
      href={`/articles/${item.slug}`}
      className={`${publicCardClassName} ${publicSpotClassName} group art-carousel-card flex h-full w-full min-w-0 flex-col !p-4 hover:no-underline! focus-visible:no-underline! focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#247d72] ${artSurfaceClassName} ${neonArticleCardClassName} ${active ? neonArticleActiveClassName : ""}`}
    >
      {active && <BorderBreath reduceMotion={reduceMotion} article />}
      <div className="art-cover-media relative isolate min-w-0 flex-none">
        <div className={referenceCoverClassName}>
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
        <ArticleEmblem
          visual={item.visual}
          slug={item.slug}
          className={artSealCompactClassName}
        />
      </div>
      <div className="mx-[0.65rem] mt-4 flex flex-wrap items-center gap-2.5">
        <span
          className={`${publicChipClassName} !border-[#84b9aa]/55 !bg-[#87c3ad]/15 !py-1 !text-[.75rem] !text-[#2b7168] dark:!border-[#69c4b3]/35 dark:!bg-[#62c5a5]/10 dark:!text-[#b8f4dc]`}
        >
          {item.category}
        </span>
      </div>
      <h3
        className={`${publicH3ClassName} mx-[0.65rem] mt-3 break-words text-[#244247]! dark:text-[#f0fcf8]!`}
      >
        {item.title}
      </h3>
      <p className="text-muted mx-[0.65rem] mt-3 text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">
        {item.excerpt}
      </p>
      <span
        className={`art-carousel-read mx-[.65rem]! mt-auto! group-hover:motion-safe:-translate-y-0.5 motion-reduce:transform-none! ${articleActionClassName} hover:no-underline! [&&]:border-[#9eb6dc]! [&&]:bg-[#ebf1fd]! [&&]:text-[#294d80]! [&&]:hover:bg-[#dce7fa]! [&&]:hover:text-[#213e70]! dark:[&&]:border-[#7287b2]! dark:[&&]:bg-[#293654]! dark:[&&]:text-[#e0eafb]! dark:[&&]:hover:bg-[#3a4b73]! dark:[&&]:hover:text-white!`}
      >
        خواندن مقاله
        <i
          className={`ph-bold ph-arrow-left ${articleActionIconClassName} group-hover:motion-safe:-translate-x-[3px]`}
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}
function WorkshopCard({ item }: { item: Workshop }) {
  return (
    <Link
      href={`/workshops/${item.slug}`}
      className={`${publicCardClassName} ${publicSpotClassName} group art-carousel-card flex h-full w-full min-w-0 flex-col !p-4 ${artSurfaceClassName}`}
    >
      <div className="art-cover-media relative isolate min-w-0 flex-none">
        <div className={referenceCoverClassName}>
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
        <span
          className={`${artSealClassName} ${artSealCompactClassName}`}
          aria-hidden="true"
        >
          <i className="ph-duotone ph-users-three" />
        </span>
      </div>
      <span className="text-muted mx-[0.65rem] mt-4 text-xs font-extrabold tracking-wide">
        {item.mode === "online" ? "آنلاین" : "حضوری"}
      </span>
      <h3 className={`${publicH3ClassName} mx-[0.65rem] mt-2 break-words`}>
        {item.title}
      </h3>
      <p className="text-muted mx-[0.65rem] mt-2 text-xs font-bold">
        {formatToman(workshopPrice(item).total)}
        {workshopPrice(item).percent > 0 && (
          <span className="font-extrabold text-[#10665f] dark:text-[#8fe4d6]">
            {" "}
            · ٪
            {new Intl.NumberFormat("fa-IR").format(
              workshopPrice(item).percent,
            )}{" "}
            تخفیف
          </span>
        )}
      </p>
      <p className="text-muted mx-[0.65rem] mt-3 text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">
        {item.description}
      </p>
      <span className="mx-[0.65rem] mt-5 inline-flex grow items-center gap-1.5 pt-2 text-sm font-bold text-[#126c68] dark:text-[#8fe4d6]">
        جزئیات کارگاه
        <i className="ph-bold ph-arrow-left" aria-hidden="true" />
      </span>
    </Link>
  );
}
