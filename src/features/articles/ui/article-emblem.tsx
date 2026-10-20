import { artSealClassName } from "@/components/shared/art-card-styles";
import {
  BookOpenText,
  Brain,
  BriefcaseBusiness,
  CloudSun,
  Compass,
  Flower2,
  HandHeart,
  HeartCrack,
  HeartHandshake,
  HeartPulse,
  MessageCircleHeart,
  MoonStar,
  NotebookPen,
  RefreshCcw,
  ShieldCheck,
  Sun,
  Target,
  UsersRound,
  Wind,
  Workflow,
} from "lucide-react";
import type {
  ArticleIcon,
  ArticleVisual,
} from "@/features/articles/article-visual";

const glyphs = {
  BookOpenText,
  Brain,
  BriefcaseBusiness,
  CloudSun,
  Compass,
  Flower2,
  HandHeart,
  HeartCrack,
  HeartHandshake,
  HeartPulse,
  MessageCircleHeart,
  MoonStar,
  NotebookPen,
  RefreshCcw,
  ShieldCheck,
  Sun,
  Target,
  UsersRound,
  Wind,
  Workflow,
} satisfies Record<ArticleIcon, typeof BookOpenText>;

/** Explicit Tailwind tokens keep the same deterministic six-tone palette in both themes. */
const palette: Record<ArticleVisual["tone"], string> = {
  teal: "[--emblem-ink:#195d62] [--emblem-light:#e5f5ee] [--emblem-shade:#a9d4ca] dark:[--emblem-ink:#f1f3fa] dark:[--emblem-light:#405164] dark:[--emblem-shade:#2d4756]",
  violet:
    "[--emblem-ink:#514380] [--emblem-light:#f1edfa] [--emblem-shade:#c6bce7] dark:[--emblem-ink:#f1f3fa] dark:[--emblem-light:#514770] dark:[--emblem-shade:#393c61]",
  coral:
    "[--emblem-ink:#894b4d] [--emblem-light:#fceee9] [--emblem-shade:#eac3b6] dark:[--emblem-ink:#f1f3fa] dark:[--emblem-light:#69505c] dark:[--emblem-shade:#554150]",
  plum: "[--emblem-ink:#674969] [--emblem-light:#f7ebf1] [--emblem-shade:#d9b7cb] dark:[--emblem-ink:#f1f3fa] dark:[--emblem-light:#644960] dark:[--emblem-shade:#4d3b57]",
  sage: "[--emblem-ink:#44634d] [--emblem-light:#ecf6e9] [--emblem-shade:#bcd7b9] dark:[--emblem-ink:#f1f3fa] dark:[--emblem-light:#435e56] dark:[--emblem-shade:#34544f]",
  amber:
    "[--emblem-ink:#775321] [--emblem-light:#fff5dc] [--emblem-shade:#e9d4a6] dark:[--emblem-ink:#f1f3fa] dark:[--emblem-light:#6a5945] dark:[--emblem-shade:#514c41]",
};
const engraving = [
  "after:top-[10px] after:right-[11px]",
  "after:bottom-[11px] after:left-[10px]",
  "after:top-3 after:left-[10px]",
] as const;

export function ArticleEmblem({
  visual,
  slug,
  className = "",
}: {
  visual: ArticleVisual;
  slug: string;
  className?: string;
}) {
  const Glyph = glyphs[visual.icon];
  // Different articles with the same topic still get a stable, distinct engraving.
  const variant =
    [...slug].reduce(
      (hash, char) => (hash * 31 + char.charCodeAt(0)) | 0,
      0,
    ) >>> 0;
  return (
    <span
      className={`${artSealClassName} article-emblem ${className} ${palette[visual.tone]} ${engraving[variant % 3]} [background-image:linear-gradient(145deg,var(--emblem-light),var(--emblem-shade))]! text-[var(--emblem-ink)]! [box-shadow:inset_0_0_0_1px_color-mix(in_srgb,var(--emblem-ink)_14%,transparent),0_8px_20px_-12px_color-mix(in_srgb,var(--emblem-ink)_45%,transparent)]! before:pointer-events-none before:absolute before:inset-[5px] before:rounded-[inherit] before:border before:border-[color:color-mix(in_srgb,var(--emblem-ink)_28%,transparent)] before:content-[''] after:pointer-events-none after:absolute after:size-[3px] after:rounded-full after:bg-current after:opacity-65 after:content-[''] motion-safe:transition-transform motion-safe:duration-[360ms] motion-safe:ease-[cubic-bezier(.2,.75,.3,1)] motion-safe:group-focus-within:scale-[1.07] motion-safe:group-focus-within:-rotate-[7deg] motion-safe:group-hover:scale-[1.07] motion-safe:group-hover:-rotate-[7deg] motion-reduce:transition-none`}
      data-article-icon={visual.icon}
      data-tone={visual.tone}
      data-engraving={variant % 3}
      aria-hidden="true"
    >
      <Glyph
        className="relative z-[1] shrink-0 [filter:drop-shadow(0_2px_1px_rgb(255_255_255/30%))]"
        size={31}
        strokeWidth={1.75}
      />
    </span>
  );
}
