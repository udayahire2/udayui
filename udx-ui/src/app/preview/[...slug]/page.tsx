import { notFound } from "next/navigation";
import { registry } from "@/registry/components";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ResizablePreview } from "@/components/ui/resizable-preview";

interface PreviewPageProps {
    params: Promise<{
        slug: string[];
    }>;
}

export default async function PreviewPage(props: PreviewPageProps) {
    const params = await props.params;
    const slug = params.slug.join("/");
    const componentItem = registry[slug];

    if (!componentItem) {
        return notFound();
    }

    const Component = componentItem.component;
    const isHeaderComponent = componentItem.category === "Headers";

    return (
        <div className="min-h-screen w-full bg-background relative flex flex-col">
            {isHeaderComponent ? (
                // For header components: Floating controls that don't interfere
                <>
                    {/* Floating Back Button */}
                    <div className="fixed top-4 left-4 z-200 flex items-center gap-2">
                        <a
                            href="/preview"
                            className="px-3 py-2 text-sm font-medium text-foreground bg-background/95 backdrop-blur-md border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2 shadow-lg"
                        >
                            <span>←</span> Back
                        </a>
                    </div>

                    {/* Floating Theme Toggle */}
                    <div className="fixed top-4 right-4 z-200">
                        <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg">
                            <ModeToggle />
                        </div>
                    </div>

                    {/* Floating Component Info */}
                    <div className="fixed bottom-4 left-4 right-4 z-200 flex justify-center pointer-events-none">
                        <div className="px-4 py-2 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-lg pointer-events-auto max-w-2xl">
                            <p className="text-xs text-muted-foreground text-center">
                                <span className="font-semibold text-foreground">{componentItem.name}</span>
                                {" • "}
                                {componentItem.description}
                            </p>
                        </div>
                    </div>

                    {/* Full-width preview with scroll demo */}
                    <div className="w-full min-h-screen relative">
                        <Component />
                        {/* Demo content to show scroll behavior */}
                        <div className="relative z-10 px-4 sm:px-8 py-24">
                            <div className="max-w-4xl mx-auto space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold text-foreground">Component Preview</h2>
                                    <p className="text-muted-foreground">{componentItem.description}</p>
                                </div>

                                {/* Dummy content for scroll */}
                                <div className="space-y-6 pt-12">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="p-6 border border-border rounded-lg bg-card">
                                            <h3 className="text-xl font-semibold mb-2">Section {i}</h3>
                                            <p className="text-muted-foreground">
                                                Scroll down to see the header transform. This is demo content to showcase
                                                the header's scroll behavior and animations.
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                // For other components: Standard layout with top nav
                <>
                    {/* Top Navigation Bar */}
                    <div className="sticky top-0 z-50 w-full h-14 border-b border-border bg-background/95 backdrop-blur-md flex items-center justify-between px-4 sm:px-8">
                        <div className="flex items-center gap-4">
                            <a href="/preview" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                <span>←</span> Back
                            </a>
                            <div className="h-4 w-px bg-border" />
                            <h1 className="text-sm font-semibold truncate">{componentItem.name}</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <ModeToggle />
                        </div>
                    </div>

                    {/* Centered preview with background pattern */}
                    <div className="w-full min-h-screen relative flex flex-col items-center justify-start p-6 sm:p-12">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-0 bg-dot-black-20 dark:bg-dot-white-20 pointer-events-none opacity-50" />

                        <div className="w-full max-w-[1400px] mx-auto space-y-4 relative z-10">
                            <ResizablePreview>
                                <Component />
                            </ResizablePreview>
                            <div className="flex items-center justify-center text-xs text-muted-foreground px-1 mt-4">
                                <p>{componentItem.description}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
