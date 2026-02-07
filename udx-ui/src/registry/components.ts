import * as React from "react";
import dynamic from "next/dynamic";

// --- Headers ---
// --- Headers ---
const HeaderScrollMorph = dynamic(() => import("@/components/headers/header-scroll-morph") as any);
const HeaderPill = dynamic(() => import("@/components/headers/header-pill") as any);
const Header01 = dynamic(() => import("@/components/blocks/header/header-01").then(mod => mod.Header01) as any);
const Header02 = dynamic(() => import("@/components/blocks/header/header-02").then(mod => mod.Header02) as any);

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
    "headers/scroll-morph": {
        name: "Header (Scroll Morph)",
        slug: "headers/scroll-morph",
        component: HeaderScrollMorph,
        category: "Headers",
        description: "Glassmorphic header that morphs into a pill on scroll.",
    },
    "headers/pill": {
        name: "Header (Pill)",
        slug: "headers/pill",
        component: HeaderPill,
        category: "Headers",
        description: "Always-visible pill-shaped header with smooth animations.",
    },
    "headers/header-01": {
        name: "Header (01)",
        slug: "headers/header-01",
        component: Header01,
        category: "Headers",
        description: "Simple header variant 01.",
    },
    "headers/header-02": {
        name: "Header (02)",
        slug: "headers/header-02",
        component: Header02,
        category: "Headers",
        description: "Simple header variant 02.",
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
