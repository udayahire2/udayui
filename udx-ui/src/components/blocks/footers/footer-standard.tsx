"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface FooterLink {
  name: string
  href: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  icon: React.ElementType
  href: string
  label: string
}

export interface FooterStandardProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string
  brandDescription?: string
  newsletterTitle?: string
  newsletterDescription?: string
  copyrightText?: React.ReactNode
  sections?: FooterSection[]
  socialLinks?: SocialLink[]
  onSubscribe?: (e: React.FormEvent<HTMLFormElement>) => void
}

const defaultSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Security", href: "#" },
      { name: "Roadmap", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Community", href: "#" },
      { name: "API", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Licenses", href: "#" },
    ],
  },
]

const defaultSocialLinks: SocialLink[] = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
]

export const FooterStandard = React.forwardRef<HTMLElement, FooterStandardProps>(
  (
    {
      className,
      brandName = "UDX UI",
      brandDescription = "Build beautiful, accessible, and performant web applications with our component library.",
      newsletterTitle = "Subscribe to our newsletter",
      newsletterDescription = "Get the latest updates and releases.",
      copyrightText,
      sections = defaultSections,
      socialLinks = defaultSocialLinks,
      onSubscribe,
      ...props
    },
    ref
  ) => {
    const currentYear = new Date().getFullYear()
    const copyright = copyrightText ?? `© ${currentYear} ${brandName} Inc. All rights reserved.`

    return (
      <footer
        ref={ref}
        className={cn("w-full border-t border-border bg-background", className)}
        {...props}
      >
        <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 items-start">

            {/* Brand & Newsletter Section */}
            <div className="flex flex-col items-start gap-6 lg:col-span-5">
              <Link
                href="/"
                className="group inline-flex items-center space-x-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background"
              >
                <span className="text-xl font-bold tracking-tight text-foreground transition-opacity group-hover:opacity-80 duration-150">
                  {brandName}
                </span>
              </Link>
              <p className="max-w-xs text-sm text-muted-foreground">
                {brandDescription}
              </p>

              {/* Newsletter */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {newsletterTitle}
                </h3>
                <form
                  onSubmit={onSubscribe}
                  className="flex gap-2 max-w-sm"
                  aria-label="Newsletter Subscription"
                >
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1"
                    required
                  />
                  <Button type="submit" size="sm">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  {newsletterDescription}
                </p>
              </div>
            </div>

            {/* Links Sections */}
            {sections && sections.length > 0 && (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7 lg:justify-items-start">
                {sections.map((section) => (
                  <div key={section.title} className="flex flex-col gap-3">
                    <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                    <nav aria-label={`${section.title} Navigation`}>
                      <ul className="flex flex-col gap-2">
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className="inline-block text-sm text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ring-offset-background transition-colors duration-150"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              {copyright}
            </p>

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <ul className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <li key={social.label}>
                      <Link
                        href={social.href}
                        className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ring-offset-background transition-colors duration-150"
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </footer>
    )
  }
)
FooterStandard.displayName = "FooterStandard"