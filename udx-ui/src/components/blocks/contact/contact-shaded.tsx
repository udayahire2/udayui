import { cn } from "@/lib/utils";
import type React from "react";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Mail, MapPin, Phone } from "lucide-react";

const APP_EMAIL = "support@udroid.in";
const APP_PHONE = "+91 98200 12345";
const APP_PHONE_2 = "+91 80000 98765";

export function Contact() {
    const socialLinks = [
        {
            icon: GithubIcon,
            href: "#",
            label: "GitHub",
        },
        {
            icon: XIcon,
            href: "#",
            label: "Twitter / X",
        },
        {
            icon: LinkedInIcon,
            href: "#",
            label: "LinkedIn",
        },
    ];

    return (
        <div className="relative mx-auto min-h-screen max-w-5xl border-x bg-background">
            {/* Hero header */}
            <div className="flex grow flex-col justify-center px-4 py-24 md:items-center">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/30 px-3 py-1 font-mono text-xs  text-muted-foreground tracking-tight ">
                    <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-50" />
                        <span className="relative inline-flex size-2 rounded-full bg-zinc-500" />
                    </span>
                    We&apos;re online &amp; ready to help
                </span>
                <h1 className="text-balance text-center font-bold text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
                    Get <span className="font-medium text-muted-foreground">in Touch</span>
                </h1>
                <p className="mt-4 mb-8 max-w-lg text-center text-lg text-muted-foreground leading-relaxed">
                    Have a question or need support? Our team in India applies a human touch to every interaction.
                </p>
            </div>

            <FullWidthDivider />

            {/* Contact info boxes */}
            <div className="grid divide-y md:grid-cols-3 md:divide-y-0 md:divide-x">
                <Box
                    description="We reply to every email within one business day."
                    icon={<Mail />}
                    title="Email"
                >
                    <ContactLink href={`mailto:${APP_EMAIL}`}>{APP_EMAIL}</ContactLink>
                </Box>

                <Box
                    description="Drop by our Bengaluru office — chai is on us."
                    icon={<MapPin />}
                    title="Office"
                >
                    <address className="not-italic font-medium font-mono text-sm tracking-wide leading-relaxed text-foreground">
                        No. 42, 3rd Floor, Prestige Tech Park,
                        <br />
                        Outer Ring Road, Bengaluru — 560 103
                        <br />
                        <span className="text-muted-foreground">Karnataka, India</span>
                    </address>
                </Box>

                <Box
                    className="border-b-0 md:border-r-0"
                    description="Available Mon–Sat, 9 AM – 6 PM IST."
                    icon={<Phone />}
                    title="Phone"
                >
                    <div className="flex flex-col space-y-3">
                        <ContactLink href={`tel:${APP_PHONE}`}>{APP_PHONE}</ContactLink>
                        <ContactLink href={`tel:${APP_PHONE_2}`}>{APP_PHONE_2}</ContactLink>
                    </div>
                </Box>
            </div>

            <FullWidthDivider />

            {/* Social links */}
            <div className="z-1 flex h-full flex-col items-center justify-center gap-6 py-24 bg-gradient-to-b from-background to-secondary/20">
                <h2 className="text-center font-medium text-2xl text-muted-foreground tracking-tight md:text-3xl">
                    Find us <span className="text-foreground font-semibold">online</span>
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {socialLinks.map((link) => (
                        <a
                            className="group flex items-center gap-x-2 rounded-full border bg-background px-4 py-2 transition-all duration-300 hover:border-primary/20 hover:bg-secondary/50 hover:shadow-sm hover:-translate-y-0.5"
                            href={link.href}
                            key={link.label}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <span className="flex size-5 items-center justify-center text-muted-foreground transition-colors group-hover:text-primary">
                                <link.icon className="size-3.5" />
                            </span>
                            <span className="font-medium font-mono text-xs tracking-wide text-muted-foreground group-hover:text-foreground">
                                {link.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ContactLink({
    href,
    children,
}: { href: string; children: React.ReactNode }) {
    return (
        <a
            className="group relative inline-flex w-fit items-center overflow-hidden font-medium font-mono text-sm tracking-wide text-foreground transition-colors hover:text-primary"
            href={href}
        >
            <span className="relative z-10 mb-0.5 block transition-transform duration-300 group-hover:-translate-y-0.5">
                {children}
            </span>
            <span className="absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
        </a>
    );
}

type ContactBox = React.ComponentProps<"div"> & {
    icon: React.ReactNode;
    title: string;
    description: string;
};

function Box({
    title,
    description,
    className,
    children,
    ...props
}: ContactBox) {
    return (
        <div
            className={cn(
                "group flex flex-col justify-between transition-all duration-300 hover:bg-secondary/10",
                className
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-x-4 border-b bg-secondary/30 p-6 px-8 transition-colors duration-300 group-hover:bg-secondary/50 dark:bg-secondary/10",
                    "[&_svg]:size-4 [&_svg]:stroke-[1.5] [&_svg]:text-muted-foreground"
                )}
            >
                <span className="flex size-9 items-center justify-center rounded-lg border bg-background shadow-sm ring-1 ring-border/50 transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-md group-hover:ring-primary/10">
                    {props.icon}
                </span>
                <h2 className="font-heading font-semibold text-base tracking-wide text-foreground/90 transition-colors group-hover:text-foreground">
                    {title}
                </h2>
            </div>
            <div className="flex flex-col justify-center gap-y-2 p-8 min-h-[160px]">
                {children}
            </div>
            <div className="border-t bg-background/50 p-6">
                <p className="text-muted-foreground text-xs leading-relaxed font-medium tracking-wide">
                    {description}
                </p>
            </div>
        </div>
    );
}

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
    <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
    </svg>
);

const LinkedInIcon = (props: React.ComponentProps<"svg">) => (
    <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

