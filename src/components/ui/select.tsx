"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Radix Select is modal: while it is open it installs a body-wide
 * `pointer-events: none`, so the trigger itself stops being hit-testable. On touch
 * devices that produces a dead end — the tap that closes the list is followed by a
 * synthesised `click` on the trigger, which re-opens it, and the list looks
 * impossible to dismiss. Owning the open state lets the trigger handle its own
 * second press: it closes the list and swallows the ghost click.
 * https://www.radix-ui.com/primitives/docs/components/select
 */
const SelectState = React.createContext<{
  open: boolean;
  close: () => void;
} | null>(null);

export function Select({
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultOpen);
  const resolved = open ?? uncontrolled;
  const change = (next: boolean) => {
    if (open === undefined) setUncontrolled(next);
    onOpenChange?.(next);
  };

  return (
    <SelectState.Provider
      value={{ open: resolved, close: () => change(false) }}
    >
      <SelectPrimitive.Root open={resolved} onOpenChange={change} {...props} />
    </SelectState.Provider>
  );
}

export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  onPointerDownCapture,
  onClickCapture,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  const state = React.useContext(SelectState);
  const swallowClick = React.useRef(false);

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group flex min-h-[42px] w-full min-w-[110px] items-center justify-between gap-[.6rem] rounded-[11px] border border-(--panel-line,var(--line)) bg-(--panel-surface,var(--surface)) px-[.7rem] py-[.45rem] text-start text-[.84rem] text-(--panel-text,var(--fg)) hover:border-(--panel-accent,var(--c-teal)) focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[color-mix(in_srgb,var(--panel-accent,var(--c-teal))_35%,transparent)] aria-invalid:border-[#c04a63] aria-invalid:bg-[color-mix(in_srgb,#c04a63_4%,var(--panel-surface,var(--surface)))] data-[state=open]:pointer-events-auto",
        className,
      )}
      onPointerDownCapture={(event) => {
        onPointerDownCapture?.(event);
        if (event.defaultPrevented) return;
        // A press on an already-open trigger means "close", never "open again".
        if (!state?.open) {
          swallowClick.current = false;
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        swallowClick.current = true;
        state.close();
      }}
      onClickCapture={(event) => {
        onClickCapture?.(event);
        if (!swallowClick.current) return;
        swallowClick.current = false;
        event.preventDefault();
        event.stopPropagation();
      }}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>
        <ChevronDown
          className="size-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.22,1,.36,1)] group-data-[state=open]:motion-safe:rotate-180"
          aria-hidden="true"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position="popper"
        sideOffset={5}
        className={cn(
          "z-100 max-h-[min(300px,var(--radix-select-content-available-height))] min-w-(--radix-select-trigger-width) overflow-hidden rounded-[14px] border border-[#e0e1ea] bg-white p-[.3rem] text-[#182039] shadow-(--ar-shadow,0_18px_40px_#13203625) dark:border-[#43455a] dark:bg-[#1b2030] dark:text-[#f1f2fb] dark:[--ar-brand-ink:#cfc6ff] dark:[--ar-brand-soft:rgb(169_155_255/18%)]",
          className,
        )}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className="grid w-full place-items-center p-[.3rem]">
          <ChevronUp size={16} />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-[.15rem]">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="grid w-full place-items-center p-[.3rem]">
          <ChevronDown size={16} />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex min-h-9 cursor-pointer items-center justify-between gap-[.8rem] rounded-lg px-[.6rem] py-[.35rem] text-[.82rem] outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-(--ar-brand-soft,#e5f4f1) data-highlighted:text-(--ar-brand-ink,#186e66)",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check size={15} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
