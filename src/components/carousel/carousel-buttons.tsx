"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useCarouselContext } from "./carousel";

/**
 * Navigation contract (audit requirement):
 * - Previous button: logical previous, visual ←, calls scrollPrev
 * - Next button: logical next, visual →, calls scrollNext
 * Icon mapping is explicit and decoupled from physical position.
 * Do not infer responsibility from left/right placement.
 */

const baseClasses =
  "grid size-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-40 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-zinc-700 dark:hover:text-white";

export function CarouselPrevButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollPrev, canPrev } = useCarouselContext();
  return (
    <button
      type="button"
      aria-label="Previous"
      aria-disabled={!canPrev}
      disabled={!canPrev && props.disabled}
      onClick={scrollPrev}
      className={cn(baseClasses, className)}
      {...props}
    >
      <i className="ph-bold ph-arrow-left text-[14px]" aria-hidden="true" />
    </button>
  );
}

export function CarouselNextButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollNext, canNext } = useCarouselContext();
  return (
    <button
      type="button"
      aria-label="Next"
      aria-disabled={!canNext}
      disabled={!canNext && props.disabled}
      onClick={scrollNext}
      className={cn(baseClasses, className)}
      {...props}
    >
      <i className="ph-bold ph-arrow-right text-[14px]" aria-hidden="true" />
    </button>
  );
}

// Explicit visual mapping for this project's convention:
// Next → , Previous ← (do not reverse silently for RTL)
export function CarouselPreviousButton(props: React.ComponentProps<"button"> & { label?: string }) {
  const { label = "Previous", ...rest } = props;
  return <CarouselPrevButton aria-label={label} {...rest} />;
}

export function CarouselNextButtonExplicit(props: React.ComponentProps<"button"> & { label?: string }) {
  const { label = "Next", ...rest } = props;
  return <CarouselNextButton aria-label={label} {...rest} />;
}
