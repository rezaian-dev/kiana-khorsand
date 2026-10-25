/**
 * Design tokens for the public site — the one place Tailwind strings live.
 *
 * Grouped the way the page is built: layout → type → buttons → cards → header → dock →
 * fields → decorative visuals. Components import the token, never a raw class soup, so a
 * visual change is a one-line edit here instead of a hunt through twenty files.
 */
/** The original reduced-motion guard also covers non-form public controls. */
export const fieldReducedMotionClassName =
  "motion-reduce:[&_:is(input,textarea,select)]:[transition-duration:.01ms]!";

/** Beautiful teal dock — unified across all pages, 320px safe, glass, responsive — high contrast in both themes */
export const mobileDockClassName =
  "mobile-dock fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[440px] items-center justify-between gap-1.5 rounded-[30px] border border-white/60 bg-white/85 p-2 shadow-[0_16px_48px_-16px_rgba(13,115,107,0.22),0_6px_16px_-6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/70 dark:border-white/15 dark:bg-zinc-900/92 dark:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.6)] [direction:rtl] left-[max(8px,env(safe-area-inset-left,0px))] right-[max(8px,env(safe-area-inset-right,0px))] bottom-[max(8px,env(safe-area-inset-bottom,0px))] max-[360px]:inset-x-2 max-[360px]:gap-1 max-[360px]:p-1.5 max-[360px]:rounded-[26px] max-[320px]:inset-x-1 max-[320px]:gap-0.5 max-[320px]:p-1.5 max-[320px]:rounded-[22px] min-[600px]:left-1/2 min-[600px]:right-auto min-[600px]:w-[min(480px,calc(100%-32px))] min-[600px]:-translate-x-1/2";

export const mobileDockItemClassName =
  "mobile-dock-item group/item relative flex flex-1 flex-col items-center justify-center gap-1.5 rounded-[22px] px-1.5 py-2.5 text-[11px] font-bold leading-none tracking-tight text-slate-600 dark:text-zinc-300 will-change-transform transition-[color,transform] duration-200 ease-out hover:text-teal-600 dark:hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 active:scale-[0.98] aria-[current=page]:text-white! dark:aria-[current=page]:text-white! aria-[current=page]:[text-shadow:0_1px_3px_rgba(0,0,0,0.28)] max-[360px]:py-2 max-[360px]:gap-1 max-[360px]:text-[10px] max-[320px]:px-1 max-[320px]:py-1.5 max-[320px]:text-[9px] max-[320px]:gap-0.5 max-[320px]:rounded-[18px]";

export const mobileDockIconClassName =
  "mobile-dock-icon relative grid size-8 place-items-center rounded-full transition-all duration-300 ease-out group-aria-[current=page]/item:scale-110 group-hover/item:scale-105 group-active/item:scale-90 max-[360px]:size-7 max-[320px]:size-6";

export const publicMovingDockClassName =
  "min-[600px]:left-1/2 min-[600px]:right-auto min-[600px]:w-[min(480px,calc(100%-32px))] min-[600px]:-translate-x-1/2";

// Public-layout buttons only. Admin and error-route hooks intentionally keep
// their existing rules; these strings are scanned as static Tailwind utilities.
const publicButtonClassName =
  "btn inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[999px] border px-[1.35rem] py-3 text-[.9375rem] font-bold leading-none whitespace-nowrap no-underline cursor-pointer";
export const publicButtonPrimaryClassName = `${publicButtonClassName} btn-primary border-transparent text-[var(--cta-fg)] [background:linear-gradient(110deg,var(--cta-from),var(--cta-to))] [box-shadow:0_10px_26px_-12px_color-mix(in_srgb,var(--c-violet)_72%,transparent),0_2px_6px_rgba(25,23,49,0.1)]`;
export const publicButtonSoftClassName = `${publicButtonClassName} btn-soft border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] [box-shadow:var(--shadow-soft)] hover:border-[color:color-mix(in_srgb,var(--c-violet)_42%,var(--line))] hover:[box-shadow:0_0_0_5px_color-mix(in_srgb,var(--c-violet)_11%,transparent),var(--shadow-soft)]`;

