"use client"

import * as React from "react"
import Link from "next/link"
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"

const footerLinks = [
  { name: "Product", href: "#" },
  { name: "About", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Terms", href: "#" },
  { name: "Privacy", href: "#" },
]

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function FooterMinimal() {
  return (
    <footer className="w-full bg-background border-t py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

        {/* Brand & Copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-foreground">UDX UI</span>
          </Link>
          <p className="text-xs text-muted-foreground hidden md:block">
            &copy; {new Date().getFullYear()} UDROID Inc.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons & Mobile Copyright */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground md:hidden">
            &copy; {new Date().getFullYear()} UDROID Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
