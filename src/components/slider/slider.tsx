"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Slider primitives (Client Components) — the only interactive part of a slider.
 * Cards and section copy are passed in as children/slots from Server Components.
 *
 * Accessibility follows the W3C APG Carousel pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
 */

type SliderContextValue = {
  emblaRef: (node: HTMLElement | null) => void;
  selectedIndex: number;
  snapCount: number;
  canPrev: boolean;
  canNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  isPlaying: boolean;
  togglePlay: () => void;
};

const SliderContext = React.createContext<SliderContextValue | null>(null);

export function useSliderContext() {
  const context = React.useContext(SliderContext);
  if (!context) throw new Error("Slider components must be rendered inside <Slider>.");
  return context;
}

const faNumber = new Intl.NumberFormat("fa-IR");
export const toFaDigits = (value: number) => faNumber.format(value);

type SliderProps = React.PropsWithChildren<{
  emblaRef: (node: HTMLElement | null) => void;
  selectedIndex: number;
  snapCount: number;
  canPrev: boolean;
  canNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  isPlaying?: boolean;
  togglePlay?: () => void;
  /** Accessible name. Prefer `labelId` so the visible heading names the carousel. */
  label?: string;
  labelId?: string;
  className?: string;
}>;

export function Slider({
  children,
  emblaRef,
  selectedIndex,
  snapCount,
  canPrev,
  canNext,
  scrollPrev,
  scrollNext,
  scrollTo,
  isPlaying = false,
  togglePlay,
  label,
  labelId,
  className,
}: SliderProps) {
  const value = React.useMemo(
    () => ({
      emblaRef,
      selectedIndex,
      snapCount,
      canPrev,
      canNext,
      scrollPrev,
      scrollNext,
      scrollTo,
      isPlaying,
      togglePlay: togglePlay ?? (() => {}),
    }),
    [
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
    ],
  );

  // `dir="rtl"` on the single root: the one source of direction. The viewport and
  // tracks inherit it; adding a second dir there is a competing source of truth.
  //
  // Keyboard support (optional per APG): ArrowLeft moves to the next slide and
  // ArrowRight to the previous one in RTL, matching the on-screen direction.
  // A native listener keeps the region non-interactive for a11y linters, while
  // arrow keys work as soon as focus is anywhere inside the slider.
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        if (event.key === "ArrowLeft") scrollNext();
        else scrollPrev();
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        scrollTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        scrollTo(Math.max(0, snapCount - 1));
      }
    };

    node.addEventListener("keydown", handleKeyDown);
    return () => node.removeEventListener("keydown", handleKeyDown);
  }, [scrollNext, scrollPrev, scrollTo, snapCount]);

  return (
    <SliderContext.Provider value={value}>
      <div
        role="region"
        aria-roledescription="carousel"
        // APG: name the carousel from its visible heading when there is one.
        aria-labelledby={labelId}
        aria-label={labelId ? undefined : label}
        ref={rootRef}
        dir="rtl"
        className={cn("slider-root", className)}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
}

export function SliderViewport({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { emblaRef } = useSliderContext();
  return (
    <div
      ref={emblaRef}
      className={cn("slider-viewport overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SliderTrack({
  children,
  live = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { live?: boolean }) {
  return (
    // APG: the wrapper around the slides is aria-atomic=false and aria-live=off while
    // the carousel rotates automatically, polite when it does not.
    // https://www.w3.org/WAI/ARIA/apg/patterns/carousel/#basic-carousel-elements
    <div
      aria-live={live ? "polite" : "off"}
      aria-atomic="false"
      className={cn(
        "slider-track flex touch-pan-y items-stretch py-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SliderSlide({
  children,
  index,
  total,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number; total: number }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${toFaDigits(index + 1)} از ${toFaDigits(total)}`}
      className={cn("slider-slide min-w-0 shrink-0 grow-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
