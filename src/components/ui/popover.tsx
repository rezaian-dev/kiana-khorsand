"use client";

import { createContext, useContext, useState, type ComponentProps } from "react";
import { Popover as Primitive } from "radix-ui";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "cn";
import { motionTokens } from "@/lib/motion";

const PopoverState = createContext(false);
export function Popover(props: ComponentProps<typeof Primitive.Root>) {
  const [local, setLocal] = useState(props.defaultOpen ?? false);
  const open = props.open ?? local;
  return <PopoverState value={open}><Primitive.Root {...props} open={open} onOpenChange={(next) => { if (props.open === undefined) setLocal(next); props.onOpenChange?.(next); }} /></PopoverState>;
}
export const PopoverTrigger = Primitive.Trigger;

type Props = ComponentProps<typeof Primitive.Content> & { container?: HTMLElement | null };
export function PopoverContent({ container, className, align = "start", sideOffset = 8, children, ...props }: Props) {
  const isOpen = useContext(PopoverState);
  const isReduced = useReducedMotion();
  return <Primitive.Portal forceMount container={container ?? undefined}><AnimatePresence initial={false}>
    {isOpen && <Primitive.Content {...props} forceMount asChild dir="rtl" align={align} sideOffset={sideOffset} collisionPadding={12}>
      <m.div data-slot="popover-content" className={cn("choice-panel popover-panel motion-popover", className)} style={{ transformOrigin: "var(--radix-popover-content-transform-origin)" }} initial={{ opacity: 0, y: isReduced ? 0 : -8, scale: isReduced ? 1 : .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: isReduced ? 0 : -4, scale: isReduced ? 1 : .99, transition: { duration: isReduced ? 0 : motionTokens.fast } }} transition={{ duration: isReduced ? 0 : motionTokens.ui, ease: motionTokens.ease }}>{children}</m.div>
    </Primitive.Content>}
  </AnimatePresence></Primitive.Portal>;
}
