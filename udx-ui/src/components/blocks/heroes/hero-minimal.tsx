"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useReducedMotion, Variants } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef } from "react";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================

interface AvatarData {
    src: string;
    fallback: string;
}

const AVATAR_DATA: AvatarData[] = [
    { src: "https://i.pravatar.cc/100?img=1", fallback: "A" },
    { src: "https://i.pravatar.cc/100?img=2", fallback: "B" },
    { src: "https://i.pravatar.cc/100?img=3", fallback: "C" },
    { src: "https://i.pravatar.cc/100?img=4", fallback: "D" },
    { src: "https://i.pravatar.cc/100?img=5", fallback: "E" },
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Architectural Blueprint Background
 * SVG-based grid pattern with subtle drift animation
 */
function ArchitecturalBackground({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1920 700"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                style={{
                    animation: prefersReducedMotion ? 'none' : 'drift 40s infinite linear',
                    willChange: prefersReducedMotion ? 'auto' : 'transform',
                }}
            >
                <defs>
                    <style>{`
                        @keyframes drift {
                            0% { transform: translate(0, 0); }
                            100% { transform: translate(30px, 20px); }
                        }
                        @media (prefers-reduced-motion: reduce) {
                            svg { animation: none !important; }
                        }
                    `}</style>
                </defs>

                {/* Main Vertical Dividers - Creates 3 main columns */}
                <line
                    x1="480"
                    y1="0"
                    x2="480"
                    y2="700"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.05]"
                />
                <line
                    x1="1440"
                    y1="0"
                    x2="1440"
                    y2="700"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.05]"
                />

                {/* Main Horizontal Dividers - Creates 3 main rows */}
                <line
                    x1="0"
                    y1="233"
                    x2="1920"
                    y2="233"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.05]"
                />
                <line
                    x1="0"
                    y1="467"
                    x2="1920"
                    y2="467"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.05]"
                />

                {/* Center Vertical Line - Subtle interior divider */}
                <line
                    x1="960"
                    y1="0"
                    x2="960"
                    y2="700"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.03]"
                />

                {/* Middle Horizontal Line - Subtle interior divider */}
                <line
                    x1="0"
                    y1="350"
                    x2="1920"
                    y2="350"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.03]"
                />

                {/* Optional Layout Container Frames - Left Side */}
                <rect
                    x="120"
                    y="120"
                    width="280"
                    height="180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="square"
                    rx="8"
                    className="text-foreground opacity-[0.04]"
                />

                {/* Optional Layout Container Frames - Right Side */}
                <rect
                    x="1520"
                    y="400"
                    width="280"
                    height="180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="square"
                    rx="8"
                    className="text-foreground opacity-[0.04]"
                />

                {/* Additional subtle accent lines for depth */}
                <line
                    x1="240"
                    y1="0"
                    x2="240"
                    y2="700"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.025]"
                />
                <line
                    x1="1680"
                    y1="0"
                    x2="1680"
                    y2="700"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeLinecap="square"
                    className="text-foreground opacity-[0.025]"
                />
            </svg>
        </div>
    );
}

/**
 * Social Proof Block
 * Avatar group with trust indicator
 */
