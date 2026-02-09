import { HeaderNormal } from "@/components/blocks/header/header-normal";

export default function HeaderNormalPreview() {
    return (
        <div className="w-full h-full min-h-screen bg-background relative">
            <HeaderNormal />
            <div className="container mx-auto px-6 py-24 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight mb-6">Page Content</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Scroll down to see the header's sticky behavior. The background blur and border transition will activate.
                </p>
                <div className="mt-12 grid grid-cols-3 gap-8 text-left">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 rounded-2xl bg-muted/50 border border-border/50" />
                    ))}
                </div>
                <div className="h-[150vh] w-full" />
            </div>
        </div>
    );
}
