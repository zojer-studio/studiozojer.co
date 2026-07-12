"use client"

import * as React from "react"
import { ArrowRight } from "iconoir-react"

import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { FieldError, FieldHelp } from "@/src/components/ui/field-error"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { RadioGroup } from "@/src/components/ui/radio-group"
import { Rating } from "@/src/components/ui/rating"
import { Select } from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"
import {
  type Answers,
  type AnswerValue,
  type Field,
  type FormDefinition,
  inputFields,
  validateAnswers,
} from "@/src/lib/forms"
import { cn } from "@/src/lib/utils"

type FormStatus = "idle" | "loading" | "success" | "error"

interface FormRendererProps {
  definition: FormDefinition
  /** Rendered inside kairos.admin's iframe: live-updating, and submission disabled. */
  previewMode?: boolean
  className?: string
}

/** What the admin posts into the iframe as the operator edits. */
interface PreviewMessage {
  type: "forms:preview"
  title: string
  description: string | null
  fields: Field[]
}

export function FormRenderer({
  definition,
  previewMode = false,
  className,
}: FormRendererProps) {
  const [live, setLive] = React.useState(definition)
  const [answers, setAnswers] = React.useState<Answers>({})
  const [subscribe, setSubscribe] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = React.useState("")

  // The honeypot. A real person never sees it, so a value here is a bot — and we accept
  // the request and drop it on the floor rather than telling it that it failed.
  const [hp, setHp] = React.useState("")

  // ── preview: the admin drives this component over postMessage ─────────────────
  React.useEffect(() => {
    if (!previewMode) return

    const adminOrigin = process.env.NEXT_PUBLIC_ADMIN_ORIGIN
    const onMessage = (event: MessageEvent) => {
      // Anyone can iframe a page they can reach; only the admin may drive it.
      if (!adminOrigin || event.origin !== adminOrigin) return

      const data = event.data as PreviewMessage
      if (data?.type !== "forms:preview") return

      setLive((prev) => ({
        ...prev,
        title: data.title,
        description: data.description,
        fields: Array.isArray(data.fields) ? data.fields : [],
      }))
    }

    window.addEventListener("message", onMessage)
    // Tell the parent we are mounted and listening, so it knows when to send.
    window.parent.postMessage({ type: "forms:ready" }, adminOrigin ?? "*")

    return () => window.removeEventListener("message", onMessage)
  }, [previewMode])

  // Reset if the server hands us a genuinely different form.
  React.useEffect(() => {
    if (!previewMode) setLive(definition)
  }, [definition, previewMode])

  const setAnswer = (key: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
    if (status === "error") setStatus("idle")
  }

  const subscribeField = inputFields(live.fields).find(
    (f) => f.type === "email" && f.subscribe
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (previewMode) return

    const found = validateAnswers(live.fields, answers)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setStatus("error")
      setErrorMessage("Please check the highlighted questions.")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch(`/api/forms/${live.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // The version we RENDERED, not whatever is current by the time this lands.
          // If the form was edited while this page sat open, the respondent answered
          // what they saw, and the backend records it against that.
          version: live.current_version,
          answers,
          subscribe: subscribeField ? subscribe : false,
          hp,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setErrorMessage(data.error || "Something went wrong. Please try again.")
        return
      }

      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  // Success replaces the form, matching the newsletter form rather than showing a
  // banner above a form the visitor has already finished with.
  if (status === "success") {
    return (
      <div className={cn("py-8 text-center", className)}>
        <p className="text-tx-success font-medium">Thank you — that&apos;s in.</p>
        <p className="text-tx-secondary text-sm mt-1">
          We read every response.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-8", className)} noValidate>
      {live.fields.map((field, index) => (
        <FieldView
          key={field.key ?? `${field.type}-${index}`}
          field={field}
          value={answers[field.key as string]}
          error={errors[field.key as string]}
          disabled={status === "loading" || previewMode}
          onChange={setAnswer}
        />
      ))}

      {subscribeField && (
        // Consent, explicitly. The backend will not subscribe anyone without this box,
        // and it must not: silently signing someone up because they left an address on
        // a survey is a dark pattern, and unlawful for EU respondents.
        <Checkbox
          label="Send me occasional updates from Studio Zojer."
          checked={subscribe}
          disabled={status === "loading" || previewMode}
          onChange={(e) => setSubscribe(e.target.checked)}
        />
      )}

      {/* Honeypot. Off-screen rather than display:none — some bots skip hidden fields. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website-url">Leave this empty</label>
        <input
          id="website-url"
          name="website-url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" disabled={status === "loading" || previewMode} className="self-start">
          {previewMode ? (
            "Preview — submissions disabled"
          ) : status === "loading" ? (
            "Sending…"
          ) : (
            <>
              Submit <ArrowRight className="inline-block ml-1.5 w-4 h-4" />
            </>
          )}
        </Button>

        {status === "error" && errorMessage && (
          <p role="alert" className="text-tx-error text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  )
}

// ── one field ───────────────────────────────────────────────────────────────────

interface FieldViewProps {
  field: Field
  value: AnswerValue | undefined
  error?: string
  disabled: boolean
  onChange: (key: string, value: AnswerValue) => void
}

function FieldView({ field, value, error, disabled, onChange }: FieldViewProps) {
  const reactId = React.useId()

  // A statement collects nothing. It has no key, no label and no control — it is prose.
  if (field.type === "statement") {
    return (
      <div className="flex flex-col gap-2">
        {field.title && (
          <h2 className="text-xl font-display text-tx-primary">{field.title}</h2>
        )}
        {field.body && (
          <p className="text-tx-secondary leading-relaxed whitespace-pre-line">
            {field.body}
          </p>
        )}
      </div>
    )
  }

  const key = field.key as string
  const fieldId = `field-${key}-${reactId}`
  const errorId = error ? `${fieldId}-error` : undefined
  const helpId = field.help ? `${fieldId}-help` : undefined
  const describedBy = [errorId, helpId].filter(Boolean).join(" ") || undefined
  const invalid = Boolean(error)

  // A radio group and a rating are labelled by the group, not by a single control, so
  // their question is a plain <p> rather than a <label> pointing at nothing.
  const groupLike = field.type === "radio" || field.type === "rating"

  return (
    <div className="flex flex-col">
      {groupLike ? (
        <p className="block text-sm font-medium text-tx-primary mb-2">
          {field.label}
          {field.required && (
            <span className="text-tx-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </p>
      ) : (
        <Label htmlFor={fieldId} required={field.required}>
          {field.label}
        </Label>
      )}

      {field.type === "text" && (
        <Input
          id={fieldId}
          type="text"
          value={(value as string) ?? ""}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {field.type === "email" && (
        <Input
          id={fieldId}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={(value as string) ?? ""}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {field.type === "number" && (
        <Input
          id={fieldId}
          type="number"
          inputMode="numeric"
          value={value === undefined ? "" : String(value)}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => {
            const raw = e.target.value
            // An empty box is "unanswered", not the number zero.
            onChange(key, raw === "" ? "" : Number(raw))
          }}
        />
      )}

      {field.type === "date" && (
        <Input
          id={fieldId}
          type="date"
          value={(value as string) ?? ""}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {field.type === "textarea" && (
        <Textarea
          id={fieldId}
          value={(value as string) ?? ""}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {field.type === "select" && (
        <Select
          id={fieldId}
          options={field.options ?? []}
          value={(value as string) ?? ""}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          onChange={(e) => onChange(key, e.target.value)}
        />
      )}

      {field.type === "radio" && (
        <RadioGroup
          name={fieldId}
          options={field.options ?? []}
          value={value as string | undefined}
          disabled={disabled}
          invalid={invalid}
          describedBy={describedBy}
          onValueChange={(v) => onChange(key, v)}
        />
      )}

      {field.type === "rating" && (
        <Rating
          name={fieldId}
          min={field.min}
          max={field.max ?? 5}
          anchors={field.anchors}
          value={value as number | undefined}
          disabled={disabled}
          invalid={invalid}
          describedBy={describedBy}
          onValueChange={(v) => onChange(key, v)}
        />
      )}

      {field.type === "checkbox" && (
        <div
          role="group"
          aria-describedby={describedBy}
          className="flex flex-col gap-2.5"
        >
          {(field.options ?? []).map((option) => {
            const selected = Array.isArray(value) ? value : []
            return (
              <Checkbox
                key={option}
                label={option}
                checked={selected.includes(option)}
                disabled={disabled}
                onChange={(e) =>
                  onChange(
                    key,
                    e.target.checked
                      ? [...selected, option]
                      : selected.filter((v) => v !== option)
                  )
                }
              />
            )
          })}
        </div>
      )}

      <FieldHelp id={helpId}>{field.help}</FieldHelp>
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  )
}
