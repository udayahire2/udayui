import * as React from "react";
import dynamic from "next/dynamic";

// --- Headers ---
const NavbarSimple = dynamic(() => import("@/components/blocks/headers").then(mod => ({ default: mod.NavbarSimple })));
const NavbarStandard = dynamic(() => import("@/components/blocks/headers").then(mod => ({ default: mod.NavbarStandard })));
const NavbarFloating = dynamic(() => import("@/components/blocks/headers").then(mod => ({ default: mod.NavbarFloating })));
const NavbarMega = dynamic(() => import("@/components/blocks/headers").then(mod => ({ default: mod.NavbarMega })));
const NavbarCinematic = dynamic(() => import("@/components/blocks/headers").then(mod => ({ default: mod.NavbarCinematic })));
const NavbarSaas = dynamic(() => import("@/components/blocks/headers").then(mod => ({ default: mod.NavbarSaas })));
const NavbarMarketing = dynamic(() => import("@/components/blocks/headers").then(mod => ({ default: mod.NavbarMarketing })));

// --- Heroes ---
const HeroMinimal = dynamic(() => import("@/components/blocks/heroes").then(mod => ({ default: mod.HeroMinimal })));
const HeroSaas = dynamic(() => import("@/components/blocks/heroes").then(mod => ({ default: mod.HeroSaas })));
const HeroCinematic = dynamic(() => import("@/components/blocks/heroes").then(mod => ({ default: mod.HeroCinematic })));
const HeroGradient = dynamic(() => import("@/components/blocks/heroes").then(mod => ({ default: mod.HeroGradient })));
const HeroSplit = dynamic(() => import("@/components/blocks/heroes").then(mod => ({ default: mod.HeroSplit })));

// --- Testimonials ---
const TestimonialsSimple = dynamic(() => import("@/components/blocks/testimonials/testimonial-minimal").then(mod => ({ default: mod.TestimonialsSimple })));
const TestimonialsNormal = dynamic(() => import("@/components/blocks/testimonials/testimonial-cards").then(mod => ({ default: mod.TestimonialsNormal })));
const TestimonialsPremium = dynamic(() => import("@/components/blocks/testimonials/testimonial-carousel").then(mod => ({ default: mod.TestimonialsPremium })));

// --- Features ---
const Features01 = dynamic(() => import("@/components/blocks/features/feature-grid").then(mod => ({ default: mod.Features01 })));
const Features02 = dynamic(() => import("@/components/blocks/features/feature-cards").then(mod => ({ default: mod.Features02 })));

export type ComponentItem = {
    name: string;
    slug: string;
    component: React.ComponentType<any>;
    category: string;
    description?: string;
};

export const registry: Record<string, ComponentItem> = {
    // Headers
    "headers/navbar-simple": {
        name: "Navbar Simple",
        slug: "headers/navbar-simple",
        component: NavbarSimple,
        category: "Headers",
        description: "Clean and minimal navigation bar with essential links.",
    },
    "headers/navbar-standard": {
        name: "Navbar Standard",
        slug: "headers/navbar-standard",
        component: NavbarStandard,
        category: "Headers",
        description: "Standard navigation with dropdown menus and responsive design.",
    },
    "headers/navbar-floating": {
        name: "Navbar Floating",
        slug: "headers/navbar-floating",
        component: NavbarFloating,
        category: "Headers",
        description: "Floating pill-shaped navbar with smooth scroll animations.",
    },
    "headers/navbar-mega": {
        name: "Navbar Mega",
        slug: "headers/navbar-mega",
        component: NavbarMega,
        category: "Headers",
        description: "Advanced mega menu navigation with rich content sections.",
    },
    "headers/navbar-cinematic": {
        name: "Navbar Cinematic",
        slug: "headers/navbar-cinematic",
        component: NavbarCinematic,
        category: "Headers",
        description: "Cinematic header with dramatic scroll effects and animations.",
    },
    "headers/navbar-saas": {
        name: "Navbar SaaS",
        slug: "headers/navbar-saas",
        component: NavbarSaas,
        category: "Headers",
        description: "Modern SaaS-style navigation with CTA buttons.",
    },
    "headers/navbar-marketing": {
        name: "Navbar Marketing",
        slug: "headers/navbar-marketing",
        component: NavbarMarketing,
        category: "Headers",
        description: "Marketing-focused header with prominent call-to-actions.",
    },

    // Heroes
    "heroes/hero-minimal": {
        name: "Hero Minimal",
        slug: "heroes/hero-minimal",
        component: HeroMinimal,
        category: "Heroes",
        description: "Minimal hero section with clean typography and subtle animations.",
    },
    "heroes/hero-saas": {
        name: "Hero SaaS",
        slug: "heroes/hero-saas",
        component: HeroSaas,
        category: "Heroes",
        description: "SaaS-focused hero with feature highlights and CTA.",
    },
    "heroes/hero-cinematic": {
        name: "Hero Cinematic",
        slug: "heroes/hero-cinematic",
        component: HeroCinematic,
        category: "Heroes",
        description: "Cinematic hero with dramatic visuals and animations.",
    },
    "heroes/hero-gradient": {
        name: "Hero Gradient",
        slug: "heroes/hero-gradient",
        component: HeroGradient,
        category: "Heroes",
        description: "Hero section with vibrant gradient backgrounds and effects.",
    },
    "heroes/hero-split": {
        name: "Hero Split",
        slug: "heroes/hero-split",
        component: HeroSplit,
        category: "Heroes",
        description: "Split-screen hero layout with content and visual sections.",
    },

    // Testimonials
    "testimonials/testimonial-minimal": {
        name: "Testimonials Simple",
        slug: "testimonials/testimonial-minimal",
        component: TestimonialsSimple,
        category: "Testimonials",
        description: "Simple testimonial cards in a clean grid layout.",
    },
    "testimonials/testimonial-cards": {
        name: "Testimonials Cards",
        slug: "testimonials/testimonial-cards",
        component: TestimonialsNormal,
        category: "Testimonials",
        description: "Enhanced testimonial cards with avatars and rich styling.",
    },
    "testimonials/testimonial-carousel": {
        name: "Testimonials Carousel",
        slug: "testimonials/testimonial-carousel",
        component: TestimonialsPremium,
        category: "Testimonials",
        description: "Premium animated carousel with marquee effect.",
    },

    // Features
    "features/feature-grid": {
        name: "Features Grid",
        slug: "features/feature-grid",
        component: Features01,
        category: "Features",
        description: "Feature showcase in a responsive grid layout.",
    },
    "features/feature-cards": {
        name: "Features Cards",
        slug: "features/feature-cards",
        component: Features02,
        category: "Features",
        description: "Feature highlights with card-based design.",
    },
};

export const categories = ["Headers", "Heroes", "Testimonials", "Features"];
