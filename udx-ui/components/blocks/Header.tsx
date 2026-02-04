"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Menu, X, Command } from "lucide-react";

const navItems = [
    { name: "Product", href: "#product" },
    { name: "Method", href: "#method" },
    { name: "Customers", href: "#customers" },
    { name: "Pricing", href: "#pricing" },
];

// --- Visual Helpers for cleaner JSX ---

const GlassLayer = () => (
    <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
            background: `
        radial-gradient(100% 100% at 50% 0%, 
          rgba(255,255,255,0.4) 0%, 
          rgba(255,255,255,0.1) 50%, 
          transparent 100%
        )
      `,
            mixBlendMode: "overlay",
        }}
    />
);

const GradientBorder = () => (
    <div
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-full"
        style={{
            background: `
        linear-gradient(135deg, 
          rgba(255,255,255,0.3) 0%, 
          rgba(255,255,255,0.1) 50%, 
          rgba(255,255,255,0) 100%
        )
      `,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
        }}
    />
);

// --- Main Component ---

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    // Trigger loading sequence
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    // Optimized scroll handler
    React.useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const containerVariants = {
        hidden: { y: -20, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
        },
    };

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            y: -12,
            scale: 0.98,
            transition: { duration: 0.2, ease: "easeInOut" }
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 25,
                mass: 1,
            }
        },
        exit: {
            opacity: 0,
            y: -12,
            scale: 0.98,
            filter: "blur(4px)",
            transition: { duration: 0.15, ease: "easeOut" }
        }
    };

    return (
        <>
            <motion.header
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                layout
                layoutRoot
                aria-label="Main header"
                className={`
          fixed top-4 left-1/2 -translate-x-1/2 z-50
          rounded-full px-2 py-2
          w-fit max-w-[92vw] overflow-hidden
          transition-colors duration-500
          ${scrolled
                        ? 'bg-white/40 dark:bg-neutral-900/40 border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
                        : 'bg-white/20 dark:bg-neutral-900/20 border-white/10 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.04)]'
                    }
          border
        `}
                style={{
                    minWidth: "min-content",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    borderRadius: "9999px" // Ensure full pill shape
                }}
                transition={{
                    layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }}
            >
                <GlassLayer />
                <GradientBorder />

                <div className="flex items-center relative z-10">
                    {/* Logo - Always Visible */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 select-none transition-all hover:opacity-80 active:scale-95 px-2"
                        aria-label="Homepage"
                        onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
                    >
                        <div className="flex items-center justify-center p-1.5 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/10 shadow-inner">
                            <Command className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-sm tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                            SaaS
                        </span>
                    </Link>

                    {/* Desktop Content - Fades in after expansion */}
                    <AnimatePresence>
                        {isLoaded && (
                            <motion.div
                                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                                animate={{ opacity: 1, width: "auto", scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                    opacity: { duration: 0.4, delay: 0.2 }
                                }}
                                className="hidden md:flex items-center overflow-hidden"
                            >
                                <div className="flex items-center px-1">
                                    {/* Nav */}
                                    <nav className="flex items-center gap-1 mx-2" aria-label="Primary">
                                        {navItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="px-3 py-1.5 text-[13px] font-medium text-muted-foreground/90 hover:text-foreground transition-all rounded-full hover:bg-white/10 dark:hover:bg-white/5 whitespace-nowrap"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </nav>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 pl-2 border-l border-white/10 dark:border-white/5 mx-2">
                                        <Link
                                            href="#signin"
                                            className="px-3 py-1.5 text-[13px] font-medium text-muted-foreground/90 hover:text-foreground transition-all rounded-full hover:bg-white/10 dark:hover:bg-white/5 whitespace-nowrap"
                                        >
                                            Log in
                                        </Link>
                                        <Button
                                            size="sm"
                                            className="h-8 rounded-full px-4 text-[12px] font-medium shadow-lg shadow-black/5 dark:shadow-black/20 bg-gradient-to-r from-foreground to-foreground/90 text-background hover:from-foreground/90 hover:to-foreground/80 whitespace-nowrap"
                                        >
                                            Get Started
                                        </Button>
                                        <ModeToggle />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Toggle - Only appears after load on mobile */}
                    <AnimatePresence>
                        {isLoaded && (
                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="md:hidden flex items-center pl-2 border-l border-white/10 dark:border-white/5 ml-2"
                            >
                                <ModeToggle />
                                <button
                                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                    aria-expanded={mobileMenuOpen}
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="p-1.5 rounded-full text-muted-foreground hover:bg-white/10 dark:hover:bg-white/5 transition-all active:scale-95 ml-1"
                                >
                                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>

            {/* Enhanced mobile menu with improved glass effect */}
            <AnimatePresence mode="wait">
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop overlay - z-40 to stay BEHIND header (z-50) but ABOVE content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Mobile menu - z-50 to match header level */}
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90vw] max-w-md z-50"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation menu"
                        >
                            <div
                                className="
                  bg-gradient-to-b from-white/60 to-white/40
                  dark:from-neutral-900/60 dark:to-neutral-900/40
                  backdrop-blur-xl backdrop-saturate-150
                  rounded-3xl
                  border border-white/20 dark:border-white/5
                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                  overflow-hidden
                  p-1.5
                  flex flex-col
                  relative
                "
                                style={{
                                    backdropFilter: "blur(24px) saturate(180%)",
                                    WebkitBackdropFilter: "blur(24px) saturate(180%)"
                                }}
                            >
                                {/* Decoration Layer */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"
                                    aria-hidden
                                />

                                <div className="relative z-10 flex flex-col gap-0.5">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block p-3.5 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-white/20 dark:hover:bg-white/5 rounded-2xl transition-all text-center active:scale-[0.98]"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}

                                    <div className="w-12 h-[1px] bg-black/5 dark:bg-white/5 mx-auto my-2" />

                                    <Link
                                        href="#signin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block p-3.5 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-white/20 dark:hover:bg-white/5 rounded-2xl transition-all text-center active:scale-[0.98]"
                                    >
                                        Log in
                                    </Link>

                                    <div className="p-1 mt-1">
                                        <Button
                                            className="w-full h-11 rounded-2xl bg-foreground text-background font-semibold shadow-xl hover:scale-[1.02] transition-all active:scale-[0.98]"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}   