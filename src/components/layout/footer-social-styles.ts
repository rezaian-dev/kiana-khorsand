// Static footer social skin; Motion owns interactive paint and movement.
export const footerSocialClassName =
  "social-btn relative isolate grid size-11 place-items-center overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--surface)] text-[var(--icon-c,var(--fg))] [--social-hover-ink:#fff] dark:[--social-hover-ink:#14122a]";

export const footerSocialTones = {
  instagram:
    "[--sa:var(--c-plum)] [--sb:var(--c-rose)] [--sc:rgba(177,74,158,0.55)] [--icon-c:#b14a9e] dark:[--icon-c:#d96bc2]",
  telegram:
    "[--sa:var(--c-teal)] [--sb:var(--c-indigo)] [--sc:rgba(31,169,143,0.55)] [--icon-c:#1fa98f] dark:[--icon-c:#35c9a8]",
  whatsapp:
    "[--sa:var(--c-teal)] [--sb:var(--c-violet)] [--sc:rgba(31,169,143,0.55)] [--icon-c:#1fa98f] dark:[--icon-c:#35c9a8]",
} as const;
