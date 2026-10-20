"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;
export const SelectLabel = SelectPrimitive.Label;
export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "group flex min-h-[42px] w-full min-w-[110px] items-center justify-between gap-[.6rem] rounded-[11px] border border-[var(--panel-line,var(--line))] bg-[var(--panel-surface,var(--surface))] px-[.7rem] py-[.45rem] text-start text-[.84rem] text-[var(--panel-text,var(--fg))] hover:border-[var(--panel-accent,var(--c-teal))] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[color:color-mix(in_srgb,var(--panel-accent,var(--c-teal))_35%,transparent)]",
        className,
      )}
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
          "z-[100] max-h-[min(300px,var(--radix-select-content-available-height))] min-w-[var(--radix-select-trigger-width)] [animation:none] overflow-hidden rounded-[14px] border border-[#e0e1ea] bg-white p-[.3rem] text-[#182039] shadow-[var(--ar-shadow,0_18px_40px_#13203625)] dark:border-[#43455a] dark:bg-[#1b2030] dark:text-[#f1f2fb] dark:[--ar-brand-ink:#cfc6ff] dark:[--ar-brand-soft:rgb(169_155_255_/_18%)]",
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
        "flex min-h-9 cursor-pointer items-center justify-between gap-[.8rem] rounded-lg px-[.6rem] py-[.35rem] text-[.82rem] outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-[var(--ar-brand-soft,#e5f4f1)] data-[highlighted]:text-[var(--ar-brand-ink,#186e66)]",
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
