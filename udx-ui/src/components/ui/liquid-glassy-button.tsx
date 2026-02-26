"use client";

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import gsap from "gsap";

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    
    // Smooth wavy distortion to simulate liquid
    float wave1 = sin(uv.x * 6.0 + uTime * 1.5) * cos(uv.y * 6.0 + uTime) * 0.5 + 0.5;
    float wave2 = sin(uv.x * 4.0 - uTime * 1.2) * cos(uv.y * 8.0 + uTime * 0.8) * 0.5 + 0.5;
    
    // Combine waves for a more complex liquid surface
    float mixWave = (wave1 + wave2) / 2.0;
    
    // Add an edge glow or specular highlight simulating glass
    float specular = smoothstep(0.7, 1.0, mixWave) * 0.4;
    
    // Mix the base liquid colors
    vec3 baseColor = mix(uColor1, uColor2, mixWave);
    
    // Add specular reflection
    vec3 finalColor = baseColor + vec3(specular);
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const LiquidPlane = ({
    color1,
    color2,
    disabled
}: {
    color1: string;
    color2: string;
    disabled?: boolean
}) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(color1).convertSRGBToLinear() },
        uColor2: { value: new THREE.Color(color2).convertSRGBToLinear() },
    }), [color1, color2]);

    // Update uniforms when colors change
    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uColor1.value.set(color1).convertSRGBToLinear();
            materialRef.current.uniforms.uColor2.value.set(color2).convertSRGBToLinear();
        }
    }, [color1, color2]);

    useFrame((state) => {
        if (materialRef.current && !disabled) {
            // Slower, elegant liquid movement
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.6;
        }
    });

    return (
        <mesh>
            {/* A plane that fills the viewport */}
            <planeGeometry args={[4, 4]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

export interface LiquidGlassyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    lightActiveColor1?: string;
    lightActiveColor2?: string;
    darkActiveColor1?: string;
    darkActiveColor2?: string;
    disabledColor1?: string;
    disabledColor2?: string;
}

export const LiquidGlassyButton = React.forwardRef<HTMLButtonElement, LiquidGlassyButtonProps>(
    ({
        className,
        children,
        disabled,
        // Premium Light Mode Liquid Base
        lightActiveColor1 = "#e2e8f0", // Soft Slate-200
        lightActiveColor2 = "#f8fafc", // Airy Slate-50
        // Premium Dark Mode Liquid Base
        darkActiveColor1 = "#0f172a", // Deep Slate-900
        darkActiveColor2 = "#1e293b", // Slate-800
        disabledColor1 = "#e4e4e7",
        disabledColor2 = "#f4f4f5",
        onMouseMove,
        onMouseEnter,
        onMouseLeave,
        ...props
    }, ref) => {
        const { resolvedTheme } = useTheme();
        const [mounted, setMounted] = useState(false);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const glowRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setMounted(true);
        }, []);

        const isDark = mounted && (resolvedTheme === "dark" || document.documentElement.classList.contains('dark'));

        // Reassign disabled colors based on dark mode as well for better blending
        const actualDisabled1 = isDark ? "#27272a" : disabledColor1; // dark disabled (zinc-800)
        const actualDisabled2 = isDark ? "#3f3f46" : disabledColor2; // dark disabled lighter (zinc-700)

        const color1 = disabled ? actualDisabled1 : (isDark ? darkActiveColor1 : lightActiveColor1);
        const color2 = disabled ? actualDisabled2 : (isDark ? darkActiveColor2 : lightActiveColor2);

        // Merge internal and external refs
        const mergedRef = (node: HTMLButtonElement) => {
            // @ts-ignore
            buttonRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        };

        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!buttonRef.current || !glowRef.current || disabled) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(glowRef.current, {
                x: x - rect.width / 2,
                y: y - rect.height / 2,
                duration: 0.8,
                ease: "power3.out",
            });

            if (onMouseMove) onMouseMove(e);
        };

        const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!glowRef.current || disabled) return;
            gsap.to(glowRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
            });

            if (onMouseEnter) onMouseEnter(e);
        };

        const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!glowRef.current || disabled) return;
            gsap.to(glowRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power2.out",
            });

            if (onMouseLeave) onMouseLeave(e);
        };

        return (
            <button
                ref={mergedRef}
                disabled={disabled}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={cn(
                    "group relative flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 ease-out",
                    // The "Glassy" styling core
                    "bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/40 dark:border-white/10",
                    "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(0,0,0,0.2)]",
                    "dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.4)]",
                    !disabled && "hover:scale-[1.05] active:scale-[0.95] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] cursor-pointer hover:border-white/60 dark:hover:border-white/20",
                    disabled && "opacity-60 cursor-not-allowed",
                    className
                )}
                {...props}
            >
                <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden opacity-95">
                    {mounted && (
                        <Canvas camera={{ position: [0, 0, 1] }} className="rounded-full">
                            <LiquidPlane
                                color1={color1}
                                color2={color2}
                                disabled={disabled}
                            />
                        </Canvas>
                    )}
                </div>

                {/* GSAP Cursor Glow effect */}
                <div
                    ref={glowRef}
                    className="absolute left-1/2 top-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-0 scale-50 mix-blend-overlay"
                    style={{
                        background: isDark
                            ? 'radial-gradient(circle at center, rgba(56,189,248,0.5) 0%, rgba(45,212,191,0.3) 20%, rgba(34,211,238,0) 50%)'
                            : 'radial-gradient(circle at center, rgba(56,189,248,0.7) 0%, rgba(45,212,191,0.5) 20%, rgba(34,211,238,0) 50%)'
                    }}
                />

                {/* Additional Specular inner border to increase the "thick glass" feel */}
                <div className="absolute inset-0 rounded-full border-[1.5px] border-white/20 dark:border-white/10 pointer-events-none mix-blend-overlay shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)]" />

                {/* Content */}
                <div className={cn(
                    "relative z-10 transition-colors duration-500 drop-shadow-md",
                    disabled
                        ? (isDark ? "text-slate-500" : "text-slate-400")
                        : (isDark ? "text-slate-100" : "text-slate-800")
                )}>
                    {children}
                </div>
            </button>
        );
    }
);

LiquidGlassyButton.displayName = "LiquidGlassyButton";
