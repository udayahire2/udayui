"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Plus,
    Search,
    MessageSquare,
    MoreHorizontal,
    Settings2,
    LifeBuoy,
    LogOut,
    CreditCard,
    User,
    PanelLeftClose,
    PanelLeft,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarProvider,
    useSidebar,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Replace with a custom avatar if needed
const CircleUserRound = User;
const NAVIGATION_DATA = {
    user: {
        name: "Jane Developer",
        email: "jane@company.com",
        avatar: CircleUserRound,
    },
    history: {
        today: [
            { id: "1", title: "API Authentication Issue", icon: MessageSquare },
            { id: "2", title: "Refactoring the Sidebar", icon: MessageSquare },
        ],
        yesterday: [
            { id: "3", title: "Database Migration Script", icon: MessageSquare },
            { id: "4", title: "Next.js 14 Upgrade", icon: MessageSquare },
            { id: "5", title: "Tailwind CSS Configuration", icon: MessageSquare },
        ],
        previous7Days: [
            { id: "6", title: "Docker Container Setup", icon: MessageSquare },
            { id: "7", title: "Serverless Functions", icon: MessageSquare },
            { id: "8", title: "GraphQL API Design", icon: MessageSquare },
            { id: "9", title: "React Performance Tuning", icon: MessageSquare },
        ]
    }
};

// --- Custom Sidebar Collapse Trigger (Minimal) ---
function SidebarCollapseTrigger({ className }: { className?: string }) {
    const { toggleSidebar, state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <button
            onClick={toggleSidebar}
            className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800",
                className
            )}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
        </button>
    );
}

// --- Custom Chat History Item (Minimal) ---
function ChatHistoryItem({ title, icon: Icon, isActive }: { title: string, icon: any, isActive?: boolean }) {
    return (
        <button className={cn(
            "group relative flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/50 dark:focus-visible:ring-neutral-500/50",
            isActive
                ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800/80"
        )}>
            <Icon className="h-4 w-4 shrink-0 opacity-70" />
            <span className="flex-1 truncate text-left">{title}</span>

            {/* Options Button (Visible on Hover/Focus) */}
            <div className={cn(
                "opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100",
                isActive && "opacity-100" // Always show if active, or just on hover based on preference
            )}>
                <div className="flex h-5 w-5 items-center justify-center rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500 dark:text-neutral-400">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                </div>
            </div>

            {/* Fade effect at the end of text to prevent hard clipping if text is too long (optional) */}
            <div className="pointer-events-none absolute right-8 top-0 bottom-0 w-8 bg-gradient-to- from-neutral-100 to-transparent opacity-0 group-hover:opacity-100 dark:from-neutral-800/80 transition-opacity" />
        </button>
    );
}


// --- Main Layout ---
function SidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-[#09090b]">
            {children}
        </div>
    );
}

