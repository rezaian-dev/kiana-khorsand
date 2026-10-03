"use client";

import { useContext, type ComponentProps } from "react";
import { cn } from "cn";
import { Accordion as Primitive } from "radix-ui";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { AccordionState, AccordionItemState } from "./accordion-context";
import { motionTokens } from "@/lib/motion";

type Props = ComponentProps<typeof Primitive.Item>;

export function AccordionItem({ className, children, asChild, style, ...props }: Props) {
  const values = useContext(AccordionState);
  const isOpen = values.includes(props.value);
  const isReduced = useReducedMotion();
  return <AccordionItemState value={isOpen}>
    {asChild ? <Primitive.Item {...props} asChild className={className} style={style}>{children}</Primitive.Item> : <Primitive.Item {...props} asChild>
      <m.div data-slot="accordion-item" className={cn("accordion-motion-item not-last:border-b", className)} layout={!isReduced} layoutDependency={values.join("|")} initial={false} style={{ borderRadius: 16, originY: 0, ...style }} transition={{ layout: { duration: isReduced ? 0 : motionTokens.scene, ease: motionTokens.ease } }}>
        <m.div layout={isReduced ? false : "position"} className="accordion-item-inner" transition={{ layout: { duration: isReduced ? 0 : motionTokens.scene, ease: motionTokens.ease } }}>{children}</m.div>
      </m.div>
    </Primitive.Item>}
  </AccordionItemState>;
}
