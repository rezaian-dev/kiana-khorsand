/**
 * Design tokens shared by every public feature — page container, grids, cards, headings,
 * badges and detail rows. Features import from here so no feature owns a layout primitive.
 */
/** Shared public content width. Keep the responsive Tailwind classes in one static, scanable source. */
export const siteContainerClassName =
  "site-container mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8";

/** Shared static card grid; exact legacy 900/560px breakpoints are retained. */
export const siteGridClassName =
  "site-grid grid grid-cols-3 items-stretch gap-5 pt-10 pb-20 max-[900.02px]:grid-cols-2 max-[560.02px]:grid-cols-1 max-[560.02px]:gap-[.9rem]";

/** Shared static card skin. Editorial/policy hover uses Motion; art-card paint uses scoped utilities. */
export const siteCardClassName =
  "site-card flex h-full min-w-0 flex-col gap-[.9rem] rounded-[24px] border border-[var(--site-line)] bg-[var(--site-surface)] p-6 [box-shadow:var(--shadow-soft)] max-[560.02px]:p-[1.2rem] [&_h2]:text-[1.3rem] [&_h3]:text-[1.3rem] [&_h2]:font-extrabold [&_h3]:font-extrabold [&_h2]:leading-[1.55] [&_h3]:leading-[1.55] [&_p]:leading-[1.85] [&_p]:text-[var(--site-muted)] [&_p]:[overflow-wrap:anywhere] [&_a]:mt-auto [&_a]:text-[var(--site-violet)] [&_a]:font-[750] [&_a:hover]:underline";

/** Shared semantic heading and badge skins; per-page overrides remain in the markup. */
export const siteHeadingClassName =
  "site-heading mb-[1.4rem] max-w-[35ch] text-[clamp(1.55rem,3vw,2.5rem)] leading-[1.5] font-[850]";

export const siteBadgeClassName =
  "site-badge self-start rounded-[999px] bg-[color:color-mix(in_srgb,var(--site-violet)_12%,var(--site-surface))] px-[.65rem] py-1 text-[.85rem] font-bold text-[#5130ad] dark:text-[#c3b4ff]";

/** Public detail canvas; reading and booking pages can override individual utilities. */
export const siteDetailClassName =
  "site-detail mx-auto mt-12 mb-24 w-[min(calc(100%_-_2rem),800px)] rounded-[30px_30px_30px_9px] border border-[color:color-mix(in_srgb,var(--c-teal)_18%,var(--site-line))] bg-[var(--site-surface)] p-[clamp(1.25rem,3vw,3rem)] [background-image:radial-gradient(ellipse_at_95%_0%,color-mix(in_srgb,var(--c-teal)_4%,transparent),transparent_43%)] [box-shadow:0_24px_54px_-37px_rgb(22_78_84_/_24%)]";
