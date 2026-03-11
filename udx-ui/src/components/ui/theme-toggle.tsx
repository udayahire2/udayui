"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ThemeToggleProps {
    className?: string
    size?: "sm" | "default" | "lg"
}

// ─── Size maps ───────────────────────────────────────────────────────────────

const sizeMap = {
    sm: { button: "w-8 h-8", icon: "size-3.5" },
    default: { button: "w-9 h-9", icon: "size-4" },
    lg: { button: "w-10 h-10", icon: "size-[18px]" },
} as const

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemeToggle({
    className,
    size = "default",
}: ThemeToggleProps) {
    // resolvedTheme respects the "system" theme value correctly —
    // unlike `theme`, it always returns the actual applied mode.
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const { button, icon } = sizeMap[size]

    // ── Skeleton (pre-hydration) ──────────────────────────────────────────────
    // Renders the same button shell so layout is stable (no CLS).
    // The icon is invisible until mounted to avoid a content jump.
    if (!mounted) {
        return (
            <Toggle
                variant="ghost"
                size={size}
                className={cn(button, "relative overflow-hidden", className)}
                aria-label="Toggle theme"
                tabIndex={-1}
                aria-hidden="true"
            >
                <span className={cn(icon, "opacity-0")}>
                    <Sun />
                </span>
            </Toggle>
        )
    }

    const isDark = resolvedTheme === "dark"

    return (
        <Toggle
            variant="ghost"
            size={size}
            pressed={isDark}
            onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
            className={cn(
                button,
                "relative overflow-hidden",
                "data-[state=on]:bg-transparent data-[state=on]:text-foreground",
                "hover:[&_svg]:text-[var(--color-theme-toggle-hover)]",
                className
            )}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                {isDark ? (
                    <Moon className={cn(icon, "transition-colors duration-150")} />
                ) : (
                    <Sun className={cn(icon, "transition-colors duration-150")} />
                )}
            </div>

            <span className="sr-only">
                {isDark ? "Switch to light theme" : "Switch to dark theme"}
            </span>
        </Toggle>
    )
}
