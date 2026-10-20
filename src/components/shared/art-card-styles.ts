// Shared physical cutout and medallion geometry for article, workshop and carousel cards.
// The mask deliberately cuts the physical bottom-right corner in both RTL and LTR.
export const artMediaMaskClassName =
  "overflow-hidden rounded-[21px_21px_21px_6px] [mask-image:radial-gradient(circle_38px_at_right_bottom,transparent_97%,#000_100%)] [-webkit-mask-image:radial-gradient(circle_38px_at_right_bottom,transparent_97%,#000_100%)] max-[359.02px]:[mask-image:radial-gradient(circle_34px_at_right_bottom,transparent_97%,#000_100%)] max-[359.02px]:[-webkit-mask-image:radial-gradient(circle_34px_at_right_bottom,transparent_97%,#000_100%)]";

export const artSealClassName =
  "art-card-seal pointer-events-none absolute right-0 bottom-0 z-[1] grid size-[68px] place-items-center rounded-[50%] border-[7px] border-[var(--art-surface,var(--surface))] bg-[linear-gradient(145deg,#e0f0e7,#a7d0ca)] text-[1.55rem] text-[#185d63] [box-shadow:inset_0_0_0_1px_rgb(19_91_91_/_10%)] dark:bg-[linear-gradient(135deg,#145d5c,#325775)] dark:text-[#defbf1] max-[359.02px]:size-[60px]";

export const artSealCompactClassName =
  "size-[66px]! max-[359.02px]:size-[60px]!";

export const artCornerClassName =
  "before:pointer-events-none before:absolute before:top-0 before:end-0 before:-z-[1] before:size-[105px] before:rounded-[0_28px_0_100%] before:bg-[radial-gradient(circle_at_95%_5%,rgb(41_140_124_/_13%),transparent_72%)] before:content-['']";

export const artIconTileClassName =
  "rounded-[48%_48%_48%_15%] [box-shadow:0_7px_20px_-11px_rgb(20_92_88_/_35%)]";

// Paint and shape are static utilities. Public cards now supply their own
// Tailwind paint transition; their rainbow hover lift is owned by Motion.
export const artSurfaceClassName =
  "relative isolate border! border-[color:color-mix(in_srgb,var(--c-teal)_19%,var(--line))]! [--art-surface:var(--surface)] [background:var(--art-surface)]! [box-shadow:0_3px_7px_rgb(14_55_62_/_3%),0_22px_50px_-28px_rgb(26_75_78_/_28%)]! rounded-[28px_28px_28px_9px]! hover:border-[color:color-mix(in_srgb,var(--c-teal)_42%,var(--line))]! hover:[box-shadow:0_8px_22px_-12px_rgb(17_79_83_/_22%),0_28px_54px_-26px_rgb(24_84_84_/_27%)]!";
