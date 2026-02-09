import { HeaderSimple } from "@/components/blocks/header/header-simple";

export default function HeaderSimplePreview() {
    return (
        <div className="w-full h-full min-h-screen bg-background relative">
            <HeaderSimple />
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Content Area</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    This is a placeholder for the page content. The header is sticky and will remain at the top as you scroll.
                </p>
                <div className="h-[200vh] w-full" /> {/* Force scroll */}
            </div>
        </div>
    );
}
