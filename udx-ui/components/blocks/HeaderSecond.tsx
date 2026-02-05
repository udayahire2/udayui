"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X, Command, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
    { name: "Docs", href: "#docs" },
    { name: "Figma", href: "#figma" },
    { name: "Roadmap", href: "#roadmap" },
];

export default function HeaderSecond() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <>
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] md:max-w-5xl"
            >
                <div className="mx-auto bg-[#0a0a0a] border border-white/10 rounded-full px-2 py-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.24)]">

                    {/* Left: Logo */}
                    <Link href="/" className="flex items-center gap-3 pl-3 pr-4 group">
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800 border border-white/10 group-hover:bg-neutral-700 transition-colors">
                            <div className="absolute inset-0 bg-white/5 rounded-lg"></div>
                            <Command className="w-4 h-4 text-white" />
                            {/* Dot for flavor */}
                            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full border border-[#0a0a0a]"></div>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="font-bold text-white tracking-tight text-[15px]">UDX</span>
                            <span className="text-[10px] text-neutral-400 font-medium tracking-wider uppercase">UI Kit</span>
                        </div>
                    </Link>

                    {/* Middle: Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1 pr-1">

                        {/* Desktop: SignIn */}
                        <Button
                            variant="ghost"
                            className="hidden md:inline-flex text-neutral-300 hover:text-white hover:bg-white/5 rounded-full px-5 h-10 font-medium"
                        >
                            SignIn
                        </Button>

                        {/* Mobile: SignIn (Inside pill in original design, but let's keep it here for now or distinct) 
                            Actually, the mobile design shows SignIn inside. We'll handle mobile layout shifts via utility classes.
                        */}
                        <Button
                            variant="ghost"
                            className="md:hidden inline-flex text-neutral-300 hover:text-white hover:bg-white/5 rounded-full px-4 h-9 font-medium text-sm"
                        >
                            SignIn
                        </Button>

                        {/* Get Started Button */}
                        <Button
                            className="bg-white hover:bg-neutral-200 text-black rounded-full px-6 h-10 font-medium transition-all shadow-lg shadow-white/5 mx-1"
                        >
                            Get Started
                        </Button>

                        {/* Theme Toggle Custom */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
                        >
                            <Sun className="w-5 h-5" />
                        </button>

                        {/* Mobile Hamburger */}
                        <div className="md:hidden pl-1 border-l border-white/10 ml-1">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white transition-colors"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown (if needed, though image doesn't explicitly show expanded state, standard practice implies it) */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full mt-2 left-0 w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-2 shadow-2xl overflow-hidden z-40"
                        >
                            <nav className="flex flex-col">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="px-4 py-3 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}