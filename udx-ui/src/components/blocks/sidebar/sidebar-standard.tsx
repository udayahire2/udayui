"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, Search, Home, Inbox, Folder, Users, UserCircle, PanelLeftClose, PanelLeft, Settings, HelpCircle, Bell } from "lucide-react";

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

    return (
        <SidebarContext.Provider
            value={{ isMobileOpen, setMobileOpen, isCollapsed, setCollapsed }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function SidebarLayout({
    children,
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex min-h-screen w-full bg-neutral-50 dark:bg-neutral-950", className)}>
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
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm transition-opacity lg:hidden dark:bg-black/60"
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-neutral-200 bg-white transition-all duration-200 ease-in-out lg:static lg:translate-x-0 dark:border-neutral-800 dark:bg-[#0a0a0a]",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full",
                    isCollapsed ? "w-[72px]" : "w-[260px]",
                    className
                )}
            >
                <nav
                    aria-label="Main Navigation"
                    className="flex h-full w-full flex-col overflow-hidden"
                >
                    {children}
                </nav>
            </aside>
        </>
    );
}

export function SidebarHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
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

export function SidebarContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex flex-1 flex-col overflow-y-auto overflow-x-hidden px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800",
                className
            )}
            {...props}
        />
    );
}

export function SidebarFooter({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "shrink-0 border-t border-neutral-200 p-3 dark:border-neutral-800",
                className
            )}
            {...props}
        />
    );
}

