// Form types and client-safe helpers.
//
// This file is imported by client components, so it must stay free of node builtins and
// server-only env vars — those live in ./forms-server.ts.
//
// The one structural rule, mirrored from the backend:
//
//     A field with no `key` collects no answer.
//
// A `statement` is content — prose, framing, a section break. It has no key, never
// appears in `answers`, and never becomes a column. Everything else is an input.

export const INPUT_TYPES = [
  "text",
  "textarea",
  "email",
  "select",
  "radio",
  "checkbox",
  "rating",
  "number",
  "date",
] as const

export const CONTENT_TYPES = ["statement"] as const

export type InputType = (typeof INPUT_TYPES)[number]
export type ContentType = (typeof CONTENT_TYPES)[number]
export type FieldType = InputType | ContentType

export interface Field {
  type: FieldType
  key?: string
  label?: string
  help?: string
  required?: boolean
  options?: string[]
  min?: number
  max?: number
  anchors?: [string, string]
  subscribe?: boolean
  title?: string
  body?: string
  preset?: string
}

export interface FormDefinition {
  id: string
  slug: string
  title: string
  description: string | null
  status: "draft" | "open" | "closed"
  current_version: number
  fields: Field[]
}

export type AnswerValue = string | number | string[]
export type Answers = Record<string, AnswerValue>

export function isInputField(f: Field): boolean {
  return (INPUT_TYPES as readonly string[]).includes(f.type)
}

export function inputFields(fields: Field[]): Field[] {
  return fields.filter(isInputField)
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Friendly, per-field validation for the browser.
 *
 * This is UX, not security — the backend re-validates every submission against the
 * version that was actually answered, and it is the only authority. The rules are not
 * duplicated so much as *rendered*: both sides read the same definition.
 */
export function validateField(field: Field, value: AnswerValue | undefined): string | null {
  const empty =
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)

  if (empty) {
    return field.required ? "This one's required." : null
  }

  switch (field.type) {
    case "email":
      return typeof value === "string" && EMAIL_RE.test(value.trim())
        ? null
        : "That doesn't look like an email address."
    case "number":
      return typeof value === "number" && Number.isFinite(value)
        ? null
        : "Please enter a number."
    case "date":
      return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? null
        : "Please enter a date."
    case "select":
    case "radio":
      return typeof value === "string" && field.options?.includes(value)
        ? null
        : "Please choose one of the options."
    case "checkbox":
      return Array.isArray(value) && value.every((v) => field.options?.includes(v))
        ? null
        : "Please choose from the options."
    case "rating": {
      const min = field.min ?? 1
      return typeof value === "number" &&
        Number.isInteger(value) &&
        value >= min &&
        value <= (field.max ?? 0)
        ? null
        : "Please pick a value on the scale."
    }
    default:
      return null
  }
}

export function validateAnswers(fields: Field[], answers: Answers): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const field of inputFields(fields)) {
    const message = validateField(field, answers[field.key as string])
    if (message) errors[field.key as string] = message
  }
  return errors
}
