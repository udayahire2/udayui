"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer data-[state=checked]:bg-primary z-0 data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-inner transition-colors duration-200 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 cursor-pointer",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background z-10 dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all duration-250 ease-out group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          // Stretch thumb on active
          "group-active/switch:w-5 group-data-[size=sm]/switch:group-active/switch:w-4",
          // Account for stretch width in translation
          "data-[state=checked]:translate-x-[calc(100%-2px)] group-active/switch:data-[state=checked]:translate-x-[calc(100%-6px)] group-data-[size=sm]/switch:group-active/switch:data-[state=checked]:translate-x-[calc(100%-4px)]",
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
