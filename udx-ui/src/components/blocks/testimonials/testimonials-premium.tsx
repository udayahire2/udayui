"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        name: "Alex Rivera",
        username: "@arivera",
        body: "I've never seen anything like this before. It's fantastic. The level of polish is insane.",
        img: "https://i.pravatar.cc/100?img=1",
    },
    {
        name: "Sarah Jen",
        username: "@sarahjen",
        body: "I don't know what to say. I'm speechless. This is definitely the future of UI functionality.",
        img: "https://i.pravatar.cc/100?img=2",
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
    },
    {
        name: "James Cameron",
        username: "@jamescam",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://i.pravatar.cc/100?img=6",
    },
];

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-zinc-950/10 bg-white hover:bg-zinc-950/5",
                "dark:border-white/10 dark:bg-zinc-50/10 dark:hover:bg-zinc-50/20",
                "transition-all hover:scale-105 duration-300 backdrop-blur-sm"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={img} alt={name} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-zinc-500 dark:text-white/40">
                        {username}
                    </p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-zinc-500 dark:text-zinc-300 leading-relaxed">
                {body}
            </blockquote>
        </figure>
    );
};

export function TestimonialsPremium() {
    return (
        <section className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background py-20">
            <div className="absolute top-0 flex w-full justify-center pt-8 z-10">
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur-md">
                    Trusted by 500+ companies
                </div>
            </div>

            <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden mask-[linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                {/* First Marquee Row */}
                <div className="flex w-full animate-marquee flex-row gap-4 overflow-hidden py-4">
                    {[...testimonials, ...testimonials].map((review, i) => (
                        <ReviewCard key={i} {...review} />
                    ))}
                </div>

                {/* Second Marquee Row (Reverse) */}
                <div className="flex w-full animate-marquee-reverse flex-row gap-4 overflow-hidden py-4">
                    {[...testimonials, ...testimonials].reverse().map((review, i) => (
                        <ReviewCard key={i} {...review} />
                    ))}
                </div>
            </div>

            {/* Gradients for edges if mask-image strictly not supported or for emphasis */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
        </section>
    );
}
