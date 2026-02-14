"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import gsap from "gsap"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
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

const AnimatedIcon = ({ isOpen }: { isOpen: boolean }) => {
  const iconRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!iconRef.current) return

    gsap.to(iconRef.current, {
      rotation: isOpen ? 45 : 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [isOpen])

  return (
    <div ref={iconRef} className="flex items-center justify-center">
      <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-colors duration-200" />
    </div>
  )
}

export function FaqMinimal() {
  const [openItem, setOpenItem] = React.useState<string>("")

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed max-w-[600px]">
            Everything you need to know about UDX UI and how it helps you build better software.
          </p>
        </div>

        <div className="w-full">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={openItem}
            onValueChange={setOpenItem}
          >
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline [&>svg]:hidden">
                  <span className="flex-1">{item.question}</span>
                  <AnimatedIcon isOpen={openItem === item.id} />
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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