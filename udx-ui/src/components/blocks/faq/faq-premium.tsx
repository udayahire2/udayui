"use client"

import * as React from "react"
import { Search, Plus, Minus, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: string
  question: string
  answer: React.ReactNode
  category?: string
}

export interface FaqCategory {
  id: string
  label: string
  description?: string
}

export interface FaqPremiumProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  items?: FaqItem[]
  categories?: FaqCategory[]
  defaultCategory?: string
  defaultValue?: string
  showSearch?: boolean
  supportCta?: {
    label: string
    description: string
    href: string
  }
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES: FaqCategory[] = [
  { id: "all", label: "All topics" },
  { id: "general", label: "General", description: "Product overview" },
  { id: "billing", label: "Billing & Plans", description: "Pricing and invoices" },
  { id: "technical", label: "Technical", description: "Integration and APIs" },
  { id: "security", label: "Security", description: "Data and compliance" },
]

const DEFAULT_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is UDX UI?",
    answer:
      "UDX UI is a production-grade component library built for React and Next.js. It ships with accessible, composable primitives that integrate with your design system via CSS variables.",
    category: "general",
  },
  {
    id: "faq-2",
    question: "Is it compatible with Next.js App Router?",
    answer:
      "Yes. All components are compatible with the App Router. Interactive components are marked with \"use client\" where required; all others are safe to use in Server Components.",
    category: "general",
  },
  {
    id: "faq-3",
    question: "Can I use a custom design token system?",
    answer:
      "Absolutely. UDX UI is built on top of CSS custom properties (variables), so you can override tokens at the :root level to match your brand without forking any component.",
    category: "general",
  },
  {
    id: "faq-4",
    question: "What plans are available?",
    answer:
      "UDX UI offers a free Community tier with core components, a Pro tier with premium blocks and priority updates, and an Enterprise tier with custom SLA and white-label rights.",
    category: "billing",
  },
  {
    id: "faq-5",
    question: "How does billing work?",
    answer:
      "Subscriptions renew monthly or annually. You can upgrade, downgrade, or cancel at any time from your account dashboard. Unused days on a paid plan are prorated on cancellation.",
    category: "billing",
  },
  {
    id: "faq-6",
    question: "Do you offer open-source licenses?",
    answer:
      "The Community tier is MIT-licensed. Pro and Enterprise licenses are commercial; see the license page for full terms including redistribution rights.",
    category: "billing",
  },
  {
    id: "faq-7",
    question: "How do I integrate via npm?",
    answer:
      "Run `npm install @udx/ui` in your project. Follow the setup guide to configure Tailwind, import the base CSS, and add the ThemeProvider. The entire setup takes under 5 minutes.",
    category: "technical",
  },
  {
    id: "faq-8",
    question: "Is there a REST or GraphQL API?",
    answer:
      "UDX UI is a frontend library and does not expose a backend API. It integrates with any data layer you choose — REST, GraphQL, or server actions.",
    category: "technical",
  },
  {
    id: "faq-9",
    question: "How is my data handled?",
    answer:
      "UDX UI is a UI library — we never collect or transmit your application data. Deployment and data handling are entirely within your infrastructure.",
    category: "security",
  },
  {
    id: "faq-10",
    question: "Is UDX UI SOC 2 compliant?",
    answer:
      "SOC 2 compliance applies to your infrastructure, not the library itself. UDX UI follows secure coding practices, ships no telemetry, and has no runtime network dependencies.",
    category: "security",
  },
]

// ─── Subcomponents ────────────────────────────────────────────────────────────

function StateIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className="relative h-4 w-4 shrink-0 text-muted-foreground ml-2"
      aria-hidden="true"
    >
      <Plus
        className={cn(
          "absolute inset-0 h-4 w-4 transition-opacity duration-150 ease-in-out",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <Minus
        className={cn(
          "absolute inset-0 h-4 w-4 transition-opacity duration-150 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />
    </span>
  )
}

function CategoryNav({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: FaqCategory[]
  activeCategory: string
  onSelect: (id: string) => void
}) {
  return (
    <nav aria-label="FAQ categories">
      <ul role="list" className="flex flex-col gap-0.5">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory
          return (
            <li key={cat.id}>
              <button
                type="button"
                onClick={() => onSelect(cat.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <span className="block leading-tight">{cat.label}</span>
                {cat.description && (
                  <span className="block text-xs text-muted-foreground/70 font-normal mt-0.5">
                    {cat.description}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FaqPremium({
  title = "Frequently Asked Questions",
  description = "Everything you need to know about UDX UI. Can't find the answer? Reach out to our team.",
  items = DEFAULT_ITEMS,
  categories = DEFAULT_CATEGORIES,
  defaultCategory = "all",
  defaultValue,
  showSearch = true,
  supportCta = {
    label: "Still have questions?",
    description: "Our team is here to help. Usually responds within one business day.",
    href: "#contact",
  },
  className,
  ...props
}: FaqPremiumProps) {
  const [activeCategory, setActiveCategory] = React.useState(defaultCategory)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [openItem, setOpenItem] = React.useState<string>(defaultValue ?? "")
  const searchId = React.useId()

  // Reset open accordion when category or search changes
  React.useEffect(() => {
    setOpenItem("")
  }, [activeCategory, searchQuery])

  const filteredItems = React.useMemo(() => {
    let result = items

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          (typeof item.answer === "string" && item.answer.toLowerCase().includes(q))
      )
    }

    return result
  }, [items, activeCategory, searchQuery])

  const hasResults = filteredItems.length > 0

  return (
    <section
      className={cn("w-full py-16 md:py-24 bg-background", className)}
      aria-labelledby="faq-heading"
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-12 max-w-2xl">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* ── Body: Sidebar + Accordion ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr] gap-8 lg:gap-12">

          {/* Sidebar */}
          <aside className="lg:pt-1">
            {/* Search */}
            {showSearch && (
              <div className="mb-6">
                <label htmlFor={searchId} className="sr-only">
                  Search questions
                </label>
                <div className="relative">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id={searchId}
                    type="search"
                    placeholder="Search questions…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "w-full h-9 pl-8.5 pr-3 rounded-md border border-border bg-background text-sm",
                      "text-foreground placeholder:text-muted-foreground/60",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                      "transition-colors duration-150"
                    )}
                  />
                </div>
              </div>
            )}

            {/* Category nav — hidden on mobile when search query is active */}
            {!searchQuery && (
              <CategoryNav
                categories={categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />
            )}

            {/* Support CTA */}
            {supportCta && (
              <div className="mt-8 p-4 rounded-lg border border-border bg-muted/30">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground mb-1">
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {supportCta.label}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {supportCta.description}
                </p>
                <a
                  href={supportCta.href}
                  className={cn(
                    "inline-flex items-center h-7 px-3 rounded-md",
                    "text-xs font-medium border border-border bg-background text-foreground",
                    "hover:bg-muted transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                  )}
                >
                  Contact support
                </a>
              </div>
            )}
          </aside>

          {/* Accordion Panel */}
          <div role="region" aria-label="FAQ answers">
            {hasResults ? (
              <Accordion
                type="single"
                collapsible
                value={openItem}
                onValueChange={setOpenItem}
                className="w-full"
              >
                {filteredItems.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className={cn(
                      "border-b border-border/60 first:border-t",
                      "hover:bg-muted/20 transition-colors duration-150",
                      "px-2 sm:px-3"
                    )}
                  >
                    <AccordionTrigger
                      className={cn(
                        "py-4 text-left text-sm font-medium text-foreground",
                        "hover:no-underline [&>svg]:hidden",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 rounded-sm"
                      )}
                    >
                      <span className="flex-1 pr-4">{item.question}</span>
                      <StateIcon isOpen={openItem === item.id} />
                    </AccordionTrigger>
                    <AccordionContent
                      className={cn(
                        "text-sm text-muted-foreground leading-relaxed",
                        "pb-5 pr-8 pt-0"
                      )}
                    >
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-16 text-center"
                role="status"
                aria-live="polite"
              >
                <Search className="h-8 w-8 text-muted-foreground/40 mb-4" aria-hidden="true" />
                <p className="text-sm font-medium text-foreground">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try a different keyword or browse all topics.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("")
                    setActiveCategory("all")
                  }}
                  className={cn(
                    "mt-4 inline-flex items-center h-7 px-3 rounded-md text-xs font-medium",
                    "border border-border bg-background text-foreground hover:bg-muted",
                    "transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Live count for screen readers */}
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {hasResults
                ? `Showing ${filteredItems.length} question${filteredItems.length !== 1 ? "s" : ""}`
                : "No questions match your filter."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FaqPremium};