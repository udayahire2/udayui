"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
    {
        quote: "I was blown away by how easy it was to integrate UDX UI into our Next.js project. It just works.",
        author: "Michael Chen",
        role: "Senior Engineer",
        avatar: "https://i.pravatar.cc/100?img=11",
    },
    {
        quote: "The design attention to detail is unmatched. Every pixel feels like it was placed with purpose.",
        author: "Emily Rodriguez",
        role: "Product Designer",
        avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
        quote: "Performance is stellar. We saw a 20% improvement in LCP after switching to these components.",
        author: "David Kim",
        role: "Performance Arch.",
        avatar: "https://i.pravatar.cc/100?img=3",
    },
];

export function TestimonialsNormal() {
    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Loved by Builders</h2>
                <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Join thousands of developers building the future of the web.
                </p>
                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <Card key={i} className="bg-background border-none shadow-sm hover:shadow-md transition-shadow duration-300">
                            <CardContent className="pt-6 text-left flex flex-col h-full">
                                <div className="flex-1">
                                    <p className="text-base leading-relaxed text-muted-foreground mb-6">
                                        "{t.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                                    <Avatar className="h-10 w-10 border border-border/50">
                                        <AvatarImage src={t.avatar} />
                                        <AvatarFallback>{t.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{t.author}</p>
                                        <p className="text-xs text-muted-foreground">{t.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
