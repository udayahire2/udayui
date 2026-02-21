"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Types ─────────────────────────────────────────────────── */

export interface PremiumFeatureItem {
    label: string;
    description?: string;
}

export interface PremiumStat {
    value: string;
    label: string;
}

interface FeaturePremiumProps {
    eyebrow?: string;
    heading?: string;
    body?: string;
    features?: PremiumFeatureItem[];
    stats?: PremiumStat[];
    /** Fully override the right-column visual */
    visual?: React.ReactNode;
    /** Reverse the column order */
    reverse?: boolean;
    className?: string;
}

/* ── Default data ───────────────────────────────────────────── */

const DEFAULT_FEATURES: PremiumFeatureItem[] = [
    {
        label: "Automated workflows",
        description: "Trigger actions across your whole stack without custom glue code.",
    },
    {
        label: "Detailed analytics",
        description: "Real-time metrics, retention curves, and funnel analysis in one place.",
    },
    {
        label: "24/7 Support",
        description: "Dedicated engineers on-call with a guaranteed 4-hour response SLA.",
    },
];

const DEFAULT_STATS: PremiumStat[] = [
    { value: "99.99%", label: "Uptime SLA" },
    { value: "<50 ms", label: "P99 latency" },
    { value: "10 k+", label: "Teams" },
    { value: "SOC 2", label: "Type II certified" },
];

/* ── Motion config ──────────────────────────────────────────── */
// Premium.xml: hover_feedback · 120ms · ease-out · transform + opacity only

const ITEM_HOVER = {
    rest: { x: 0, opacity: 0.75 },
    hover: { x: 4, opacity: 1 },
};

const ITEM_TRANSITION = {
    duration: 0.12,
    ease: "easeOut",
};

/* ── Component ──────────────────────────────────────────────── */

export function FeaturesPremium({
    eyebrow,
    heading = "Everything you need to succeed.",
    body = "A comprehensive platform designed to help you build, launch, and scale with confidence.",
    features = DEFAULT_FEATURES,
    stats = DEFAULT_STATS,
    visual,
    reverse = false,
    className,
}: FeaturePremiumProps) {
    const prefersReduced = useReducedMotion();

    return (
        <section
            aria-labelledby={heading ? "features-prem-heading" : undefined}
            className={cn("w-full border-b border-border bg-background py-16", className)}
        >
            <div
                className={cn(
                    "mx-auto grid max-w-7xl grid-cols-1 gap-x-16 gap-y-12 px-6 lg:grid-cols-2 lg:items-start",
                    reverse && "lg:[&>*:first-child]:order-2"
                )}
            >
                {/* ── Left: Copy + Feature list ── */}
                <div className="flex flex-col gap-8">
                    <header className="space-y-3">
                        {eyebrow && (
                            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                                {eyebrow}
                            </p>
                        )}
                        {heading && (
                            <h2
                                id="features-prem-heading"
                                className="text-2xl font-semibold tracking-tight text-foreground"
                            >
                                {heading}
                            </h2>
                        )}
                        {body && (
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {body}
                            </p>
                        )}
                    </header>

                    {features.length > 0 && (
                        <ul role="list" className="divide-y divide-border border-t border-border">
                            {features.map((f) => (
                                <FeatureRow
                                    key={f.label}
                                    feature={f}
                                    prefersReduced={!!prefersReduced}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                {/* ── Right: Visual panel ── */}
                <div className="rounded-md border border-border bg-muted/30 p-6">
                    {visual ?? <DefaultVisual stats={stats} />}
                </div>
            </div>
        </section>
    );
}

/* ── Feature Row ────────────────────────────────────────────── */
// Motion: hover → x +4px + full opacity (signals active row)
// Communicates spatial relationship between cursor and content row.
// Disabled entirely when prefers-reduced-motion is set.

function FeatureRow({
    feature,
    prefersReduced,
}: {
    feature: PremiumFeatureItem;
    prefersReduced: boolean;
}) {
    return (
        <motion.li
            initial={prefersReduced ? false : ITEM_HOVER.rest}
            whileHover={prefersReduced ? undefined : ITEM_HOVER.hover}
            transition={ITEM_TRANSITION}
            className="flex gap-3 py-4"
        >
            <span
                aria-hidden
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-border bg-muted text-muted-foreground"
            >
                <Check className="size-3" strokeWidth={2} />
            </span>
            <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">{feature.label}</p>
                {feature.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                    </p>
                )}
            </div>
        </motion.li>
    );
}

/* ── Default visual: stats grid ────────────────────────────── */

function DefaultVisual({ stats }: { stats: PremiumStat[] }) {
    return (
        <div className="flex h-full flex-col gap-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                By the numbers
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
                {stats.map((s) => (
                    <div key={s.label} className="flex flex-col gap-1 bg-background px-5 py-5">
                        <dt className="text-xs text-muted-foreground">{s.label}</dt>
                        <dd className="text-2xl font-semibold tabular-nums tracking-tight text-foreground">
                            {s.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

export default FeaturesPremium;