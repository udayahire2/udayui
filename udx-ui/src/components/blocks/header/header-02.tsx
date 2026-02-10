"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UDXLogo } from "@/components/ui";

const navItems = [
  { name: "Docs", href: "#docs" },
  { name: "Figma", href: "#figma" },
  { name: "Roadmap", href: "#roadmap" },
];

export function Header02() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* ---------------- Close on outside click ---------------- */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  /* ---------------- Close on ESC ---------------- */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ================= FLOATING HEADER ================= */}
      <div className="sticky top-0 z-50 flex justify-center pt-4 px-4">
        <header className="flex w-fit rounded-full bg-background/80 backdrop-blur-md border border-border/40 shadow-lg shadow-black/5">
          <div className="px-6 py-2 flex items-center gap-4">

            {/* LOGO */}
            <UDXLogo />

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[13px] font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-full text-[13px]"
              >
                Sign In
              </Button>

              <Button
                size="sm"
                className="h-9 px-5 rounded-full text-[13px]"
              >
                Get Started
              </Button>

              <ModeToggle />
            </div>

            {/* MOBILE ACTIONS */}
            <div className="flex lg:hidden items-center gap-2">
              <ModeToggle />

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label="Menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-[18px] h-[18px] stroke-[2.2]" />
                ) : (
                  <Menu className="w-[18px] h-[18px] stroke-[2.2]" />
                )}
              </Button>
            </div>

          </div>
        </header>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-20 left-4 right-4 z-40 rounded-2xl bg-background/90 backdrop-blur-lg border border-border/40 shadow-lg shadow-black/10 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <nav className="flex flex-col py-4">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-6 py-3 text-[14px] font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors ${
                  index !== navItems.length - 1
                    ? "border-b border-border/20"
                    : ""
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
