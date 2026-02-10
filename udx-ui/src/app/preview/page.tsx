"use client";

import Link from "next/link";
import { registry, categories, ComponentItem } from "@/registry/components";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function PreviewPage() {
    // Group components by category
    const groupedComponents = categories.reduce((acc, category) => {
        acc[category] = Object.values(registry).filter((item) => item.category === category);
        return acc;
    }, {} as Record<string, ComponentItem[]>);

    return (
        <div className="min-h-screen bg-background p-8 md:p-12 relative">
            {/* Theme Toggle - Top Left Fixed */}
            <div className="fixed top-4 left-4 z-50">
                <ModeToggle />
            </div>

            <div className="max-w-4xl mx-auto space-y-12 pt-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">
                        Component Library
                    </h1>
                    <p className="text-muted-foreground">
                        Select a component to view its preview.
                    </p>
                </div>

                <div className="space-y-10">
                    {categories.map((category) => {
                        const items = groupedComponents[category];
                        if (!items || items.length === 0) return null;

                        return (
                            <div key={category} className="space-y-4">
                                <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                                    {category}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {items.map((component) => (
                                        <Button
                                            key={component.slug}
                                            variant="link"
                                            asChild
                                            className="justify-start h-auto py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors pl-0 hover:no-underline group"
                                        >
                                            <Link href={`/preview/${component.slug}`} className="flex items-center gap-2">
                                                <span>{component.name}</span>
                                                <ArrowRightIcon className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
