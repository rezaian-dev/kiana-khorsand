/** Shared public-site elements that predate the route-specific components.
 * Kept on the server layout so the same skin is available before hydration.
 */
export const publicLegacyClassName = [
  "min-w-80 [background:var(--bg)]! text-[var(--fg)]! overflow-x-clip!",
  "[&_.site-button]:inline-flex [&_.site-button]:min-h-11 [&_.site-button]:items-center [&_.site-button]:justify-center [&_.site-button]:gap-2 [&_.site-button]:rounded-[999px] [&_.site-button]:[border:0] [&_.site-button]:bg-[linear-gradient(100deg,#7052e9,#a23dad)] [&_.site-button]:px-[1.3rem] [&_.site-button]:py-[.7rem] [&_.site-button]:font-extrabold [&_.site-button]:text-white [&_.site-button]:no-underline [&_.site-button]:[box-shadow:0_8px_24px_#703ac52d] [&_.site-button]:cursor-pointer [&_.site-button:hover]:brightness-[1.08]",
  "[&_.site-button]:min-h-[46px]! [&_.site-button]:[padding-inline:1.35rem]! [&_.site-button]:[background:linear-gradient(110deg,var(--c-violet),var(--c-plum))]! [&_.site-button]:[box-shadow:var(--shadow-soft)]! [@media(hover:hover)]:[&_.site-button:hover]:[box-shadow:var(--shadow-lift)]!",
  "[&_.site-button-secondary]:[background:var(--surface)]! [&_.site-button-secondary]:[color:var(--fg)]! [&_.site-button-secondary]:[border:1px_solid_var(--line)]!",
  // Native SSR/no-JS hover, focus and active states remain declarative; Motion owns client-owned runtime gestures.
  "[&_:is(.site-button,.btn,.site-card)]:[transition:transform_.24s_cubic-bezier(0.22,1,0.36,1),box-shadow_.24s_ease,border-color_.24s_ease,background-color_.24s_ease] motion-reduce:[&_:is(.site-button,.btn,.site-card)]:[transition:none]!",
  "[@media(hover:hover)]:[&_:is(.site-button,.btn):hover]:[transform:translateY(-2px)] [@media(hover:hover)]:[&_:is(.site-button,.btn):hover]:[box-shadow:var(--shadow-lift)] [&_:is(.site-button,.btn):active]:[transform:translateY(0)_scale(.985)]! motion-reduce:[&_:is(.site-button,.btn):hover]:[transform:none]!",
  "[&_.site-button-secondary]:border [&_.site-button-secondary]:border-[var(--site-line)] [&_.site-button-secondary]:bg-[var(--site-surface)] [&_.site-button-secondary]:text-[var(--site-ink)] [&_.site-button-secondary]:[box-shadow:0_6px_20px_#261c3510]",
  "[&_:focus-visible]:[outline:3px_solid_var(--site-violet)] [&_:focus-visible]:outline-offset-[3px]",
  "max-[768.02px]:[&_.site-section-inner]:flex-col max-[768.02px]:[&_.site-section-inner]:items-stretch",
  "[&_.site-quiz_legend]:my-4 [&_.site-quiz_legend]:text-[1.2rem] [&_.site-quiz_legend]:font-extrabold [&_.site-quiz_legend]:leading-[1.8]",
  "[&_.site-error]:mt-[.8rem] [&_.site-error]:text-[#a02c43]",
  "[&_.site-form]:grid [&_.site-form]:gap-[.8rem] [&_.site-form_label:not(.site-consent)]:font-[750]",
  "[&_.site-form_:is(input,select,textarea)]:min-h-11 [&_.site-form_:is(input,select,textarea)]:min-w-0 [&_.site-form_:is(input,select,textarea)]:w-full [&_.site-form_:is(input,select,textarea)]:rounded-[.75rem] [&_.site-form_:is(input,select,textarea)]:border [&_.site-form_:is(input,select,textarea)]:border-[var(--site-line)] [&_.site-form_:is(input,select,textarea)]:bg-[var(--site-surface)] [&_.site-form_:is(input,select,textarea)]:px-[.8rem] [&_.site-form_:is(input,select,textarea)]:py-[.65rem] [&_.site-form_:is(input,select,textarea)]:text-[var(--site-ink)] [&_.site-form_textarea]:resize-y",
  "[&_.site-consent]:flex [&_.site-consent]:items-start [&_.site-consent]:gap-[.7rem] [&_.site-consent]:leading-[1.7] [&_.site-consent_input]:mt-[.3rem] [&_.site-consent_input]:w-5! [&_.site-consent_input]:min-h-5! [&_.site-consent_input]:accent-[var(--site-violet)] [&_.site-consent_a]:underline",
].join(" ");
