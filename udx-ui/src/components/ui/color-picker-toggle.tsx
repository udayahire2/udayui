"use client"

import * as React from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export interface ColorPickerToggleProps {
    colors: { label: string; value: string; colorCode: string }[]
    value?: string
    onValueChange?: (value: string) => void
    defaultValue?: string
    className?: string
}

export function ColorPickerToggle({
    colors,
    value,
    onValueChange,
    defaultValue,
    className
}: ColorPickerToggleProps) {
    return (
        <ToggleGroup
            type="single"
            value={value}
            defaultValue={defaultValue}
            onValueChange={(val) => {
                if (val) onValueChange?.(val)
            }}
            className={cn("flex flex-wrap gap-2 sm:gap-3", className)}
            spacing={0}
        >
            {colors.map((color) => (
                <ToggleGroupItem
                    key={color.value}
                    value={color.value}
                    aria-label={`Select ${color.label} color`}
                    className={cn(
                        "group relative size-7 sm:size-8 rounded-full transition-transform active:scale-95 p-0! hover:bg-transparent overflow-visible outline-none",
                        "data-[state=on]:scale-90"
                    )}
                    variant="default" // Remove default hover styles
                >
                    {/* Inner Dot */}
                    <span
                        className="absolute inset-[3px] rounded-full transition-all duration-200"
                        style={{ backgroundColor: color.colorCode }}
                    />
                    {/* Outer Halo (only visible when selected or focused) */}
                    <span
                        className={cn(
                            "absolute inset-0 rounded-full border-2 border-transparent transition-all duration-300 opacity-0 group-data-[state=on]:opacity-100 group-focus-visible:border-ring group-focus-visible:opacity-100"
                        )}
                        style={{
                            borderColor: color.colorCode,
                            // We use CSS variables for focus ring if needed, but styling border directly here is more reliable for dynamic colors
                        }}
                    />
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
