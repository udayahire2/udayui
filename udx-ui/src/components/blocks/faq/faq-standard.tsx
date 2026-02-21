"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: string
  question: string
  answer: React.ReactNode
}

export interface FaqStandardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  items?: FaqItem[]
  columns?: 1 | 2
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_ITEMS: FaqItem[] = [
  {
    id: "faq-std-1",
    question: "What is UDX UI?",
    answer:
      "UDX UI is a production-grade component library built for React and Next.js. It ships accessible, composable primitives that snap into any design system through CSS token overrides.",
  },
  {
    id: "faq-std-2",
    question: "Is it compatible with Next.js App Router?",
    answer:
      "Yes. Interactive components carry the \"use client\" directive only where necessary. Everything else is server-safe and works without any provider wrappers.",
  },
  {
    id: "faq-std-3",
    question: "Can I use a custom design system?",
    answer:
      "Absolutely. Override CSS custom properties at :root and every component inherits the change automatically — no component source forks required.",
  },
  {
    id: "faq-std-4",
    question: "Does it support dark mode?",
    answer:
      "Yes. All color values reference semantic CSS variables. Adding the dark class to your root element flips every token at once with zero component-level changes.",
  },
  {
    id: "faq-std-5",
    question: "How is accessibility handled?",
    answer:
      "WAI-ARIA patterns are built into every interactive primitive. All components pass keyboard navigation, focus management, and screen reader requirements by default.",
  },
  {
    id: "faq-std-6",
    question: "Is there a free tier?",
    answer:
      "Yes. The Community tier ships all core primitives under the MIT license. Pro and Enterprise tiers add premium blocks, advanced patterns, and commercial use rights.",
  },
]

// ─── FAQ Card ─────────────────────────────────────────────────────────────────

function FaqCard({ item, index }: { item: FaqItem; index: number }) {
  const num = String(index + 1).padStart(2, "0")

  return (
    <article
      className="group relative flex flex-col gap-3 rounded-lg border border-border bg-background p-6 transition-colors duration-150 hover:bg-muted/30"
      aria-labelledby={`faq-q-${item.id}`}
    >
      {/* Index badge */}
      <span
        className="inline-flex items-center self-start rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground/60 select-none"
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Question */}
      <h3
        id={`faq-q-${item.id}`}
        className="text-sm sm:text-base font-semibold leading-snug text-foreground"
      >
        {item.question}
      </h3>

      {/* Divider */}
      <div className="h-px w-full bg-border/60" aria-hidden="true" />

      {/* Answer */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {item.answer}
      </p>
    </article>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function FaqStandard({
  title = "Frequently Asked Questions",
  description = "Everything you need to know about UDX UI and how it helps you build better software.",
  items = DEFAULT_ITEMS,
  columns = 2,
  className,
  ...props
}: FaqStandardProps) {
  return (
    <section
      className={cn("w-full py-14 md:py-20 bg-background", className)}
      aria-labelledby="faq-std-heading"
      {...props}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="mb-10 md:mb-14 max-w-xl">
          <h2
            id="faq-std-heading"
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

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        <div
          className={cn(
            "grid gap-4",
            columns === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1"
          )}
          role="list"
          aria-label="FAQ list"
        >
          {items.map((item, idx) => (
            <div key={item.id} role="listitem">
              <FaqCard item={item} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqStandard