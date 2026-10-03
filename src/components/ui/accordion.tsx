"use client";

import { useId, useState, type ComponentProps } from "react";
import { cn } from "cn";
import { Accordion as Primitive } from "radix-ui";
import { LayoutGroup } from "motion/react";
import { AccordionState } from "./accordion-context";

type Props = ComponentProps<typeof Primitive.Root>;

export function Accordion(props: Props) {
  const group = useId();
  const [local, setLocal] = useState<string | string[]>(props.defaultValue ?? (props.type === "multiple" ? [] : ""));
  const selected = props.value ?? local;
  const items = typeof selected === "string" ? (selected ? [selected] : []) : selected;
  const className = cn("brand-accordion flex w-full flex-col", props.className);
  return <AccordionState value={items}><LayoutGroup id={group}>
    {props.type === "single" ? <Primitive.Root {...props} data-slot="accordion" className={className} value={typeof selected === "string" ? selected : ""} onValueChange={(next: string) => { if (props.value === undefined) setLocal(next); props.onValueChange?.(next); }} /> : <Primitive.Root {...props} data-slot="accordion" className={className} value={Array.isArray(selected) ? selected : []} onValueChange={(next: string[]) => { if (props.value === undefined) setLocal(next); props.onValueChange?.(next); }} />}
  </LayoutGroup></AccordionState>;
}
