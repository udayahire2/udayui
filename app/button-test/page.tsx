"use client";

import { Button } from "@/udx/src/components/Button/Button";
import { ArrowRight, Mail, Loader2, Trash2, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ButtonTestPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-background text-foreground" : "bg-background text-foreground"}`}>
            <div className="min-h-screen bg-background p-10 space-y-12 font-sans text-foreground transition-colors duration-300">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Button Component Test</h1>
                        <p className="text-muted-foreground text-lg">
                            Verifying the new premium outline styles and overall polish.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="rounded-full"
                    >
                        {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                    </Button>
                </div>

                {/* Outline Variant Focus */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        Premium Outline Variant (Main Focus)
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 p-8 border rounded-lg">
                        <Button variant="outline">Default Outline</Button>
                        <Button variant="outline" size="sm">Small Outline</Button>
                        <Button variant="outline" size="lg">Large Outline</Button>
                        <Button variant="outline">
                            <Mail className="mr-2 size-4" /> With Icon
                        </Button>
                        <Button variant="outline">
                            Next Step <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </div>
                </section>

                {/* All Variants */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        All Variants
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="space-y-4">
                            <h3 className="font-medium text-muted-foreground">Default (Primary)</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button>Primary</Button>
                                <Button disabled>Disabled</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-muted-foreground">Secondary</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="secondary" disabled>Disabled</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-muted-foreground">Destructive</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="destructive">Delete Account</Button>
                                <Button variant="destructive" size="icon">
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-muted-foreground">Ghost</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="ghost">Ghost Button</Button>
                                <Button variant="ghost" size="sm">Small</Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-muted-foreground">Link</h3>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="link">Read more</Button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* States & Sizes */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        States & Sizes
                    </h2>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button isLoading>Loading</Button>
                            <Button variant="outline" isLoading>Loading</Button>
                            <Button variant="secondary" isLoading>Loading</Button>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button size="icon"><Mail className="size-4" /></Button>
                            <Button size="icon-sm" variant="outline"><Mail className="size-4" /></Button>
                            <Button size="lg" variant="secondary"><Mail className="size-4" /></Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
