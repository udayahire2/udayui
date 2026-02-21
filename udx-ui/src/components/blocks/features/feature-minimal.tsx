"use client";

import React from "react";
import { Check, Shield, Zap, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Types ─────────────────────────────────────────────────── */

export interface FeatureMinimalItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface FeatureMinimalProps {
    heading?: string;
    subheading?: string;
    features?: FeatureMinimalItem[];
    columns?: 2 | 3 | 4;
    className?: string;
}

/* ── Default data ───────────────────────────────────────────── */

const DEFAULT_FEATURES: FeatureMinimalItem[] = [
    {
        icon: Zap,
        title: "Fast Performance",
        description:
            "Optimized for speed and efficiency. Experience lightning-fast load times.",
    },
    {
        icon: Shield,
        title: "Secure by Default",
        description:
            "Enterprise-grade security features built-in to protect your data.",
    },
    {
        icon: Check,
        title: "Easy Integration",
        description:
            "Seamlessly integrates with your existing workflow and tools.",
    },
];

const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
};

/* ── Component ──────────────────────────────────────────────── */

export function FeatureMinimal({
    heading,
    subheading,
    features = DEFAULT_FEATURES,
    columns = 3,
    className,
}: FeatureMinimalProps) {
    return (
        <section
            aria-labelledby={heading ? "features-min-heading" : undefined}
            className={cn("w-full bg-background py-14", className)}
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Section header */}
                {(heading || subheading) && (
                    <header className="mb-10 max-w-xl">
                        {heading && (
                            <h2
                                id="features-min-heading"
                                className="text-xl font-semibold tracking-tight text-foreground"
                            >
                                {heading}
                            </h2>
                        )}
                        {subheading && (
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {subheading}
                            </p>
                        )}
                    </header>
                )}

                {/* Feature list */}
                <ul
                    role="list"
                    className={cn(
                        "grid grid-cols-1 gap-x-8 gap-y-8",
                        COLUMN_CLASS[columns]
                    )}
                >
                    {features.map((feature) => (
                        <MinimalFeatureItem key={feature.title} feature={feature} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ── Feature Item ───────────────────────────────────────────── */

function MinimalFeatureItem({ feature }: { feature: FeatureMinimalItem }) {
    const Icon = feature.icon;

    return (
        <li className="flex gap-4">
            {/* Icon column */}
            <div
                aria-hidden
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded border border-border bg-muted text-muted-foreground"
            >
                <Icon className="size-3.5" strokeWidth={1.5} />
            </div>

            {/* Text column */}
            <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </li>
    );
}

export default FeatureMinimal;