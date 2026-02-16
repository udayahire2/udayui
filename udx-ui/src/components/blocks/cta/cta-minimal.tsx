"use client";

import React from "react"
import { Button } from "@/components/ui/button"

export function Cta01() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Ready to get started?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Join today and experience the power of our platform.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
            <Button size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
