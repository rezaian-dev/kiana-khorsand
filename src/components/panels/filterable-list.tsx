"use client";

import {
  panelListClassName,
  panelCardClassName,
  panelButtonClassName,
  panelButtonOutlineClassName,
} from "@/components/panels/panel-styles";

import { useId, useState } from "react";
import { Search, X } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  m,
  useReducedMotion,
} from "motion/react";
import { motionTiming, tilePresence } from "@/lib/motion-tokens";

type Item = {
  key: string;
  search: string;
  status?: string;
  content: React.ReactNode;
};
type Option = { value: string; label: string };
export function FilterableList({
  items,
  options = [],
  label = "جست‌وجو در فهرست",
}: {
  items: Item[];
  options?: Option[];
  label?: string;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const normalized = query.trim().toLocaleLowerCase("fa-IR");
  const visible = items.filter(
    (item) =>
      (!normalized ||
        item.search.toLocaleLowerCase("fa-IR").includes(normalized)) &&
      (status === "all" || item.status === status),
  );
  return (
    <>
      <div
        className={`admin-list-filter ${panelCardClassName} mb-4 flex flex-wrap items-center gap-x-4 gap-y-[.7rem]`}
      >
        <div className="flex min-w-0 flex-[1_1_220px] items-center gap-[.55rem] rounded-[13px] border border-[var(--panel-line)] bg-[var(--panel-surface)] px-[.7rem] py-[.15rem] text-[var(--panel-muted)] focus-within:border-[#168f88] focus-within:ring-[3px] focus-within:ring-[rgba(25,143,137,.14)]">
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
          <Search size={19} aria-hidden="true" />
          <input
            id={id}
            className="h-[42px] w-full border-0 bg-transparent text-[.86rem] text-[var(--panel-text)] outline-none focus:shadow-none"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={label}
            autoComplete="off"
          />
        </div>
        {options.length > 0 && (
          <LayoutGroup id={id}>
            <div
              className="flex flex-wrap gap-[.35rem]"
              role="group"
              aria-label="فیلتر وضعیت"
            >
              {[{ value: "all", label: "همه" }, ...options].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  aria-pressed={status === option.value}
                  onClick={() => setStatus(option.value)}
                >
                  {status === option.value && (
                    <m.span
                      aria-hidden="true"
                      layoutId="panel-filter-indicator"
                      className="pointer-events-none absolute inset-0 rounded-full bg-[var(--ar-brand-soft)]"
                      transition={
                        reduce ? { duration: 0 } : motionTiming.indicator
                      }
                    />
                  )}
                  <span className="relative z-10">{option.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        )}
        <p
          className="admin-list-filter-count w-full text-xs text-[var(--panel-muted)]"
          aria-live="polite"
        >
          {new Intl.NumberFormat("fa-IR").format(visible.length)} مورد از{" "}
          {new Intl.NumberFormat("fa-IR").format(items.length)}
        </p>
      </div>
      <div className={panelListClassName}>
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <m.div
              key={item.key}
              layout={reduce ? false : "position"}
              variants={tilePresence}
              initial={reduce ? false : "initial"}
              animate="visible"
              exit={
                reduce ? { opacity: 0, transition: { duration: 0 } } : "exit"
              }
              transition={reduce ? { duration: 0 } : motionTiming.tile}
            >
              {item.content}
            </m.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {!visible.length && (
          <m.div
            key="empty-panel"
            className={`${panelCardClassName} flex flex-wrap items-center justify-between gap-4`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduce
                ? { opacity: 0, transition: { duration: 0 } }
                : { opacity: 0, y: -8 }
            }
            transition={reduce ? { duration: 0 } : motionTiming.standard}
          >
            <p>موردی با این جست‌وجو یا فیلتر پیدا نشد.</p>
            <button
              type="button"
              className={`${panelButtonClassName} ${panelButtonOutlineClassName}`}
              onClick={() => {
                setQuery("");
                setStatus("all");
              }}
            >
              <X size={16} aria-hidden="true" /> پاک‌کردن فیلترها
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
