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
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

/** Principled infinite scroll: instant mount, rAF-throttled tracking, no jumps. */
export function ReferenceCarousel(props: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLLIElement | null)[]>([]);
  const [position, setPosition] = useState(1);
  const current = useRef(1);
  const programmaticTarget = useRef<number | null>(null);
  const isAnimating = useRef(false);
  const rafScroll = useRef<number | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  // Center helper: native scrollIntoView handles RTL/LTR. During programmatic
  // smooth moves we temporarily disable snap to prevent snap-vs-smooth fight (the tick).
  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const root = viewport.current;
      const slide = slides.current[index];
      if (!root || !slide) return;
      const isInstant = behavior === "instant";
      if (!isInstant) {
        // Disable snap for the duration of smooth travel
        (root as HTMLElement).style.scrollSnapType = "none";
      }
      const prev = root.style.scrollBehavior;
      root.style.scrollBehavior = isInstant ? "auto" : behavior;
      slide.scrollIntoView({
        behavior: isInstant ? ("instant" as unknown as ScrollBehavior) : behavior,
        block: "nearest",
        inline: "center",
      });
      if (prev) root.style.scrollBehavior = prev;
      else root.style.removeProperty("scroll-behavior");
      if (!isInstant) {
        window.setTimeout(() => (root as HTMLElement).style.removeProperty("scroll-snap-type"), 680);
      }
    },
    []
  );

  const settle = useCallback(() => {
    const root = viewport.current;
    if (!root || !looping) return;
    // Only jump when we are truly at a clone and the programmatic scroll finished
    if (programmaticTarget.current !== null) return;
    if (isAnimating.current) return;
    if (current.current === 0 || current.current === items.length + 1) {
      const landing = current.current === 0 ? items.length : 1;
      current.current = landing;
      setPosition(landing);
      // Instant jump — no animation, no visible flash because slide content is identical
      scrollToIndex(landing, "instant");
    }
  }, [items.length, looping, scrollToIndex]);

  const move = useCallback(
    (step: number) => {
      if (!looping) return;
      if (isAnimating.current) return;
      // If we are sitting on a clone, settle instantly before calculating next
      if (current.current === 0 || current.current === items.length + 1) settle();
      const next = Math.max(0, Math.min(items.length + 1, current.current + step));
      current.current = next;
      setPosition(next);
      programmaticTarget.current = next;
      isAnimating.current = true;
      scrollToIndex(next, reduceMotion ? "instant" : "smooth");
      // Safety: if scrollend never fires (old Safari), clear the lock
      window.setTimeout(() => {
        isAnimating.current = false;
        if (programmaticTarget.current === next) programmaticTarget.current = null;
      }, 700);
    },
    [items.length, looping, reduceMotion, scrollToIndex, settle]
  );

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
    const images = [...root.querySelectorAll<HTMLImageElement>(".art-carousel-card img")];
    const reset = () => {
      if (media.matches) for (const image of images) animate(image, { scale: 1 }, { duration: 0 });
    };
    const listeners = [...root.querySelectorAll<HTMLElement>(".art-carousel-card")].map((card) =>
      hover(card, () => {
        const image = card.querySelector<HTMLImageElement>("img");
        if (!image || media.matches) return;
        animate(image, { scale: 1.035 }, { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] });
        return () => {
          animate(image, { scale: 1 }, { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] });
        };
      })
    );
    media.addEventListener("change", reset);
    return () => {
      listeners.forEach((stop) => stop());
      media.removeEventListener("change", reset);
    };
  }, [props.kind, items.length]);

  // Principled mount: position instantly BEFORE paint so user never sees the jump
  useLayoutEffect(() => {
    const root = viewport.current;
    if (!root) return;
    const target = looping ? 1 : 0;
    current.current = target;
    setPosition(target);
    // Hide until positioned to avoid FOUC, then instantly center
    scrollToIndex(target, "instant");
    // Next frame: allow transitions and reveal
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMounted(true));
    });
    return () => cancelAnimationFrame(id);
  }, [looping, scrollToIndex, items.length]);

  // Keep centered on resize without animation — prevents drift/jump
  useEffect(() => {
    const root = viewport.current;
    if (!root) return;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        scrollToIndex(current.current, "instant");
      });
      ro.observe(root);
    }
    const onResize = () => scrollToIndex(current.current, "instant");
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [scrollToIndex]);

  const trackScroll = useCallback(() => {
    if (rafScroll.current !== null) return;
    rafScroll.current = requestAnimationFrame(() => {
      rafScroll.current = null;
      const root = viewport.current;
      if (!root) return;
      const dragging = (root as HTMLElement & { dataset: DOMStringMap }).dataset.dragging === "true";
      if (dragging) return;
      // While a button-driven smooth is in flight, never update position mid-flight — the tick
      if (isAnimating.current || programmaticTarget.current !== null) return;
      const frame = root.getBoundingClientRect();
      const middle = frame.left + frame.width / 2;
      let best = current.current;
      let gapBest = Infinity;
      for (let i = 0; i < slides.current.length; i++) {
        const slide = slides.current[i];
        if (!slide) continue;
        const box = slide.getBoundingClientRect();
        const gap = Math.abs(box.left + box.width / 2 - middle);
        if (gap < gapBest) {
          gapBest = gap;
          best = i;
        }
      }
      if (best !== current.current) {
        current.current = best;
        setPosition(best);
      }
    });
  }, []);

  const handleScrollEnd = useCallback(() => {
    // Find the true center after any user swipe (snap has settled)
    const root = viewport.current;
    if (root && !isAnimating.current && programmaticTarget.current === null) {
      const frame = root.getBoundingClientRect();
      const middle = frame.left + frame.width / 2;
      let best = current.current;
      let gapBest = Infinity;
      for (let i = 0; i < slides.current.length; i++) {
        const s = slides.current[i];
        if (!s) continue;
        const box = s.getBoundingClientRect();
        const gap = Math.abs(box.left + box.width / 2 - middle);
        if (gap < gapBest) {
          gapBest = gap;
          best = i;
        }
      }
      if (best !== current.current) {
        current.current = best;
        setPosition(best);
      }
    }
    programmaticTarget.current = null;
    isAnimating.current = false;
    settle();
  }, [settle]);

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
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={viewport}
          className={`carousel ${coverflow && !reduceMotion ? "carousel-coverflow carousel-3d" : ""} relative z-10 snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] overflow-x-auto! overflow-y-hidden! overscroll-x-contain scroll-smooth motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden ${coverflow ? "pt-4 pb-8" : "pt-[.6rem] pb-4"} ${mounted ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          role="region"
          aria-roledescription="اسلایدر"
          aria-label={c.title}
          onScroll={trackScroll}
          // eslint-disable-next-line react/no-unknown-property
          onScrollEnd={handleScrollEnd}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            if (["INPUT", "TEXTAREA", "SELECT"].includes((event.target as HTMLElement).tagName)) return;
            event.preventDefault();
            move(event.key === "ArrowLeft" ? 1 : -1);
          }}
          onTouchStart={() => {
            programmaticTarget.current = null;
          }}
          onPointerDown={(event) => {
            programmaticTarget.current = null;
            if (event.pointerType !== "mouse") return;
            // Disable snap + smooth during drag to prevent fight
            event.currentTarget.dataset.dragging = "true";
            event.currentTarget.classList.add("snap-none!");
            (event.currentTarget as HTMLElement).style.scrollSnapType = "none";
            (event.currentTarget as HTMLElement).style.scrollBehavior = "auto";
          }}
          onPointerUp={(event) => {
            const el = event.currentTarget as HTMLElement;
            delete el.dataset.dragging;
            el.classList.remove("snap-none!");
            el.style.removeProperty("scroll-snap-type");
            el.style.removeProperty("scroll-behavior");
            trackScroll();
            // Re-snap to nearest after drag ends
            requestAnimationFrame(() => scrollToIndex(current.current, "smooth"));
          }}
          onPointerCancel={(event) => {
            const el = event.currentTarget as HTMLElement;
            delete el.dataset.dragging;
            el.classList.remove("snap-none!");
            el.style.removeProperty("scroll-snap-type");
            el.style.removeProperty("scroll-behavior");
          }}
          onPointerLeave={(event) => {
            const el = event.currentTarget as HTMLElement;
            if (el.dataset.dragging) {
              delete el.dataset.dragging;
              el.classList.remove("snap-none!");
              el.style.removeProperty("scroll-snap-type");
              el.style.removeProperty("scroll-behavior");
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
              const clone = looping && (physical === 0 || physical === items.length + 1);
              return (
                <li
                  key={`${item.slug}-${physical}`}
                  ref={(node) => {
                    slides.current[physical] = node;
                  }}
                  data-clone={clone ? "" : undefined}
                  aria-hidden={clone ? true : undefined}
                  inert={clone ? true : undefined}
                  className={`carousel-slide flex h-auto shrink-0 snap-center items-stretch ${coverflow ? "transition-opacity duration-500 ease-out motion-reduce:transition-none" : ""} ${coverflow ? "basis-[80%] [perspective:900px] [transform-style:preserve-3d] min-[480px]:basis-[78%] sm:basis-[60%] lg:basis-[39%]" : "basis-[72%] min-[480px]:basis-[76%] sm:basis-[46%] lg:basis-[31%]"} ${coverflow ? (selected ? "carousel-slide-active opacity-100" : next || previous ? "carousel-slide-next opacity-70" : "opacity-35") : "opacity-100"} motion-reduce:opacity-100`}
                  aria-label={`اسلاید ${new Intl.NumberFormat("fa-IR").format(index + 1)} از ${new Intl.NumberFormat("fa-IR").format(items.length)}`}
                >
                  {props.kind === "testimonials" ? (
                    <ReviewCard
                      item={item as Review}
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
                    <ArticleCard item={item as Article} active={selected} />
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
function ReviewCard({
  item,
  depthClass,
}: {
  item: Review;
  depthClass: string;
}) {
  return (
    <figure className={`${publicTestimonialClassName} h-full flex-auto ${depthClass}`}>
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
          {item.avatar ? null : null}
          {(() => {
            const avatar = testimonialPortrait(item);
            return avatar ? (
              <Image
                src={avatar}
                width={120}
                height={120}
                sizes="48px"
                className="absolute inset-0 size-full rounded-full object-cover"
                alt=""
              />
            ) : null;
          })()}
        </span>
        <span className="testimonial-who flex min-w-0 flex-col gap-0.5">
          <span className="testimonial-name text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.name}</span>
          <span className="testimonial-role text-xs text-zinc-500 dark:text-zinc-300">
            {item.category === "couples" ? "مشاورهٔ زوجی" : item.category === "individual" ? "مشاورهٔ فردی" : item.category}
          </span>
        </span>
        <span className="testimonial-badge ms-auto rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-teal-500">
          {item.experience}
        </span>
      </figcaption>
    </figure>
  );
}
function ArticleCard({ item, active }: { item: Article; active: boolean }) {
  return (
    <Link
      href={`/articles/${item.slug}`}
      className={`${publicCardClassName} ${publicSpotClassName} group art-carousel-card flex h-full w-full min-w-0 flex-col !p-4 hover:no-underline! focus-visible:no-underline! focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#247d72] ${artSurfaceClassName} ${neonArticleCardClassName} ${active ? neonArticleActiveClassName : ""}`}
    >
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
        <ArticleEmblem visual={item.visual} slug={item.slug} className={artSealCompactClassName} />
      </div>
      <div className="mx-[0.65rem] mt-4 flex flex-wrap items-center gap-2.5">
        <span
          className={`${publicChipClassName} !border-[#84b9aa]/55 !bg-[#87c3ad]/15 !py-1 !text-[.75rem] !text-[#2b7168] dark:!border-[#69c4b3]/35 dark:!bg-[#62c5a5]/10 dark:!text-[#b8f4dc]`}
        >
          {item.category}
        </span>
      </div>
      <h3 className={`${publicH3ClassName} mx-[0.65rem] mt-3 break-words text-[#244247]! dark:text-[#f0fcf8]!`}>{item.title}</h3>
      <p className="text-muted mx-[0.65rem] mt-3 text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">{item.excerpt}</p>
      <span
        className={`art-carousel-read mx-[.65rem]! mt-auto! group-hover:motion-safe:-translate-y-0.5 motion-reduce:transform-none! ${articleActionClassName} hover:no-underline! [&&]:border-[#9eb6dc]! [&&]:bg-[#ebf1fd]! [&&]:text-[#294d80]! [&&]:hover:bg-[#dce7fa]! [&&]:hover:text-[#213e70]! dark:[&&]:border-[#7287b2]! dark:[&&]:bg-[#293654]! dark:[&&]:text-[#e0eafb]! dark:[&&]:hover:bg-[#3a4b73]! dark:[&&]:hover:text-white!`}
      >
        خواندن مقاله
        <i className={`ph-bold ph-arrow-left ${articleActionIconClassName} group-hover:motion-safe:-translate-x-[3px]`} aria-hidden="true" />
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
        <span className={`${artSealClassName} ${artSealCompactClassName}`} aria-hidden="true">
          <i className="ph-duotone ph-users-three" />
        </span>
      </div>
      <span className="text-muted mx-[0.65rem] mt-4 text-xs font-extrabold tracking-wide">
        {item.mode === "online" ? "آنلاین" : "حضوری"}
      </span>
      <h3 className={`${publicH3ClassName} mx-[0.65rem] mt-2 break-words`}>{item.title}</h3>
      <p className="text-muted mx-[0.65rem] mt-2 text-xs font-bold">
        {formatToman(workshopPrice(item).total)}
        {workshopPrice(item).percent > 0 && (
          <span className="font-extrabold text-[#10665f] dark:text-[#8fe4d6]">
            {" "}
            · ٪{new Intl.NumberFormat("fa-IR").format(workshopPrice(item).percent)} تخفیف
          </span>
        )}
      </p>
      <p className="text-muted mx-[0.65rem] mt-3 text-sm leading-7 break-words text-[#516e6a]! dark:text-[#b9d0cc]!">{item.description}</p>
      <span className="mx-[0.65rem] mt-5 inline-flex grow items-center gap-1.5 pt-2 text-sm font-bold text-[#126c68] dark:text-[#8fe4d6]">
        جزئیات کارگاه
        <i className="ph-bold ph-arrow-left" aria-hidden="true" />
      </span>
    </Link>
  );
}
