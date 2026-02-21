"use client"

import * as React from "react"
import { Plus, Minus } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export interface FaqItem {
  id: string
  question: string
  answer: React.ReactNode
}

export interface FaqMinimalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  items?: FaqItem[]
  defaultValue?: string
}

const defaultFaqData: FaqItem[] = [
  {
    id: "item-1",
    question: "What is UDX UI?",
    answer: "UDX UI is a modern, accessible, and performant UI component library built for React applications. It provides a comprehensive set of pre-built components to help developers build beautiful interfaces faster.",
  },
  {
    id: "item-2",
    question: "Is it compatible with Next.js?",
    answer: "Yes, UDX UI is fully compatible with Next.js, including the App Router. All components are designed to work seamlessly with Server Components and Client Components where appropriate.",
  },
  {
    id: "item-3",
    question: "Can I customize the styling?",
    answer: "Absolutely. UDX UI is built on top of Tailwind CSS, allowing you to easily customize the look and feel of every component using utility classes or by modifying the theme configuration.",
  },
  {
    id: "item-4",
    question: "Does it support dark mode?",
    answer: "Yes, all components rely on CSS variables for coloring, making dark mode support automatic and effortless. You can toggle between themes using the built-in theme provider.",
  },
  {
    id: "item-5",
    question: "Is it accessible?",
    answer: "Accessibility is a core priority. We follow WAI-ARIA patterns and ensure all interactive elements are keyboard navigable and screen reader friendly.",
  },
]

// Pure opacity/color transition preserving accessibility & motion rules.
const StateIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="relative h-4 w-4 shrink-0 text-muted-foreground ml-2">
      <Plus
        className={cn(
          "absolute inset-0 h-4 w-4 transition-opacity duration-150 ease-in-out",
          isOpen ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      />
      <Minus
        className={cn(
          "absolute inset-0 h-4 w-4 transition-opacity duration-150 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />
    </div>
  )
}

export function FaqMinimal({
  title = "Frequently Asked Questions",
  description = "Everything you need to know about UDX UI and how it helps you build better software.",
  items = defaultFaqData,
  defaultValue,
  className,
  ...props
}: FaqMinimalProps) {
  const [openItem, setOpenItem] = React.useState<string>(defaultValue || "")

  return (
    <section className={cn("w-full py-12 md:py-16 bg-background", className)} {...props}>
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {(title || description) && (
          <div className="flex flex-col space-y-3 mb-10 text-left">
            {title && (
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full flex-col space-y-0"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-border/50 first:border-t hover:bg-muted/30 px-2 sm:px-4 transition-colors duration-150"
              >
                <AccordionTrigger className="text-left py-4 text-sm sm:text-base font-medium hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-[2px] [&>svg]:hidden">
                  <span className="flex-1 pr-4">{item.question}</span>
                  <StateIcon isOpen={openItem === item.id} />
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-4 leading-relaxed pr-8">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}