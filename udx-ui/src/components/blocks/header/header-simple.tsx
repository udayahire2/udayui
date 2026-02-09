"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { UDXLogo } from "@/components/ui/udx-logo";

const navItems = [
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
];

export function HeaderSimple() {
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
                    ? "h-14 bg-background/95 backdrop-blur-md border-b shadow-sm"
                    : "h-16 bg-background/70 backdrop-blur-sm border-b border-transparent"
                    }`}
            >
                <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo */}
                        <a
                            href="#"
                            className="flex items-center gap-2 -ml-1 group"
                        >
                            <div className="p-1 transition-transform duration-200 group-hover:scale-105">
                                <UDXLogo className="w-6 h-6 text-foreground" />
                            </div>
                            <span className="text-[15px] font-semibold tracking-tight">UDX UI</span>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-4 text-[14px] font-medium"
                            >
                                Log in
                            </Button>
                            <Button
                                size="sm"
                                className="h-9 px-4 text-[14px] font-medium rounded-full"
                            >
                                Sign up
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex md:hidden items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                aria-label="Menu"
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                            >
                                {isMobileOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Simple Mobile Menu */}
            {isMobileOpen && (
                <div className="fixed inset-0 top-14 z-40 md:hidden bg-background">
                    <div className="flex flex-col p-6 space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="pt-4 flex flex-col gap-3">
                            <Button className="w-full rounded-full" size="lg">Sign up</Button>
                            <Button variant="outline" className="w-full rounded-full" size="lg">Log in</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
