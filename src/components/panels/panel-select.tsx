"use client";

import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Radix forbids `value=""` on an item, so an explicit "none" choice travels through
 * the listbox as a sentinel and leaves the form as an empty string.
 */
const EMPTY = "__empty__";

/**
 * Radix/shadcn select wired into its parent form.
 *
 * The wrapper exists for three platform details a bare Radix Select gets wrong:
 * 1. Radix mirrors the value into a visually hidden native `<select>` (1×1 px). When
 *    that control fails `required` validation the browser has nothing to scroll to or
 *    highlight, so we take over: cancel the native bubble, focus the visible trigger
 *    and print the reason next to it.
 * 2. A native `<select>` cannot submit an empty value for a sentinel option, so the
 *    form field is carried by a hidden input while the listbox keeps its own state.
 * 3. Keyboard and screen-reader users must land on the trigger, never the hidden
 *    control — hence the label/`aria-invalid`/`aria-describedby` wiring below.
 * https://www.radix-ui.com/primitives/docs/components/select
 */
export function PanelSelect({
  name,
  id,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = "انتخاب کنید",
  required,
  label,
  disabled,
  triggerClassName,
  errorMessage = "یک گزینه انتخاب کنید.",
}: {
  name: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  triggerClassName?: string;
  errorMessage?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [invalid, setInvalid] = useState(false);
  const [selection, setSelection] = useState(value ?? defaultValue ?? "");
  const current = value ?? selection;
  const errorId = `${id ?? name}-error`;

  const hasEmptyOption = options.some((option) => option.value === "");
  // Only an optional field may hold the sentinel: it must stay "unselected" to `required`.
  const sentinel = hasEmptyOption && !required;
  const radixValue = sentinel
    ? current === ""
      ? EMPTY
      : current
    : current || undefined;

  useEffect(() => {
    const form = root.current?.closest("form");
    if (!form) return;
    const onInvalid = (event: Event) => {
      // Radix keeps a hidden native <select> inside this wrapper; identify that
      // control by containment, not by name (the name lives on our hidden input).
      const native = root.current?.querySelector("select");
      if (!native || event.target !== native) return;
      event.preventDefault();
      setInvalid(true);
      const trigger = root.current?.querySelector<HTMLButtonElement>(
        "[data-slot='select-trigger']",
      );
      trigger?.scrollIntoView({ block: "center", behavior: "smooth" });
      trigger?.focus({ preventScroll: true });
    };
    // `invalid` does not bubble, but the capture phase still visits ancestors.
    form.addEventListener("invalid", onInvalid, true);
    return () => form.removeEventListener("invalid", onInvalid, true);
  }, []);

  return (
    <div ref={root} className="grid gap-1.5">
      <Select
        value={radixValue}
        required={required}
        disabled={disabled}
        dir="rtl"
        onValueChange={(next) => {
          const real = next === EMPTY ? "" : next;
          setInvalid(false);
          if (value === undefined) setSelection(real);
          onValueChange?.(real);
        }}
      >
        <SelectTrigger
          id={id}
          className={triggerClassName}
          aria-label={label || (id ? undefined : name)}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          data-invalid={invalid || undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value || EMPTY}
              value={option.value === "" ? EMPTY : option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* The form field: keeps the raw value (including the empty "none" choice). */}
      <input type="hidden" name={name} value={current} />

      {invalid && (
        <p
          id={errorId}
          role="alert"
          className="m-0 text-[.78rem] font-bold text-[#af304d] dark:text-rose-300"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
