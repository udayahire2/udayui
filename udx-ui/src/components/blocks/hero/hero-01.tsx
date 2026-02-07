"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";

/**
 * StarBackground Component
 * Renders static twinkling stars and shooting stars.
 * Neutral Theme: Stars adapt to foreground color (dark in light mode, light in dark mode).
 */
const StarBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  // Generate stars on mount
  useEffect(() => {
    const starCount = 40; // Fewer stars for cleaner neutral look
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  // Shooting star logic with GSAP - Physics fixed
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createShootingStar = () => {
      const star = document.createElement("div");
      star.className = "absolute h-[2px] w-[2px] rounded-full z-0 bg-foreground/80"; // Use foreground color

      // Start Randomly in top-left quadrant mostly
      const startX = Math.random() * (container.offsetWidth * 0.8);
      const startY = Math.random() * (container.offsetHeight * 0.5);

      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;

      // Create tail - Now separate from rotation to ensure clean trail
      // Used gradient from foreground color to transparent
      const tail = document.createElement("div");
      tail.className = "absolute h-[1px]  opacity-60 origin-right";
      tail.style.background = "linear-gradient(to right, transparent, currentColor)";
      tail.style.width = "80px";
      tail.style.right = "0px";
      tail.style.top = "50%";
      tail.style.transform = "translateY(-50%)";
      tail.style.color = "inherit"; // Inherit bg-foreground color from parent

      star.appendChild(tail);
      container.appendChild(star);

      // Angle of descent (30 to 60 degrees down-right)
      const angleDeg = Math.random() * 30 + 30;
      const angleRad = (angleDeg * Math.PI) / 180;
      const distance = 500 + Math.random() * 400; // Longer travel
      const duration = 1 + Math.random() * 1; // Slower, smoother

      // Rotate star container to match direction
      gsap.set(star, { rotation: angleDeg });

      // Animate along the angle
      gsap.to(star, {
        x: Math.cos(angleRad) * distance,
        y: Math.sin(angleRad) * distance,
        opacity: 0,
        duration: duration,
        ease: "power2.in", // Accelerate like gravity
        onComplete: () => {
          star.remove();
        },
      });
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        createShootingStar();
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none text-foreground">
      {/* Subtle overlay for better text contrast if needed, otherwise clean */}
      <div className="absolute inset-0 bg-background/10" />

      {/* Twinkling Stars - using current text color (neutral adaptation) */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-foreground/20"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Hero01: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const fadeUp = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, ease: "easeOut" } };

  const popIn = reduceMotion
    ? {}
    : {
      initial: { opacity: 0, y: 20, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.8, delay: 0.2, type: "spring", stiffness: 50, damping: 15 },
    };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-background text-foreground"
    >
      {/* Starry Background - Z-0 */}
      <div className="absolute inset-0 z-0">
        <StarBackground />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <motion.div {...fadeUp as any}>
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border-border/60 shadow-sm bg-muted/20 text-muted-foreground hover:bg-muted/40 transition-colors"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Introducing v2.0
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="hero-heading"
            {...fadeUp as any}
            className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl"
          >
            Build Smart with <br className="hidden sm:block" />
            <span className="text-muted-foreground">precision and control</span>
          </motion.h1>

          {/* Description */}
          <motion.p {...fadeUp as any} className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            A neutral, calm, and authoritative UI library for developers who value clarity and performance.
            Built for modern SaaS products.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp as any} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-sm transition-transform active:scale-95 duration-200"
            >
              Get started
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="flex gap-2 flex-nowrap h-12 px-8 text-base border-border bg-background hover:bg-muted transition-transform active:scale-95 duration-200"
            >
              Live demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Neutral Mockup Visual */}
          <motion.figure {...popIn as any} className="mt-16 sm:mt-24 mx-auto w-full max-w-5xl">
            <div className="relative rounded-2xl border border-border/10 bg-card p-2 shadow-2xl ring-1 ring-border/5">
              <div className="aspect-16/10 overflow-hidden rounded-xl border border-border/10 bg-muted/20">
                {/* Header */}
                <div className="h-12 border-b border-border/20 bg-muted/10 flex items-center px-4 gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-border/40" />
                    <div className="w-3 h-3 rounded-full bg-border/40" />
                    <div className="w-3 h-3 rounded-full bg-border/40" />
                  </div>
                  <div className="mx-auto w-32 h-2 bg-border/20 rounded-full" />
                </div>
                {/* Body */}
                <div className="flex h-full">
                  <div className="w-56 border-r border-border/20 bg-muted/5 p-4 space-y-3 hidden sm:block">
                    <div className="h-4 w-3/4 bg-border/10 rounded" />
                    <div className="h-4 w-1/2 bg-border/10 rounded" />
                    <div className="h-4 w-5/6 bg-border/10 rounded" />
                    <div className="h-4 w-2/3 bg-border/10 rounded" />
                  </div>
                  <div className="flex-1 p-6 space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-1 h-32 rounded-lg bg-background border border-border/10 shadow-sm" />
                      <div className="flex-1 h-32 rounded-lg bg-background border border-border/10 shadow-sm" />
                    </div>
                    <div className="h-64 rounded-lg bg-background border border-border/10 shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
            {/* Minimal shadow spread instead of glow */}
            <div className="absolute -inset-2 bg-foreground/5 blur-2xl -z-10 rounded-full opacity-0" />
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default Hero01;
