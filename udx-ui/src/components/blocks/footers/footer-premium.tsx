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

export function FooterPremium() {
    return (
        <footer className="w-full bg-background border-t">
            <div className="container mx-auto px-4 md:px-6 py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand & Newsletter Section - Takes 4 columns on large screens */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-lg">U</span>
                            </div>
                            <span className="text-xl font-bold tracking-tight">UDROID</span>
                        </Link>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Crafting superior digital experiences with modern UI components. Built for developers, by developers.
                        </p>

                        <div className="flex flex-col gap-3 mt-4">
                            <h4 className="text-sm font-medium">Subscribe to our newsletter</h4>
                            <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                                <div className="relative flex-1">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-muted/50 border-input focus:bg-background transition-colors pr-10"
                                    />
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-primary"
                                        type="submit"
                                    >
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Subscribe</span>
                                    </Button>
                                </div>
                            </form>
                            <p className="text-[10px] text-muted-foreground">
                                By subscribing, you agree to our Privacy Policy and provide consent to receive updates.
                            </p>
                        </div>
                    </div>

                    {/* Spacer for large screens */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Navigation Links - Takes 7 columns on large screens */}
                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">Product</h4>
                            <ul className="flex flex-col gap-2.5">
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Integrations</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Changelog</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Docs</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">Company</h4>
                            <ul className="flex flex-col gap-2.5">
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Partners</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">Resources</h4>
                            <ul className="flex flex-col gap-2.5">
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Status</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">Legal</h4>
                            <ul className="flex flex-col gap-2.5">
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
                                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Separator className="my-12 bg-border/40" />

                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        &copy; {new Date().getFullYear()} UDROID Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="Twitter"
                        >
                            <Twitter className="h-4 w-4" />
                        </Link>
                        <Link
                            href="#"
                            className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="GitHub"
                        >
                            <Github className="h-4 w-4" />
                        </Link>
                        <Link
                            href="#"
                            className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-4 w-4" />
                        </Link>
                        <Link
                            href="#"
                            className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
