"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Radix/shadcn select participates in its parent form via its `name` field. */
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
}) {
  return (
    <Select
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      required={required}
      disabled={disabled}
      dir="rtl"
    >
      <SelectTrigger
        id={id}
        className={triggerClassName}
        aria-label={label || (id ? undefined : name)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options
          .filter((option) => option.value !== "")
          .map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
