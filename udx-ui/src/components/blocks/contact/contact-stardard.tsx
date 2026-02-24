"use client";

import * as React from "react";
import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export function Contact02() {
  return (
    <section className="bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">

        {/* Header */}
        <div className="mb-12 max-w-xl">
          <p className="mb-2 text-sm font-medium text-muted-foreground">
            Start a project
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Let&apos;s collaborate on something great
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Have a creative idea or need a design partner?
            Share your vision and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">

          {/* Form Card */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Tell me about your project</CardTitle>
              <CardDescription>
                Share a few details and I&apos;ll follow up with a proposal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cs-fname">Your name</Label>
                    <Input
                      id="cs-fname"
                      placeholder="Priya Deshmukh"
                      className="shadow-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cs-portfolio">Portfolio / Website</Label>
                    <Input
                      id="cs-portfolio"
                      type="url"
                      placeholder="https://yoursite.in"
                      className="shadow-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cs-email">Email address</Label>
                  <Input
                    id="cs-email"
                    type="email"
                    placeholder="priya@studio.in"
                    className="shadow-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cs-project">Project type</Label>
                  <Input
                    id="cs-project"
                    placeholder="Brand identity, Web design, Illustration…"
                    className="shadow-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cs-message">Project brief</Label>
                  <Textarea
                    id="cs-message"
                    placeholder="Describe your project goals, timeline, and budget range…"
                    className="min-h-[120px] resize-y shadow-none"
                  />
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <Button className="gap-2">
                    <Send className="size-4" />
                    Send inquiry
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    No spam, ever.{" "}
                    <a href="#" className="underline underline-offset-2 hover:text-foreground">
                      Privacy policy
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar Info */}
          <aside className="space-y-6 lg:pt-2">

            {/* Contact details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Reach me directly
              </h3>

              <ContactDetail
                icon={<Mail className="size-4" />}
                label="Email"
                value="hello@priyaworks.in"
                href="mailto:hello@priyaworks.in"
              />
              <ContactDetail
                icon={<Phone className="size-4" />}
                label="WhatsApp"
                value="+91 98765 43210"
                href="https://wa.me/919876543210"
              />
              <ContactDetail
                icon={<MapPin className="size-4" />}
                label="Based in"
                value="Pune, Maharashtra, India"
              />
            </div>

            <Separator />

            {/* Availability */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                Availability
              </h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Freelance</span>
                  <span className="font-medium text-emerald-600">Open to work</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="font-medium">Within 24 hrs</span>
                </div>
                <p className="pt-1 text-xs text-muted-foreground">
                  Currently accepting projects for Q2 2026
                </p>
              </div>
            </div>

            <Separator />

            {/* Quick copy */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/20 px-4 py-3">
              <div>
                <p className="text-xs text-muted-foreground">Quick copy</p>
                <p className="font-mono text-sm font-medium">hello@priyaworks.in</p>
              </div>
              <CopyButton text="hello@priyaworks.in" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function ContactDetail({
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
  const content = (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-colors hover:text-primary">
        {content}
      </a>
    );
  }

  return content;
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
      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}
