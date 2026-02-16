"use client";

import React from "react"

export function Stats03() {
    return (
        <section className="w-full py-24 lg:py-32 bg-background border-y">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Trusted by developers worldwide.
                        </h2>
                        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform handles millions of requests every day with 99.99% uptime. Scale without worry.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold tracking-tighter">10M+</h3>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider">Requests / Day</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold tracking-tighter">99.99%</h3>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider">Uptime SLA</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold tracking-tighter">150ms</h3>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider">Avg Latency</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-4xl font-bold tracking-tighter">500+</h3>
                            <p className="text-muted-foreground text-sm uppercase tracking-wider">Global Nodes</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
