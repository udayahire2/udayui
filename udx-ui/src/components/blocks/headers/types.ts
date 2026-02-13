/**
 * Shared types for header/navbar components
 */
export interface NavigationItem {
    name: string;
    href: string;
}

export interface NavbarBaseProps {
    logo?: React.ReactNode;
    logoText?: string;
    navItems?: NavigationItem[];
    showThemeToggle?: boolean;
}
