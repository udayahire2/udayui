"use client";

import React, { useState, useRef, useEffect } from "react";
import { Monitor, Tablet, Smartphone, Maximize2, X, RefreshCw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface ResizablePreviewProps {
    children: React.ReactNode;
    title?: string;
    backHref?: string;
    isFullPagePreview?: boolean;
}

const BREAKPOINTS = {
    mobile: { width: 375, label: "Mobile", icon: Smartphone },
    tablet: { width: 768, label: "Tablet", icon: Tablet },
    desktop: { width: 1440, label: "Desktop", icon: Monitor },
};

export function ResizablePreview({ children, title, backHref = "/preview", isFullPagePreview = false }: ResizablePreviewProps) {
    const [width, setWidth] = useState<number | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const fullscreenWrapperRef = useRef<HTMLDivElement>(null);

    const handleRefresh = () => setRefreshKey(prev => prev + 1);

    const enterFullscreen = async () => {
        if (fullscreenWrapperRef.current) {
            try {
                await fullscreenWrapperRef.current.requestFullscreen();
            } catch (err) {
                console.error("Error entering fullscreen:", err);
            }
        }
    };

    const exitFullscreen = async () => {
        try {
            await document.exitFullscreen();
        } catch (err) {
            console.error("Error exiting fullscreen:", err);
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    const currentWidth = width || containerRef.current?.offsetWidth || 0;

    // Full-page preview mode (for headers) - minimal controls
    if (isFullPagePreview) {
        return (
            <div className="w-full min-h-screen flex flex-col bg-background" ref={fullscreenWrapperRef}>
                {/* Floating Controls - Only Theme & Refresh */}
                {!isFullscreen && (
                    <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2">
                        <Button onClick={handleRefresh} variant="secondary" size="icon" className="h-9 w-9 rounded-full shadow-lg">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <ModeToggle />
                    </div>
                )}

                {/* Fullscreen Controls */}
                {isFullscreen && (
                    <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2">
                        <Button onClick={handleRefresh} variant="secondary" size="icon" className="h-9 w-9 rounded-full">
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                        <ModeToggle />
                        <Button onClick={exitFullscreen} variant="secondary" size="icon" className="h-9 w-9 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                )}

                {/* Full-page Content */}
                <div key={refreshKey} className="w-full min-h-screen">
                    {children}
                </div>
            </div>
        );
    }

    // Regular preview mode (for other components)
    return (
        <div className="w-full min-h-screen flex flex-col bg-background" ref={fullscreenWrapperRef}>
            {/* Simple Top Bar */}
            {!isFullscreen && (
                <div className="sticky top-0 z-50 bg-background border-b border-border">
                    <div className="flex items-center justify-between px-4 h-14 gap-4">
                        {/* Left: Back & Title */}
                        <div className="flex items-center gap-3">
                            <a href={backHref} className="flex items-center gap-1 text-sm hover:text-foreground text-muted-foreground">
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </a>
                            {title && (
                                <>
                                    <div className="h-4 w-px bg-border" />
                                    <span className="text-sm font-medium">{title}</span>
                                </>
                            )}
                        </div>

                        {/* Right: Controls */}
                        <div className="flex items-center gap-2">
                            {/* Breakpoints */}
                            {Object.entries(BREAKPOINTS).map(([key, { label, icon: Icon, width: bpWidth }]) => (
                                <Button
                                    key={key}
                                    variant={width === bpWidth ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setWidth(bpWidth)}
                                    className="h-8"
                                    title={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </Button>
                            ))}
                            <Button
                                variant={width === null ? "default" : "outline"}
                                size="sm"
                                onClick={() => setWidth(null)}
                                className="h-8"
                                title="Full Width"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </Button>

                            <div className="h-6 w-px bg-border" />

                            {/* Width Display */}
                            {width !== null && (
                                <span className="text-xs font-mono text-muted-foreground min-w-[60px] text-right">
                                    {Math.round(currentWidth)}px
                                </span>
                            )}

                            {/* Actions */}
                            <Button variant="ghost" size="icon" onClick={handleRefresh} className="h-8 w-8">
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={enterFullscreen} className="h-8 w-8">
                                <Maximize2 className="w-4 h-4" />
                            </Button>
                            <ModeToggle />
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Controls */}
            {isFullscreen && (
                <div className="fixed top-4 right-4 z-[9999] flex items-center gap-2">
                    <Button onClick={handleRefresh} variant="secondary" size="icon" className="h-9 w-9 rounded-full">
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                    <ModeToggle />
                    <Button onClick={exitFullscreen} variant="secondary" size="icon" className="h-9 w-9 rounded-full">
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}

            {/* Preview Area */}
            <div className="flex-1 flex items-start justify-center p-4">
                <div
                    ref={containerRef}
                    className={`${isFullscreen
                            ? "w-full h-full overflow-auto"
                            : width !== null
                                ? "border border-border overflow-auto"
                                : "w-full overflow-auto"
                        }`}
                    style={{
                        width: isFullscreen ? "100%" : width !== null ? `${width}px` : "100%",
                        maxWidth: "100%",
                        minHeight: isFullscreen ? "100vh" : "calc(100vh - 70px)",
                        transform: "translate3d(0,0,0)",
                        position: "relative",
                        isolation: "isolate",
                        contain: "layout style",
                    }}
                >
                    <div key={refreshKey} className="w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
