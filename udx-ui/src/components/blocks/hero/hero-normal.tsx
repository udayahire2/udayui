"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export function HeroNormal() {
    const containerRef = useRef<HTMLElement>(null);
    const bgRef = useRef<SVGSVGElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
        if (!bgRef.current || !containerRef.current) return;

        const ctx = gsap.context(() => {
            const primaryTimeline = gsap.to(".layer-primary", {
                x: -40,
                duration: 80,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });

            const secondaryTimeline = gsap.to(".layer-secondary", {
                y: -15,
                duration: 45,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                stagger: { amount: 8, from: "random" }
            });

            gsap.to(contentRef.current, {
                y: 120,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

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

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                onLeave: () => {
                    gsap.to([primaryTimeline, secondaryTimeline], { timeScale: 0.1, duration: 2 });
                },
                onEnterBack: () => {
                    gsap.to([primaryTimeline, secondaryTimeline], { timeScale: 1, duration: 1 });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const transitionBase = { duration: 1.2 };

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-foreground sm:px-12 selection:bg-primary/10 perspective-[1000px]"
        >
            <div className="absolute inset-0 z-0 pointer-events-none dark:mix-blend-screen opacity-60">
                <svg
                    ref={bgRef}
                    className="h-full w-full"
                    viewBox="0 0 1440 900"
                    fill="none"
                >
                    <g className="layer-anchor opacity-10 dark:opacity-20">
                        <line x1="0" y1="450" x2="1440" y2="450" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
                        <line x1="360" y1="0" x2="360" y2="900" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                        <line x1="1080" y1="0" x2="1080" y2="900" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                    </g>

                    <path
                        className="layer-primary stroke-foreground/15 dark:stroke-foreground/10"
                        d="M -200 650 C 300 650, 600 500, 1000 550 S 1600 600, 2000 500"
                        stroke="currentColor" strokeWidth="1" fill="none"
                    />
                    <path
                        className="layer-secondary stroke-foreground/10 dark:stroke-foreground/5"
                        d="M -200 670 C 300 670, 600 520, 1000 570 S 1600 620, 2000 520"
                        stroke="currentColor" strokeWidth="0.5" strokeDasharray="6 6" fill="none"
                    />
                </svg>
            </div>

            <motion.div
                ref={contentRef}
                className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-8"
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-5xl font-medium tracking-tight text-foreground/90 sm:text-7xl md:leading-[1.1] sm:tracking-[-0.02em]"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0, transition: { ...transitionBase, duration: 1.4, delay: 0.2 } }}
                >
                    Transform Your Workflow
                </motion.h1>

                <motion.p
                    className="max-w-xl text-lg text-muted-foreground sm:text-lg leading-relaxed antialiased font-light"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0, transition: { ...transitionBase, delay: 0.4 } }}
                >
                    The complete platform for building and scaling your SaaS business. Automated, secure, and developer-friendly.
                </motion.p>

                <motion.div
                    className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { ...transitionBase, delay: 0.6 } }}
                >
                    <Button size="lg" className="h-11 min-w-[140px] font-medium text-sm">
                        Start Building
                    </Button>

                    <Button size="lg" variant="ghost" className="h-11 min-w-[140px] text-muted-foreground hover:text-foreground">
                        <Terminal className="mr-2 h-3.5 w-3.5" />
                        Documentation
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
