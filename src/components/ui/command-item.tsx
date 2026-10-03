import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";

export function CommandItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      data-interact="control"
      className={cn(
        "command-option group/command-item relative flex cursor-default items-center gap-2 min-h-11 px-3 py-2 text-base outline-none select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <CheckIcon aria-hidden="true" className="command-selection ms-auto" />
    </CommandPrimitive.Item>
  )
}
