"use client";

import { cn } from "@/lib/utils";
import { toFaDigits, useSliderContext } from "./slider";

/**
 * Position indicator. Few slides get pill-style dots (active one elongated); long
 * carousels get a thin progress bar so the row never wraps or floods the tab order.
 * Both follow the W3C APG carousel pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/carousel/
 */

const MAX_DOTS = 8;

export function SliderDots({ className }: { className?: string }) {
  const { selectedIndex, snapCount, scrollTo } = useSliderContext();
  if (snapCount <= 1) return null;

  if (snapCount > MAX_DOTS) {
    const progress = ((selectedIndex + 1) / snapCount) * 100;
    return (
      <div
        aria-hidden="true"
        className={cn(
          "h-1.5 w-24 flex-none overflow-hidden rounded-full bg-[color:color-mix(in_srgb,var(--site-ink)_14%,transparent)]",
          className,
        )}
      >
        <div
          className="h-full rounded-full bg-[var(--c-teal)] transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="انتخاب اسلاید"
      className={cn("flex flex-none items-center gap-1", className)}
    >
      {Array.from({ length: snapCount }, (_, index) => {
        const active = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`اسلاید ${toFaDigits(index + 1)}`}
            // APG "grouped" carousel: the picker of the displayed slide is aria-disabled
            // and stays in the tab sequence; aria-current keeps the state readable.
            aria-current={active ? "true" : undefined}
            aria-disabled={active ? "true" : undefined}
            // 24×24 hit area (WCAG 2.5.8) around a small visual pill.
            className="grid size-6 flex-none place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-teal)]"
          >
            <span
              className={cn(
                "block h-2.5 rounded-full transition-all duration-200 ease-out motion-reduce:transition-none",
                active
                  ? "w-6 bg-[var(--c-teal)]"
                  : "w-2.5 bg-[color:color-mix(in_srgb,var(--site-ink)_18%,transparent)]",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
