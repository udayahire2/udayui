# Testimonials Components

Collection of professional testimonials blocks built with Shadcn UI core components. All variants are fully customizable, accessible, and support dark mode.

## Components

### 1. **TestimonialsNormal** (Card-based)
Grid layout with individual testimonial cards featuring:
- Star ratings (1-5 stars)
- User avatars with fallback
- Author name and role
- quotation styling
- Hover effects
- Responsive grid (3 columns on desktop, stacking on mobile)

**Features:**
- Fully customizable testimonial data
- Optional star ratings
- Clean card design with Shadcn Card component
- Smooth transitions and hover effects

**Usage:**
```tsx
import { TestimonialsNormal } from "@/components/blocks/testimonials";

export default function Demo() {
  const testimonials = [
    {
      quote: "Amazing component library!",
      author: "John Doe",
      role: "CTO",
      avatar: "https://...",
      rating: 5,
    },
  ];

  return (
    <TestimonialsNormal
      testimonials={testimonials}
      title="Loved by Builders"
      description="Join thousands of developers..."
    />
  );
}
```

### 2. **TestimonialsPremium** (Carousel/Marquee)
Animated scrolling carousel with infinite loop featuring:
- Dual-row marquee animation (forward and reverse)
- Verified badge support
- Quote icon decoration
- Smooth hover-pause animation
- Responsive container
- Edge gradient masks for smooth overflow

**Features:**
- Auto-scrolling testimonials
- Pause on hover
- Verified user badges
- Theme-aware styling
- Performance optimized

**Usage:**
```tsx
import { TestimonialsPremium } from "@/components/blocks/testimonials";

export default function Demo() {
  const testimonials = [
    {
      name: "Alex Smith",
      username: "@alexsmith",
      body: "Incredible UI library!",
      img: "https://...",
      verified: true,
    },
  ];

  return (
    <TestimonialsPremium
      testimonials={testimonials}
      badge="Trusted by 500+ companies"
    />
  );
}
```

### 3. **TestimonialsSimple** (Minimal)
Clean minimal layout with badges featuring:
- Role badges for each testimonial
- Minimal card design
- Italic quote styling
- Author attribution
- Separator line
- Desktop badge header

**Features:**
- Minimal, distraction-free design
- Role-based badges
- Optional header badge
- Lightweight styling
- Great for professional contexts

**Usage:**
```tsx
import { TestimonialsSimple } from "@/components/blocks/testimonials";

export default function Demo() {
  const testimonials = [
    {
      quote: "Best development tool out there.",
      author: "Jane Developer",
      role: "Frontend Lead",
    },
  ];

  return (
    <TestimonialsSimple
      testimonials={testimonials}
      title="What our users say"
      showBadge={true}
    />
  );
}
```

## Reusable Sub-Components

### TestimonialCard
Individual card component for TestimonialsNormal:
```tsx
import { TestimonialCard } from "@/components/blocks/testimonials";

<TestimonialCard
  quote="Great library!"
  author="John"
  role="Developer"
  avatar="https://..."
  rating={5}
/>
```

### ReviewCard
Individual card component for TestimonialsPremium:
```tsx
import { ReviewCard } from "@/components/blocks/testimonials";

<ReviewCard
  name="Alex"
  username="@alex"
  body="Amazing!"
  img="https://..."
  verified={true}
/>
```

### MinimalTestimonialCard
Individual card component for TestimonialsSimple:
```tsx
import { MinimalTestimonialCard } from "@/components/blocks/testimonials";

<MinimalTestimonialCard
  quote="Great!"
  author="Jane"
  role="CTO"
/>
```

## Type Definitions

```typescript
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating?: number;
}

interface CarouselTestimonialProps {
  name: string;
  username: string;
  body: string;
  img: string;
  verified?: boolean;
}

interface MinimalTestimonialProps {
  quote: string;
  author: string;
  role: string;
}
```

## Customization

All components accept custom data and support:
- ✅ Light/Dark mode
- ✅ Custom title and description
- ✅ Tailwind CSS theming
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Scroll animations
- ✅ Hover effects

## Features

- **Shadcn UI Components:** Built with core Shadcn components (Card, Avatar, Badge, etc.)
- **TypeScript:** Full type support with exported interfaces
- **Responsive:** Mobile-first responsive design
- **Accessible:** WCAG compliant with proper semantic HTML
- **Themeable:** Supports light/dark mode with CSS variables
- **Performance:** Optimized animations with CSS
- **Customizable:** Easy to extend and modify

## Dependencies

- `@shadcn/ui` - Core UI components
- `lucide-react` - Icons (Star, Quote)
- `clsx` or `tailwind-merge` - Class utilities
