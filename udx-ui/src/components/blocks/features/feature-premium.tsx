"use client";

import React from "react"
import { Check } from "lucide-react"

export function Features03() {
    return (
        <section className="w-full py-24 lg:py-32 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="flex items-center justify-center">
                        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl bg-muted border">
                            <div className="flex h-full items-center justify-center">
                                {/* Placeholder for feature image */}
                                <span className="text-muted-foreground">Feature Image</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Everything you need to succeed.
                        </h2>
                        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform provides a comprehensive suite of tools designed to help you build, launch, and scale your applications with ease.
                        </p>
                        <ul className="grid gap-2 py-4">
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span>Automated workflows</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span>Detailed analytics</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="h-5 w-5 text-primary" />
                                <span>24/7 Support</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
