/**
 * Design tokens for the account and admin panels.
 *
 * Same rule as the public site: every panel surface, form and control is described once,
 * here, and the panel components stay readable.
 */
/** Shared admin heading and status skin used by the overview, calendar and availability pages. */
export const adminOverviewHeadingClassName =
  "admin-overview-panel-heading mb-4 flex items-center justify-between gap-4";
export const adminOverviewTitleClassName = "text-[1.12rem]! font-extrabold";
export const adminOverviewLinkClassName =
  "inline-flex items-center gap-[.35rem] whitespace-nowrap text-[.82rem] font-bold text-[var(--ar-brand-ink)]";
export const adminOverviewStatusClassName =
  "admin-overview-status ms-auto rounded-[99px] bg-[var(--ar-brand-soft)] px-[.6rem] py-[.2rem] text-center text-[.75rem] font-bold text-[var(--ar-brand-ink)]! max-[480.02px]:ms-0 [&.status-cancelled]:bg-[var(--ar-danger-soft)] [&.status-cancelled]:text-[var(--ar-danger)]!";

import { fieldReducedMotionClassName } from "@/components/layout/public-styles";
import { fieldScopeClassName } from "@/components/shared/field-styles";

/** Shared panel shell for account and admin; native details and their pseudo-content keep a no-JS disclosure fallback. */
export const panelShellClassName =
  "panel-shell min-h-dvh bg-[var(--panel-bg)] text-[var(--panel-text)] [--panel-bg:#f8f6fb] [--panel-surface:#fff] [--panel-line:#e8e1ee] [--panel-text:#28223d] [--panel-muted:#55506e] [--panel-accent:#5130ad] dark:[--panel-bg:#191523] dark:[--panel-surface:#251e32] dark:[--panel-line:#453752] dark:[--panel-text:#f6f2ff] dark:[--panel-muted:#d0c6da] dark:[--panel-accent:#c6b5ff] max-[900.02px]:not-[.admin-ref-frame]:pb-[calc(136px+env(safe-area-inset-bottom,0px))] [&.panel-admin_.panel-nav-item]:min-h-10 [&.panel-admin_.panel-nav-item]:py-[.35rem] [&.panel-admin_.panel-sidebar]:py-[.8rem] [&.panel-admin_.panel-sidebar-title]:pb-[.45rem] " +
  "supports-[interpolate-size:allow-keywords]:[&_details]:[interpolate-size:allow-keywords] " +
  "supports-[interpolate-size:allow-keywords]:[&_details::details-content]:[block-size:0] " +
  "supports-[interpolate-size:allow-keywords]:[&_details::details-content]:opacity-0 " +
  "supports-[interpolate-size:allow-keywords]:[&_details::details-content]:overflow-clip " +
  "supports-[interpolate-size:allow-keywords]:[&_details::details-content]:[transition:block-size_0.38s_cubic-bezier(0.22,1,0.36,1),opacity_0.32s_ease,content-visibility_0.38s_allow-discrete] " +
  "supports-[interpolate-size:allow-keywords]:[&_details:open::details-content]:[block-size:auto] " +
  "supports-[interpolate-size:allow-keywords]:[&_details:open::details-content]:opacity-100 " +
  "[&_details>summary]:transition-[color,background-color] [&_details>summary]:duration-[250ms] [&_details>summary]:ease-[ease] " +
  "[&_details:open>summary]:text-[var(--panel-accent,var(--c-teal))] [&_details>summary:hover]:text-[var(--panel-accent,var(--c-teal))] " +
  "motion-reduce:[&_details::details-content]:[transition:none] " +
  fieldScopeClassName +
  " " +
  fieldReducedMotionClassName;

