"use client"

import * as React from "react"
import { ArrowUp, Plus, ChevronDown, Globe, Zap, Brain, Cpu, Rabbit } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Model {
    id: string
    label: string
    description: string
    badge?: string
    badgeVariant?: "new" | "fast" | "powerful"
    Icon: React.ElementType
    group: "latest" | "legacy"
}

interface ClaudeInputProps {
    onSend?: (message: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    onModelSelect?: (model: string) => void
    selectedModel?: string
}

// ─── Model Registry ───────────────────────────────────────────────────────────

const MODELS: Model[] = [
    {
        id: "Claude Sonnet 4.5",
        label: "Claude Sonnet 4.5",
        description: "Most intelligent",
        badge: "Latest",
        badgeVariant: "new",
        Icon: Brain,
        group: "latest",
    },
    {
        id: "Claude 3.5 Sonnet",
        label: "Claude 3.5 Sonnet",
        description: "Balanced & capable",
        badge: "Fast",
        badgeVariant: "fast",
        Icon: Zap,
        group: "latest",
    },
    {
        id: "Claude 3 Opus",
        label: "Claude 3 Opus",
        description: "Research & reasoning",
        Icon: Cpu,
        group: "legacy",
    },
    {
        id: "Claude 3 Haiku",
        label: "Claude 3 Haiku",
        description: "Lightweight & quick",
        badge: "Efficient",
        badgeVariant: "fast",
        Icon: Rabbit,
        group: "legacy",
    },
]

// ─── Waveform SVG ─────────────────────────────────────────────────────────────

const WaveformIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="18"
        viewBox="0 0 21 19"
        fill="none"
        aria-hidden="true"
        className={className}
    >
        <path
            d="M0.5 7.5V10.5M4.5 3.5V14.5M8.5 0.5V18.5M12.5 5.5V12.5M16.5 2.5V15.5M20.5 7.5V10.5"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

// ─── Badge variant map ────────────────────────────────────────────────────────

const badgeClasses: Record<string, string> = {
    new: "bg-[oklch(0.85_0.08_145/30%)] text-[oklch(0.38_0.10_145)] dark:bg-[oklch(0.32_0.08_145/35%)] dark:text-[oklch(0.78_0.12_145)]",
    fast: "bg-[oklch(0.87_0.07_230/30%)] text-[oklch(0.38_0.10_230)] dark:bg-[oklch(0.28_0.07_230/35%)] dark:text-[oklch(0.75_0.12_230)]",
    powerful: "bg-[oklch(0.85_0.08_290/30%)] text-[oklch(0.40_0.10_290)] dark:bg-[oklch(0.28_0.08_290/35%)] dark:text-[oklch(0.74_0.12_290)]",
}

// ─── Model Indicator dot color per group ─────────────────────────────────────

const modelDotColor: Record<Model["group"], string> = {
    latest: "bg-[oklch(0.55_0.14_145)]",
    legacy: "bg-[oklch(0.60_0.06_230)]",
}

// ─── ModelDropdown ────────────────────────────────────────────────────────────

interface ModelDropdownProps {
    currentModel: Model
    disabled?: boolean
    onSelect: (model: Model) => void
}

const ModelDropdown = ({ currentModel, disabled, onSelect }: ModelDropdownProps) => {
    const [open, setOpen] = React.useState(false)
    const [focusedIdx, setFocusedIdx] = React.useState<number>(-1)

    const containerRef = React.useRef<HTMLDivElement>(null)
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([])

    // ── Outside click ──
    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)
    }, [])

    // ── Focus management ──
    React.useEffect(() => {
        if (open) {
            const idx = MODELS.findIndex((m) => m.id === currentModel.id)
            setFocusedIdx(idx >= 0 ? idx : 0)
        } else {
            setFocusedIdx(-1)
        }
    }, [open, currentModel.id])

    React.useEffect(() => {
        if (open && focusedIdx >= 0) {
            itemRefs.current[focusedIdx]?.focus()
        }
    }, [focusedIdx, open])

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!open) {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
            }
            return
        }
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault()
                setFocusedIdx((i) => Math.min(i + 1, MODELS.length - 1))
                break
            case "ArrowUp":
                e.preventDefault()
                setFocusedIdx((i) => Math.max(i - 1, 0))
                break
            case "Home":
                e.preventDefault()
                setFocusedIdx(0)
                break
            case "End":
                e.preventDefault()
                setFocusedIdx(MODELS.length - 1)
                break
            case "Enter":
            case " ":
                e.preventDefault()
                if (focusedIdx >= 0) {
                    onSelect(MODELS[focusedIdx])
                    setOpen(false)
                    buttonRef.current?.focus()
                }
                break
            case "Escape":
                e.preventDefault()
                setOpen(false)
                buttonRef.current?.focus()
                break
        }
    }

    const latestGroup = MODELS.filter((m) => m.group === "latest")
    const legacyGroup = MODELS.filter((m) => m.group === "legacy")

    return (
        <div className="relative" ref={containerRef} onKeyDown={handleKeyDown}>
            {/* ── Trigger button ── */}
            <button
                ref={buttonRef}
                type="button"
                disabled={disabled}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-label={`Model: ${currentModel.label}`}
                className={cn(
                    "flex h-8 items-center gap-1.5 rounded-lg px-2.5",
                    "text-[12px] font-medium tracking-[-0.01em]",
                    "border transition-all duration-150",
                    open
                        ? [
                            "bg-[oklch(0.90_0.012_80)] dark:bg-[oklch(1_0_0/10%)]",
                            "border-[oklch(0.80_0.016_80)] dark:border-[oklch(1_0_0/18%)]",
                            "text-foreground",
                        ]
                        : [
                            "bg-[oklch(0.94_0.008_80)] dark:bg-[oklch(1_0_0/7%)]",
                            "border-[oklch(0.87_0.012_80)] dark:border-[oklch(1_0_0/10%)]",
                            "text-[oklch(0.38_0_0)] dark:text-[oklch(0.72_0_0)]",
                            "hover:bg-[oklch(0.90_0.012_80)] dark:hover:bg-[oklch(1_0_0/10%)]",
                            "hover:border-[oklch(0.80_0.016_80)] dark:hover:border-[oklch(1_0_0/18%)]",
                            "hover:text-foreground",
                        ],
                    "disabled:pointer-events-none disabled:opacity-30"
                )}
            >
                {/* model indicator dot */}
                <span
                    className={cn(
                        "inline-block h-1.5 w-1.5 rounded-full flex-shrink-0",
                        modelDotColor[currentModel.group]
                    )}
                />
                <span className="max-w-[110px] truncate">{currentModel.label}</span>
                <ChevronDown
                    className={cn(
                        "h-3 w-3 flex-shrink-0 transition-transform duration-200",
                        open && "rotate-180"
                    )}
                    strokeWidth={2.5}
                />
            </button>

            {/* ── Dropdown panel ── */}
            {open && (
                <div
                    role="listbox"
                    aria-label="Select model"
                    aria-activedescendant={focusedIdx >= 0 ? `model-opt-${focusedIdx}` : undefined}
                    className={cn(
                        "absolute bottom-full right-0 mb-2 z-50",
                        "w-64 overflow-hidden",
                        "rounded-xl",
                        "border border-[oklch(0.88_0.010_80)] dark:border-[oklch(1_0_0/10%)]",
                        "bg-[oklch(0.995_0.004_80)] dark:bg-[oklch(0.16_0_0)]",
                        "shadow-[0_12px_32px_oklch(0_0_0/14%),0_2px_6px_oklch(0_0_0/8%)]",
                        // entrance animation via keyframe defined in globals
                        "animate-dropdown-in"
                    )}
                >
                    {/* Latest group */}
                    <ModelGroup
                        label="Latest"
                        models={latestGroup}
                        allModels={MODELS}
                        currentModel={currentModel}
                        focusedIdx={focusedIdx}
                        itemRefs={itemRefs}
                        onSelect={(m) => {
                            onSelect(m)
                            setOpen(false)
                            buttonRef.current?.focus()
                        }}
                    />

                    {/* Divider */}
                    <div className="mx-3 h-px bg-[oklch(0.90_0.006_80)] dark:bg-[oklch(1_0_0/6%)]" />

                    {/* Legacy group */}
                    <ModelGroup
                        label="Previous"
                        models={legacyGroup}
                        allModels={MODELS}
                        currentModel={currentModel}
                        focusedIdx={focusedIdx}
                        itemRefs={itemRefs}
                        onSelect={(m) => {
                            onSelect(m)
                            setOpen(false)
                            buttonRef.current?.focus()
                        }}
                    />

                    {/* Footer hint */}
                    <div className="px-3 py-2 border-t border-[oklch(0.92_0.006_80)] dark:border-[oklch(1_0_0/6%)]">
                        <p className="text-[10.5px] text-muted-foreground/40 dark:text-muted-foreground/30 select-none">
                            ↑↓ to navigate · Enter to select · Esc to close
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── ModelGroup ───────────────────────────────────────────────────────────────

interface ModelGroupProps {
    label: string
    models: Model[]
    allModels: Model[]
    currentModel: Model
    focusedIdx: number
    itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
    onSelect: (model: Model) => void
}

const ModelGroup = ({
    label,
    models,
    allModels,
    currentModel,
    focusedIdx,
    itemRefs,
    onSelect,
}: ModelGroupProps) => (
    <div className="py-1.5">
        <p className="px-3 pb-1 pt-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/40 dark:text-muted-foreground/30 select-none">
            {label}
        </p>
        {models.map((model) => {
            const globalIdx = allModels.findIndex((m) => m.id === model.id)
            const isActive = model.id === currentModel.id
            const isFocused = globalIdx === focusedIdx

            return (
                <button
                    key={model.id}
                    id={`model-opt-${globalIdx}`}
                    ref={(el) => { itemRefs.current[globalIdx] = el }}
                    role="option"
                    aria-selected={isActive}
                    type="button"
                    tabIndex={isFocused ? 0 : -1}
                    onClick={() => onSelect(model)}
                    className={cn(
                        "flex w-full items-start gap-2.5 px-3 py-2 text-left",
                        "transition-colors duration-100 outline-none",
                        isActive
                            ? "bg-[oklch(0.91_0.012_80)] dark:bg-[oklch(1_0_0/8%)]"
                            : "hover:bg-[oklch(0.95_0.006_80)] dark:hover:bg-[oklch(1_0_0/5%)]",
                        isFocused && !isActive && "bg-[oklch(0.95_0.006_80)] dark:bg-[oklch(1_0_0/5%)]"
                    )}
                >
                    {/* Model icon */}
                    <span
                        className={cn(
                            "mt-px flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md",
                            isActive
                                ? "bg-[oklch(0.20_0_0)] dark:bg-[oklch(0.90_0_0)] text-white dark:text-[oklch(0.14_0_0)]"
                                : "bg-[oklch(0.91_0.008_80)] dark:bg-[oklch(1_0_0/8%)] text-muted-foreground"
                        )}
                    >
                        <model.Icon className="h-3 w-3" strokeWidth={2} />
                    </span>

                    {/* Label + description */}
                    <span className="flex min-w-0 flex-col gap-px">
                        <span
                            className={cn(
                                "flex items-center gap-1.5 text-[12.5px] leading-snug tracking-[-0.01em]",
                                isActive
                                    ? "font-semibold text-foreground"
                                    : "font-medium text-foreground/80"
                            )}
                        >
                            {model.label}
                            {model.badge && (
                                <span
                                    className={cn(
                                        "inline-flex items-center rounded-[4px] px-1 py-px text-[9.5px] font-semibold uppercase tracking-[0.05em] leading-none",
                                        model.badgeVariant
                                            ? badgeClasses[model.badgeVariant]
                                            : badgeClasses.powered
                                    )}
                                >
                                    {model.badge}
                                </span>
                            )}
                        </span>
                        <span className="text-[11px] text-muted-foreground/55 dark:text-muted-foreground/40 leading-snug">
                            {model.description}
                        </span>
                    </span>

                    {/* Active check */}
                    {isActive && (
                        <span className="ml-auto mt-1.5 flex-shrink-0">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 6l3 3 5-5"
                                    stroke="currentColor"
                                    strokeWidth={1.8}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-[oklch(0.38_0_0)] dark:text-[oklch(0.80_0_0)]"
                                />
                            </svg>
                        </span>
                    )}
                </button>
            )
        })}
    </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const ClaudeInput = ({
    onSend,
    placeholder = "How can I help you today?",
    disabled = false,
    className,
    onModelSelect,
    selectedModel = "Claude Sonnet 4.5",
}: ClaudeInputProps) => {
    const initialModel = MODELS.find((m) => m.id === selectedModel) ?? MODELS[0]
    const [message, setMessage] = React.useState("")
    const [currentModel, setCurrentModel] = React.useState<Model>(initialModel)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    // Auto-resize textarea
    React.useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = "auto"
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
        }
    }, [message])

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend?.(message.trim())
            setMessage("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleModelSelect = (model: Model) => {
        setCurrentModel(model)
        onModelSelect?.(model.id)
    }

    const hasContent = message.trim().length > 0

    return (
        <>
            {/* ── Dropdown animation keyframe injected inline ── */}
            <style>{`
                @keyframes dropdown-in {
                    from { opacity: 0; transform: scale(0.95) translateY(4px); }
                    to   { opacity: 1; transform: scale(1)    translateY(0); }
                }
                .animate-dropdown-in {
                    animation: dropdown-in 0.14s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    transform-origin: bottom right;
                }
            `}</style>

            {/* ── Outer stage ── */}
            <div
                className={cn(
                    "flex min-h-screen w-full items-center justify-center p-6",
                    "bg-[oklch(0.975_0.005_80)] dark:bg-[oklch(0.10_0_0)]",
                    className
                )}
            >
                <div className="w-full max-w-2xl space-y-2.5">

                    {/* ── Main card ── */}
                    <div
                        className={cn(
                            "relative flex flex-col rounded-[var(--radius-2xl)] transition-[border-color,box-shadow] duration-200",
                            "bg-[oklch(0.995_0.004_80)] dark:bg-[oklch(0.155_0_0)]",
                            "border border-[oklch(0.88_0.012_80)] dark:border-[oklch(1_0_0/8%)]",
                            "shadow-[0_1px_3px_oklch(0_0_0/6%),0_4px_12px_oklch(0_0_0/4%)]",
                            "hover:border-[oklch(0.82_0.014_80)] dark:hover:border-[oklch(1_0_0/14%)]",
                            "hover:shadow-[0_2px_8px_oklch(0_0_0/8%),0_8px_20px_oklch(0_0_0/5%)]",
                            "focus-within:border-[oklch(0.75_0.018_80)] dark:focus-within:border-[oklch(1_0_0/20%)]",
                            "focus-within:shadow-[0_0_0_3px_oklch(0.75_0.018_80/12%),0_2px_8px_oklch(0_0_0/6%)]"
                        )}
                    >
                        {/* ── Textarea ── */}
                        <div className="px-4 pt-4 pb-3">
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={placeholder}
                                disabled={disabled}
                                rows={1}
                                className={cn(
                                    "w-full resize-none bg-transparent",
                                    "text-[15px] font-normal leading-[1.6] tracking-[-0.01em]",
                                    "text-foreground",
                                    "placeholder:text-muted-foreground/60 dark:placeholder:text-muted-foreground/40",
                                    "focus:outline-none focus:ring-0 border-none",
                                    "min-h-[44px] max-h-[200px]",
                                    "disabled:cursor-not-allowed disabled:opacity-40",
                                    "transition-opacity duration-150"
                                )}
                            />
                        </div>

                        {/* ── Divider ── */}
                        <div className="mx-4 h-px bg-[oklch(0.90_0.008_80)] dark:bg-[oklch(1_0_0/6%)]" />

                        {/* ── Toolbar ── */}
                        <div className="flex items-center justify-between px-3 py-2.5 gap-2">

                            {/* Left: action pills */}
                            <div className="flex items-center gap-0.5">
                                {/* Attach */}
                                <button
                                    type="button"
                                    disabled={disabled}
                                    aria-label="Attach file"
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-lg",
                                        "text-muted-foreground/70",
                                        "transition-all duration-150",
                                        "hover:bg-[oklch(0.91_0.010_80)] dark:hover:bg-[oklch(1_0_0/6%)]",
                                        "hover:text-foreground",
                                        "disabled:pointer-events-none disabled:opacity-30"
                                    )}
                                >
                                    <Plus className="h-[17px] w-[17px]" strokeWidth={2} />
                                </button>

                                {/* Web search pill */}
                                <button
                                    type="button"
                                    disabled={disabled}
                                    aria-label="Search the web"
                                    className={cn(
                                        "flex h-8 items-center gap-1.5 rounded-lg px-2.5",
                                        "text-[12.5px] font-medium tracking-[-0.01em]",
                                        "text-muted-foreground/70",
                                        "transition-all duration-150",
                                        "hover:bg-[oklch(0.91_0.010_80)] dark:hover:bg-[oklch(1_0_0/6%)]",
                                        "hover:text-foreground",
                                        "disabled:pointer-events-none disabled:opacity-30"
                                    )}
                                >
                                    <Globe className="h-[14px] w-[14px]" strokeWidth={2} />
                                    <span>Search</span>
                                </button>
                            </div>

                            {/* Right: model picker · mic · send */}
                            <div className="flex items-center gap-1.5">

                                {/* ── Model selector ── */}
                                <ModelDropdown
                                    currentModel={currentModel}
                                    disabled={disabled}
                                    onSelect={handleModelSelect}
                                />

                                {/* ── Mic ── */}
                                <button
                                    type="button"
                                    disabled={disabled}
                                    aria-label="Voice input"
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-lg",
                                        "text-muted-foreground/60",
                                        "transition-all duration-150",
                                        "hover:bg-[oklch(0.91_0.010_80)] dark:hover:bg-[oklch(1_0_0/6%)]",
                                        "hover:text-foreground",
                                        "disabled:pointer-events-none disabled:opacity-30"
                                    )}
                                >
                                    <WaveformIcon className="h-[18px] w-[18px]" />
                                </button>

                                {/* ── Send ── */}
                                <button
                                    type="button"
                                    disabled={disabled || !hasContent}
                                    onClick={handleSend}
                                    aria-label="Send message"
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-full",
                                        "transition-all duration-200",
                                        hasContent
                                            ? [
                                                "bg-[oklch(0.20_0_0)] dark:bg-[oklch(0.93_0_0)]",
                                                "text-white dark:text-[oklch(0.12_0_0)]",
                                                "shadow-[0_1px_4px_oklch(0_0_0/20%)]",
                                                "hover:bg-[oklch(0.28_0_0)] dark:hover:bg-[oklch(1_0_0)]",
                                                "hover:shadow-[0_2px_8px_oklch(0_0_0/25%)]",
                                                "active:scale-95",
                                            ]
                                            : [
                                                "bg-[oklch(0.90_0.008_80)] dark:bg-[oklch(1_0_0/7%)]",
                                                "text-muted-foreground/40",
                                                "cursor-not-allowed",
                                            ]
                                    )}
                                >
                                    <ArrowUp className="h-[15px] w-[15px]" strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Disclaimer ── */}
                    <p className={cn(
                        "text-center",
                        "text-[11px] font-normal leading-normal tracking-[0.01em]",
                        "text-muted-foreground/45 dark:text-muted-foreground/30",
                        "select-none"
                    )}>
                        Claude can make mistakes. Please double-check responses.
                    </p>
                </div>
            </div>
        </>
    )
}

export { ClaudeInput }
export default ClaudeInput