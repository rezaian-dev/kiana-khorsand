// Server component — CSS-only decorative motion, no JS bundle cost
export function PortraitFloat({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="home-photo-pan absolute -inset-2 motion-safe:animate-[photo-float_10s_ease-in-out_infinite] motion-reduce:animate-none [&>img]:size-full">
        {children}
      </div>
      <span
        data-motion-glint=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-22%] left-[-40%] z-[2] h-[150%] w-[48%] opacity-0 motion-safe:animate-[photo-glint_12s_ease-in-out_infinite] motion-reduce:animate-none"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 -skew-x-[14deg] [background-image:linear-gradient(90deg,transparent,#baf6ff16_25%,#ffffff7a_51%,#9ad9e63b_61%,transparent)] mix-blend-screen"
        />
      </span>
      <style>{`@keyframes photo-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}@keyframes photo-glint{0%,10%{transform:translateX(-130%);opacity:0}14%{opacity:.22}22%{transform:translateX(620%);opacity:.3}27%{opacity:0}28%,100%{transform:translateX(-130%);opacity:0}}`}</style>
    </div>
  );
}

export function FloatingTicket({
  children,
  delay = 0,
  className = "",
  floatY = -7,
  tone = "teal",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  floatY?: number;
  tone?: "teal" | "violet";
}) {
  const anim =
    floatY > 0
      ? "ticket-float-down_5.8s_ease-in-out_infinite"
      : "ticket-float-up_5.2s_ease-in-out_infinite";
  return (
    <div
      className={`${className} pointer-events-none absolute isolate z-[2] flex aspect-auto min-h-[66px] w-max max-w-[min(210px,75%)] items-center justify-start gap-[.65rem] rounded-[20px] border border-[color:color-mix(in_srgb,#cce9e4_80%,var(--site-surface))] bg-[color:color-mix(in_srgb,var(--site-surface)_95%,#d8f5f0)] px-[.85rem] py-[.48rem] text-start text-[var(--site-ink)] shadow-[0_17px_37px_-16px_#173a50a6,0_1px_4px_#173a5030] [direction:rtl] max-[480.02px]:min-h-[55px] max-[480.02px]:gap-[.4rem] max-[480.02px]:rounded-[15px] max-[480.02px]:px-[.5rem] max-[480.02px]:py-[.35rem]`}
      aria-hidden="true"
    >
      <span
        className={`home-ticket-halo pointer-events-none absolute -inset-[7px] z-0 rounded-[24px] border shadow-[0_9px_24px_-12px_#138b9680] motion-safe:animate-[${anim}] motion-reduce:animate-none ${tone === "violet" ? "border-[#bea8d49c] [background-image:linear-gradient(125deg,#eee1f389,#dcecf58a)]" : "border-[#80c8c7a6] [background-image:linear-gradient(125deg,#d9f4eb88,#e7e6f687)]"}`}
        aria-hidden="true"
        style={{ animationDelay: delay > 0.2 ? "0.35s" : "0.15s" }}
      />
      <div className="home-ticket-float relative z-[1] flex items-center gap-[.65rem] [direction:rtl] max-[480.02px]:gap-[.4rem]">
        {children}
      </div>
      <style>{`@keyframes ticket-float-up{0%,100%{opacity:.24;transform:translateY(0) scale(.97)}50%{opacity:.66;transform:translateY(-7px) scale(1.04)}}@keyframes ticket-float-down{0%,100%{opacity:.24;transform:translateY(0) scale(.97)}50%{opacity:.66;transform:translateY(7px) scale(1.04)}}`}</style>
    </div>
  );
}
