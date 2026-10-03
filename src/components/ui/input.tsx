import * as React from "react"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      data-interact="field"
      className={cn(
        "h-11 w-full min-w-0 rounded-[var(--radius-control)] border border-input bg-card px-3.5 py-0 text-base outline-none file:inline-flex file:h-6 file:border-0 file:bg-card file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
