import { cn } from "@/lib/utils";
import type React from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const APP_EMAIL = "hello@udroid.in";
const APP_PHONE = "+91 98200 12345";

export function ContactMinimal() {
  return (
    <section className="w-full bg-background py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">

          {/* Left Column: Heading & Description */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/30 px-3 py-1 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider backdrop-blur-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                Open for business
              </div>
              <h1 className="font-bold text-5xl tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
                Let&apos;s work <br /> together.
              </h1>
            </div>
            <p className="mt-8 max-w-md text-lg text-muted-foreground md:text-xl leading-relaxed">
              We help brands and businesses build amazing digital products. Reach out to discuss your next project.
            </p>
          </div>

          {/* Right Column: Contact Grid */}
          <div className="grid gap-8 sm:grid-cols-2">

            {/* Email */}
            <ContactItem
              label="Email"
              value={APP_EMAIL}
              href={`mailto:${APP_EMAIL}`}
              icon={<Mail className="size-5" />}
              actionIcon={<ArrowUpRight className="size-4" />}
            />

            {/* Phone */}
            <ContactItem
              label="Phone"
              value={APP_PHONE}
              href={`tel:${APP_PHONE}`}
              icon={<Phone className="size-5" />}
            />

            {/* Office */}
            <div className="group flex flex-col gap-4 border-l border-border/50 pl-6 transition-colors hover:border-foreground/20 sm:col-span-2">
              <div className="flex items-center gap-3 text-muted-foreground transition-colors group-hover:text-foreground">
                <MapPin className="size-5" />
                <span className="font-mono text-xs font-medium uppercase tracking-widest">
                  Office
                </span>
              </div>
              <address className="not-italic font-medium text-lg text-foreground/80 leading-relaxed transition-colors group-hover:text-foreground">
                Prestige Tech Park, Bengaluru — 560 103 <br />
                <span className="text-muted-foreground">Karnataka, India</span>
              </address>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-medium text-sm text-primary hover:underline hover:underline-offset-4"
              >
                Get Directions <ArrowUpRight className="size-3" />
              </a>
            </div>

            {/* Socials - Minimal List */}
            <div className="group flex flex-col gap-4 border-l border-border/50 pl-6 transition-colors hover:border-foreground/20 sm:col-span-2 pt-8 sm:pt-0">
              <div className="flex items-center gap-3 text-muted-foreground transition-colors group-hover:text-foreground">
                <span className="font-mono text-xs font-medium uppercase tracking-widest">Socials</span>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <SocialLink href="#" label="Twitter" />
                <SocialLink href="#" label="GitHub" />
                <SocialLink href="#" label="LinkedIn" />
                <SocialLink href="#" label="Instagram" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  label,
  value,
  href,
  icon,
  actionIcon,
}: {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  actionIcon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col gap-4 border-l border-border/50 pl-6 transition-all hover:border-foreground/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-muted-foreground transition-colors group-hover:text-foreground">
          {icon}
          <span className="font-mono text-xs font-medium uppercase tracking-widest">
            {label}
          </span>
        </div>
        {actionIcon && (
          <span className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground group-hover:opacity-100">
            {actionIcon}
          </span>
        )}
      </div>
      <div className="font-medium text-xl text-foreground/80 transition-colors group-hover:text-foreground md:text-2xl">
        {value}
      </div>
    </a>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline hover:underline-offset-4">
      {label}
    </a>
  )
}
