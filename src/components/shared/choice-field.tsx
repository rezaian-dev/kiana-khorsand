"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Select } from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";
import { SegmentedControl } from "@/components/ui/segmented-control";
import type { ChoiceOption } from "@/components/ui/choice-fallback";

type Props<T extends FieldValues> = {
  control: Control<T>; name: FieldPath<T>; id: string; label: string;
  options: readonly ChoiceOption[]; disabled?: boolean; required?: boolean;
  kind?: "select" | "combobox" | "segmented" | "dates" | "times";
  placeholder?: string; describedBy?: string; onValueChange?: (value: string) => void;
};

// Presentation bridge only. RHF owns values, validation, dirty state, reset,
// field errors and submission. Field names and zod schemas are unchanged.
export function ChoiceField<T extends FieldValues>({ control, name, id, label, options, disabled, required, kind = "select", placeholder, describedBy, onValueChange }: Props<T>) {
  return <Controller control={control} name={name} render={({ field, fieldState }) => {
    const shared = { id, name: field.name, label, options, value: String(field.value ?? ""), disabled: disabled || field.disabled, required, onBlur: field.onBlur, "aria-invalid": fieldState.invalid, "aria-describedby": describedBy, onValueChange(next: string) { field.onChange(next); onValueChange?.(next); } };
    if (kind === "segmented" || kind === "dates" || kind === "times") return <SegmentedControl {...shared} kind={kind} ref={field.ref} />;
    const Component = kind === "combobox" ? Combobox : Select;
    return <Component {...shared} placeholder={placeholder} ref={field.ref} />;
  }} />;
}
