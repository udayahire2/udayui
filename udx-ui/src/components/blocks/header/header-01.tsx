"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UDXLogo } from "@/components/ui/udx-logo";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
];

export function Header01() {
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
              href="/"
              className="flex items-center gap-2 -ml-1 group"
            >
              <div className="p-1 transition-transform duration-200 group-hover:scale-105">
                <UDXLogo className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-[15px] font-semibold tracking-tight">UDX UI</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <ModeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-[13px] font-medium"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="h-8 px-3 text-[13px] font-medium"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-1.5">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
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
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-background/95 backdrop-blur-lg border-b animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-6">
              {/* Navigation */}
              <nav className="flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="px-3 py-2.5 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  className="w-full justify-center h-10 text-[15px] font-medium"
                >
                  Sign In
                </Button>
                <Button
                  className="w-full justify-center h-10 text-[15px] font-medium"
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
