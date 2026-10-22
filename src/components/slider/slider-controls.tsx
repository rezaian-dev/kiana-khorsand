"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSliderContext } from "./slider";

/**
 * Navigation contract:
 * - Previous = inline-start button (right in RTL). Icon points inline-start: →
 * - Next     = inline-end button (left in RTL).  Icon points inline-end:   ←
 *
 * These two buttons are the entire visible navigation; position is announced by each
 * slide's own label («۲ از ۶»), so no counter, dots or rotation button compete with
 * them for attention.
 *
 * The buttons render Lucide ArrowLeft / ArrowRight and mirror them with Tailwind's
 * `rtl:` variant, so the same component stays correct if direction ever flips.
 * Tailwind RTL variant: https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support
 */

// 44×44 touch target + visible focus ring (WCAG 2.5.8 / 2.4.7)
const controlClass =
  "grid size-11 flex-none place-items-center rounded-full border border-[var(--site-line)] bg-[var(--surface)] text-[var(--fg)] transition-[color,background-color,box-shadow,transform] duration-200 ease-out hover:border-[color:color-mix(in_srgb,var(--c-teal)_45%,var(--site-line))] hover:text-[var(--c-teal)] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)] active:scale-95 disabled:pointer-events-none disabled:opacity-35 motion-reduce:transition-none";

export function SliderPrevButton({
  label = "قبلی",
  className,
  ...props
}: React.ComponentProps<"button"> & { label?: string }) {
  const { scrollPrev, canPrev } = useSliderContext();
  return (
    <button
      type="button"
      aria-label={label}
      onClick={scrollPrev}
      disabled={!canPrev}
      className={cn(controlClass, className)}
      {...props}
    >
      <ArrowLeft className="size-5 rtl:-scale-x-100" aria-hidden="true" />
    </button>
  );
}

export function SliderNextButton({
  label = "بعدی",
  className,
  ...props
}: React.ComponentProps<"button"> & { label?: string }) {
  const { scrollNext, canNext } = useSliderContext();
  return (
    <button
      type="button"
      aria-label={label}
      onClick={scrollNext}
      disabled={!canNext}
      className={cn(controlClass, className)}
      {...props}
    >
      <ArrowRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
    </button>
  );
}

/**
 * One compact row directly under the slides. Centred under the phone layout, where
 * the active slide is centred too, and inline-start aligned once the row of cards
 * starts from the edge.
 */
export function SliderControls({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "slider-controls mt-4 flex min-w-0 items-center justify-center gap-2 sm:justify-start",
        className,
      )}
    >
      <SliderPrevButton />
      <SliderNextButton />
    </div>
  );
}
