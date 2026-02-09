"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import { UDXLogo } from "@/components/ui/udx-logo";

const navItems = [
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
    { name: "Company", href: "#company" },
];

export function HeaderNormal() {
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
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                    ? "h-16 bg-background/80 backdrop-blur-xl border-b shadow-sm"
                    : "h-[72px] bg-background/60 backdrop-blur-md border-b border-border/40"
                    }`}
            >
                <div className="h-full max-w-[1400px] mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-full gap-8">
                        {/* Logo */}
                        <a
                            href="/"
                            className="flex items-center gap-2.5 group shrink-0"
                        >
                            <div className="p-1.5 rounded-lg bg-primary/10 transition-all duration-200 group-hover:bg-primary/20">
                                <UDXLogo className="w-6 h-6 text-foreground" />
                            </div>
                            <span className="text-[16px] font-bold tracking-tight">UDX UI</span>
                        </a>

                        {/* Desktop Navigation - Centered with Pill Background */}
                        <nav className="hidden lg:flex items-center gap-1 p-1 bg-muted/30 rounded-full border border-border/40">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-background rounded-full transition-all duration-200"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-3 shrink-0">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-muted-foreground hover:text-foreground"
                                aria-label="Search"
                            >
                                <Search className="w-[18px] h-[18px]" />
                            </Button>
                            <div className="h-5 w-px bg-border/50" />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 text-[13px] font-medium"
                            >
                                Sign In
                            </Button>
                            <Button
                                size="sm"
                                className="h-9 px-4 text-[13px] font-medium shadow-sm hover:shadow-md transition-shadow"
                            >
                                Get Started
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex lg:hidden items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                aria-label="Menu"
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                            >
                                {isMobileOpen ? (
                                    <X className="w-[18px] h-[18px]" />
                                ) : (
                                    <Menu className="w-[18px] h-[18px]" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div className="fixed inset-0 top-[72px] z-40 lg:hidden bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="container mx-auto px-6 py-8">
                        <div className="flex flex-col gap-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full h-11 pl-10 pr-4 text-sm bg-muted/40 border border-border/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20"
                                />
                            </div>

                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className="px-4 py-3 text-[16px] font-medium text-foreground hover:bg-muted/30 rounded-xl transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </nav>

                            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border/50">
                                <Button
                                    variant="outline"
                                    className="h-11 text-[15px]"
                                >
                                    Sign In
                                </Button>
                                <Button
                                    className="h-11 text-[15px]"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
