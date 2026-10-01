import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      data-interact="field"
      className={cn(
        "flex field-sizing-fixed min-h-11 w-full min-w-0 rounded-lg border border-input bg-card px-3.5 py-2 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
