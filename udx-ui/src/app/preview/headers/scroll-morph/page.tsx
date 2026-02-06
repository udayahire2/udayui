"use client";

import HeaderScrollMorph from "@/components/headers/header-scroll-morph";

export default function HeaderScrollMorphPreview() {
    return (
        <div className="relative min-h-[200vh] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            {/* Background Decor to verify transparency */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <HeaderScrollMorph />

            <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">
                <h1 className="text-4xl md:text-6xl font-black text-center mb-8 tracking-tighter uppercase">
                    Futuristic Interface <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                        System Online
                    </span>
                </h1>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg mb-12">
                    Scroll down to see the header transformation. The control deck compacts and solidifies as you engage with the content.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 bg-white dark:bg-black/40 border border-white/20 rounded-2xl p-6 shadow-sm">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg mb-4" />
                            <div className="w-3/4 h-6 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
                            <div className="w-1/2 h-4 bg-neutral-100 dark:bg-neutral-900 rounded" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
