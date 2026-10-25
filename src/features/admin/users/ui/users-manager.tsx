"use client";

import { useMemo, useState } from "react";
import { Search, ShieldCheck, UsersRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UserActions } from "./user-actions";
import type { AdminUserSummary } from "../types";

type Filter = "all" | "admin" | "user";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "admin", label: "مدیران" },
  { value: "user", label: "کاربران" },
];

/** Normalises Persian/Arabic digits so a phone search matches either keyboard. */
const normalize = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .trim()
    .toLowerCase();

export function UsersManager({
  users,
  currentUserId,
}: {
  users: AdminUserSummary[];
  currentUserId: string;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => {
    const needle = normalize(query);
    return users.filter((user) => {
      if (filter !== "all" && user.role !== filter) return false;
      if (!needle) return true;
      return normalize(`${user.name} ${user.phone}`).includes(needle);
    });
  }, [users, query, filter]);

  return (
    <section
      aria-label="فهرست کاربران"
      className="grid gap-4 rounded-[1.2rem] border border-(--panel-line) bg-(--panel-surface) p-[clamp(1rem,2vw,1.4rem)]"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[220px] flex-1">
          <Search
            className="pointer-events-none absolute inset-y-0 inset-s-3 my-auto size-4 text-(--panel-muted)"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="جست‌وجو با نام یا شماره…"
            aria-label="جست‌وجوی کاربر"
            className="h-11 rounded-[.8rem] border-(--panel-line) bg-(--panel-surface) ps-9 text-[.9rem]"
          />
        </div>
        <div
          role="group"
          aria-label="فیلتر نقش"
          className="flex flex-wrap items-center gap-1 rounded-[.8rem] border border-(--panel-line) bg-(--panel-bg) p-1"
        >
          {FILTERS.map(({ value, label }) => {
            const active = filter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={active}
                className={cn(
                  "min-h-9 cursor-pointer rounded-[.55rem] px-3 text-[.8rem] font-extrabold transition-colors",
                  active
                    ? "bg-(--panel-surface) text-(--panel-accent) shadow-[0_1px_6px_#1a133018]"
                    : "text-(--panel-muted) hover:text-(--panel-text)",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="m-0 grid place-items-center gap-2 rounded-[.9rem] border border-dashed border-(--panel-line) px-4 py-10 text-center text-[.85rem] text-(--panel-muted)">
          <UsersRound className="size-6" aria-hidden="true" />
          کاربری با این مشخصات پیدا نشد.
        </p>
      ) : (
        <ul className="m-0 grid list-none gap-2 p-0">
          {visible.map((user) => {
            const isSelf = user.id === currentUserId;
            return (
              <li
                key={user.id}
                className="grid gap-3 rounded-[.9rem] border border-(--panel-line) bg-(--panel-bg) p-3 sm:flex sm:flex-wrap sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 flex-none place-items-center rounded-full bg-[color-mix(in_srgb,var(--panel-accent)_14%,var(--panel-surface))] text-[.9rem] font-extrabold text-(--panel-accent)"
                  >
                    {user.name.trim().slice(0, 1)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="m-0 flex items-center gap-2 text-[.9rem] font-extrabold">
                      <span className="truncate">{user.name}</span>
                      {user.role === "admin" && (
                        <Badge
                          variant="outline"
                          className="gap-1 border-[#9fd3c9] bg-[#e8f7f3] text-[.68rem] text-[#12655c] dark:border-[#3f6e68] dark:bg-[#1f3a37] dark:text-[#a6ece0]"
                        >
                          <ShieldCheck className="size-3" aria-hidden="true" />
                          مدیر
                        </Badge>
                      )}
                    </p>
                    <p
                      dir="ltr"
                      className="m-0 text-end text-[.8rem] text-(--panel-muted) tabular-nums"
                    >
                      {user.phone || "—"}
                    </p>
                  </div>
                </div>

                <UserActions
                  userId={user.id}
                  name={user.name}
                  role={user.role}
                  isSelf={isSelf}
                />
              </li>
            );
          })}
        </ul>
      )}

      <p className="m-0 text-[.75rem] text-(--panel-muted)" aria-live="polite">
        نمایش {new Intl.NumberFormat("fa-IR").format(visible.length)} از{" "}
        {new Intl.NumberFormat("fa-IR").format(users.length)} حساب
      </p>
    </section>
  );
}
