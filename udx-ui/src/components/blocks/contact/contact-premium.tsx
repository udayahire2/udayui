"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


// Anim variants (Subtle, no bounce)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const }
    },
};

export function ContactPremium() {
    return (
        <section className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
            <div className="container mx-auto max-w-7xl px-4 py-8 md:py-16">

                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="mb-12 border-b border-border pb-8 md:mb-16"
                >
                    <motion.h1 variants={itemVariants} className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                        Contact
                    </motion.h1>
                    <motion.p variants={itemVariants} className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Our team is available to assist you with technical support, sales inquiries, and general questions.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]"
                >
                    {/* LEFT COLUMN: Contact Form */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl font-medium tracking-tight">Send us a message</h2>
                            <p className="text-sm text-muted-foreground">We typically respond within 24 hours.</p>
                        </div>

                        <form className="grid gap-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="Jane" className="h-11 shadow-none transition-colors focus:border-primary/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Doe" className="h-11 shadow-none transition-colors focus:border-primary/50" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Work email</Label>
                                <Input id="email" type="email" placeholder="jane@company.com" className="h-11 shadow-none transition-colors focus:border-primary/50" />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Company Size</Label>
                                    <Select>
                                        <SelectTrigger className="h-11 shadow-none focus:ring-1 focus:ring-primary/20">
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1-10">1-10 employees</SelectItem>
                                            <SelectItem value="11-50">11-50 employees</SelectItem>
                                            <SelectItem value="51-200">51-200 employees</SelectItem>
                                            <SelectItem value="200+">200+ employees</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Topic</Label>
                                    <Select>
                                        <SelectTrigger className="h-11 shadow-none focus:ring-1 focus:ring-primary/20">
                                            <SelectValue placeholder="Select topic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sales">Sales Inquiry</SelectItem>
                                            <SelectItem value="support">Technical Support</SelectItem>
                                            <SelectItem value="billing">Billing & Account</SelectItem>
                                            <SelectItem value="partnerships">Partnerships</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Tell us about your project or inquiry..."
                                    className="min-h-[150px] resize-y shadow-none transition-colors focus:border-primary/50"
                                />
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <Button size="lg" className="h-11 px-8">Send Message</Button>
                                <p className="text-xs text-muted-foreground">
                                    By submitting, you agree to our <a href="#" className="underline decoration-muted-foreground/50 hover:text-foreground">Privacy Policy</a>.
                                </p>
                            </div>
                        </form>
                    </motion.div>

                    {/* RIGHT COLUMN: Info & Offices */}
                    <motion.div variants={itemVariants} className="space-y-12 lg:border-l lg:border-border lg:pl-12">

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Support & Sales</h3>
                            <div className="grid gap-4">
                                <LinkBlock
                                    icon={<MessageSquare className="size-5" />}
                                    title="Technical Support"
                                    desc="Visit our help center or documentation."
                                    href="#"
                                />
                                <LinkBlock
                                    icon={<Mail className="size-5" />}
                                    title="Sales Team"
                                    desc="Contact our sales team directly."
                                    href="mailto:sales@udroid.in"
                                    action="Email"
                                />
                            </div>
                        </div>

                        <div className="h-px w-full bg-border" />

                        {/* Offices */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Our Locations</h3>

                            <div className="space-y-6">
                                <OfficeBlock
                                    city="Bengaluru"
                                    country="India"
                                    address="Prestige Tech Park, Marathahalli"
                                    timezone="IST (UTC+05:30)"
                                    time="09:00 AM - 06:00 PM"
                                />
                                <OfficeBlock
                                    city="San Francisco"
                                    country="USA"
                                    address="548 Market St"
                                    timezone="PST (UTC-08:00)"
                                    time="09:00 AM - 05:00 PM"
                                />
                            </div>
                        </div>

                        {/* Email Direct */}
                        <div className="rounded-lg border border-border bg-secondary/20 p-6">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">General Inquiries</span>
                                <CopyButton text="hello@udroid.in" />
                            </div>
                            <p className="font-mono text-xl font-medium">hello@udroid.in</p>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}



// Minimal Link Block
function LinkBlock({ icon, title, desc, href, action = "Visit" }: { icon: React.ReactNode, title: string, desc: string, href: string, action?: string }) {
    return (
        <a href={href} className="group flex items-start gap-4 rounded-lg bg-background p-4 transition-colors hover:bg-secondary/40">
            <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-secondary/50 text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:bg-background group-hover:text-primary">
                {icon}
            </div>
            <div>
                <h4 className="font-medium text-foreground">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <div className="mt-2 flex items-center text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    {action} <ArrowUpRight className="ml-1 size-3" />
                </div>
            </div>
        </a>
    )
}

// Office Location Block
function OfficeBlock({ city, country, address, timezone, time }: { city: string, country: string, address: string, timezone: string, time: string }) {
    return (
        <div className="group space-y-2">
            <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{city}, {country}</h4>
                <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-emerald-500 animate-[pulse_3s_ease-in-out_infinite]" />
                    Open
                </div>
            </div>
            <p className="text-sm text-muted-foreground">{address}</p>
            <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground/80 font-mono">
                <span>{timezone}</span>
                <span>•</span>
                <span>{time}</span>
            </div>
        </div>
    )
}

// Copy Button
function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground transition-all focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Copy to clipboard"
        >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
    )
}

