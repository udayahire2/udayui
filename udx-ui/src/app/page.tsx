import Link from "next/link";
import { ArrowRight, LayoutTemplate, Monitor, Quote } from "lucide-react";

const components = [
  {
    title: "Headers",
    description: "Responsive navigation bars with various styles and functionalities.",
    icon: LayoutTemplate,
    variants: [
      { name: "Simple", href: "/preview/header/simple" },
      { name: "Normal", href: "/preview/header/normal" },
      { name: "Premium", href: "/preview/header/premium" },
    ],
  },
  {
    title: "Hero Sections",
    description: "High-impact opening sections to grab user attention.",
    icon: Monitor,
    variants: [
      { name: "Simple", href: "/preview/hero/simple" },
      { name: "Normal", href: "/preview/hero/normal" },
      { name: "Premium", href: "/preview/hero/premium" },
    ],
  },
  {
    title: "Testimonials",
    description: "Social proof sections to build trust.",
    icon: Quote,
    variants: [
      { name: "Simple", href: "/preview/testimonials/simple" },
      { name: "Normal", href: "/preview/testimonials/normal" },
      { name: "Premium", href: "/preview/testimonials/premium" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
            UDX UI Library
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Premium Block Components
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A curated collection of React components with Simple, Normal, and Premium variants.
            Built with Shadcn UI and Tailwind CSS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <div
              key={component.title}
              className="group relative rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-md"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <component.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-xl tracking-tight">
                    {component.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {component.description}
                </p>
                <div className="grid grid-cols-1 gap-2 pt-2">
                  {component.variants.map((variant) => (
                    <Link
                      key={variant.name}
                      href={variant.href}
                      className="inline-flex items-center justify-between rounded-md bg-muted/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary group/item"
                    >
                      {variant.name}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}