"use client"

import { useParams } from "next/navigation";
import { uiDemoRegistry } from "@/registry/ui-registry";
import { ResizablePreview } from "@/components/ui/resizable-preview";

export default function UIPreviewPage() {
    const params = useParams<{ file: string }>();
    const item = params.file ? uiDemoRegistry[params.file] : null;

    if (!item) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <p className="text-muted-foreground">Component not found.</p>
            </div>
        );
    }

    const Component = item.component;

    return (
        <ResizablePreview title={item.name} backHref="/preview?tab=ui">
            <Component />
        </ResizablePreview>
    );
}
