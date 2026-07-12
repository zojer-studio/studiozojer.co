import { NextRequest, NextResponse } from "next/server"

const API_BASE = process.env.KAIROS_API_URL ?? "https://api.kairos.solar"

// A survey is prose, not a payload. 64KB is generous for the longest thing anyone will
// type and small enough that nobody can post a novel at us.
const MAX_BODY_BYTES = 64 * 1024

/**
 * The one public surface of the whole forms system.
 *
 * The backend has no public endpoint — this route holds the API key and calls in on the
 * visitor's behalf, exactly as /api/subscribe already does. So abuse control belongs
 * here, at the Vercel edge, rather than in a service that has never had any.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "That's too long to send." }, { status: 413 })
    }

    let payload: Record<string, unknown>
    try {
      payload = JSON.parse(raw)
    } catch {
      return NextResponse.json({ error: "Malformed request" }, { status: 400 })
    }

    const { version, answers, subscribe, hp } = payload

    // The honeypot. A human never sees the field, so anything in it is a bot — and we
    // return success without writing a row. Telling a bot it failed only teaches it to
    // try again differently.
    if (typeof hp === "string" && hp.trim() !== "") {
      return NextResponse.json({ success: true })
    }

    const apiKey = process.env.KAIROS_MAIL_API_KEY
    if (!apiKey) {
      console.error("KAIROS_MAIL_API_KEY is not configured")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Vercel sets x-forwarded-for; the leftmost entry is the client. The backend hashes
    // this and uses it only to rate-limit — it is never stored on the response, and the
    // raw address never reaches the database.
    const forwarded = request.headers.get("x-forwarded-for") ?? ""
    const clientIp = forwarded.split(",")[0]?.trim()

    const response = await fetch(
      `${API_BASE}/forms/${encodeURIComponent(slug)}/responses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          ...(clientIp ? { "x-client-ip": clientIp } : {}),
        },
        body: JSON.stringify({ version, answers, subscribe, source: "website" }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      const errorMessage =
        response.status === 429
          ? "You've sent this a few times already. Give it a few minutes."
          : data.error || "Failed to submit"
      return NextResponse.json({ error: errorMessage }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Form submission error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
