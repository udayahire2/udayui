"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, Check, ChevronRight, Copy, Users, Heart, Terminal, Window, PieChart, CreditCard, Settings, Search, Home } from "lucide-react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UDXLogo } from "@/components/ui/udx-logo";

const Counter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView || !ref.current) return;
        const node = ref.current;
        const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate(value) {
                node.textContent = prefix + value.toFixed(decimals) + suffix;
            },
        });
        return () => controls.stop();
    }, [value, isInView, decimals, prefix, suffix]);

    return <span ref={ref} />;
};

export function HeroCinematic() {
    const [copied, setCopied] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [2, -2]);
    const rotateY = useTransform(x, [-100, 100], [-2, 2]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((event.clientX - centerX) / 15);
        y.set((event.clientY - centerY) / 15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const copyCommand = () => {
        navigator.clipboard.writeText("npm install @udrx/ui");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative w-full overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
            {/* Background with Gradient */}
            <div className="absolute inset-0 z-0 bg-background">
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none opacity-30" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">

                    {/* Left Column */}
                    <div className="flex flex-col items-start gap-8 text-left">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Badge variant="outline" className="rounded-full px-4 py-1.5 text-sm border-border/50 bg-muted/20 text-muted-foreground backdrop-blur-sm cursor-pointer hover:bg-muted/40 transition-colors shadow-none font-normal">
                                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/80 animate-pulse" />
                                    v2.0 is now live: <span className="text-foreground ml-1 font-medium">See what's new</span> <ChevronRight className="ml-1 h-3 w-3 opacity-50" />
                                </Badge>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-7xl text-balance text-foreground leading-[1.1]"
                            >
                                Ship your next idea. <br className="hidden lg:block" />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">Overnight.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="max-w-xl text-lg text-muted-foreground leading-relaxed text-balance font-light tracking-wide"
                            >
                                The comprehensive UI kit for developers who want to stop building components and start shipping products.
                                Accessible, composable, and enterprise-ready.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                                Start Building Free
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-8 text-base hover:bg-muted/50 transition-all">
                                Live Demo <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>

                        {/* Trust Signals */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="flex items-center gap-6 pt-4 border-t border-border/50 w-full"
                        >
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-foreground">10k+</span>
                                <span className="text-sm text-muted-foreground">Downloads</span>
                            </div>
                            <div className="h-8 w-px bg-border/50" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-foreground">4.9/5</span>
                                <span className="text-sm text-muted-foreground">Rating</span>
                            </div>
                            <div className="h-8 w-px bg-border/50" />
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background" />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">Joined recently</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: 3D Interface */}
                    <div className="relative flex justify-center lg:justify-end perspective-[2000px]">
                        {/* 3D Container */}
                        <motion.div
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                            className="relative w-full max-w-2xl cursor-default"
                        >
                            <div className="relative flex h-[500px] w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl ring-1 ring-inset ring-white/10">

                                {/* Mockup Header */}
                                <header className="flex h-12 shrink-0 items-center justify-between border-b border-border/50 bg-muted/20 px-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                    </div>
                                </header>

                                <div className="flex flex-1 overflow-hidden">
                                    {/* Sidebar */}
                                    <div className="w-16 border-r border-border/50 bg-muted/10 flex flex-col items-center py-4 gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                                            <UDXLogo className="w-5 h-5" />
                                        </div>
                                        {[Home, BarChart2, Users, Settings].map((Icon, i) => (
                                            <div key={i} className="p-2 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 p-6 bg-background/50">
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="p-4 rounded-xl border border-border/50 bg-card/50 shadow-sm">
                                                <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
                                                <div className="text-2xl font-bold flex items-end gap-2">
                                                    <Counter value={12450} prefix="$" />
                                                    <span className="text-xs text-green-500 font-medium mb-1">+12%</span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-xl border border-border/50 bg-card/50 shadow-sm">
                                                <div className="text-sm text-muted-foreground mb-1">Active Users</div>
                                                <div className="text-2xl font-bold flex items-end gap-2">
                                                    <Counter value={2450} />
                                                    <span className="text-xs text-green-500 font-medium mb-1">+5%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mock Chart */}
                                        <div className="h-48 rounded-xl border border-border/50 bg-card/30 p-4 relative overflow-hidden flex items-end gap-2">
                                            {[30, 50, 45, 70, 60, 80, 55, 90, 75, 60, 85, 95].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    transition={{ duration: 1, delay: i * 0.05 }}
                                                    className="flex-1 bg-primary/20 rounded-sm hover:bg-primary/40 transition-colors"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
