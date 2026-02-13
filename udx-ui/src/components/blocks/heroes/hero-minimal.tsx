"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroMinimal() {
    return (
        <section className="w-full py-20 lg:py-32 bg-background flex flex-col items-center text-center px-4">
            <div className="max-w-3xl space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                    Build software faster <br className="hidden sm:block" />
                    <span className="text-muted-foreground">with less friction.</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    The essential UI kit for modern web applications.
                    Focus on your product logic while we handle the pixels.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button size="lg" className="h-12 px-8 text-base">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base group">
                        View Documentation
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
