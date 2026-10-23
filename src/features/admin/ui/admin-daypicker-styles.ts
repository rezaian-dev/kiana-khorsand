import { getDefaultClassNames } from "@daypicker/react";

/** Preserve DayPicker's vendor layout while styling its public slots with Tailwind. */
const defaults = getDefaultClassNames();
export const adminDayPickerClassNames = {
  ...defaults,
  root: `${defaults.root} mx-auto [font-family:inherit] [--rdp-accent-color:var(--ar-brand-ink)]! [--rdp-accent-background-color:var(--ar-brand-soft)]! [--rdp-day-width:38px]! [--rdp-day-height:38px]! [--rdp-day_button-width:36px]! [--rdp-day_button-height:36px]! max-[420.02px]:[--rdp-day-width:32px]! max-[420.02px]:[--rdp-day-height:36px]! max-[420.02px]:[--rdp-day_button-width:31px]! max-[420.02px]:[--rdp-day_button-height:34px]!`,
  day_button: `${defaults.day_button} rounded-[12px]! [font-family:inherit] hover:bg-[var(--ar-brand-soft)]!`,
  selected: `${defaults.selected} dark:[&_button]:bg-[#95e1d4]! dark:[&_button]:text-[#0d2630]!`,
};

/** Admin product surfaces around DayPicker; the vendor grid stays in its stylesheet. */
const calendarPanelBase =
  "absolute end-0 top-[calc(100%+8px)] w-[min(352px,calc(100vw-40px))] rounded-[20px] border border-[var(--panel-line)] bg-[var(--panel-surface)] p-4 text-[var(--panel-text)] [box-shadow:0_26px_64px_-24px_rgba(25,30,65,0.34)] max-[600.02px]:fixed max-[600.02px]:inset-auto max-[600.02px]:top-1/2 max-[600.02px]:left-1/2 max-[600.02px]:z-[110] max-[600.02px]:max-h-[calc(100dvh-40px)] max-[600.02px]:w-[min(352px,calc(100vw-24px))] max-[600.02px]:overflow-y-auto max-[600.02px]:[transform:translate(-50%,-50%)] max-[600.02px]:[box-shadow:0_0_0_100vmax_rgba(12,18,34,0.32),0_30px_65px_-20px_rgba(12,18,34,0.45)]";
export const adminCalendarPopoverClassName = `admin-jalali-popover ${calendarPanelBase} z-[55]`;
export const adminCalendarInlineClassName = `admin-jalali-inline ${calendarPanelBase} z-20`;
export const adminCalendarDismissClassName =
  "admin-jalali-dismiss mx-auto mt-[.4rem] block p-2 font-bold text-[var(--ar-brand-ink)]";

/** Two compact Jalali triggers share this skin; workshop triggers keep their distinct layout. */
export const adminJalaliCompactTriggerClassName =
  "admin-jalali-trigger inline-flex min-h-[42px] items-center justify-center gap-[.4rem] rounded-[12px] [border:1px_solid_var(--panel-line)] bg-[var(--panel-surface)] px-[.8rem] py-[.4rem] text-[.82rem] font-[750] text-[var(--panel-text)] hover:border-[var(--panel-accent)]! hover:[box-shadow:0_0_0_3px_var(--ar-brand-soft)]! focus-visible:border-[var(--panel-accent)]! focus-visible:[box-shadow:0_0_0_3px_var(--ar-brand-soft)]!";
