"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useReducedMotion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Bars3Icon, ChevronDownIcon, ArrowRightIcon, Squares2X2Icon, CpuChipIcon, GlobeAltIcon, BoltIcon, ShieldCheckIcon, UsersIcon, CommandLineIcon } from "@heroicons/react/24/outline";
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
const ThemeTrigger = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const playSound = useSound(AUDIO_FILE_PATH);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-none shrink-0 relative overflow-hidden group hover:bg-muted/50 transition-colors"
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
            className="w-10 h-10 rounded-none shrink-0 relative overflow-hidden group hover:bg-muted/50 transition-colors"
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

                    {/* Sun Rays */}
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
                </svg>

                {/* Moon Crater */}
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

// --- Nav Data with Mega Menu Structure ---
const navItems = [
    {
        name: "Products",
        href: "#",
        megaMenu: [
            {
                title: "Platform",
                items: [
                    { name: "Core Engine", desc: "High-performance processing power.", icon: Cpu },
                    { name: "Global Mesh", desc: "Distributed edge network.", icon: Globe },
                    { name: "Security", desc: "Enterprise-grade protection.", icon: Shield }
                ]
            },
            {
                title: "Solutions",
                items: [
                    { name: "Analytics", desc: "Real-time data insights.", icon: Layers },
                    { name: "Automation", desc: "Workflow optimization.", icon: Zap },
                    { name: "Collaboration", desc: "Team sync tools.", icon: Users }
                ]
            },
            {
                title: "Resources",
                items: [
                    { name: "Documentation", desc: "Guides and references.", icon: Command },
                    { name: "API Reference", desc: "Complete endpoints.", icon: MoveRight },
                    { name: "Community", desc: "Forums and support.", icon: Users }
                ]
            }
        ]
    },
    {
        name: "Solutions",
        href: "#",
        megaMenu: [
            {
                title: "Use Cases",
                items: [
                    { name: "Startups", desc: "Scale fast with us.", icon: Zap },
                    { name: "Enterprise", desc: "Security and control.", icon: Shield },
                    { name: "Government", desc: "Compliant clouds.", icon: Globe }
                ]
            },
            {
                title: "By Industry",
                items: [
                    { name: "Finance", desc: "Low latency trading.", icon: Layers },
                    { name: "Healthcare", desc: "HIPAA compliant.", icon: Users },
                    { name: "E-commerce", desc: "High availability.", icon: Cpu }
                ]
            },
            {
                title: "Developers",
                items: [
                    { name: "Open Source", desc: "Contribute today.", icon: Command },
                    { name: "SDKs", desc: "Libraries for all langs.", icon: Layers },
                    { name: "Status", desc: "System uptime.", icon: Zap }
                ]
            }
        ]
    },
    { name: "Pricing", href: "#" },
    { name: "Enterprise", href: "#" },
];

