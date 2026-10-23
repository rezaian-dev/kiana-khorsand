import { BrandMark } from "@/components/shared/brand-mark";

/**
 * Launch screen for the installed app.
 *
 * Rendered on the server, hidden in a browser tab (`display-mode` variants), so it
 * paints before React, before the database and before the page underneath. Every rule
 * here is a Tailwind utility: the only thing this component "owns" is markup.
 *
 * The OS splash uses `background_color` from the manifest — the same ink as the base
 * layer below, so the hand-over is invisible.
 */
export function BootSplash() {
  return (
    <div
      id="boot-splash"
      className="animate-boot-hide fixed inset-0 z-[200] hidden place-items-center overflow-hidden text-[#f2f6f5] transition-[opacity,visibility,transform,filter] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [background:radial-gradient(120%_90%_at_80%_-10%,#16333c_0%,transparent_58%),radial-gradient(90%_80%_at_0%_110%,#1d2a45_0%,transparent_60%),#0a1219] [@media(display-mode:fullscreen)]:grid [@media(display-mode:minimal-ui)]:grid [@media(display-mode:standalone)]:grid [[data-splash=done]_&]:pointer-events-none [[data-splash=done]_&]:invisible [[data-splash=done]_&]:scale-[1.06] [[data-splash=done]_&]:opacity-0 [[data-splash=done]_&]:blur-[6px] [[data-splash=skip]_&]:hidden!"
    >
      {/* Aurora: two slow glows and a grain, all decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[10%]"
      >
        <span className="animate-boot-drift absolute start-[8%] top-[6%] aspect-square w-[min(58vw,26rem)] rounded-full bg-[color-mix(in_srgb,#14b8a6_55%,transparent)] opacity-70 blur-[70px] motion-reduce:animate-none" />
        <span className="animate-boot-drift-slow absolute end-[4%] bottom-[4%] aspect-square w-[min(62vw,30rem)] rounded-full bg-[color-mix(in_srgb,#7c6cf0_48%,transparent)] opacity-70 blur-[70px] motion-reduce:animate-none" />
        <span className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/35%)_0.5px,transparent_0.6px)] [mask-image:radial-gradient(circle_at_50%_45%,#000_30%,transparent_72%)] bg-[length:3px_3px] opacity-[0.16]" />
      </div>

      <div className="animate-boot-rise relative z-1 grid justify-items-center gap-2.5 px-6 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))] text-center motion-reduce:animate-none">
        <div className="relative mb-1.5 grid place-items-center">
          <span
            aria-hidden="true"
            className="animate-boot-breathe absolute -inset-[18px] rounded-[34px] border border-white/20 shadow-[inset_0_0_0_1px_rgb(255_255_255/6%),0_22px_60px_-30px_rgb(20_184_166/85%)] motion-reduce:animate-none"
          />
          <BrandMark
            size={52}
            className="relative z-1 scale-[1.45] rounded-[16px]"
          />
        </div>

        <p className="m-0 text-[clamp(1.35rem,5.4vw,1.7rem)] font-extrabold tracking-[-0.01em]">
          کیانا خرسند
        </p>
        <p className="m-0 text-[.82rem] text-[#e2f0ee]/70">
          روان‌شناس بالینی · همراهِ مسیر
        </p>

        {/* Loader: three dots and a light rail — the app is working, not frozen. */}
        <div aria-hidden="true" className="relative mt-4 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.14}s` }}
              className="animate-boot-dot size-[.46rem] rounded-full [background-image:linear-gradient(180deg,#7df3e2,#2fb3a6)] shadow-[0_0_14px_color-mix(in_srgb,#5ee8d6_70%,transparent)] motion-reduce:animate-none"
            />
          ))}
          <span className="animate-boot-sweep absolute inset-x-[30%] -bottom-[1.1rem] h-0.5 rounded-full [background-image:linear-gradient(90deg,transparent,color-mix(in_srgb,#6fe0d0_85%,transparent),transparent)] motion-reduce:animate-none" />
        </div>

        <p role="status" className="mt-5 mb-0 text-[.72rem] text-[#e2f0ee]/55">
          در حال آماده‌سازی فضای امن شما…
        </p>
      </div>
    </div>
  );
}
