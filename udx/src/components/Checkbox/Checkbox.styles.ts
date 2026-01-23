import { cva } from "../../utils/variants";

export const checkboxVariants = cva(
    "peer relative h-4 w-4 shrink-0 rounded-sm border border-input shadow-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary hover:border-accent-foreground/50 dark:border-white/10 dark:hover:border-white/20 active:scale-95",
    {
        variants: {
            size: {
                sm: "h-3.5 w-3.5",
                md: "h-4 w-4",  // Standard 16px
                lg: "h-5 w-5 rounded-md",
            },
            variant: {
                default: "", // Standard
                circle: "rounded-full", // Circular checkbox
            }
        },
        defaultVariants: {
            size: "md",
            variant: "default",
        },
    }
);

// Container for the icon to ensure proper centering and animation origin
export const indicatorVariants = cva(
    "flex items-center justify-center text-current"
);
