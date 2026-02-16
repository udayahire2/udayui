"use client";

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export function Pricing03() {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <section className="w-full py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">

                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, transparent pricing</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                        Choose the plan that's right for you
                    </p>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="pricing-mode">Monthly</Label>
                        <Switch id="pricing-mode" checked={isYearly} onCheckedChange={setIsYearly} />
                        <Label htmlFor="pricing-mode">Yearly</Label>
                        <Badge variant="secondary" className="ml-2">Save 20%</Badge>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
                    {/* Starter Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Starter</CardTitle>
                            <CardDescription>Best for personal projects.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-4">
                                ${isYearly ? "0" : "0"} <span className="text-muted-foreground text-sm font-normal">/mo</span>
                            </div>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Community Support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 1 Project</li>
                                <li className="flex items-center gap-2 text-muted-foreground/50"><X className="h-4 w-4" /> Advanced Analytics</li>
                                <li className="flex items-center gap-2 text-muted-foreground/50"><X className="h-4 w-4" /> Dedicated Account Manager</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">Start for Free</Button>
                        </CardFooter>
                    </Card>

                    {/* Professional Plan */}
                    <Card className="border-primary shadow-lg relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            Popular
                        </div>
                        <CardHeader>
                            <CardTitle>Professional</CardTitle>
                            <CardDescription>For serious developers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-4">
                                ${isYearly ? "29" : "39"} <span className="text-muted-foreground text-sm font-normal">/mo</span>
                            </div>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Priority email support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Projects</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced Analytics</li>
                                <li className="flex items-center gap-2 text-muted-foreground/50"><X className="h-4 w-4" /> Dedicated Account Manager</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Get Started</Button>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Enterprise</CardTitle>
                            <CardDescription>For large teams and organizations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold mb-4">
                                ${isYearly ? "99" : "129"} <span className="text-muted-foreground text-sm font-normal">/mo</span>
                            </div>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 24/7 Phone & Email support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited Projects</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced Analytics</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Dedicated Account Manager</li>
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
