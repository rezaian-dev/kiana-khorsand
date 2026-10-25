import Image from "next/image";
import { testimonialPortrait } from "../portrait";

export type TestimonialCardItem = {
  slug: string;
  name: string;
  quote: string;
  experience: string;
  avatar: string | null;
};

/**
 * Shared testimonial card used by the home slider and the testimonials page.
 * Fixes: dead space under text (#3), Latin quote glyph at top-left (#4),
 * duplicated service badge (#5).
 * Layout uses logical properties only (start/end, text-start) per MDN logical props:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values
 */
export function TestimonialCard({
  item,
  className = "",
}: {
  item: TestimonialCardItem;
  className?: string;
}) {
  const portrait = testimonialPortrait(item);

  return (
    <figure
      className={`relative isolate flex size-full min-h-0 flex-col overflow-hidden rounded-[26px] border border-(--site-line) bg-(--surface) px-6 pt-7 pb-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 motion-reduce:transition-none ${className}`}
    >
      {/* Persian guillemet at inline-start (right in RTL) on its own row above the
          quote, so it never sits under the first line of text; decorative only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none -mb-4 text-[2.6rem] leading-none font-bold text-(--c-teal) opacity-30 select-none dark:opacity-35"
      >
        «
      </span>

      <blockquote className="relative z-1 flex-1 text-start text-[clamp(.95rem,1.3vw,1.05rem)] leading-loose font-medium text-pretty text-(--fg)">
        {item.quote}
      </blockquote>

      <div className="mt-6 h-px w-full bg-(--site-line)" aria-hidden="true" />

      <figcaption className="flex min-w-0 items-center gap-3 pt-4">
        <span className="relative grid size-11 flex-none place-items-center overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--c-teal)_12%,var(--surface))]">
          {portrait ? (
            <Image
              src={portrait}
              width={48}
              height={48}
              sizes="48px"
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="text-[.95rem] font-extrabold text-(--c-teal)"
            >
              {item.name.trim().charAt(0)}
            </span>
          )}
        </span>
        <span className="grid min-w-0 gap-0.5 text-start">
          <strong className="truncate text-[.9rem]/6 font-extrabold text-(--fg)">
            {item.name}
          </strong>
          {/* Single role line — replaces the duplicated service badge */}
          <small className="truncate text-[.76rem]/5 text-(--site-muted)">
            {item.experience}
          </small>
        </span>
      </figcaption>
    </figure>
  );
}
