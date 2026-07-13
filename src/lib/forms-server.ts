import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"

import type { FormDefinition } from "@/src/lib/forms"

// Note the /mail prefix. Caddy routes api.kairos.solar/mail/* to the kairos.mail service
// (stripping the prefix) and sends everything else to kairos.rs -- so a root-level
// /forms/* would land on kairos.rs, which has never heard of forms, and 404. The path
// says "served by the mail service", which is true, and it will change when that service
// is eventually renamed.
//
// KAIROS_API_URL overrides the whole base, so local dev points straight at the service
// (http://localhost:3002) with no prefix.
const API_BASE = process.env.KAIROS_API_URL ?? "https://api.kairos.solar/mail"

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
// The signing key is DERIVED from KAIROS_MAIL_API_KEY rather than being a secret of its
// own. Both apps already hold that key, so there is nothing new to generate and nothing
// to keep in sync — which matters because the failure mode of a hand-copied shared
// secret is silent: the signatures simply stop matching, every preview 404s, and it
// looks like a bug in the builder rather than a config drift.
//
// Standard domain-separated derivation: the label means this key can never collide with
// the API key's own use as a bearer token, even though both descend from one secret.
// Rotating the API key invalidates outstanding preview links, which live an hour anyway.

const PREVIEW_KEY_LABEL = "forms-preview-v1"
const TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

/** The derived signing key. Exported shape is shared with kairos.admin's copy. */
function previewKey(apiKey: string): Buffer {
  return createHmac("sha256", apiKey).update(PREVIEW_KEY_LABEL).digest()
}

function sign(slug: string, exp: number, apiKey: string): string {
  return createHmac("sha256", previewKey(apiKey))
    .update(`${slug}.${exp}`)
    .digest("hex")
}

/** `<exp>.<hmac>` — kairos.admin builds the iframe URL with this. */
export function signPreviewToken(slug: string, apiKey: string): string {
  const exp = Date.now() + TOKEN_TTL_MS
  return `${exp}.${sign(slug, exp, apiKey)}`
}

export function verifyPreviewToken(slug: string, token: string | undefined): boolean {
  const apiKey = process.env.KAIROS_MAIL_API_KEY
  if (!apiKey || !token) return false

  const [expRaw, mac] = token.split(".")
  const exp = Number(expRaw)
  if (!Number.isFinite(exp) || !mac) return false

  // Not decoration: without an expiry, a token that leaked once would be a permanent
  // backdoor to every unpublished form.
  if (Date.now() > exp) return false

  const expected = sign(slug, exp, apiKey)
  // Both are fixed-length hex from the same HMAC, so the lengths always match — but
  // compare in constant time regardless, rather than leaking a prefix through timing.
  const a = Buffer.from(expected, "hex")
  const b = Buffer.from(mac, "hex")
  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}
