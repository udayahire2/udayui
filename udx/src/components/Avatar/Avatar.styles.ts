import { cva } from "../../utils/variants";

export const avatarVariants = cva(
    "relative flex shrink-0 overflow-hidden rounded-full transition-all duration-200 ease-out",
    {
        variants: {
            size: {
                sm: "h-8 w-8 text-[10px]", // 32px - Matches Button sm
                md: "h-10 w-10 text-xs",   // 40px - Matches Button default
                lg: "h-12 w-12 text-sm",   // 48px - Matches Button lg
                xl: "h-14 w-14 text-base", // 56px
            },
            variant: {
                default: "bg-muted shadow-sm",
                flat: "bg-muted shadow-none",
                outline: "bg-background ring-1 ring-border shadow-sm dark:ring-white/20", // Crisp ring instead of border
            },
        },
        defaultVariants: {
            size: "md",
            variant: "default",
        },
    }
);

export const avatarImageVariants = cva(
    "aspect-square h-full w-full rounded-full object-cover transition-opacity duration-200"
);

export const avatarFallbackVariants = cva(
    "flex h-full w-full items-center justify-center rounded-full bg-muted font-medium tracking-tight text-muted-foreground", // Added tracking-tight and font-medium
    {
        variants: {
            variant: {
                default: "animate-in fade-in zoom-in-50 duration-200",
                flat: "",
                outline: "bg-background", // Ensure fallback doesn't look like a solid blob in outline mode
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
);

export const avatarBadgeVariants = cva(
    "absolute bottom-0 right-0 z-10 flex items-center justify-center rounded-full border-2 border-background ring-background transition-all",
    {
        variants: {
            size: {
                sm: "h-2.5 w-2.5",
                md: "h-3.5 w-3.5",
                lg: "h-4 w-4",
                xl: "h-5 w-5",
            },
            status: {
                online: "bg-green-500",
                busy: "bg-red-500",
                away: "bg-yellow-500",
                offline: "bg-slate-500",
                count: "border-none bg-red-600 text-[10px] font-bold text-white shadow-sm", // Notification badge
            }
        },
        defaultVariants: {
            size: "md",
            status: "online",
        }
    }
);

export const avatarGroupVariants = cva(
    "flex items-center justify-center -space-x-2",
    {
        variants: {
            size: {
                sm: "-space-x-1.5",
                md: "-space-x-2",
                lg: "-space-x-3",
                xl: "-space-x-4",
            }
        },
        defaultVariants: {
            size: "md"
        }
    }
);
