"use client";

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, Zap } from "lucide-react"

export function Features02() {
    return (
        <section className="w-full py-24 bg-muted/40">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <Zap className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Instant Deployment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Push your code and we handle the rest. Your app is live in seconds.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <BarChart className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Real-time Analytics</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Track your users and performance metrics in real-time with our dashboard.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Users className="h-10 w-10 text-primary mb-2" />
                            <CardTitle>Team Collaboration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Invite your team and collaborate on projects with role-based access control.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