function SocialProofBlock({ variants }: { variants: Variants }) {
    return (
        <motion.div
            className="flex flex-col items-center gap-3"
            variants={variants}
        >
            <div className="flex -space-x-3">
                {AVATAR_DATA.map((avatar, index) => (
                    <Avatar
                        key={index}
                        className="h-10 w-10 border-2 border-background ring-2 ring-border/50 transition-transform hover:scale-110 hover:z-10"
                    >
                        <AvatarImage src={avatar.src} alt={`User ${index + 1}`} />
                        <AvatarFallback>{avatar.fallback}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
            <p className="text-sm text-muted-foreground font-medium">
                Trusted by <span className="text-foreground font-semibold">2,000+</span> developers
            </p>
        </motion.div>
    );
}

/**
 * Hero Headline Block
 * Main H1 with emphasis styling
 */
function HeadlineBlock({ variants }: { variants: Variants }) {
    return (
        <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground"
            variants={variants}
        >
            Build software faster <br className="hidden sm:block" />
            <span className="text-muted-foreground">with less friction.</span>
        </motion.h1>
    );
}

/**
 * Hero Subtitle Block
 * Supporting description text
 */
function SubtitleBlock({ variants }: { variants: Variants }) {
    return (
        <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            variants={variants}
        >
            The essential UI kit for modern web applications.
            Focus on your product logic while we handle the pixels.
        </motion.p>
    );
}

/**
 * Call-to-Action Block
 * Primary and secondary action buttons with frosted glass effect
 */
function CTABlock({ variants }: { variants: Variants }) {
    return (
        <motion.div
            className="relative inline-flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            variants={variants}
        >
            {/* Frosted Glass Background Strip */}
            <div
                className="absolute inset-0 -m-6 rounded-2xl bg-background/40 backdrop-blur-md border border-border/20"
                style={{
                    WebkitBackdropFilter: "blur(12px)",
                }}
                aria-hidden="true"
            />

            {/* CTA Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 px-6 py-4">
                <Button
                    size="lg"
                >
                    Get Started
                </Button>
                <Button
                    size="lg"
                    variant="outline"
                    
                >
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </motion.div>
    );
}

// ============================================================================
// CUSTOM HOOKS
// ============================================================================

/**
 * Parallax Mouse Tracking Hook
 * Tracks pointer movement for subtle parallax effects (desktop only)
 */
function useParallaxTracking(
    containerRef: React.RefObject<HTMLElement | null>,
    prefersReducedMotion: boolean
) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        if (prefersReducedMotion) return;

        let rafId: number | null = null;

        const handlePointerMove = (e: PointerEvent) => {
            if (rafId !== null) return;

            rafId = requestAnimationFrame(() => {
                if (!containerRef.current) {
                    rafId = null;
                    return;
                }

                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Normalize to -1 to 1 range
                const normalizedX = (e.clientX - centerX) / (rect.width / 2);
                const normalizedY = (e.clientY - centerY) / (rect.height / 2);

                mouseX.set(normalizedX);
                mouseY.set(normalizedY);

                rafId = null;
            });
        };

        // Only enable on desktop (not mobile)
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        if (mediaQuery.matches) {
            window.addEventListener("pointermove", handlePointerMove);
        }

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, [mouseX, mouseY, prefersReducedMotion, containerRef]);

    return { mouseX, mouseY };
}

/**
 * Animation Variants Factory
 * Creates motion variants based on user's motion preferences
 */
function useAnimationVariants(prefersReducedMotion: boolean) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.15,
                delayChildren: prefersReducedMotion ? 0 : 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: prefersReducedMotion ? 0 : 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: prefersReducedMotion ? 0.2 : 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            },
        },
    };

    return { containerVariants, itemVariants };
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * HeroMinimal Component
 * 
 * A minimal hero section with:
 * - Architectural blueprint background
 * - Social proof avatars
 * - Headline and subtitle
 * - Primary and secondary CTAs
 * - Subtle parallax effects (desktop only)
 * - Respects prefers-reduced-motion
 */
export function HeroMinimal() {
    const prefersReducedMotion = useReducedMotion() ?? false;
    const containerRef = useRef<HTMLElement>(null);

    // Parallax tracking (currently not applied to any elements, but available for future use)
    const { mouseX, mouseY } = useParallaxTracking(containerRef, prefersReducedMotion);

    // Animation variants
    const { containerVariants, itemVariants } = useAnimationVariants(prefersReducedMotion);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[600px] py-20 lg:py-32 bg-background flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        >
            {/* Background Layer */}
            <ArchitecturalBackground prefersReducedMotion={prefersReducedMotion} />

            {/* Content Layer */}
            <motion.div
                className="relative z-10 max-w-3xl space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <SocialProofBlock variants={itemVariants} />
                <HeadlineBlock variants={itemVariants} />
                <SubtitleBlock variants={itemVariants} />
                <CTABlock variants={itemVariants} />
            </motion.div>
        </section>
    );
}
