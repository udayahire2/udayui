"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface CarouselTestimonialProps {
    name: string;
    username: string;
    body: string;
    img: string;
    verified?: boolean;
}

// Reusable Review Card Component -> Now using Shadcn Card
export const ReviewCard = React.memo(({
    img,
    name,
    username,
    body,
    verified = false,
}: CarouselTestimonialProps) => {
    return (
        <Card className="w-80 h-full cursor-pointer hover:bg-accent/5 transition-colors duration-300 border-border/50">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-10 w-10 border border-border/50">
                    <AvatarImage src={img} alt={name} />
                    <AvatarFallback className="text-sm font-semibold">
                        {name[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                        <CardTitle className="text-sm font-semibold leading-none">
                            {name}
                        </CardTitle>
                        {verified && (
                            <Badge
                                variant="secondary"
                                className="h-5 px-1.5 text-[10px] font-normal text-muted-foreground bg-secondary/50"
                            >
                                Verified
                            </Badge>
                        )}
                    </div>
                    <CardDescription className="text-xs">
                        {username}
                    </CardDescription>
                </div>
                <div className="ml-auto">
                    <Quote className="h-4 w-4 text-muted-foreground/20" />
                </div>
            </CardHeader>
            <CardContent className="pb-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    "{body}"
                </p>
            </CardContent>
        </Card>
    );
});

ReviewCard.displayName = "ReviewCard";

interface TestimonialsPremiumProps {
    testimonials?: CarouselTestimonialProps[];
    badge?: string;
    title?: string;
}

const defaultTestimonials: CarouselTestimonialProps[] = [
    {
        name: "Alex Rivera",
        username: "@arivera",
        body: "I've never seen anything like this before. It's fantastic. The level of polish is insane.",
        img: "https://i.pravatar.cc/100?img=1",
        verified: true,
    },
    {
        name: "Sarah Jen",
        username: "@sarahjen",
        body: "I don't know what to say. I'm speechless. This is definitely the future of UI functionality.",
        img: "https://i.pravatar.cc/100?img=2",
        verified: true,
    },
    {
        name: "John Doe",
        username: "@johndoe",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://i.pravatar.cc/100?img=3",
    },
    {
        name: "Jane Doe",
        username: "@janedoe",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://i.pravatar.cc/100?img=4",
    },
    {
        name: "Jenny Wilson",
        username: "@jennywilson",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://i.pravatar.cc/100?img=5",
        verified: true,
    },
    {
        name: "James Cameron",
        username: "@jamescam",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://i.pravatar.cc/100?img=6",
    },
];

export function TestimonialsPremium({
    testimonials = defaultTestimonials,
    badge = "Testimonials",
    title = "Customer Stories",
}: TestimonialsPremiumProps) {

    return (
        <section className="relative w-full py-24 overflow-hidden bg-background/50">
            <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-6 mb-16">
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium rounded-full border-border/60">
                    {badge}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {title}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    See what our community is saying about their experience
                </p>
            </div>

            {/* Marquee Section */}
            <div className="relative w-full">


                <div className="flex overflow-hidden py-4 -my-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        className="flex gap-6 flex-nowrap pr-6"
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                    >
                        {[...testimonials, ...testimonials].map((review, i) => (
                            <div key={`row1-${i}`} className="shrink-0">
                                <ReviewCard {...review} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Second Row (Reverse) */}
                <div className="flex overflow-hidden py-4 -my-4 mt-8 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        className="flex gap-6 flex-nowrap pr-6"
                        initial={{ x: "-50%" }}
                        animate={{ x: "0%" }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                    >
                        {[...testimonials, ...testimonials].map((review, i) => (
                            <div key={`row2-${i}`} className="shrink-0">
                                <ReviewCard {...review} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
