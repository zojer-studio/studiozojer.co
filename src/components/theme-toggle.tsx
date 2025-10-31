"use client"

import * as React from "react"
import { Trees, Gem, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/src/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Monitor className="h-5 w-5" />
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getNextTheme = () => {
    if (theme === "light") return "Dark"
    if (theme === "dark") return "Auto"
    return "Light"
  }

  // Use resolvedTheme for icon display to show actual appearance
  // Use theme for the cycle logic to preserve user's selection
  const displayIcon = theme === "system" ? "system" : resolvedTheme

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
      title={`Switch to ${getNextTheme()} theme`}
    >
      {displayIcon === "light" ? (
        <Trees className="h-5 w-5 text-ic-primary" />
      ) : displayIcon === "dark" ? (
        <Gem className="h-5 w-5 text-ic-primary" />
      ) : (
        <Monitor className="h-5 w-5 text-ic-primary" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
