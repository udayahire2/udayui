"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Send
} from "lucide-react"

const footerSections: { title: string; links: { name: string; href: string }[] }[] = [
    {
        title: "Product",
        links: [
            { name: "Features", href: "#" },
            { name: "Integrations", href: "#" },
            { name: "Pricing", href: "#" },
            { name: "Changelog", href: "#" },
            { name: "Docs", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About Us", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Contact", href: "#" },
            { name: "Partners", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Community", href: "#" },
            { name: "Help Center", href: "#" },
            { name: "Status", href: "#" },
            { name: "Terms of Service", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms & Conditions", href: "#" },
            { name: "Cookie Policy", href: "#" },
        ],
    },
]

const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function FooterPremium() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-12 lg:gap-8">
                    
                    {/* Brand & Newsletter Section */}
                    <div className="flex flex-col gap-6 lg:col-span-4">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight"
                        >
                            <span>UDX UI</span>
                        </Link>
                        
                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            Crafting superior digital experiences with modern UI components. Built for developers, by developers.
                        </p>

                        {/* Newsletter Subscription */}
                        <div className="mt-2 flex flex-col gap-3">
                            <h4 className="text-sm font-semibold">Subscribe to our newsletter</h4>
                            <form 
                                className="flex max-w-sm gap-2" 
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-muted/50 transition-colors focus:bg-background"
                                />
                                <Button type="submit" size="icon" className="shrink-0">
                                    <Send className="h-4 w-4" />
                                    <span className="sr-only">Subscribe</span>
                                </Button>
                            </form>
                            <p className="text-xs text-muted-foreground">
                                By subscribing, you agree to our Privacy Policy.
                            </p>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:col-span-1 lg:block" />

                    {/* Navigation Links Grid */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-7">
                        {footerSections.map((section) => (
                            <div key={section.title} className="flex flex-col gap-4">
                                <h4 className="text-sm font-semibold uppercase tracking-wide">
                                    {section.title}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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

                {/* Separator */}
                <Separator className="my-8 md:my-12" />

                {/* Bottom Bar */}
                <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} UDROID Inc. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">
                        {socialLinks.map((social) => (
                            <Button
                                key={social.label}
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                asChild
                            >
                                <Link
                                    href={social.href}
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4" />
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}