export default function HeaderThird() {
    const { scrollY } = useScroll();
    const { theme, resolvedTheme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const [hoveredNav, setHoveredNav] = useState<string | null>(null);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

    const isDark = resolvedTheme === "dark" || theme === "dark";

    // Simplified Animation Hooks
    const scrollRaw = useTransform(scrollY, [0, 250], [0, 1]); // Increased range for smoother transition
    const scrollSpring = useSpring(scrollRaw, { stiffness: 250, damping: 25, mass: 0.5 });
    const progress = shouldReduceMotion ? scrollRaw : scrollSpring;

    // Transforms
    const gap = useTransform(progress, [0, 1], [16, 6]); // Keep some gap to prevent cramping
    const padding = useTransform(progress, [0, 1], [4, 12]); // Add padding when compact
    const yPosition = useTransform(progress, [0, 1], [0, 12]); // Slight move down to detach from top if desired, or keep 0

    // Visual styles
    const bgOpacity = useTransform(progress, [0.2, 1], [0, 0.8]); // Glass effect fade in
    const blurValue = useTransform(progress, [0.2, 1], [0, 16]); // Strong blur
    const borderOpacity = useTransform(progress, [0, 1], [0, 0.4]); // Fade in border
    const radius = useTransform(progress, [0, 1], [0, 24]); // Morph to pill/capsule

    const containerBg = useMotionTemplate`oklch(from var(--background) l c h / ${bgOpacity})`;
    const containerBorder = useMotionTemplate`oklch(from var(--foreground) l c h / ${borderOpacity})`;

    return (
        <div className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none px-4 md:px-0 pt-6"> {/* Added pt-6 for initial offset */}

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                    gap,
                    padding,
                    background: containerBg,
                    backdropFilter: useMotionTemplate`blur(${blurValue}px)`,
                    borderRadius: radius,
                    borderWidth: "1px",
                    borderColor: containerBorder,
                }}
                className="flex items-center pointer-events-auto overflow-visible transition-colors max-w-5xl px-1" // Increased max-width for mega menu
                role="banner"
                onMouseLeave={() => setHoveredNav(null)} // Close menu when leaving the header area
            >
                {/* Logo - Simplified hover */}
                <motion.div
                    className="h-10 flex items-center px-2 border border-border shrink-0 overflow-hidden bg-background/50 backdrop-blur-sm" // Added bg for contrast
                    onHoverStart={() => setIsLogoHovered(true)}
                    onHoverEnd={() => setIsLogoHovered(false)}
                >
                    <div className="flex items-center gap-1 cursor-pointer px-2">
                        <div className="flex items-center justify-center shrink-0">
                            <UDXLogo className="w-8 h-8 text-foreground" />
                        </div>

                        <AnimatePresence>
                            {isLogoHovered && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: "auto", opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ ease: "easeOut", duration: 0.15 }}
                                    className="overflow-hidden flex flex-col justify-center leading-none whitespace-nowrap"
                                >
                                    <span className="font-medium text-xs text-foreground leading-none ml-1">
                                        UDX
                                    </span>
                                    <span className="text-[8px] font-medium text-muted-foreground leading-none uppercase mt-0.5 ml-1">
                                        UI Kit
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Navigation - Desktop */}
                <motion.div
                    className="hidden md:flex h-10 items-center border border-border px-1 shrink-0 relative z-50 bg-background/50 backdrop-blur-sm" // Added bg for contrast
                    role="navigation"
                >
                    <nav className="flex items-center gap-1">
                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => setHoveredNav(item.name)}
                            >
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${hoveredNav === item.name
                                        ? "text-foreground bg-muted"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {item.name}
                                    {item.megaMenu && (
                                        <ChevronDownIcon
                                            className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredNav === item.name ? "rotate-180 text-foreground" : "text-muted-foreground"}`}
                                        />
                                    )}
                                </a>

                                {/* Mega Menu Dropdown */}
                                <AnimatePresence>
                                    {item.megaMenu && hoveredNav === item.name && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" }}
                                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, y: 8, scale: 0.98, filter: "blur(4px)" }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[48rem] p-6 border border-border/40 bg-background/95 backdrop-blur-3xl shadow-2xl overflow-hidden z-[100] origin-top-center rounded-xl"
                                            style={{
                                                backdropFilter: "blur(24px) saturate(200%)", // Enhanced glassy blur with saturation for vibrant effect
                                                WebkitBackdropFilter: "blur(24px) saturate(200%)", // For Safari compatibility
                                            }}
                                        >
                                            <div className="grid grid-cols-3 gap-6">
                                                {item.megaMenu.map((column, idx) => (
                                                    <div key={idx} className="flex flex-col gap-4 p-4 border border-border/20 rounded-lg bg-background/10 backdrop-blur-sm">
                                                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-2">
                                                            {column.title}
                                                        </h4>
                                                        <div className="flex flex-col gap-2">
                                                            {column.items.map((subItem) => (
                                                                <a
                                                                    key={subItem.name}
                                                                    href="#"
                                                                    className="group flex flex-col gap-1 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-200"
                                                                >
                                                                    <div className="flex items-center gap-3 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                                                        <subItem.icon className="w-5 h-5 opacity-80 group-hover:opacity-100" />
                                                                        {subItem.name}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground leading-relaxed pl-8">
                                                                        {subItem.desc}
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Decorative gradient overlay at bottom */}
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-purple-500/0 opacity-60" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>
                </motion.div>

                {/* Actions */}
                <motion.div
                    className="h-10 flex items-center px-1 gap-1 border border-border shrink-0 bg-background/50 backdrop-blur-sm" // Added bg for contrast
                >
                    <ThemeTrigger />

                    <Button className="hidden md:flex h-8 px-5 rounded-none bg-foreground text-background hover:bg-foreground/90 text-sm font-medium shrink-0 shadow-lg shadow-black/5 dark:shadow-white/5 transition-all hover:scale-[1.02] active:scale-[0.98]">
                        Start Building
                    </Button>

                    <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden w-8 h-8 shrink-0" aria-label="Open menu">
                                <Bars3Icon className="w-4 h-4" aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="top" className="w-full h-full border-none bg-background/95 backdrop-blur-3xl pt-20" aria-describedby="menu-description">
                            <VisuallyHidden.Root>
                                <SheetTitle>Menu</SheetTitle>
                            </VisuallyHidden.Root>
                            <div className="flex flex-col px-6 h-full overflow-hidden" id="menu-description">
                                <nav className="flex flex-col flex-1 overflow-y-auto pr-2 -mr-2">
                                    {navItems.map(item => (
                                        <MobileNavItem key={item.name} item={item} />
                                    ))}
                                </nav>
                                <div className="py-8 mt-auto border-t border-border/50">
                                    <Button className="w-full h-12 rounded-lg text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                        Start Building
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </motion.div>
            </motion.div>
        </div>
    );
}

// --- Mobile Nav Item Component ---
const MobileNavItem = ({ item }: { item: typeof navItems[0] }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border/40 last:border-0">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between py-4 cursor-pointer group select-none"
            >
                <a
                    href={item.href}
                    className="text-lg font-medium text-foreground group-hover:text-primary transition-colors"
                    onClick={(e) => {
                        if (item.megaMenu) {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }
                    }}
                >
                    {item.name}
                </a>
                {item.megaMenu && (
                    <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
                    />
                )}
            </div>

            <AnimatePresence>
                {isOpen && item.megaMenu && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pl-2 flex flex-col gap-6">
                            {item.megaMenu.map((group, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                    <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
                                        {group.title}
                                    </h5>
                                    <div className="flex flex-col gap-1">
                                        {group.items.map((sub) => (
                                            <a
                                                key={sub.name}
                                                href="#"
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                                                    <sub.icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-foreground">
                                                        {sub.name}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground leading-tight">
                                                        {sub.desc}
                                                    </span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};