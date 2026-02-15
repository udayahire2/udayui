"use client";

import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface CarouselTestimonialProps {
    name: string;
    username: string;
    body: string;
    img: string;
    verified?: boolean;
}

// Reusable Review Card Component with Framer Motion
export const ReviewCard = React.memo(({
    img,
    name,
    username,
    body,
    verified = false,
    index = 0,
}: CarouselTestimonialProps & { index?: number }) => {
    return (
        <motion.figure
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: "easeOut",
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-lg border",
                "border-border/50 bg-gradient-to-br from-card via-card to-card/80",
                "hover:border-primary/30 hover:shadow-lg",
                "dark:from-slate-900 dark:via-slate-850 dark:to-slate-900/60",
                "dark:border-white/10 dark:hover:border-primary/50 dark:hover:shadow-2xl",
                "transition-all duration-300 backdrop-blur-sm shrink-0 p-4"
            )}
        >
            {/* Quote Icon - Animated Background */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.08 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="absolute top-2 right-2 opacity-8"
            >
                <Quote className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Header with Avatar and Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center gap-2 mb-4"
            >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Avatar className="h-9 w-9 border-2 border-border/30">
                        <AvatarImage src={img} alt={name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {name[0]}
                        </AvatarFallback>
                    </Avatar>
                </motion.div>

                <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                    <div className="flex items-center gap-1">
                        <figcaption className="text-sm font-bold text-foreground truncate leading-tight">
                            {name}
                        </figcaption>
                        {verified && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 15,
                                    delay: 0.3,
                                }}
                            >
                                <Badge
                                    variant="secondary"
                                    className="text-xs px-1.5 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30 font-semibold"
                                >
                                    ✓
                                </Badge>
                            </motion.div>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground/80 truncate leading-tight">
                        {username}
                    </p>
                </div>
            </motion.div>

            {/* Quote - Staggered Line Animation */}
            <motion.blockquote
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-sm text-muted-foreground leading-relaxed italic font-medium"
            >
                "{body}"
            </motion.blockquote>
        </motion.figure>
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
    badge = "Trusted by 500+ companies",
    title = "Customer Love Stories",
}: TestimonialsPremiumProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background/95 to-background py-12 md:py-24">
            {/* Animated Background Elements */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, 10, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 container px-4 md:px-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center gap-3 mb-12 text-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                    >
                        <Badge
                            variant="outline"
                            className="border-primary/30 bg-primary/5 text-primary dark:bg-primary/10 dark:border-primary/50 dark:text-primary/90 px-3 py-1.5 font-semibold"
                        >
                            {badge}
                        </Badge>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 dark:from-slate-100 dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent"
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-muted-foreground max-w-2xl text-base md:text-lg"
                    >
                        See what our community is saying about their experience
                    </motion.p>
                </motion.div>

                {/* Marquee Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative w-full"
                >
                    {/* Gradient Masks - Left & Right */}
                    <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-linear-to-r from-background via-background/50 to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-linear-to-l from-background via-background/50 to-transparent z-20 pointer-events-none" />

                    {/* First Marquee Row - Forward */}
                    <div className="relative overflow-hidden py-6">
                        <motion.div
                            className="flex gap-4 will-change-transform"
                            animate={{ x: [0, -100 * 64] }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            onHoverStart={(e) => {
                                // Pause animation on hover
                                if (e && e.currentTarget) {
                                    (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
                                }
                            }}
                            onHoverEnd={(e) => {
                                // Resume animation
                                if (e && e.currentTarget) {
                                    (e.currentTarget as HTMLElement).style.animationPlayState = "running";
                                }
                            }}
                        >
                            {[...testimonials, ...testimonials].map((review, i) => (
                                <ReviewCard key={`forward-${i}`} {...review} index={i % testimonials.length} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Second Marquee Row - Reverse */}
                    <div className="relative overflow-hidden py-6">
                        <motion.div
                            className="flex gap-4 will-change-transform"
                            animate={{ x: [-100 * 64, 0] }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            onHoverStart={(e) => {
                                if (e && e.currentTarget) {
                                    (e.currentTarget as HTMLElement).style.animationPlayState = "paused";
                                }
                            }}
                            onHoverEnd={(e) => {
                                if (e && e.currentTarget) {
                                    (e.currentTarget as HTMLElement).style.animationPlayState = "running";
                                }
                            }}
                        >
                            {[...testimonials, ...testimonials].reverse().map((review, i) => (
                                <ReviewCard key={`reverse-${i}`} {...review} index={i % testimonials.length} />
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Decorative Bottom Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex justify-center gap-2 mt-12"
                >
                    {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="w-2 h-2 rounded-full bg-primary/40"
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