// Public reference cards only. Keep semantic hooks for diagnostics and existing
// art overrides; error/admin routes are outside the scoped reference styles.
const publicCardGeometryClassName =
  "relative rounded-[24px] border p-6 sm:p-7 [box-shadow:var(--shadow-soft)]";

export const publicCardClassName = `card ${publicCardGeometryClassName} border-[var(--line)] bg-[var(--surface)] hover:border-[color:color-mix(in_srgb,var(--c-violet)_30%,var(--line))] hover:[box-shadow:var(--shadow-lift)] [transition:transform_0.38s_cubic-bezier(0.2,0.8,0.2,1),box-shadow_0.38s,border-color_0.38s]`;

// The two background layers make the transparent border into a rainbow rim.
// The art-card surface uses ! overrides intentionally; it keeps its own paint.
export const publicRainbowCardClassName = `card-rainbow ${publicCardGeometryClassName} border-transparent [background-image:linear-gradient(var(--surface),var(--surface)),conic-gradient(from_var(--angle),var(--c-violet),var(--c-plum),var(--c-rose),var(--c-amber),var(--c-violet))] [background-origin:border-box] [background-clip:padding-box,border-box] hover:[box-shadow:var(--shadow-lift)] [transition:box-shadow_0.24s,border-color_0.24s,background-color_0.24s] motion-reduce:[transition:none]! motion-reduce:transform-none!`;

// The scroll marker is rendered by the existing client progress island; the
// header and its content remain server-rendered. The ancestor variant observes
// the marker without a separate observer, DOM mutation or layout shift.
// Variant utility names remain whole literals for Tailwind's source scanner.
export const publicHeaderShellClassName =
  "header-shell border-b border-b-transparent [transition:background-color_0.35s,box-shadow_0.35s,border-color_0.35s] [.reference-home:has(.header-progress-scrolled)_&]:[background-color:var(--glass)] [.reference-home:has(.header-progress-scrolled)_&]:backdrop-blur-[18px] [.reference-home:has(.header-progress-scrolled)_&]:backdrop-saturate-[165%] [.reference-home:has(.header-progress-scrolled)_&]:border-b-[var(--line)] [.reference-home:has(.header-progress-scrolled)_&]:[box-shadow:0_12px_34px_-26px_rgb(25_23_49_/_55%)]";
export const publicHeaderRowClassName =
  "header-row flex h-[68px] items-center justify-between gap-2 sm:gap-3 max-[768.02px]:gap-[.35rem]! md:h-[74px] [transition:height_0.35s]";

// Public-layout geometry lives on the rendered nodes, not in a new CSS selector.
export const publicContainerClassName =
  "container-x mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8";
export const publicSectionClassName = "section relative py-16 md:py-24";
export const publicHeroSectionClassName = `${publicSectionClassName} header-offset pt-[6.5rem]! md:pt-32!`;

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

// Desktop-pointer spotlight is paint only: no overlay can intercept the link.
// A hover variable also leaves the decorative effect usable without JS; Motion
// interpolates the registered variable after hydration, including pointer leave.
// Full utility tokens must be literal for Tailwind's production scanner.
export const publicSpotClassName =
  "spot [--spot-opacity:0] hover:[--spot-opacity:1] [@media(hover:hover)]:after:pointer-events-none [@media(hover:hover)]:after:absolute [@media(hover:hover)]:after:inset-0 [@media(hover:hover)]:after:rounded-[inherit] [@media(hover:hover)]:after:[background:radial-gradient(240px_circle_at_var(--mx,50%)_var(--my,50%),color-mix(in_srgb,var(--c-violet)_18%,transparent),transparent_68%)] [@media(hover:hover)]:after:opacity-[var(--spot-opacity)] [@media(hover:hover)]:after:content-['']";

// Public display typography; semantic class hooks remain for behavior/tests.
export const publicEyebrowClassName =
  "eyebrow inline-flex items-center gap-[.55rem] text-[.8125rem] font-bold text-[var(--muted)] before:h-[3px] before:w-[1.6rem] before:rounded-[99px] before:[background-image:var(--grad-sunset)] before:content-['']";
export const publicH1ClassName =
  "h1 text-[clamp(1.9rem,6.6vw,3.5rem)] leading-[1.3] font-extrabold tracking-[-.015em]";
