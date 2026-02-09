import React from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function PreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased relative">
            <div className="fixed top-4 right-4 z-9999">
                <ModeToggle />
            </div>
            {children}
        </div>
    );
}