/** Residual static admin states, scoped to the actual server-rendered frame. */
export const adminFrameStaticStatesClassName =
  "[&_:is(.panel-button,.admin-ref-nav-item,.admin-overview-quick_a)]:[transition:background-color_.2s_ease,color_.2s_ease,box-shadow_.2s_ease] motion-reduce:[&_:is(.panel-button,.admin-ref-nav-item,.admin-overview-quick_a)]:[transition:none]! " +
  "[&_.panel-admin-form_:is(input,select,textarea)]:[transition:border-color_.2s_ease,box-shadow_.2s_ease] " +
  "[&_details:not(.admin-create-panel)>summary::after]:[transition:transform_.32s_cubic-bezier(0.22,1,0.36,1)] motion-reduce:[&_details:not(.admin-create-panel)>summary::after]:[transition:none]! " +
  "[&_.panel-admin-form_:is(input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=file]),textarea,select)]:[transition:border-color_.2s_ease,box-shadow_.2s_ease,background-color_.2s_ease]! [&_.panel-inline-form_select]:rounded-[12px]! [&_.panel-form_textarea]:resize-y! " +
  "[&_.admin-block-success]:text-[var(--ar-brand-ink)]! [&_.admin-block-success]:text-[.85rem]! [&_.admin-block-success]:font-bold! [&_.admin-block-success_a]:underline! [&_.admin-block-success_a]:[text-underline-offset:3px]! " +
  "[&_details:not(.admin-create-panel)>summary]:flex [&_details:not(.admin-create-panel)>summary]:items-center [&_details:not(.admin-create-panel)>summary]:justify-between [&_details:not(.admin-create-panel)>summary]:gap-[.7rem] [&_details:not(.admin-create-panel)>summary]:cursor-pointer [&_details:not(.admin-create-panel)>summary]:[list-style:none] " +
  "[&_details:not(.admin-create-panel)>summary::-webkit-details-marker]:hidden " +
  "[&_details:not(.admin-create-panel)>summary::after]:content-[''] [&_details:not(.admin-create-panel)>summary::after]:block [&_details:not(.admin-create-panel)>summary::after]:flex-none [&_details:not(.admin-create-panel)>summary::after]:size-[9px] [&_details:not(.admin-create-panel)>summary::after]:[margin-inline:.35rem] [&_details:not(.admin-create-panel)>summary::after]:[border-right:2px_solid_currentColor] [&_details:not(.admin-create-panel)>summary::after]:[border-bottom:2px_solid_currentColor] [&_details:not(.admin-create-panel)>summary::after]:[transform:rotate(45deg)] " +
  "[&_details[open]:not(.admin-create-panel)>summary::after]:[transform:rotate(225deg)] " +
  "[&_.admin-create-panel_summary::-webkit-details-marker]:hidden";

/** A single focusable skip link in both server-rendered frames. */
export const panelSkipClassName =
  "panel-skip fixed -top-[100px] start-4 z-[100] bg-[var(--panel-surface)] p-[.8rem] focus:top-[.7rem]";

/** Sheet portals to body, so palette fallbacks are explicit for the account menu. */
export const panelSheetClassName =
  "panel-sheet overflow-y-auto rounded-[1.25rem_0_0_1.25rem] bg-[var(--panel-surface,#fff)] text-[var(--panel-text,#28223d)] data-[side=right]:w-[min(86vw,320px)] dark:bg-[var(--panel-surface,#251e32)] dark:text-[var(--panel-text,#f6f2ff)]";

/** Collection layout shared by server-rendered appointment lists and client filters. */
export const panelListClassName = "panel-list grid gap-3";

/** Flexing summary rows preserve shrink behavior and typography across all admin lists. */
export const panelListItemClassName =
  "panel-list-item flex flex-wrap items-center justify-between gap-4 [&>div]:min-w-0 [&_h2]:mb-[.3rem]! [&_h2]:font-extrabold [&_p]:text-[var(--panel-muted)] [&_p]:leading-[1.65]";

/** Inline status forms retain native controls and button geometry without new client code. */
export const panelInlineFormClassName =
  "panel-inline-form flex flex-wrap items-center gap-2 [&_:is(select,input)]:min-h-10 [&_:is(select,input)]:max-w-full [&_:is(select,input)]:[padding:.4rem_.65rem] [&_:is(select,input)]:[background:var(--panel-surface)] [&_:is(select,input)]:text-[var(--panel-text)] [&_:is(select,input)]:[border:1px_solid_var(--panel-line)] [&_:is(select,input)]:rounded-[.6rem] [&_.panel-button]:min-h-10!";