export const publicH2ClassName =
  "h2 text-[clamp(1.4rem,4.2vw,2.3rem)] leading-[1.42] font-extrabold tracking-[-.01em]";
export const publicH3ClassName =
  "h3 text-[clamp(1.0625rem,2.2vw,1.25rem)] leading-[1.6] font-bold";
export const publicLeadClassName =
  "lead text-[1.0625rem] leading-[2.05] text-[var(--muted)]";
export const publicGradTextClassName =
  "grad-text bg-clip-text text-transparent [background-image:var(--grad-text)]";

// Static public decorations, with semantic hooks preserved for route overrides.
export const publicBlobClassName =
  "blob pointer-events-none absolute rounded-[9999px] blur-[72px] opacity-[.34] dark:opacity-[.22]";

export const publicPortraitCanvasClassName =
  "portrait-canvas bg-[var(--surface)] [background-image:radial-gradient(58%_48%_at_20%_14%,rgba(109,74,255,0.36),transparent_70%),radial-gradient(52%_44%_at_86%_20%,rgba(233,162,59,0.34),transparent_70%),radial-gradient(58%_52%_at_82%_86%,rgba(177,74,158,0.34),transparent_70%),radial-gradient(62%_52%_at_14%_84%,rgba(31,169,143,0.28),transparent_70%)]";

// Art direction shared by the three public openings; only home/about draw the ring.
export const publicEditorialHeroClassName =
  "isolate overflow-hidden [background:radial-gradient(circle_at_93%_10%,color-mix(in_srgb,#4eaaa1_11%,transparent),transparent_35%),radial-gradient(circle_at_8%_85%,color-mix(in_srgb,#9b80ae_11%,transparent),transparent_41%),var(--site-canvas)]";

export const publicEditorialOrnamentClassName =
  "before:pointer-events-none before:absolute before:-end-[12vw] before:-bottom-[16vw] before:aspect-square before:w-[35vw] before:rounded-[50%] before:border before:[border-color:color-mix(in_srgb,#519d95_15%,transparent)] before:[box-shadow:0_0_0_35px_color-mix(in_srgb,#519d95_3%,transparent),0_0_0_70px_color-mix(in_srgb,#519d95_2%,transparent)] before:content-['']";

export const publicHeroPortraitFrameClassName =
  "[border:7px_solid_color-mix(in_srgb,var(--site-surface)_93%,transparent)]! [box-shadow:0_36px_65px_-35px_#244f56]!";

export const publicArchedPortraitClassName =
  "[border-radius:min(46%,240px)_min(46%,240px)_26px_26px]";

// Keep the opaque fallback for browsers that support neither backdrop-filter spelling.
export const publicGlassClassName =
  "glass border border-[var(--line)] bg-[var(--glass)] backdrop-blur-[18px] backdrop-saturate-[165%] not-supports-[backdrop-filter:blur(1px)]:bg-[var(--surface)]";

// The semantic tile-* hooks stay for diagnostics; Tailwind needs each tone
// spelled out so all six gradients survive the production content scan.
export const publicTileToneClasses = {
  violet: "[background-image:linear-gradient(135deg,#9e85ff,var(--c-violet))]",
  plum: "[background-image:linear-gradient(135deg,#db85c9,var(--c-plum))]",
  rose: "[background-image:linear-gradient(135deg,#ff9baa,var(--c-rose))]",
  amber: "[background-image:linear-gradient(135deg,#ffc882,var(--c-amber))]",
  teal: "[background-image:linear-gradient(135deg,#6fdcc4,var(--c-teal))]",
  indigo: "[background-image:linear-gradient(135deg,#92a0ff,var(--c-indigo))]",
} as const;

export const publicTileToneClassName = (tone: string) =>
  publicTileToneClasses[tone as keyof typeof publicTileToneClasses] ?? "";

// The public tile paint and geometry are static utilities; group-hover
// movement is delegated to Motion from the existing PageReveal island.
export const publicIconTileBaseClassName =
  "icon-tile grid flex-none place-items-center text-[1.5rem] text-white";
export const publicIconTileShadowClassName =
  "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.28),0_10px_22px_-12px_rgba(25,23,49,0.5)]";
