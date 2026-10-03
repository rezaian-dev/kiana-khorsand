"use client";

import type { ComponentProps } from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { X } from "lucide-react";
import { cn } from "cn";
import { SheetPortal } from "./sheet-portal";
import { SheetOverlay } from "./sheet-overlay";
import { SheetClose } from "./sheet-close";
import { Button } from "./button";
import { getTravel, motionTokens } from "@/lib/motion";

type Props = ComponentProps<typeof SheetPrimitive.Content> & {
  isOpen: boolean;
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
};

export function SheetContent({ isOpen, side = "right", showCloseButton = true, className, children, ...props }: Props) {
  const isReduced = useReducedMotion();
  const offset = isReduced ? 0 : motionTokens.travel;
  return (
    <SheetPortal forceMount>
      <AnimatePresence initial={false}>
        {isOpen && (
          <SheetOverlay key="overlay" forceMount asChild>
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: isReduced ? 0 : motionTokens.fast } }} transition={{ duration: isReduced ? 0 : motionTokens.quick, ease: motionTokens.ease }} />
          </SheetOverlay>
        )}
        {isOpen && (
          <SheetPrimitive.Content key="content" forceMount asChild {...props}>
            <m.div
              data-slot="sheet-content"
              data-side={side}
              className={cn("brand-sheet", className)}
              initial={{ opacity: 0, x: side === "right" ? -getTravel(offset) : side === "left" ? getTravel(offset) : 0, y: side === "bottom" ? offset : side === "top" ? -offset : 0, scale: isReduced ? 1 : .99 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: side === "right" ? -getTravel(offset) : side === "left" ? getTravel(offset) : 0, y: side === "bottom" ? offset : side === "top" ? -offset : 0, scale: isReduced ? 1 : .99, transition: { duration: isReduced ? 0 : motionTokens.fast } }}
              transition={{ duration: isReduced ? 0 : motionTokens.scene, ease: motionTokens.ease }}
            >
              {children}
              {showCloseButton && (
                <SheetClose asChild>
                  <Button className="sheet-close" variant="outline" size="icon" aria-label="بستن پنجره">
                    <X aria-hidden="true" />
                  </Button>
                </SheetClose>
              )}
            </m.div>
          </SheetPrimitive.Content>
        )}
      </AnimatePresence>
    </SheetPortal>
  );
}
