"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface FeaturesPremiumProps {
    className?: string;
}

type IconProps = React.SVGProps<SVGSVGElement>;

const CARD_BASE =
    "relative isolate overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950";

const CARD_TITLE =
    "text-[1.35rem] font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-[1.5rem]";

const CARD_DESCRIPTION =
    "mt-3 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400";

export function FeaturesPremium({ className }: FeaturesPremiumProps) {
    return (
        <section
            className={cn(
                "relative overflow-hidden bg-[#f4f5f8] font-sans text-zinc-950 dark:bg-[#0b0b0c] dark:text-white",
                className
            )}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-zinc-200 dark:bg-zinc-800/70"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_34%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]"
            />

            <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12">
                <div className="grid gap-4">
                    <div className="grid gap-4 lg:grid-cols-3">
                        <SetupCard />
                        <SecurityCard />
                        <AnalyticsCard />
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        <DesignCard />
                        <AccessCard />
                    </div>
                </div>
            </div>
        </section>
    );
}

function SetupCard() {
    return (
        <FeatureCard className="flex min-h-[23.5rem] flex-col items-center justify-center text-center">
            <div className="relative z-10 mb-8 flex size-44 items-center justify-center rounded-full border border-dashed border-zinc-300/70 dark:border-zinc-600/70">
                <div className="relative flex size-28 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] dark:bg-zinc-900">
                    <SetupSyncIcon className="size-[3.65rem]" />
                    <span className="absolute bottom-6 right-6 flex size-7 items-center justify-center rounded-full border border-white/15 bg-white text-[11px] font-semibold text-zinc-950 shadow-sm">
                        2
                    </span>
                </div>
            </div>

            <div className="relative z-10">
                <h3 className={CARD_TITLE}>2 Minutes Setup</h3>
                <p className={cn(CARD_DESCRIPTION, "mx-auto max-w-[17rem] text-center")}>
                    Get your company&apos;s account up and running in under 2 minutes.
                </p>
            </div>
        </FeatureCard>
    );
}

function SecurityCard() {
    return (
        <FeatureCard className="flex min-h-[23.5rem] flex-col items-center justify-center text-center">
            <div className="relative z-10 mb-8 flex size-40 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] dark:bg-zinc-900">
                <div className="absolute inset-x-5 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <SecurityFingerprintIcon className="relative z-10 size-[4.25rem]" />
            </div>

            <div className="relative z-10">
                <h3 className={CARD_TITLE}>User-Based Security</h3>
                <p className={cn(CARD_DESCRIPTION, "mx-auto max-w-[17rem] text-center")}>
                    Grant specific permissions to users based on their roles and responsibilities.
                </p>
            </div>
        </FeatureCard>
    );
}

