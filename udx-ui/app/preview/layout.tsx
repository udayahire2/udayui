import { ModeToggle } from "@/components/ui/mode-toggle";

export default function PreviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased relative">
            <div className="absolute top-4 right-4 z-[100]">
                <ModeToggle />
            </div>
            {children}
        </div>
    );
}
