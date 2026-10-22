"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";

/**
 * Shared Embla state for every slider on the site.
 *
 * Sources (installed versions: embla-carousel 8.6.0 / embla-carousel-autoplay 8.6.0):
 * - Options (direction, loop, align, containScroll): https://www.embla-carousel.com/api/options/
 * - Autoplay options/events: https://www.embla-carousel.com/plugins/autoplay/
 *
 * `direction: "rtl"` is required because the document is `dir="rtl"`; without it Embla
 * computes drag/prev/next coordinates for LTR and arrows move the wrong way.
 */
export type UseSliderOptions = {
  slideCount: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  align?: EmblaOptionsType["align"];
};

export function useSlider({
  slideCount,
  loop = false,
  autoplay = false,
  autoplayDelay = 5000,
  align = "start",
}: UseSliderOptions) {
  const options = useMemo<EmblaOptionsType>(
    () => ({
      direction: "rtl",
      loop,
      align,
      slidesToScroll: 1,
      containScroll: loop ? undefined : "trimSnaps",
      // Snap animation duration (Embla option `duration`, default 25). Users who ask
      // for reduced motion get an instant jump instead of a slide.
      duration:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : 22,
    }),
    [loop, align],
  );

  const plugins = useMemo(
    () =>
      autoplay
        ? [
            Autoplay({
              delay: autoplayDelay,
              // Started explicitly below so the reduced-motion policy always wins.
              // Embla Autoplay: https://www.embla-carousel.com/plugins/autoplay/
              playOnInit: false,
              stopOnInteraction: true, // WCAG 2.2.2 — user can stop the motion
              stopOnFocusIn: true,
              stopOnMouseEnter: true,
            }),
          ]
        : [],
    [autoplay, autoplayDelay],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  // Seeded from props so controls render stable sizes before Embla initialises (no CLS).
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(slideCount);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const userPaused = useRef(false);

  const sync = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setSnapCount(emblaApi.scrollSnapList().length);
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setIsPlaying(Boolean(emblaApi.plugins().autoplay?.isPlaying()));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    sync();

    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);

    const playback = emblaApi.plugins().autoplay;
    if (playback) {
      emblaApi.on("autoplay:play", sync);
      emblaApi.on("autoplay:stop", sync);

      // WCAG 2.2.2 / reduced-motion: never start automatically when motion is reduced.
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reducedMotion.matches) playback.stop();
      else playback.play();
      // Embla re-inits the plugins on resize; re-apply the policy only while the user
      // has not paused the rotation themselves.
      const reapply = () => {
        if (playback.isPlaying() || userPaused.current) return;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) playback.play();
      };
      emblaApi.on("reInit", reapply);
      return () => {
        emblaApi.off("select", sync);
        emblaApi.off("reInit", sync);
        emblaApi.off("reInit", reapply);
        emblaApi.off("autoplay:play", sync);
        emblaApi.off("autoplay:stop", sync);
      };
    }

    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi, sync]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);
  const togglePlay = useCallback(() => {
    const playback = emblaApi?.plugins().autoplay;
    if (!playback) return;
    if (playback.isPlaying()) {
      userPaused.current = true;
      playback.stop();
    } else {
      userPaused.current = false;
      playback.play();
    }
  }, [emblaApi]);

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    snapCount,
    canPrev,
    canNext,
    scrollPrev,
    scrollNext,
    scrollTo,
    isPlaying,
    togglePlay,
  };
}
