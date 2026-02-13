"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { UDXLogo } from "@/components/ui/udx-logo";
import { useTheme } from "next-themes";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// --- Sound Hook ---
const AUDIO_FILE_PATH = "/mixkit-camera-shutter-click-1133.wav";

const useSound = (url: string) => {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Only create audio on client
        const audioObj = new Audio(url);
        setAudio(audioObj);
    }, [url]);

    const play = () => {
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play failed", e));
        }
    };

    return play;
};

// --- Theme Trigger Component ---
const ThemeTrigger = ({ progress }: { progress?: any }) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const playSound = useSound(AUDIO_FILE_PATH);

    const scrollRotation = useTransform(progress || 0, [0, 1], [0, 45]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full shrink-0 relative overflow-hidden group hover:bg-muted/50 transition-colors"
                aria-label="Theme toggle placeholder"
            >
                <div className="relative w-full h-full flex items-center justify-center opacity-0">
                    {/* Placeholder to keep layout stable */}
                </div>
            </Button>
        );
    }

    const isDark = theme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                playSound();
                setTheme(isDark ? "light" : "dark");
            }}
            className="w-10 h-10 rounded-full shrink-0 relative overflow-hidden group hover:bg-muted/50 transition-colors"
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Sun/Moon Morph using Framer Motion */}
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground transition-colors"
                    aria-hidden="true"
                >
                    {/* Center Circle (Sun Body / Moon Body) */}
                    <motion.circle
                        cx="12"
                        cy="12"
                        initial={false}
                        animate={{
                            r: isDark ? 9 : 5
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    <motion.g
                        initial={false}
                        animate={{
                            opacity: isDark ? 0 : 1,
                            rotate: isDark ? 90 : 0,
                            scale: isDark ? 0.5 : 1
                        }}
                        style={{
                            originX: "12px",
                            originY: "12px",
                            rotate: scrollRotation
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </motion.g>
                </svg>

                {/* Moon Crater Mask/Path integration placeholder - using motion.circle for now as requested but adding more character */}
                <motion.div
                    className="absolute top-[30%] right-[30%] w-1.5 h-1.5 bg-background rounded-full"
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 0.4 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
            </div>
        </Button>
    );
};

const navItems = [
    { name: "Mission", href: "#" },
    { name: "Technology", href: "#" },
    { name: "Systems", href: "#" },
    { name: "Status", href: "#" },
];

export function NavbarCinematic() {
    const { scrollY } = useScroll();
    const { theme, resolvedTheme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const [isLogoHovered, setIsLogoHovered] = useState(false);

    const isDark = resolvedTheme === "dark" || theme === "dark";

    // Simplified Animation Hooks
    const scrollRaw = useTransform(scrollY, [0, 200], [0, 1]); // Extended range for smoother entrance
    const scrollSpring = useSpring(scrollRaw, {
        stiffness: 280,
        damping: 32,
        mass: 1.2,
        restDelta: 0.001
    });
    const progress = shouldReduceMotion ? scrollRaw : scrollSpring;

    // Premium Transforms
    const y = useTransform(progress, [0, 1], [-10, 0]); // Subtle slide-in
    const gap = useTransform(progress, [0, 1], ["16px", "0px"]); // Use px units for proper animation
    const padding = useTransform(progress, [0.4, 1], ["0px", "6px"]);

    const bgOpacity = useTransform(progress, [0.4, 1], [0, 0.98]);
    const blurValue = useTransform(progress, [0.4, 1], [0, 12]);
    const borderOpacity = useTransform(progress, [0, 1], [0.1, isDark ? 0.4 : 0.2]);

    // Removed item transforms for simplicity
    const containerBg = useMotionTemplate`oklch(from var(--background) l c h / ${bgOpacity})`;
    const containerBorder = useMotionTemplate`oklch(from var(--foreground) l c h / ${borderOpacity})`;

    return (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none px-4 md:px-0">
            <motion.div
                style={{
                    y,
                    gap,
                    padding,
                    background: containerBg,
                    backdropFilter: useMotionTemplate`blur(${blurValue}px)`,
                    borderRadius: "9999px",
                    borderWidth: "1px",
                    borderColor: containerBorder,
                }}
                className="flex items-center pointer-events-auto overflow-hidden transition-colors max-w-4xl" // Added max-width for robustness
                role="banner"
            >
                {/* Logo - Clean Transition */}
                <motion.div
                    className="h-10 flex items-center px-2 rounded-full border border-border shrink-0 overflow-hidden relative group/logo cursor-pointer"
                    onHoverStart={() => setIsLogoHovered(true)}
                    onHoverEnd={() => setIsLogoHovered(false)}
                >
                    <div className="flex items-center gap-1 px-2">
                        <motion.div
                            animate={{ scale: isLogoHovered ? 1.05 : 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="flex items-center justify-center shrink-0"
                        >
                            <UDXLogo className="w-8 h-8 text-foreground" />
                        </motion.div>

                        <AnimatePresence initial={false}>
                            {isLogoHovered && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0, x: -5 }}
                                    animate={{ width: "auto", opacity: 1, x: 0 }}
                                    exit={{ width: 0, opacity: 0, x: -5 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="overflow-hidden flex flex-col justify-center leading-none whitespace-nowrap"
                                >
                                    <span className="font-semibold text-xs text-foreground leading-none ml-1.5">
                                        UDX
                                    </span>
                                    <span className="text-[8px] font-bold text-muted-foreground leading-none uppercase mt-0.5 ml-1.5 tracking-wider">
                                        UI Kit
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Navigation - Desktop */}
                <motion.div
                    className="hidden md:flex h-10 items-center rounded-full border border-border px-1 shrink-0" // Standard border
                    role="navigation"
                >
                    <nav className="flex items-center">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition" // Simplified hover
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </motion.div>

                {/* Actions */}
                <motion.div
                    className="h-10 flex items-center px-1 gap-1 rounded-full border border-border shrink-0"
                >
                    <ThemeTrigger progress={progress} />

                    <Button className="hidden md:flex h-8 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm shrink-0">
                        Get Access
                    </Button>

                    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden w-8 h-8 shrink-0" aria-label="Open menu">
                                <Menu className="w-4 h-4" aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="w-full h-full border-none bg-background/95 backdrop-blur-md pt-16" aria-describedby="menu-description"> {/* Reduced blur and padding */}
                            <VisuallyHidden.Root>
                                <SheetTitle>Menu</SheetTitle>
                            </VisuallyHidden.Root>
                            <div className="flex flex-col items-center gap-6 px-6" id="menu-description">
                                <div className="flex flex-col items-center gap-4 w-full">
                                    {navItems.map(item => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="text-2xl font-medium w-full text-center py-2 active:bg-accent rounded-lg transition-colors" // Simplified mobile nav
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="w-8 h-px bg-border" />
                                <Button className="w-full max-w-sm h-10 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white">
                                    Get Access Now
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </motion.div>
            </motion.div>
        </div>
    );
}
