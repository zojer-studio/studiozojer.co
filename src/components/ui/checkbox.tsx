"use client"

import * as React from "react"
import { Check } from "iconoir-react"

import { cn } from "@/src/lib/utils"

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode
}

/**
 * A real <input type="checkbox">, visually hidden and drawn over — so it keeps native
 * keyboard behaviour, form semantics, and screen-reader support for free. `peer` drives
 * the box's appearance from the input's own checked/focus state rather than from React.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generated = React.useId()
    const inputId = id ?? generated

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex items-center shrink-0 mt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer h-4 w-4 appearance-none rounded border border-bd-primary bg-bg-card cursor-pointer transition-colors checked:bg-bg-button checked:border-bd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bd-accent disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
          <Check
            className="pointer-events-none absolute left-0 top-0 h-4 w-4 text-tx-button opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
            aria-hidden="true"
          />
        </div>
        <label
          htmlFor={inputId}
          className="text-sm text-tx-secondary leading-relaxed cursor-pointer select-none"
        >
          {label}
        </label>
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
