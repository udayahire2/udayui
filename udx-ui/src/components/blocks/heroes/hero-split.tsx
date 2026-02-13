"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    primaryAction?: string;
    secondaryAction?: string;
}

export function Hero02({
    title = "Transform Your Workflow",
    subtitle = "The complete platform for building and scaling your SaaS business. Automated, secure, and developer-friendly.",
    primaryAction = "Start Building",
    secondaryAction = "Documentation",
}: HeroSectionProps) {
    const containerRef = useRef<HTMLElement>(null);
    const bgRef = useRef<SVGSVGElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Motion System Integration
    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
        if (!bgRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // --------------------------------------------------------
            // 1. TEMPORAL VARIATION (Layered Time)
            // --------------------------------------------------------

            // Layer 1: Primary Curves (The Drift)
            // Long, sine-based linear drift. Feels like a deep current.
            const primaryTimeline = gsap.to(".layer-primary", {
                x: -40,
                duration: 80, // Extended duration
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            // Layer 2: Secondary Curves (The Variation)
            // Shorter, asymmetric easing. Adds "life".
            const secondaryTimeline = gsap.to(".layer-secondary", {
                y: -15,
                duration: 45,
                ease: "power1.inOut", // Slight acceleration bias
                yoyo: true,
                repeat: -1,
                stagger: {
                    amount: 8,
                    from: "random"
                }
            });

            // --------------------------------------------------------
            // 2. SCROLL OWNERSHIP (GSAP is Truth)
            // --------------------------------------------------------

            // Parallax for Content (Foreground)
            gsap.to(contentRef.current, {
                y: 120, // Moves slower than scroll speed
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // Parallax for Background (Deep Space)
            gsap.to(bgRef.current, {
                y: 50, // Moves very slowly
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // --------------------------------------------------------
            // 3. STATE AWARENESS (Motion Decay)
            // --------------------------------------------------------

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                onLeave: () => {
                    // Decay motion when user leaves the hero area
                    // "If everything moves, nothing feels intentional"
                    gsap.to([primaryTimeline, secondaryTimeline], { timeScale: 0.1, duration: 2 });
                },
                onEnterBack: () => {
                    // Restore motion when re-entering
                    gsap.to([primaryTimeline, secondaryTimeline], { timeScale: 1, duration: 1 });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // --------------------------------------------------------
    // 4. CONTENT ENTRANCE (Framer Motion Hierarchy)
    // --------------------------------------------------------

    // "Engineered" easing: No bounce, calm arrival.
    const transitionBase = { duration: 1.2 };

    const sequence = {
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
            className="relative flex min-h-[95vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-foreground sm:px-12 selection:bg-primary/10 perspective-[1000px]"
        >

            {/* 📐 SVG Environment */}
            <div
                className="absolute inset-0 z-0 pointer-events-none dark:mix-blend-screen"
            >
                <svg
                    ref={bgRef}
                    className="h-full w-full"
                    viewBox="0 0 1440 900"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Layer 1: ANCHOR LAYER (Absolute Stillness) */}
                    {/* Visual grounding. Mathematical reference points. Never moves. */}
                    <g className="layer-anchor opacity-10 dark:opacity-20">
                        {/* Horizontal horizon line */}
                        <line x1="0" y1="450" x2="1440" y2="450" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
                        {/* Vertical reference lines */}
                        <line x1="360" y1="0" x2="360" y2="900" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                        <line x1="1080" y1="0" x2="1080" y2="900" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                        {/* Technical markers / Crosshairs */}
                        <path d="M 350 450 L 370 450 M 360 440 L 360 460" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M 1070 450 L 1090 450 M 1080 440 L 1080 460" stroke="currentColor" strokeWidth="0.5" />
                    </g>

                    {/* Layer 2: FLOW LAYER (Primary Structure) */}
                    {/* Long continuous curves. Defines direction. Readable at a glance. */}
                    <path
                        className="layer-primary stroke-foreground/15 dark:stroke-foreground/10"
                        d="M -200 650 C 300 650, 600 500, 1000 550 S 1600 600, 2000 500"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />
                    <path
                        className="layer-primary stroke-foreground/15 dark:stroke-foreground/10"
                        d="M -200 350 C 400 350, 700 450, 1100 400 S 1700 300, 2000 400"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                    />

                    {/* Layer 3: DETAIL LAYER (Secondary Information) */}
                    {/* Dashed lines, offsets. Complexity without noise. */}
                    <path
                        className="layer-secondary stroke-foreground/10 dark:stroke-foreground/5"
                        d="M -200 670 C 300 670, 600 520, 1000 570 S 1600 620, 2000 520"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeDasharray="6 6"
                        fill="none"
                    />
                    <path
                        className="layer-secondary stroke-foreground/10 dark:stroke-foreground/5"
                        d="M -200 330 C 400 330, 700 430, 1100 380 S 1700 280, 2000 380"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeDasharray="6 6"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Content Layer */}
            <motion.div
                ref={contentRef}
                className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-8"
                initial="hidden"
                animate="visible"
            >

                {/* Headline */}
                <motion.h1
                    className="text-5xl font-medium tracking-tight text-foreground/90 sm:text-7xl md:leading-[1.1] sm:tracking-[-0.02em]"
                >
                    {title}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="max-w-xl text-lg text-muted-foreground sm:text-lg leading-relaxed antialiased font-light"
                >
                    {subtitle}
                </motion.p>

                {/* Actions */}
                <motion.div
                    
                    className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        size="lg"
                        className="h-11 min-w-[140px] rounded-md bg-foreground text-background hover:bg-foreground/90 font-medium text-sm tracking-normal transition-all active:translate-y-px"
                    >
                        {primaryAction}
                    </Button>

                    <Button
                        size="lg"
                        variant="ghost"
                        className="h-11 min-w-[140px] rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/10 text-sm tracking-normal transition-colors border border-transparent hover:border-border"
                    >
                        <CommandLineIcon className="mr-2 h-3.5 w-3.5" />
                        {secondaryAction}
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
