import React from "react";

export default function PreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased relative">
            {children}
        </div>
    );
}
