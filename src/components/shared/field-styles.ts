/**
 * The focus look for every field on the site, expressed as Tailwind utilities.
 *
 * Two shapes, because fields come in two kinds:
 *  - a plain field owns its own ring (`fieldRingClassName`)
 *  - a field inside a decorated shell must stay flat, and the shell shows the
 *    ring instead (`fieldShellClassName`) — otherwise you get a ring inside a
 *    ring, which is what made the address command look heavy.
 *
 * Each surface re-points `--field-accent` / `--field-surface` in its own token
 * module (teal for the site, violet for panels, plum for the account pages), so
 * there is one behaviour and three accents.
 */

/** Just enough travel to feel alive, never a fat halo. */
const ring =
  "focus:[box-shadow:0_0_0_1px_color-mix(in_srgb,var(--field-accent,#168f88)_42%,transparent),0_0_0_3px_color-mix(in_srgb,var(--field-accent,#168f88)_8%,transparent),0_14px_30px_-22px_color-mix(in_srgb,var(--field-accent,#168f88)_65%,transparent),inset_0_1px_0_rgb(255_255_255/0.85)]";

const ringDark =
  "dark:focus:[box-shadow:0_0_0_1px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_48%,transparent),0_0_0_3px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_11%,transparent),0_16px_32px_-22px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_55%,transparent),inset_0_1px_0_rgb(255_255_255/0.16)]";

const plate =
  "focus:border-[color-mix(in_srgb,var(--field-accent,#168f88)_52%,transparent)] focus:bg-[color-mix(in_srgb,var(--field-surface,#ffffff)_70%,transparent)] focus:backdrop-blur-xl";

const plateDark =
  "dark:focus:border-[color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_56%,transparent)] dark:focus:bg-[color-mix(in_srgb,var(--field-surface-dark,#16202c)_66%,transparent)]";

const motion =
  "transition-[box-shadow,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

/** Put on any field that draws its own border. */
export const fieldRingClassName = `focus:outline-none ${motion} ${plate} ${ring} ${plateDark} ${ringDark}`;

/** Put on a container that draws the border for the fields inside it. */
export const fieldShellClassName = [
  "transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
  "focus-within:outline-none",
  "focus-within:border-[color-mix(in_srgb,var(--field-accent,#168f88)_52%,transparent)]",
  "focus-within:bg-[color-mix(in_srgb,var(--field-surface,#ffffff)_70%,transparent)]",
  "focus-within:backdrop-blur-xl",
  "focus-within:[box-shadow:0_0_0_1px_color-mix(in_srgb,var(--field-accent,#168f88)_42%,transparent),0_0_0_3px_color-mix(in_srgb,var(--field-accent,#168f88)_8%,transparent),0_14px_30px_-22px_color-mix(in_srgb,var(--field-accent,#168f88)_65%,transparent),inset_0_1px_0_rgb(255_255_255/0.85)]",
  "dark:focus-within:border-[color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_56%,transparent)]",
  "dark:focus-within:bg-[color-mix(in_srgb,var(--field-surface-dark,#16202c)_66%,transparent)]",
  "dark:focus-within:[box-shadow:0_0_0_1px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_48%,transparent),0_0_0_3px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_11%,transparent),0_16px_32px_-22px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_55%,transparent),inset_0_1px_0_rgb(255_255_255/0.16)]",
].join(" ");

/**
 * A field that is already inside a decorated shell: no border, no ring, no
 * plate — the shell does all of it.
 */
export const bareFieldClassName =
  "border-0 bg-transparent focus:outline-none focus:shadow-none focus:backdrop-blur-none focus:bg-transparent";

/**
 * Scoped variant for containers that style every field through one class
 * (`panelFormClassName`, the settings pages, and so on). `[data-bare]` is the
 * opt-out for fields that live inside their own shell.
 */
export const fieldScopeClassName = [
  "[&_:is(input,textarea,select):not([data-bare])]:focus:outline-none",
  "[&_:is(input,textarea,select):not([data-bare])]:transition-[box-shadow,border-color,background-color]",
  "[&_:is(input,textarea,select):not([data-bare])]:duration-300",
  "[&_:is(input,textarea,select):not([data-bare])]:ease-[cubic-bezier(0.22,1,0.36,1)]",
  "[&_:is(input,textarea,select):not([data-bare])]:focus:border-[color-mix(in_srgb,var(--field-accent,#168f88)_52%,transparent)]",
  "[&_:is(input,textarea,select):not([data-bare])]:focus:bg-[color-mix(in_srgb,var(--field-surface,#ffffff)_70%,transparent)]",
  "[&_:is(input,textarea,select):not([data-bare])]:focus:backdrop-blur-xl",
  "[&_:is(input,textarea,select):not([data-bare])]:focus:[box-shadow:0_0_0_1px_color-mix(in_srgb,var(--field-accent,#168f88)_42%,transparent),0_0_0_3px_color-mix(in_srgb,var(--field-accent,#168f88)_8%,transparent),0_14px_30px_-22px_color-mix(in_srgb,var(--field-accent,#168f88)_65%,transparent),inset_0_1px_0_rgb(255_255_255/0.85)]",
  "dark:[&_:is(input,textarea,select):not([data-bare])]:focus:border-[color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_56%,transparent)]",
  "dark:[&_:is(input,textarea,select):not([data-bare])]:focus:bg-[color-mix(in_srgb,var(--field-surface-dark,#16202c)_66%,transparent)]",
  "dark:[&_:is(input,textarea,select):not([data-bare])]:focus:[box-shadow:0_0_0_1px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_48%,transparent),0_0_0_3px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_11%,transparent),0_16px_32px_-22px_color-mix(in_srgb,var(--field-accent-dark,#6fe0d0)_55%,transparent),inset_0_1px_0_rgb(255_255_255/0.16)]",
  "motion-reduce:[&_:is(input,textarea,select):not([data-bare])]:transition-none",
].join(" ");
