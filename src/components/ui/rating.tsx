"use client"

import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface RatingProps {
  name: string
  min?: number
  max: number
  value?: number
  onValueChange: (value: number) => void
  /** Two labels for the extremes, e.g. ["Not at all", "Extremely"]. */
  anchors?: [string, string]
  disabled?: boolean
  invalid?: boolean
  describedBy?: string
  className?: string
}

/**
 * A scale of radio inputs. One component serves three picker tiles — Rating (1–5),
 * Opinion Scale (1–10) and NPS (0–10 with anchors) — because those differ only in min,
 * max and anchors. That is the whole reason they are presets rather than types.
 *
 * Radios, not buttons: the scale is a single-choice question, and a screen reader should
 * hear it as one.
 */
function Rating({
  name,
  min = 1,
  max,
  value,
  onValueChange,
  anchors,
  disabled,
  invalid,
  describedBy,
  className,
}: RatingProps) {
  const steps = React.useMemo(
    () => Array.from({ length: max - min + 1 }, (_, i) => min + i),
    [min, max]
  )

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        role="radiogroup"
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        className="flex flex-wrap gap-1.5"
      >
        {steps.map((step) => {
          const checked = value === step
          return (
            <label
              key={step}
              className={cn(
                "relative flex-1 min-w-9 h-10 flex items-center justify-center rounded-md border text-sm transition-colors cursor-pointer select-none",
                checked
                  ? "border-bd-accent bg-bg-button text-tx-button font-medium"
                  : "border-bd-primary bg-bg-card text-tx-secondary hover:bg-bg-card-hover",
                invalid && !checked && "border-bd-error",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                type="radio"
                name={name}
                value={step}
                checked={checked}
                disabled={disabled}
                onChange={() => onValueChange(step)}
                className="absolute inset-0 h-full w-full appearance-none rounded-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bd-accent disabled:cursor-not-allowed"
              />
              <span aria-hidden="true">{step}</span>
              <span className="sr-only">{step}</span>
            </label>
          )
        })}
      </div>

      {anchors && (
        <div className="flex justify-between text-xs text-tx-tertiary font-mono">
          <span>{anchors[0]}</span>
          <span>{anchors[1]}</span>
        </div>
      )}
    </div>
  )
}

export { Rating }
