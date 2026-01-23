"use client";

import { Avatar, AvatarBadge, AvatarGroup } from "@/udx/src/components/Avatar/Avatar";
import { Button } from "@/udx/src/components/Button/Button";
import { Moon, Sun, User, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function AvatarTestPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const demoImage = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop";

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-background text-foreground" : "bg-background text-foreground"}`}>
            <div className="min-h-screen bg-background p-10 space-y-12 font-sans text-foreground transition-colors duration-300">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Avatar Component Test</h1>
                        <p className="text-muted-foreground text-lg">
                            Verifying premium outline styles, precise sizing, and typography.
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
                    <div className="flex flex-wrap items-center gap-8 p-8 border rounded-lg">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-muted-foreground">Image</span>
                            <Avatar variant="outline" size="lg" src={demoImage} alt="User" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-muted-foreground">Fallback (Initials)</span>
                            <Avatar variant="outline" size="lg" fallback="JD" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-muted-foreground">Fallback (Icon)</span>
                            <Avatar variant="outline" size="lg" fallback={<User className="size-5" />} />
                        </div>
                    </div>
                </section>

                {/* Sizes */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        Sizes (Matches Button)
                    </h2>
                    <div className="flex flex-wrap items-end gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <Avatar size="sm" src={demoImage} fallback="SM" />
                            <span className="text-xs text-muted-foreground">Small (h-8)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Avatar size="md" src={demoImage} fallback="MD" />
                            <span className="text-xs text-muted-foreground">Default (h-10)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Avatar size="lg" src={demoImage} fallback="LG" />
                            <span className="text-xs text-muted-foreground">Large (h-12)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Avatar size="xl" src={demoImage} fallback="XL" />
                            <span className="text-xs text-muted-foreground">XL (h-14)</span>
                        </div>
                    </div>
                </section>

                {/* Variants Row */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        All Variants
                    </h2>
                    <div className="flex flex-wrap items-center gap-8">
                        <div className="flex flex-col items-center gap-2">
                            <Avatar variant="default" fallback="DF" />
                            <span className="text-sm font-medium">Default</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Avatar variant="outline" fallback="OT" />
                            <span className="text-sm font-medium">Outline</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Avatar variant="flat" fallback="FL" />
                            <span className="text-sm font-medium">Flat</span>
                        </div>
                    </div>
                </section>

                {/* Badges & Groups */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
                        Badges & Groups
                    </h2>
                    <div className="flex flex-wrap items-center gap-12">

                        <div className="flex items-center gap-4">
                            <Avatar src={demoImage} fallback="A">
                                <AvatarBadge status="online" />
                            </Avatar>
                            <Avatar src={demoImage} fallback="B">
                                <AvatarBadge status="busy" />
                            </Avatar>
                            <Avatar src={demoImage} fallback="C">
                                <AvatarBadge status="count">3</AvatarBadge>
                            </Avatar>
                        </div>

                        <AvatarGroup size="md" limit={3}>
                            <Avatar src={demoImage} fallback="A" />
                            <Avatar src={demoImage} fallback="B" />
                            <Avatar src={demoImage} fallback="C" />
                            <Avatar src={demoImage} fallback="D" />
                            <Avatar src={demoImage} fallback="E" />
                        </AvatarGroup>

                    </div>
                </section>
            </div>
        </div>
    );
}
