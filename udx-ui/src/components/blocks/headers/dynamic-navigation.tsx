"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const themeItems: NavItem[] = [
  { id: "light", icon: <Sun className="w-[18px] h-[18px]" />, label: "Light Mode" },
  { id: "system", icon: <Monitor className="w-[18px] h-[18px]" />, label: "System" },
  { id: "dark", icon: <Moon className="w-[18px] h-[18px]" />, label: "Dark Mode" },
];

export interface DynamicNavigationProps {
  className?: string;
  onChange?: (id: string) => void;
}

const DynamicNavigation: React.FC<DynamicNavigationProps> = ({
  className,
  onChange,
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (id: string) => {
    setTheme(id);
    onChange?.(id);
  };

  // Prevent rendering on SSR so themes match exactly
  if (!mounted) {
    return null;
  }

  return (
    <nav
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
        "flex items-center p-1.5 w-fit rounded-full",
        "bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl border border-neutral-200/60 dark:border-neutral-800/60",
        "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]",
        className
      )}
      onMouseLeave={() => setHoveredId(null)}
    >
      {themeItems.map((item) => {
        const isActive = theme === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleSelect(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            aria-label={item.label}
            className={cn(
              "relative p-2.5 flex items-center justify-center transition-colors duration-200 ease-out rounded-full outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-neutral-500 dark:focus-visible:ring-offset-neutral-950",
              isActive
                ? "text-neutral-900 dark:text-neutral-50"
                : "text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            )}
          >
            <span className="relative z-20 flex items-center justify-center">
              {item.icon}
            </span>

            {/* Hover Indicator */}
            {isHovered && !isActive && (
              <motion.div
                layoutId="dynamic-nav-hover"
                className="absolute inset-0 rounded-full bg-neutral-100/60 dark:bg-neutral-800/40 -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                }}
              />
            )}

            {/* Active Indicator */}
            {isActive && (
              <motion.div
                layoutId="dynamic-nav-active"
                className="absolute inset-0 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 -z-10"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)",
                }}
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export { DynamicNavigation };
export default DynamicNavigation;