/** Dashboard and admin collections keep their auto-fit behavior at narrow widths. */
export const panelGridClassName =
  "panel-grid grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-4";

/** Plain stacks and stacked cards share the same gap and child shrink protection. */
export const panelStackClassName = "panel-stack grid gap-4 [&>*]:min-w-0";

/** Summary cards retain their original minimum height and 32px metric. */
export const panelStatClassName =
  "panel-stat flex min-h-[150px] flex-col justify-between [&_strong]:text-[2rem]";

/** Static panel card skin; semantic card, form, list and shadcn variants keep their overrides. */
export const panelCardClassName =
  "panel-card min-w-0 [.panel-shell_&]:[box-shadow:0_15px_35px_-30px_rgb(41_83_90_/_25%)] rounded-[1.2rem] border border-[var(--panel-line)] bg-[var(--panel-surface)] p-[clamp(1rem,2vw,1.4rem)] [&_h2]:mb-[.8rem] [&_h2]:text-[1.1rem] [&_h2]:font-extrabold [&_p]:leading-[1.8] [&_a:not(.panel-button)]:font-bold [&_a:not(.panel-button)]:text-[var(--panel-accent)] [.admin-ref-frame_&]:[overflow-wrap:anywhere] [.admin-ref-frame_&_h2]:text-[var(--panel-text)] [.admin-ref-frame_&]:not-[.admin-calendar-board]:[box-shadow:0_14px_35px_-28px_rgba(18,86,95,.25)]!";

/** Shared account and scheduling forms; their hidden native inputs retain legacy styling. */
export const panelFormClassName = `
  "panel-form grid gap-[.7rem] [&_label]:font-[750] [&_:is(input,textarea)]:min-h-11 [&_:is(input,textarea)]:w-full [&_:is(input,textarea)]:rounded-[.7rem] [&_:is(input,textarea)]:[padding:.6rem_.8rem] [&_:is(input,textarea)]:[border:1px_solid_var(--panel-line)] [&_:is(input,textarea)]:[background:var(--panel-surface)] [&_:is(input,textarea)]:text-[var(--panel-text)] [&_textarea]:min-h-[100px] [&_textarea]:resize-y ${fieldScopeClassName}`;

/** Admin editor forms keep their existing label, field, help, and section rhythm. */
export const panelAdminFormClassName = `
  "panel-admin-form grid max-w-[740px] gap-[.65rem] [&_label]:text-[.9rem] [&_label]:font-[750] [&_:is(input,textarea,select)]:min-h-11 [&_:is(input,textarea,select)]:w-full [&_:is(input,textarea,select)]:rounded-[.7rem] [&_:is(input,textarea,select)]:[padding:.6rem_.8rem] [&_:is(input,textarea,select)]:[border:1px_solid_var(--panel-line)] [&_:is(input,textarea,select)]:[background:var(--panel-surface)] [&_:is(input,textarea,select)]:text-[var(--panel-text)] [&_textarea]:min-h-[105px] [&_textarea]:resize-y [&_textarea[name=body]]:min-h-[260px] [&_.panel-help]:text-[.86rem] [&_.panel-help]:leading-[1.8] [&_.panel-help]:text-[var(--panel-muted)] [&_.panel-help]:[margin:-.3rem_0_.7rem] [&_h2:not(:first-child)]:mt-4 [&_h2:not(:first-child)]:[border-top:1px_solid_var(--panel-line)] [&_h2:not(:first-child)]:pt-6 ${fieldScopeClassName}`;

/** Shared action skin. Keep the semantic hook for active admin and inline-form overrides. */
export const panelButtonClassName =
  "panel-button inline-flex min-h-11 items-center justify-center rounded-[.75rem] bg-[#5130ad] px-5 py-[.65rem] font-extrabold not-[.panel-button-outline]:text-white hover:bg-[#392178] cursor-pointer [.admin-ref-frame_&]:not-[.panel-button-outline]:[background:#147c83] [.admin-ref-frame_&]:not-[.panel-button-outline]:hover:[background:#0f6871]";

