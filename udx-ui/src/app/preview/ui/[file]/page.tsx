import { notFound } from "next/navigation";
import { uiDemoRegistry } from "@/registry/ui-registry";
import { ResizablePreview } from "@/components/ui/resizable-preview";

interface UIPreviewPageProps {
    params: Promise<{ file: string }>;
}

export default async function UIPreviewPage(props: UIPreviewPageProps) {
    const params = await props.params;
    const item = uiDemoRegistry[params.file];

    if (!item) {
        return notFound();
    }

    const Component = item.component;

    return (
        <ResizablePreview title={item.name} backHref="/preview?tab=ui">
            <Component />
        </ResizablePreview>
    );
}
