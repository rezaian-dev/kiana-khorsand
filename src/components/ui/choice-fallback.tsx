"use client";

import { useId, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";

export type ChoiceOption = { value: string; label: string; disabled?: boolean };
const subscribe = () => () => {};
// Same 44px geometry before and after hydration. Without JS, real radios still
// submit with the original field name through GET or POST, with no native select.
export function useEnhancedChoice() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

type Props = {
  id?: string; name?: string; value?: string; options: readonly ChoiceOption[];
  label?: string; placeholder?: string; disabled?: boolean; required?: boolean;
  "aria-describedby"?: string; "aria-invalid"?: boolean | "true" | "false";
};

export function ChoiceFallback({ id, name, value, options, label, placeholder = "انتخاب کنید", disabled, required, ...aria }: Props) {
  const generated = useId();
  return <details className="choice-fallback" data-disabled={disabled || undefined}>
    <summary id={id} className="choice-trigger" tabIndex={disabled ? -1 : undefined} aria-label={label} aria-disabled={disabled} {...aria}>
      <span>{options.find((option) => option.value === value)?.label ?? placeholder}</span><ChevronDown aria-hidden="true" />
    </summary>
    <div className="choice-panel fallback-panel"><fieldset disabled={disabled}><legend className="sr-only">{label || placeholder}</legend>
      {options.map((option, index) => <label className="fallback-option" key={option.value}>
        <input type="radio" id={`${generated}-${index}`} name={name} value={option.value} defaultChecked={option.value === value} required={required} disabled={option.disabled} /><span>{option.label}</span>
      </label>)}
    </fieldset></div>
  </details>;
}
