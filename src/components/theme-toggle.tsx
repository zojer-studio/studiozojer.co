"use client"

import * as React from "react"
import { Trees, Gem } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/src/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Trees className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "opalite" ? "forest" : "opalite")}
      title={`Switch to ${theme === "opalite" ? "Forest" : "Opalite"} theme`}
    >
      {theme === "opalite" ? (
        <Trees className="h-5 w-5 text-ic-primary" />
      ) : (
        <Gem className="h-5 w-5 text-ic-primary" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
