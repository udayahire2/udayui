"use client"

import * as React from "react"
import { ArrowUp, Plus, ChevronDown, Globe, Zap, Brain, Cpu, Rabbit } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

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
    new: "bg-primary/10 text-primary",
    fast: "bg-secondary text-secondary-foreground",
    powerful: "bg-accent text-accent-foreground",
}

// ─── Model Indicator dot color per group ─────────────────────────────────────

const modelDotColor: Record<Model["group"], string> = {
    latest: "bg-primary",
    legacy: "bg-muted-foreground",
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
                    "flex h-8 items-center gap-2 rounded-full px-3",
                    "text-[13px] font-medium transition-colors",
                    "text-muted-foreground/80 hover:bg-muted/80 hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    open && "bg-muted/80 text-foreground",
                    "disabled:pointer-events-none disabled:opacity-50"
                )}
            >
                {/* model indicator dot */}
                <span
                    className={cn(
                        "inline-block h-1.5 w-1.5 rounded-full shrink-0",
                        modelDotColor[currentModel.group]
                    )}
                />
                <span className="max-w-[110px] truncate">{currentModel.label}</span>
                <ChevronDown
                    className={cn(
                        "h-3 w-3 shrink-0 opacity-50",
                        open && "rotate-180"
                    )}
                />
            </button>

            {/* ── Dropdown panel ── */}
            {open && (
                <div
                    role="listbox"
                    aria-label="Select model"
                    aria-activedescendant={focusedIdx >= 0 ? `model-opt-${focusedIdx}` : undefined}
                    className={cn(
                        "absolute bottom-full right-0 mb-1 z-50",
                        "w-64 overflow-hidden rounded-md",
                        "border border-border bg-popover text-popover-foreground shadow-sm"
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
                    <div className="h-px bg-border mx-2" />

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
                    <div className="px-3 py-2 border-t border-border bg-muted/50">
                        <p className="text-[10px] text-muted-foreground select-none">
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
    <div className="py-1">
        <p className="px-3 py-1 text-xs font-semibold text-muted-foreground select-none">
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
                        "flex w-full items-start gap-2.5 px-3 py-1.5 text-left outline-none",
                        "hover:bg-accent hover:text-accent-foreground",
                        isFocused && !isActive && "bg-accent text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground font-medium"
                    )}
                >
                    {/* Model icon */}
                    <span
                        className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded",
                            isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}
                    >
                        <model.Icon className="h-3 w-3" />
                    </span>

                    {/* Label + description */}
                    <span className="flex min-w-0 flex-col">
                        <span className="flex items-center gap-1.5 text-sm">
                            {model.label}
                            {model.badge && (
                                <span
                                    className={cn(
                                        "inline-flex items-center rounded px-1 py-0.5 text-[10px] font-medium leading-none",
                                        model.badgeVariant ? badgeClasses[model.badgeVariant] : "bg-secondary text-secondary-foreground"
                                    )}
                                >
                                    {model.badge}
                                </span>
                            )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {model.description}
                        </span>
                    </span>

                    {/* Active check */}
                    {isActive && (
                        <span className="ml-auto mt-1 shrink-0">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
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
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
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
        <div
            className={cn(
                "flex w-full min-h-dvh items-center justify-center p-4",
                className
            )}
        >
            <div className="w-full max-w-2xl space-y-3">
                {/* ── Main card ── */}
                <div
                    className={cn(
                        "relative flex flex-col rounded-3xl bg-muted/40",
                        "border border-border/40 shadow-sm transition-all duration-200",
                        "focus-within:bg-background focus-within:border-border/60 focus-within:shadow-md"
                    )}
                >
                    {/* ── Textarea ── */}
                    <div className="px-4 pt-4">
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
                                "text-[15px] leading-relaxed text-foreground placeholder:text-muted-foreground/70",
                                "focus:outline-none border-none",
                                "min-h-[44px] max-h-[200px]",
                                "disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                        />
                    </div>

                    {/* ── Toolbar ── */}
                    <div className="flex items-center justify-between p-3 pt-2">

                        {/* Left: action pills */}
                        <div className="flex items-center gap-1.5">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        disabled={disabled}
                                        aria-label="Attach file"
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/80",
                                            "hover:bg-muted/80 hover:text-foreground transition-colors",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            "disabled:pointer-events-none disabled:opacity-50"
                                        )}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">Attach file</TooltipContent>
                            </Tooltip>

                            <button
                                type="button"
                                disabled={disabled}
                                aria-label="Search the web"
                                className={cn(
                                    "flex h-8 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground/80",
                                    "hover:bg-muted/80 hover:text-foreground transition-colors",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    "disabled:pointer-events-none disabled:opacity-50"
                                )}
                            >
                                <Globe className="h-4 w-4" />
                                <span>Search</span>
                            </button>
                        </div>

                        {/* Right: model picker · mic · send */}
                        <div className="flex items-center gap-1.5">
                            <ModelDropdown
                                currentModel={currentModel}
                                disabled={disabled}
                                onSelect={handleModelSelect}
                            />

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        disabled={disabled}
                                        aria-label="Voice input"
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground/80",
                                            "hover:bg-muted/80 hover:text-foreground transition-colors",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            "disabled:pointer-events-none disabled:opacity-50"
                                        )}
                                    >
                                        <WaveformIcon className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">Voice input</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        disabled={disabled || !hasContent}
                                        onClick={handleSend}
                                        aria-label="Send message"
                                        className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                                            hasContent
                                                ? "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
                                                : "bg-muted text-muted-foreground/50 cursor-not-allowed",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                            "disabled:opacity-50"
                                        )}
                                    >
                                        <ArrowUp className="h-4 w-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top">Send message</TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>

                {/* ── Disclaimer ── */}
                <p className="text-center text-xs text-muted-foreground/70 select-none">
                    Claude can make mistakes. Please double-check responses.
                </p>
            </div>
        </div>
    )
}

export { ClaudeInput }
export default ClaudeInput