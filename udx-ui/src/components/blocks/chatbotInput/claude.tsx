"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ArrowUp, Paperclip, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Claude AI-style input component
 * Replicates Anthropic's Claude interface design
 */

interface ClaudeInputProps {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const ClaudeInput = ({
    onSend,
    placeholder = "Reply to Claude...",
    disabled = false,
    className,
}: ClaudeInputProps) => {
    const [message, setMessage] = React.useState("");
    const [showAttachMenu, setShowAttachMenu] = React.useState(false);
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
        <div className={cn("w-full max-w-3xl mx-auto px-4", className)}>
            <div className="relative">
                {/* Attachment Menu */}
                {showAttachMenu && (
                    <div className="absolute bottom-full left-0 mb-2 bg-background border border-border rounded-lg shadow-lg p-2 min-w-[200px]">
                        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                            <Paperclip className="h-4 w-4" />
                            <span>Attach file</span>
                        </button>
                        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                            <ImageIcon className="h-4 w-4" />
                            <span>Add image</span>
                        </button>
                    </div>
                )}

                {/* Input Container */}
                <div className="relative flex items-end gap-2 rounded-2xl border border-border bg-background shadow-sm focus-within:border-primary/50 transition-colors">
                    {/* Add Attachment Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 bottom-2 h-9 w-9 rounded-lg hover:bg-muted"
                        disabled={disabled}
                        onClick={() => setShowAttachMenu(!showAttachMenu)}
                        aria-label="Add attachment"
                    >
                        <Plus className="h-5 w-5 text-muted-foreground" />
                    </Button>

                    {/* Textarea */}
                    <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="min-h-[56px] max-h-[200px] resize-none border-0 bg-transparent pl-12 pr-12 py-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                        rows={1}
                    />

                    {/* Send Button */}
                    <Button
                        onClick={handleSend}
                        disabled={!canSend}
                        size="icon"
                        className={cn(
                            "absolute right-2 bottom-2 h-9 w-9 rounded-lg transition-all",
                            canSend
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                        aria-label="Send message"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Helper text */}
            <p className="mt-2 text-center text-xs text-muted-foreground">
                Claude can make mistakes. Please double-check responses.
            </p>
        </div>
    );
};

export { ClaudeInput };
export default ClaudeInput;