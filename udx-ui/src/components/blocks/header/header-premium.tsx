"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { UDXLogo } from "@/components/ui/udx-logo";

const navItems = [
    {
        name: "Products",
        href: "#products",
        badge: "New"
    },
    { name: "Solutions", href: "#solutions" },
    { name: "Resources", href: "#resources" },
    { name: "Enterprise", href: "#enterprise" },
];

export function HeaderPremium() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-4 z-50 w-full max-w-[95%] mx-auto rounded-2xl transition-all duration-500 ease-out border ${isScrolled
                    ? "bg-background/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] translate-y-0"
                    : "bg-background/40 backdrop-blur-lg border-white/5 shadow-none translate-y-2"
                    }`}
            >
                <div className="px-5 h-14 md:h-16 flex items-center justify-between relative overflow-hidden rounded-2xl">
                    {/* Ambient Glow Effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />

                    {/* Logo Area */}
                    <a href="/" className="flex items-center gap-3 group relative z-10">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all duration-500" />
                            <div className="relative p-1.5 rounded-xl bg-background/50 border border-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                                <UDXLogo className="w-5 h-5 text-foreground" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight text-foreground leading-none">UDX</span>
                        </div>
                    </a>

                    {/* Desktop Center Navigation */}
                    <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="group relative px-4 py-2 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <span className="relative z-10 flex items-center gap-1.5">
                                    {item.name}
                                    {item.badge && (
                                        <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-primary/10 text-primary rounded-full border border-primary/20">
                                            {item.badge}
                                        </span>
                                    )}
                                </span>
                                <span className="absolute inset-0 bg-muted/50 rounded-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                            </a>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-4 relative z-10">
                        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Log in
                        </a>
                        <Button className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_-3px_rgba(var(--primary),0.4)] transition-all hover:shadow-[0_0_20px_-3px_rgba(var(--primary),0.6)] hover:scale-105">
                            <span className="flex items-center gap-2">
                                Get Started <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden relative z-10">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Premium Mobile Menu Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-3xl animate-in fade-in duration-300 md:hidden">
                    <div className="flex flex-col h-full pt-28 px-6 pb-10">
                        <div className="flex flex-col gap-2">
                            {navItems.map((item, idx) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center justify-between p-4 rounded-2xl hover:bg-muted/50 transition-all border border-transparent hover:border-white/10"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <span className="text-xl font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                                        {item.name}
                                    </span>
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                </a>
                            ))}
                        </div>

                        <div className="mt-auto flex flex-col gap-3">
                            <Button className="w-full h-12 text-base rounded-xl shadow-lg shadow-primary/20">
                                Start Free Trial
                            </Button>
                            <Button variant="outline" className="w-full h-12 text-base rounded-xl bg-background/50 border-white/10">
                                Existing Customer Login
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
