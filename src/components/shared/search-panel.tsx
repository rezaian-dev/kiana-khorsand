import Link from "next/link";
import type { ReactNode } from "react";
import { RotateCcw, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The search/filter panel shared by the FAQ, workshops and testimonials pages.
 *
 * Those three pages had their own copy of this markup: same shell, same header,
 * same reset link, same empty state — three copies of the same 350-character
 * class string. One implementation keeps them identical by construction.
 *
 * The control itself is a slot: an `<input>` on two pages, a `<PanelSelect>` on
 * the third, so the panel takes whatever field it is given.
 */
export function SearchPanel({
  id,
  icon,
  label,
  hint,
  field,
  submitLabel,
  clearHref,
  clearLabel,
  clearable,
  className,
}: {
  id: string;
  icon: ReactNode;
  label: string;
  hint: string;
  field: ReactNode;
  submitLabel: string;
  clearHref: string;
  clearLabel: string;
  clearable: boolean;
  className?: string;
}) {
  return (
    <form
      method="get"
      role="search"
      className={cn(
        "public-search-panel mt-[clamp(1.3rem,3vw,2.5rem)] grid items-stretch gap-[1.15rem] rounded-[23px] border border-[color-mix(in_srgb,#569b96_15%,var(--site-line))] bg-(--site-surface) bg-[radial-gradient(circle_at_96%_8%,color-mix(in_srgb,#67ad9b_8%,transparent),transparent_36%)] p-[clamp(1.05rem,2.7vw,1.8rem)] shadow-[0_18px_42px_-34px_#1b566250]",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-[color-mix(in_srgb,#318b85_13%,var(--site-surface))] text-[#257b78] dark:text-[#a6e4d7]">
          {icon}
        </span>
        <div className="grid min-w-0 gap-[.15rem]">
          <label className="text-[1.06rem] font-[850]" htmlFor={id}>
            {label}
          </label>
          <small className="text-[.8rem] leading-[1.7] text-(--site-muted)">
            {hint}
          </small>
        </div>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-[.65rem] max-[620px]:grid max-[620px]:grid-cols-[minmax(0,1fr)]">
        {field}
        <button
          type="submit"
          className="site-button min-h-[50px] shrink-0 max-[620px]:w-full"
        >
          {submitLabel}
        </button>
        {clearable && (
          <Link
            href={clearHref}
            className="inline-flex min-h-[46px] items-center justify-center gap-[.35rem] rounded-[10px] px-[.6rem] py-[.4rem] text-[.83rem] font-extrabold text-[#22746e] no-underline hover:bg-[color-mix(in_srgb,#3d9486_10%,var(--site-surface))] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#22746e] max-[620px]:justify-self-start dark:text-[#a4e5d7]"
          >
            <RotateCcw size={16} aria-hidden="true" /> {clearLabel}
          </Link>
        )}
      </div>
    </form>
  );
}

/** "Nothing matched" — the other half of every search panel. */
export function SearchEmpty({
  title,
  body,
  href,
  linkLabel,
}: {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div
      className="public-search-empty mt-[clamp(1.5rem,3vw,2.5rem)] mb-16 grid justify-items-start gap-2 rounded-[21px] border border-dashed border-(--site-line) bg-(--site-surface) p-[clamp(1.3rem,3vw,2.1rem)] leading-[1.8] text-(--site-muted)"
      role="status"
    >
      <Search size={24} className="text-[#267f78]" aria-hidden="true" />
      <h2 className="text-[1.15rem] font-[850] text-(--site-ink)">{title}</h2>
      <p>{body}</p>
      <Link
        href={href}
        className="font-extrabold text-[#267f78] underline underline-offset-[3px] dark:text-[#a4e5d7]"
      >
        {linkLabel}
      </Link>
    </div>
  );
}

/** The text field those pages share, so its skin is defined once too. */
export function SearchInput({
  id,
  placeholder,
  defaultValue,
  className,
}: {
  id: string;
  placeholder: string;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <input
      id={id}
      name="q"
      type="search"
      maxLength={100}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={cn(
        "min-h-[50px] w-auto min-w-0 flex-[1_1_250px] rounded-xl border border-[color-mix(in_srgb,#4e8d8d_18%,var(--site-line))] bg-(--site-surface) px-[.9rem] text-(--site-ink) shadow-[0_5px_18px_-16px_#24434a75] placeholder:text-(--site-muted) placeholder:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--c-teal) max-[620px]:w-full",
        className,
      )}
    />
  );
}
