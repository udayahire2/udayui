"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

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
        <div className={cn("w-full max-w-4xl mx-auto px-4", className)}>
            <div className="relative flex items-end gap-3 rounded-xl border border-border bg-background shadow-sm focus-within:border-primary transition-colors p-3">
                {/* Attachment Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-md hover:bg-muted shrink-0"
                    disabled={disabled}
                    aria-label="Attach file"
                >
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                </Button>

                {/* Textarea */}
                <Textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="min-h-[40px] max-h-[200px] resize-none border-0 bg-transparent px-0 py-2 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 flex-1"
                    rows={1}
                />

                {/* Voice Input Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-md hover:bg-muted shrink-0"
                    disabled={disabled}
                    aria-label="Voice input"
                >
                    <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>

                {/* Send Button */}
                <Button
                    onClick={handleSend}
                    disabled={!canSend}
                    size="icon"
                    className={cn(
                        "h-9 w-9 rounded-md shrink-0 transition-all",
                        canSend
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                    aria-label="Send message"
                >
                    <Send className="h-4 w-4" />
                </Button>
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