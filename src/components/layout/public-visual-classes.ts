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
