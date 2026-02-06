import Link from "next/link";

const components = [
    {
        name: "Header (Scroll Morph)",
        slug: "headers/scroll-morph",
        description: "Glassmorphic header that morphs into a pill on scroll.",
        category: "Headers",
    },
    {
        name: "Header (Pill)",
        slug: "headers/pill",
        description: "Always-visible pill-shaped header with smooth animations.",
        category: "Headers",
    },
    {
        name: "Hero (Simple Centered)",
        slug: "hero-sections/simple-centered",
        description: "Clean, centered hero section with calm motion.",
        category: "Hero Sections",
    },
    {
        name: "Hero (Modern Grid)",
        slug: "hero-sections/modern-grid",
        description: "Dark mode hero with grid background and star effects.",
        category: "Hero Sections",
    },
    {
        name: "User Card",
        slug: "user-card",
        description: "A composite card component for displaying user profiles.",
        category: "Blocks",
    },
];

export default function PreviewPage() {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    Component Library
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Browse and test all available UI components. Click on any component to
                    see live examples and usage.
                </p>
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((component) => (
                    <Link
                        key={component.slug}
                        href={`/preview/${component.slug}`}
                        className="group"
                    >
                        <div className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {component.name}
                                    </h3>
                                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                        {component.category}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {component.description}
                                </p>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                                View Examples
                                <svg
                                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {components.length === 1 && (
                <div className="text-center py-12 space-y-4">
                    <div className="text-6xl">🎨</div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        Start Building Components
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                        Add your custom components to <code className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">components/blocks/</code> and create preview pages here.
                    </p>
                </div>
            )}
        </div>
    );
}
