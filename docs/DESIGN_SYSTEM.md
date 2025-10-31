# Design System Documentation

This project implements the exact semantic color token system, multi-theme architecture, and shadcn/ui component foundation from the portfolio-react architecture.

## Color System Overview

The design system uses HSL color space with opacity modifiers for flexibility. Base colors are defined as HSL values (e.g., `96 4% 24%`) and then composed with opacity to create semantic tokens.

### Base Color Variables

```css
/* Forest Theme (warm, earthy) */
--dark-800: 96 4% 24%;    /* Primary dark color */
--dark-900: 96 4% 16%;    /* Darker variant */
--dark-950: 96 4% 10%;    /* Darkest variant */
--light-100: 38 58% 94%;  /* Lightest background */
--light-150: 38 56% 92%;  /* Card hover state */
--light-200: 38 50% 90%;  /* Base background */
--light-300: 38 48% 87%;  /* Pressed state */
--light-400: 38 50% 80%;  /* Deeper variant */
--light-600: 36 14% 50%;  /* Mid-tone */
--light-900: 36 14% 15%;  /* Border base */
--brand: 101 21% 45%;     /* Brand green */

/* Opalite Theme (cool, blue) */
--dark-800: 210 20% 25%;  /* Primary dark color */
--dark-900: 210 20% 18%;  /* Darker variant */
--dark-950: 210 20% 12%;  /* Darkest variant */
--light-100: 210 40% 96%; /* Lightest background */
--light-200: 210 25% 88%; /* Base background */
--light-600: 210 25% 55%; /* Mid-tone */
--light-900: 210 25% 20%; /* Border base */
--brand: 214 88% 55%;     /* Brand blue */
```

## Semantic Color Tokens

### Text Colors (`tx-*`)

Colors are composed using HSL with opacity:

- `tx-primary` - `hsl(var(--dark-800))` - Main content and headings (100% opacity)
- `tx-body` - `hsl(var(--dark-800) / 0.95)` - Body text (95% opacity)
- `tx-secondary` - `hsl(var(--dark-800) / 0.7)` - Supporting information (70% opacity)
- `tx-tertiary` - `hsl(var(--dark-800) / 0.5)` - Subtle hints (50% opacity)
- `tx-disabled` - `hsl(var(--dark-800) / 0.22)` - Inactive elements (22% opacity)
- `tx-button` - `hsl(var(--light-100))` - Button text
- `tx-brand` - `hsl(var(--brand) / 0.95)` - Brand-colored text

### Icon Colors (`ic-*`)

- `ic-primary` - `hsl(var(--dark-800) / 0.9)` - Primary icons (90% opacity)
- `ic-secondary` - `hsl(var(--dark-800) / 0.6)` - Secondary icons (60% opacity)
- `ic-tertiary` - `hsl(var(--dark-800) / 0.4)` - Tertiary icons (40% opacity)
- `ic-disabled` - `hsl(var(--dark-800) / 0.15)` - Disabled icons (15% opacity)
- `ic-button` - `hsl(var(--light-100))` - Icons on buttons
- `ic-brand` - `hsl(var(--brand) / 0.9)` - Brand-colored icons

### Background Colors (`bg-*`)

- `bg` - `hsl(var(--light-100))` - Default background
- `bg-base` - `hsl(var(--light-200))` - Base page background
- `bg-card` - `hsl(var(--light-100))` - Card background
- `bg-card-hover` - `hsl(var(--light-150))` - Card hover state
- `bg-card-pressed` - `hsl(var(--light-300))` - Card pressed state
- `bg-primary` - `hsl(var(--dark-800) / 0.08)` - Primary background (8% opacity)
- `bg-secondary` - `hsl(var(--dark-800) / 0.03)` - Secondary background (3% opacity)
- `bg-hover` - `hsl(var(--dark-800) / 0.12)` - Hover state (12% opacity)
- `bg-pressed` - `hsl(var(--dark-800) / 0.15)` - Pressed state (15% opacity)
- `bg-disabled` - `hsl(var(--dark-800) / 0.04)` - Disabled state (4% opacity)
- `bg-brand` - `hsl(var(--brand) / 0.12)` - Brand background
- `bg-brand-hover` - `hsl(var(--brand) / 0.18)` - Brand hover
- `bg-brand-pressed` - `hsl(var(--brand) / 0.22)` - Brand pressed
- `bg-button` - `hsl(var(--dark-800))` - Button background
- `bg-button-brand` - `hsl(var(--brand))` - Brand button

### Border Colors (`bd-*`)

- `bd` - `hsl(var(--light-900))` - Default border
- `bd-base` - `hsl(var(--light-900) / 0.8)` - Base border (80% opacity)
- `bd-card` - `hsl(var(--light-600) / 0.35)` - Card border (35% opacity)
- `bd-primary` - `hsl(var(--dark-800) / 0.15)` - Primary border (15% opacity)
- `bd-secondary` - `hsl(var(--dark-800) / 0.08)` - Secondary border (8% opacity)
- `bd-hover` - `hsl(var(--dark-800) / 0.17)` - Hover border (17% opacity)
- `bd-pressed` - `hsl(var(--dark-800) / 0.18)` - Pressed border (18% opacity)
- `bd-disabled` - `hsl(var(--dark-800) / 0.05)` - Disabled border (5% opacity)
- `bd-brand` - `hsl(var(--brand) / 0.55)` - Brand border
- `bd-brand-hover` - `hsl(var(--brand) / 0.6)` - Brand hover border
- `bd-brand-pressed` - `hsl(var(--brand) / 0.63)` - Brand pressed border

