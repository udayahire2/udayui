"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { registry, categories, ComponentItem } from "@/registry/components";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ArrowUpRight, LayoutGrid, Blocks } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   UI Component catalogue
   — every file in components/ui/ that exports a default or
     named export that's meaningful to show.
   We describe them statically for fast, SSR-safe rendering.
────────────────────────────────────────────────────────────── */
type UIItem = {
    name: string;
    file: string;
    description: string;
    tags: string[];
};

const uiComponents: UIItem[] = [
    { name: "Accordion", file: "accordion", description: "Vertically collapsible content panels.", tags: ["disclosure", "layout"] },
    { name: "Alert", file: "alert", description: "Informational feedback banners with variants.", tags: ["feedback"] },
    { name: "Alert Dialog", file: "alert-dialog", description: "Accessible modal confirmation dialogs.", tags: ["overlay", "modal"] },
    { name: "Animated Shader Background", file: "animated-shader-background", description: "GPU-accelerated WebGL shader backgrounds.", tags: ["visual", "animation"] },
    { name: "Aspect Ratio", file: "aspect-ratio", description: "Constraint boxes to a fixed aspect ratio.", tags: ["layout"] },
    { name: "Avatar", file: "avatar", description: "User profile image with fallback initials.", tags: ["identity"] },
    { name: "Badge", file: "badge", description: "Compact status and label indicators.", tags: ["label"] },
    { name: "Breadcrumb", file: "breadcrumb", description: "Navigation trail for hierarchical pages.", tags: ["navigation"] },
    { name: "Button", file: "button", description: "Versatile action button with multiple variants.", tags: ["input", "action"] },
    { name: "Button Group", file: "button-group", description: "Grouped set of related action buttons.", tags: ["input", "action"] },
    { name: "Calendar", file: "calendar", description: "Date picker with month/week/day navigation.", tags: ["input", "date"] },
    { name: "Card", file: "card", description: "Content container with header/footer slots.", tags: ["layout", "container"] },
    { name: "Carousel", file: "carousel", description: "Swipeable slide carousel with controls.", tags: ["media", "animation"] },
    { name: "Chart", file: "chart", description: "Recharts-powered responsive data charts.", tags: ["data", "visualization"] },
    { name: "Chat Icons", file: "chat-icons", description: "Icon set for AI chat interfaces.", tags: ["icon", "chat"] },
    { name: "Checkbox", file: "checkbox", description: "Accessible boolean toggle checkbox.", tags: ["input", "form"] },
    { name: "Collapsible", file: "collapsible", description: "Animated expand/collapse content wrapper.", tags: ["disclosure"] },
    { name: "Combobox", file: "combobox", description: "Searchable dropdown with autocomplete.", tags: ["input", "select"] },
    { name: "Command", file: "command", description: "Command palette with fuzzy search.", tags: ["navigation", "search"] },
    { name: "Context Menu", file: "context-menu", description: "Right-click contextual action menus.", tags: ["overlay", "menu"] },
    { name: "Dialog", file: "dialog", description: "Accessible modal dialog overlay.", tags: ["overlay", "modal"] },
    { name: "Dots Horizontal Icon", file: "dots-horizontal-icon", description: "Animated horizontal dots / ellipsis icon.", tags: ["icon", "animation"] },
    { name: "Drawer", file: "drawer", description: "Slide-in panel from screen edge.", tags: ["overlay", "navigation"] },
    { name: "Dropdown Menu", file: "dropdown-menu", description: "Floating dropdown with nested sub-menus.", tags: ["overlay", "menu"] },
    { name: "Empty", file: "empty", description: "Empty-state illustration and messaging.", tags: ["feedback", "layout"] },
    { name: "Field", file: "field", description: "Form field wrapper with label and error.", tags: ["form", "input"] },
    { name: "Form", file: "form", description: "React Hook Form integrated form primitives.", tags: ["form"] },
    { name: "Full Width Divider", file: "full-width-divider", description: "Edge-to-edge section separator line.", tags: ["layout"] },
    { name: "Hover Card", file: "hover-card", description: "Rich tooltip card triggered on hover.", tags: ["overlay", "tooltip"] },
    { name: "Input", file: "input", description: "Single-line text input with theming.", tags: ["form", "input"] },
    { name: "Input Group", file: "input-group", description: "Composed input with prefix/suffix slots.", tags: ["form", "input"] },
    { name: "Input OTP", file: "input-otp", description: "Segmented OTP / PIN code input.", tags: ["form", "input"] },
    { name: "Item", file: "item", description: "Generic list-item with icon and meta slots.", tags: ["layout", "list"] },
    { name: "KBD", file: "kbd", description: "Keyboard shortcut key badge.", tags: ["label", "accessibility"] },
    { name: "Label", file: "label", description: "Accessible form field label.", tags: ["form"] },
    { name: "Liquid Glassy Button", file: "liquid-glassy-button", description: "Glassmorphism liquid-effect interactive button.", tags: ["input", "animation", "action"] },
    { name: "Menubar", file: "menubar", description: "Horizontal application menu bar.", tags: ["navigation", "menu"] },
    { name: "Mode Toggle", file: "mode-toggle", description: "Light/dark theme toggle button.", tags: ["theming", "action"] },
    { name: "Native Select", file: "native-select", description: "Styled native HTML select element.", tags: ["form", "input"] },
    { name: "Navigation Menu", file: "navigation-menu", description: "Accessible top-level navigation menu.", tags: ["navigation"] },
    { name: "Pagination", file: "pagination", description: "Page navigation with previous/next controls.", tags: ["navigation", "data"] },
    { name: "Popover", file: "popover", description: "Floating content triggered by an element.", tags: ["overlay"] },
    { name: "Progress", file: "progress", description: "Linear progress bar with value control.", tags: ["feedback", "data"] },
    { name: "Radio Group", file: "radio-group", description: "Exclusive single-select radio buttons.", tags: ["form", "input"] },
    { name: "Resizable Preview", file: "resizable-preview", description: "Drag-to-resize component preview frame.", tags: ["layout", "developer"] },
    { name: "Resizable", file: "resizable", description: "Drag-handle resizable panel layout.", tags: ["layout"] },
    { name: "Scroll Area", file: "scroll-area", description: "Custom-styled scrollable container.", tags: ["layout"] },
    { name: "Select", file: "select", description: "Accessible styleable select/dropdown.", tags: ["form", "input"] },
    { name: "Separator", file: "separator", description: "Horizontal or vertical divider line.", tags: ["layout"] },
    { name: "Sheet", file: "sheet", description: "Slide-over panel with header/content/footer.", tags: ["overlay", "navigation"] },
    { name: "Sidebar", file: "sidebar", description: "Collapsible application sidebar with slots.", tags: ["navigation", "layout"] },
    { name: "Skeleton", file: "skeleton", description: "Loading placeholder skeleton block.", tags: ["feedback", "loading"] },
    { name: "Slider", file: "slider", description: "Range input slider with custom thumb.", tags: ["form", "input"] },
    { name: "Smooth Button", file: "smooth-button", description: "Neumorphic liquid-feel interactive controls.", tags: ["input", "animation", "action"] },
    { name: "Sonner", file: "sonner", description: "Toast notification via Sonner library.", tags: ["feedback", "notification"] },
    { name: "Spinner", file: "spinner", description: "Animated loading spinner indicator.", tags: ["feedback", "loading"] },
    { name: "Switch", file: "switch", description: "Toggle switch for on/off boolean state.", tags: ["form", "input"] },
    { name: "Table", file: "table", description: "Semantic accessible data table.", tags: ["data", "layout"] },
    { name: "Tabs", file: "tabs", description: "Tab group for switching between content panels.", tags: ["navigation", "layout"] },
    { name: "Textarea", file: "textarea", description: "Multi-line text input area.", tags: ["form", "input"] },
    { name: "Toggle", file: "toggle", description: "Pressed-state toggle button.", tags: ["input", "action"] },
    { name: "Toggle Group", file: "toggle-group", description: "Grouped set of toggle buttons.", tags: ["input", "action"] },
    { name: "Tooltip", file: "tooltip", description: "Lightweight popup label on hover/focus.", tags: ["overlay", "tooltip"] },
    { name: "UDX Logo", file: "udx-logo", description: "Animated UDX UI brand logo mark.", tags: ["brand", "visual"] },
];

