"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
    ChevronRight,
    Menu,
    Search,
    LayoutGrid,
    Inbox,
    Layers,
    UsersRound,
    CircleUserRound,
    PanelLeftClose,
    PanelLeft,
    Settings2,
    LifeBuoy,
    Activity,
    Clock,
    LogOut,
    CreditCard,
    User,
    Keyboard,
    BookOpen,
    MessageCircle,
    FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Shadcn UI Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";

// ============================================================================
// TYPES & CONTEXT
// ============================================================================

type SidebarContextValue = {
    isMobileOpen: boolean;
    setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isCollapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

export function useSidebar() {
    const context = React.useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

// ============================================================================
// COMPONENTS
// ============================================================================

export function SidebarProvider({
    children,
    defaultCollapsed = false,
}: {
    children: React.ReactNode;
    defaultCollapsed?: boolean;
}) {
    const [isMobileOpen, setMobileOpen] = React.useState(false);
    const [isCollapsed, setCollapsed] = React.useState(defaultCollapsed);

    const value = React.useMemo(
        () => ({
            isMobileOpen,
            setMobileOpen,
            isCollapsed,
            setCollapsed,
        }),
        [isMobileOpen, isCollapsed]
    );

    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function SidebarLayout({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex min-h-screen w-full bg-white selection:bg-neutral-200 dark:bg-[#09090b] dark:selection:bg-neutral-800",
                className
            )}
        >
            {children}
        </div>
    );
}

export function Sidebar({ className, children }: React.HTMLAttributes<HTMLElement>) {
    const { isMobileOpen, setMobileOpen, isCollapsed } = useSidebar();

    // Prevent body scroll when mobile sidebar is open
    React.useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm lg:hidden dark:bg-black/60"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "group/sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r border-neutral-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 dark:border-neutral-800 dark:bg-[#09090b]",
                    isMobileOpen ? "translate-x-0 w-[260px]" : "-translate-x-full",
                    isCollapsed ? "lg:w-[64px]" : "lg:w-[260px]",
                    className
                )}
                data-collapsed={isCollapsed}
            >
                <nav aria-label="Main Navigation" className="flex h-full w-full flex-col overflow-hidden">
                    {children}
                </nav>
            </aside>
        </>
    );
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 px-4 dark:border-neutral-800",
                className
            )}
            {...props}
        />
    );
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 flex flex-1 flex-col space-y-6 overflow-y-auto overflow-x-hidden px-3 py-4",
                className
            )}
            {...props}
        />
    );
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("shrink-0 border-t border-neutral-200/60 p-3 dark:border-neutral-800/60", className)}
            {...props}
        />
    );
}

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <motion.div layout="position" className={cn("flex flex-col space-y-1", className)} {...props} />;
}

export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { isCollapsed } = useSidebar();

    if (isCollapsed) {
        return (
            <div className="mb-1.5 flex justify-center pt-2">
                <div className="h-0.5 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
                "mb-1.5 select-none px-2 text-[11px] font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400",
                className
            )}
            {...props}
        />
    );
}

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive?: boolean;
    asChild?: boolean;
    icon?: React.ElementType;
    label?: string;
    badge?: string | number;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
    ({ className, isActive, asChild, children, icon: Icon, label, badge, ...props }, ref) => {
        const { isCollapsed } = useSidebar();
        const [isHovered, setIsHovered] = React.useState(false);

        const baseClasses = cn(
            "group relative flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium outline-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
            isActive ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50" : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800/50",
            isCollapsed && "justify-center px-0 py-1.5",
            className
        );

        const innerContent = (
            <>
                <div className={cn("relative z-10 flex w-full items-center gap-2", isCollapsed && "justify-center")}>
                    {Icon && (
                        <Icon
                            className={cn(
                                "h-4 w-4 shrink-0",
                                isActive
                                    ? "text-neutral-900 dark:text-neutral-50"
                                    : "text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300",
                                isCollapsed && "h-[18px] w-[18px]"
                            )}
                        />
                    )}

                    {!isCollapsed && label && <span className="truncate">{label}</span>}

                    {!isCollapsed && badge && (
                        <span className="ml-auto inline-flex h-4 items-center justify-center rounded bg-neutral-100 px-1 text-[10px] font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                            {badge}
                        </span>
                    )}
                </div>

                {/* Collapsed Tooltip */}
                <AnimatePresence>
                    {isCollapsed && isHovered && label && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="pointer-events-none absolute left-full z-50 ml-2 hidden w-auto min-w-max items-center justify-center rounded border border-neutral-200 bg-white px-2 py-1 text-xs font-medium text-neutral-900 shadow-sm lg:flex dark:border-neutral-800 dark:bg-[#09090b] dark:text-neutral-50"
                        >
                            {label}
                        </motion.div>
                    )}
                </AnimatePresence>
            </>
        );

        if (asChild) {
            if (React.isValidElement<{ className?: string; onMouseEnter?: any; onMouseLeave?: any }>(children)) {
                return React.cloneElement(children, {
                    ref: ref as any,
                    className: cn(baseClasses, children.props.className),
                    "aria-current": isActive ? "page" : undefined,
                    onMouseEnter: (e: any) => {
                        setIsHovered(true);
                        children.props.onMouseEnter?.(e);
                    },
                    onMouseLeave: (e: any) => {
                        setIsHovered(false);
                        children.props.onMouseLeave?.(e);
                    },
                    ...props,
                } as any);
            }
            return null;
        }

        return (
            <button
                ref={ref}
                className={baseClasses}
                aria-current={isActive ? "page" : undefined}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                {innerContent}
                {children}
            </button>
        );
    }
);
SidebarItem.displayName = "SidebarItem";

