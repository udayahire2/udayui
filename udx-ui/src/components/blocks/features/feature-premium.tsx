"use client";

import React, { useId } from "react";
import {
    BarChart3,
    Check,
    LucideIcon,
    Shield,
    Sparkles,
    Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PremiumFeatureItem {
    title: string;
    description: string;
    eyebrow?: string;
    icon?: LucideIcon;
    metric?: string;
}

export interface PremiumStat {
    value: string;
    label: string;
    detail?: string;
}

interface FeaturePremiumProps {
    eyebrow?: string;
    heading?: string;
    body?: string;
    features?: PremiumFeatureItem[];
    stats?: PremiumStat[];
    visual?: React.ReactNode;
    reverse?: boolean;
    className?: string;
}

type SnapshotItem = {
    title: string;
    description: string;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const DEFAULT_FEATURES: PremiumFeatureItem[] = [
    {
        icon: Workflow,
        eyebrow: "Unified flow",
        title: "Everything in one place",
        description:
            "Bring work, reviews, and updates into one clean system.",
        metric: "Faster setup",
    },
    {
        icon: Shield,
        eyebrow: "Secure system",
        title: "Control without clutter",
        description:
            "Keep approvals and permissions clear across the whole team.",
        metric: "Built-in trust",
    },
    {
        icon: BarChart3,
        eyebrow: "Live insights",
        title: "Metrics that stay useful",
        description:
            "See the numbers that matter without overwhelming the layout.",
        metric: "Clear reporting",
    },
    {
        icon: Sparkles,
        eyebrow: "Premium UI",
        title: "Polished on every screen",
        description:
            "Balanced spacing and calm visuals keep the block easy to scan.",
        metric: "Responsive layout",
    },
];

const DEFAULT_STATS: PremiumStat[] = [
    { value: "99.98%", label: "Uptime", detail: "Last 90 days" },
    { value: "11 min", label: "Approval cycle", detail: "Average time" },
    { value: "4.6x", label: "Visibility", detail: "Compared to legacy" },
    { value: "28", label: "Teams onboarded", detail: "Active workspaces" },
];

const DEFAULT_SNAPSHOT_ITEMS: SnapshotItem[] = [
    {
        title: "Release ready",
        description: "Checks are complete and rollout is clear.",
    },
    {
        title: "Team aligned",
        description: "Everyone is working from the same system.",
    },
    {
        title: "Healthy pace",
        description: "Delivery is moving with no urgent blockers.",
    },
];

const TILE_BASE =
    "relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/90 p-5 shadow-[0_24px_70px_-42px_hsl(var(--foreground)/0.34)] transition-[border-color,background-color,box-shadow,transform] duration-300 sm:p-6";

const FEATURE_SPANS = [
    "md:col-span-1 xl:col-span-3",
    "md:col-span-1 xl:col-span-4",
    "md:col-span-2 xl:col-span-5",
    "md:col-span-2 xl:col-span-4",
];

function getRevealMotion(prefersReduced: boolean, delay = 0) {
    if (prefersReduced) {
        return { initial: false };
    }

    return {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: {
            duration: 0.55,
            delay,
            ease: EASE_OUT,
        },
    };
}

function getFeatureSpan(index: number) {
    return FEATURE_SPANS[index % FEATURE_SPANS.length];
}

export function FeaturesPremium({
    eyebrow = "Core features",
    heading = "A premium feature block with a clean bento layout.",
    body = "Show key capabilities, important numbers, and product value in a layout that feels polished and easy to scan.",
    features = DEFAULT_FEATURES,
    stats = DEFAULT_STATS,
    visual,
    reverse = false,
    className,
}: FeaturePremiumProps) {
    const prefersReduced = useReducedMotion();
    const headingId = useId();

    return (
        <section
            aria-labelledby={heading ? headingId : undefined}
            className={cn("relative overflow-hidden bg-background py-20 sm:py-24", className)}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border/80"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-12 h-72 w-72 rounded-full bg-primary/6 blur-3xl"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl"
            />

            <div className="mx-auto max-w-7xl px-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:auto-rows-[minmax(184px,auto)]">
                    <motion.header
                        {...getRevealMotion(prefersReduced)}
                        className={cn(
                            TILE_BASE,
                            "flex flex-col justify-between gap-8 xl:col-span-5 xl:row-span-1",
                            reverse && "xl:order-2"
                        )}
                    >
                        <div className="space-y-4">
                            {eyebrow && (
                                <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground/85">
                                    {eyebrow}
                                </p>
                            )}
                            {heading && (
                                <h2
                                    id={headingId}
                                    className="max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                                >
                                    {heading}
                                </h2>
                            )}
                            {body && (
                                <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
                                    {body}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <IntroMetric
                                label="Clarity"
                                value="48%"
                                detail="less switching between tools"
                            />
                            <IntroMetric
                                label="Consistency"
                                value="A+"
                                detail="clean hierarchy on every screen"
                            />
                        </div>
                    </motion.header>

                    <div
                        className={cn(
                            "md:col-span-2 xl:col-span-7 xl:row-span-2",
                            reverse && "xl:order-1"
                        )}
                    >
                        {visual ?? <DefaultVisual stats={stats} prefersReduced={!!prefersReduced} />}
                    </div>

                    {features.length > 0 && (
                        <ul role="list" className="contents">
                            {features.map((feature, index) => (
                                <FeatureTile
                                    key={feature.title}
                                    feature={feature}
                                    index={index}
                                    prefersReduced={!!prefersReduced}
                                />
                            ))}
                        </ul>
                    )}

                    <motion.div
                        {...getRevealMotion(prefersReduced, prefersReduced ? 0 : 0.12)}
                        className={cn(TILE_BASE, "md:col-span-2 xl:col-span-7")}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
                                    Performance snapshot
                                </p>
                                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                                    Key stats at a glance
                                </h3>
                            </div>
                            <div className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                                Updated live
                            </div>
                        </div>

                        <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-[1.35rem] border border-border/70 bg-muted/30 p-4"
                                >
                                    <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                                    <dd className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                                        {stat.value}
                                    </dd>
                                    {stat.detail && (
                                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                                            {stat.detail}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </dl>
                    </motion.div>

                    <motion.aside
                        aria-label="Operational highlights"
                        {...getRevealMotion(prefersReduced, prefersReduced ? 0 : 0.18)}
                        className={cn(TILE_BASE, "md:col-span-2 xl:col-span-5")}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
                                    Team pulse
                                </p>
                                <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                                    Simple status updates
                                </h3>
                            </div>
                            <span className="text-xs text-muted-foreground">Last sync 2m ago</span>
                        </div>

                        <ul role="list" className="mt-5 space-y-3">
                            {DEFAULT_SNAPSHOT_ITEMS.map((item) => (
                                <li
                                    key={item.title}
                                    className="flex items-start gap-3 rounded-[1.25rem] border border-border/70 bg-muted/25 px-4 py-3"
                                >
                                    <span
                                        aria-hidden
                                        className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                                    >
                                        <Check className="size-3" strokeWidth={2.4} />
                                    </span>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                                        <p className="text-xs leading-5 text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.aside>
                </div>
            </div>
        </section>
    );
}

function FeatureTile({
    feature,
    index,
    prefersReduced,
}: {
    feature: PremiumFeatureItem;
    index: number;
    prefersReduced: boolean;
}) {
    const Icon = feature.icon ?? Sparkles;

    return (
        <motion.li
            {...getRevealMotion(prefersReduced, prefersReduced ? 0 : 0.06 * (index + 1))}
            className={cn(
                TILE_BASE,
                getFeatureSpan(index),
                "hover:border-foreground/10 hover:bg-muted/[0.42] hover:shadow-[0_30px_80px_-46px_hsl(var(--foreground)/0.38)]"
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />

                <div className="flex h-full flex-col justify-between gap-8">
                    <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <div
                            aria-hidden
                            className="flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-muted/70 text-foreground shadow-sm"
                        >
                            <Icon className="size-5" strokeWidth={1.8} />
                        </div>
                        {feature.metric && (
                            <span className="rounded-full border border-border/70 bg-background/95 px-3 py-1 text-[11px] font-medium tracking-[0.14em] text-muted-foreground">
                                {feature.metric}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        {feature.eyebrow && (
                            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                                {feature.eyebrow}
                            </p>
                        )}
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                            {feature.title}
                        </h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                            {feature.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-primary/70" aria-hidden />
                    <span>Clear structure for fast scanning</span>
                </div>
            </div>
        </motion.li>
    );
}

function DefaultVisual({
    stats,
    prefersReduced,
}: {
    stats: PremiumStat[];
    prefersReduced: boolean;
}) {
    const featuredStat = stats[0];
    const secondaryStats = stats.slice(1, 3);

    return (
        <motion.aside
            aria-label="Product overview"
            {...getRevealMotion(prefersReduced, prefersReduced ? 0 : 0.1)}
            className={cn(TILE_BASE, "h-full min-h-[420px] p-4 sm:p-6")}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -right-10 top-10 h-40 w-40 rounded-full bg-primary/8 blur-3xl"
            />

            <div className="relative grid h-full gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border/70 bg-muted/35 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                                Live workspace
                            </p>
                            <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                                Product overview
                            </h3>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/95 px-3 py-1 text-xs font-medium text-foreground">
                            <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
                            Healthy
                        </div>
                    </div>

                    <div className="mt-6 rounded-[1.25rem] border border-border/70 bg-background/95 p-5">
                        <p className="text-sm text-muted-foreground">
                            {featuredStat?.label ?? "Workflow health"}
                        </p>
                        <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
                            {featuredStat?.value ?? "98.4%"}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                            {featuredStat?.detail ?? "Important metrics stay visible without clutter."}
                        </p>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                        <MiniStatus label="Live automations" value="14" />
                        <MiniStatus label="Open reviews" value="03" />
                        <MiniStatus label="Risk flags" value="00" />
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="rounded-[1.5rem] border border-border/70 bg-background/95 p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                                    Activity stream
                                </p>
                                <h4 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                                    Active signals
                                </h4>
                            </div>
                            <span className="text-xs text-muted-foreground">2m ago</span>
                        </div>

                        <div className="mt-5 space-y-3">
                            {secondaryStats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-[1.1rem] border border-border/70 bg-muted/25 px-4 py-3"
                                >
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                                        {stat.value}
                                    </p>
                                    {stat.detail && (
                                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                            {stat.detail}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-border/70 bg-muted/30 p-5">
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
                            Interface note
                        </p>
                        <h4 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                            Clean by default
                        </h4>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            Soft contrast, balanced spacing, and grouped tiles make the section feel premium without looking heavy.
                        </p>

                        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="size-1.5 rounded-full bg-primary/70" aria-hidden />
                            <span>Good for landing pages, dashboards, and product sections</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.aside>
    );
}

function IntroMetric({
    label,
    value,
    detail,
}: {
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="rounded-[1.25rem] border border-border/70 bg-muted/30 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
                {label}
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
        </div>
    );
}

function MiniStatus({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[1rem] border border-border/70 bg-muted/35 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
                {label}
            </p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">{value}</p>
        </div>
    );
}

export default FeaturesPremium;
