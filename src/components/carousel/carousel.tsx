"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CarouselContextValue = {
  emblaRef: (node: HTMLElement | null) => void;
  selected: number;
  canPrev: boolean;
  canNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

export function useCarouselContext() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("Carousel components must be inside <Carousel>");
  return ctx;
}

export function Carousel({
  children,
  emblaRef,
  selected,
  canPrev,
  canNext,
  scrollPrev,
  scrollNext,
  className,
}: React.PropsWithChildren<{
  emblaRef: (node: HTMLElement | null) => void;
  selected: number;
  canPrev: boolean;
  canNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  className?: string;
}>) {
  const value = React.useMemo(
    () => ({ emblaRef, selected, canPrev, canNext, scrollPrev, scrollNext }),
    [emblaRef, selected, canPrev, canNext, scrollPrev, scrollNext],
  );

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn("carousel-root", className)}>{children}</div>
    </CarouselContext.Provider>
  );
}
