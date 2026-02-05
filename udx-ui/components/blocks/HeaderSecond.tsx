"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Command } from "lucide-react";
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
const ThemeTrigger = () => {
    const { theme, setTheme } = useTheme();
    const playSound = useSound(AUDIO_FILE_PATH);
    // Actually, let's use a very simple synthesized sound or just rely on the placeholder.
    // The provided base64 is a placeholder; usually we'd want a real short 'click' mp3.
    // For now, assume it works.

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
                >
                    {/* Center Circle (Sun Body / Moon Body) */}
                    <motion.circle
                        cx="12"
                        cy="12"
                        initial={false}
                        animate={{
                            r: isDark ? 9 : 5 // Moon is larger, Sun is smaller
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />

                    {/* Sun Rays (Masked out in dark mode) */}
                    <motion.g
                        initial={false}
                        animate={{
                            opacity: isDark ? 0 : 1,
                            rotate: isDark ? 90 : 0,
                            scale: isDark ? 0.5 : 1
                        }}
                        transition={{ duration: 0.2 }}
                        style={{ originX: "12px", originY: "12px" }}
                    >
                        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </motion.g>

                    {/* Moon Mask (The "bite" taken out of the circle) */}
                    {/* In SVG masking is complex to animate perfectly in one go without masks. 
                    Simpler approach: Just use opacity fade for sun rays and radius change. 
                    For a true moon shape, we usually need a mask or path morph.
                    Let's stick to the radius change + ray hide which is a clean "Abstract" sun/moon.
                */}
                </svg>

                {/* Extra Moon Detail (Crater/Cutout) - Simplified specifically for "System" look */}
                <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-background rounded-full"
                    initial={false}
                    animate={{ scale: isDark ? 1 : 0 }}
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

export default function HeaderSecond() {
    const { scrollY } = useScroll();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const shouldReduceMotion = useReducedMotion();
    const [isLogoHovered, setIsLogoHovered] = useState(false);

    // --- Animation Hooks ---
    const scrollRaw = useTransform(scrollY, [0, 100], [0, 1]);
    const scrollSpring = useSpring(scrollRaw, {
        stiffness: 400,
        damping: 40,
        mass: 0.8
    });

    const progress = shouldReduceMotion ? scrollRaw : scrollSpring;

    // Layout Transforms
    const gap = useTransform(progress, [0, 1], [24, 0]);
    const padding = useTransform(progress, [0.4, 1], [0, 6]);

    // Visual Transforms
    const bgOpacity = useTransform(progress, [0.4, 1], [0, 1]);
    const blurValue = useTransform(progress, [0.4, 1], [0, 16]);
    const borderOpacity = useTransform(progress, [0.4, 1], [0, 0.08]);
    const shadowOpacity = useTransform(progress, [0.5, 1], [0, 0.08]);

    // Item Transforms
    const itemBorderAlpha = useTransform(progress, [0, 0.5], [1, 0]);
    const itemBgAlpha = useTransform(progress, [0, 0.5], [1, 0]);

    // Motion Templates
    const containerBg = useMotionTemplate`rgba(${theme === 'dark' ? '0,0,0' : '255,255,255'}, ${bgOpacity})`;
    const containerBorder = useMotionTemplate`rgba(${theme === 'dark' ? '255,255,255' : '0,0,0'}, ${borderOpacity})`;
    const containerShadow = useMotionTemplate`0 10px 40px -10px rgba(0,0,0,${shadowOpacity})`;

    const itemBg = useMotionTemplate`rgba(${theme === 'dark' ? '0,0,0' : '255,255,255'}, ${itemBgAlpha})`;
    const itemBorder = useMotionTemplate`rgba(${theme === 'dark' ? '255,255,255' : '0,0,0'}, ${useTransform(itemBorderAlpha, v => v * 0.1)})`;

    return (
        <div className="fixed inset-x-0 top-6 z-50 flex justify-center pointer-events-none px-4 md:px-0">

            <motion.div
                style={{
                    gap,
                    padding,
                    background: containerBg,
                    backdropFilter: useMotionTemplate`blur(${blurValue}px)`,
                    borderRadius: "9999px",
                    borderWidth: "1px",
                    borderColor: containerBorder,
                    boxShadow: containerShadow,
                }}
                className="flex items-center pointer-events-auto overflow-hidden transition-colors max-w-full will-change-transform"
            >
                {/* --- ISLAND 1: LOGO (DockBrand Style) --- */}
                <motion.div
                    style={{
                        backgroundColor: itemBg,
                        borderColor: itemBorder,
                    }}
                    className="h-12 flex items-center px-1 rounded-full border shadow-sm shrink-0 overflow-hidden"
                    onHoverStart={() => setIsLogoHovered(true)}
                    onHoverEnd={() => setIsLogoHovered(false)}
                >
                    <div className="flex items-center gap-2 cursor-pointer group px-3">
                        <div className="relative z-10 flex items-center justify-center">
                            <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center rounded-md shrink-0">
                                <Command className="w-3 h-3" />
                            </div>
                        </div>

                        <AnimatePresence>
                            {isLogoHovered && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ ease: "easeOut", duration: 0.2 }}
                                    className="overflow-hidden flex flex-col justify-center leading-none whitespace-nowrap"
                                >
                                    <span className="font-bold text-sm tracking-tight text-foreground leading-none ml-2">
                                        UDX
                                    </span>
                                    <span className="text-[9px] font-semibold tracking-[0.2em] text-muted-foreground leading-none uppercase mt-0.5 ml-2">
                                        UI Kit
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* --- ISLAND 2: NAVIGATION (DESKTOP) --- */}
                <motion.div
                    style={{
                        backgroundColor: itemBg,
                        borderColor: itemBorder,
                    }}
                    className="hidden md:flex h-12 items-center rounded-full border shadow-sm px-1.5 shrink-0"
                >
                    <nav className="flex items-center gap-0.5">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="relative px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all group"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>
                </motion.div>

                {/* --- ISLAND 3: ACTIONS --- */}
                <motion.div
                    style={{
                        backgroundColor: itemBg,
                        borderColor: itemBorder,
                    }}
                    className="h-12 flex items-center px-1.5 gap-2 rounded-full border shadow-sm shrink-0"
                >
                    <ThemeTrigger />

                    <Button className="hidden md:flex h-9 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-500/20 shrink-0">
                        Get Access
                    </Button>

                    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden w-9 h-9 shrink-0">
                                <Menu className="w-4 h-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="w-full h-full border-none bg-background/95 backdrop-blur-xl pt-20">
                            <VisuallyHidden.Root>
                                <SheetTitle>Menu</SheetTitle>
                            </VisuallyHidden.Root>
                            <div className="flex flex-col items-center gap-8 px-8">
                                <div className="flex flex-col items-center gap-6 w-full">
                                    {navItems.map(item => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="text-3xl font-light tracking-tight w-full text-center py-2 active:bg-accent rounded-xl transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="w-12 h-px bg-border" />
                                <Button className="w-full max-w-xs h-12 rounded-xl text-base shadow-xl bg-blue-600 hover:bg-blue-700 text-white">
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