// Public-layout buttons only. Admin and error-route hooks intentionally keep
// their existing rules; these strings are scanned as static Tailwind utilities.
export const publicButtonClassName =
  "btn inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[999px] border px-[1.35rem] py-3 text-[.9375rem] font-bold leading-none whitespace-nowrap no-underline cursor-pointer";
export const publicButtonPrimaryClassName = `${publicButtonClassName} btn-primary border-transparent text-[var(--cta-fg)] [background:linear-gradient(110deg,var(--cta-from),var(--cta-to))] [box-shadow:0_10px_26px_-12px_color-mix(in_srgb,var(--c-violet)_72%,transparent),0_2px_6px_rgba(25,23,49,0.1)]`;
export const publicButtonSoftClassName = `${publicButtonClassName} btn-soft border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] [box-shadow:var(--shadow-soft)] hover:border-[color:color-mix(in_srgb,var(--c-violet)_42%,var(--line))] hover:[box-shadow:0_0_0_5px_color-mix(in_srgb,var(--c-violet)_11%,transparent),var(--shadow-soft)]`;