export function SidebarPremium() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <SidebarProvider defaultOpen={true}>
            <SidebarLayout>
                {/* SIDEBAR */}
                <Sidebar className="border-r border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-[#09090b]">

                    {/* HEADER: New Chat & Actions */}
                    <SidebarHeader className="p-3">
                        <div className="flex items-center gap-2 group-data-[collapsed=true]/sidebar:flex-col">
                            {/* Collapse Trigger (Hidden when collapsed, or shown. Let's show it always or handle collapse states) */}
                            <SidebarCollapseTrigger className="group-data-[collapsed=true]/sidebar:hidden" />

                            {/* New Chat Button */}
                            <button className="flex h-9 flex-1 items-center justify-between gap-2 border border-neutral-200 bg-white px-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-500/50 rounded-md group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-0">
                                <div className="flex items-center gap-2 m">
                                    <Plus className="h-4 w-4 shrink-0" />
                                    <span className="truncate group-data-[collapsed=true]/sidebar:hidden">New Chat</span>
                                </div>
                                <Search className="h-4 w-4 shrink-0 text-neutral-500 group-data-[collapsed=true]/sidebar:hidden hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" />
                            </button>
                        </div>
                    </SidebarHeader>

                    {/* CONTENT: Chat History */}
                    <SidebarContent className="px-3">
                        <div className="flex flex-col gap-6 py-2">

                            {/* Today */}
                            <div>
                                <h3 className="mb-2 px-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 group-data-[collapsed=true]/sidebar:hidden">
                                    Today
                                </h3>
                                <div className="flex flex-col gap-0.5">
                                    {NAVIGATION_DATA.history.today.map((item) => (
                                        <ChatHistoryItem key={item.id} title={item.title} icon={item.icon} isActive={item.id === "1"} />
                                    ))}
                                </div>
                            </div>

                            {/* Yesterday */}
                            <div>
                                <h3 className="mb-2 px-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 group-data-[collapsed=true]/sidebar:hidden">
                                    Yesterday
                                </h3>
                                <div className="flex flex-col gap-0.5">
                                    {NAVIGATION_DATA.history.yesterday.map((item) => (
                                        <ChatHistoryItem key={item.id} title={item.title} icon={item.icon} />
                                    ))}
                                </div>
                            </div>

                            {/* Previous 7 Days */}
                            <div>
                                <h3 className="mb-2 px-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 group-data-[collapsed=true]/sidebar:hidden">
                                    Previous 7 Days
                                </h3>
                                <div className="flex flex-col gap-0.5">
                                    {NAVIGATION_DATA.history.previous7Days.map((item) => (
                                        <ChatHistoryItem key={item.id} title={item.title} icon={item.icon} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </SidebarContent>

                    {/* FOOTER: User Profile & Settings */}
                    <SidebarFooter className="p-3">
                        {mounted && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm font-medium text-neutral-700 outline-none transition-colors hover:bg-neutral-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/50 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-500/50 group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-0">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                            <NAVIGATION_DATA.user.avatar className="h-4 w-4" />
                                        </div>
                                        <div className="flex min-w-0 flex-1 flex-col group-data-[collapsed=true]/sidebar:hidden">
                                            <span className="truncate text-sm text-neutral-900 dark:text-neutral-100">
                                                {NAVIGATION_DATA.user.name}
                                            </span>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" side="right" sideOffset={8} forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{NAVIGATION_DATA.user.name}</p>
                                            <p className="text-xs leading-none text-neutral-500 dark:text-neutral-400">
                                                {NAVIGATION_DATA.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings2 className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </SidebarFooter>
                </Sidebar>

                {/* MAIN CONTENT AREA */}
                <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#09090b]">
                    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-neutral-200 bg-white/80 px-4 backdrop-blur-md dark:border-neutral-800 dark:bg-[#09090b]/80 lg:hidden">
                        {/* Add Mobile Trigger here if needed */}
                        <div className="flex items-center gap-2">
                            <h1 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                Chatbot View
                            </h1>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto">
                        <div className="flex h-full items-center justify-center p-4">
                            <div className="flex flex-col items-center justify-center text-center max-w-md">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                                    <MessageSquare className="h-8 w-8" />
                                </div>
                                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">How can I help you today?</h2>
                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                                    This is a minimal, ChatGPT-style layout conforming to the Frontend.xml aesthetic constraints.
                                </p>
                            </div>
                        </div>
                    </main>

                    {/* Floating Input Area (Simulated) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-white via-white to-transparent dark:from-[#09090b] dark:via-[#09090b] pt-12">
                        <div className="mx-auto max-w-3xl">
                            <div className="relative flex min-h-[52px] w-full items-center rounded-2xl border border-neutral-200 bg-white px-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                                <span className="text-sm text-neutral-400">Message Udroid AI...</span>
                            </div>
                            <p className="mt-3 text-center text-[11px] text-neutral-500 dark:text-neutral-400">
                                AI can make mistakes. Consider verifying important information.
                            </p>
                        </div>
                    </div>
                </div>

            </SidebarLayout>
        </SidebarProvider>
    );
}

export default SidebarPremium;
