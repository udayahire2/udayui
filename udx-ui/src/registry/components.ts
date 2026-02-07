import * as React from "react";
import dynamic from "next/dynamic";

// --- Headers ---
const Header01 = dynamic(() => import("@/components/blocks/header/header-01").then(mod => mod.Header01) as any);
const Header02 = dynamic(() => import("@/components/blocks/header/header-02").then(mod => mod.Header02) as any);
const Header03 = dynamic(() => import("@/components/blocks/header/header-03") as any);
const Header04 = dynamic(() => import("@/components/blocks/header/header-04") as any);

// --- Hero Sections ---
const HeroSimpleCentered = dynamic(() => import("@/components/hero-sections/hero-simple-centered") as any);
const HeroModernGrid = dynamic(() => import("@/components/hero-sections/hero-modern-grid") as any);

// --- Blocks ---
const UserCard = dynamic(() => import("@/components/blocks/UserCard") as any);

export type ComponentItem = {
    name: string;
    slug: string;
    component: React.ComponentType<any>;
    category: string;
    description?: string;
};

export const registry: Record<string, ComponentItem> = {
    "headers/header-01": {
        name: "Header (Minimal Shaded)",
        slug: "headers/header-01",
        component: Header01,
        category: "Headers",
        description: "Premium minimal shaded responsive header with sticky behavior.",
    },
    "headers/header-02": {
        name: "Header (Enhanced SaaS)",
        slug: "headers/header-02",
        component: Header02,
        category: "Headers",
        description: "Enhanced SaaS header with dropdown navigation and premium features.",
    },
    "headers/header-03": {
        name: "Header (Scroll Morph)",
        slug: "headers/header-03",
        component: Header03,
        category: "Headers",
        description: "Glassmorphic header that morphs into a pill on scroll.",
    },
    "headers/header-04": {
        name: "Header (Pill)",
        slug: "headers/header-04",
        component: Header04,
        category: "Headers",
        description: "Always-visible pill-shaped header with smooth animations.",
    },
    "hero-sections/simple-centered": {
        name: "Hero (Simple Centered)",
        slug: "hero-sections/simple-centered",
        component: HeroSimpleCentered,
        category: "Hero Sections",
        description: "Clean, centered hero section with calm motion.",
    },
    "hero-sections/modern-grid": {
        name: "Hero (Modern Grid)",
        slug: "hero-sections/modern-grid",
        component: HeroModernGrid,
        category: "Hero Sections",
        description: "Dark mode hero with grid background and star effects.",
    },
    "blocks/user-card": {
        name: "User Card",
        slug: "blocks/user-card",
        component: UserCard,
        category: "Blocks",
        description: "A composite card component for displaying user profiles.",
    },
};

export const categories = ["Headers", "Hero Sections", "Blocks"];
