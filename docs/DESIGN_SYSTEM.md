# Design System Documentation

This project implements a semantic color token system, multi-theme architecture, and shadcn/ui component foundation inspired by the portfolio-react architecture.

## Semantic Color Token System

The design system uses semantic naming conventions for colors, making it easier to maintain consistency and support multiple themes.

### Token Categories

#### Text Colors (`tx-*`)
- `tx-primary` - Main content and headings
- `tx-secondary` - Supporting information
- `tx-tertiary` - Subtle hints and labels
- `tx-disabled` - Inactive elements
- `tx-inverse` - Inverse text (for dark backgrounds)

#### Background Colors (`bg-*`)
- `bg-base` - Base page background
- `bg-card` - Card and elevated surface background
- `bg-hover` - Hover state background
- `bg-pressed` - Pressed/active state background
- `bg-disabled` - Disabled element background
- `bg-inverse` - Inverse background

#### Border Colors (`bd-*`)
- `bd-primary` - Primary borders
- `bd-secondary` - Secondary borders
- `bd-hover` - Hover state borders
- `bd-pressed` - Pressed state borders
- `bd-focus` - Focus ring borders

#### Icon Colors (`ic-*`)
- `ic-primary` - Primary icons
- `ic-secondary` - Secondary icons
- `ic-disabled` - Disabled icons

#### Semantic Colors
- `success` - Success states
- `warning` - Warning states
- `error` - Error states
- `info` - Information states

## Using the Tokens

### In Tailwind Classes

```tsx
// Text colors
<p className="text-tx-primary">Primary text</p>
<p className="text-tx-secondary">Secondary text</p>

// Backgrounds
<div className="bg-bg-card">Card content</div>
<button className="bg-accent-primary hover:bg-accent-hover">Button</button>

// Borders
<div className="border border-bd-primary">Bordered element</div>

// Semantic colors
<div className="text-success">Success message</div>
<div className="bg-error/10 border border-error">Error state</div>
```

### In Custom CSS

```css
.custom-element {
  color: var(--tx-primary);
  background: var(--bg-card);
  border: 1px solid var(--bd-primary);
}
```

## Multi-Theme Architecture

The project supports multiple themes using CSS variables and the `data-theme` attribute.

### Available Themes

1. **Light Theme** (default) - Clean, bright interface
2. **Dark Theme** - Dark mode with adjusted colors

### Theme Switching

The theme system uses `next-themes` for automatic theme detection and persistence:

```tsx
import { ThemeToggle } from "@/src/components/theme-toggle"

// Add the theme toggle anywhere
<ThemeToggle />
```

### Using Theme in Components

```tsx
"use client"

import { useTheme } from "next-themes"

export function MyComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  )
}
```

## shadcn/ui Components

The project includes a foundation of shadcn/ui components using the semantic color tokens.

### Available Components

- **Button** - `src/components/ui/button.tsx`
  - Variants: default, secondary, outline, ghost, link, destructive
  - Sizes: sm, default, lg, icon

- **Card** - `src/components/ui/card.tsx`
  - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

- **ThemeToggle** - `src/components/theme-toggle.tsx`
  - Ready-to-use theme switcher with icons

### Component Usage

```tsx
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-tx-secondary">Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Action</Button>
      </CardFooter>
    </Card>
  )
}
```

## Utility Functions

### `cn()` - Class Name Utility

Combines `clsx` and `tailwind-merge` for conditional classes and deduplication:

```tsx
import { cn } from "@/src/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  "text-tx-primary"
)} />
```

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui base components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── theme-provider.tsx     # Theme context provider
│   └── theme-toggle.tsx       # Theme switcher component
└── lib/
    └── utils.ts               # Utility functions (cn)

app/
├── globals.css                # Theme tokens and base styles
├── layout.tsx                 # Root layout with ThemeProvider
└── page.tsx                   # Demo page
```

## Adding More Themes

To add a new theme:

1. Add theme styles in `app/globals.css`:

```css
[data-theme="new-theme"] {
  --tx-primary: #...;
  --tx-secondary: #...;
  /* ... other tokens */
}
```

2. Update the ThemeProvider in `app/layout.tsx` if needed.

## Best Practices

1. **Always use semantic tokens** instead of hardcoded colors
2. **Use the `cn()` utility** for conditional classes
3. **Test in both themes** to ensure proper contrast
4. **Extend existing components** rather than creating new ones
5. **Follow the naming conventions** when adding new tokens

## Adding shadcn/ui Components

To add more shadcn/ui components, you can manually create them following the existing patterns, or refer to the [shadcn/ui documentation](https://ui.shadcn.com/) for component code.

Remember to:
- Use semantic color tokens (`text-tx-primary`, `bg-bg-card`, etc.)
- Import the `cn()` utility from `@/src/lib/utils`
- Use `class-variance-authority` for variants when needed
