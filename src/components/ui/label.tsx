import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "block text-sm font-medium text-tx-primary mb-2",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="text-tx-error ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
    )
  }
)
Label.displayName = "Label"

export { Label }