/** Quiet secondary actions inherit the panel palette, including its dark theme. */
export const panelButtonOutlineClassName =
  "panel-button-outline border border-[var(--panel-line)] bg-[var(--panel-surface)] text-[var(--panel-accent)] hover:bg-[var(--panel-bg)] [.admin-ref-frame_&]:bg-[var(--panel-surface)] [.admin-ref-frame_&]:text-[var(--ar-brand-ink)] [.admin-ref-frame_&]:border-[var(--panel-line)] [.admin-ref-frame_&]:hover:bg-[var(--panel-surface)]";

/** Secondary copy and compact metadata inherit the account/admin palette. */
export const panelMutedClassName = "panel-muted text-[var(--panel-muted)]";
export const panelMetaClassName =
  "panel-meta flex flex-wrap items-center gap-2 text-[.85rem] text-[var(--panel-muted)]";

/** Accessible form feedback remains conspicuous in both themes. */
export const panelErrorClassName =
  "panel-error font-bold text-[#a62445] dark:text-[#ffabc0]";

/** Native admin disclosures stay usable without JS; their own marker skin is separate. */
export const adminCreatePanelClassName = "admin-create-panel group mb-4";
export const adminCreatePanelSummaryClassName =
  "flex cursor-pointer [list-style:none] items-center gap-[.6rem] font-extrabold text-[var(--ar-brand-ink)]! before:grid before:size-8 before:place-items-center before:rounded-[11px] before:bg-[var(--ar-brand-soft)] before:text-[1.2rem] before:leading-none before:content-['+'] group-open:before:content-['−']";

/** Admin's opaque-looking glass uses scoped theme tokens, including the dark palette. */
export const adminGlassClassName =
  "rounded-[20px] border border-[var(--panel-line)] [background:var(--ar-surface)] [box-shadow:var(--ar-shadow)] [backdrop-filter:blur(18px)_saturate(150%)]";

/** Scoped admin palette; the shared dashboard panel variables must stay independent. */
export const adminFramePaletteClassName = [
  "[--panel-bg:#f4f5fa]!",
  "[--panel-surface:#fff]!",
  "[--panel-line:#0f172a14]!",
  "[--panel-text:#111827]!",
  "[--panel-muted:#6b7280]!",
  "[--panel-accent:#147c83]!",
  "[--ar-surface:#ffffffb8]",
  "[--ar-surface2:#ffffff8c]",
  "[--ar-border-strong:#0f172a29]",
  "[--ar-text2:#475569]",
  "[--ar-brand-soft:#1b8f891f]",
  "[--ar-brand-ink:#126b73]",
  "[--ar-accent:#d38262]",
  "[--ar-danger:#b3243a]",
  "[--ar-danger-soft:#b3243a1a]",
  "[--ar-shadow:0_1px_2px_#0f172a0a,_0_14px_34px_-16px_#0f172a47]",
  "[--ar-grad1:#4294b72b]",
  "[--ar-grad2:#41bea126]",
  "dark:[--panel-bg:#0b0f1a]!",
  "dark:[--panel-surface:#151a27]!",
  "dark:[--panel-line:#ffffff1a]!",
  "dark:[--panel-text:#eef1f7]!",
  "dark:[--panel-muted:#97a3b6]!",
  "dark:[--panel-accent:#77d5cb]!",
  "dark:[--ar-surface:#161b2ab8]",
  "dark:[--ar-surface2:#ffffff0a]",
  "dark:[--ar-border-strong:#fff3]",
  "dark:[--ar-text2:#b8c1d1]",
  "dark:[--ar-brand-soft:#65d7c726]",
  "dark:[--ar-brand-ink:#95e1d4]",
  "dark:[--ar-accent:#f1ab8e]",
  "dark:[--ar-danger:#ff9aac]",
  "dark:[--ar-danger-soft:#ff9aac24]",
  "dark:[--ar-shadow:0_1px_2px_#00000073,_0_20px_44px_-20px_#000c]",
  "dark:[--ar-grad1:#448bb136]",
  "dark:[--ar-grad2:#3a9c8f2b]",
].join(" ");

