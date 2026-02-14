"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HeroMinimal() {
    // Animation variants following UIUX best practices
    // Using staggered entrance with calm, professional timing
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth, professional feel
            },
        },
    };

    return (
        <section className="relative w-full py-20 lg:py-32 bg-background flex flex-col items-center text-center px-4 overflow-hidden">
            {/* Minimal SVG Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Subtle Grid Pattern */}
                    <defs>
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.5"
                                className="text-border/30"
                            />
                        </pattern>

                        {/* Gradient Definitions */}
                        <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </radialGradient>

                        <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Grid Background */}
                    <rect width="100%" height="100%" fill="url(#grid)" />

                    {/* Animated Gradient Orbs */}
                    <motion.circle
                        cx="20%"
                        cy="30%"
                        r="200"
                        fill="url(#gradient1)"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: [0.8, 1.2, 0.8],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.circle
                        cx="80%"
                        cy="70%"
                        r="250"
                        fill="url(#gradient2)"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />

                    {/* Subtle Top Accent Line */}
                    <line
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="0"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-border/50"
                    />
                </svg>
            </div>

            <motion.div
                className="max-w-3xl space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Avatar Group - Social Proof */}
                <motion.div
                    className="flex align-center justify-center items-center gap-3"
                    variants={itemVariants}
                >
                    <div className="flex -space-x-3">
                        {[
                            { src: "https://i.pravatar.cc/100?img=1", fallback: "A" },
                            { src: "https://i.pravatar.cc/100?img=2", fallback: "B" },
                            { src: "https://i.pravatar.cc/100?img=3", fallback: "C" },
                            { src: "https://i.pravatar.cc/100?img=4", fallback: "D" },
                            { src: "https://i.pravatar.cc/100?img=5", fallback: "E" },
                        ].map((avatar, index) => (
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

                {/* Headline with staggered animation */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground"
                    variants={itemVariants}
                >
                    Build software faster <br className="hidden sm:block" />
                    <span className="text-muted-foreground">with less friction.</span>
                </motion.h1>

                {/* Subtitle with delayed entrance */}
                <motion.p
                    className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                    variants={itemVariants}
                >
                    The essential UI kit for modern web applications.
                    Focus on your product logic while we handle the pixels.
                </motion.p>

                {/* CTA buttons with final entrance */}
                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    variants={itemVariants}
                >
                    <Button
                        size="lg"
                        className="h-12 px-8 text-base transition-transform hover: active:scale-95"
                    >
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-8 text-base group transition-transform hover:scale-105 active:scale-95"
                    >
                        View Documentation
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
