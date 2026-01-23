import { cva } from "../../utils/variants";

export const buttonVariants = cva(
    // Base: Premium feel with smooth transitions, refined typography, and tactile feedback.
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium tracking-tight transition-[all] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] select-none ring-offset-background",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-foreground/20 dark:border-white/10 dark:hover:border-white/20",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "border border-transparent hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 py-2.5", // Standard comfortable touch target
                sm: "h-8 rounded-md px-3 text-xs", // Distinctly smaller
                lg: "h-12 rounded-md px-8 text-base", // Distinctly larger
                icon: "h-10 w-10",
                "icon-sm": "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);
