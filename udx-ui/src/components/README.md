# Components Directory Structure

This directory contains all the UI components for the project, organized into two main categories:

## 📁 Directory Structure

```
components/
├── ui/          # Base Shadcn primitives
└── blocks/      # Custom composite components
```

## 📦 `ui/` - Base Shadcn Components

This folder contains **base primitive components** installed and managed by the Shadcn CLI.

**Examples:**

- `button.tsx`
- `input.tsx`
- `card.tsx`
- `dialog.tsx`
- `dropdown-menu.tsx`

**Usage:**

- Install components using: `npx shadcn@latest add <component-name>`
- These are the building blocks for your custom components
- Modify these carefully as they affect the entire design system

## 🧱 `blocks/` - Custom Composite Components

This folder contains **custom components** that you build by composing the base primitives from `ui/`.

**Examples:**

- `UserCard.tsx` - A card component combining Card, Avatar, and Button
- `HeroSection.tsx` - A hero section with custom layout
- `Navbar.tsx` - Navigation bar with dropdowns and links
- `ProductCard.tsx` - Product display card with image, title, price

**Guidelines:**

- Build these by importing and combining components from `ui/`
- Add your custom business logic here
- These are reusable across your application
- Name files in PascalCase (e.g., `UserCard.tsx`)

## 🎨 Preview Your Components

To preview and test your components, navigate to `/preview` in your browser.

Each component should have a corresponding preview page in `app/preview/[component-name]/page.tsx`.

## 🚀 Best Practices

1. **Keep `ui/` clean** - Only Shadcn primitives go here
2. **Build in `blocks/`** - All custom components go here
3. **Compose, don't duplicate** - Reuse `ui/` components in `blocks/`
4. **Document your blocks** - Add JSDoc comments for complex components
5. **Test in preview** - Always test new components in the preview environment

## 📖 Example

```tsx
// components/blocks/UserCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UserCard({ name, email }: { name: string; email: string }) {
  return (
    <Card>
      <CardHeader>{name}</CardHeader>
      <CardContent>
        <p>{email}</p>
        <Button>View Profile</Button>
      </CardContent>
    </Card>
  );
}
```

---

Happy coding! 🎉
