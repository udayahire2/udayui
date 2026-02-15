"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    rating?: number;
}

// Reusable Testimonial Card Component
export function TestimonialCard({
    quote,
    author,
    role,
    avatar,
    rating = 5,
}: TestimonialCardProps) {
    return (
        <Card className="bg-background border-border/50 hover:border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            <CardContent className="pt-6 text-left flex flex-col h-full">
                {/* Star Rating */}
                {rating > 0 && (
                    <div className="flex gap-1 mb-4">
                        {Array.from({ length: rating }).map((_, i) => (
                            <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                        ))}
                    </div>
                )}

                {/* Quote */}
                <div className="flex-1 mb-6">
                    <p className="text-base leading-relaxed text-muted-foreground">
                        "{quote}"
                    </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    <Avatar className="h-10 w-10 border border-border/50">
                        <AvatarImage src={avatar} alt={author} />
                        <AvatarFallback>{author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{author}</p>
                        <p className="text-xs text-muted-foreground">{role}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface TestimonialsNormalProps {
    testimonials?: TestimonialCardProps[];
    title?: string;
    description?: string;
}

const defaultTestimonials: TestimonialCardProps[] = [
    {
        quote: "I was blown away by how easy it was to integrate UDX UI into our Next.js project. It just works.",
        author: "Michael Chen",
        role: "Senior Engineer",
        avatar: "https://i.pravatar.cc/100?img=11",
        rating: 5,
    },
    {
        quote: "The design attention to detail is unmatched. Every pixel feels like it was placed with purpose.",
        author: "Emily Rodriguez",
        role: "Product Designer",
        avatar: "https://i.pravatar.cc/100?img=5",
        rating: 5,
    },
    {
        quote: "Performance is stellar. We saw a 20% improvement in LCP after switching to these components.",
        author: "David Kim",
        role: "Performance Arch.",
        avatar: "https://i.pravatar.cc/100?img=3",
        rating: 5,
    },
];

export function TestimonialsNormal({
    testimonials = defaultTestimonials,
    title = "Loved by Builders",
    description = "Join thousands of developers building the future of the web.",
}: TestimonialsNormalProps) {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                        {title}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, i) => (
                        <TestimonialCard
                            key={i}
                            {...testimonial}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
