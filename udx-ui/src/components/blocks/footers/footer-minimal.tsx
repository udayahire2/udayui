"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"

export interface FooterLink {
  name: string
  href: string
}

export interface SocialLink {
  icon: React.ElementType
  href: string
  label: string
}

export interface FooterMinimalProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string
  copyrightText?: React.ReactNode
  links?: FooterLink[]
  socialLinks?: SocialLink[]
}

const defaultLinks: FooterLink[] = [
  { name: "Product", href: "#" },
  { name: "About", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Privacy", href: "#" },
]

const defaultSocialLinks: SocialLink[] = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export const FooterMinimal = React.forwardRef<HTMLElement, FooterMinimalProps>(
  ({
    className,
    brandName = "UDX UI",
    copyrightText,
    links = defaultLinks,
    socialLinks = defaultSocialLinks,
    ...props
  }, ref) => {
    const currentYear = new Date().getFullYear()
    const copyright = copyrightText ?? `© ${currentYear} ${brandName} Inc.`

    return (
      <footer
        ref={ref}
        className={cn("w-full bg-background border-t border-border py-6 md:py-8", className)}
        {...props}
      >
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

          {/* Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background"
            >
              <span className="text-lg font-bold tracking-tight text-foreground transition-opacity group-hover:opacity-80 duration-150">
                {brandName}
              </span>
            </Link>
            <p className="text-xs text-muted-foreground hidden md:block">
              {copyright}
            </p>
          </div>

          {/* Navigation */}
          {links && links.length > 0 && (
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ring-offset-background transition-colors duration-150"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Social Icons & Mobile Copyright */}
          <div className="flex flex-col items-center gap-4">
            {socialLinks && socialLinks.length > 0 && (
              <ul className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <li key={social.label}>
                      <Link
                        href={social.href}
                        className="text-muted-foreground hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm ring-offset-background transition-colors duration-150"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
            <p className="text-xs text-muted-foreground md:hidden text-center">
              {copyright}
            </p>
          </div>
        </div>
      </footer>
    )
  }
)
FooterMinimal.displayName = "FooterMinimal"
