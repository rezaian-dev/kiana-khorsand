// The scroll marker is rendered by the existing client progress island; the
// header and its content remain server-rendered. The ancestor variant observes
// the marker without a separate observer, DOM mutation or layout shift.
// Variant utility names remain whole literals for Tailwind's source scanner.
export const publicHeaderShellClassName =
  "header-shell border-b border-b-transparent [transition:background-color_0.35s,box-shadow_0.35s,border-color_0.35s] [.reference-home:has(.header-progress-scrolled)_&]:[background-color:var(--glass)] [.reference-home:has(.header-progress-scrolled)_&]:backdrop-blur-[18px] [.reference-home:has(.header-progress-scrolled)_&]:backdrop-saturate-[165%] [.reference-home:has(.header-progress-scrolled)_&]:border-b-[var(--line)] [.reference-home:has(.header-progress-scrolled)_&]:[box-shadow:0_12px_34px_-26px_rgb(25_23_49_/_55%)]";
export const publicHeaderRowClassName =
  "header-row flex h-[68px] items-center justify-between gap-2 sm:gap-3 max-[768.02px]:gap-[.35rem]! md:h-[74px] [transition:height_0.35s]";
