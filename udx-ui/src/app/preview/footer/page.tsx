import { FooterPremium } from "@/components/blocks/footers/footer-premium"

export default function FooterPreviewPage() {
    return (
        <div className="min-h-screen bg-transparent flex flex-col justify-end">
            <div className="flex-1 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <p className="text-muted-foreground p-10 opacity-50">Page Content Area (Scroll down to see footer)</p>
            </div>
            <FooterPremium />
        </div>
    )
}
