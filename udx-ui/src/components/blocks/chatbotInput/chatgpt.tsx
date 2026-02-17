"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Mic, AudioLines, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ChatGPT-style input component (Voice Mode UI)
 * Replicates the pill-shaped design with voice features
 */

interface ChatGPTInputProps {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const ChatGPTInput = ({
    onSend,
    placeholder = "Ask anything",
    disabled = false,
    className,
}: ChatGPTInputProps) => {
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
        <div className={cn("w-full max-w-3xl mx-auto px-4", className)}>
            <div className="relative flex items-end gap-2 rounded-full border border-border/50 bg-secondary/50 dark:bg-zinc-800/80 shadow-sm focus-within:border-primary/20 transition-all p-2">
                {/* Plus Button (Left) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full hover:bg-muted/50 text-muted-foreground shrink-0"
                    disabled={disabled}
                    aria-label="Add attachment"
                >
                    <Plus className="h-5 w-5" />
                </Button>

                {/* Textarea */}
                <div className="flex-1 min-h-[44px] flex items-center">
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="min-h-[24px] max-h-[200px] w-full resize-none border-0 bg-transparent px-2 py-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 leading-normal"
                        rows={1}
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1 shrink-0 pb-0.5">
                    {!hasContent ? (
                        <>
                            {/* Mic Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-full hover:bg-muted/50 text-muted-foreground"
                                disabled={disabled}
                                aria-label="Voice input"
                            >
                                <Mic className="h-5 w-5" />
                            </Button>

                            {/* Voice Mode Button (Blue) */}
                            <Button
                                size="icon"
                                className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md border-0"
                                disabled={disabled}
                                aria-label="Start voice mode"
                            >
                                <AudioLines className="h-5 w-5" />
                            </Button>
                        </>
                    ) : (
                        /* Send Button (appears when typing) */
                        <Button
                            onClick={handleSend}
                            disabled={disabled}
                            size="icon"
                            className="h-10 w-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all shadow-sm"
                            aria-label="Send message"
                        >
                            <ArrowUp className="h-5 w-5" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export { ChatGPTInput };
export default ChatGPTInput;