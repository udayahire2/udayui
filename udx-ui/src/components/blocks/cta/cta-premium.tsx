"use client";

import React from "react"
import { Button } from "@/components/ui/button"

export function Cta03() {
  return (
    <section className="w-full py-24 lg:py-32 bg-background border-t">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid items-center gap-6 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to scale your application?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Unlock all features and get unlimited access to our support team. Cancel anytime.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-sm flex-col gap-2 min-[400px]:flex-row justify-center">
            <Button className="w-full sm:w-auto" size="lg">
              Get Started
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
