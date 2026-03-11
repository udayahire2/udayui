"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColorOption {
    /** Human-readable label (tooltip + aria-label) */
    label: string
    /** Unique value identifier */
    value: string
    /** Any valid CSS color string: hex, hsl(), rgb(), oklch() */
    colorCode: string
    disabled?: boolean
}

export interface ColorPickerToggleProps {
    /** Color options rendered as swatches */
    colors: ColorOption[]
    /** Controlled selected value */
    value?: string
    onValueChange?: (value: string) => void
    /** Uncontrolled default */
    defaultValue?: string
    /** Swatch size variant */
    size?: "sm" | "md" | "lg"
    /** Disables the entire group */
    disabled?: boolean
    className?: string
    /** Accessible label for the radiogroup */
    "aria-label"?: string
    "aria-labelledby"?: string
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeMap = {
    sm: { swatch: "size-6", icon: "size-3", padding: "p-0.5" },
    md: { swatch: "size-8", icon: "size-3.5", padding: "p-0.5" },
    lg: { swatch: "size-10", icon: "size-4", padding: "p-1" },
} as const

// ─── Color parsing & contrast ─────────────────────────────────────────────────

type RgbColor = { r: number; g: number; b: number; a: number }

const contrastCache = new Map<string, "white" | "black">()
let colorParserContext: CanvasRenderingContext2D | null | undefined

function clampChannel(value: number) {
    return Math.min(255, Math.max(0, value))
}

function clampAlpha(value: number) {
    return Math.min(1, Math.max(0, value))
}

function parseHexColor(input: string): RgbColor | null {
    const sanitized = input.trim().replace(/^#/, "")
    if (![3, 4, 6, 8].includes(sanitized.length)) return null
    const full =
        sanitized.length <= 4
            ? sanitized.split("").map((c) => c + c).join("")
            : sanitized
    if (!/^[0-9a-f]+$/i.test(full)) return null
    return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
        a: full.length === 8 ? parseInt(full.slice(6, 8), 16) / 255 : 1,
    }
}

function parseRgbColor(input: string): RgbColor | null {
    const match = input
        .trim()
        .match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/i)
    if (!match) return null
    return {
        r: clampChannel(Number(match[1])),
        g: clampChannel(Number(match[2])),
        b: clampChannel(Number(match[3])),
        a: match[4] === undefined ? 1 : clampAlpha(Number(match[4])),
    }
}

function getColorParserContext() {
    if (colorParserContext !== undefined) return colorParserContext
    if (typeof document === "undefined") { colorParserContext = null; return null }
    colorParserContext = document.createElement("canvas").getContext("2d")
    return colorParserContext
}

function isKnownBlackValue(input: string) {
    const n = input.toLowerCase().replace(/\s+/g, "")
    return n === "#000" || n === "#000000" || n === "black" || n === "rgb(0,0,0)" || n === "rgba(0,0,0,1)"
}

function parseCssColor(input: string): RgbColor | null {
    const normalized = input.trim()
    if (!normalized) return null
    const hex = parseHexColor(normalized)
    if (hex) return hex
    const rgb = parseRgbColor(normalized)
    if (rgb) return rgb
    const context = getColorParserContext()
    if (!context) return null
    context.fillStyle = "#000"
    context.fillStyle = normalized
    const resolved = context.fillStyle
    if (!resolved || (resolved === "#000000" && !isKnownBlackValue(normalized))) return null
    return parseHexColor(resolved) ?? parseRgbColor(resolved)
}

function toLinear(channel: number) {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
}

function getCheckColor(colorCode: string): "white" | "black" {
    const cached = contrastCache.get(colorCode)
    if (cached) return cached
    const rgb = parseCssColor(colorCode)
    if (!rgb) return "white"
    const composite = {
        r: rgb.r * rgb.a + 255 * (1 - rgb.a),
        g: rgb.g * rgb.a + 255 * (1 - rgb.a),
        b: rgb.b * rgb.a + 255 * (1 - rgb.a),
    }
    const luminance =
        0.2126 * toLinear(composite.r) +
        0.7152 * toLinear(composite.g) +
        0.0722 * toLinear(composite.b)
    const result = luminance > 0.179 ? "black" : "white"
    contrastCache.set(colorCode, result)
    return result
}

function getFirstEnabledValue(colors: ColorOption[]) {
    return colors.find((c) => !c.disabled)?.value ?? ""
}

// ─── Component ────────────────────────────────────────────────────────────────

