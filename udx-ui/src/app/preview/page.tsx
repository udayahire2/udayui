"use client";

import Link from "next/link";
import { registry, categories, ComponentItem } from "@/registry/components";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowUpRight } from "lucide-react";

export default function PreviewPage() {
    const groupedComponents = categories.reduce((acc, category) => {
        acc[category] = Object.values(registry).filter(
            (item) => item.category === category
        );
        return acc;
    }, {} as Record<string, ComponentItem[]>);

    const totalComponents = Object.values(registry).length;

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Top Bar ── */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold tracking-tight text-foreground">
                            UDX UI
                        </span>
                        <span className="hidden h-4 w-px bg-border sm:block" />
                        <span className="hidden text-xs text-muted-foreground sm:block">
                            Component Library
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs tabular-nums text-muted-foreground">
                            {totalComponents} components
                        </span>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            {/* ── Page Header ── */}
            <div className="border-b border-border bg-muted/30">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Preview
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Component Gallery
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
                        Production-ready blocks for SaaS products. Click any component
                        to open its isolated preview.
                    </p>
                </div>
            </div>

            {/* ── Category Sections ── */}
            <main className="mx-auto max-w-7xl px-6 py-12 space-y-14">
                {categories.map((category) => {
                    const items = groupedComponents[category];
                    if (!items || items.length === 0) return null;

                    return (
                        <section key={category} aria-labelledby={`cat-${category}`}>

                            {/* Category label row */}
                            <div className="mb-5 flex items-baseline justify-between border-b border-border pb-3">
                                <div className="flex items-baseline gap-3">
                                    <h2
                                        id={`cat-${category}`}
                                        className="text-base font-semibold text-foreground"
                                    >
                                        {category}
                                    </h2>
                                    <span className="text-xs text-muted-foreground tabular-nums">
                                        {items.length}{" "}
                                        {items.length === 1 ? "component" : "components"}
                                    </span>
                                </div>
                            </div>

                            {/* Component grid */}
                            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 rounded-md border border-border overflow-hidden bg-border">
                                {items.map((component) => (
                                    <ComponentCard
                                        key={component.slug}
                                        component={component}
                                    />
                                ))}
                            </div>

                        </section>
                    );
                })}
            </main>

            {/* ── Footer ── */}
            <footer className="border-t border-border mt-8">
                <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        UDX UI — Built with Next.js, TypeScript &amp; Tailwind CSS
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                        {totalComponents} blocks
                    </span>
                </div>
            </footer>
        </div>
    );
}

/* ── Component Card ── */
function ComponentCard({ component }: { component: ComponentItem }) {
    return (
        <Link
            href={`/preview/${component.slug}`}
            className="group flex flex-col justify-between bg-background px-5 py-4 transition-colors duration-150 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
            <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground leading-snug">
                        {component.name}
                    </span>
                    <ArrowUpRight
                        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                        aria-hidden
                    />
                </div>

                {component.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {component.description}
                    </p>
                )}
            </div>

            <div className="mt-4">
                <code className="inline-block rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                    {component.slug}
                </code>
            </div>
        </Link>
    );
}
