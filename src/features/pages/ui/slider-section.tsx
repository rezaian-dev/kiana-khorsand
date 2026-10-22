"use client";

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
import { SliderDots } from "@/components/slider/slider-dots";
import {
  publicContainerClassName,
  publicSectionClassName,
} from "@/components/layout/public-layout-classes";
import {
  publicEyebrowClassName,
  publicH2ClassName,
} from "@/components/layout/public-type-classes";
import { publicButtonSoftClassName } from "@/components/layout/public-button-classes";

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
  loop?: boolean;
  autoplay?: boolean;
  live?: boolean;
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
  loop = false,
  autoplay = false,
  live = false,
  mobileBasis = "basis-[88%] sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333%-1rem)]",
  className = "",
}: SliderSectionProps) {
  const {
    emblaRef,
    selectedIndex,
    snapCount,
    canPrev,
    canNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    isPlaying,
    togglePlay,
  } = useSlider({ slideCount: slides.length, loop, autoplay });

  const editorial = variant === "editorial";

  return (
    <Slider
      emblaRef={emblaRef}
      selectedIndex={selectedIndex}
      snapCount={snapCount}
      canPrev={canPrev}
      canNext={canNext}
      scrollPrev={scrollPrev}
      scrollNext={scrollNext}
      scrollTo={scrollTo}
      isPlaying={isPlaying}
      togglePlay={togglePlay}
      labelId={id}
      className={editorial ? "editorial-slider" : undefined}
    >
      {/* A plain <section> (no accessible name) keeps a single carousel landmark:
          the labelled region is the Slider root, per the APG carousel pattern. */}
      <section className={`${publicSectionClassName} ${className}`}>
        <div
          className={`${publicContainerClassName} flex items-end justify-between gap-5 max-[620.02px]:flex-col max-[620.02px]:items-start`}
        >
          <div className="min-w-0 max-w-[52ch]">
            <p className={`${publicEyebrowClassName} ${editorial ? "text-[#19776e]! dark:text-[#9ce5d2]!" : ""}`}>
              {eyebrow}
            </p>
            <h2
              id={id}
              className={`${publicH2ClassName} mt-4 text-start ${editorial ? "text-[var(--fg)]!" : ""}`}
            >
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-start text-sm leading-7 text-[var(--site-muted)]">
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
          {/* Edge fade lives on the inline-end side (left in RTL) and disappears once
              several slides fit, so neighbours are never hard-clipped. */}
          <SliderViewport className="[mask-image:linear-gradient(to_left,black_86%,transparent_100%)] [mask-repeat:no-repeat] md:[mask-image:none]">
            <SliderTrack live={live} className="gap-4 sm:gap-5 lg:gap-6">
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

          <SliderControls showPlayPause={autoplay}>
            <SliderDots />
          </SliderControls>
        </div>
      </section>
    </Slider>
  );
}
