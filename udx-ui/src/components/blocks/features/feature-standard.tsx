"use client";

import React from "react";
import { BarChart, Users, Zap, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Types ─────────────────────────────────────────────── */

export interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
}

interface FeatureStandardProps {
    heading?: string;
    subheading?: string;
    features?: FeatureItem[];
    columns?: 2 | 3 | 4;
    className?: string;
}

/* ── Default data ────────────────────────────────────────── */

const DEFAULT_FEATURES: FeatureItem[] = [
    {
        icon: Zap,
        title: "Instant Deployment",
        description:
            "Push your code and we handle the rest. Your app is live in seconds.",
    },
    {
        icon: BarChart,
        title: "Real-time Analytics",
        description:
            "Track usage and performance metrics in real-time with a unified dashboard.",
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description:
            "Invite your team and collaborate with granular role-based access control.",
    },
];

const COLUMN_CLASS: Record<2 | 3 | 4, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
};

/* ── Component ───────────────────────────────────────────── */

export default function FeatureStandard({
    heading = "Key Features",
    subheading,
    features = DEFAULT_FEATURES,
    columns = 3,
    className,
}: FeatureStandardProps) {
    return (
        <section
            aria-labelledby="features-std-heading"
            className={cn("w-full border-b border-border bg-background py-16", className)}
        >
            <div className="mx-auto max-w-7xl px-6">

                {/* Section header */}
                {(heading || subheading) && (
                    <header className="mb-10 max-w-xl">
                        {heading && (
                            <h2
                                id="features-std-heading"
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

                {/* Feature grid */}
                <ul
                    role="list"
                    className={cn(
                        "grid grid-cols-1 gap-px rounded-md border border-border bg-border overflow-hidden",
                        COLUMN_CLASS[columns]
                    )}
                >
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </ul>
            </div>
        </section>
    );
}

/* ── Feature Card ────────────────────────────────────────── */

function FeatureCard({ feature }: { feature: FeatureItem }) {
    const Icon = feature.icon;

    return (
        <li className="flex flex-col gap-3 bg-background px-5 py-5 transition-colors duration-150 hover:bg-muted/50">
            <div
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-foreground"
            >
                <Icon className="size-4" strokeWidth={1.5} />
            </div>

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
export { FeatureStandard }