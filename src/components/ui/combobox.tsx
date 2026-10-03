"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "cn";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command } from "./command";
import { CommandInput } from "./command-input";
import { CommandList } from "./command-list";
import { CommandEmpty } from "./command-empty";
import { CommandItem } from "./command-item";
import { ChoiceFallback, useEnhancedChoice } from "./choice-fallback";
import type { SelectProps } from "./select";

export function Combobox({ options, value, defaultValue = "", onValueChange, name, required, disabled, id, label, placeholder = "انتخاب کنید", className, ref, onBlur, ...props }: SelectProps) {
  const enhanced = useEnhancedChoice();
  const listId = useId();
  const [local, setLocal] = useState(defaultValue);
  const selected = value ?? local;
  const [open, setOpen] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const attach = useCallback((node: HTMLButtonElement | null) => {
    trigger.current = node;
    if (typeof ref === "function") ref(node); else if (ref) ref.current = node;
    setContainer(node?.closest<HTMLElement>('[data-slot="sheet-content"]') ?? null);
  }, [ref]);
  useEffect(() => {
    const form = trigger.current?.form;
    if (!form || value !== undefined) return;
    const reset = (event: Event) => { setTimeout(() => { if (!event.defaultPrevented) { setLocal(defaultValue); setInvalid(false); } }, 0); };
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [defaultValue, value, enhanced]);
  function choose(next: string) { setLocal(next); setInvalid(false); onValueChange?.(next); setOpen(false); }
  if (!enhanced) return <ChoiceFallback id={id} name={name} value={selected} options={options} label={label} placeholder={placeholder} disabled={disabled} required={required} aria-describedby={props["aria-describedby"]} aria-invalid={props["aria-invalid"] === "grammar" || props["aria-invalid"] === "spelling" ? true : props["aria-invalid"]} />;
  return <div className="combobox-field">
    {/* A real constrained input: type=hidden and readOnly would silently disable required validation. */}
    <input className="choice-submission" type="text" form={props.form} name={name} value={selected} onChange={() => {}} required={required} disabled={disabled} tabIndex={-1} aria-hidden="true" onInvalid={(event) => { event.preventDefault(); setInvalid(true); trigger.current?.focus({ preventScroll: true }); }} />
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button {...props} ref={attach} id={id} type="button" className={cn("choice-trigger", className)} data-interact="field" data-state={open && !disabled ? "open" : "closed"} role="combobox" aria-required={required} aria-label={label} aria-expanded={open && !disabled} aria-controls={listId} aria-invalid={props["aria-invalid"] || invalid} disabled={disabled} onBlur={onBlur} onKeyDown={(event) => { props.onKeyDown?.(event); if (!event.defaultPrevented && (event.key === "ArrowDown" || event.key === "ArrowUp")) { event.preventDefault(); setOpen(true); } }}>
          <span>{options.find((option) => option.value === selected)?.label ?? placeholder}</span><ChevronDown className="choice-chevron" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent container={container} className="combobox-panel" aria-label={label || placeholder}>
        <Command loop label={label || placeholder}>
          <CommandInput placeholder="جست‌وجو…" aria-label={label ? `جست‌وجوی ${label}` : "جست‌وجوی گزینه‌ها"} />
          <CommandList id={listId}><CommandEmpty>گزینه‌ای پیدا نشد.</CommandEmpty>
            {options.map((option) => <CommandItem key={option.value} value={`${option.label} ${option.value}`} keywords={[option.label]} disabled={option.disabled} onSelect={() => choose(option.value)} data-checked={option.value === selected}>
              <span>{option.label}</span>
            </CommandItem>)}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>;
}
