/** Beautiful teal dock — unified across all pages, 320px safe, glass, responsive — high contrast in both themes */
export const mobileDockClassName =
  "mobile-dock fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[440px] items-center justify-between gap-1.5 rounded-[30px] border border-white/60 bg-white/85 p-2 shadow-[0_16px_48px_-16px_rgba(13,115,107,0.22),0_6px_16px_-6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/70 dark:border-white/15 dark:bg-zinc-900/92 dark:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.6)] [direction:rtl] left-[max(8px,env(safe-area-inset-left,0px))] right-[max(8px,env(safe-area-inset-right,0px))] bottom-[max(8px,env(safe-area-inset-bottom,0px))] max-[360px]:inset-x-2 max-[360px]:gap-1 max-[360px]:p-1.5 max-[360px]:rounded-[26px] max-[320px]:inset-x-1 max-[320px]:gap-0.5 max-[320px]:p-1.5 max-[320px]:rounded-[22px] min-[600px]:left-1/2 min-[600px]:right-auto min-[600px]:w-[min(480px,calc(100%-32px))] min-[600px]:-translate-x-1/2";

export const mobileDockItemClassName =
  "mobile-dock-item group/item relative flex flex-1 flex-col items-center justify-center gap-1.5 rounded-[22px] px-1.5 py-2.5 text-[11px] font-bold leading-none tracking-tight text-slate-600 dark:text-zinc-300 will-change-transform transition-[color,transform] duration-200 ease-out hover:text-teal-600 dark:hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 active:scale-[0.98] aria-[current=page]:text-white! dark:aria-[current=page]:text-white! aria-[current=page]:[text-shadow:0_1px_3px_rgba(0,0,0,0.28)] max-[360px]:py-2 max-[360px]:gap-1 max-[360px]:text-[10px] max-[320px]:px-1 max-[320px]:py-1.5 max-[320px]:text-[9px] max-[320px]:gap-0.5 max-[320px]:rounded-[18px]";

export const mobileDockIconClassName =
  "mobile-dock-icon relative grid size-8 place-items-center rounded-full transition-all duration-300 ease-out group-aria-[current=page]/item:scale-110 group-hover/item:scale-105 group-active/item:scale-90 max-[360px]:size-7 max-[320px]:size-6";

export const publicMovingDockClassName =
  "min-[600px]:left-1/2 min-[600px]:right-auto min-[600px]:w-[min(480px,calc(100%-32px))] min-[600px]:-translate-x-1/2";
