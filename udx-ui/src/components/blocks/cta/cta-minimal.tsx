import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface CtaMinimalProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The primary heading text. Keep it concise and action-oriented.
   */
  heading?: string;
  /**
   * Supporting description text explaining the value or next step.
   */
  description?: string;
  /**
   * The main action button's label.
   */
  primaryActionLabel?: string;
  /**
   * The main action button's deeply linked URL.
   */
  primaryActionHref?: string;
  /**
   * Optional secondary action button label (e.g., "Read documentation").
   */
  secondaryActionLabel?: string;
  /**
   * Optional secondary action button URL.
   */
  secondaryActionHref?: string;
}

export function Cta01({
  heading = "Ready to build?",
  description = "Start integrating with our robust API to power your next application.",
  primaryActionLabel = "Get started",
  primaryActionHref = "#",
  secondaryActionLabel = "View documentation",
  secondaryActionHref = "#",
  className,
  ...props
}: CtaMinimalProps) {
  return (
    <section
      className={cn(
        "w-full py-16 md:py-24 lg:py-32",
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-[640px] px-6 text-center">
        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="mx-auto max-w-[500px] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          {primaryActionLabel && (
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto px-8"
            >
              <a href={primaryActionHref}>{primaryActionLabel}</a>
            </Button>
          )}

          {secondaryActionLabel && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8"
            >
              <a href={secondaryActionHref}>{secondaryActionLabel}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