export function SidebarSubMenu({
    icon: Icon,
    label,
    children,
    defaultOpen = false,
    isActive = false,
}: {
    icon?: React.ElementType;
    label: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    isActive?: boolean;
}) {
    const { isCollapsed } = useSidebar();
    const [isOpen, setIsOpen] = React.useState(defaultOpen || isActive);
    const [isHovered, setIsHovered] = React.useState(false);

    if (isCollapsed) {
        return (
            <SidebarItem
                icon={Icon}
                label={label}
                isActive={isActive}
                className="opacity-70 transition-all hover:opacity-100"
                onClick={() => { }}
            />
        );
    }

    return (
        <div className="flex flex-col space-y-0.5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-expanded={isOpen}
                className={cn(
                    "group relative flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm font-medium outline-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
                    isActive || isOpen ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800/50"
                )}
            >
                <div className="relative z-10 flex items-center gap-2 truncate">
                    {Icon && (
                        <Icon
                            className={cn(
                                "h-4 w-4 shrink-0",
                                isActive || isOpen
                                    ? "text-neutral-900 dark:text-neutral-50"
                                    : "text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300"
                            )}
                        />
                    )}
                    <span className="truncate">{label}</span>
                </div>
                <div
                    className={cn(
                        "transition-transform duration-200",
                        isOpen ? "rotate-90" : "rotate-0"
                    )}
                >
                    <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="ml-4 mt-0.5 flex flex-col space-y-0.5 border-l border-neutral-200 pb-0.5 pl-2 dark:border-neutral-800">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function SidebarCollapseTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { isCollapsed, setCollapsed } = useSidebar();

    return (
        <button
            onClick={() => setCollapsed(!isCollapsed)}
            className={cn(
                "hidden h-6 w-6 items-center justify-center rounded-md text-neutral-500 outline-none transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 lg:flex dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
                className
            )}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            {...props}
        >
            {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
    );
}

export function SidebarMobileTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { setMobileOpen } = useSidebar();

    return (
        <button
            onClick={() => setMobileOpen(true)}
            className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 outline-none transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 lg:hidden dark:border-neutral-800 dark:bg-[#09090b] dark:text-neutral-400 dark:hover:bg-neutral-800",
                className
            )}
            aria-label="Open Sidebar"
            {...props}
        >
            <Menu className="h-4 w-4" />
        </button>
    );
}

// ============================================================================
// DATA-DRIVEN NAVIGATION CONFIGURATION DEMO
// ============================================================================