function AnalyticsCard() {
    const gradientId = useId().replace(/:/g, "");
    const glowId = `${gradientId}-glow`;
    const fillId = `${gradientId}-fill`;

    return (
        <FeatureCard className="flex min-h-[23.5rem] flex-col text-center">
            <div className="relative mb-8 h-52 overflow-hidden rounded-[26px] border border-zinc-200 bg-zinc-50 text-zinc-950 dark:border-zinc-800 dark:bg-[#0d0d0d] dark:text-white">
                <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                    <TrendSparkIcon className="size-3.5" />
                    <span>4.5%</span>
                </div>

                <svg
                    aria-hidden
                    className="absolute inset-0 h-full w-full text-zinc-950 dark:text-white"
                    viewBox="0 0 360 192"
                    fill="none"
                >
                    <defs>
                        <linearGradient id={fillId} x1="180" y1="30" x2="180" y2="192" gradientUnits="userSpaceOnUse">
                            <stop stopColor="currentColor" stopOpacity="0.22" />
                            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id={gradientId} x1="12" y1="98" x2="348" y2="98" gradientUnits="userSpaceOnUse">
                            <stop stopColor="currentColor" stopOpacity="0.75" />
                            <stop offset="1" stopColor="currentColor" stopOpacity="1" />
                        </linearGradient>
                        <filter id={glowId} x="-24" y="-24" width="408" height="240" colorInterpolationFilters="sRGB">
                            <feGaussianBlur stdDeviation="3" />
                        </filter>
                    </defs>

                    <path
                        d="M12 134C38 134 52 96 76 96C102 96 114 140 146 140C177 140 191 74 224 74C251 74 268 120 300 120C324 120 338 76 348 38L348 192H12Z"
                        fill={`url(#${fillId})`}
                    />
                    <path
                        d="M12 134C38 134 52 96 76 96C102 96 114 140 146 140C177 140 191 74 224 74C251 74 268 120 300 120C324 120 338 76 348 38"
                        stroke="currentColor"
                        strokeOpacity="0.15"
                        strokeWidth="10"
                        strokeLinecap="round"
                        filter={`url(#${glowId})`}
                    />
                    <path
                        d="M12 134C38 134 52 96 76 96C102 96 114 140 146 140C177 140 191 74 224 74C251 74 268 120 300 120C324 120 338 76 348 38"
                        stroke={`url(#${gradientId})`}
                        strokeWidth="3.25"
                        strokeLinecap="round"
                    />

                    {[76, 146, 224, 300].map((cx, index) => (
                        <circle
                            key={index}
                            cx={cx}
                            cy={[96, 140, 74, 120][index]}
                            r="4"
                            fill="currentColor"
                            fillOpacity="0.92"
                        />
                    ))}
                </svg>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-50 via-zinc-50/90 to-transparent dark:from-[#111111] dark:via-[#111111]/90 dark:to-transparent" />
            </div>

            <div className="mt-auto">
                <h3 className={CARD_TITLE}>Reports &amp; Analytics</h3>
                <p className={cn(CARD_DESCRIPTION, "mx-auto max-w-[17rem] text-center")}>
                    Get detailed insights and analytics to make data-driven decisions.
                </p>
            </div>
        </FeatureCard>
    );
}

function DesignCard() {
    return (
        <FeatureCard className="min-h-[28rem] lg:pr-[44%]">
            <div className="relative z-10 max-w-[20rem]">
                <CardIconButton>
                    <PointerSparkIcon className="size-[18px]" />
                </CardIconButton>

                <h3 className={cn(CARD_TITLE, "mt-6")}>
                    Sleek &amp; Intuitive Design
                </h3>
                <p className={CARD_DESCRIPTION}>
                    Manage and scale your business effortlessly using our user-friendly interface.
                </p>
            </div>

            <div className="relative z-10 mt-10 w-full max-w-[32rem] lg:absolute lg:-bottom-10 lg:right-[-1.25rem] lg:mt-0 lg:w-[58%] lg:rotate-[4deg]">
                <DashboardMockup />
            </div>
        </FeatureCard>
    );
}

function AccessCard() {
    return (
        <FeatureCard className="min-h-[28rem] lg:pr-[40%]">
            <div className="relative z-10 max-w-[20rem]">
                <CardIconButton>
                    <GlobalGridIcon className="size-[18px]" />
                </CardIconButton>

                <h3 className={cn(CARD_TITLE, "mt-6")}>
                    Access Anytime, Anywhere
                </h3>
                <p className={CARD_DESCRIPTION}>
                    Stay connected to your business no matter where you are, with our cloud-based access.
                </p>
            </div>

            <div className="relative z-10 mt-8 w-full lg:absolute lg:bottom-0 lg:right-[-1.5rem] lg:mt-0 lg:w-[58%]">
                <AccessVisualization />
            </div>
        </FeatureCard>
    );
}

function FeatureCard({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <article className={cn(CARD_BASE, className)}>
            {children}
        </article>
    );
}

function CardIconButton({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:bg-zinc-900">
            {children}
        </div>
    );
}

function SetupSyncIcon({ className, ...props }: IconProps) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 64 64"
            className={cn("text-current", className)}
            fill="none"
            {...props}
        >
            <path
                d="M18.5 24.5C21.6 18.3 26.3 15 33 15C40.8 15 47.4 19.5 50 26.2"
                stroke="currentColor"
                strokeWidth="2.7"
                strokeLinecap="round"
            />
            <path
                d="M47 17.5H54V24.5"
                stroke="currentColor"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M45.5 39.5C42.4 45.7 37.7 49 31 49C23.2 49 16.6 44.5 14 37.8"
                stroke="currentColor"
                strokeWidth="2.7"
                strokeLinecap="round"
            />
            <path
                d="M17 46.5H10V39.5"
                stroke="currentColor"
                strokeWidth="2.7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle
                cx="32"
                cy="32"
                r="6"
                stroke="currentColor"
                strokeOpacity="0.85"
                strokeWidth="2.4"
            />
        </svg>
    );
}

