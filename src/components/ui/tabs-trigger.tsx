import type { ComponentProps } from "react";
import { cn } from "cn";
import { Tabs as TabsPrimitive } from "radix-ui";

type Props = ComponentProps<typeof TabsPrimitive.Trigger>;

export function TabsTrigger({ className, ...props }: Props) {
  return <TabsPrimitive.Trigger data-slot="tabs-trigger" data-interact="control" className={cn("relative inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-transparent px-3.5 py-2 text-base font-semibold text-muted-foreground outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5", className)} {...props} />;
}
