"use client";

import type { ComponentProps } from "react";
import { cn } from "cn";
import { Accordion as Primitive } from "radix-ui";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useAccordionOpen } from "./accordion-context";
import { motionTokens } from "@/lib/motion";

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof Primitive.Content>) {
  const isOpen = useAccordionOpen();
  const isReduced = useReducedMotion();
  return <Primitive.Content {...props} forceMount data-slot="accordion-content" className="accordion-motion-content text-base" aria-hidden={!isOpen} inert={!isOpen}>
    <m.div layout={isReduced ? false : "position"} initial={false} animate={{ opacity: isOpen ? 1 : 0, y: isReduced ? 0 : isOpen ? 0 : -4 }} transition={{ duration: isReduced ? 0 : isOpen ? motionTokens.ui : motionTokens.fast, ease: motionTokens.ease }} className={cn("accordion-body px-3.5 pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_p:not(:last-child)]:mb-4", className)}>{children}</m.div>
  </Primitive.Content>;
}
