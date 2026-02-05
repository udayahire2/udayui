"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/blocks/Header";

export function SiteHeader() {
    const pathname = usePathname();

    // Hide the global header on the HeaderSecond preview page
    // and potentially other standalone previews in the future
    if (pathname?.includes("/preview/header-second")) {
        return null;
    }

    return <Header />;
}
