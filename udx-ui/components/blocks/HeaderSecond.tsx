"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Command, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

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

    // --- Animation Hooks ---

    // 1. GAP: Desktop 24px->0px | Mobile 12px->0px
    // We can't easily conditionalize hooks based on window size without re-render, 
    // but we can use CSS media queries for initial layout and motion for the dynamic part.
    // Ideally, useTransform with a smaller start value would be nicer, but let's stick to a safe 24px max for now
    // and handle mobile spacing via class suppression if needed.
    // Actually, let's keep the gap dynamic but aggressive.

    const gapRaw = useTransform(scrollY, [0, 80], [24, 0]);
    const gap = useSpring(gapRaw, { stiffness: 300, damping: 30 });

    // 2. CONTAINER PADDING
    const paddingRaw = useTransform(scrollY, [0, 80], [0, 6]);
    const padding = useSpring(paddingRaw, { stiffness: 300, damping: 30 });

    // 3. CONTAINER BACKGROUND
    const bgOpacity = useTransform(scrollY, [60, 100], [0, 1]);
    const blurValue = useTransform(scrollY, [60, 100], [0, 16]);

    // 4. ITEM TRANSFORMS
    const itemBorderOpacity = useTransform(scrollY, [0, 50], [1, 0]);
    const itemBgOpacity = useTransform(scrollY, [0, 50], [1, 0]);

    // 5. LOGO TEXT WIDTH
    const logoTextScale = useTransform(scrollY, [0, 50], [1, 0]);
    const logoTextOpacity = useTransform(scrollY, [0, 30], [1, 0]);
    const logoTextWidth = useTransform(scrollY, [0, 50], ["auto", "0px"]);

    // 6. MAIN CONTAINER STYLES
    const containerBg = useMotionTemplate`rgba(${theme === 'dark' ? '0,0,0' : '255,255,255'}, ${bgOpacity})`;
    const containerBorder = useMotionTemplate`rgba(${theme === 'dark' ? '255,255,255' : '0,0,0'}, ${useTransform(scrollY, [60, 80], [0, 0.1])})`;
    const containerShadow = useMotionTemplate`0 10px 40px -10px rgba(0,0,0,${useTransform(scrollY, [60, 100], [0, 0.1])})`;

    // Item Styles
    const itemBg = useMotionTemplate`rgba(${theme === 'dark' ? '0,0,0' : '255,255,255'}, ${itemBgOpacity})`;
    const itemBorder = useMotionTemplate`rgba(${theme === 'dark' ? '255,255,255' : '0,0,0'}, ${useTransform(itemBorderOpacity, v => v * 0.1)})`;

    return (
        <div className="fixed inset-x-0 top-6 z-50 flex justify-center pointer-events-none px-4 md:px-0">
            {/* Added padding x for mobile safety */}

            <motion.div
                style={{
                    gap: gap,
                    padding: padding,
                    background: containerBg,
                    backdropFilter: useMotionTemplate`blur(${blurValue}px)`,
                    borderRadius: "9999px",
                    borderWidth: "1px",
                    borderColor: containerBorder,
                    boxShadow: containerShadow,
                }}
                className="flex items-center pointer-events-auto overflow-hidden transition-colors max-w-full"
            >
                {/* --- ISLAND 1: LOGO --- */}
                <motion.div
                    style={{
                        backgroundColor: itemBg,
                        borderColor: itemBorder,
                    }}
                    className="h-12 flex items-center px-2 rounded-full border shadow-sm shrink-0 overflow-hidden"
                >
                    <div className="flex items-center gap-3 cursor-pointer group px-3">
                        <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center rounded-md shrink-0">
                            <Command className="w-3 h-3" />
                        </div>
                        <motion.div
                            style={{
                                opacity: logoTextOpacity,
                                width: logoTextWidth,
                                scale: logoTextScale,
                                transformOrigin: "left center"
                            }}
                            className="overflow-hidden flex items-center whitespace-nowrap"
                        >
                            <span className="font-bold text-sm tracking-tight">
                                UDX <span className="text-muted-foreground font-normal">LABS</span>
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* --- ISLAND 2: NAVIGATION (DESKTOP ONLY) --- */}
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
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="w-9 h-9 rounded-full shrink-0"
                    >
                        <div className="w-4 h-4 rounded-full border border-current opacity-50" />
                    </Button>

                    <Button className="hidden md:flex h-9 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 shrink-0">
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

                            {/* Mobile Menu Content - Staggered entrance could go here */}
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