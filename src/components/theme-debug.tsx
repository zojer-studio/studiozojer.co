"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function ThemeDebug() {
  const { theme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [htmlClass, setHtmlClass] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateHtmlClass = () => {
      setHtmlClass(document.documentElement.className)
    }

    updateHtmlClass()

    // Watch for class changes
    const observer = new MutationObserver(updateHtmlClass)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-bg-card border border-bd-primary rounded-lg p-4 font-mono text-xs max-w-sm shadow-lg z-50">
      <div className="font-bold mb-2">Theme Debug Info:</div>
      <div>theme: {theme}</div>
      <div>resolvedTheme: {resolvedTheme}</div>
      <div>systemTheme: {systemTheme}</div>
      <div className="mt-2 font-bold">HTML class:</div>
      <div className="break-all">{htmlClass || "(empty)"}</div>
      <div className="mt-2 font-bold">System prefers:</div>
      <div>{window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"}</div>
    </div>
  )
}