## Using the Tokens

### In Tailwind Classes

```tsx
// Text colors
<p className="text-tx-primary">Primary text</p>
<p className="text-tx-secondary">Secondary text</p>
<p className="text-tx-brand">Brand colored text</p>

// Backgrounds
<div className="bg-bg-card">Card content</div>
<button className="bg-bg-button text-tx-button hover:bg-dark">Button</button>
<div className="bg-brand">Brand background</div>

// Borders
<div className="border border-bd-primary">Bordered element</div>
<div className="border border-bd-card">Card border</div>

// Icons
<Icon className="text-ic-primary" />
<Icon className="text-ic-secondary" />
```

### Elevation Utilities

```tsx
// From portfolio-react
<div className="elevation-1">Subtle shadow</div>
<div className="elevation-big">Large shadow</div>
<div className="corner-shadow">Corner decoration</div>
```

## Multi-Theme Architecture

The project supports two themes from portfolio-react:

### 1. Forest Theme (Default)
- Warm, earthy tones
- Green brand color (`101 21% 45%`)
- Beige/tan backgrounds

### 2. Opalite Theme
- Cool, blue tones
- Bright blue brand color (`214 88% 55%`)
- Light blue/gray backgrounds

### Theme Switching

The theme toggle switches between Forest and Opalite:

```tsx
import { ThemeToggle } from "@/src/components/theme-toggle"

// Add the theme toggle anywhere
<ThemeToggle />
```

Icons:
- 🌲 Trees icon = Switch to Forest theme
- 💎 Gem icon = Switch to Opalite theme

### Programmatic Theme Access

```tsx
"use client"

import { useTheme } from "next-themes"

export function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme("forest")}>Forest</button>
      <button onClick={() => setTheme("opalite")}>Opalite</button>
    </div>
  )
}
```

## shadcn/ui Components

### Button Component

```tsx
import { Button } from "@/src/components/ui/button"

// Variants using the token system
<Button variant="default">Default (dark button)</Button>
<Button variant="brand">Brand colored</Button>
<Button variant="secondary">Secondary (card bg)</Button>
<Button variant="outline">Outlined</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link style</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Card Component

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Subtitle with tx-secondary</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-tx-secondary">Content</p>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Action</Button>
  </CardFooter>
</Card>
```

## Adding a New Theme

To add a third theme (e.g., "midnight"):

1. Add theme colors in `app/globals.css`:

```css
[data-theme="midnight"] {
  --dark-800: 240 10% 25%;
  --dark-900: 240 10% 18%;
  --dark-950: 240 10% 12%;
  --light-100: 240 20% 96%;
  --light-150: 240 15% 94%;
  --light-200: 240 15% 90%;
  --light-300: 240 10% 85%;
  --light-600: 240 10% 50%;
  --light-900: 240 10% 20%;
  --brand: 280 70% 60%;  /* Purple brand */
  --box-clip: rgb(230, 230, 240);
}
```

2. Update `app/layout.tsx`:

```tsx
<ThemeProvider
  attribute="data-theme"
  defaultTheme="forest"
  themes={["forest", "opalite", "midnight"]}
  enableSystem={false}
  disableTransitionOnChange={false}
>
```

3. Update `src/components/theme-toggle.tsx` to cycle through all themes.

## Color Token Philosophy

The system uses **opacity-based semantic tokens** which provides:

1. **Consistency**: All colors derive from base HSL values
2. **Flexibility**: Opacity modifiers create shades without new colors
3. **Theme-ability**: Changing base colors updates entire theme
4. **Predictability**: Same opacity = same visual weight across themes

### Example Flow

```
Base: --dark-800: 96 4% 24%
↓
Semantic: --color-tx-secondary: hsl(var(--dark-800) / 0.7)
↓
Usage: className="text-tx-secondary"
↓
Result: hsl(96 4% 24% / 0.7) = 70% opacity dark text
```

When theme changes to Opalite:
```
Base: --dark-800: 210 20% 25%  (now blue instead of green)
↓
Semantic: --color-tx-secondary: hsl(var(--dark-800) / 0.7)  (same)
↓
Usage: className="text-tx-secondary"  (same)
↓
Result: hsl(210 20% 25% / 0.7) = 70% opacity blue text
```

## Best Practices

1. **Always use semantic tokens** (`text-tx-primary`) not base colors (`text-dark`)
2. **Use opacity for variations** rather than creating new color values
3. **Test in both themes** to ensure proper contrast and readability
4. **Follow the HSL pattern** when adding new colors (H S% L% format)
5. **Use the cn() utility** for conditional classes
6. **Leverage elevation utilities** for depth instead of custom shadows

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   │   ├── button.tsx         # Using token system
│   │   └── card.tsx           # Using token system
│   ├── theme-provider.tsx     # Theme context
│   └── theme-toggle.tsx       # Forest/Opalite switcher
└── lib/
    └── utils.ts               # cn() utility

app/
├── globals.css                # Color tokens (forest/opalite)
├── layout.tsx                 # ThemeProvider setup
└── page.tsx                   # Demo page
```

## Resources

- Portfolio React source: `/Users/david/Documents/GitHub/portfolio-react`
- Tailwind CSS v4: https://tailwindcss.com/docs
- next-themes: https://github.com/pacocoursey/next-themes
