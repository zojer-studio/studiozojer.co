import * as React from "react"

import { cn } from "@/src/lib/utils"
import { fieldClassName, fieldInvalidClassName } from "@/src/components/ui/input"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={4}
        className={cn(
          fieldClassName,
          "min-h-24 resize-y leading-relaxed",
          props["aria-invalid"] && fieldInvalidClassName,
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
