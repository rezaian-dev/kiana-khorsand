import type { ComponentProps } from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cn } from "cn";

type Props = ComponentProps<typeof CommandPrimitive.Input>;

export function CommandInput({ className, ...props }: Props) {
  return <div className="command-search" data-slot="command-input-wrapper"><Search aria-hidden="true" /><CommandPrimitive.Input data-slot="command-input" className={cn("command-field", className)} {...props} /></div>;
}
