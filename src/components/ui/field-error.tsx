import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface FieldErrorProps {
  id?: string
  children?: React.ReactNode
  className?: string
}

/**
 * role="alert" so the message is announced when it appears, rather than sitting there
 * silently for anyone not looking at it. Nothing in this codebase does this today; a
 * form is the one place it is not optional.
 */
function FieldError({ id, children, className }: FieldErrorProps) {
  if (!children) return null

  return (
    <p
      id={id}
      role="alert"
      className={cn("text-tx-error text-sm mt-2", className)}
    >
      {children}
    </p>
  )
}

export interface FieldHelpProps {
  id?: string
  children?: React.ReactNode
  className?: string
}

function FieldHelp({ id, children, className }: FieldHelpProps) {
  if (!children) return null

  return (
    <p id={id} className={cn("text-tx-tertiary text-sm mt-1.5", className)}>
      {children}
    </p>
  )
}

export { FieldError, FieldHelp }
