import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"

import type { FormDefinition } from "@/src/lib/forms"

const API_BASE = process.env.KAIROS_API_URL ?? "https://api.kairos.solar"

/**
 * Fetch a form definition.
 *
 * The API key lives here, on the server, and never reaches the browser — which is why
 * the backend needs no public endpoint. The site calls in on the visitor's behalf,
 * exactly as the newsletter form already does.
 *
 * `draft` is an explicit opt-in used only by preview mode, and the caller must have
 * verified a preview token before passing it.
 */
export async function fetchForm(
  slug: string,
  { draft = false }: { draft?: boolean } = {}
): Promise<FormDefinition | null> {
  const apiKey = process.env.KAIROS_MAIL_API_KEY
  if (!apiKey) {
    console.error("KAIROS_MAIL_API_KEY is not configured")
    return null
  }

  const url = `${API_BASE}/forms/${encodeURIComponent(slug)}${draft ? "?draft=1" : ""}`

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      // A published form changes rarely, but a stale definition means someone answers a
      // question we have removed. Revalidate often enough that an edit lands quickly.
      next: { revalidate: 30 },
    })

    if (!response.ok) return null
    return (await response.json()) as FormDefinition
  } catch (error) {
    console.error("Failed to fetch form:", error)
    return null
  }
}

// ── preview tokens ──────────────────────────────────────────────────────────────
//
// kairos.admin signs a token; this site verifies it. A valid token lets the admin's
// iframe render a form that is still a draft.
//
// The expiry is not decoration. Without it, a token that leaked once would be a
// permanent backdoor to every unpublished form.

const TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

function sign(slug: string, exp: number, secret: string): string {
  return createHmac("sha256", secret).update(`${slug}.${exp}`).digest("hex")
}

/** `<exp>.<hmac>` — used by kairos.admin to build the iframe URL. */
export function signPreviewToken(slug: string, secret: string): string {
  const exp = Date.now() + TOKEN_TTL_MS
  return `${exp}.${sign(slug, exp, secret)}`
}

export function verifyPreviewToken(slug: string, token: string | undefined): boolean {
  const secret = process.env.FORMS_PREVIEW_SECRET
  if (!secret || !token) return false

  const [expRaw, mac] = token.split(".")
  const exp = Number(expRaw)
  if (!Number.isFinite(exp) || !mac) return false
  if (Date.now() > exp) return false

  const expected = sign(slug, exp, secret)
  // Both are fixed-length hex from the same HMAC, so the lengths always match — but
  // compare in constant time regardless, rather than leaking a prefix through timing.
  const a = Buffer.from(expected, "hex")
  const b = Buffer.from(mac, "hex")
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}
