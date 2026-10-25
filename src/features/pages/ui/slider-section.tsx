"use client";

import {
  publicContainerClassName,
  publicSectionClassName,
  publicEyebrowClassName,
  publicH2ClassName,
  publicButtonSoftClassName,
} from "@/components/layout/public-styles";

import type { ReactNode } from "react";
import Link from "next/link";
import { useSlider } from "@/components/slider/use-slider";
import {
  Slider,
  SliderSlide,
  SliderTrack,
  SliderViewport,
} from "@/components/slider/slider";
import { SliderControls } from "@/components/slider/slider-controls";

/**
 * Client shell around the shared slider. All card content arrives as `slides`
 * (server-rendered nodes), so only navigation state lives on the client.
 */
export type SliderSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  slides: ReactNode[];
  variant?: "editorial" | "plain";
  autoplay?: boolean;
  mobileBasis?: string;
  className?: string;
};

export function SliderSection({
  id,
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  slides,
  variant = "plain",
  autoplay = false,
  mobileBasis = "basis-full sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-1rem)]",
  className = "",
}: SliderSectionProps) {
  const {
    emblaRef,
    selectedIndex,
    snapCount,
    canPrev,
    canNext,
    isPlaying,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useSlider({ slideCount: slides.length, autoplay });

  const editorial = variant === "editorial";

  return (
    <Slider
      emblaRef={emblaRef}
      selectedIndex={selectedIndex}
      snapCount={snapCount}
      canPrev={canPrev}
      canNext={canNext}
      isPlaying={isPlaying}
      scrollPrev={scrollPrev}
      scrollNext={scrollNext}
      scrollTo={scrollTo}
      labelId={id}
      className={editorial ? "editorial-slider" : undefined}
    >
      {/* A plain <section> (no accessible name) keeps a single carousel landmark:
          the labelled region is the Slider root, per the APG carousel pattern. */}
      <section className={`${publicSectionClassName} ${className}`}>
        <div
          className={`${publicContainerClassName} flex items-end justify-between gap-5 max-[620.02px]:flex-col max-[620.02px]:items-start`}
        >
          <div className="max-w-[52ch] min-w-0">
            <p
              className={`${publicEyebrowClassName} ${editorial ? "text-[#19776e]! dark:text-[#9ce5d2]!" : ""}`}
            >
              {eyebrow}
            </p>
            <h2
              id={id}
              className={`${publicH2ClassName} mt-4 text-start ${editorial ? "text-(--fg)!" : ""}`}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-start text-sm/7 text-(--site-muted)">
                {description}
              </p>
            )}
          </div>
          {href && linkLabel && (
            <Link
              href={href}
              className={`${publicButtonSoftClassName} flex-none max-[620.02px]:self-start`}
            >
              {linkLabel}
              <i className="ph-bold ph-arrow-left" aria-hidden="true" />
            </Link>
          )}
        </div>

        <div className={`${publicContainerClassName} mt-6 sm:mt-8`}>
          {/* Phones: the viewport carries a 6% gutter on each side and slides fill the
              rest, so the active card is centred on every snap — including the first and
              the last, which would otherwise stop flush against an edge. Neighbours still
              peek through the gutter. A whole-pixel gutter keeps Embla's integer offset
              maths exact instead of leaving a sub-pixel drift on each snap. */}
          <SliderViewport className="max-sm:px-[21px]">
            <SliderTrack live={!autoplay} className="gap-3 sm:gap-5 lg:gap-6">
              {slides.map((slide, index) => (
                <SliderSlide
                  key={index}
                  index={index}
                  total={slides.length}
                  className={mobileBasis}
                >
                  {/* Inactive slides shrink slightly but keep full opacity so body text
                      stays above the WCAG AA contrast floor in both themes. */}
                  <div
                    className={`h-full transition-transform duration-300 ease-out motion-reduce:transition-none ${
                      index === selectedIndex
                        ? "scale-100"
                        : "scale-[0.985] motion-reduce:scale-100"
                    }`}
                  >
                    {slide}
                  </div>
                </SliderSlide>
              ))}
            </SliderTrack>
          </SliderViewport>

          <SliderControls />
        </div>
      </section>
    </Slider>
  );
}
