"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * DeepSeek AI-style input component
 * Replicates DeepSeek's chat interface design
 */

interface DeepSeekInputProps {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const DeepSeekInput = ({
    onSend,
    placeholder = "Ask DeepSeek anything...",
    disabled = false,
    className,
}: DeepSeekInputProps) => {
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

    const canSend = message.trim().length > 0 && !disabled;

    return (
        <div className={cn("mx-auto w-full max-w-4xl px-4", className)}>
            <div className="relative flex items-end gap-3 rounded-md border border-border bg-background p-3 shadow-sm transition-colors focus-within:border-border/80 focus-within:ring-[1px] focus-within:ring-border/50">
                {/* Attachment Button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-md hover:bg-muted shrink-0"
                            disabled={disabled}
                            aria-label="Attach file"
                        >
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach file</TooltipContent>
                </Tooltip>

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-1 min-h-[40px] max-h-[200px] w-full resize-none border-0 bg-transparent px-0 py-2 text-[14px] leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={1}
                />

                {/* Voice Input Button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-md hover:bg-muted shrink-0"
                            disabled={disabled}
                            aria-label="Voice input"
                        >
                            <Mic className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Voice input</TooltipContent>
                </Tooltip>

                {/* Send Button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={handleSend}
                            disabled={!canSend}
                            size="icon"
                            className={cn(
                                "h-9 w-9 rounded-md shrink-0 transition-opacity duration-150",
                                canSend
                                    ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-100/90"
                                    : "bg-muted text-muted-foreground/50 cursor-not-allowed"
                            )}
                            aria-label="Send message"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Send message</TooltipContent>
                </Tooltip>
            </div>

            {/* Helper text */}
            <p className="mt-2 text-center text-xs text-muted-foreground">
                DeepSeek may produce inaccurate information. Verify important details.
            </p>
        </div>
    );
};

export { DeepSeekInput };
export default DeepSeekInput;