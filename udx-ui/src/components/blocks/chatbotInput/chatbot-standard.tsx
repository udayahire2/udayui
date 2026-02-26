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
import { Paperclip, Image as ImageIcon, Lightbulb, Telescope, ShoppingBag, Globe } from "lucide-react";
import { ChatPlusIcon, ChatMicIcon, ChatAudioLinesIcon, ChatSendIcon } from "@/components/ui/chat-icons";
import { cn } from "@/lib/utils";

/**
 * Standard AI Input Component
 * Redesigned to feel like a high-quality SaaS Product UI composer.
 */

interface ChatGPTInputProps {
    onSend?: (message: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

const ChatGPTInput = React.forwardRef<HTMLDivElement, ChatGPTInputProps>(({
    onSend,
    placeholder = "Message AI...",
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
            textarea.style.height = `${Math.min(textarea.scrollHeight, 250)}px`;
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
        <div ref={ref} className={cn("w-full min-h-dvh max-w-2xl mx-auto flex flex-col gap-2 p-4", className)}>
            <div
                className={cn(
                    "group relative flex flex-col rounded-3xl border border-zinc-200 bg-white transition-colors duration-200 shadow-sm overflow-hidden",
                    "focus-within:border-zinc-300 focus-within:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:focus-within:border-zinc-700",
                    "hover:border-zinc-300 dark:hover:border-zinc-700",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                {/* Textarea */}
                <div className="flex-1 min-w-0">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full max-h-[250px] min-h-[56px] resize-none border-0 bg-transparent px-4 py-3 text-[15px] font-medium leading-relaxed tracking-tight focus:outline-none text-zinc-900 placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                        rows={1}
                        aria-label="Message input"
                    />
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between px-2 pb-2 pt-0.5">
                    {/* Left Actions */}
                    <div className="flex items-center gap-1">
                        <DropdownMenu>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 font-medium transition-colors"
                                            disabled={disabled}
                                            aria-label="Add attachment"
                                            type="button"
                                        >
                                            <ChatPlusIcon className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-[11px]">Attach</TooltipContent>
                            </Tooltip>

                            <DropdownMenuContent
                                align="start"
                                sideOffset={8}
                                className="w-[200px] p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg"
                            >
                                <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    Attachments
                                </div>
                                <DropdownMenuItem className="gap-2 p-1.5 cursor-pointer text-[13px] font-medium focus:bg-accent focus:text-accent-foreground rounded-xl transition-colors">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Paperclip className="h-3.5 w-3.5" />
                                    </div>
                                    <span>Upload from computer</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 p-1.5 cursor-pointer text-[13px] font-medium focus:bg-accent focus:text-accent-foreground rounded-xl transition-colors">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                                        <ImageIcon className="h-3.5 w-3.5" />
                                    </div>
                                    <span>Add image</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="my-1.5 mx-1 bg-border/50" />

                                <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                    Tools
                                </div>
                                <DropdownMenuItem className="gap-2 p-1.5 cursor-pointer text-[13px] font-medium focus:bg-accent focus:text-accent-foreground rounded-xl transition-colors">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                                        <Lightbulb className="h-3.5 w-3.5" />
                                    </div>
                                    <span>Reasoning & Thinking</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 p-1.5 cursor-pointer text-[13px] font-medium focus:bg-accent focus:text-accent-foreground rounded-xl transition-colors">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                                        <Telescope className="h-3.5 w-3.5" />
                                    </div>
                                    <span>Deep Research</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 p-1.5 cursor-pointer text-[13px] font-medium focus:bg-accent focus:text-accent-foreground rounded-xl transition-colors">
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                                        <ShoppingBag className="h-3.5 w-3.5" />
                                    </div>
                                    <span>Shopping Assistant</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 rounded-full px-2.5 hidden sm:flex items-center gap-1.5 border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 font-medium transition-colors shadow-none"
                                    disabled={disabled}
                                    type="button"
                                >
                                    <Globe className="h-3 w-3" />
                                    <span className="text-[11px]">Search</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-[11px]">Web Search</TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1.5 pr-0.5">
                        {!hasContent ? (
                            <>
                                {/* Voice Mic Button */}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                                            disabled={disabled}
                                            aria-label="Voice input"
                                            type="button"
                                        >
                                            <ChatMicIcon className="h-3.5 w-3.5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-[11px]">Voice input</TooltipContent>
                                </Tooltip>

                                {/* Advanced Audio Mode */}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="h-7 w-7 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 shadow-none transition-colors border-0 p-0 flex items-center justify-center"
                                            disabled={disabled}
                                            aria-label="Start voice mode"
                                            type="button"
                                        >
                                            <ChatAudioLinesIcon className="h-3.5 w-3.5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-[11px]">Start Voice Mode</TooltipContent>
                                </Tooltip>
                            </>
                        ) : (
                            /* Send Button */
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={handleSend}
                                        disabled={disabled}
                                        size="sm"
                                        className="h-7 w-7 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 shadow-none transition-colors p-0 flex items-center justify-center"
                                        aria-label="Send message"
                                        type="button"
                                    >
                                        <ChatSendIcon className="h-3.5 w-3.5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-[11px]">Send message</TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
            </div>

            <div className="text-center px-4">
                <p className="text-[12px] font-medium tracking-tight text-zinc-400 dark:text-zinc-500 flex items-center justify-center gap-1.5">
                    <span>AI can make mistakes. Verify important information.</span>
                </p>
            </div>
        </div>
    );
});
ChatGPTInput.displayName = "ChatGPTInput";

export { ChatGPTInput };
export default ChatGPTInput;