function SecurityFingerprintIcon({ className, ...props }: IconProps) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 64 64"
            className={cn("text-current", className)}
            fill="none"
            {...props}
        >
            <path
                d="M16 33.5V31C16 22.2 23.2 15 32 15C40.8 15 48 22.2 48 31V33.5"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
            />
            <path
                d="M21 39.5V31.5C21 25.4 25.9 20.5 32 20.5C38.1 20.5 43 25.4 43 31.5V39.5"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
            />
            <path
                d="M26 48V37.5C26 34.2 28.7 31.5 32 31.5C35.3 31.5 38 34.2 38 37.5V46"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
            />
            <path
                d="M32 36V51"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
            />
            <path
                d="M22.5 47.5V39.5"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
            />
            <path
                d="M41.5 47.5V39.5"
                stroke="currentColor"
                strokeWidth="2.35"
                strokeLinecap="round"
            />
        </svg>
    );
}

function TrendSparkIcon({ className, ...props }: IconProps) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 20 20"
            className={cn("text-current", className)}
            fill="none"
            {...props}
        >
            <path
                d="M3 13.5L7.2 9.3L10.3 12.4L16.5 6.2"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.8 6H16.8V10"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function PointerSparkIcon({ className, ...props }: IconProps) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 20 20"
            className={cn("text-current", className)}
            fill="none"
            {...props}
        >
            <path
                d="M4 2.8V15.7L8.3 11.7L11 17.2L13.6 15.9L10.9 10.4L16 10.2L4 2.8Z"
                fill="currentColor"
            />
            <path
                d="M13.7 3.3L15.2 1.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M15.4 7.1H17.7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

function GlobalGridIcon({ className, ...props }: IconProps) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 20 20"
            className={cn("text-current", className)}
            fill="none"
            {...props}
        >
            <circle cx="10" cy="10" r="7.2" stroke="currentColor" strokeWidth="1.7" />
            <path
                d="M10 2.8C12.5 5.2 13.9 7.8 13.9 10C13.9 12.2 12.5 14.8 10 17.2"
                stroke="currentColor"
                strokeWidth="1.55"
                strokeLinecap="round"
            />
            <path
                d="M10 2.8C7.5 5.2 6.1 7.8 6.1 10C6.1 12.2 7.5 14.8 10 17.2"
                stroke="currentColor"
                strokeWidth="1.55"
                strokeLinecap="round"
            />
            <path
                d="M3.7 7.3H16.3"
                stroke="currentColor"
                strokeWidth="1.55"
                strokeLinecap="round"
            />
            <path
                d="M3.7 12.7H16.3"
                stroke="currentColor"
                strokeWidth="1.55"
                strokeLinecap="round"
            />
        </svg>
    );
}

