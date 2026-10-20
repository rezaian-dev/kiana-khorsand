import Link from "next/link";
import type { ReactNode } from "react";

export function FooterMotionLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${className} text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] focus-visible:text-[var(--fg)]`}
    >
      {children}
    </Link>
  );
}

export function FooterScrollTopLink() {
  return (
    <a
      href="#main"
      className="grid h-11 w-11 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-600 shadow-sm transition-all duration-300 hover:-translate-y-[2px] hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:bg-zinc-700 dark:hover:text-white"
      aria-label="بازگشت به بالای صفحه"
    >
      <i className="ph-bold ph-arrow-up" aria-hidden="true" />
    </a>
  );
}
