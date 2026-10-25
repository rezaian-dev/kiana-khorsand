"use client";

import { formatNumber } from "@/lib/format";
import { panelMutedClassName } from "@/components/panels/panel-styles";

import { useState } from "react";
import { Clock3 } from "lucide-react";
import { m } from "motion/react";
import { useLiveReducedMotion } from "@/components/layout/use-live-reduced-motion";
const choices = Array.from({ length: 31 }, (_, index) => {
  const total = 7 * 60 + index * 30;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
});
export function SlotPicker({ id, initial }: { id: string; initial: string[] }) {
  const [slots, setSlots] = useState(initial);
  const reduceMotion = useLiveReducedMotion();
  const options = [...new Set([...choices, ...initial])].sort();
  return (
    <div className="admin-slot-picker min-w-0" id={id}>
      <input
        type="hidden"
        name="slots"
        value={slots.slice().sort().join(", ")}
      />
      <div className="admin-slot-picker-caption mb-[.65rem] flex items-center gap-2 font-[750]">
        <Clock3 size={16} aria-hidden="true" />
        <span>ساعت‌های قابل درخواست</span>
        <small className="ms-auto text-(--panel-muted)">
          {formatNumber(slots.length)} زمان
        </small>
      </div>
      <div
        className="admin-slot-picker-grid grid max-h-[205px] scrollbar-thin grid-cols-[repeat(auto-fit,minmax(65px,1fr))] gap-[.35rem] overflow-auto rounded-[12px] p-1"
        role="group"
        aria-label="ساعت‌های قابل درخواست"
      >
        {options.map((time) => (
          <m.button
            type="button"
            className="min-h-9 rounded-[9px] bg-(--panel-surface) text-[.78rem] text-(--panel-text) [border:1px_solid_var(--panel-line)] hover:border-(--ar-accent)! disabled:transform-none! disabled:cursor-not-allowed! disabled:opacity-[.42]! aria-pressed:border-(--ar-brand-ink)! aria-pressed:bg-(--ar-brand-ink)! aria-pressed:text-(--panel-surface)! noscript:hover:transform-[translateY(-2px)]!"
            key={time}
            initial={false}
            whileHover={{ y: -2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            aria-pressed={slots.includes(time)}
            disabled={slots.length >= 24 && !slots.includes(time)}
            onClick={() =>
              setSlots((current) =>
                current.includes(time)
                  ? current.filter((value) => value !== time)
                  : [...current, time],
              )
            }
          >
            {time}
          </m.button>
        ))}
      </div>
      <p className={panelMutedClassName}>
        اگر هیچ زمانی انتخاب نشود، روز تعطیل خواهد بود. حداکثر ۲۴ زمان قابل ثبت
        است.
      </p>
    </div>
  );
}
