"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UDXLogo } from "@/components/ui/udx-logo";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

export function Header01() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-background/50 backdrop-blur-sm"
        }`}
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group min-w-0">
            <div className="flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <UDXLogo className="w-7 h-7 sm:w-8 sm:h-8 text-foreground" />
            </div>
            <span className="font-semibold text-base sm:text-lg truncate">UDX UI</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 lg:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="text-sm">
              Sign In
            </Button>
            <Button size="sm" className="text-sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <ModeToggle />
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] px-4">
                <VisuallyHidden.Root>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </VisuallyHidden.Root>

                <div className="flex flex-col gap-6 mt-6">
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="px-4 py-3 text-base font-medium hover:bg-muted rounded-lg transition-colors active:scale-[0.98]"
                      >
                        {item.name}
                      </a>
                    ))}
                  </nav>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-2 pt-4 border-t">
                    <Button variant="outline" className="w-full h-11 text-base">
                      Sign In
                    </Button>
                    <Button className="w-full h-11 text-base">Get Started</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

