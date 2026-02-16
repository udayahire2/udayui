"use client";

import React from "react"

export function Stats01() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold tracking-tighter sm:text-5xl">100+</h3>
                        <p className="text-muted-foreground">Integrations</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold tracking-tighter sm:text-5xl">24/7</h3>
                        <p className="text-muted-foreground">Support</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold tracking-tighter sm:text-5xl">99.9%</h3>
                        <p className="text-muted-foreground">Uptime</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-4xl font-bold tracking-tighter sm:text-5xl">50k+</h3>
                        <p className="text-muted-foreground">Users</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
