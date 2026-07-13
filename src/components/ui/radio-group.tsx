"use client"

import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface RadioGroupProps {
  name: string
  options: string[]
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  className?: string
}

/**
 * A fieldset of real radio inputs. The group is the labelled thing, not each option —
 * so the question lives on the <legend>, which is what a screen reader announces before
 * reading the choices.
 */
function RadioGroup({
  name,
  options,
  value,
  onValueChange,
  disabled,
  invalid,
  describedBy,
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      className={cn("flex flex-col gap-2", className)}
    >
      {options.map((option) => {
        const checked = value === option
        return (
          <label
            key={option}
            className={cn(
              "flex items-center gap-3 rounded-md border px-3 py-2.5 cursor-pointer transition-colors",
              checked
                ? "border-bd-accent bg-bg-accent"
                : "border-bd-primary bg-bg-card hover:bg-bg-card-hover",
              invalid && !checked && "border-bd-error",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <span className="relative flex items-center shrink-0">
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                disabled={disabled}
                onChange={() => onValueChange(option)}
                className="peer h-4 w-4 appearance-none rounded-full border border-bd-primary bg-bg-card cursor-pointer transition-colors checked:border-bd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bd-accent disabled:cursor-not-allowed"
              />
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg-button opacity-0 peer-checked:opacity-100"
                aria-hidden="true"
              />
            </span>
            <span className="text-sm text-tx-primary leading-relaxed select-none">
              {option}
            </span>
          </label>
        )
      })}
    </div>
  )
}

export { RadioGroup }
