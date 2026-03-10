"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Ensure hydration matches structure
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Toggle variant="outline" size="default" className={cn("w-9 h-9", className)}>
                <span className="sr-only">Toggle theme</span>
            </Toggle>
        )
    }

    const isDark = theme === "dark"

    return (
        <Toggle
            variant="outline"
            size="default"
            pressed={isDark}
            onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
            className={cn("w-9 h-9 relative overflow-hidden group/theme", className)}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: 20, opacity: 0, rotate: -45, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ y: -20, opacity: 0, rotate: 45, scale: 0.5 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.3
                    }}
                    className="absolute inset-0 flex items-center justify-center transform-gpu"
                >
                    {isDark ? (
                        <Moon className="size-4 group-hover/theme:text-yellow-400 transition-colors" />
                    ) : (
                        <Sun className="size-4 group-hover/theme:text-orange-500 transition-colors" />
                    )}
                </motion.div>
            </AnimatePresence>
            <span className="sr-only">Toggle theme</span>
        </Toggle>
    )
}