/**
 * The desktop admin sidebar's own skin: glass off, a soft two-tone wash, and the
 * nav rows restyled into the frame. It lives here because it is a page-level
 * theme, not because the component needs it twice — a 3,000-character className
 * in the JSX is unreadable and unreviewable.
 */
export const adminSidebarClassName = `fixed inset-y-4 inset-s-4 z-40 hidden w-[264px] flex-col gap-[.35rem] overflow-y-auto p-[.875rem] min-[1024px]:flex min-[1024px]:border-[#cee0e2] min-[1024px]:p-[.9rem_.7rem] min-[1024px]:[box-shadow:-12px_16px_40px_-24px_#36657672] min-[1024px]:[backdrop-filter:none] min-[1024px]:[background:radial-gradient(circle_at_12%_6%,#d7e8f8a8,transparent_34%),radial-gradient(circle_at_100%_95%,#ebdff59c,transparent_38%),linear-gradient(157deg,#f6fbfb_0%,#edf5f7_55%,#f7f3fa_100%)] dark:min-[1024px]:border-[#365464] dark:min-[1024px]:[box-shadow:-12px_16px_40px_-24px_#030c1bc9] dark:min-[1024px]:[background:radial-gradient(circle_at_12%_6%,#31536980,transparent_34%),radial-gradient(circle_at_100%_95%,#403b6b55,transparent_38%),linear-gradient(157deg,#213743_0%,#172b38_55%,#1b283a_100%)] min-[1024px]:[&_.admin-ref-nav-item]:relative min-[1024px]:[&_.admin-ref-nav-item]:isolate min-[1024px]:[&_.admin-ref-nav-item]:min-h-11 min-[1024px]:[&_.admin-ref-nav-item]:rounded-none min-[1024px]:[&_.admin-ref-nav-item]:font-bold min-[1024px]:[&_.admin-ref-nav-item]:text-[#345368] min-[1024px]:[&_.admin-ref-nav-item]:[border:1px_solid_transparent] dark:min-[1024px]:[&_.admin-ref-nav-item]:text-[#d2e7eb] min-[1024px]:[&_.admin-ref-nav-item_svg]:size-[22px] min-[1024px]:[&_.admin-ref-nav-item_svg]:rounded-[7px] min-[1024px]:[&_.admin-ref-nav-item_svg]:bg-[#cfe5e58a] min-[1024px]:[&_.admin-ref-nav-item_svg]:p-[2px] dark:min-[1024px]:[&_.admin-ref-nav-item_svg]:bg-[#385767] min-[1024px]:[&_.admin-ref-nav-item:focus-visible]:[outline:3px_solid_#146e83] min-[1024px]:[&_.admin-ref-nav-item:focus-visible]:outline-offset-[-3px] min-[1024px]:[&_.admin-ref-nav-item:hover]:bg-[#dcefee] min-[1024px]:[&_.admin-ref-nav-item:hover]:text-[#165e69] dark:min-[1024px]:[&_.admin-ref-nav-item:hover]:bg-[#304f5c] dark:min-[1024px]:[&_.admin-ref-nav-item:hover]:text-[#f6fffc] min-[1024px]:[&_.admin-ref-nav-item>svg]:relative min-[1024px]:[&_.admin-ref-nav-item>svg]:z-1 min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:rounded-[18px_0_0_18px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:border-transparent min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:text-[#144e60] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:[background:transparent] dark:min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]]:text-[#effffb] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]_svg]:bg-[#c5e5e1] dark:min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]_svg]:bg-[#397879] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:absolute min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:inset-s-[2px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:inset-bs-1/2 min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:z-2 min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:block-[22px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:inline-1 min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:transform-[translateY(-50%)] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:rounded-[9px] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:bg-[#138c8f] min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:content-[''] dark:min-[1024px]:[&_.admin-ref-nav-item[aria-current=page]::before]:bg-[#91ead8] min-[1024px]:[&_.admin-ref-nav-label]:relative min-[1024px]:[&_.admin-ref-nav-label]:z-1`;
