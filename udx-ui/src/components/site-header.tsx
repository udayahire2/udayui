"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/blocks/main-header";

export function SiteHeader() {
    const pathname = usePathname();

    // Hide the global header on all preview pages to avoid conflict
    // with the components being previewed (especially other headers)
    if (pathname?.includes("/preview")) {
        return null;
    }

    return <Header />;
}