export const publicIconTileSizedClassName = `${publicIconTileBaseClassName} rounded-[16px] ${publicIconTileShadowClassName}`;
export const publicIconTileClassName = `${publicIconTileSizedClassName} h-[52px] w-[52px]`;
export const publicIconTileArtClassName = `${publicIconTileBaseClassName} h-[52px] w-[52px]`;
export const publicChipClassName =
  "chip inline-flex items-center gap-2 rounded-[999px] border border-[var(--line)] bg-[var(--surface)] px-[.85rem] py-2 text-[.8125rem] font-semibold text-[var(--fg)] hover:border-[color:color-mix(in_srgb,var(--c-violet)_38%,var(--line))] [box-shadow:0_1px_2px_rgba(25,23,49,0.04)] transition-[box-shadow,border-color] duration-300 ease-[ease]";

/** The header's account button: a round glass chip that matches the header's own scale. */
export const publicAccountTriggerClassName =
  "site-account-trigger group/account relative inline-flex! size-11! min-h-11! flex-none! cursor-pointer items-center justify-center gap-[.55rem] overflow-visible! rounded-full! border! border-[#bdd9da]! bg-[#e9f5f3]! p-0! text-[.85rem] font-extrabold whitespace-nowrap text-[#175c6b]! shadow-[0_5px_14px_-10px_#1a556875]! transition-[background-color,border-color,box-shadow]! duration-200! ease-[ease]! focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#167d8d] data-[state=closed]:hover:border-[#7db7b6]! data-[state=closed]:hover:bg-[#d8efec]! motion-safe:transition-[background-color,border-color,transform] motion-safe:duration-200 data-[state=closed]:motion-safe:hover:-translate-y-0.5 data-[state=closed]:motion-safe:active:scale-[.97] motion-reduce:transition-none! dark:border-[#587885]! dark:bg-[#263d4a]! dark:text-[#e6f8f4]! dark:shadow-none! dark:focus-visible:outline-[#bcefe4] dark:data-[state=closed]:hover:border-[#85bdb7]! dark:data-[state=closed]:hover:bg-[#315261]!";

/** The phone menu sheet: slide-in panel with its own open/close curve. */
export const mobileSheetPanelClassName =
  "ref-menu-sheet [&:where([data-state=open],[data-open]:not([data-open=false]))]:animate-ref-menu-open [&:where([data-state=closed],[data-closed]:not([data-closed=false]))]:animate-ref-menu-close inset-e-0! inset-s-auto! flex! h-dvh! w-[min(88vw,380px)]! max-w-none! min-w-0 flex-col! gap-0! overflow-hidden! rounded-[28px_0_0_28px]! border! border-e-0! border-(--line)! bg-(--glass-strong)! px-[.875rem]! pt-[env(safe-area-inset-top,0px)]! pb-[calc(.55rem+env(safe-area-inset-bottom,0px))]! text-(--fg)! shadow-[-14px_0_50px_rgba(18,15,43,0.18)]! backdrop-blur-xl! backdrop-saturate-180! transition-none! motion-reduce:animate-none!";

/** One row of the phone menu: label, icon slot and a chevron that hints at motion. */
export const mobileSheetLinkClassName =
  "sheet-link group/link relative isolate flex min-h-12 items-center justify-between gap-3 overflow-hidden rounded-[14px] py-[.35rem] pe-[.55rem] ps-5 text-base font-bold text-(--fg) no-underline transition-[transform] duration-400 ease-[cubic-bezier(0.2,0.8,0.2,1)] before:absolute before:inset-0 before:-z-1 before:origin-right before:transform-[scaleX(0)] before:rounded-[inherit] before:bg-[linear-gradient(-90deg,color-mix(in_srgb,var(--c-violet)_12%,transparent),color-mix(in_srgb,var(--c-plum)_12%,transparent))] before:transition-[transform] before:duration-500 before:ease-[cubic-bezier(0.2,0.8,0.2,1)] before:content-[''] hover:transform-[translateX(-4px)] hover:before:transform-[scaleX(1)] focus-visible:transform-[translateX(-4px)] focus-visible:before:transform-[scaleX(1)] motion-reduce:transition-none motion-reduce:before:transition-none motion-reduce:hover:transform-none motion-reduce:hover:before:transform-none motion-reduce:focus-visible:transform-none motion-reduce:focus-visible:before:transform-none";
