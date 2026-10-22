"use client";

import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { toFaDigits, useSliderContext } from "./slider";

/**
 * Navigation contract (Phase 2):
 * - Previous = inline-start button (right in RTL). Icon points inline-start: →
 * - Next     = inline-end button (left in RTL).  Icon points inline-end:   ←
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

export function SliderPlayPause({ className }: { className?: string }) {
  const { isPlaying, togglePlay, snapCount } = useSliderContext();
  if (snapCount <= 1) return null;
  return (
    <button
      type="button"
      aria-label={isPlaying ? "توقف پخش خودکار" : "پخش خودکار"}
      onClick={togglePlay}
      className={cn(controlClass, "ms-1", className)}
    >
      {isPlaying ? (
        <Pause className="size-4" aria-hidden="true" />
      ) : (
        <Play className="size-4 rtl:-scale-x-100" aria-hidden="true" />
      )}
    </button>
  );
}

/**
 * One compact row directly under the slides, aligned at inline-start.
 * Contains Previous, Next, the position indicator and a Persian counter.
 */
export function SliderControls({
  children,
  showPlayPause = false,
  className,
}: React.PropsWithChildren<{
  showPlayPause?: boolean;
  className?: string;
}>) {
  const { selectedIndex, snapCount } = useSliderContext();

  return (
    <div
      className={cn(
        "slider-controls mt-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2",
        className,
      )}
    >
      <div className="flex flex-none items-center gap-2">
        {/* APG: the rotation control is the first element in the tab order of the carousel. */}
        {showPlayPause && <SliderPlayPause />}
        <SliderPrevButton />
        <SliderNextButton />
      </div>
      {/* The counter mirrors state visually; the live region lives on the slide track
          (APG), so it stays silent here and announcements never double up. */}
      <span
        className="slider-counter shrink-0 rounded-full bg-[color:color-mix(in_srgb,var(--c-teal)_9%,var(--surface))] px-3 py-1 text-[.78rem] font-extrabold text-[var(--site-muted)] tabular-nums"
      >
        {toFaDigits(selectedIndex + 1)} از {toFaDigits(snapCount)}
      </span>
      {children}
    </div>
  );
}
