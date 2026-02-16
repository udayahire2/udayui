"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
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

// Reusable Review Card Component -> Now with Framer Motion Interactions
export const ReviewCard = React.memo(({
    img,
    name,
    username,
    body,
    verified = false,
}: CarouselTestimonialProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-full"
        >
            <Card className="w-80 h-full cursor-pointer hover:shadow-lg hover:border-foreground/10 transition-shadow duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4 p-5 pb-2">
                    <motion.div
                        whileHover={{ rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Avatar className="h-10 w-10 border border-border/50">
                            <AvatarImage src={img} alt={name} />
                            <AvatarFallback className="text-sm font-semibold text-muted-foreground">
                                {name[0]}
                            </AvatarFallback>
                        </Avatar>
                    </motion.div>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                            <CardTitle className="text-sm font-semibold leading-none tracking-tight text-foreground">
                                {name}
                            </CardTitle>
                            {verified && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <Quote className="h-3 w-3 text-blue-500 fill-blue-500/20" />
                                </motion.div>
                            )}
                        </div>
                        <CardDescription className="text-xs text-muted-foreground/80 font-medium">
                            {username}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-5 pt-1">
                    <p className="text-sm text-foreground/80 leading-relaxed font-normal">
                        "{body}"
                    </p>
                </CardContent>
            </Card>
        </motion.div>
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

// Marquee Component using Framer Motion
const Marquee = ({
    children,
    direction = "left",
    speed = 20,
    pauseOnHover = true,
}: {
    children: React.ReactNode;
    direction?: "left" | "right";
    speed?: number;
    pauseOnHover?: boolean;
}) => {
    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [contentWidth, setContentWidth] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (containerRef.current) {
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, []);

    useAnimationFrame((t, delta) => {
        if (pauseOnHover && isHovered) return;

        const moveBy = (direction === "left" ? -1 : 1) * (speed * (delta / 1000));
        let newX = x.get() + moveBy;

        // Reset logic for infinite loop
        if (direction === "left") {
            // If we've scrolled past the first set, reset to 0
            // But actually, we need to reset when we've moved by contentWidth
            if (newX <= -contentWidth) {
                newX = 0;
            }
        } else {
            // Moving right
            if (newX >= 0) {
                newX = -contentWidth;
            }
        }

        x.set(newX);
    });

    return (
        <div
            className="overflow-hidden flex"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                ref={containerRef}
                className="flex gap-6 pr-6 will-change-transform"
                style={{ x }}
            >
                {children}
                {children} {/* Duplicate for infinite loop */}
            </motion.div>
        </div>
    );
};


export function TestimonialsPremium({
    testimonials = defaultTestimonials,
    badge = "Testimonials",
    title = "Customer Stories",
}: TestimonialsPremiumProps) {

    return (
        <section
            className="relative w-full py-24 overflow-hidden bg-background/50"
            aria-label="Customer Testimonials"
        >
            <div className="container px-4 md:px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-6 mb-16">
                <div>
                    <Badge variant="outline" className="px-3 py-1 text-sm font-medium rounded-full border-border/60">
                        {badge}
                    </Badge>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    {title}
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    See what our community is saying about their experience
                </p>
            </div>

            {/* Marquee Section */}
            <motion.div className="relative w-full space-y-8">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-background to-transparent pointer-events-none" />

                {/* First Row - Slower */}
                <Marquee speed={30} direction="left">
                    {testimonials.map((review, i) => (
                        <div key={`row1-${i}`} className="shrink-0">
                            <ReviewCard {...review} />
                        </div>
                    ))}
                </Marquee>

                {/* Second Row - Faster (Parallax effect) */}
                <Marquee speed={40} direction="right">
                    {testimonials.map((review, i) => (
                        <div key={`row2-${i}`} className="shrink-0">
                            <ReviewCard {...review} />
                        </div>
                    ))}
                </Marquee>
            </motion.div>
        </section>
    );
}
