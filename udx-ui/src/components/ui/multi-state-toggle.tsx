"use client"

import * as React from "react"
import { Toggle } from "@/components/ui/toggle"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface MultiStateToggleProps {
    states: { value: string; icon: React.ReactNode; label?: string }[]
    value?: string
    onValueChange?: (value: string) => void
    defaultValue?: string
    className?: string
}

export function MultiStateToggle({
    states,
    value,
    onValueChange,
    defaultValue,
    className
}: MultiStateToggleProps) {
    const [internalValue, setInternalValue] = React.useState(defaultValue || states[0]?.value)
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const currentIndex = states.findIndex(s => s.value === currentValue)
    const currentStateObj = states[currentIndex] || states[0]

    const cycleState = () => {
        const nextIndex = (currentIndex + 1) % states.length
        const nextValue = states[nextIndex].value

        if (!isControlled) {
            setInternalValue(nextValue)
        }
        onValueChange?.(nextValue)
    }

    return (
        <Toggle
            variant="outline"
            onClick={cycleState}
            className={cn("w-9 h-9 relative overflow-hidden group/multistate", className)}
            aria-label={`Current state: ${currentStateObj.value}`}
        // Trick radix into firing click as custom event by not binding actual `pressed` state directly 
        // since it's a 3+ state toggle, Radix boolean 'pressed' doesn't map 1:1. We just use it for the container style.
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={currentStateObj.value}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    {currentStateObj.icon}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">{currentStateObj.label || currentStateObj.value}</span>
        </Toggle>
    )
}
