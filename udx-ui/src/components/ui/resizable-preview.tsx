"use client";

import React, { useState, useRef, useEffect } from "react";
import { Monitor, Tablet, Smartphone, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResizablePreviewProps {
    children: React.ReactNode;
}

const BREAKPOINTS = {
    mobile: { width: 375, label: "Mobile", icon: Smartphone },
    tablet: { width: 768, label: "Tablet", icon: Tablet },
    desktop: { width: 1440, label: "Desktop", icon: Monitor },
    full: { width: "100%", label: "Full", icon: Maximize2 },
};

export function ResizablePreview({ children }: ResizablePreviewProps) {
    const [width, setWidth] = useState<number | string>("100%");
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef<number>(0);
    const startWidthRef = useRef<number>(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (typeof width === "string") return; // Don't resize if full width

        setIsResizing(true);
        startXRef.current = e.clientX;
        startWidthRef.current = typeof width === "number" ? width : containerRef.current?.offsetWidth || 0;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;

            const delta = e.clientX - startXRef.current;
            const newWidth = Math.max(320, Math.min(startWidthRef.current + delta * 2, window.innerWidth - 100));
            setWidth(newWidth);
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing]);

    const setBreakpoint = (breakpoint: keyof typeof BREAKPOINTS) => {
        setWidth(BREAKPOINTS[breakpoint].width);
    };

    const currentWidth = typeof width === "number" ? width : containerRef.current?.offsetWidth || 0;

    return (
        <div className="w-full flex flex-col items-center gap-4">
            {/* Breakpoint Controls */}
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border">
                {Object.entries(BREAKPOINTS).map(([key, { label, icon: Icon }]) => (
                    <Button
                        key={key}
                        variant={width === BREAKPOINTS[key as keyof typeof BREAKPOINTS].width ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setBreakpoint(key as keyof typeof BREAKPOINTS)}
                        className="gap-2"
                    >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{label}</span>
                    </Button>
                ))}
                {typeof width === "number" && (
                    <div className="ml-2 px-3 py-1 bg-background rounded-md border border-border text-xs font-mono">
                        {currentWidth}px
                    </div>
                )}
            </div>

            {/* Resizable Container */}
            <div className="relative w-full flex justify-center">
                <div
                    ref={containerRef}
                    className="relative border border-border rounded-xl bg-background shadow-sm overflow-hidden transition-all"
                    style={{
                        width: typeof width === "string" ? width : `${width}px`,
                        maxWidth: "100%",
                    }}
                >
                    {/* Left Resize Handle */}
                    {typeof width === "number" && (
                        <>
                            <div
                                className={`absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/50 transition-colors z-50 ${isResizing ? "bg-primary" : ""
                                    }`}
                                onMouseDown={handleMouseDown}
                            >
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-primary/30 rounded-full" />
                            </div>

                            {/* Right Resize Handle */}
                            <div
                                className={`absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize hover:bg-primary/50 transition-colors z-50 ${isResizing ? "bg-primary" : ""
                                    }`}
                                onMouseDown={handleMouseDown}
                            >
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-primary/30 rounded-full" />
                            </div>
                        </>
                    )}

                    {/* Content */}
                    <div className="w-full h-full min-h-[600px]">{children}</div>
                </div>
            </div>
        </div>
    );
}
