"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter, Linkedin, Instagram, Send } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FooterLink {
    label: string
    href: string
    external?: boolean
}

export interface FooterSection {
    title: string
    links: FooterLink[]
}

export interface FooterSocialLink {
    icon: React.ComponentType<{ className?: string }>
    href: string
    label: string
}

export interface FooterPremiumProps {
    /** Brand name displayed in the footer logo area */
    brandName?: string
    /** Brand description / tagline */
    brandDescription?: string
    /** Destination of the brand logo link */
    brandHref?: string
    /** Navigation column sections */
    sections?: FooterSection[]
    /** Social icon links */
    socialLinks?: FooterSocialLink[]
    /** Copyright owner name (defaults to brandName) */
    copyrightOwner?: string
    /** Newsletter section heading */
    newsletterHeading?: string
    /** Newsletter input placeholder text */
    newsletterPlaceholder?: string
    /** Called when newsletter form is submitted with the email value */
    onNewsletterSubmit?: (email: string) => void
    /** Legal notice shown below copyright, e.g. "All rights reserved." */
    legalNotice?: string
    className?: string
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_SECTIONS: FooterSection[] = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#" },
            { label: "Integrations", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
            { label: "Docs", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Partners", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Community", href: "#" },
            { label: "Help Center", href: "#" },
            { label: "Status", href: "#" },
            { label: "Terms of Service", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms & Conditions", href: "#" },
            { label: "Cookie Policy", href: "#" },
        ],
    },
]

const DEFAULT_SOCIAL_LINKS: FooterSocialLink[] = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

interface NewsletterFormProps {
    heading: string
    placeholder: string
    onSubmit?: (email: string) => void
}

function NewsletterForm({ heading, placeholder, onSubmit }: NewsletterFormProps) {
    const [email, setEmail] = React.useState("")
    const inputId = React.useId()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (email.trim()) {
            onSubmit?.(email.trim())
            setEmail("")
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <label
                htmlFor={inputId}
                className="text-sm font-medium text-foreground"
            >
                {heading}
            </label>
            <form onSubmit={handleSubmit} className="flex max-w-sm gap-2" noValidate>
                <Input
                    id={inputId}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    autoComplete="email"
                    required
                    aria-label="Email address"
                    className="flex-1 h-9 text-sm bg-transparent"
                />
                <Button
                    type="submit"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    aria-label="Subscribe to newsletter"
                >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                </Button>
            </form>
            <p className="text-xs text-muted-foreground">
                By subscribing, you agree to our{" "}
                <Link
                    href="#"
                    className="underline underline-offset-2 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function FooterPremium({
    brandName = "UDX UI",
    brandDescription = "Crafting superior digital experiences with modern UI components. Built for developers, by developers.",
    brandHref = "/",
    sections = DEFAULT_SECTIONS,
    socialLinks = DEFAULT_SOCIAL_LINKS,
    copyrightOwner,
    newsletterHeading = "Stay in the loop",
    newsletterPlaceholder = "you@example.com",
    onNewsletterSubmit,
    legalNotice = "All rights reserved.",
    className,
}: FooterPremiumProps) {
    const owner = copyrightOwner ?? brandName
    const year = new Date().getFullYear()

    return (
        <footer
            aria-label="Site footer"
            className={cn("w-full border-t bg-background", className)}
        >
            <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-12 lg:gap-8">

                    {/* Brand + newsletter */}
                    <div className="flex flex-col gap-6 lg:col-span-4">
                        <Link
                            href={brandHref}
                            className="inline-flex items-center gap-2 w-fit text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                            aria-label={`${brandName} — home`}
                        >
                            {brandName}
                        </Link>

                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            {brandDescription}
                        </p>

                        <NewsletterForm
                            heading={newsletterHeading}
                            placeholder={newsletterPlaceholder}
                            onSubmit={onNewsletterSubmit}
                        />
                    </div>

                    {/* Gutter */}
                    <div className="hidden lg:col-span-1 lg:block" aria-hidden="true" />

                    {/* Navigation columns */}
                    <nav
                        aria-label="Footer navigation"
                        className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7"
                    >
                        {sections.map((section) => (
                            <div key={section.title} className="flex flex-col gap-4">
                                <p
                                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                                    aria-label={`${section.title} links`}
                                >
                                    {section.title}
                                </p>
                                <ul role="list" className="flex flex-col gap-3">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                target={link.external ? "_blank" : undefined}
                                                rel={link.external ? "noopener noreferrer" : undefined}
                                                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
                                            >
                                                {link.label}
                                                {link.external && (
                                                    <span className="sr-only">(opens in new tab)</span>
                                                )}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <Separator className="my-8 md:my-10" />

                {/* ── Bottom bar ── */}
                <div className="flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        &copy; {year} {owner}. {legalNotice}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-1" role="list" aria-label="Social links">
                        {socialLinks.map((social) => (
                            <Button
                                key={social.label}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-muted"
                                asChild
                            >
                                <Link
                                    href={social.href}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    role="listitem"
                                >
                                    <social.icon className="h-4 w-4" aria-hidden="true" />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}