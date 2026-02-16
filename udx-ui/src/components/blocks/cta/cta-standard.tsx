"use client";

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Cta02() {
    return (
        <section className="w-full py-24 bg-muted/40">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-10 lg:grid-cols-2 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            Experience the workflow the best frontend teams love.
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            We make it easy to build, test, and ship your code. Secure, fast, and reliable.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input type="email" placeholder="Enter your email" />
                                <Button type="submit">Subscribe</Button>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Sign up to get notified when we launch. <span className="underline cursor-pointer">Terms & Conditions</span>
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-background shadow-sm">
                            <div className="flex h-full items-center justify-center bg-muted">
                                <span className="text-muted-foreground">Image / Illustration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
