"use client";

import React from "react";
import { Check, Shield, Sparkles, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureMinimalItem {
    icon: LucideIcon;
    title: string;
    description: string;
    eyebrow?: string;
}

interface FeatureMinimalProps {
    eyebrow?: string;
    heading?: string;
    subheading?: string;
    features?: FeatureMinimalItem[];
    columns?: 2 | 3 | 4;
    className?: string;
}

const DEFAULT_FEATURES: FeatureMinimalItem[] = [
    {
        icon: Sparkles,
        eyebrow: "Fast onboarding",
        title: "Start without friction",
        description:
            "Thoughtful defaults and a clear structure help teams launch quickly without reworking the experience later.",
    },
    {
        icon: Shield,
        eyebrow: "Reliable experience",
        title: "Built to feel dependable",
        description:
            "Every section is designed to stay readable, predictable, and easy to navigate across devices and screen sizes.",
    },
    {
        icon: Check,
        eyebrow: "Flexible system",
        title: "Easy to adapt",
        description:
            "The minimal structure gives you room to tailor the message, visuals, and hierarchy for different product stories.",
    },
];

const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 xl:grid-cols-4",
};

export function FeatureMinimal({
    eyebrow = "Core features",
    heading = "Everything needed for a calm, polished product experience.",
    subheading = "Present your most important value clearly with a clean layout, balanced spacing, and feature cards that are easy to scan.",
    features = DEFAULT_FEATURES,
    columns = 3,
    className,
}: FeatureMinimalProps) {
    const hasHeader = Boolean(eyebrow || heading || subheading);

    return (
        <section
            aria-labelledby={heading ? "features-min-heading" : undefined}
            className={cn("relative overflow-hidden bg-background py-16 sm:py-20", className)}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border/80"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-12 h-40 w-[34rem] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl"
            />

            <div className="mx-auto max-w-6xl px-6">
                <div className="space-y-10 sm:space-y-12">
                    {hasHeader && (
                        <header className="mx-auto max-w-2xl space-y-4 text-center">
                            {eyebrow && (
                                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground/80">
                                    {eyebrow}
                                </p>
                            )}
                            {heading && (
                                <h2
                                    id="features-min-heading"
                                    className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                                >
                                    {heading}
                                </h2>
                            )}
                            {subheading && (
                                <p className="mx-auto max-w-xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                                    {subheading}
                                </p>
                            )}
                        </header>
                    )}

                    <ul
                        role="list"
                        className={cn("grid grid-cols-1 gap-4 sm:gap-5", COLUMN_CLASS[columns])}
                    >
                        {features.map((feature, index) => (
                            <MinimalFeatureItem
                                key={feature.title}
                                feature={feature}
                                index={index}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function MinimalFeatureItem({
    feature,
    index,
}: {
    feature: FeatureMinimalItem;
    index: number;
}) {
    const Icon = feature.icon;

    return (
        <li className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/90 p-5 transition-colors duration-200 hover:border-border hover:bg-muted/40">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent"
            />
            <span className="absolute right-5 top-5 text-[11px] font-medium tabular-nums tracking-[0.18em] text-muted-foreground/60">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex items-start gap-4">
                <div
                    aria-hidden
                    className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-muted/80 text-foreground shadow-sm"
                >
                    <Icon className="size-4" strokeWidth={1.6} />
                </div>

                <div className="min-w-0 space-y-2 pr-8">
                    {feature.eyebrow && (
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                            {feature.eyebrow}
                        </p>
                    )}
                    <h3 className="text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
                        {feature.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                        {feature.description}
                    </p>
                </div>
            </div>
        </li>
    );
}

export default FeatureMinimal;
