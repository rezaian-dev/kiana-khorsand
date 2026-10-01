"use client";

import type { ComponentProps } from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "cn";
import { motionTokens } from "@/lib/motion";

type Props = ComponentProps<typeof DropdownMenuPrimitive.Content> & { isOpen: boolean };

export function DropdownMenuContent({ isOpen, className, children, align = "end", sideOffset = 10, ...props }: Props) {
  const isReduced = useReducedMotion();
  return (
    <DropdownMenuPrimitive.Portal forceMount>
      <AnimatePresence initial={false}>
        {isOpen && (
          <DropdownMenuPrimitive.Content forceMount asChild align={align} sideOffset={sideOffset} collisionPadding={16} {...props}>
            <m.div
              className={cn("account-dropdown", className)}
              data-slot="dropdown-menu-content"
              initial={{ opacity: 0, y: isReduced ? 0 : -motionTokens.travel, scale: isReduced ? 1 : .98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: isReduced ? 0 : -motionTokens.travel, scale: isReduced ? 1 : .98, transition: { duration: isReduced ? 0 : motionTokens.fast } }}
              transition={{ duration: isReduced ? 0 : motionTokens.quick, ease: motionTokens.ease }}
            >{children}</m.div>
          </DropdownMenuPrimitive.Content>
        )}
      </AnimatePresence>
    </DropdownMenuPrimitive.Portal>
  );
}
