"use client";

import { useCallback, useEffect, useRef, useState, type ComponentProps, type Ref } from "react";
import { Select as Primitive } from "radix-ui";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "cn";
import { ChoiceFallback, useEnhancedChoice, type ChoiceOption } from "./choice-fallback";

export type SelectProps = Omit<ComponentProps<"button">, "children" | "defaultValue" | "value" | "onChange"> & {
  options: readonly ChoiceOption[]; value?: string; defaultValue?: string;
  onValueChange?: (value: string) => void; name?: string; required?: boolean;
  placeholder?: string; label?: string; ref?: Ref<HTMLButtonElement>;
};

export function Select({ options, value, defaultValue = "", onValueChange, name, required, disabled, id, label, placeholder = "انتخاب کنید", className, ref, ...props }: SelectProps) {
  const enhanced = useEnhancedChoice();
  const [local, setLocal] = useState(defaultValue);
  const selected = value ?? local;
  const [invalid, setInvalid] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const resetting = useRef(false);
  const attach = useCallback((node: HTMLButtonElement | null) => {
    trigger.current = node;
    if (typeof ref === "function") ref(node); else if (ref) ref.current = node;
    setContainer(node?.closest<HTMLElement>('[data-slot="sheet-content"]') ?? null);
  }, [ref]);
  useEffect(() => {
    const form = trigger.current?.form;
    if (!form) return;
    // Radix also listens for reset and calls onValueChange with its initial
    // value, even for a controlled root or a cancelled native reset. Capture
    // first; wait a task for delegated React onReset and native default action.
    let timer: ReturnType<typeof setTimeout> | undefined;
    const reset = (event: Event) => {
      resetting.current = true;
      timer = setTimeout(() => {
        resetting.current = false;
        const next = event.defaultPrevented || value !== undefined ? selected : defaultValue;
        const native = trigger.current?.closest(".select-field")?.querySelector("select");
        if (native) native.value = next;
        if (!event.defaultPrevented && value === undefined) { setLocal(defaultValue); setInvalid(false); }
      }, 0);
    };
    form.addEventListener("reset", reset, true);
    return () => { form.removeEventListener("reset", reset, true); if (timer) clearTimeout(timer); resetting.current = false; };
  }, [defaultValue, selected, value, enhanced]);
  if (!enhanced) return <ChoiceFallback id={id} name={name} value={selected} options={options} label={label} placeholder={placeholder} disabled={disabled} required={required} aria-describedby={props["aria-describedby"]} aria-invalid={props["aria-invalid"] === "grammar" || props["aria-invalid"] === "spelling" ? true : props["aria-invalid"]} />;
  return <div className="select-field" onInvalidCapture={(event) => { event.preventDefault(); setInvalid(true); trigger.current?.focus({ preventScroll: true }); }}>
    <Primitive.Root dir="rtl" name={name} form={props.form} value={selected} onValueChange={(next) => { if (resetting.current) return; setLocal(next); setInvalid(false); onValueChange?.(next); }} disabled={disabled} required={required}>
      <Primitive.Trigger {...props} ref={attach} id={id} aria-label={label} aria-invalid={props["aria-invalid"] || invalid} className={cn("choice-trigger", className)} data-interact="field">
        <Primitive.Value placeholder={placeholder}>{options.find((option) => option.value === selected)?.label}</Primitive.Value>
        <Primitive.Icon asChild><ChevronDown className="choice-chevron" aria-hidden="true" /></Primitive.Icon>
      </Primitive.Trigger>
      <Primitive.Portal container={container ?? undefined}>
        <Primitive.Content className="choice-panel select-panel" position="popper" align="start" sideOffset={8} collisionPadding={12}>
          <Primitive.ScrollUpButton className="choice-scroll"><ChevronUp aria-hidden="true" /></Primitive.ScrollUpButton>
          <Primitive.Viewport className="choice-viewport">
            {options.filter((option) => option.value !== "").map((option) => <Primitive.Item key={option.value} value={option.value} disabled={option.disabled} textValue={option.label} className="choice-item">
              <Primitive.ItemText>{option.label}</Primitive.ItemText><Primitive.ItemIndicator className="choice-check"><Check aria-hidden="true" /></Primitive.ItemIndicator>
            </Primitive.Item>)}
          </Primitive.Viewport>
          <Primitive.ScrollDownButton className="choice-scroll"><ChevronDown aria-hidden="true" /></Primitive.ScrollDownButton>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  </div>;
}