const NAVIGATION_DATA = {
    brand: {
        name: "Udroid OS",
        icon: "U",
    },
    primary: [
        { label: "Dashboard", icon: LayoutGrid, isActive: true },
        { label: "Inbox", icon: Inbox, badge: 12 },
        { label: "Alerts", icon: Activity, badge: "3" },
    ],
    secondary: [
        {
            group: "Projects",
            items: [
                { label: "All Projects", icon: Layers },
                { label: "Recent", icon: Clock },
            ],
        },
        {
            group: "Team Management",
            icon: UsersRound,
            isActive: false,
            items: [
                { label: "Members", href: "#" },
                { label: "Roles", href: "#" },
                { label: "Activity Log", href: "#" },
            ],
        },
    ],
    utility: [
        { label: "Settings", id: "settings", icon: Settings2 },
        { label: "Help Center", id: "help", icon: LifeBuoy },
    ],
    user: {
        name: "Jane Developer",
        email: "jane@company.com",
        avatar: CircleUserRound,
    },
};

export default function SidebarStandard() {
    const [openCommand, setOpenCommand] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);
    const [openHelp, setOpenHelp] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpenCommand((open) => !open);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <SidebarProvider defaultCollapsed={false}>
            <SidebarLayout>
                {/* SIDEBAR */}
                <Sidebar>
                    <SidebarHeader className="transition-all duration-150 group-data-[collapsed=true]/sidebar:justify-center group-data-[collapsed=true]/sidebar:px-0">
                        <div className="flex items-center gap-2 overflow-hidden font-medium text-neutral-900 dark:text-neutral-50 group-data-[collapsed=true]/sidebar:hidden">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                                <span className="text-[10px] font-bold">{NAVIGATION_DATA.brand.icon}</span>
                            </div>
                            <span className="truncate text-sm tracking-tight">
                                {NAVIGATION_DATA.brand.name}
                            </span>
                        </div>
                        <SidebarCollapseTrigger className="shrink-0" />
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            {NAVIGATION_DATA.primary.map((item) => (
                                <SidebarItem
                                    key={item.label}
                                    label={item.label}
                                    icon={item.icon}
                                    badge={item.badge}
                                    isActive={item.isActive}
                                />
                            ))}
                        </SidebarGroup>

                        {NAVIGATION_DATA.secondary.map((section, idx) => (
                            <SidebarGroup key={idx}>
                                {section.group && !section.icon && (
                                    <SidebarGroupLabel>{section.group}</SidebarGroupLabel>
                                )}
                                {section.icon ? (
                                    <SidebarSubMenu label={section.group!} icon={section.icon} isActive={section.isActive}>
                                        {section.items.map((subItem) => (
                                            <SidebarItem key={subItem.label} label={subItem.label} className="py-1" />
                                        ))}
                                    </SidebarSubMenu>
                                ) : (
                                    section.items.map((item) => (
                                        <SidebarItem key={item.label} label={item.label} icon={item.icon} />
                                    ))
                                )}
                            </SidebarGroup>
                        ))}

                        <div className="mt-auto pt-8">
                            <SidebarGroup>
                                {NAVIGATION_DATA.utility.map((item: any) => (
                                    <SidebarItem
                                        key={item.label}
                                        label={item.label}
                                        icon={item.icon}
                                        onClick={() => {
                                            if (item.id === "settings") {
                                                setOpenSettings(true);
                                            } else if (item.id === "help") {
                                                setOpenHelp(true);
                                            }
                                        }}
                                    />
                                ))}
                            </SidebarGroup>
                        </div>
                    </SidebarContent>

                    <SidebarFooter>
                        {mounted ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="group flex w-full items-center gap-2 rounded-md p-1.5 text-left text-sm font-medium text-neutral-600 outline-none transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 group-data-[collapsed=true]/sidebar:justify-center">
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                            <NAVIGATION_DATA.user.avatar className="h-4 w-4" />
                                        </div>
                                        <div className="flex min-w-0 flex-col transition-opacity group-hover:text-neutral-900 dark:group-hover:text-neutral-50 group-data-[collapsed=true]/sidebar:hidden">
                                            <span className="truncate text-[13px] text-neutral-900 dark:text-neutral-100">
                                                {NAVIGATION_DATA.user.name}
                                            </span>
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
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
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            <span>Billing</span>
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setOpenSettings(true)}>
                                            <Settings2 className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <button className="group flex w-full items-center gap-2 rounded-md p-1.5 text-left text-sm font-medium text-neutral-600 outline-none transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 group-data-[collapsed=true]/sidebar:justify-center">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                                    <NAVIGATION_DATA.user.avatar className="h-4 w-4" />
                                </div>
                                <div className="flex min-w-0 flex-col transition-opacity group-hover:text-neutral-900 dark:group-hover:text-neutral-50 group-data-[collapsed=true]/sidebar:hidden">
                                    <span className="truncate text-[13px] text-neutral-900 dark:text-neutral-100">
                                        {NAVIGATION_DATA.user.name}
                                    </span>
                                </div>
                            </button>
                        )}
                    </SidebarFooter>
                </Sidebar>

                {/* MAIN CONTENT AREA */}
                <div className="flex min-w-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#09090b]">
                    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-neutral-200 bg-white px-4 lg:px-6 dark:border-neutral-800 dark:bg-[#09090b]">
                        <div className="flex items-center gap-2 sm:gap-4">
                            <SidebarMobileTrigger className="-ml-1 sm:ml-0" />
                            <div className="flex items-center gap-2">
                                <h1 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    Dashboard
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-1 items-center justify-end sm:flex-initial">
                            <button
                                onClick={() => setOpenCommand(true)}
                                className="flex h-8 w-full max-w-[240px] items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-500 outline-none transition-colors hover:bg-neutral-100 focus:border-neutral-300 focus:bg-white focus:ring-1 focus:ring-neutral-400 dark:border-neutral-800 dark:bg-[#09090b] dark:text-neutral-400 dark:hover:bg-neutral-900 dark:focus:border-neutral-700 dark:focus:ring-neutral-500 sm:w-[240px]"
                            >
                                <Search className="h-4 w-4 shrink-0" />
                                <span className="flex-1 truncate text-left">Search...</span>
                                <kbd className="pointer-events-none hidden h-5 shrink-0 select-none items-center gap-1 rounded bg-neutral-200 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex dark:bg-neutral-800">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </button>
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                        <div className="mx-auto max-w-5xl space-y-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-32 rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
                                    />
                                ))}
                            </div>
                            <div className="flex h-[500px] items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900">
                                Application Content Viewport
                            </div>
                        </div>
                    </main>
                </div>

                {/* MODALS AND COMMAND MENUS */}
                {mounted && (
                    <>
                        <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
                            <CommandInput placeholder="Type a command or search..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    <CommandItem>
                                        <LayoutGrid className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Activity className="mr-2 h-4 w-4" />
                                        <span>Alerts</span>
                                    </CommandItem>
                                    <CommandItem>
                                        <Settings2 className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                        <CommandShortcut>⌘S</CommandShortcut>
                                    </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Settings">
                                    <CommandItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                        <CommandShortcut>⌘P</CommandShortcut>
                                    </CommandItem>
                                    <CommandItem>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Billing</span>
                                        <CommandShortcut>⌘B</CommandShortcut>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </CommandDialog>

                        <Dialog open={openSettings} onOpenChange={setOpenSettings}>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Preferences</DialogTitle>
                                    <DialogDescription>
                                        Manage your platform settings, appearance, and notifications.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-4 py-4 text-sm text-neutral-500 dark:text-neutral-400">
                                    [Settings Form Content]
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={openHelp} onOpenChange={setOpenHelp}>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Help & Support</DialogTitle>
                                    <DialogDescription>
                                        Find answers, read documentation, or contact our support team.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <button className="flex items-start gap-3 rounded-md border border-neutral-200 p-3 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:border-neutral-800 dark:hover:bg-neutral-900">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
                                            <BookOpen className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Documentation</h4>
                                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">Browse our comprehensive guides and tutorials.</p>
                                        </div>
                                    </button>
                                    <button className="flex items-start gap-3 rounded-md border border-neutral-200 p-3 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:border-neutral-800 dark:hover:bg-neutral-900">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
                                            <MessageCircle className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Contact Support</h4>
                                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">Get in touch with our dedicated support team via live chat.</p>
                                        </div>
                                    </button>
                                    <button className="flex items-start gap-3 rounded-md border border-neutral-200 p-3 text-left transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 dark:border-neutral-800 dark:hover:bg-neutral-900">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800">
                                            <FileText className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Release Notes</h4>
                                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">See what's new in the latest versions of Udroid OS.</p>
                                        </div>
                                    </button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                )}

            </SidebarLayout>
        </SidebarProvider>
    );
}