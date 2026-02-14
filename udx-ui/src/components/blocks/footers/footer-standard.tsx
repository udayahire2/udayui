"use client"

import React from "react"
import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const footerSections = [
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

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
]

export function FooterStandard() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand & Newsletter Section */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Link href="/" className="inline-flex items-center space-x-2">
              <span className="text-xl font-bold">UDX UI</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Build beautiful, accessible, and performant web applications with our component library.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold">Subscribe to our newsletter</h3>
              <form className="flex  gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Get the latest updates and releases.
              </p>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold">{section.title}</h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} UDROID Inc. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}