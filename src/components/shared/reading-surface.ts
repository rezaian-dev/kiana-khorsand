/** Shared editorial reading styles; tokens remain in Tailwind classes, not route CSS. */
export const readingSurfaceClassName =
  "relative mx-auto! mt-[clamp(2rem,4vw,3.2rem)]! mb-[clamp(4.5rem,7vw,6rem)]! w-[min(calc(100%_-_2rem),820px)]! overflow-hidden rounded-[27px]! bg-[var(--site-surface)]! p-[clamp(1.35rem,4vw,3rem)]! [background-image:radial-gradient(ellipse_at_97%_0%,color-mix(in_srgb,#6ba69b_6%,transparent),transparent_40%)]! before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[linear-gradient(90deg,#338a83,#8b75ac,#d29b81)] before:content-['']";

export const readingProseClassName =
  "mx-auto! max-w-[68ch] text-[clamp(.96rem,1.2vw,1.05rem)]! leading-[2.15]!";

export const readingHeadingClassName =
  "mt-[clamp(1.6rem,3vw,2.3rem)]! mb-[.65rem]! border-s-[3px] border-[#398f84] ps-3 leading-[1.6]! text-balance first:mt-0!";

export const readingQuoteClassName =
  "my-[1.4rem]! rounded-[15px]! border-[#448c86]! bg-[color:color-mix(in_srgb,#5b9c92_8%,var(--site-surface))]! px-[1.15rem]! py-[.85rem]! text-[var(--site-ink)]!";
