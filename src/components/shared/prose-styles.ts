/** Shared public prose hierarchy. Kept static so Tailwind can scan every variant. */
export const siteProseClassName =
  "site-prose leading-[2] text-[var(--site-muted)] [overflow-wrap:anywhere] [&>*+*]:mt-[1.1rem] [&_:is(h2,h3,h4)]:mt-8 [&_:is(h2,h3,h4)]:leading-[1.55] [&_:is(h2,h3,h4)]:font-extrabold [&_:is(h2,h3,h4)]:text-[var(--site-ink)] [&_h2]:text-2xl [&_h3]:text-[1.2rem] [&_blockquote]:rounded-[8px] [&_blockquote]:border-s-[3px] [&_blockquote]:border-[var(--site-violet)] [&_blockquote]:bg-[color:color-mix(in_srgb,var(--site-violet)_6%,var(--site-surface))] [&_blockquote]:px-4 [&_blockquote]:py-[.6rem]";

export const siteListItemClassName =
  "site-list-item relative ps-5 before:absolute before:start-1 before:text-[var(--site-violet)] before:content-['•']";
