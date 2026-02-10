"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StarIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";

const BlinkingStars = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [stars, setStars] = useState<
        { x: number; y: number; s: number }[]
    >([]);

    useEffect(() => {
        const starCount = 50;
        setStars(
            Array.from({ length: starCount }).map(() => ({
                x: Math.random() * 100,
                y: Math.random() * 100,
                s: Math.random() * 2 + 1,
            }))
        );
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".star").forEach((star) => {
                gsap.to(star, {
                    opacity: gsap.utils.random(0.2, 0.6),
                    duration: gsap.utils.random(1.5, 3),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: gsap.utils.random(0, 2),
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-[1] pointer-events-none"
        >
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="star absolute bg-white rounded-full opacity-0 will-change-opacity"
                    style={{
                        top: `${star.y}%`,
                        left: `${star.x}%`,
                        width: `${star.s}px`,
                        height: `${star.s}px`,
                    }}
                />
            ))}
        </div>
    );
};


const TextReveal = ({
    children,
    className,
    delay = 0,
}: {
    children: string;
    className?: string;
    delay?: number;
}) => {
    const elRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        if (!elRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const ctx = gsap.context(() => {
            const chars = elRef.current!.querySelectorAll(".reveal-char");

            if (prefersReducedMotion) {
                gsap.set(chars, { y: "0%" });
                return;
            }

            gsap.fromTo(
                chars,
                { y: "110%" },
                {
                    y: "0%",
                    duration: 0.9,
                    ease: "power3.out",
                    stagger: 0.03,
                    delay,
                }
            );
        }, elRef);

        return () => ctx.revert();
    }, [delay]);

    return (
        <span
            ref={elRef}
            className={`inline-block whitespace-pre ${className}`}
        >
            {children.split("").map((char, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom h-[1.1em]"
                >
                    <span className="inline-block reveal-char will-change-transform">
                        {char === " " ? "\u00A0" : char}
                    </span>
                </span>
            ))}
        </span>
    );
};


export default function HeroModernGrid() {
    return (
        <section className="relative w-full min-h-[850px] flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] text-white py-24 px-4 border-b border-white/[0.08]">
            {/* Background Grid */}
            <div className="absolute inset-0 z-0">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="base-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0B0B0B" />
                            <stop offset="100%" stopColor="#000000" />
                        </linearGradient>

                        <pattern
                            id="macro-grid"
                            width="380"
                            height="380"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M380 0L0 0L0 380"
                                fill="none"
                                stroke="white"
                                strokeWidth="1"
                                strokeOpacity="0.05"
                            />
                        </pattern>

                        <linearGradient id="diagonal-shadow" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                        </linearGradient>

                        <radialGradient id="vignette" cx="50%" cy="50%" r="80%">
                            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
                        </radialGradient>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#base-gradient)" />
                    <rect width="100%" height="100%" fill="url(#macro-grid)" />
                    <rect width="100%" height="100%" fill="url(#diagonal-shadow)" />
                    <rect width="100%" height="100%" fill="url(#vignette)" />
                </svg>
            </div>

            {/* Blinking Stars */}
            <BlinkingStars />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto text-center space-y-8">
                {/* Social Proof / Trust Badge */}
                <div className="flex  items-center gap-3 animate-fade-in-up">
                    <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                            <Avatar key={i} className="w-10 h-10 border-2 border-black/50 ring-2 ring-white/10">
                                <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                                <AvatarFallback>U{i}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                    <div className="flex-col items-center gap-1.5 pt-1">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} className="w-3.5 h-3.5 fill-white text-white" />
                            ))}
                        </div>
                        <span className="text-xs font-medium text-white/60 tracking-wide">
                            100+ happy partner
                        </span>
                    </div>
                </div>

                {/* Hero Title */}
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-medium tracking-tight leading-[1.1]">
                    <TextReveal delay={0.2}>Build</TextReveal> <span className="italic font-normal font-serif"><TextReveal delay={0.3}>Faster</TextReveal></span>. <TextReveal delay={0.4}>Ship</TextReveal> <TextReveal delay={0.5}>Smarter.</TextReveal> <br className="hidden md:block" />
                    <TextReveal delay={0.6}>Scale</TextReveal> <TextReveal delay={0.7}>Confidently.</TextReveal>
                </h1>

                {/* Subtitle */}
                <p className="max-w-2xl text-lg sm:text-xl text-white/60 font-light leading-relaxed animate-fade-in-up delay-200">
                    An all-in-one SaaS platform to manage projects, collaborate with your team, and
                    track progress without the chaos.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 animate-fade-in-up delay-300">
                    <Button
                        variant="ghost"
                        className="h-12 px-8 text-base font-normal text-white/70 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white border border-white/[0.1] rounded-full transition-all duration-300"
                    >
                        Get Started Free
                    </Button>
                    <Button
                        className="h-12 px-8 text-base font-medium text-black bg-white hover:bg-white/90 rounded-full transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                    >
                        View Live Demo
                    </Button>
                </div>
            </div>
        </section>
    );
}
