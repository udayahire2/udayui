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

// --- Footers ---
const FooterPremium = dynamic(() => import("@/components/blocks/footers/footer-premium").then(mod => ({ default: mod.FooterPremium })));
const FooterMinimal = dynamic(() => import("@/components/blocks/footers/footer-minimal").then(mod => ({ default: mod.FooterMinimal })));
const FooterStandard = dynamic(() => import("@/components/blocks/footers/footer-standard").then(mod => ({ default: mod.FooterStandard })));

// --- FAQ ---
const FaqMinimal = dynamic(() => import("@/components/blocks/faq/faq-minimal").then(mod => ({ default: mod.FaqMinimal })));

// --- CTA ---
const CtaMinimal = dynamic(() => import("@/components/blocks/cta/cta-minimal").then(mod => ({ default: mod.Cta01 })));
const CtaStandard = dynamic(() => import("@/components/blocks/cta/cta-standard").then(mod => ({ default: mod.Cta02 })));
const CtaPremium = dynamic(() => import("@/components/blocks/cta/cta-premium").then(mod => ({ default: mod.Cta03 })));

// --- Features ---
const FeatureMinimal = dynamic(() => import("@/components/blocks/features/feature-minimal").then(mod => ({ default: mod.Features01 })));
const FeatureStandard = dynamic(() => import("@/components/blocks/features/feature-standard").then(mod => ({ default: mod.Features02 })));
const FeaturePremium = dynamic(() => import("@/components/blocks/features/feature-premium").then(mod => ({ default: mod.Features03 })));

// --- Pricing ---
const PricingMinimal = dynamic(() => import("@/components/blocks/pricing/pricing-minimal").then(mod => ({ default: mod.Pricing01 })));
const PricingStandard = dynamic(() => import("@/components/blocks/pricing/pricing-standard").then(mod => ({ default: mod.Pricing02 })));
const PricingPremium = dynamic(() => import("@/components/blocks/pricing/pricing-premium").then(mod => ({ default: mod.Pricing03 })));

// --- Stats ---
const StatsMinimal = dynamic(() => import("@/components/blocks/stats/stats-minimal").then(mod => ({ default: mod.Stats01 })));
const StatsStandard = dynamic(() => import("@/components/blocks/stats/stats-standard").then(mod => ({ default: mod.Stats02 })));
const StatsPremium = dynamic(() => import("@/components/blocks/stats/stats-premium").then(mod => ({ default: mod.Stats03 })));

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

    // Footers
    "footers/footer-premium": {
        name: "Footer Premium",
        slug: "footers/footer-premium",
        component: FooterPremium,
        category: "Footers",
        description: "Premium responsive footer with newsletter and links.",
    },
    "footers/footer-minimal": {
        name: "Footer Minimal",
        slug: "footers/footer-minimal",
        component: FooterMinimal,
        category: "Footers",
        description: "Minimalist centered footer with clean layout.",
    },
    "footers/footer-standard": {
        name: "Footer Standard",
        slug: "footers/footer-standard",
        component: FooterStandard,
        category: "Footers",
        description: "Standard multi-column footer with newsletter and links.",
    },

    // FAQ
    "faq/faq-minimal": {
        name: "FAQ Minimal",
        slug: "faq/faq-minimal",
        component: FaqMinimal,
        category: "FAQ",
        description: "Minimal FAQ section with accordion.",
    },

    // CTA
    "cta/cta-minimal": {
        name: "CTA Minimal",
        slug: "cta/cta-minimal",
        component: CtaMinimal,
        category: "CTA",
        description: "Simple centered Call to Action section.",
    },
    "cta/cta-standard": {
        name: "CTA Standard",
        slug: "cta/cta-standard",
        component: CtaStandard,
        category: "CTA",
        description: "Split layout CTA with email capture.",
    },
    "cta/cta-premium": {
        name: "CTA Premium",
        slug: "cta/cta-premium",
        component: CtaPremium,
        category: "CTA",
        description: "High-impact animated Call to Action.",
    },

    // Features
    "features/feature-minimal": {
        name: "Feature Minimal",
        slug: "features/feature-minimal",
        component: FeatureMinimal,
        category: "Features",
        description: "Simple grid of features with icons.",
    },
    "features/feature-standard": {
        name: "Feature Standard",
        slug: "features/feature-standard",
        component: FeatureStandard,
        category: "Features",
        description: "Card-based feature grid.",
    },
    "features/feature-premium": {
        name: "Feature Premium",
        slug: "features/feature-premium",
        component: FeaturePremium,
        category: "Features",
        description: "Detailed split layout feature section.",
    },

    // Pricing
    "pricing/pricing-minimal": {
        name: "Pricing Minimal",
        slug: "pricing/pricing-minimal",
        component: PricingMinimal,
        category: "Pricing",
        description: "Simple pricing cards.",
    },
    "pricing/pricing-standard": {
        name: "Pricing Standard",
        slug: "pricing/pricing-standard",
        component: PricingStandard,
        category: "Pricing",
        description: "Standard pricing with feature lists.",
    },
    "pricing/pricing-premium": {
        name: "Pricing Premium",
        slug: "pricing/pricing-premium",
        component: PricingPremium,
        category: "Pricing",
        description: "Premium pricing with toggle and details.",
    },

    // Stats
    "stats/stats-minimal": {
        name: "Stats Minimal",
        slug: "stats/stats-minimal",
        component: StatsMinimal,
        category: "Stats",
        description: "Simple stats grid.",
    },
    "stats/stats-standard": {
        name: "Stats Standard",
        slug: "stats/stats-standard",
        component: StatsStandard,
        category: "Stats",
        description: "Stats with detailed cards.",
    },
    "stats/stats-premium": {
        name: "Stats Premium",
        slug: "stats/stats-premium",
        component: StatsPremium,
        category: "Stats",
        description: "High-impact split layout for stats.",
    },
};
export const categories = ["Headers", "Heroes", "Testimonials", "Features", "Footers", "FAQ", "CTA", "Pricing", "Stats"];
