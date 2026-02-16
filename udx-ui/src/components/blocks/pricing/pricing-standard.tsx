"use client";

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function Pricing02() {
    return (
        <section className="w-full py-24 bg-muted/40">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-6 md:grid-cols-3 lg:gap-8 items-start">

                    {/* Basic Plan */}
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Basic</CardTitle>
                            <CardDescription>Essential features for individuals.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold mb-4">$0 <span className="text-muted-foreground text-sm font-normal">/month</span></div>
                            <ul className="grid gap-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 1 User</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 5GB Storage</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Basic Support</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">Get Started</Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Plan (Highlighted) */}
                    <Card className="flex flex-col border-primary shadow-lg relative scale-105 bg-background">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            Most Popular
                        </div>
                        <CardHeader>
                            <CardTitle>Pro</CardTitle>
                            <CardDescription>Perfect for growing teams.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold mb-4">$29 <span className="text-muted-foreground text-sm font-normal">/month</span></div>
                            <ul className="grid gap-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 5 Users</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 50GB Storage</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Priority Support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced Analytics</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Get Started</Button>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Enterprise</CardTitle>
                            <CardDescription>For large scale applications.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="text-4xl font-bold mb-4">$99 <span className="text-muted-foreground text-sm font-normal">/month</span></div>
                            <ul className="grid gap-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Users</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Storage</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 24/7 Support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Custom Integrations</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">Contact Sales</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}
