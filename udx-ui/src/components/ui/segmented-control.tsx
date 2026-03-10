"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export interface SegmentedControlProps {
    options: { label: string; value: string; icon?: React.ReactNode }[]
    value?: string
    onValueChange?: (value: string) => void
    defaultValue?: string
    className?: string
    size?: "default" | "sm" | "lg"
}

export function SegmentedControl({
    options,
    value,
    onValueChange,
    defaultValue,
    className,
    size = "default",
}: SegmentedControlProps) {
    // Use uncontrolled state if value isn't provided, otherwise controlled
    const [internalValue, setInternalValue] = React.useState(defaultValue || options[0]?.value)
    const id = React.useId()

    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = (newValue: string) => {
        if (!newValue) return // Prevent deselecting

        if (value === undefined) {
            setInternalValue(newValue)
        }

        onValueChange?.(newValue)
    }

    return (
        <ToggleGroup
            type="single"
            value={currentValue}
            onValueChange={handleValueChange}
            className={cn(
                "bg-muted/50 p-1 rounded-lg backdrop-blur-sm",
                className
            )}
        >
            {options.map((option) => (
                <ToggleGroupItem
                    key={option.value}
                    value={option.value}
                    size={size}
                    className={cn(
                        "relative rounded-md shrink-0 transition-colors duration-200 z-10 px-4",
                        currentValue === option.value
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                    variant="default" // Force default so it doesn't get outline styles
                    // Remove hover bg since we use framer motion for active state
                    style={{ background: "transparent" }}
                >
                    {currentValue === option.value && (
                        <motion.span
                            layoutId={`segmented-control-indicator-${id}`}
                            className="absolute inset-0 z-[-1] bg-background rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] dark:bg-muted dark:shadow-none"
                            initial={false}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                            }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        {option.icon}
                        {option.label}
                    </span>
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    )
}
