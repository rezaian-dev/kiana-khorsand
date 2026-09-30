import type { ComponentProps } from "react";
import { cn } from "cn";
import { Dialog as SheetPrimitive } from "radix-ui";

type Props = ComponentProps<typeof SheetPrimitive.Overlay>;

export function SheetOverlay({ className, ...props }: Props) {
  return <SheetPrimitive.Overlay data-slot="sheet-overlay" className={cn("sheet-overlay", className)} {...props} />;
}
