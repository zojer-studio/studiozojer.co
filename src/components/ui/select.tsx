import * as React from "react"
import { NavArrowDown } from "iconoir-react"

import { cn } from "@/src/lib/utils"
import { fieldClassName, fieldInvalidClassName } from "@/src/components/ui/input"

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder = "Choose one…", value, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          value={value}
          className={cn(
            fieldClassName,
            "h-10 appearance-none pr-9 cursor-pointer",
            // A native select renders the placeholder option in the same colour as a
            // real one, so nothing distinguishes "not answered" from "answered". Dim it
            // until a choice exists.
            (value === "" || value === undefined) && "text-tx-tertiary",
            props["aria-invalid"] && fieldInvalidClassName,
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-tx-primary">
              {option}
            </option>
          ))}
        </select>
        <NavArrowDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ic-tertiary"
          aria-hidden="true"
        />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
