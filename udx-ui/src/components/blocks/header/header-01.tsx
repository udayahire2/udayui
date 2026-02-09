"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MoreHorizontal } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

/**
 * Navigation item structure
 */
interface NavigationItem {
  name: string;
  href: string;
}

/**
 * DefaultNavbar component props configuration
 */
interface DefaultNavbarProps {
  /** Border radius variant: "normal" (rounded-md) or "rounded" (rounded-full) */
  variant?: "normal" | "rounded";
  /** Logo component to display */
  logo?: ReactNode;
  /** Logo text label */
  logoText?: string;
  /** Custom navigation items array */
  navItems?: NavigationItem[];
  /** Anchor links - comma separated string (e.g., "Home,About,Services") */
  anchor?: string;
  /** Action buttons - comma separated string (e.g., "Sign In,Get Started") */
  button?: string;
  /** Action menu type when button prop is not provided */
  actions?: "dots" | "buttons" | "none";
  /** Show or hide theme toggle button */
  showThemeToggle?: boolean;
}

// Default navigation items used when no anchor or navItems provided
const DEFAULT_NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Features", href: "#features" },
  { name: "Solutions", href: "#solutions" },
  { name: "Pricing", href: "#pricing" },
  { name: "Resources", href: "#resources" },
];

/**
 * Parse anchor string into navigation items
 * @param anchorString - Comma-separated anchor text (e.g., "Home,About,Services")
 * @returns Array of navigation items with generated hrefs
 */
const createNavigationItemsFromString = (anchorString: string): NavigationItem[] => {
  return anchorString.split(",").map((item) => {
    const name = item.trim();
    const href = `#${name.toLowerCase().replace(/\s+/g, "-")}`;
    return { name, href };
  });
};

/**
 * Parse button string into button labels array
 * @param buttonString - Comma-separated button labels (e.g., "Sign In,Get Started")
 * @returns Array of button label strings
 */
const createButtonLabelsFromString = (buttonString: string): string[] => {
  return buttonString.split(",").map((item) => item.trim());
};

/**
 * Determine button variant based on position in array
 * Ensures proper visual hierarchy with only one primary button
 * @param index - Current button index
 * @param total - Total number of buttons
 * @returns Button variant for the specified position
 * 
 * Logic:
 * - First button: "ghost" (secondary)
 * - Middle buttons: "outline" (tertiary)
 * - Last button: "default" (primary CTA)
 */
const getButtonVariant = (index: number, total: number): "default" | "destructive" | "outline" | "secondary" | "ghost" => {
  // Single button: use default (primary)
  if (total === 1) return "default";
  
  // First button: ghost (secondary)
  if (index === 0) return "ghost";
  
  // Last button: default (primary)
  if (index === total - 1) return "default";
  
  // Middle buttons: outline (tertiary)
  return "outline";
};

/**
 * Responsive DefaultNavbar Component
 * 
 * A flexible, fully configurable navbar with support for:
 * - Custom logo and branding
 * - Navigation items via anchor prop or custom array
 * - Action buttons or dots menu
 * - Light/dark theme toggle
 * - Mobile-responsive hamburger menu
 * - Rounded or normal border radius variants
 * 
 * @example
 * ```tsx
 * // Simple usage with anchor links
 * <DefaultNavbar 
 *   variant="rounded"
 *   logo={<Logo />}
 *   anchor="Home,About,Services,Contact"
 *   button="Sign In,Get Started"
 * />
 * 
 * // Advanced usage with custom nav items
 * <DefaultNavbar 
 *   navItems={customItems}
 *   button="Login,Subscribe"
 *   variant="rounded"
 * />
 * ```
 */
export function DefaultNavbar({
  variant = "normal",
  logo,
  logoText = "Brand",
  navItems: customNavItems,
  anchor,
  button,
  actions = "dots",
  showThemeToggle = true,
}: DefaultNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Determine navigation items to use
  const navigationItems = anchor 
    ? createNavigationItemsFromString(anchor) 
    : customNavItems || DEFAULT_NAVIGATION_ITEMS;

  // Parse action buttons if provided
  const actionButtons = button ? createButtonLabelsFromString(button) : [];

  // Determine which action type to display
  const actionType = button ? "buttons" : anchor ? "none" : actions;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen]);

  // Border radius styles based on variant
  const borderRadiusClass = variant === "rounded" ? "rounded-full" : "rounded-md";
  const buttonRadiusClass = variant === "rounded" ? "rounded-full" : "";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
            : "bg-background/70 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Brand Logo Section */}
            <a
              href="/"
              className="flex items-center gap-2 -ml-1 group flex-shrink-0 hover:opacity-80 transition-opacity duration-200"
            >
              {logo ? (
                <div className={`p-1 transition-transform duration-200 group-hover:scale-110 ${borderRadiusClass}`}>
                  {logo}
                </div>
              ) : null}
              {logoText && <span className="text-[14px] font-semibold tracking-tight">{logoText}</span>}
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 text-[12px] font-medium text-foreground/70 hover:text-foreground bg-transparent hover:bg-muted/60  hover:border-primary ${borderRadiusClass}`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions Section */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {showThemeToggle && <ModeToggle />}
              {actionType === "dots" && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 hover:bg-muted/60 transition-colors duration-200 ${buttonRadiusClass}`}
                  aria-label="More options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              )}
              {actionType === "buttons" && (
                <div className="flex items-center gap-1.5">
                  {actionButtons.map((btnLabel, index) => (
                    <Button
                      key={btnLabel}
                      variant={getButtonVariant(index, actionButtons.length)}
                      size="sm"
                      className={`text-[12px] font-medium px-3 transition-all duration-200 hover:shadow-md active:scale-95 ${buttonRadiusClass}`}
                    >
                      {btnLabel}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
              {showThemeToggle && <ModeToggle />}
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 hover:bg-muted/60 transition-colors duration-200 ${buttonRadiusClass}`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? (
                  <X className="w-4 h-4 transition-transform duration-200" />
                ) : (
                  <Menu className="w-4 h-4 transition-transform duration-200" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-lg border-b animate-in fade-in slide-in-from-top-2 duration-200 pt-16"
          onClick={() => setIsMobileOpen(false)}
        >
          <div 
            className="container mx-auto px-4 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6">
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-0.5">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`px-3 py-3 text-[15px] font-medium text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-all duration-200 active:scale-95 ${borderRadiusClass}`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Mobile Action Buttons */}
              {actionType === "buttons" && (
                <div className="flex flex-col gap-2 pt-4 border-t">
                  {actionButtons.map((btnLabel, index) => (
                    <Button
                      key={btnLabel}
                      variant={getButtonVariant(index, actionButtons.length)}
                      className={`w-full justify-center h-10 text-[15px] font-medium transition-all duration-200 active:scale-95 ${buttonRadiusClass}`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {btnLabel}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
