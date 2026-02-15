"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MinimalTestimonialProps {
    quote: string;
    author: string;
    role: string;
}

// Reusable Minimal Testimonial Card Component
export function MinimalTestimonialCard({
    quote,
    author,
    role,
}: MinimalTestimonialProps) {
    return (
        <Card className="bg-card border-border/50 hover:border-border/80 transition-colors duration-300 flex flex-col h-full">
            <CardHeader className="pb-2">
                <Badge variant="secondary" className="w-fit">
                    {role}
                </Badge>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
                <blockquote className="text-base leading-relaxed mb-4 text-foreground font-medium italic">
                    "{quote}"
                </blockquote>
                <footer className="text-sm font-semibold text-muted-foreground">
                    — {author}
                </footer>
            </CardContent>
        </Card>
    );
}

interface TestimonialsSimpleProps {
    testimonials?: MinimalTestimonialProps[];
    title?: string;
    description?: string;
    showBadge?: boolean;
}

const defaultTestimonials: MinimalTestimonialProps[] = [
    {
        quote: "This library saved us weeks of development time. The components are rock solid.",
        author: "Sarah Chen",
        role: "CTO, TechFlow",
    },
    {
        quote: "The cleanest UI kit I've ever used. Accessibility is top-notch out of the box.",
        author: "Mark Davis",
        role: "Frontend Lead, Academ",
    },
    {
        quote: "Documentation is excellent and the code is very easy to customize.",
        author: "James Wilson",
        role: "Indie Developer",
    },
];

export function TestimonialsSimple({
    testimonials = defaultTestimonials,
    title = "What our users say",
    description,
    showBadge = true,
}: TestimonialsSimpleProps) {
    return (
        <section className="py-16 bg-background">
            <div className="container px-4 md:px-6">
                {/* Header */}
                <div className="mb-12 text-center">
                    {showBadge && (
                        <Badge className="mb-4" variant="outline">
                            Testimonials
                        </Badge>
                    )}
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>

                <Separator className="mb-8" />

                {/* Testimonial Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                        <MinimalTestimonialCard
                            key={i}
                            {...testimonial}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
