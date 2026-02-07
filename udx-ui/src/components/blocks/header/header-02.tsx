"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UDXLogo } from "@/components/ui/udx-logo";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
  { name: "Company", href: "#company" },
];

export function Header02() {
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
            ? "h-14 bg-background/98 backdrop-blur-xl border-b shadow-md"
            : "h-[72px] bg-background/80 backdrop-blur-lg border-b border-border/50"
          }`}
      >
        <div className="h-full max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-full gap-8">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="p-1.5 rounded-lg bg-primary/5 transition-all duration-200 group-hover:bg-primary/10 group-hover:scale-105">
                <UDXLogo className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight">UDX UI</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wide">PREMIUM</span>
              </div>
            </a>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </Button>
              <ModeToggle />
              <div className="h-5 w-px bg-border/50 mx-1" />
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
              <ModeToggle />
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

      {/* Simple Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 top-14 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-b animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full h-11 pl-10 pr-4 text-sm bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="px-4 py-3 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex flex-col gap-2.5 pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full h-11 text-[15px] font-medium"
                >
                  Sign In
                </Button>
                <Button
                  className="w-full h-11 text-[15px] font-medium shadow-sm"
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
