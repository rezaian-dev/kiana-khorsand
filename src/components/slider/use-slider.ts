"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";

/**
 * Shared Embla state for every slider on the site.
 *
 * Three rules, applied here so no page can drift from them:
 * 1. The track never loops (`loop: false`) — first and last slides are real edges,
 *    so Previous/Next always show an honest disabled state.
 * 2. On phones the active slide is centred: `align: "center"` with
 *    `containScroll: false`, which is what lets the first and last slide reach the
 *    middle instead of stopping flush against the edge. From 640px up, where several
 *    cards are visible at once, the row aligns to the inline-start edge as before.
 * 3. Autoplay keeps the row moving and pauses on hover, on focus and for
 *    `prefers-reduced-motion` — the only pause affordance left now that the visible
 *    rotation button is gone: previous/next only.
 *
 * Sources:
 * - Options (direction, loop, align, containScroll, breakpoints):
 *   https://www.embla-carousel.com/api/options/
 * - Autoplay plugin: https://www.embla-carousel.com/plugins/autoplay/
 *
 * `direction: "rtl"` is required because the document is `dir="rtl"`; without it Embla
 * computes drag/prev/next coordinates for LTR and the arrows move the wrong way.
 */
export type UseSliderOptions = {
  slideCount: number;
  autoplay?: boolean;
  autoplayDelay?: number;
};

export function useSlider({
  slideCount,
  autoplay = false,
  autoplayDelay = 5000,
}: UseSliderOptions) {
  const options = useMemo<EmblaOptionsType>(
    () => ({
      direction: "rtl",
      loop: false,
      align: "center",
      slidesToScroll: 1,
      containScroll: false,
      breakpoints: {
        "(min-width: 640px)": { align: "start", containScroll: "trimSnaps" },
      },
      // Snap animation duration (Embla option `duration`, default 25). Users who ask
      // for reduced motion get an instant jump instead of a slide.
      duration:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 0
          : 22,
    }),
    [],
  );

  const plugins = useMemo(
    () =>
      autoplay
        ? [
            Autoplay({
              delay: autoplayDelay,
              // Started explicitly below so the reduced-motion policy always wins.
              playOnInit: false,
              // A swipe must not kill the rotation for good — there is no play button
              // to bring it back. Hover and focus still pause it (WCAG 2.2.2).
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
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
  // Mirrored on the root as `data-autoplay`; it also keeps the focus-pause honest
  // (a reader can tell whether the row is currently rotating).
  const [isPlaying, setIsPlaying] = useState(false);

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
      // WCAG 2.2.2 / reduced-motion: never start the rotation when motion is reduced.
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const applyPolicy = () => {
        if (reducedMotion.matches) playback.stop();
        else playback.play();
      };
      applyPolicy();
      // Embla re-inits its plugins on resize with `playOnInit: false`.
      emblaApi.on("reInit", applyPolicy);
      emblaApi.on("autoplay:play", sync);
      emblaApi.on("autoplay:stop", sync);

      // The visible rotation button is gone, so keyboard focus is the pause control:
      // focus anywhere inside the carousel (the arrows, a card link) stops the row,
      // and leaving it starts the row again. Embla's own `stopOnFocusIn` only reacts
      // to slide focus, and `rootNode()` is the viewport — the controls sit outside
      // it — so the listener goes on the carousel root instead.
      const root =
        emblaApi.containerNode().closest<HTMLElement>("[data-slider-root]") ??
        emblaApi.rootNode();
      const onFocusIn = () => {
        playback.stop();
        sync();
      };
      const onFocusOut = (event: FocusEvent) => {
        const next = event.relatedTarget as Node | null;
        if (next && root.contains(next)) return;
        applyPolicy();
        sync();
      };
      root.addEventListener("focusin", onFocusIn);
      root.addEventListener("focusout", onFocusOut);

      return () => {
        root.removeEventListener("focusin", onFocusIn);
        root.removeEventListener("focusout", onFocusOut);
        emblaApi.off("select", sync);
        emblaApi.off("reInit", sync);
        emblaApi.off("reInit", applyPolicy);
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
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    snapCount,
    canPrev,
    canNext,
    isPlaying,
    scrollPrev,
    scrollNext,
    scrollTo,
  };
}
