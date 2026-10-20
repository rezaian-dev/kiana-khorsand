/** Beautiful teal dock — 320px safe, glass, responsive */
export const mobileDockClassName =
  "mobile-dock fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-[420px] items-center justify-between gap-1 rounded-[28px] border border-white/60 bg-white/85 p-1.5 shadow-[0_16px_48px_-16px_rgba(13,115,107,0.22),0_6px_16px_-6px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/70 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-[0_16px_48px_-16px_rgba(0,0,0,0.5)] [direction:rtl] left-[max(8px,env(safe-area-inset-left,0px))] right-[max(8px,env(safe-area-inset-right,0px))] bottom-[max(8px,env(safe-area-inset-bottom,0px))] max-[360px]:inset-x-2 max-[360px]:gap-0.5 max-[360px]:p-1 max-[360px]:rounded-[24px] min-[600px]:left-1/2 min-[600px]:right-auto min-[600px]:w-[min(460px,calc(100%-32px))] min-[600px]:-translate-x-1/2";

export const mobileDockItemClassName =
  "mobile-dock-item group/item relative flex flex-1 flex-col items-center justify-center gap-1 rounded-[20px] px-1 py-2 text-[10px] font-bold leading-none tracking-tight text-slate-500 dark:text-zinc-400 transition-all duration-300 ease-out hover:text-teal-600 dark:hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 active:scale-[0.94] aria-[current=page]:text-white aria-[current=page]:[text-shadow:0_1px_2px_rgba(0,0,0,0.15)] max-[360px]:py-1.5 max-[360px]:gap-0.5 max-[360px]:text-[9px]";

export const mobileDockIconClassName =
  "mobile-dock-icon relative grid size-7 place-items-center rounded-full transition-all duration-300 ease-out group-aria-[current=page]/item:scale-110 group-hover/item:scale-105 group-active/item:scale-90 max-[360px]:size-6";

export const publicMovingDockClassName =
  "min-[600px]:left-1/2 min-[600px]:right-auto min-[600px]:w-[min(460px,calc(100%-32px))] min-[600px]:-translate-x-1/2";
