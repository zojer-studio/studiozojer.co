import * as React from "react"

import { cn } from "@/src/lib/utils"

// Exported so Textarea and Select cannot drift from Input. They are the same control
// wearing different tags, and three hand-copied class strings would diverge on the
// first tweak.
export const fieldClassName =
  "flex w-full rounded-md border border-bd-primary bg-bg-card px-3 py-2 text-sm text-tx-primary placeholder:text-tx-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bd-accent focus-visible:border-bd-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors"

/** Applied when a field has failed validation, alongside aria-invalid. */
export const fieldInvalidClassName =
  "border-bd-error focus-visible:ring-bd-error focus-visible:border-bd-error"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          fieldClassName,
          "h-10",
          props["aria-invalid"] && fieldInvalidClassName,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
