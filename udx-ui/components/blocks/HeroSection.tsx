"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Terminal, Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    primaryAction?: string;
    secondaryAction?: string;
}

export function HeroSection({
    title = "Build faster with UDX UI",
    subtitle = "A collection of premium Shadcn-based blocks to accelerate your development workflow. Engineered for precision and scale.",
    primaryAction = "Get Started",
    secondaryAction = "Documentation",
}: HeroSectionProps) {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    const bgRef = useRef<SVGSVGElement>(null);

    // Scroll parallax for content
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]); // Foreground moves slightly faster
    const y2 = useTransform(scrollY, [0, 500], [0, 50]);  // Background moves slower

    // Background Motion System
    useEffect(() => {
        if (!bgRef.current) return;

        const ctx = gsap.context(() => {
            // Group 1: Primary Curves - Ultra slow drift (60s)
            gsap.to(".layer-primary", {
                x: -20,
                duration: 60,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Group 2: Secondary Curves - Phase shifted vertical sway (45s)
            gsap.to(".layer-secondary", {
                y: 15,
                duration: 45,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                stagger: {
                    amount: 10,
                    from: "random"
                }
            });

            // Group 3: Grid - Near static, very subtle breathing (30s)
            gsap.to(".layer-grid", {
                opacity: 0.4,
                duration: 30,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Interactive: Scroll coupling
            gsap.to(bgRef.current, {
                y: 50,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText("npm i udx-ui");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Motion Hierarchies - Engineered Entrance
    const transitionBase = { duration: 1.2, ease: [0.16, 1, 0.3, 1] }; // Engineered EaseOut

    const sequence = {
        badge: {
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { ...transitionBase, delay: 0.1 } }
        },
        headline: {
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { ...transitionBase, duration: 1.4, delay: 0.2 } }
        },
        subtitle: {
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { ...transitionBase, delay: 0.4 } }
        },
        actions: {
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0, transition: { ...transitionBase, delay: 0.6 } }
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-center text-white sm:px-12 selection:bg-white/20 perspective-[1000px]"
        >

            {/* 📐 System Background - Layered Logic */}
            <motion.div
                style={{ y: y2 }}
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] mix-blend-screen"
            >
                <svg
                    ref={bgRef}
                    className="h-full w-full"
                    viewBox="0 0 1440 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    {/* Layer 0: Static Grid foundation */}
                    <pattern id="grid-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.04" />
                    </pattern>
                    <rect className="layer-grid" width="100%" height="100%" fill="url(#grid-pattern)" opacity="0.3" />

                    {/* Layer 1: Primary Flow (Horizontal Emphasis) */}
                    <path className="layer-primary" d="M-100 250 C 300 250, 500 150, 720 200 S 1300 250, 1640 250" stroke="white" strokeWidth="1" strokeOpacity="0.08" fill="none" />
                    <path className="layer-primary" d="M-100 270 C 300 270, 520 170, 740 220 S 1320 270, 1640 270" stroke="white" strokeWidth="1" strokeOpacity="0.06" fill="none" />

                    <path className="layer-primary" d="M-100 700 C 400 700, 600 800, 720 750 S 1000 700, 1640 700" stroke="white" strokeWidth="1" strokeOpacity="0.08" fill="none" />
                    <path className="layer-primary" d="M-100 720 C 400 720, 620 820, 740 770 S 1020 720, 1640 720" stroke="white" strokeWidth="1" strokeOpacity="0.06" fill="none" />

                    {/* Layer 2: Secondary Flow (Vertical / Phase Emphasis) */}
                    <path className="layer-secondary" d="M-100 400 Q 720 300 1540 400" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="4 4" fill="none" />
                    <path className="layer-secondary" d="M-100 500 Q 720 600 1540 500" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="4 4" fill="none" />
                </svg>
            </motion.div>

            {/* Content Container */}
            <motion.div
                style={{ y: y1 }}
                className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-8"
                initial="hidden"
                animate="visible"
            >

                {/* 1. Badge - Metadata (Fastest) */}
                <motion.div variants={sequence.badge}>
                    <button
                        onClick={handleCopy}
                        className="group flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] pl-2.5 pr-4 py-1.5 transition-colors hover:bg-white/[0.05] hover:border-white/10"
                    >
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neutral-400"></span>
                            </span>
                            <span className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase">v3.0.0</span>
                        </div>
                        <div className="h-3 w-[1px] bg-white/5"></div>
                        <span className="font-mono text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">
                            npm i udx-ui
                        </span>
                        {copied ? (
                            <Check className="h-3 w-3 text-white" />
                        ) : (
                            <Copy className="h-3 w-3 text-neutral-600 transition-colors group-hover:text-neutral-400" />
                        )}
                    </button>
                </motion.div>

                {/* 2. Headline - Core Message (Slowest, confident) */}
                <motion.h1
                    variants={sequence.headline}
                    className="text-5xl font-medium tracking-tight text-white sm:text-7xl md:leading-[1.1] sm:tracking-[-0.02em]"
                >
                    {title}
                </motion.h1>

                {/* 3. Subtitle - Context (Soft) */}
                <motion.p
                    variants={sequence.subtitle}
                    className="max-w-xl text-lg text-neutral-400/80 sm:text-lg leading-relaxed antialiased"
                >
                    {subtitle}
                </motion.p>

                {/* 4. Actions - Utility (Last) */}
                <motion.div
                    variants={sequence.actions}
                    className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        size="lg"
                        className="h-11 min-w-[140px] rounded-md bg-white text-black hover:bg-neutral-200 font-medium text-sm tracking-wide transition-all active:translate-y-[1px]"
                    >
                        {primaryAction}
                    </Button>

                    <Button
                        size="lg"
                        variant="ghost"
                        className="h-11 min-w-[140px] rounded-md text-neutral-500 hover:text-white hover:bg-white/[0.04] text-sm tracking-wide transition-colors border border-transparent hover:border-white/5"
                    >
                        <Terminal className="mr-2 h-3.5 w-3.5" />
                        {secondaryAction}
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
