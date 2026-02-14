"use client";

import Link from "next/link";
import { registry, categories, ComponentItem } from "@/registry/components";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PreviewPage() {
    // Group components by category
    const groupedComponents = categories.reduce((acc, category) => {
        acc[category] = Object.values(registry).filter((item) => item.category === category);
        return acc;
    }, {} as Record<string, ComponentItem[]>);

    return (
        <div className="min-h-screen bg-background relative">
            {/* Theme Toggle - Top Right Fixed */}
            <div className="fixed top-6 right-6 z-50">
                <ModeToggle />
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden border-b border-border/40">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
                <div className="container relative px-4 py-20 md:py-28 mx-auto">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>UDX UI Component Library</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Component Preview
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Explore our collection of production-ready components. Click any component to see it in action.
                        </p>
                    </div>
                </div>
            </div>

            {/* Components Grid */}
            <div className="container px-4 py-16 md:py-20 mx-auto">
                <div className="max-w-6xl mx-auto space-y-16">
                    {categories.map((category) => {
                        const items = groupedComponents[category];
                        if (!items || items.length === 0) return null;

                        return (
                            <div key={category} className="space-y-6">
                                {/* Category Header */}
                                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                            {category}
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {items.length} {items.length === 1 ? 'component' : 'components'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-xs font-medium text-muted-foreground">Ready</span>
                                    </div>
                                </div>

                                {/* Component Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {items.map((component) => (
                                        <Link
                                            key={component.slug}
                                            href={`/preview/${component.slug}`}
                                            className="group relative block"
                                        >
                                            <div className="relative h-full p-6 rounded-xl border border-border/50 bg-card hover:bg-accent/5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                                                {/* Hover Gradient Effect */}
                                                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                                <div className="relative space-y-3">
                                                    {/* Component Name */}
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                                            {component.name}
                                                        </h3>
                                                        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                                                    </div>

                                                    {/* Component Description */}
                                                    {component.description && (
                                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                                            {component.description}
                                                        </p>
                                                    )}

                                                    {/* Component Slug */}
                                                    <div className="pt-2">
                                                        <code className="text-xs font-mono text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded">
                                                            {component.slug}
                                                        </code>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border/40 mt-20">
                <div className="container px-4 py-8 mx-auto">
                    <p className="text-center text-sm text-muted-foreground">
                        Built with Next.js, TypeScript, and Tailwind CSS
                    </p>
                </div>
            </div>
        </div>
    );
}
