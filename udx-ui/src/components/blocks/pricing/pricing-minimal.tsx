"use client";

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function Pricing01() {
    return (
        <section className="w-full py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
                    {/* Basic Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic</CardTitle>
                            <CardDescription>Essential features for individuals.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">$0</div>
                            <span className="text-muted-foreground text-sm">/month</span>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" variant="outline">Get Started</Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="border-primary shadow-md">
                        <CardHeader>
                            <CardTitle>Pro</CardTitle>
                            <CardDescription>Perfect for growing teams.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">$29</div>
                            <span className="text-muted-foreground text-sm">/month</span>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Get Started</Button>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Enterprise</CardTitle>
                            <CardDescription>For large scale applications.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">$99</div>
                            <span className="text-muted-foreground text-sm">/month</span>
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