function DashboardMockup() {
    const areaFillId = useId().replace(/:/g, "");

    return (
        <div className="rounded-[30px] border border-white/10 bg-zinc-950/95 p-3 shadow-[0_36px_100px_-34px_rgba(0,0,0,0.85)]">
            <div className="overflow-hidden rounded-[24px] border border-white/5 bg-zinc-950">
                <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                        {["bg-white/65", "bg-white/35", "bg-white/20"].map(
                            (dotClass) => (
                                <span
                                    key={dotClass}
                                    className={cn("block size-2 rounded-full", dotClass)}
                                />
                            )
                        )}
                    </div>
                    <div className="h-2.5 w-24 rounded-full bg-white/10" />
                </div>

                <div className="grid grid-cols-[76px_1fr]">
                    <div className="space-y-3 border-r border-white/5 bg-white/[0.02] p-3">
                        <div className="h-8 rounded-xl bg-white/10" />
                        {[0, 1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className={cn(
                                    "h-7 rounded-lg",
                                    item === 1 ? "bg-white/10" : "bg-white/[0.05]"
                                )}
                            />
                        ))}
                    </div>

                    <div className="space-y-4 p-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                                <div className="h-2 w-14 rounded-full bg-white/10" />
                                <div className="mt-3 h-6 w-20 rounded-full bg-white/90" />
                                <div className="mt-3 h-1.5 w-full rounded-full bg-white/5" />
                            </div>
                            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                                <div className="h-2 w-16 rounded-full bg-white/10" />
                                <div className="mt-3 h-6 w-16 rounded-full bg-white/20" />
                                <div className="mt-3 flex items-end gap-1.5">
                                    {[18, 24, 14, 28, 20].map((height, index) => (
                                        <span
                                            key={index}
                                            className="block w-2 rounded-full bg-white/25"
                                            style={{ height }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                            <div className="mb-3 flex items-center justify-between">
                                <div className="h-2 w-20 rounded-full bg-white/10" />
                                <div className="h-2 w-12 rounded-full bg-white/10" />
                            </div>
                            <div className="overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-2">
                                <svg
                                    aria-hidden
                                    viewBox="0 0 220 92"
                                    className="h-24 w-full"
                                    fill="none"
                                >
                                    <defs>
                                        <linearGradient
                                            id={areaFillId}
                                            x1="110"
                                            y1="8"
                                            x2="110"
                                            y2="92"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop stopColor="white" stopOpacity="0.28" />
                                            <stop offset="1" stopColor="white" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0 72C18 72 24 58 42 58C64 58 68 74 92 74C114 74 124 36 146 36C170 36 172 58 196 58C206 58 214 54 220 38L220 92H0Z"
                                        fill={`url(#${areaFillId})`}
                                    />
                                    <path
                                        d="M0 72C18 72 24 58 42 58C64 58 68 74 92 74C114 74 124 36 146 36C170 36 172 58 196 58C206 58 214 54 220 38"
                                        stroke="white"
                                        strokeOpacity="0.9"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                            {[0, 1, 2, 3].map((row) => (
                                <div
                                    key={row}
                                    className={cn(
                                        "grid grid-cols-[1.1fr_0.8fr_0.6fr] items-center gap-3 py-2",
                                        row !== 3 && "border-b border-white/5"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="block size-7 rounded-full bg-white/10" />
                                        <span className="block h-2 w-full rounded-full bg-white/10" />
                                    </div>
                                    <span className="block h-2 rounded-full bg-white/10" />
                                    <span className="block h-2 rounded-full bg-white/10" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AccessVisualization() {
    const baseId = useId().replace(/:/g, "");

    return (
        <div className="relative h-[18rem] w-full">
            <svg
                aria-hidden
                viewBox="0 0 360 260"
                className="absolute inset-0 h-full w-full text-zinc-950 dark:text-white"
                fill="none"
            >
                <defs>
                    <pattern
                        id={`${baseId}-dots`}
                        x="0"
                        y="0"
                        width="12"
                        height="12"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle
                            cx="2"
                            cy="2"
                            r="1.25"
                            fill="currentColor"
                            fillOpacity="0.2"
                        />
                    </pattern>
                    <radialGradient
                        id={`${baseId}-fade`}
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(224 162) rotate(90) scale(118 164)"
                    >
                        <stop stopColor="currentColor" stopOpacity="0.18" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient
                        id={`${baseId}-arc`}
                        x1="58"
                        y1="200"
                        x2="324"
                        y2="70"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="currentColor" stopOpacity="0.06" />
                        <stop offset="0.5" stopColor="currentColor" stopOpacity="1" />
                        <stop offset="1" stopColor="currentColor" stopOpacity="0.12" />
                    </linearGradient>
                    <filter
                        id={`${baseId}-glow`}
                        x="-24"
                        y="-24"
                        width="408"
                        height="308"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="8" />
                    </filter>
                </defs>

                <ellipse
                    cx="218"
                    cy="168"
                    rx="118"
                    ry="76"
                    fill={`url(#${baseId}-dots)`}
                    opacity="0.72"
                />
                <ellipse
                    cx="218"
                    cy="168"
                    rx="118"
                    ry="76"
                    fill={`url(#${baseId}-fade)`}
                />
                <ellipse
                    cx="218"
                    cy="168"
                    rx="118"
                    ry="76"
                    stroke="currentColor"
                    strokeOpacity="0.14"
                />

                <path
                    d="M58 200C126 136 178 104 324 70"
                    stroke="currentColor"
                    strokeOpacity="0.18"
                    strokeWidth="14"
                    strokeLinecap="round"
                    filter={`url(#${baseId}-glow)`}
                />
                <path
                    d="M58 200C126 136 178 104 324 70"
                    stroke={`url(#${baseId}-arc)`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                />
                <path
                    d="M84 208C144 156 194 130 298 102"
                    stroke="currentColor"
                    strokeOpacity="0.18"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="3 8"
                />
                <path
                    d="M112 188C160 154 212 134 280 118"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />
                <circle cx="324" cy="70" r="6" fill="currentColor" fillOpacity="0.95" />
            </svg>
        </div>
    );
}

export { FeaturesPremium as FeaturePremium };
export default FeaturesPremium;