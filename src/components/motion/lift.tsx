import type { ReactNode } from "react";
import { cn } from "cn";

// Hover is a fine-pointer CSS enhancement. SSR and touch have identical
// geometry; no client mount, measured height or second animation owner.
export function Lift({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("lift", className)} data-interact="card">{children}</div>;
}
