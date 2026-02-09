import { HeroSimple } from "@/components/blocks/hero/hero-simple";

export default function HeroSimplePreview() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <HeroSimple />

            <div className="flex-1 container mx-auto px-6 py-12">
                <div className="h-full rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center text-muted-foreground bg-muted/20">
                    Page Content Follows Hero
                </div>
            </div>
        </div>
    );
}
