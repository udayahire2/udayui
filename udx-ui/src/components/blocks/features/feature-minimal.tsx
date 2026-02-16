"use client";

import React from "react"
import { Check, Shield, Zap } from "lucide-react"

export function Features01() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2">
                            <Zap className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-bold">Fast Performance</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Optimized for speed and efficiency. Experience lightning-fast load times.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2">
                            <Shield className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-bold">Secure by Default</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Enterprise-grade security features built-in to protect your data.
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center gap-2">
                            <Check className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-bold">Easy Integration</h3>
                        </div>
                        <p className="text-muted-foreground">
                            Seamlessly integrates with your existing workflow and tools.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
