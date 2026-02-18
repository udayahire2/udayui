"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Mic, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Claude AI-style input component
 * Based on Anthropic's Claude interface design with horizontal layout
 */

interface ClaudeInputProps {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    onModelSelect?: (model: string) => void;
    selectedModel?: string;
}

const ClaudeInput = ({
    onSend,
    placeholder = "How can I help you today?",
    disabled = false,
    className,
    onModelSelect,
    selectedModel = "Sonnet 4.5 Extended",
}: ClaudeInputProps) => {
    const [message, setMessage] = React.useState("");
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    React.useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    }, [message]);

    const handleSend = () => {
        if (message.trim() && onSend) {
            onSend(message.trim());
            setMessage("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const hasContent = message.trim().length > 0;

    return (
        <div className={cn("w-full max-w-4xl mx-auto px-4 py-8", className)}>
            {/* Input Container */}
            <div
                className={cn(
                    "relative flex items-center gap-4 rounded-[20px] p-4 transition-all duration-300",
                    "bg-gradient-to-r from-background via-secondary/40 to-background dark:from-zinc-900/90 dark:via-zinc-800/50 dark:to-zinc-900/90",
                    "border border-border/50 hover:border-border/70",
                    "focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/15"
                )}
            >
                {/* Plus Button (Left) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-lg shrink-0 hover:bg-slate-700/40 text-slate-400 hover:text-slate-200 transition-all duration-200"
                    disabled={disabled}
                    aria-label="Add attachment"
                >
                    <Plus className="h-6 w-6" />
                </Button>

                {/* Textarea (Center) */}
                <div className="flex-1 flex items-center">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full max-h-[200px] min-h-[56px] resize-none border-0 bg-transparent dark:bg-transparent px-0 py-3 text-base font-medium focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-500 dark:placeholder:text-slate-400 leading-relaxed transition-all selection:bg-blue-500/30 shadow-none text-slate-100"
                        rows={1}
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* Model Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-11 px-3 rounded-lg hover:bg-slate-700/40 text-slate-300 hover:text-slate-100 transition-all duration-200 flex items-center gap-2"
                                disabled={disabled}
                            >
                                <span className="text-sm font-medium">{selectedModel}</span>
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                                onClick={() => onModelSelect?.("Sonnet 4.5 Extended")}
                                className="cursor-pointer"
                            >
                                Sonnet 4.5 Extended
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onModelSelect?.("Claude 3.5 Sonnet")}
                                className="cursor-pointer"
                            >
                                Claude 3.5 Sonnet
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onModelSelect?.("Claude 3 Opus")}
                                className="cursor-pointer"
                            >
                                Claude 3 Opus
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Voice Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-lg hover:bg-slate-700/40 text-slate-400 hover:text-slate-200 transition-all duration-200"
                        disabled={disabled}
                        aria-label="Voice input"
                    >
                        <Mic className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Helper text */}
            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                AI can make mistakes. Verify important information.
            </p>
        </div>
    );
};

export { ClaudeInput };
export default ClaudeInput;