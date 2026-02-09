"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
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

export function TestimonialsSimple() {
    return (
        <section className="py-12 bg-background">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center mb-8">What our users say</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <Card key={i} className="bg-card border-border/50">
                            <CardHeader className="pb-2">
                                <p className="text-sm font-medium text-muted-foreground">{t.role}</p>
                            </CardHeader>
                            <CardContent>
                                <blockquote className="text-lg font-medium leading-relaxed mb-4">
                                    "{t.quote}"
                                </blockquote>
                                <footer className="text-sm font-semibold text-foreground">
                                    — {t.author}
                                </footer>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
