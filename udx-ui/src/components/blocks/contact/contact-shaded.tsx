import { cn } from "@/lib/utils";
import type React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const APP_EMAIL = "support@udroid.in";
const APP_PHONE = "+91 98200 12345";
const APP_PHONE_2 = "+91 80000 98765";

export function Contact() {
    const socialLinks = [
        { icon: GithubIcon, href: "#", label: "GitHub" },
        { icon: XIcon, href: "#", label: "Twitter / X" },
        { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
    ];

    return (
        <section className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-6xl px-4">

                {/* ── Hero ── */}
                <header className="py-20 text-center md:py-28">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/30 px-3 py-1 font-mono text-xs text-muted-foreground">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-50" />
                            <span className="relative inline-flex size-2 rounded-full bg-zinc-500" />
                        </span>
                        We&apos;re online &amp; ready to help
                    </span>
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        Get{" "}
                        <span className="font-medium text-muted-foreground">in Touch</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                        Have a question or need support? Our team in India applies a human
                        touch to every interaction.
                    </p>
                </header>

                {/* ── Contact Grid — 3 equal columns ── */}
                <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
                    <ContactCard icon={<Mail />} title="Email">
                        <p className="mb-3 text-xs text-muted-foreground">
                            We reply to every email within one business day.
                        </p>
                        <ContactLink href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</ContactLink>
                    </ContactCard>

                    <ContactCard icon={<MapPin />} title="Office">
                        <address className="not-italic text-sm leading-relaxed text-foreground">
                            Songir, Near Bus Stop
                            <br />
                            Dhule — 424 001
                            <br />
                            <span className="text-muted-foreground">Maharashtra, India</span>
                        </address>
                    </ContactCard>

                    <ContactCard icon={<Phone />} title="Phone">
                        <p className="mb-3 text-xs text-muted-foreground">
                            Mon – Sat, 9 AM – 6 PM IST
                        </p>
                        <div className="flex flex-col gap-2">
                            <ContactLink href={`tel:${APP_PHONE}`}>{APP_PHONE}</ContactLink>
                            <ContactLink href={`tel:${APP_PHONE_2}`}>{APP_PHONE_2}</ContactLink>
                        </div>
                    </ContactCard>
                </div>

                {/* ── Social ── */}
                <div className="flex flex-col items-center gap-5 py-20 md:py-28">
                    <h2 className="text-center text-2xl font-medium tracking-tight text-muted-foreground md:text-3xl">
                        Find us{" "}
                        <span className="font-semibold text-foreground">online</span>
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="group flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 transition-colors duration-300 hover:border-border/80 hover:bg-secondary/30"
                            >
                                <link.icon className="size-3.5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground" />
                                <span className="font-mono text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                                    {link.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─── Sub-components ─── */

function ContactCard({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="group flex flex-col bg-background">
            {/* Card header */}
            <div
                className={cn(
                    "flex items-center gap-3 border-b border-border bg-secondary/25 px-6 py-4",
                    "[&_svg]:size-4 [&_svg]:stroke-[1.5] [&_svg]:text-muted-foreground"
                )}
            >
                <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
                    {icon}
                </span>
                <h3 className="text-sm font-semibold tracking-wide text-foreground/90">
                    {title}
                </h3>
            </div>
            {/* Card body */}
            <div className="flex flex-1 flex-col justify-center px-6 py-6">
                {children}
            </div>
        </div>
    );
}

function ContactLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            className="group/link relative inline-flex w-fit font-mono text-sm font-medium text-foreground transition-colors duration-300 hover:text-primary"
        >
            {children}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary/50 transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
        </a>
    );
}

/* ─── Social Icons ─── */

const GithubIcon = (props: React.ComponentProps<"svg">) => (
    <svg fill="currentColor" viewBox="0 0 1024 1024" {...props}>
        <path
            clipRule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
            fill="currentColor"
            fillRule="evenodd"
            transform="scale(64)"
        />
    </svg>
);

const XIcon = (props: React.ComponentProps<"svg">) => (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
    </svg>
);

const LinkedInIcon = (props: React.ComponentProps<"svg">) => (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
