import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "cn";

export function CommandEmpty({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn("py-6 text-center text-base", className)}
      {...props}
    />
  )
}
