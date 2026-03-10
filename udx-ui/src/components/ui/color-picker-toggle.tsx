"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColorOption {
    label: string
    value: string
    /** Any valid CSS color string: hex, hsl(), rgb(), oklch() */
    colorCode: string
    disabled?: boolean
}

export interface ColorPickerToggleProps {
    colors: ColorOption[]
    /** Controlled selected value */
    value?: string
    onValueChange?: (value: string) => void
    /** Uncontrolled default */
    defaultValue?: string
    className?: string
    /** Accessible label for the group */
    "aria-label"?: string
    "aria-labelledby"?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Determines whether white or black provides better contrast against a hex color.
 * Implements WCAG relative luminance for the check icon color.
 */
function getCheckColor(hex: string): "white" | "black" {
    const sanitized = hex.replace("#", "")
    if (sanitized.length !== 3 && sanitized.length !== 6) return "white"

    const full =
        sanitized.length === 3
            ? sanitized
                .split("")
                .map((c) => c + c)
                .join("")
            : sanitized

    const r = parseInt(full.slice(0, 2), 16) / 255
    const g = parseInt(full.slice(2, 4), 16) / 255
    const b = parseInt(full.slice(4, 6), 16) / 255

    // sRGB → linear luminance
    const toLinear = (c: number) =>
        c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

    const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
    // WCAG contrast ratio with white (1.0) vs black (0.0)
    return L > 0.179 ? "black" : "white"
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ColorPickerToggle({
    colors,
    value: controlledValue,
    onValueChange,
    defaultValue,
    className,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
}: ColorPickerToggleProps) {
    const [internalValue, setInternalValue] = React.useState<string>(
        defaultValue ?? colors.find((c) => !c.disabled)?.value ?? ""
    )

    const isControlled = controlledValue !== undefined
    const activeValue = isControlled ? controlledValue : internalValue

    const handleSelect = (color: ColorOption) => {
        if (color.disabled) return
        if (!isControlled) setInternalValue(color.value)
        onValueChange?.(color.value)
    }

    // Roving tabIndex — arrow key navigation
    const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        index: number
    ) => {
        const enabled = colors
            .map((c, i) => (!c.disabled ? i : null))
            .filter((i): i is number => i !== null)

        const pos = enabled.indexOf(index)
        let next: number | undefined

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault()
            next = enabled[(pos + 1) % enabled.length]
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault()
            next = enabled[(pos - 1 + enabled.length) % enabled.length]
        } else if (e.key === "Home") {
            e.preventDefault()
            next = enabled[0]
        } else if (e.key === "End") {
            e.preventDefault()
            next = enabled[enabled.length - 1]
        }

        if (next !== undefined) {
            itemRefs.current[next]?.focus()
            handleSelect(colors[next])
        }
    }

    return (
        <div
            role="radiogroup"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className={cn("flex flex-wrap gap-1.5", className)}
        >
            {colors.map((color, index) => {
                const isActive = activeValue === color.value
                const isDisabled = color.disabled ?? false
                const checkColor = getCheckColor(color.colorCode)

                return (
                    <button
                        key={color.value}
                        ref={(el) => { itemRefs.current[index] = el }}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        aria-disabled={isDisabled}
                        aria-label={color.label}
                        disabled={isDisabled}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => handleSelect(color)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={cn(
                            // Base: square swatch, fixed size, no layout reflow on any state
                            "relative size-7 rounded-md",
                            "shrink-0 cursor-pointer",
                            // No transform, no scale — position is stable
                            // Focus ring: outline-based, never causes layout shift
                            "outline-none",
                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            // Active: 2px inset outline — survives overflow:hidden parents
                            // Uses box-shadow inset so it doesn't shift layout
                            isActive && "ring-2 ring-offset-2 ring-foreground/60 dark:ring-foreground/50",
                            // Disabled
                            isDisabled && "cursor-not-allowed opacity-40",
                            // Transition: only opacity properties, 150ms
                            "transition-opacity duration-150"
                        )}
                        style={{ backgroundColor: color.colorCode }}
                    >
                        {/* ── Check mark: opacity-only transition, no scale ── */}
                        <span
                            aria-hidden="true"
                            className={cn(
                                "absolute inset-0 flex items-center justify-center rounded-md",
                                // Opacity transition only — 150ms, no transform
                                "transition-opacity duration-150",
                                isActive ? "opacity-100" : "opacity-0"
                            )}
                        >
                            <Check
                                className="size-3.5 stroke-[2.5]"
                                style={{ color: checkColor }}
                            />
                        </span>

                        {/* ── Disabled overlay: diagonal line, no color change ── */}
                        {isDisabled && (
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 rounded-md overflow-hidden"
                            >
                                <svg
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    className="absolute inset-0 size-full"
                                    aria-hidden="true"
                                >
                                    <line
                                        x1="0" y1="100" x2="100" y2="0"
                                        stroke="rgba(255,255,255,0.6)"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )
}