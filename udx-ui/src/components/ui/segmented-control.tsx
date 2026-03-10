"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SegmentedControlOption {
    label: string
    value: string
    icon?: React.ReactNode
    disabled?: boolean
}

export interface SegmentedControlProps {
    options: SegmentedControlOption[]
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    size?: "sm" | "default" | "lg"
    disabled?: boolean
    fullWidth?: boolean
    className?: string
}

const sizeClasses = {
    sm: "h-7 px-3 text-xs gap-1.5",
    default: "h-8 px-4 text-sm gap-2",
    lg: "h-9 px-5 text-sm gap-2",
} as const

export function SegmentedControl({
    options,
    value,
    defaultValue,
    onValueChange,
    size = "default",
    disabled = false,
    fullWidth = false,
    className,
}: SegmentedControlProps) {
    const [internalValue, setInternalValue] = React.useState(
        defaultValue ?? options[0]?.value
    )

    const currentValue = value !== undefined ? value : internalValue

    const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
        if (disabled || optionDisabled || optionValue === currentValue) return
        if (value === undefined) setInternalValue(optionValue)
        onValueChange?.(optionValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return
        const activeOptions = options.filter((o) => !o.disabled)
        const currentIndex = activeOptions.findIndex((o) => o.value === currentValue)

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault()
            const next = activeOptions[(currentIndex + 1) % activeOptions.length]
            if (next) handleSelect(next.value)
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault()
            const prev =
                activeOptions[(currentIndex - 1 + activeOptions.length) % activeOptions.length]
            if (prev) handleSelect(prev.value)
        }
    }

    return (
        <div
            role="tablist"
            aria-disabled={disabled}
            onKeyDown={handleKeyDown}
            className={cn(
                "inline-flex items-center gap-1 rounded-lg border border-border bg-muted p-1",
                fullWidth && "w-full",
                disabled && "pointer-events-none opacity-50",
                className
            )}
        >
            {options.map((option) => {
                const isActive = currentValue === option.value
                const isDisabled = disabled || option.disabled

                return (
                    <button
                        key={option.value}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-disabled={isDisabled}
                        disabled={isDisabled}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => handleSelect(option.value, option.disabled)}
                        className={cn(
                            // Base
                            "relative inline-flex shrink-0 items-center justify-center rounded-md font-medium outline-none",
                            "select-none cursor-pointer",
                            "transition-all duration-150 ease-in-out",
                            // Focus ring
                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-muted",
                            // Size
                            sizeClasses[size],
                            // Full width stretch
                            fullWidth && "flex-1",
                            // State: active
                            isActive
                                ? "bg-background text-foreground shadow-sm border border-border/60"
                                : "bg-transparent text-muted-foreground hover:text-foreground",
                            // Disabled per-option
                            isDisabled && !disabled && "cursor-not-allowed opacity-50"
                        )}
                    >
                        {option.icon && (
                            <span className="shrink-0 [&_svg]:size-3.5">
                                {option.icon}
                            </span>
                        )}
                        <span>{option.label}</span>
                    </button>
                )
            })}
        </div>
    )
}
