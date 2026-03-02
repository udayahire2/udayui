"use client";

import React, { useState } from "react";

/* ─────────────────────────────────────────────
   Chromify UI — Neumorphic Control Set
   Theme: light-chrome  |  Font: Inter
   Author: SeniorDesignEngineer  |  v1.0
───────────────────────────────────────────── */

const tokens = {
    bg: "#F3F4F4",
    panel: "#ECEFF0",
    panelAccentTop: "#E6EAEB",
    panelAccentBottom: "#DDEFF0",
    mutedText: "#6B6F72",
    primaryText: "#24292B",
    ctaTop: "#E7EAEB",
    ctaBottom: "#D6EAEA",
    shadowLight: "rgba(255,255,255,0.95)",
    shadowDark: "rgba(15,20,20,0.12)",
};

/* ── Inline keyframes injected once ── */
const STYLE_ID = "chromify-keyframes";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
    const s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

    @keyframes chromify-pulse {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.75; transform:scale(0.92); }
    }
    @keyframes chromify-spin {
      from { transform:rotate(0deg); }
      to   { transform:rotate(360deg); }
    }
    @keyframes chromify-float {
      0%,100% { transform:translateY(0); }
      50%      { transform:translateY(-5px); }
    }
    @keyframes chromify-ripple {
      0%   { transform:scale(0); opacity:.35; }
      100% { transform:scale(3); opacity:0; }
    }
    @keyframes shimmer {
      0%   { background-position:-400px 0; }
      100% { background-position:400px 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
    }
  `;
    document.head.appendChild(s);
}

/* ═══════════════════════════════════════════
   SVG ICON PRIMITIVES
═══════════════════════════════════════════ */

const SparkIcon = ({ size = 28, color = "#FFF", opacity = 0.95 }: { size?: number; color?: string; opacity?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
        <path d="M12 2L13.5 9.5L21 12L13.5 14.5L12 22L10.5 14.5L3 12L10.5 9.5L12 2Z" fill={color} />
    </svg>
);

const FourPointSpark = ({ size = 28 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 1V23M1 12H23M4.22 4.22L19.78 19.78M19.78 4.22L4.22 19.78" stroke="#24292B" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
        <path d="M12 3L13.2 10.8L21 12L13.2 13.2L12 21L10.8 13.2L3 12L10.8 10.8L12 3Z" fill="#24292B" opacity="0.85" />
    </svg>
);

const LockIcon = ({ locked, size = 22 }: { locked: boolean; size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="11" width="14" height="10" rx="2" fill={locked ? tokens.mutedText : "#2C8F7B"} style={{ transition: "fill 300ms ease" }} />
        {locked ? (
            <path d="M8 11V7a4 4 0 018 0v4" stroke={tokens.mutedText} strokeWidth="2" strokeLinecap="round" style={{ transition: "stroke 300ms ease" }} />
        ) : (
            <path d="M8 11V7a4 4 0 016.928-2" stroke="#2C8F7B" strokeWidth="2" strokeLinecap="round" style={{ transition: "stroke 300ms ease" }} />
        )}
        <circle cx="12" cy="16" r="1.5" fill="white" />
    </svg>
);

const ArrowIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 6l6 6-6 6" stroke={tokens.primaryText} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ChatDotIcon = ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={tokens.mutedText} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="11" r="1" fill={tokens.mutedText} />
        <circle cx="12" cy="11" r="1" fill={tokens.mutedText} />
        <circle cx="15" cy="11" r="1" fill={tokens.mutedText} />
    </svg>
);

const GenerateIcon = ({ size = 26, animating }: { size?: number; animating: boolean }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: animating ? "chromify-spin 1.2s linear infinite" : "none" }}
    >
        <path d="M12 2L14 9L21 12L14 15L12 22L10 15L3 12L10 9L12 2Z" fill={tokens.primaryText} opacity="0.85" />
        <circle cx="12" cy="12" r="3.5" fill="none" stroke={tokens.primaryText} strokeWidth="1.2" opacity="0.25" />
    </svg>
);

/* ═══════════════════════════════════════════
   TOP STRIP
═══════════════════════════════════════════ */
function TopStrip() {
    const [chevronHover, setChevronHover] = useState(false);

    return (
        <div
            style={{
                width: "100%",
                maxWidth: 440,
                height: 78,
                borderRadius: 44,
                background: `linear-gradient(180deg, ${tokens.panelAccentTop} 0%, ${tokens.panel} 60%)`,
                boxShadow: `0 12px 20px ${tokens.shadowDark}, inset 0 -8px 18px rgba(255,255,255,0.9)`,
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: "0 18px",
            }}
        >
            {/* Glossy orb */}
            <div
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 35% 35%, #1E2426 0%, #0F1314 60%, rgba(255,255,255,0.05) 100%)",
                    boxShadow: "inset -6px -10px 18px rgba(255,255,255,0.9), 0 9px 18px rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    animation: "chromify-float 4s ease-in-out infinite",
                }}
            >
                <SparkIcon size={24} color="rgba(255,255,255,0.92)" />
            </div>

            {/* Date chip */}
            <div
                style={{
                    width: 68,
                    height: 56,
                    borderRadius: 12,
                    backgroundColor: "#DFE3E4",
                    border: "1px solid rgba(255,255,255,0.35)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "6px 8px",
                    flexShrink: 0,
                }}
            >
                <span style={{ fontSize: 11, fontWeight: 600, color: tokens.mutedText, lineHeight: 1.2 }}>Sun</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: tokens.primaryText, lineHeight: 1.2 }}>25</span>
            </div>

            {/* Spacer + center spark */}
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <FourPointSpark size={28} />
            </div>

            {/* Chevron circle */}
            <button
                aria-label="Navigate forward"
                onMouseEnter={() => setChevronHover(true)}
                onMouseLeave={() => setChevronHover(false)}
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "linear-gradient(180deg,#F1F2F2,#EEEFEE)",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: chevronHover
                        ? "0 14px 24px rgba(0,0,0,0.13), inset 0 2px 6px rgba(255,255,255,0.7)"
                        : "0 10px 18px rgba(0,0,0,0.08), inset 0 2px 6px rgba(255,255,255,0.7)",
                    transform: chevronHover ? "translateX(2px)" : "translateX(0)",
                    transition: "all 180ms ease-out",
                }}
            >
                <ArrowIcon size={18} />
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   LOCK PILL
═══════════════════════════════════════════ */
function LockPill() {
    const [locked, setLocked] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const lockedBg = "linear-gradient(180deg,#F7F7F8,#EDEFF0)";
    const unlockedBg = "linear-gradient(180deg,#F1FFF8,#DFF5EE)";

    return (
        <button
            onClick={() => setLocked(!locked)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={`Toggle lock — currently ${locked ? "Locked" : "Unlocked"}`}
            aria-pressed={!locked}
            style={{
                height: 68,
                borderRadius: 34,
                background: locked ? lockedBg : unlockedBg,
                border: "1px solid rgba(0,0,0,0.035)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 20px",
                boxShadow: isHovered
                    ? "0 14px 24px rgba(0,0,0,0.11), inset 0 -6px 12px rgba(255,255,255,0.9)"
                    : "0 10px 18px rgba(0,0,0,0.08), inset 0 -6px 12px rgba(255,255,255,0.9)",
                transition: "all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                transform: isHovered ? "translateY(-1px)" : "none",
                minWidth: 0,
                flex: "1 1 auto",
            }}
        >
            <LockIcon locked={locked} size={22} />
            <span
                style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: locked ? tokens.mutedText : "#2C8F7B",
                    whiteSpace: "nowrap",
                    transition: "color 300ms ease",
                }}
            >
                {locked ? "Locked" : "Unlocked"}
            </span>
        </button>
    );
}

/* ═══════════════════════════════════════════
   ACCENT KNOB
═══════════════════════════════════════════ */
function AccentKnob() {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            aria-label="Open chat"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "radial-gradient(circle at 40% 38%, #F8F8F8 0%, #CFCFCF 60%, #A7A9AA 100%)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: hovered
                    ? "0 14px 24px rgba(0,0,0,0.17), inset 0 6px 8px rgba(255,255,255,0.9)"
                    : "0 10px 18px rgba(0,0,0,0.12), inset 0 6px 8px rgba(255,255,255,0.9)",
                transform: hovered ? "scale(1.06) rotate(8deg)" : "scale(1) rotate(0deg)",
                transition: "all 220ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
        >
            <ChatDotIcon size={22} />
        </button>
    );
}

/* ═══════════════════════════════════════════
   CTA — GENERATE BUTTON
═══════════════════════════════════════════ */
function GenerateButton() {
    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();
        setRipples((prev) => [...prev, { id, x, y }]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);

        setAnimating(true);
        setTimeout(() => setAnimating(false), 1400);
    };

    const shadow = pressed
        ? "0 8px 14px rgba(6,10,10,0.08), inset 0 -2px 6px rgba(0,0,0,0.04)"
        : hovered
            ? "0 28px 40px rgba(6,10,10,0.18), inset 0 -6px 20px rgba(255,255,255,0.7)"
            : "0 22px 30px rgba(6,10,10,0.12), inset 0 -6px 20px rgba(255,255,255,0.7)";

    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setHovered(false); setPressed(false); }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onClick={handleClick}
            aria-label="Generate"
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                maxWidth: 440,
                height: 110,
                borderRadius: 56,
                background: `linear-gradient(180deg, ${tokens.ctaTop} 0%, ${tokens.ctaBottom} 100%)`,
                border: "1px solid rgba(0,0,0,0.04)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                boxShadow: shadow,
                transform: pressed
                    ? "translateY(1px) scale(0.998)"
                    : hovered
                        ? "translateY(-4px)"
                        : "translateY(0)",
                transition: "transform 160ms ease-out, box-shadow 160ms ease-out",
            }}
        >
            {/* Shimmer overlay */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 56,
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)",
                    backgroundSize: "400px 100%",
                    animation: hovered ? "shimmer 1.4s infinite linear" : "none",
                    pointerEvents: "none",
                }}
            />

            {/* Ripples */}
            {ripples.map((r) => (
                <span
                    key={r.id}
                    style={{
                        position: "absolute",
                        left: r.x,
                        top: r.y,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "rgba(44,143,123,0.28)",
                        transform: "translate(-50%,-50%) scale(0)",
                        animation: "chromify-ripple 700ms ease-out forwards",
                        pointerEvents: "none",
                    }}
                />
            ))}

            <GenerateIcon size={28} animating={animating} />

            <span
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: tokens.primaryText,
                    letterSpacing: 0.2,
                    userSelect: "none",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                Generate
            </span>
        </button>
    );
}

/* ═══════════════════════════════════════════
   ROOT: ChromifyControls
═══════════════════════════════════════════ */
export default function SmoothButton() {
    return (
        <div
            style={{
                fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                background: tokens.bg,
                minHeight: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
            }}
        >
            {/* Artboard */}
            <div
                style={{
                    width: "100%",
                    maxWidth: 480,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 28,
                }}
            >
                {/* TOP STRIP */}
                <TopStrip />

                {/* MIDDLE ROW: Lock pill + Accent knob */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: 440,
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    <LockPill />
                    <AccentKnob />
                </div>

                {/* PRIMARY CTA */}
                <GenerateButton />

                {/* Footer label */}
                <span
                    style={{
                        fontSize: 13,
                        color: "#B7B9BA",
                        userSelect: "none",
                        letterSpacing: 0.4,
                    }}
                >
                    Chromify UI©
                </span>
            </div>
        </div>
    );
}