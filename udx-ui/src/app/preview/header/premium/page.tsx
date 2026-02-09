import { HeaderPremium } from "@/components/blocks/header/header-premium";

export default function HeaderPremiumPreview() {
    return (
        <div className="w-full min-h-screen bg-background relative overflow-x-hidden">
            {/* Decorative Background for Premium feel */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

            <HeaderPremium />

            <div className="relative container mx-auto px-6 pt-32 pb-24 text-center z-0">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
                    Premium Component
                </div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50">
                    Experience the Difference
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
                    This header features advanced interactions, glassmorphism, and a floating design that elevates your brand perception.
                </p>

                <div className="w-full max-w-5xl mx-auto aspect-video rounded-3xl bg-muted/30 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium">
                        Hero Image / Video Area
                    </div>
                </div>

                <div className="h-[150vh] w-full" />
            </div>
        </div>
    );
}
