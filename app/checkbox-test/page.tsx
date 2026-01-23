"use client";

import { Checkbox } from "@/udx/src/components/Checkbox/Checkbox";
import { Button } from "@/udx/src/components/Button/Button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function CheckboxTestPage() {
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
                        <h1 className="text-3xl font-bold tracking-tight">Checkbox Component Test</h1>
                        <p className="text-muted-foreground text-lg">
                            Verifying premium tactile feel, click animations, and dark mode visibility.
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

                {/* Premium Feel Focus */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        Premium Interaction (Click Me)
                    </h2>
                    <div className="flex flex-col gap-4 p-8 border rounded-lg">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions (Default)
                            </label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="circle" variant="circle" />
                            <label
                                htmlFor="circle"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Circle Variant
                            </label>
                        </div>
                    </div>
                </section>

                {/* Sizes */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        Sizes
                    </h2>
                    <div className="flex flex-wrap items-center gap-8">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="size-sm" size="sm" />
                            <label htmlFor="size-sm" className="text-xs font-medium">Small</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="size-md" size="md" />
                            <label htmlFor="size-md" className="text-sm font-medium">Default</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="size-lg" size="lg" />
                            <label htmlFor="size-lg" className="text-base font-medium">Large</label>
                        </div>
                    </div>
                </section>

                {/* States */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        States
                    </h2>
                    <div className="flex flex-wrap items-center gap-8">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="checked" defaultChecked />
                            <label htmlFor="checked" className="text-sm font-medium">Checked</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="disabled" disabled />
                            <label htmlFor="disabled" className="text-sm font-medium opacity-50">Disabled</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="disabled-checked" disabled defaultChecked />
                            <label htmlFor="disabled-checked" className="text-sm font-medium opacity-50">Disabled Checked</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="indeterminate" indeterminate />
                            <label htmlFor="indeterminate" className="text-sm font-medium">Indeterminate</label>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
