"use client";

import type { ComponentProps } from "react";
import { Popover as Primitive } from "radix-ui";
import { cn } from "cn";

export const Popover = Primitive.Root;
export const PopoverTrigger = Primitive.Trigger;

type Props = ComponentProps<typeof Primitive.Content> & { container?: HTMLElement | null };
export function PopoverContent({ container, className, align = "start", sideOffset = 8, ...props }: Props) {
  return <Primitive.Portal container={container ?? undefined}>
    <Primitive.Content data-slot="popover-content" className={cn("choice-panel popover-panel", className)} dir="rtl" align={align} sideOffset={sideOffset} collisionPadding={12} {...props} />
  </Primitive.Portal>;
}
