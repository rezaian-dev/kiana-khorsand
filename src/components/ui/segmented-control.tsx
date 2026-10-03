"use client";

import { useId, type ComponentProps, type Ref } from "react";
import { cn } from "cn";
import { Check } from "lucide-react";
import type { ChoiceOption } from "./choice-fallback";

type Props = Omit<ComponentProps<"div">, "onChange" | "defaultValue" | "children" | "onBlur"> & {
  options: readonly ChoiceOption[]; name: string; value?: string; defaultValue?: string;
  onValueChange?: (value: string) => void; disabled?: boolean; required?: boolean;
  onBlur?: ComponentProps<"input">["onBlur"]; ref?: Ref<HTMLInputElement>;
  label?: string; kind?: "segmented" | "dates" | "times" | "weekdays";
};

export function SegmentedControl({ options, name, value, defaultValue, onValueChange, disabled, required, id, label, className, onBlur, ref, kind = "segmented", ...props }: Props) {
  const generated = useId();
  const baseId = id ?? generated;
  const selected = options.findIndex((option) => option.value === (value ?? defaultValue) && !option.disabled);
  const firstEnabled = options.findIndex((option) => !option.disabled);
  const focusIndex = selected >= 0 ? selected : Math.max(0, firstEnabled);
  return <div {...props} className={cn("segmented-control", className)} data-kind={kind} role="radiogroup" aria-label={label} aria-required={required} dir="rtl">
    {options.map((option, index) => <label className="radio-chip" key={option.value}>
      <input id={index === focusIndex ? baseId : `${baseId}-${index}`} ref={index === focusIndex ? ref : undefined} type="radio" name={name} value={option.value}
        {...(value === undefined ? { defaultChecked: defaultValue === option.value } : { checked: value === option.value })}
        disabled={disabled || option.disabled} required={required} onBlur={onBlur} onChange={(event) => onValueChange?.(event.currentTarget.value)} aria-describedby={props["aria-describedby"]} />
      <span className="radio-chip-face"><span className="chip-pip" aria-hidden="true" /><span>{option.label}</span><Check className="radio-chip-check" aria-hidden="true" /></span>
    </label>)}
  </div>;
}
