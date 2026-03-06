"use client"

import * as React from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import gsap from "gsap"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════
   GLSL SHADERS
   Two-tone liquid wave effect driven by uTime uniform.
   ═══════════════════════════════════════════════════════════ */

const FRAGMENT_SHADER = /* glsl */ `
uniform float uTime;
uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    float wave1 = sin(uv.x * 6.0 + uTime * 1.5) * cos(uv.y * 6.0 + uTime) * 0.5 + 0.5;
    float wave2 = sin(uv.x * 4.0 - uTime * 1.2) * cos(uv.y * 8.0 + uTime * 0.8) * 0.5 + 0.5;

    float mixWave = (wave1 + wave2) / 2.0;
    float specular = smoothstep(0.7, 1.0, mixWave) * 0.4;

    vec3 baseColor = mix(uColor1, uColor2, mixWave);
    vec3 finalColor = baseColor + vec3(specular);

    gl_FragColor = vec4(finalColor, 1.0);
}
`

const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

/* ═══════════════════════════════════════════════════════════
   LIQUID PLANE (R3F internal mesh)
   Fills the Canvas viewport with the animated shader.
   ═══════════════════════════════════════════════════════════ */

function LiquidPlane({
    color1,
    color2,
    disabled,
}: {
    color1: string
    color2: string
    disabled?: boolean
}) {
    const materialRef = React.useRef<THREE.ShaderMaterial>(null)
    const { viewport } = useThree()

    const uniforms = React.useMemo(
        () => ({
            uTime: { value: 0 },
            uColor1: { value: new THREE.Color(color1).convertSRGBToLinear() },
            uColor2: { value: new THREE.Color(color2).convertSRGBToLinear() },
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps -- stable ref, updated via useEffect
        [],
    )

    useFrame((state) => {
        if (materialRef.current && !disabled) {
            materialRef.current.uniforms.uTime.value =
                state.clock.elapsedTime * 0.6
        }
    })

    React.useEffect(() => {
        if (!materialRef.current) return
        materialRef.current.uniforms.uColor1.value.copy(
            new THREE.Color(color1).convertSRGBToLinear(),
        )
        materialRef.current.uniforms.uColor2.value.copy(
            new THREE.Color(color2).convertSRGBToLinear(),
        )
    }, [color1, color2])

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={VERTEX_SHADER}
                fragmentShader={FRAGMENT_SHADER}
                uniforms={uniforms}
            />
        </mesh>
    )
}

/* ═══════════════════════════════════════════════════════════
   THEME HELPERS
   Resolve light / dark / disabled colour pairs.
   ═══════════════════════════════════════════════════════════ */

interface ColorConfig {
    lightActiveColor1: string
    lightActiveColor2: string
    darkActiveColor1: string
    darkActiveColor2: string
    disabledColor1: string
    disabledColor2: string
}

const DEFAULT_COLORS: ColorConfig = {
    lightActiveColor1: "#e2e8f0",
    lightActiveColor2: "#f8fafc",
    darkActiveColor1: "#0f172a",
    darkActiveColor2: "#1e293b",
    disabledColor1: "#e4e4e7",
    disabledColor2: "#f4f4f5",
}

function useResolvedColors(
    isDark: boolean,
    disabled: boolean | undefined,
    config: ColorConfig,
) {
    const actualDisabled1 = isDark ? "#27272a" : config.disabledColor1
    const actualDisabled2 = isDark ? "#3f3f46" : config.disabledColor2

    const color1 = disabled
        ? actualDisabled1
        : isDark
            ? config.darkActiveColor1
            : config.lightActiveColor1

    const color2 = disabled
        ? actualDisabled2
        : isDark
            ? config.darkActiveColor2
            : config.lightActiveColor2

    return { color1, color2 }
}

/* ═══════════════════════════════════════════════════════════
   LIQUID GLASSY BUTTON
   GPU-accelerated glassmorphism button with liquid shader
   background, GSAP cursor-glow, and theme awareness.
   ═══════════════════════════════════════════════════════════ */

interface LiquidGlassyButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<ColorConfig> {
    children?: React.ReactNode
}

function LiquidGlassyButton({
    className,
    children,
    disabled,
    ref,

    lightActiveColor1 = DEFAULT_COLORS.lightActiveColor1,
    lightActiveColor2 = DEFAULT_COLORS.lightActiveColor2,
    darkActiveColor1 = DEFAULT_COLORS.darkActiveColor1,
    darkActiveColor2 = DEFAULT_COLORS.darkActiveColor2,
    disabledColor1 = DEFAULT_COLORS.disabledColor1,
    disabledColor2 = DEFAULT_COLORS.disabledColor2,

    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    ...props
}: LiquidGlassyButtonProps & { ref?: React.Ref<HTMLButtonElement> }) {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const glowRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const isDark =
        mounted &&
        (resolvedTheme === "dark" ||
            document.documentElement.classList.contains("dark"))

    const { color1, color2 } = useResolvedColors(isDark, disabled, {
        lightActiveColor1,
        lightActiveColor2,
        darkActiveColor1,
        darkActiveColor2,
        disabledColor1,
        disabledColor2,
    })

    /* ── Ref merging ── */

    const mergedRef = (node: HTMLButtonElement) => {
        buttonRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    }

    /* ── GSAP cursor-glow handlers ── */

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || !glowRef.current || disabled) return

        const rect = buttonRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(glowRef.current, {
            x: x - rect.width / 2,
            y: y - rect.height / 2,
            duration: 0.7,
            ease: "power3.out",
        })

        onMouseMove?.(e)
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!glowRef.current || disabled) return

        gsap.to(glowRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
        })

        onMouseEnter?.(e)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!glowRef.current || disabled) return

        gsap.to(glowRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
        })

        onMouseLeave?.(e)
    }

    /* ── Render ── */

    return (
        <button
            ref={mergedRef}
            data-slot="liquid-glassy-button"
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative flex items-center justify-center overflow-hidden rounded-full",
                "bg-white/10 dark:bg-black/10 backdrop-blur-xl",
                "border border-white/40 dark:border-white/10",
                "transition-all duration-500",
                !disabled &&
                "hover:scale-[1.05] active:scale-[0.95] cursor-pointer",
                disabled && "opacity-60 cursor-not-allowed",
                className,
            )}
            {...props}
        >
            {/* Liquid shader background */}
            <div
                data-slot="liquid-glassy-button-canvas"
                className="absolute inset-0 pointer-events-none rounded-full overflow-hidden"
            >
                {mounted && (
                    <Canvas
                        orthographic
                        camera={{ zoom: 100 }}
                        dpr={[1, 2]}
                        className="w-full h-full"
                    >
                        <LiquidPlane
                            color1={color1}
                            color2={color2}
                            disabled={disabled}
                        />
                    </Canvas>
                )}
            </div>

            {/* Cursor glow */}
            <div
                ref={glowRef}
                data-slot="liquid-glassy-button-glow"
                className="absolute left-1/2 top-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] opacity-0 scale-50 mix-blend-overlay"
                style={{
                    background: isDark
                        ? "radial-gradient(circle, rgba(56,189,248,0.5) 0%, rgba(34,211,238,0) 50%)"
                        : "radial-gradient(circle, rgba(56,189,248,0.7) 0%, rgba(34,211,238,0) 50%)",
                }}
            />

            {/* Glass inner border */}
            <div
                data-slot="liquid-glassy-button-border"
                className="absolute inset-0 rounded-full border-[1.5px] border-white/20 dark:border-white/10 pointer-events-none"
            />

            {/* Content */}
            <div
                data-slot="liquid-glassy-button-content"
                className={cn(
                    "relative z-10 font-medium transition-colors",
                    disabled
                        ? isDark
                            ? "text-slate-500"
                            : "text-slate-400"
                        : isDark
                            ? "text-white"
                            : "text-slate-900",
                )}
            >
                {children}
            </div>
        </button>
    )
}

LiquidGlassyButton.displayName = "LiquidGlassyButton"

/* ═══════════════════════════════════════════════════════════
   EXPORTS
   ═══════════════════════════════════════════════════════════ */

export { LiquidGlassyButton }
export type { LiquidGlassyButtonProps }