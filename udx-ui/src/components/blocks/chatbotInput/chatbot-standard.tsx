"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Mic, AudioLines, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ChatGPT-style input component (Voice Mode UI)
 * Replicates the pill-shaped design with premium UI nuances
 */

interface ChatGPTInputProps {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const ChatGPTInput = ({
    onSend,
    placeholder = "Message ChatGPT",
    disabled = false,
    className,
}: ChatGPTInputProps) => {
    const [message, setMessage] = React.useState("");
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [isFocused, setIsFocused] = React.useState(false);

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
        <div className={cn("w-full max-w-3xl mx-auto px-4 py-6", className)}>
            <div
                className={cn(
                    "relative flex items-center gap-3.5 rounded-[20px] p-4 transition-all duration-300 ease-in-out",
                    "bg-gradient-to-r from-background via-secondary/50 to-background dark:from-zinc-900/80 dark:via-zinc-800/60 dark:to-zinc-900/80",
                    "border border-border/60 hover:border-border/80 backdrop-blur-sm",
                    isFocused && "border-blue-500/30 shadow-lg shadow-blue-500/10"
                )}
            >
                {/* Plus Button (Left) */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-11 w-11 rounded-full hover:bg-accent/60 text-muted-foreground hover:text-foreground transition-all duration-200 shrink-0 hover:scale-110 active:scale-95"
                            disabled={disabled}
                            aria-label="Add attachment"
                        >
                            <Plus className="h-6 w-6" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Add attachment</TooltipContent>
                </Tooltip>

                {/* Textarea */}
                <div className="flex-1 flex items-center py-0.5">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full max-h-[200px] min-h-0 resize-none border-0 bg-transparent dark:bg-transparent px-4 py-3 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 leading-relaxed transition-all selection:bg-blue-500/30 shadow-none"
                        rows={1}
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    {!hasContent ? (
                        <>
                            {/* Mic Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-11 w-11 rounded-full hover:bg-accent/60 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110 active:scale-95"
                                        disabled={disabled}
                                        aria-label="Voice input"
                                    >
                                        <Mic className="h-6 w-6" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs">Voice input</TooltipContent>
                            </Tooltip>

                            {/* Voice Mode Button (Blue) */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/40 border-0 transition-all duration-200 hover:scale-110 active:scale-95"
                                        disabled={disabled}
                                        aria-label="Start voice mode"
                                    >
                                        <AudioLines className="h-6 w-6" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs">Start Voice Mode</TooltipContent>
                            </Tooltip>
                        </>
                    ) : (
                        /* Send Button (appears when typing) */
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleSend}
                                    disabled={disabled}
                                    size="icon"
                                    className="h-11 w-11 rounded-full bg-gradient-to-br from-foreground to-foreground/80 text-background hover:from-foreground hover:to-foreground transition-all duration-200 shadow-lg hover:shadow-foreground/40 active:scale-95 hover:scale-110"
                                    aria-label="Send message"
                                >
                                    <ArrowUp className="h-6 w-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">Send message</TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="text-center mt-3">
                <p className="text-xs text-muted-foreground/60 font-medium">
                    AI can make mistakes. Verify important information.
                </p>
            </div>
        </div>
    );
};

export { ChatGPTInput };
export default ChatGPTInput;