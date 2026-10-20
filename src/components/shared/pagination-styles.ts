// Shared public pager skin; keep the semantic anchors/spans in each route.
export const pageNavClass =
  "article-pagination flex flex-wrap items-center justify-between gap-x-6 gap-y-[0.85rem] pt-[1.6rem] pb-12 text-[var(--fg)] max-[550.02px]:justify-center";
export const pageNavLabelClass =
  "text-[0.9rem] font-[750] text-[var(--muted)] max-[550.02px]:w-full max-[550.02px]:text-center";
export const pageNavLinksClass =
  "article-pagination-links flex flex-wrap items-center gap-2";
export const pageNavEntryClass =
  "article-page-entry inline-flex items-center gap-2";
export const pageNavItemClass =
  "inline-grid h-11 min-w-11 place-items-center rounded-[14px] border border-[var(--line)] bg-[var(--surface)] font-[850] text-[var(--fg)] [box-shadow:var(--shadow-soft)] aria-[current=page]:border-transparent aria-[current=page]:text-[var(--cta-fg)] aria-[current=page]:[background:linear-gradient(110deg,var(--cta-from),var(--cta-to))] aria-[current=page]:[box-shadow:0_10px_24px_-12px_color-mix(in_srgb,var(--c-teal)_65%,transparent)] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[var(--c-teal)]!";
export const pageNavDisabledClass =
  "is-disabled inline-grid h-11 min-w-11 place-items-center rounded-[14px] border border-[var(--line)] bg-[var(--surface)] font-[850] text-[var(--fg)] opacity-[0.45] [box-shadow:none] [transition:transform_0.22s_ease,box-shadow_0.22s_ease,background-color_0.22s_ease]";
export const pageNavEllipsisClass =
  "article-page-ellipsis px-[0.2rem] text-[var(--muted)]";