const ColorPickerToggle = React.forwardRef<HTMLDivElement, ColorPickerToggleProps>(
    function ColorPickerToggle(
        {
            colors,
            value: controlledValue,
            onValueChange,
            defaultValue,
            size = "md",
            disabled: groupDisabled = false,
            className,
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledBy,
        },
        ref
    ) {
        // ── Internal state ────────────────────────────────────────────────────
        const [internalValue, setInternalValue] = React.useState<string>(() => {
            if (defaultValue && colors.some((c) => c.value === defaultValue && !c.disabled))
                return defaultValue
            return getFirstEnabledValue(colors)
        })

        const isControlled = controlledValue !== undefined
        const activeValue = isControlled ? controlledValue : internalValue
        const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])

        // ── Keyboard nav indices ──────────────────────────────────────────────
        const enabledIndices = React.useMemo(
            () =>
                colors.reduce<number[]>((acc, c, i) => {
                    if (!c.disabled && !groupDisabled) acc.push(i)
                    return acc
                }, []),
            [colors, groupDisabled]
        )

        const firstEnabledIndex = enabledIndices[0] ?? -1
        const selectedEnabledIndex = React.useMemo(
            () => colors.findIndex((c) => c.value === activeValue && !c.disabled),
            [activeValue, colors]
        )
        const focusableIndex =
            selectedEnabledIndex >= 0 ? selectedEnabledIndex : firstEnabledIndex

        // ── Fallback sync ─────────────────────────────────────────────────────
        React.useEffect(() => {
            if (isControlled) return
            const hasValid = colors.some((c) => c.value === internalValue && !c.disabled)
            if (hasValid) return
            const fallback =
                defaultValue && colors.some((c) => c.value === defaultValue && !c.disabled)
                    ? defaultValue
                    : getFirstEnabledValue(colors)
            if (fallback !== internalValue) setInternalValue(fallback)
        }, [colors, defaultValue, internalValue, isControlled])

        // ── Handlers ──────────────────────────────────────────────────────────
        const handleSelect = (color: ColorOption) => {
            if (color.disabled || groupDisabled || color.value === activeValue) return
            if (!isControlled) setInternalValue(color.value)
            onValueChange?.(color.value)
        }

        const handleKeyDown = (
            event: React.KeyboardEvent<HTMLButtonElement>,
            index: number
        ) => {
            if (!enabledIndices.length) return
            const pos = enabledIndices.indexOf(index)
            const start = pos >= 0 ? pos : 0
            let next: number | undefined

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault()
                next = enabledIndices[(start + 1) % enabledIndices.length]
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault()
                next = enabledIndices[(start - 1 + enabledIndices.length) % enabledIndices.length]
            } else if (event.key === "Home") {
                event.preventDefault(); next = enabledIndices[0]
            } else if (event.key === "End") {
                event.preventDefault(); next = enabledIndices[enabledIndices.length - 1]
            }

            if (next === undefined) return
            itemRefs.current[next]?.focus()
            handleSelect(colors[next])
        }

        const { swatch, icon, padding } = sizeMap[size]

        // ── Render ────────────────────────────────────────────────────────────
        return (
            <div
                ref={ref}
                data-slot="color-picker-toggle"
                role="radiogroup"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-orientation="horizontal"
                aria-disabled={groupDisabled || undefined}
                className={cn(
                    "flex flex-wrap items-center gap-1.5",
                    groupDisabled && "pointer-events-none opacity-50",
                    className
                )}
            >
                {colors.map((color, index) => {
                    const isActive = activeValue === color.value
                    const isDisabled = (color.disabled ?? false) || groupDisabled
                    const checkColor = getCheckColor(color.colorCode)
                    const isFocusable = !isDisabled && index === focusableIndex

                    return (
                        <button
                            key={color.value}
                            ref={(el) => { itemRefs.current[index] = el }}
                            data-slot="color-swatch"
                            data-active={isActive || undefined}
                            type="button"
                            role="radio"
                            aria-checked={isActive}
                            aria-disabled={isDisabled || undefined}
                            aria-label={color.label}
                            title={color.label}
                            disabled={isDisabled}
                            tabIndex={isFocusable ? 0 : -1}
                            onClick={() => handleSelect(color)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={cn(
                                "relative shrink-0 rounded-md outline-none",
                                swatch, padding,
                                // Flat surface — 1px border, minimal shadow
                                "border border-border/60 bg-background",
                                "shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
                                // Transitions: border-color + box-shadow + opacity only
                                // Duration: 150ms — within the 120-180ms system rule
                                "transition-[border-color,box-shadow,opacity] duration-150",
                                // Hover: subtle border darkening, no scale, no glow
                                !isDisabled && "hover:border-foreground/25",
                                // Selected: standard ring with offset, thicker border
                                isActive && [
                                    "border-foreground/30",
                                    "ring-2 ring-ring/60 ring-offset-1 ring-offset-background",
                                ],
                                // Focus: standard ring — same as Radix/shadcn pattern
                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                isDisabled && "cursor-not-allowed opacity-45"
                            )}
                        >
                            {/* Color fill — inset from border, subtle inner sheen */}
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute inset-0.5 rounded-[3px]",
                                    "ring-1 ring-inset ring-black/8 dark:ring-white/10",
                                    isDisabled && "opacity-75"
                                )}
                                style={{
                                    backgroundColor: color.colorCode,
                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
                                }}
                            />

                            {/* Check — opacity transition only, no scale, no draw-on */}
                            <span
                                aria-hidden="true"
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Check
                                    className={cn(
                                        icon,
                                        "stroke-[2.5]",
                                        "transition-opacity duration-150",
                                        isActive ? "opacity-100" : "opacity-0"
                                    )}
                                    style={{ color: checkColor }}
                                />
                            </span>

                            {/* Disabled strikethrough */}
                            {isDisabled && (
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-md overflow-hidden"
                                >
                                    <svg
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        className="absolute inset-0 size-full"
                                    >
                                        <line
                                            x1="14" y1="86" x2="86" y2="14"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            className="text-foreground/35"
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
)

ColorPickerToggle.displayName = "ColorPickerToggle"

export { ColorPickerToggle }
export type { ColorOption, ColorPickerToggleProps }
