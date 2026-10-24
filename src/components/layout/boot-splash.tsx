import { BrandMark } from "@/components/shared/brand-mark";

/**
 * The first thing the app paints.
 *
 * Two rules make it impossible for the page to appear before this screen:
 *
 * 1. it is rendered by the layout, so it is already in the first HTML bytes, and the
 *    stylesheet that styles it blocks the first paint — the browser cannot show the
 *    page underneath first;
 * 2. it is **not** gated on `display-mode`. An installed app that starts life as a
 *    browser tab (a deep link, a Custom Tab, the hand-off into the WebAPK) would
 *    otherwise paint the page and then pop the splash in on top of it, which is the
 *    flash this component exists to prevent.
 *
 * The only escapes are `data-splash="skip"` (set before paint by the inline script in
 * the layout: not the entry page, or a second visit in the same session) and the
 * CSS-only exit below, which covers a visitor whose JavaScript never runs.
 *
 * Everything is a Tailwind utility; the handful of keyframes live in `@theme`.
 */
export function BootSplash() {
  return (
    <div
      id="boot-splash"
      className="dark animate-boot-hide fixed inset-0 z-[200] grid place-items-center overflow-hidden text-[#f2f6f5] transition-[opacity,visibility,transform,filter] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [background:radial-gradient(120%_85%_at_76%_-10%,#1b4750_0%,#10242b_48%,transparent_74%),radial-gradient(95%_80%_at_2%_114%,#242a52_0%,transparent_58%),#0a1219] [[data-splash=done]_&]:pointer-events-none [[data-splash=done]_&]:invisible [[data-splash=done]_&]:scale-[1.04] [[data-splash=done]_&]:opacity-0 [[data-splash=done]_&]:blur-[8px] [[data-splash=skip]_&]:hidden!"
    >
      {/* Depth: two slow aurora glows, a grain, a vignette and a light seam on top. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="animate-boot-drift absolute start-[4%] top-[2%] aspect-square w-[min(64vw,30rem)] rounded-full bg-[color-mix(in_srgb,#14b8a6_46%,transparent)] opacity-80 blur-[90px] motion-reduce:animate-none" />
        <span className="animate-boot-drift-slow absolute end-[0%] bottom-[0%] aspect-square w-[min(70vw,34rem)] rounded-full bg-[color-mix(in_srgb,#7c6cf0_40%,transparent)] opacity-80 blur-[90px] motion-reduce:animate-none" />
        <span className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/38%)_0.5px,transparent_0.6px)] [background-size:3px_3px] opacity-[0.09] [mask-image:radial-gradient(circle_at_50%_30%,#000_0%,transparent_52%)]" />
        <span className="absolute inset-0 [background:radial-gradient(130%_100%_at_50%_46%,transparent_38%,rgb(4_9_12/78%)_100%)]" />
        <span className="absolute inset-x-0 top-0 h-px [background:linear-gradient(90deg,transparent,rgb(255_255_255/22%),transparent)]" />
        <span className="absolute inset-x-0 bottom-0 h-40 [background:linear-gradient(0deg,rgb(6_13_18/85%),transparent)]" />
      </div>

      <div className="relative z-1 grid w-full max-w-[21rem] justify-items-center gap-2 px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-center">
        {/* The mark sits in a glass tile, ringed by a breathing halo, with a slow
            specular sweep — the one moving detail you notice while waiting. */}
        <div className="relative mb-4 grid place-items-center">
          <span
            aria-hidden="true"
            className="animate-boot-breathe absolute size-[7.5rem] rounded-full blur-[26px] [background:conic-gradient(from_210deg,rgb(111_224_208/30%),transparent_38%,rgb(124_108_240/28%)_62%,transparent_88%)] motion-reduce:animate-none"
          />
          <span
            aria-hidden="true"
            className="[@media(prefers-reduced-motion:no-preference)]:animate-boot-breathe absolute size-[5.4rem] rounded-[32px] border border-white/15 shadow-[0_0_70px_-18px_rgb(20_184_166/80%)]"
          />
          <span className="relative grid size-[5.1rem] place-items-center overflow-hidden rounded-[26px] border border-white/15 bg-white/[0.06] shadow-[inset_0_1px_0_rgb(255_255_255/22%),0_26px_60px_-34px_rgb(0_0_0/90%)] backdrop-blur-xl">
            <BrandMark
              size={52}
              priority
              className="rounded-[16px] shadow-[0_12px_28px_-16px_rgb(0_0_0/75%)]"
            />
            <span
              aria-hidden="true"
              className="animate-boot-shine absolute inset-y-[-30%] w-1/2 [background:linear-gradient(100deg,transparent,rgb(255_255_255/30%),transparent)] motion-reduce:animate-none"
            />
          </span>
        </div>

        <p className="animate-boot-rise m-0 bg-[linear-gradient(180deg,#ffffff_18%,#9fe8db)] bg-clip-text text-[clamp(1.6rem,6.4vw,2rem)] font-extrabold tracking-[-0.015em] text-transparent [animation-delay:110ms] motion-reduce:animate-none">
          کیانا خرسند
        </p>
        <p className="animate-boot-rise m-0 text-[.8rem] tracking-[0.02em] text-[#dff2ee]/65 [animation-delay:210ms] motion-reduce:animate-none">
          روان‌شناس بالینی · همراهِ مسیر
        </p>

        {/* Progress: a real 3px rail that fills as the app readies itself. */}
        <div className="animate-boot-rise mt-6 w-[min(13rem,58vw)] [animation-delay:300ms] motion-reduce:animate-none">
          <div className="relative h-[3px] overflow-hidden rounded-full bg-white/12">
            <span className="animate-boot-fill absolute inset-y-0 right-0 w-full origin-right rounded-full bg-[linear-gradient(270deg,#8bf6e6,#2fb3a6)] shadow-[0_0_14px_rgb(111_224_208/75%)] motion-reduce:animate-none" />
            <span className="animate-boot-sweep absolute inset-y-0 w-1/3 [background:linear-gradient(90deg,transparent,rgb(255_255_255/60%),transparent)] motion-reduce:animate-none" />
          </div>
        </div>

        <p
          role="status"
          className="animate-boot-rise m-0 mt-1 text-[.73rem] text-[#dff2ee]/55 [animation-delay:390ms] motion-reduce:animate-none"
        >
          در حال آماده‌سازی فضای امن شما…
        </p>
      </div>
    </div>
  );
}
