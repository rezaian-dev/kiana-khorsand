import Link from "next/link";
import { CloudOff, RefreshCw, WifiOff } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "آفلاین — کیانا خرسند",
  robots: { index: false, follow: false },
};

/**
 * Offline screen, served by the service worker when the network is gone.
 *
 * It is precached and has to survive with zero network, zero database and zero client
 * JavaScript beyond the shell, so every effect here is CSS — no Motion bundle, no
 * images, no data. Slow loops only, all switched off under `prefers-reduced-motion`.
 */
export default function OfflinePage() {
  return (
    <main className="relative grid min-h-[70dvh] place-items-center overflow-hidden px-4 py-16">
      {/* Two drifting glows: the page must feel alive without a byte of JavaScript. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="offline-drift absolute start-[12%] top-[16%] size-[22rem] rounded-full bg-[color:color-mix(in_srgb,var(--c-teal)_26%,transparent)] blur-[80px]" />
        <div className="offline-drift-slow absolute end-[10%] bottom-[12%] size-[26rem] rounded-full bg-[color:color-mix(in_srgb,var(--c-violet)_22%,transparent)] blur-[90px]" />
      </div>

      <section className="grid w-full max-w-[34rem] justify-items-center gap-6 rounded-[1.8rem] border border-[var(--site-line)] bg-[color:color-mix(in_srgb,var(--site-surface)_86%,transparent)] p-8 text-center shadow-[0_30px_80px_-50px_#16233d] backdrop-blur-xl sm:p-10">
        <span className="offline-pulse grid size-16 place-items-center rounded-[1.3rem] border border-[var(--site-line)] bg-[color:color-mix(in_srgb,var(--c-teal)_10%,var(--site-surface))] text-[var(--c-teal)]">
          <WifiOff className="size-7" aria-hidden="true" />
        </span>

        <div className="grid gap-3">
          <h1 className="m-0 text-[1.5rem] leading-[1.5] font-extrabold">
            شما آفلاین هستید
          </h1>
          <p className="m-0 text-[.9rem] leading-8 text-[var(--site-muted)]">
            اتصال اینترنت برقرار نیست. صفحه‌هایی که قبلاً دیده‌اید از حافظهٔ
            دستگاه باز می‌شوند؛ بقیه به‌محض وصل‌شدن شبکه در دسترس‌اند.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--c-teal)] px-5 text-[.85rem] font-extrabold text-white shadow-[0_14px_30px_-18px_var(--c-teal)] transition-[filter] hover:brightness-110"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            تلاش دوباره
          </a>
          <Link
            href="/articles"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--site-line)] px-5 text-[.85rem] font-extrabold text-[var(--site-ink)] transition-colors hover:border-[var(--c-teal)]"
          >
            <CloudOff className="size-4" aria-hidden="true" />
            مقاله‌های ذخیره‌شده
          </Link>
        </div>

        <p className="m-0 text-[.74rem] leading-6 text-[var(--site-muted)]">
          محتوای حساب کاربری و پنل مدیریت هرگز برای استفادهٔ آفلاین ذخیره
          نمی‌شود.
        </p>
      </section>
    </main>
  );
}
