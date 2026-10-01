"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";
import { CarouselContent } from "@/components/ui/carousel-content";
import { CarouselItem } from "@/components/ui/carousel-item";
import { CarouselPrevious } from "@/components/ui/carousel-previous";
import { CarouselNext } from "@/components/ui/carousel-next";
import type { CarouselApi } from "@/components/ui/carousel-context";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/format";

type Props = { slides: readonly { key: string; content: ReactNode }[]; label: string };

export function SlideRail({ slides, label }: Props) {
  const selectedKey = useRef<string | undefined>(slides[0]?.key);
  const isApplying = useRef(false);
  const slideKeys = JSON.stringify(slides.map((slide) => slide.key));
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  const isInView = useInView(scope, { amount: 0.2 });
  const isReduced = useReducedMotion();
  const autoplay = useMemo(() => Autoplay({ delay: 6500, playOnInit: false, stopOnInteraction: true, stopOnMouseEnter: true, stopOnFocusIn: true }), []);
  const plugins = useMemo(() => [autoplay], [autoplay]);
  const subscribe = useCallback((onChange: () => void) => {
    if (!api) return () => {};
    api.on("select", onChange).on("reInit", onChange);
    return () => { api.off("select", onChange).off("reInit", onChange); };
  }, [api]);
  useEffect(() => {
    if (!api) return;
    function handleSelection() {
      if (!api || isApplying.current) return;
      selectedKey.current = api.slideNodes()[api.selectedScrollSnap()]?.dataset.slideKey;
    }
    api.on("select", handleSelection);
    return () => { api.off("select", handleSelection); };
  }, [api]);
  useLayoutEffect(() => {
    if (!api) return;
    isApplying.current = true;
    const previous = api.selectedScrollSnap();
    api.reInit();
    const index = api.slideNodes().findIndex((node) => node.dataset.slideKey === selectedKey.current);
    api.scrollTo(Math.min(index < 0 ? previous : index, Math.max(0, api.scrollSnapList().length - 1)), true);
    selectedKey.current = api.slideNodes()[api.selectedScrollSnap()]?.dataset.slideKey;
    isApplying.current = false;
  }, [api, slideKeys]);
  const snapshot = useSyncExternalStore(subscribe, () => `${api?.selectedScrollSnap() ?? 0}:${api?.scrollSnapList().length ?? slides.length}`, () => `0:${slides.length}`);
  const [selection, count] = snapshot.split(":");
  const selected = Number(selection);
  const snapCount = Number(count);
  useEffect(() => {
    function handleVisibility() { setIsHidden(document.hidden); }
    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
  useEffect(() => {
    if (!api) return;
    function handlePlayback() {
      if (!api || api.scrollSnapList().length < 2 || isReduced || isPaused || hasHover || hasFocus || isHidden || !isInView) autoplay.stop();
      else autoplay.play();
    }
    handlePlayback();
    api.on("reInit", handlePlayback);
    return () => { api.off("reInit", handlePlayback); autoplay.stop(); };
  }, [api, autoplay, isReduced, isPaused, hasHover, hasFocus, isHidden, isInView]);
  return (
    <div ref={scope} onMouseEnter={() => setHasHover(true)} onMouseLeave={() => setHasHover(false)} onFocusCapture={() => setHasFocus(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false); }}>
      <Carousel opts={{ direction: "rtl", loop: true, containScroll: "trimSnaps", watchSlides: false }} plugins={plugins} setApi={setApi} aria-label={label} data-count={slides.length}>
        <CarouselContent>{slides.map((slide, index) => <CarouselItem key={slide.key} data-slide-key={slide.key} aria-label={`${formatNumber(index + 1)} از ${formatNumber(slides.length)}`}>{slide.content}</CarouselItem>)}</CarouselContent>
        <div className="carousel-controls">
          <div className="control-group"><CarouselPrevious /><CarouselNext /><Button type="button" variant="ghost" size="icon" className="autoplay-toggle" aria-label={isPaused ? "شروع پخش خودکار" : "توقف پخش خودکار"} onClick={() => setIsPaused(!isPaused)}>{isPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</Button></div>
          <div className="carousel-dots" role="group" aria-label="انتخاب اسلاید">{slides.map((slide, index) => <button key={slide.key} type="button" disabled={index >= snapCount} aria-label={`رفتن به اسلاید ${formatNumber(index + 1)}`} aria-current={selected === index ? "true" : undefined} onClick={() => { autoplay.stop(); setIsPaused(true); api?.scrollTo(index, Boolean(isReduced)); }}><span /></button>)}</div>
        </div>
      </Carousel>
    </div>
  );
}
