"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";

/**
 * useCarousel — shared Embla integration
 * Audit decision: single source of truth for direction/loop.
 * - HTML <html dir="rtl"> + DirectionProvider dir="rtl" already set globally
 * - Embla option direction:"rtl" is REQUIRED per 8.6.0 docs when HTML is RTL
 *   (not a blind override — verified against installed 8.6.0)
 * - No extra dir="rtl" on viewport, no row-reverse, no rotate — single source
 */

type UseCarouselOptions = {
  loop?: boolean;
  align?: EmblaOptionsType["align"];
  autoplay?: boolean;
  autoplayDelay?: number;
};

export function useCarousel({
  loop = true,
  align = "center",
  autoplay = true,
  autoplayDelay = 4500,
}: UseCarouselOptions = {}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align,
      direction: "rtl" as const, // required when html dir="rtl" per Embla 8.6.0 docs
      containScroll: "trimSnaps",
      slidesToScroll: 1,
      skipSnaps: false,
      dragFree: false,
    },
    autoplay
      ? [
          Autoplay({
            delay: autoplayDelay,
            stopOnInteraction: false, // keep autoplay after click per docs
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
            playOnInit: true,
          }),
        ]
      : [],
  );

  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
    // Required per official docs: start autoplay explicitly
    emblaApi.plugins().autoplay?.play();
    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi, update]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return {
    emblaRef,
    emblaApi,
    selected,
    canPrev: loop ? true : canPrev, // loop always can scroll per Embla docs
    canNext: loop ? true : canNext,
    scrollPrev,
    scrollNext,
  };
}
