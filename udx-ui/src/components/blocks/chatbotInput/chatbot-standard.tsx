"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Paperclip, Image as ImageIcon, Lightbulb, Telescope, ShoppingBag, MoreHorizontal } from "lucide-react";
import { ChatPlusIcon, ChatMicIcon, ChatAudioLinesIcon, ChatSendIcon } from "@/components/ui/chat-icons";
import { cn } from "@/lib/utils";

/**
 * Standard ChatGPT-style input component (Neutral UI)
 * Adheres to predictable spacing, neutral color palette, and clear interaction states.
 */

interface ChatGPTInputProps {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const ChatGPTInput = React.forwardRef<HTMLDivElement, ChatGPTInputProps>(({
    onSend,
    placeholder = "Ask anything",
    disabled = false,
    className,
}, ref) => {
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
        if (message.trim() && onSend && !disabled) {
            onSend(message.trim());
            setMessage("");

            // Reset height after sending
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
            }
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
        <div ref={ref} className={cn("w-full max-w-3xl mx-auto flex flex-col gap-2 p-4", className)}>
            <div
                className={cn(
                    "relative flex items-end gap-2 rounded-[26px] p-1.5 transition-all duration-200 ease-in-out border",
                    "bg-secondary/60 hover:bg-secondary/80 focus-within:bg-secondary/80",
                    "dark:bg-secondary/40 dark:hover:bg-secondary/60 dark:focus-within:bg-secondary/60",
                    isFocused ? "border-ring/20 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" : "border-transparent"
                )}
            >
                {/* Plus Button (Left) */}
                <div className="shrink-0 flex items-center">
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                                        disabled={disabled}
                                        aria-label="Add attachment"
                                        type="button"
                                    >
                                        <ChatPlusIcon className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">Add attachment</TooltipContent>
                        </Tooltip>

                        <DropdownMenuContent
                            align="start"
                            sideOffset={12}
                            className="w-[200px] p-2 rounded-2xl bg-popover/95 backdrop-blur-md border border-border/50 shadow-xl"
                        >
                            <DropdownMenuItem className="gap-2.5 p-2 cursor-pointer text-sm font-medium focus:bg-accent focus:text-accent-foreground rounded-lg outline-none transition-colors">
                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                <span>Add photos & files</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1.5 mx-2 bg-border/50" />
                            <DropdownMenuItem className="gap-2.5 p-2 cursor-pointer text-sm font-medium focus:bg-accent focus:text-accent-foreground rounded-lg outline-none transition-colors">
                                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                <span>Create image</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2.5 p-2 cursor-pointer text-sm font-medium focus:bg-accent focus:text-accent-foreground rounded-lg outline-none transition-colors">
                                <Lightbulb className="h-4 w-4 text-muted-foreground" />
                                <span>Thinking</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2.5 p-2 cursor-pointer text-sm font-medium focus:bg-accent focus:text-accent-foreground rounded-lg outline-none transition-colors">
                                <Telescope className="h-4 w-4 text-muted-foreground" />
                                <span>Deep research</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2.5 p-2 cursor-pointer text-sm font-medium focus:bg-accent focus:text-accent-foreground rounded-lg outline-none transition-colors">
                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                <span>Shopping research</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2.5 p-2 cursor-pointer text-sm font-medium focus:bg-accent focus:text-accent-foreground rounded-lg outline-none transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                                <span>More</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Textarea */}
                <div className="flex-1 flex flex-col min-w-0">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full max-h-[200px] min-h-[32px] resize-none border-0 bg-transparent px-2 py-1.5 text-[15px] focus:outline-none text-foreground placeholder:text-muted-foreground/60 font-normal"
                        style={{ lineHeight: "20px" }}
                        rows={1}
                        aria-label="Message input"
                    />
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1 shrink-0">
                    {!hasContent ? (
                        <>
                            {/* Mic Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
                                        disabled={disabled}
                                        aria-label="Voice input"
                                        type="button"
                                    >
                                        <ChatMicIcon className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs">Voice input</TooltipContent>
                            </Tooltip>

                            {/* Voice Mode Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="default"
                                        size="icon"
                                        className="h-8 w-8 rounded-full bg-[#007AFF] hover:bg-[#007AFF]/90 text-white transition-colors duration-200 shadow-none border-0"
                                        disabled={disabled}
                                        aria-label="Start voice mode"
                                        type="button"
                                    >
                                        <ChatAudioLinesIcon className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs">Start Voice Mode</TooltipContent>
                            </Tooltip>
                        </>
                    ) : (
                        /* Send Button */
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleSend}
                                    disabled={disabled}
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200 shadow-none"
                                    aria-label="Send message"
                                    type="button"
                                >
                                    <ChatSendIcon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs">Send message</TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>

            <div className="text-center px-4">
                <p className="text-xs text-muted-foreground/80">
                    AI can make mistakes. Verify important information.
                </p>
            </div>
        </div>
    );
});
ChatGPTInput.displayName = "ChatGPTInput";

export { ChatGPTInput };
export default ChatGPTInput;