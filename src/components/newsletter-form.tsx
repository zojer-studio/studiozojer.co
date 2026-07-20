"use client"

import * as React from "react"
import { ArrowRight } from "iconoir-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { cn } from "@/src/lib/utils"

interface NewsletterFormProps {
  className?: string
}

type FormStatus = "idle" | "loading" | "success" | "error"

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = React.useState("")
  const [welcome, setWelcome] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus("error")
      setErrorMessage("Please enter your email address.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus("error")
      setErrorMessage("Please enter a valid email address.")
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setErrorMessage(data.error || "Something went wrong. Please try again.")
        return
      }

      setWelcome(data.welcome ?? null)
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    const message =
      welcome === "queued"
        ? "Thanks for subscribing — check your inbox for your welcome email."
        : welcome === "rate_limited"
          ? "You're already subscribed. Your welcome email was sent recently — check your inbox, and your spam folder."
          : "Thanks for subscribing!"

    return (
      <div className={cn("text-center py-4", className)}>
        <p className="text-tx-success font-medium">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-2 sm:flex-row flex-col">
        <Input
          id="beta-email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === "error") setStatus("idle")
          }}
          disabled={status === "loading"}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Signing up..." : <>Sign up <ArrowRight className="inline-block ml-1.5 w-4 h-4" /></>}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-tx-error text-sm text-left">{errorMessage}</p>
      )}
    </form>
  )
}
