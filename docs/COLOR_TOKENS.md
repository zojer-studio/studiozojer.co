# Color Token Quick Reference

This is the exact color system from portfolio-react.

## Token Usage

### Text
```tsx
text-tx-primary      // Main content (100% opacity)
text-tx-secondary    // Supporting info (70% opacity)
text-tx-tertiary     // Subtle hints (50% opacity)
text-tx-disabled     // Inactive (22% opacity)
text-tx-button       // Button text
text-tx-brand        // Brand colored text
```

### Backgrounds
```tsx
bg-bg-base           // Page background
bg-bg-card           // Card background
bg-bg-card-hover     // Card hover
bg-bg-card-pressed   // Card pressed
bg-bg-hover          // Hover state (12% opacity)
bg-bg-pressed        // Pressed state (15% opacity)
bg-bg-brand          // Brand background
bg-bg-button         // Button background (dark)
bg-bg-button-brand   // Brand button
```

### Borders
```tsx
border-bd-primary    // Primary border (15% opacity)
border-bd-secondary  // Secondary border (8% opacity)
border-bd-card       // Card border (35% opacity)
border-bd-hover      // Hover border (17% opacity)
border-bd-brand      // Brand border
```

### Icons
```tsx
text-ic-primary      // Primary icons (90% opacity)
text-ic-secondary    // Secondary icons (60% opacity)
text-ic-tertiary     // Tertiary icons (40% opacity)
text-ic-disabled     // Disabled icons (15% opacity)
text-ic-brand        // Brand colored icons
```

### Direct Colors
```tsx
bg-brand             // Brand color
text-brand           // Brand text
bg-light             // Light background
bg-dark              // Dark background
```

### Semantic
```tsx
text-success         // Green success
text-warning         // Orange warning
text-error           // Red error
text-info            // Blue info
```

## Themes

### Forest (Default)
- Warm beige/tan backgrounds
- Green brand color
- Earthy feel

### Opalite
- Cool blue/gray backgrounds
- Bright blue brand
- Modern feel

## Elevation Utilities

```tsx
className="elevation-1"       // Subtle shadow
className="elevation-big"     // Large shadow
className="corner-shadow"     // Corner decoration
```

## HSL Color Values

### Forest Theme
```css
--dark-800: 96 4% 24%      /* Primary dark */
--light-200: 38 50% 90%    /* Page background */
--brand: 101 21% 45%       /* Green brand */
```

### Opalite Theme
```css
--dark-800: 210 20% 25%    /* Primary dark (blue) */
--light-200: 210 25% 88%   /* Page background (blue) */
--brand: 214 88% 55%       /* Blue brand */
```

## Common Patterns

### Card with border
```tsx
<div className="bg-bg-card border border-bd-card rounded-lg p-6">
  <h3 className="text-tx-primary">Title</h3>
  <p className="text-tx-secondary">Description</p>
</div>
```

### Button styles
```tsx
<button className="bg-bg-button text-tx-button hover:bg-dark">
  Dark Button
</button>

<button className="bg-brand text-tx-button">
  Brand Button
</button>
```

### Interactive element
```tsx
<div className="bg-bg-card hover:bg-bg-card-hover active:bg-bg-card-pressed border border-bd-primary hover:border-bd-hover">
  Clickable card
</div>
```

## Opacity Levels

The system uses consistent opacity levels:

- **100%** - Primary elements
- **95%** - Body text
- **90%** - Primary icons
- **70%** - Secondary text
- **60%** - Secondary icons
- **50%** - Tertiary text
- **40%** - Tertiary icons
- **22%** - Disabled text
- **18-15%** - Borders, hover states
- **12-8%** - Backgrounds, subtle states
- **5-3%** - Very subtle states
