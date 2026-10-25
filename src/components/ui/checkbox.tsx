"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "inline-grid size-[22px] shrink-0 cursor-pointer place-items-center rounded-[7px_7px_7px_3px] border-[1.5px] border-[#79a7a6] bg-(--surface,#fff) p-0 text-white shadow-[0_2px_5px_rgb(14_84_85/9%),inset_0_1px_0_rgb(255_255_255/65%)] transition-[background-color,border-color,box-shadow,transform] duration-180 ease-[ease] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#d5ac72] hover:enabled:transform-[translateY(-1px)] hover:enabled:border-[#146e70] disabled:cursor-not-allowed disabled:opacity-45 data-[state=checked]:border-[#0e6866] data-[state=checked]:bg-[linear-gradient(135deg,#0e7770,#37668e)] data-[state=checked]:shadow-[0_3px_9px_rgb(10_96_92/25%)] motion-reduce:transition-none motion-reduce:hover:enabled:transform-none dark:border-[#76b7b1] dark:bg-[#1b2b31] dark:data-[state=checked]:border-[#76b7b1]",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-items-center">
        <Check size={15} strokeWidth={3} aria-hidden="true" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