export function SidebarGroup({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col space-y-1", className)} {...props} />;
}

export function SidebarGroupLabel({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const { isCollapsed } = useSidebar();

    if (isCollapsed) {
        return (
            <div className="flex justify-center mb-1.5 pt-2">
                <div className="h-0.5 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "mb-1.5 px-2 text-xs font-semibold tracking-tight text-neutral-500 dark:text-neutral-400 select-none",
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
    (
        { className, isActive, asChild, children, icon: Icon, label, badge, ...props },
        ref
    ) => {
        const { isCollapsed } = useSidebar();

        const baseClasses = cn(
            "group relative flex w-full items-center gap-3 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 outline-none",
            isActive
                ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
                : "text-neutral-600 hover:bg-neutral-100/60 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-50",
            isCollapsed && "justify-center px-0 py-2",
            className
        );

        const innerContent = (
            <>
                {Icon && (
                    <Icon
                        className={cn(
                            "h-4 w-4 shrink-0",
                            isActive ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300",
                            isCollapsed && "h-5 w-5"
                        )}
                    />
                )}
                {!isCollapsed && label && <span className="truncate">{label}</span>}
                {!isCollapsed && badge && (
                    <span className="ml-auto inline-flex h-5 items-center justify-center rounded-md bg-neutral-200/50 px-1.5 text-[10px] font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                        {badge}
                    </span>
                )}

                {/* Collapsed Tooltip using CSS */}
                {isCollapsed && label && (
                    <div className="absolute left-full ml-2 hidden w-auto min-w-max items-center justify-center rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:flex group-hover:opacity-100 lg:group-hover:flex dark:bg-neutral-50 dark:text-neutral-900 z-50 pointer-events-none">
                        {label}
                    </div>
                )}
            </>
        );

        if (asChild) {
            if (React.isValidElement<{ className?: string }>(children)) {
                return React.cloneElement(children, {
                    ref: ref as any,
                    className: cn(baseClasses, children.props.className),
                    "aria-current": isActive ? "page" : undefined,
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

    if (isCollapsed) {
        return (
            <SidebarItem
                icon={Icon}
                label={label}
                isActive={isActive}
                className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                onClick={() => {
                    // In a real app, clicking a group icon in collapsed mode might navigate to the group index or open a popover.
                    // For now, it just behaves like a tooltip item.
                }}
            />
        );
    }

    return (
        <div className="flex flex-col space-y-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className={cn(
                    "group flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 outline-none",
                    isActive
                        ? "text-neutral-900 dark:text-neutral-50"
                        : "text-neutral-600 hover:bg-neutral-100/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-50"
                )}
            >
                <div className="flex items-center gap-3 truncate">
                    {Icon && (
                        <Icon
                            className={cn(
                                "h-4 w-4 shrink-0",
                                isActive
                                    ? "text-neutral-900 dark:text-neutral-50"
                                    : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
                            )}
                        />
                    )}
                    <span className="truncate">{label}</span>
                </div>
                <ChevronRight
                    className={cn(
                        "h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 dark:text-neutral-500",
                        isOpen && "rotate-90"
                    )}
                />
            </button>
            {isOpen && (
                <div className="ml-4 mt-1 flex flex-col space-y-1 pl-3 border-l border-neutral-200 dark:border-neutral-800/60">
                    {children}
                </div>
            )}
        </div>
    );
}

export function SidebarCollapseTrigger({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { isCollapsed, setCollapsed } = useSidebar();

    return (
        <button
            onClick={() => setCollapsed(!isCollapsed)}
            className={cn(
                "hidden h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 lg:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400",
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

export function SidebarMobileTrigger({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { setMobileOpen } = useSidebar();

    return (
        <button
            onClick={() => setMobileOpen(true)}
            className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 lg:hidden dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
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
        { label: "Dashboard", icon: Home, isActive: true },
        { label: "Inbox", icon: Inbox, badge: 12 },
        { label: "Alerts", icon: Bell, badge: "3" },
    ],
    secondary: [
        {
            group: "Projects",
            items: [
                { label: "All Projects", icon: Folder },
                { label: "Recent", icon: Folder },
            ],
        },
        {
            group: "Team Management",
            icon: Users,
            isActive: false,
            items: [
                { label: "Members", href: "#" },
                { label: "Roles", href: "#" },
                { label: "Activity Log", href: "#" },
            ],
        },
    ],
    utility: [
        { label: "Settings", icon: Settings },
        { label: "Help Center", icon: HelpCircle },
    ],
    user: {
        name: "Jane Developer",
        email: "jane@company.com",
        avatar: UserCircle,
    },
};

export default function SidebarStandard() {
    return (
        <SidebarProvider defaultCollapsed={false}>
            <SidebarLayout>
                {/* SIDEBAR */}
                <Sidebar>
                    <SidebarHeader>
                        <div className="flex items-center gap-3 font-semibold text-neutral-900 dark:text-neutral-50 overflow-hidden">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900">
                                <span className="text-[12px] font-bold">{NAVIGATION_DATA.brand.icon}</span>
                            </div>
                            <span className="text-sm tracking-tight truncate">
                                {NAVIGATION_DATA.brand.name}
                            </span>
                        </div>
                        <SidebarCollapseTrigger />
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
                                    <SidebarSubMenu
                                        label={section.group!}
                                        icon={section.icon}
                                        isActive={section.isActive}
                                    >
                                        {section.items.map((subItem) => (
                                            <SidebarItem
                                                key={subItem.label}
                                                label={subItem.label}
                                                className="text-neutral-500 py-1"
                                            />
                                        ))}
                                    </SidebarSubMenu>
                                ) : (
                                    section.items.map((item) => (
                                        <SidebarItem
                                            key={item.label}
                                            label={item.label}
                                            icon={item.icon}
                                        />
                                    ))
                                )}
                            </SidebarGroup>
                        ))}

                        <div className="mt-auto pt-8">
                            <SidebarGroup>
                                {NAVIGATION_DATA.utility.map((item) => (
                                    <SidebarItem
                                        key={item.label}
                                        label={item.label}
                                        icon={item.icon}
                                    />
                                ))}
                            </SidebarGroup>
                        </div>
                    </SidebarContent>

                    <SidebarFooter>
                        <button className="group flex w-full items-center gap-3 rounded-md p-2 text-left text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:focus-visible:ring-neutral-600">
                            <NAVIGATION_DATA.user.avatar className="h-8 w-8 shrink-0 rounded-full border border-neutral-200 p-1 dark:border-neutral-800" />
                            <div className="flex min-w-0 flex-col group-hover:text-neutral-900 dark:group-[.w-\[72px\]]:hidden dark:group-hover:text-neutral-50">
                                <span className="truncate text-[13px] font-semibold text-neutral-900 dark:text-neutral-100">
                                    {NAVIGATION_DATA.user.name}
                                </span>
                                <span className="truncate text-[11px] text-neutral-500">
                                    {NAVIGATION_DATA.user.email}
                                </span>
                            </div>
                        </button>
                    </SidebarFooter>
                </Sidebar>

                {/* MAIN CONTENT AREA */}
                <div className="flex flex-1 flex-col min-w-0">
                    <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:px-6 dark:border-neutral-800 dark:bg-neutral-950">
                        <div className="flex items-center gap-4">
                            <SidebarMobileTrigger />
                            <h1 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hidden sm:block">
                                Dashboard
                            </h1>
                        </div>
                        <div className="relative w-full max-w-sm flex items-center">
                            <Search className="absolute left-2.5 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                            <input
                                type="search"
                                placeholder="Search resources... (⌘K)"
                                className="h-9 w-full rounded-md border border-neutral-200 bg-neutral-100 pl-9 pr-4 text-sm outline-none transition-colors focus:border-neutral-300 focus:bg-white focus:ring-2 focus:ring-neutral-400 focus:ring-offset-1 focus:ring-offset-white dark:border-neutral-800 dark:bg-neutral-900 dark:focus:border-neutral-600 dark:focus:bg-neutral-950 dark:focus:ring-neutral-600 dark:focus:ring-offset-neutral-950"
                            />
                        </div>
                    </header>
                    <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-neutral-50/50 dark:bg-transparent">
                        <div className="mx-auto max-w-4xl space-y-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-32 rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50"
                                    />
                                ))}
                            </div>
                            <div className="h-96 rounded-xl border border-neutral-200 bg-white shadow-sm flex items-center justify-center text-sm text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50">
                                Application Content
                            </div>
                        </div>
                    </main>
                </div>
            </SidebarLayout>
        </SidebarProvider>
    );
}