/* ─────────────────────────────────────────
   Tag colour mapping
───────────────────────────────────────── */
const TAG_COLORS: Record<string, string> = {
    input: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    form: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    navigation: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    overlay: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    layout: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    feedback: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    data: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    animation: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    action: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    visual: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    loading: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    default: "bg-muted text-muted-foreground border-border",
};

function tagClass(tag: string) {
    return TAG_COLORS[tag] ?? TAG_COLORS.default;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function PreviewPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"blocks" | "ui">(
        (searchParams.get("tab") as "blocks" | "ui") === "ui" ? "ui" : "blocks"
    );

    const switchTab = (tab: "blocks" | "ui") => {
        setActiveTab(tab);
        router.replace(`/preview?tab=${tab}`, { scroll: false });
    };

    const groupedComponents = categories.reduce((acc, category) => {
        acc[category] = Object.values(registry).filter(
            (item) => item.category === category
        );
        return acc;
    }, {} as Record<string, ComponentItem[]>);

    const totalBlocks = Object.values(registry).length;

    return (
        <div className="min-h-screen bg-background text-foreground">

            {/* ── Top Bar ── */}
            <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold tracking-tight text-foreground">
                            UDX UI
                        </span>
                        <span className="hidden h-4 w-px bg-border sm:block" />
                        <span className="hidden text-xs text-muted-foreground sm:block">
                            Component Library
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs tabular-nums text-muted-foreground">
                            {activeTab === "blocks"
                                ? `${totalBlocks} blocks`
                                : `${uiComponents.length} components`}
                        </span>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            {/* ── Page Header ── */}
            <div className="border-b border-border bg-muted/30">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Preview
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Component Gallery
                    </h1>
                    <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
                        Production-ready components for SaaS products. Click any item
                        to open its isolated preview.
                    </p>

                    {/* ── Navigation Tabs ── */}
                    <div className="mt-7 flex items-center gap-1">
                        <button
                            onClick={() => switchTab("blocks")}
                            className={[
                                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                activeTab === "blocks"
                                    ? "bg-foreground text-background shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            ].join(" ")}
                        >
                            <Blocks className="size-4" aria-hidden />
                            Blocks
                            <span
                                className={[
                                    "tabular-nums rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                                    activeTab === "blocks"
                                        ? "bg-background/15 text-background"
                                        : "bg-muted-foreground/15 text-muted-foreground",
                                ].join(" ")}
                            >
                                {totalBlocks}
                            </span>
                        </button>

                        <button
                            onClick={() => switchTab("ui")}
                            className={[
                                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                activeTab === "ui"
                                    ? "bg-foreground text-background shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            ].join(" ")}
                        >
                            <LayoutGrid className="size-4" aria-hidden />
                            UI
                            <span
                                className={[
                                    "tabular-nums rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none",
                                    activeTab === "ui"
                                        ? "bg-background/15 text-background"
                                        : "bg-muted-foreground/15 text-muted-foreground",
                                ].join(" ")}
                            >
                                {uiComponents.length}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            {activeTab === "blocks" ? (
                <BlocksPanel groupedComponents={groupedComponents} />
            ) : (
                <UIPanel />
            )}

            {/* ── Footer ── */}
            <footer className="border-t border-border mt-8">
                <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        UDX UI — Built with Next.js, TypeScript &amp; Tailwind CSS
                    </span>
                    <span className="text-xs tabular-nums text-muted-foreground">
                        {activeTab === "blocks" ? totalBlocks : uiComponents.length}{" "}
                        {activeTab === "blocks" ? "blocks" : "components"}
                    </span>
                </div>
            </footer>
        </div>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BLOCKS PANEL — existing category grid
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function BlocksPanel({
    groupedComponents,
}: {
    groupedComponents: Record<string, ComponentItem[]>;
}) {
    return (
        <main className="mx-auto max-w-7xl px-6 py-12 space-y-14">
            {categories.map((category) => {
                const items = groupedComponents[category];
                if (!items || items.length === 0) return null;

                return (
                    <section key={category} aria-labelledby={`cat-${category}`}>

                        {/* Category label row */}
                        <div className="mb-5 flex items-baseline justify-between border-b border-border pb-3">
                            <div className="flex items-baseline gap-3">
                                <h2
                                    id={`cat-${category}`}
                                    className="text-base font-semibold text-foreground"
                                >
                                    {category}
                                </h2>
                                <span className="text-xs text-muted-foreground tabular-nums">
                                    {items.length}{" "}
                                    {items.length === 1 ? "component" : "components"}
                                </span>
                            </div>
                        </div>

                        {/* Component grid */}
                        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 rounded-md border border-border overflow-hidden bg-border">
                            {items.map((component) => (
                                <ComponentCard
                                    key={component.slug}
                                    component={component}
                                />
                            ))}
                        </div>

                    </section>
                );
            })}
        </main>
    );
}

/* ── Block Component Card ── */
function ComponentCard({ component }: { component: ComponentItem }) {
    return (
        <Link
            href={`/preview/${component.slug}`}
            className="group flex flex-col justify-between bg-background px-5 py-4 transition-colors duration-150 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
            <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground leading-snug">
                        {component.name}
                    </span>
                    <ArrowUpRight
                        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                        aria-hidden
                    />
                </div>

                {component.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {component.description}
                    </p>
                )}
            </div>

            <div className="mt-4">
                <code className="inline-block rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                    {component.slug}
                </code>
            </div>
        </Link>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   UI PANEL — primitive component grid
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function UIPanel() {
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const allTags = Array.from(
        new Set(uiComponents.flatMap((c) => c.tags))
    ).sort();

    const filtered = uiComponents.filter((c) => {
        const q = search.toLowerCase();
        const matchesSearch =
            !q ||
            c.name.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.tags.some((t) => t.includes(q));
        const matchesTag = !activeTag || c.tags.includes(activeTag);
        return matchesSearch && matchesTag;
    });

    return (
        <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">

            {/* Search + Tag Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* Search */}
                <div className="relative w-full max-w-xs">
                    <svg
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="search"
                        placeholder="Search components…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>

                {/* Tag strip */}
                <div className="flex flex-wrap gap-1.5">
                    <button
                        onClick={() => setActiveTag(null)}
                        className={[
                            "rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                            !activeTag
                                ? "border-foreground/30 bg-foreground text-background"
                                : "border-border bg-transparent text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() =>
                                setActiveTag((prev) => (prev === tag ? null : tag))
                            }
                            className={[
                                "rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize transition-colors",
                                activeTag === tag
                                    ? tagClass(tag)
                                    : "border-border bg-transparent text-muted-foreground hover:text-foreground",
                            ].join(" ")}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            {(search || activeTag) && (
                <p className="text-xs text-muted-foreground tabular-nums">
                    {filtered.length} of {uiComponents.length} components
                </p>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 rounded-md border border-border overflow-hidden bg-border">
                    {filtered.map((item) => (
                        <UICard key={item.file} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <p className="text-sm font-medium text-foreground">
                        No components found
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Try adjusting your search or filter.
                    </p>
                    <button
                        onClick={() => { setSearch(""); setActiveTag(null); }}
                        className="mt-4 text-xs font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </main>
    );
}

/* ── UI Component Card ── */
function UICard({ item }: { item: UIItem }) {
    return (
        <Link
            href={`/preview/ui/${item.file}`}
            className="group flex flex-col justify-between bg-background px-5 py-4 hover:bg-muted/50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        >
            <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                    <span className="text-sm font-medium text-foreground leading-snug">
                        {item.name}
                    </span>
                    <ArrowUpRight
                        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                        aria-hidden
                    />
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag) => (
                        <span
                            key={tag}
                            className={[
                                "rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize",
                                tagClass(tag),
                            ].join(" ")}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-4">
                <code className="inline-block rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                    components/ui/{item.file}
                </code>
            </div>
        </Link>
    );
}
