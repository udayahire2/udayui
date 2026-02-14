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
    const isHeroComponent = componentItem.category === "Heroes";

    return (
        <>
            {isHeaderComponent ? (
                // Full-page preview for headers - like real browser
                <ResizablePreview
                    title={componentItem.name}
                    backHref="/preview"
                    isFullPagePreview={true}
                >
                    <div className="w-full min-h-screen flex flex-col bg-background">
                        <Component />
                        {/* Demo content for scroll testing */}
                        <div className="flex-1 px-4 sm:px-8 py-16">
                            <div className="max-w-5xl mx-auto space-y-12">
                                {/* Hero Section */}
                                <div className="text-center space-y-4 py-12">
                                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                        Test Header Scroll Behavior
                                    </h1>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                        Scroll down to see how the header transforms and animates. This page contains enough content to properly test scroll-based animations.
                                    </p>
                                </div>

                                {/* Content Sections */}
                                {[
                                    {
                                        title: "Introduction",
                                        content: "This is a demo page designed to test header scroll animations. As you scroll, watch how the header responds with smooth transitions and morphing effects."
                                    },
                                    {
                                        title: "Features",
                                        content: "Modern headers often include scroll-based animations like changing opacity, size, background blur, or even morphing into different shapes. This content helps you test all those behaviors."
                                    },
                                    {
                                        title: "Design Principles",
                                        content: "Good scroll animations should be smooth, performant, and enhance the user experience without being distracting. They should feel natural and respond immediately to user input."
                                    },
                                    {
                                        title: "Implementation",
                                        content: "Scroll animations can be implemented using various techniques including CSS transforms, Framer Motion, or vanilla JavaScript. Each approach has its own benefits and trade-offs."
                                    },
                                    {
                                        title: "Performance",
                                        content: "When implementing scroll animations, it's crucial to consider performance. Use GPU-accelerated properties like transform and opacity, and avoid triggering layout recalculations."
                                    },
                                    {
                                        title: "Accessibility",
                                        content: "Remember to respect user preferences for reduced motion. Some users may experience discomfort with animations, so always provide a way to disable or reduce them."
                                    },
                                    {
                                        title: "Testing",
                                        content: "Test your scroll animations across different devices and browsers. What works smoothly on desktop might feel different on mobile devices with touch scrolling."
                                    },
                                    {
                                        title: "Best Practices",
                                        content: "Keep animations subtle and purposeful. The header should enhance navigation without drawing too much attention away from the main content."
                                    },
                                ].map((section, i) => (
                                    <div key={i} className="p-8 border border-border rounded-lg bg-card shadow-sm">
                                        <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}

                                {/* Footer Spacer */}
                                <div className="py-12 text-center text-sm text-muted-foreground">
                                    <p>Scroll back to the top to see the header animation in reverse</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ResizablePreview>
            ) : isHeroComponent ? (
                // Full-width preview for hero sections
                <ResizablePreview
                    title={componentItem.name}
                    backHref="/preview"
                    isFullPagePreview={true}
                >
                    <div className="w-full min-h-screen bg-background">
                        <Component />
                    </div>
                </ResizablePreview>
            ) : (
                // Regular preview for other components (testimonials, features, etc.)
                <ResizablePreview title={componentItem.name} backHref="/preview">
                    <Component />
                </ResizablePreview>
            )}
        </>
    );
}
