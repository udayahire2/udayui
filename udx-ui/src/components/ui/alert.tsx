import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3.5 text-sm grid items-start gap-y-1 has-[>svg]:grid-cols-[18px_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 [&>svg]:col-start-1 [&>svg]:row-span-2 [&>svg]:size-[18px] [&>svg]:translate-y-[1px]",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground border-border shadow-sm [&>svg]:text-muted-foreground *:data-[slot=alert-description]:text-muted-foreground",
        info:
          "bg-blue-50/50 text-blue-900 border-blue-200/80 [&>svg]:text-blue-600 *:data-[slot=alert-description]:text-blue-800/90 dark:bg-blue-950/20 dark:text-blue-200 dark:border-blue-900/50 dark:[&>svg]:text-blue-400 dark:*:data-[slot=alert-description]:text-blue-200/80",
        success:
          "bg-green-50/50 text-green-900 border-green-200/80 [&>svg]:text-green-600 *:data-[slot=alert-description]:text-green-800/90 dark:bg-green-950/20 dark:text-green-200 dark:border-green-900/50 dark:[&>svg]:text-green-400 dark:*:data-[slot=alert-description]:text-green-200/80",
        warning:
          "bg-amber-50/50 text-amber-900 border-amber-200/80 [&>svg]:text-amber-600 *:data-[slot=alert-description]:text-amber-800/90 dark:bg-amber-950/20 dark:text-amber-200 dark:border-amber-900/50 dark:[&>svg]:text-amber-400 dark:*:data-[slot=alert-description]:text-amber-200/80",
        destructive:
          "bg-red-50/50 text-red-900 border-red-200/80 [&>svg]:text-red-600 *:data-[slot=alert-description]:text-red-800/90 dark:bg-red-950/20 dark:text-red-200 dark:border-red-900/50 dark:[&>svg]:text-red-400 dark:*:data-[slot=alert-description]:text-red-200/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 font-medium leading-5 tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-[13px] sm:text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
