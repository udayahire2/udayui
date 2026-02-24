import * as React from "react";
import { cn } from "@/lib/utils";

export function ChatPlusIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className={cn("icon-md", className)} {...props}>
            <path fill="currentColor" fillRule="evenodd" d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V5a1 1 0 0 0-1-1Z" clipRule="evenodd"></path>
        </svg>
    );
}

export function ChatMicIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("icon-md", className)} {...props}>
            <path fill="currentColor" fillRule="evenodd" d="M12 2a3 3 0 0 0-3 3v7a3 3 0 1 0 6 0V5a3 3 0 0 0-3-3Z" clipRule="evenodd" />
            <path fill="currentColor" fillRule="evenodd" d="M5 12a1 1 0 0 1 2 0 5 5 0 1 0 10 0 1 1 0 1 1 2 0 7 7 0 0 1-6 6.93V21a1 1 0 1 1-2 0v-2.07A7 7 0 0 1 5 12Z" clipRule="evenodd" />
        </svg>
    );
}

export function ChatAudioLinesIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("icon-md", className)} {...props}>
            <path fill="currentColor" d="M11 5a1 1 0 0 1 2 0v14a1 1 0 1 1-2 0V5ZM7 9a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V9ZM15 9a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V9ZM3 11a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2ZM19 11a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2Z" />
        </svg>
    );
}

export function ChatSendIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("icon-md", className)} {...props}>
            <path fill="currentColor" fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414L13 6.414V20a1 1 0 1 1-2 0V6.414L6.707 10.707a1 1 0 0 1-1.414-1.414l6-6z" clipRule="evenodd" />
        </svg>
    );
}
