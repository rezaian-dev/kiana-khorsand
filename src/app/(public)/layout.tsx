import {
  publicLegacyClassName,
  fieldReducedMotionClassName,
} from "@/components/layout/public-styles";
import { fieldScopeClassName } from "@/components/shared/field-styles";
import "../public-foundation.css";
import { Header } from "@/components/layout/header";

import { PageReveal } from "@/components/layout/page-entrance";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${fieldReducedMotionClassName} ${publicLegacyClassName} site-shell reference-home scroll-pt-[6.5rem] [--field-accent:#0d736b] dark:[--field-accent:#6fe0d0] [--field-surface:#ffffff] [--field-surface-dark:#16202c] ${fieldScopeClassName} [font-family:Vazirmatn,Tahoma,system-ui,-apple-system,'Segoe_UI',sans-serif] text-[16px] leading-[1.7] antialiased selection:bg-[color:color-mix(in_srgb,var(--c-violet)_28%,transparent)] max-[768.02px]:pb-[calc(104px+env(safe-area-inset-bottom,0px))] [&_.break-words]:[word-break:break-word] [&_:where(button)]:cursor-pointer [&_:where(svg)]:h-auto [&_:where(svg)]:max-w-full [:where(&_:focus-visible)]:rounded-[6px]`}
    >
      <link rel="stylesheet" href="/assets/vendor/phosphor/duotone/style.css" />
      <link rel="stylesheet" href="/assets/vendor/phosphor/bold/style.css" />
      <link rel="stylesheet" href="/assets/vendor/phosphor/fill/style.css" />
      <a
        className="focus:bg-site-surface sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-lg focus:p-3"
        href="#main"
      >
        پرش به محتوای اصلی
      </a>
      <Header />
      <main id="main" className="[&:not(:has(.header-offset))]:pt-[75px]">
        <PageReveal>{children}</PageReveal>
      </main>
      <Footer />
    </div>
  );
}
