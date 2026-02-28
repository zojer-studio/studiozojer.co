import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.KAIROS_MAIL_API_KEY
    if (!apiKey) {
      console.error("KAIROS_MAIL_API_KEY is not configured")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    const response = await fetch("https://api.kairos.solar/mail/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        source: "website",
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.error || "Failed to subscribe"
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
