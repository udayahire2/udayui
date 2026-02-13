"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MoreHorizontal } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { UDXLogo } from "@/components/ui";

/**
 * Navigation item structure
 */
interface NavigationItem {
  name: string;
  href: string;
}

/**
 * Header02 component props configuration
 */
interface Header02Props {
  /** Border radius variant: "normal" (rounded-md) or "rounded" (rounded-full) */
  variant?: "normal" | "rounded";
  /** Logo component to display */
  logo?: ReactNode;
  /** Logo text label */
  logoText?: string;
  /** Custom navigation items array */
  navItems?: NavigationItem[];
  /** Anchor links - comma separated string (e.g., "Docs,Figma,Roadmap") */
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
  { name: "Docs", href: "#docs" },
  { name: "Figma", href: "#figma" },
  { name: "Roadmap", href: "#roadmap" },
];

/**
 * Parse anchor string into navigation items
 * @param anchorString - Comma-separated anchor text (e.g., "Docs,Figma,Roadmap")
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
 * Responsive Header02 Component (Floating Rounded Style)
 * 
 * A flexible, fully configurable floating navbar with support for:
 * - Custom logo and branding
 * - Navigation items via anchor prop or custom array
 * - Action buttons or dots menu
 * - Light/dark theme toggle
 * - Mobile-responsive hamburger menu
 * - Floating design with rounded appearance
 * 
 * @example
 * ```tsx
 * // Simple usage with anchor links
 * <Header02
 *   logo={<UDXLogo />}
 *   anchor="Docs,Figma,Roadmap"
 *   button="Sign In,Get Started"
 * />
 * 
 * // Advanced usage with custom nav items
 * <Header02
 *   navItems={customItems}
 *   button="Login,Subscribe"
 * />
 * ```
 */
export function NavbarFloating({
  variant = "rounded",
  logo = <UDXLogo />,
  logoText = "",
  navItems: customNavItems,
  anchor,
  button = "Sign In,Get Started",
  actions = "dots",
  showThemeToggle = true,
}: Header02Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Determine navigation items to use
  const navigationItems = anchor
    ? createNavigationItemsFromString(anchor)
    : customNavItems || DEFAULT_NAVIGATION_ITEMS;

  // Parse action buttons if provided
  const actionButtons = button ? createButtonLabelsFromString(button) : [];

  // Determine which action type to display
  const actionType = button ? "buttons" : anchor ? "none" : actions;

  // Handle Escape key and prevent body scroll when mobile menu is open
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileOpen]);

  // Border radius styles based on variant
  const borderRadiusClass = variant === "rounded" ? "rounded-full" : "rounded-md";

  const closeMobileMenu = () => setIsMobileOpen(false);

  return (
    <>
      {/* Floating Header */}
      <div className="sticky top-0 z-50 flex justify-center pt-4 px-4">
        <header className={`flex w-fit ${borderRadiusClass} bg-background/80 backdrop-blur-md border border-border/40 shadow-lg shadow-black/5 transition-all duration-300`}>
          <div className="px-6 py-2 flex items-center gap-4">

            {/* Logo Section */}
            <a
              href="/"
              onClick={closeMobileMenu}
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
            <nav className="hidden lg:flex items-center gap-0.5">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-1.5 text-[13px] font-medium text-foreground/60 hover:text-foreground bg-transparent hover:bg-muted/60 transition-colors duration-200 ${borderRadiusClass}`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Actions Section */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {showThemeToggle && <ModeToggle />}
              {actionType === "dots" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 hover:bg-muted/60 transition-colors duration-200 ${borderRadiusClass}`}
                  aria-label="More options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              )}
              {actionType === "buttons" && (
                <div className="flex items-center gap-2">
                  {actionButtons.map((btnLabel, index) => (
                    <Button
                      key={btnLabel}
                      variant={getButtonVariant(index, actionButtons.length)}
                      size="sm"
                      className={`text-[13px] font-medium px-4 transition-all duration-200 hover:shadow-md active:scale-95 h-9 ${borderRadiusClass}`}
                    >
                      {btnLabel}
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-2 flex-shrink-0">
              {showThemeToggle && <ModeToggle />}
              <Button
                variant="ghost"
                size="icon"
                className={`h-9 w-9 hover:bg-muted/60 transition-colors duration-200 ${borderRadiusClass}`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileOpen}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? (
                  <X className="w-[18px] h-[18px] stroke-[2.2] transition-transform duration-200" />
                ) : (
                  <Menu className="w-[18px] h-[18px] stroke-[2.2] transition-transform duration-200" />
                )}
              </Button>
            </div>

          </div>
        </header>
      </div>

      {/* Mobile Navigation Menu Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-lg border-b animate-in fade-in slide-in-from-top-2 duration-200 pt-24"
          onClick={closeMobileMenu}
        >
          <div
            className="container mx-auto px-4 py-6 max-h-[calc(100vh-96px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-6">
              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-0.5">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
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
                      className={`w-full justify-center h-10 text-[15px] font-medium transition-all duration-200 active:scale-95 ${borderRadiusClass}`}
                      onClick={closeMobileMenu}
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
