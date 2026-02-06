
import React from "react";

export const UDXLogo = React.forwardRef<
    SVGSVGElement,
    React.ComponentPropsWithoutRef<"svg">
>(({ className, ...props }, ref) => (
    <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        fill="none"
        className={`w-8 h-8 ${className || ""}`}
        {...props}
    >
        <defs>
            <linearGradient id="main_grad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="currentColor" stopOpacity="1" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="shine_grad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
                <stop offset="0.2" stopColor="currentColor" stopOpacity="0" />
                <stop offset="0.5" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="0.8" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
        </defs>

        {/* Abstract Isometric U Shape */}
        <path
            d="M60 60C60 48.9543 68.9543 40 80 40H176C187.046 40 196 48.9543 196 60V148C196 174.51 174.51 196 148 196H80C68.9543 196 60 187.046 60 176V60Z"
            fill="url(#main_grad)"
        />

        {/* Cutout/Negative Space creating the inner dimension */}
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M100 80C100 75.5817 103.582 72 108 72H156C160.418 72 164 75.5817 164 80V136C164 149.255 153.255 160 140 160H108C103.582 160 100 156.418 100 152V80Z"
            fill="currentColor"
            className="text-background"
        />

        {/* Shine/Glass Effect Overlay */}
        <path
            d="M60 60C60 48.9543 68.9543 40 80 40H176C187.046 40 196 48.9543 196 60V148C196 174.51 174.51 196 148 196H80C68.9543 196 60 187.046 60 176V60Z"
            fill="url(#shine_grad)"
            style={{ mixBlendMode: "overlay" }}
        />

        {/* Floating Accent Orb */}
        <circle cx="188" cy="188" r="28" className="fill-primary" fillOpacity="0.2" />
        <circle cx="188" cy="188" r="14" className="fill-primary" />
    </svg>
));
UDXLogo.displayName = "UDXLogo";
