"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart2, Check, ChevronRight, Command, CreditCard, Home, LayoutDashboard, LineChart, PieChart, Search, Settings, Terminal, Copy, Users, Activity } from "lucide-react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Preview Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* -------------------------------------------------------------------------- */
/*                                  Internal Components                       */
/* -------------------------------------------------------------------------- */

// Counter Component for "Live" metrics
const Counter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = prefix + value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, isInView, decimals, prefix, suffix]);

  return <span ref={ref} />;
};

/* -------------------------------------------------------------------------- */
/*                                  Hero Component                            */
/* -------------------------------------------------------------------------- */

const Hero01: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]); // Minimal precision tilt
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / 15);
    y.set((event.clientY - centerY) / 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText("npm install @udrx/ui");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 sm:py-32 lg:py-40">

      {/* Clean Background - Standardized */}
      <div className="absolute inset-0 z-0 bg-background" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">

          {/* Left Column: Product Value & Action */}
          <div className="flex flex-col items-start gap-8 text-left">
            <div className="space-y-4">
              {/* Trust/News Badge - Pill Shape */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="rounded-full px-4 py-1.5 text-sm border-border/50 bg-muted/20 text-muted-foreground backdrop-blur-sm cursor-pointer hover:bg-muted/40 transition-colors shadow-none font-normal">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary/80 animate-pulse" />
                  v2.0 is now live: <span className="text-foreground ml-1 font-medium">See what's new</span> <ChevronRight className="ml-1 h-3 w-3 opacity-50" />
                </Badge>
              </motion.div>

              {/* Headline - "Swiss Style" Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-balance text-foreground leading-[1.1]"
              >
                Ship your next idea. <br className="hidden lg:block" />
                <span className="text-primary">Overnight.</span>
              </motion.h1>

              {/* Product Explanation - Crisp & Clean */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-xl text-lg text-muted-foreground leading-relaxed text-balance font-light tracking-wide"
              >
                The comprehensive UI kit for developers who want to stop building components and start shipping products.
                Accessible, composable, and enterprise-ready.
              </motion.p>
            </div>

            {/* CTA Hierarchy - Tactic Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button size="lg" className="h-12 px-8 text-base shadow-sm hover:shadow-md hover:translate-y-[-1px] transition-all duration-300 font-medium tracking-tight">
                Start Building Free
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background border-border hover:bg-muted/20 hover:text-foreground hover:border-foreground/20 hover:translate-y-[-1px] transition-all duration-300 shadow-sm font-medium tracking-tight">
                Live Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            {/* Review/Trust Signal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted-foreground/10 overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="grid gap-0.5">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-primary/80">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground font-medium">Trusted by 2,000+ teams</p>
              </div>
            </motion.div>

            {/* Developer Trust - Copy Command (Subtle) */}
            <div
              className="flex items-center gap-2 text-xs text-muted-foreground mt-2 cursor-pointer group"
              onClick={copyCommand}
            >
              <Terminal className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <code className="bg-muted/30 px-2 py-1 rounded border border-border/50 group-hover:border-foreground/20 transition-colors font-mono">npm install @udrx/ui</code>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
              </span>
            </div>
          </div>

          {/* Right Column: Minimal App Interface */}
          <div className="relative flex justify-center lg:justify-end perspective-[2000px]">

            {/* App Window Container */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-full max-w-2xl cursor-default"
            >

              {/* The "Shell" - Hardware Feel */}
              <div className="relative flex h-[480px] w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/10 dark:shadow-black/40 ring-1 ring-inset ring-white/10 dark:ring-white/5">

                {/* Top Navigation Frame */}
                <header className="flex h-12 shrink-0 items-center justify-between border-b border-border/50 bg-muted/10 px-4">
                  <div className="flex items-center gap-2">
                    {/* Minimal Traffic Lights - Monochromatic */}
                    <div className="flex gap-1.5 opacity-30 hover:opacity-100 transition-opacity">
                      <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                      <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                      <div className="h-2.5 w-2.5 rounded-full bg-foreground" />
                    </div>
                    {/* Breadcrumbs */}
                    <div className="ml-4 flex items-center gap-2 text-xs text-muted-foreground tracking-tight">
                      <Home className="h-3.5 w-3.5 opacity-70" />
                      <span className="opacity-40">/</span>
                      <span>Dashboard</span>
                      <span className="opacity-40">/</span>
                      <span className="text-foreground font-medium">Analytics</span>
                    </div>
                  </div>

                  {/* Search & Profile */}
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex h-8 items-center gap-2 rounded-md border border-border/50 bg-background/50 px-2.5 text-xs text-muted-foreground w-48 shadow-sm hover:border-border transition-colors">
                      <Search className="h-3.5 w-3.5 opacity-50" />
                      <span className="opacity-70">Search...</span>
                      <span className="ml-auto opacity-40 text-[10px] border border-border px-1 rounded bg-muted/20">⌘K</span>
                    </div>
                    <Avatar className="h-7 w-7 border border-border/50">
                      <AvatarImage src="https://i.pravatar.cc/100?img=12" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </div>
                </header>

                {/* Main Layout */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar - Clean & Thin Icons */}
                  <aside className="hidden w-14 shrink-0 flex-col items-center gap-4 border-r border-border/50 bg-muted/5 py-4 sm:flex">
                    {[LayoutDashboard, PieChart, Users, CreditCard, Settings].map((Icon, i) => (
                      <div key={i} className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-md transition-all duration-300 cursor-pointer",
                        i === 0
                          ? "bg-primary/10 text-primary shadow-sm"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}>
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                      </div>
                    ))}
                  </aside>

                  {/* Content Area */}
                  <main className="flex-1 overflow-hidden bg-background p-6">

                    {/* Metrics Grid */}
                    <div className="grid gap-4 md:grid-cols-3">
                      {/* Metric 1 */}
                      <div className="group rounded-lg border border-border/50 bg-card/50 p-4 shadow-sm hover:shadow-md hover:border-border transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-muted-foreground">Total Revenue</p>
                          <LineChart className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground/70 transition-colors" />
                        </div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                          <Counter value={45231} prefix="$" />
                        </div>
                        <div className="mt-1 flex items-center text-[11px]">
                          <span className="text-emerald-600 font-medium flex items-center">
                            <Activity className="h-3 w-3 mr-1" /> +20.1%
                          </span>
                          <span className="text-muted-foreground ml-1 font-medium opacity-60">vs last month</span>
                        </div>
                      </div>

                      {/* Metric 2 */}
                      <div className="group rounded-lg border border-border/50 bg-card/50 p-4 shadow-sm hover:shadow-md hover:border-border transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-muted-foreground">Active Users</p>
                          <Users className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground/70 transition-colors" />
                        </div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                          <Counter value={2350} />
                        </div>
                        <div className="mt-1 flex items-center text-[11px]">
                          <span className="text-emerald-600 font-medium flex items-center">
                            +12.5%
                          </span>
                          <span className="text-muted-foreground ml-1 font-medium opacity-60">vs last month</span>
                        </div>
                      </div>

                      {/* Metric 3 */}
                      <div className="group rounded-lg border border-border/50 bg-card/50 p-4 shadow-sm hover:shadow-md hover:border-border transition-all duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-medium text-muted-foreground">Bounce Rate</p>
                          <BarChart2 className="h-4 w-4 text-muted-foreground/40 group-hover:text-foreground/70 transition-colors" />
                        </div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                          <Counter value={42.3} suffix="%" decimals={1} />
                        </div>
                        <div className="mt-1 flex items-center text-[11px] text-muted-foreground">
                          <span className="text-emerald-600 font-medium flex items-center">
                            -3.2%
                          </span>
                          <span className="ml-1 font-medium opacity-60">improved</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Chart Area - Technical Precision */}
                    <div className="mt-4 flex-1 rounded-lg border border-border/50 bg-card/30 p-5 shadow-sm relative overflow-hidden">

                      {/* Technical Dot Pattern Background */}
                      <div className="absolute inset-0 z-0 opacity-[0.4]"
                        style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "20px 20px", color: "var(--muted-foreground)" }}
                      />

                      <div className="relative z-10 flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-sm font-semibold text-foreground tracking-tight">Revenue Growth</h3>
                          <p className="text-xs text-muted-foreground/80">Monthly recurrence</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs border-border/50 bg-background/50 shadow-none hover:bg-background">Last 6 Months</Button>
                      </div>

                      {/* Visual Chart Bars - Clean & Balanced */}
                      <div className="relative z-10 flex h-32 items-end justify-between gap-2 mt-4">
                        {[40, 65, 50, 80, 55, 90, 70, 95, 85, 60, 75, 50].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
                            className={cn(
                              "w-full rounded-[2px] transition-colors duration-300",
                              i === 7
                                ? "bg-primary" // Accent for peak
                                : "bg-muted/40 hover:bg-muted-foreground/30" // Subtle gray for others
                            )}
                          />
                        ))}
                      </div>

                      {/* Axis Labels */}
                      <div className="relative z-10 flex justify-between mt-2 pt-2 border-t border-border/50 border-dashed">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
                          <span key={i} className={cn("text-[10px] text-muted-foreground/70 font-medium", i % 2 !== 0 && "hidden sm:block")}>{m}</span>
                        ))}
                      </div>

                    </div>
                  </main>
                </div>
              </div>

              {/* Hardware Glare/Edge */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20 dark:ring-white/10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero01;
