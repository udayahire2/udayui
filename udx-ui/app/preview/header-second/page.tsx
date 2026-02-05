import HeaderSecond from "@/components/blocks/HeaderSecond";

export default function HeaderSecondPreviewPage() {
    return (
        <div className="relative min-h-[200vh] w-full bg-neutral-950">
            <HeaderSecond />

            <div className="pt-32 px-4 max-w-5xl mx-auto space-y-8">
                <div className="h-64 w-full bg-neutral-900/50 rounded-3xl border border-white/5 flex items-center justify-center">
                    <p className="text-neutral-500">Scroll down to see the header effect</p>
                </div>
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-32 w-full bg-neutral-900/20 rounded-2xl border border-white/5" />
                ))}
            </div>
        </div>
    );
}
