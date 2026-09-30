"use client";

import { useCallback, useEffect, useSyncExternalStore, type ComponentProps, type KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { cn } from "cn";
import { CarouselContext, type CarouselProps } from "./carousel-context";

type Props = ComponentProps<"div"> & CarouselProps;

export function Carousel({ orientation = "horizontal", opts, plugins, setApi, className, children, ...props }: Props) {
  const [carouselRef, api] = useEmblaCarousel({ align: "start", ...opts, direction: "rtl", axis: orientation === "horizontal" ? "x" : "y" }, plugins);
  const initial = `${Boolean(opts?.loop)}:true`;
  const subscribe = useCallback((onChange: () => void) => {
    if (!api) return () => {};
    api.on("select", onChange).on("reInit", onChange);
    return () => { api.off("select", onChange).off("reInit", onChange); };
  }, [api]);
  const snapshot = useSyncExternalStore(subscribe, () => api ? `${api.canScrollPrev()}:${api.canScrollNext()}` : initial, () => initial);
  const [previous, next] = snapshot.split(":");
  const canScrollPrev = previous === "true";
  const canScrollNext = next === "true";
  const isReduced = useReducedMotion();
  const scrollPrev = useCallback(() => api?.scrollPrev(Boolean(isReduced)), [api, isReduced]);
  const scrollNext = useCallback(() => api?.scrollNext(Boolean(isReduced)), [api, isReduced]);
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key === "ArrowRight") { event.preventDefault(); scrollPrev(); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); scrollNext(); }
  }
  useEffect(() => { if (api && setApi) setApi(api); }, [api, setApi]);
  return <CarouselContext.Provider value={{ carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}><div role="region" aria-roledescription="اسلایدر" data-slot="carousel" dir="rtl" onKeyDownCapture={handleKeyDown} className={cn("carousel", className)} {...props}>{children}</div></CarouselContext.Provider>;
}
