import * as React from "react";
import { cn } from "cn";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        data-interact="control"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-4 rounded-lg border border-transparent min-h-11 px-3.5 py-3 text-start text-base font-semibold outline-none disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon aria-hidden="true" data-slot="accordion-trigger-icon" className="pointer-events-none shrink-0 size-5" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
