# Header Components

Collection of responsive header/navbar blocks for landing pages and web applications.

## DefaultNavbar

A sticky, fully customizable navigation bar with theme toggle, mobile responsiveness, and flexible action buttons.

### Quick Start

```tsx
import { DefaultNavbar } from "@/components/blocks/header/header-01";

export default function Page() {
  return (
    <DefaultNavbar 
      logoText="Brand"
      anchor="Home,About,Services,Contact"
      button="Sign In,Get Started"
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"normal" \| "rounded"` | `"normal"` | Border radius: `normal` (rounded-md) or `rounded` (rounded-full) |
| `logo` | `ReactNode` | - | Custom logo component |
| `logoText` | `string` | `"Brand"` | Logo text label |
| `navItems` | `NavigationItem[]` | - | Custom navigation items. Overrides `anchor` |
| `anchor` | `string` | - | Comma-separated nav labels: `"Home,About,Services"` |
| `button` | `string` | - | Comma-separated button labels: `"Sign In,Get Started"` |
| `actions` | `"dots" \| "buttons" \| "none"` | `"dots"` | Action menu type when `button` prop not set |
| `showThemeToggle` | `boolean` | `true` | Show dark/light mode toggle |

### Features

- **Responsive** - Auto hamburger menu on mobile  
- **Theme Toggle** - Built-in light/dark mode  
- **Sticky** - Stays at top with smooth scroll effect  
- **Smart Buttons** - Automatic hierarchy (ghost → outline → default)  
- **Keyboard Support** - ESC closes mobile menu  
- **Accessible** - ARIA labels & semantic HTML  

### Examples

**Basic Landing Page**
```tsx
<DefaultNavbar
  variant="rounded"
  logoText="SaaS"
  anchor="Features,Pricing,Blog,Community"
  button="Sign In,Get Started"
/>
```

**App Header (Minimal)**
```tsx
<DefaultNavbar
  logoText="MyApp"
  anchor="Home,Dashboard,Settings"
  actions="none"
/>
```

**With Custom Logo**
```tsx
<DefaultNavbar
  logo={<YourLogoComponent />}
  logoText="MyBrand"
  navItems={[
    { name: "Docs", href: "/docs" },
    { name: "API", href: "/api" },
  ]}
  button="Sign In"
  variant="rounded"
/>
```

### Navigation Item Type

```tsx
interface NavigationItem {
  name: string;
  href: string;
}
```

### Button Styling Logic

Buttons are automatically styled based on their position:

- **Single button**: `default` (primary)
- **First button**: `ghost` (secondary)
- **Middle buttons**: `outline` (tertiary)
- **Last button**: `default` (primary CTA)

### Customization

**Change Border Radius**
```tsx
<DefaultNavbar variant="rounded" />  // Fully rounded
<DefaultNavbar variant="normal" />   // Standard rounded corners
```

**Hide Theme Toggle**
```tsx
<DefaultNavbar showThemeToggle={false} />
```

**Custom Navigation**
```tsx
const items = [
  { name: "Docs", href: "/docs" },
  { name: "GitHub", href: "https://github.com" },
];

<DefaultNavbar navItems={items} />
```

### Mobile Behavior

- Shows hamburger menu on screens < 768px
- Menu closes when:
  - Link is clicked
  - Outside area is clicked
  - ESC key is pressed
- Smooth slide-in animation

### Accessibility

- ARIA labels (`aria-label`, `aria-expanded`)  
- Keyboard navigation (ESC support)  
- Semantic HTML  
- High contrast text  
- Focus states  

### Scroll Effects

The navbar changes style based on scroll position:

- **No scroll** (`0-50px`): Light background with minimal blur
- **Scrolled** (`> 50px`): Enhanced background with stronger backdrop blur and shadow

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers