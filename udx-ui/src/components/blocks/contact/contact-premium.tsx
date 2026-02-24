"use client";

import * as React from "react";
import {
    ArrowUpRight,
    Check,
    Clock,
    Copy,
    Globe,
    Headphones,
    Mail,
    MapPin,
    Phone,
    Send,
    Shield,
} from "lucide-react";

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

export function ContactPremium() {
    return (
        <section className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
            <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">

                {/* Header */}
                <div className="mb-14 text-center md:mb-20">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Get in touch
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-tight">
                        Let&apos;s build something{" "}
                        <span className="text-muted-foreground">together</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                        Whether you&apos;re exploring a new idea or scaling an existing product,
                        our team is here to help you move forward.
                    </p>
                </div>

                {/* Info Grid — 3 column cards */}
                <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mb-20">
                    <InfoCard
                        icon={<Mail className="size-[18px]" />}
                        label="Email us"
                        value="hello@udroid.in"
                        href="mailto:hello@udroid.in"
                    />
                    <InfoCard
                        icon={<Phone className="size-[18px]" />}
                        label="Call us"
                        value="+91 80 1234 5678"
                        href="tel:+918012345678"
                    />
                    <InfoCard
                        icon={<MapPin className="size-[18px]" />}
                        label="Visit us"
                        value="Dhule, Maharashtra"
                    />
                </div>

                {/* Main Grid: Form + Sidebar */}
                <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
                    {/* Form */}
                    <div>
                        <div className="mb-8">
                            <h2 className="text-lg font-medium tracking-tight">
                                Send a message
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Tell us a little about your project and we&apos;ll get back to you within one business day.
                            </p>
                        </div>

                        <form className="grid gap-5">
                            {/* Name row */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="cp-fname">First name</Label>
                                    <Input
                                        id="cp-fname"
                                        placeholder="Aarav"
                                        className="h-11 shadow-none transition-colors focus:border-primary/40"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cp-lname">Last name</Label>
                                    <Input
                                        id="cp-lname"
                                        placeholder="Sharma"
                                        className="h-11 shadow-none transition-colors focus:border-primary/40"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="cp-email">Work email</Label>
                                <Input
                                    id="cp-email"
                                    type="email"
                                    placeholder="aarav@company.in"
                                    className="h-11 shadow-none transition-colors focus:border-primary/40"
                                />
                            </div>

                            {/* Selects row */}
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Project budget</Label>
                                    <Select>
                                        <SelectTrigger className="h-11 shadow-none focus:ring-1 focus:ring-primary/20">
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="<5L">Under ₹5 Lakh</SelectItem>
                                            <SelectItem value="5L-25L">₹5L – ₹25 Lakh</SelectItem>
                                            <SelectItem value="25L-1Cr">₹25L – ₹1 Crore</SelectItem>
                                            <SelectItem value="1Cr+">₹1 Crore +</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>How can we help?</Label>
                                    <Select>
                                        <SelectTrigger className="h-11 shadow-none focus:ring-1 focus:ring-primary/20">
                                            <SelectValue placeholder="Select topic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="product">Product Development</SelectItem>
                                            <SelectItem value="design">Design & UX</SelectItem>
                                            <SelectItem value="consulting">Strategy & Consulting</SelectItem>
                                            <SelectItem value="support">Technical Support</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="cp-message">Your message</Label>
                                <Textarea
                                    id="cp-message"
                                    placeholder="Share some details about what you're looking for…"
                                    className="min-h-[140px] resize-y shadow-none transition-colors focus:border-primary/40"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-4">
                                <Button size="lg" className="h-11 gap-2 px-7">
                                    <Send className="size-4" />
                                    Send message
                                </Button>
                                <p className="text-xs text-muted-foreground">
                                    We respect your privacy.{" "}
                                    <a
                                        href="#"
                                        className="underline decoration-muted-foreground/40 underline-offset-2 hover:text-foreground"
                                    >
                                        Privacy Policy
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Why reach out */}
                        <div className="rounded-xl border border-border bg-secondary/30 p-6">
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Why work with us
                            </h3>
                            <ul className="space-y-3.5">
                                <BulletItem
                                    icon={<Clock className="size-4" />}
                                    text="Response within 24 hours"
                                />
                                <BulletItem
                                    icon={<Globe className="size-4" />}
                                    text="Distributed team across time zones"
                                />
                                <BulletItem
                                    icon={<Shield className="size-4" />}
                                    text="SOC 2 compliant infrastructure"
                                />
                                <BulletItem
                                    icon={<Headphones className="size-4" />}
                                    text="Dedicated account manager"
                                />
                            </ul>
                        </div>

                        {/* Locations */}
                        <div className="space-y-5">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Offices
                            </h3>
                            <OfficeBlock
                                city="Dhule"
                                country="Maharashtra, India"
                                address="Songir, Near Bus Stop"
                                timezone="IST (UTC+05:30)"
                            />
                            <OfficeBlock
                                city="Mumbai"
                                country="Maharashtra, India"
                                address="Bandra Kurla Complex, Bandra East"
                                timezone="IST (UTC+05:30)"
                            />
                        </div>

                        {/* Copy email */}
                        <div className="rounded-xl border border-border bg-secondary/20 p-5">
                            <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">
                                    General inquiries
                                </span>
                                <CopyButton text="hello@udroid.in" />
                            </div>
                            <p className="font-mono text-base font-medium">hello@udroid.in</p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}

/* ─── Sub-components ─── */

function InfoCard({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const Wrapper = href ? "a" : "div";
    return (
        <Wrapper
            {...(href ? { href } : {})}
            className="group flex items-center gap-4 rounded-xl border border-border bg-secondary/20 p-5 transition-colors hover:border-primary/25 hover:bg-secondary/40"
        >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-primary">
                {icon}
            </div>
            <div>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
            {href && (
                <ArrowUpRight className="ml-auto size-4 text-muted-foreground/50 transition-all group-hover:text-primary" />
            )}
        </Wrapper>
    );
}

function BulletItem({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <li className="flex items-start gap-3 text-sm text-foreground/90">
            <span className="mt-0.5 text-muted-foreground">{icon}</span>
            {text}
        </li>
    );
}

function OfficeBlock({
    city,
    country,
    address,
    timezone,
}: {
    city: string;
    country: string;
    address: string;
    timezone: string;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-foreground">
                    {city}, {country}
                </h4>
                <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background px-2 py-px text-[10px] font-medium text-muted-foreground">
                    <div className="size-1.5 rounded-full bg-emerald-500 animate-[pulse_3s_ease-in-out_infinite]" />
                    Open
                </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{address}</p>
            <p className="font-mono text-[11px] text-muted-foreground/70">{timezone}</p>
        </div>
    );
}

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
            className="rounded-md p-1.5 text-muted-foreground transition-all hover:bg-background hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            aria-label="Copy to clipboard"
        >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
    );
}
