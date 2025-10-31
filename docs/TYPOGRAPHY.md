# Typography System

The typography system uses custom fonts with a structured type scale from portfolio-react.

## Font Families

### Whyte (Sans-serif)
- **Purpose**: Default body text
- **Font Files**: ABCWhyte-Regular.otf, ABCWhyte-RegularItalic.otf
- **Weight**: 400 (Regular)
- **Usage**: `font-sans` or default

```tsx
<p className="font-sans">Body text in Whyte</p>
```

### Whyte Inktrap (Display)
- **Purpose**: Headings and large display text
- **Font Files**: ABCWhyteInktrap-Regular.otf, ABCWhyteInktrap-RegularItalic.otf
- **Weight**: 400 (Regular)
- **Usage**: `font-display`
- **Note**: Optical adjustments for large sizes

```tsx
<h1 className="font-display">Display Heading</h1>
```

### Fraktion Mono (Monospace)
- **Purpose**: Code, technical content, labels
- **Font Files**: PPFraktionMono-Light/Regular/Bold.otf (+ italics)
- **Weights**: 300 (Light), 400 (Regular), 700 (Bold)
- **Usage**: `font-mono`

```tsx
<code className="font-mono">const example = true;</code>
```

## Type Scale (Portfolio-React)

All sizes include **0.02rem letter-spacing**.

### Size Classes

| Size | Font Size | Line Height | Usage | Class |
|------|-----------|-------------|-------|-------|
| xs   | 0.813rem  | 1rem        | Labels, captions | `text-xs-custom` |
| sm   | 1rem      | 1.5rem      | Body text, paragraphs | `text-sm-custom` |
| md   | 1.25rem   | 2rem        | Subheadings, emphasis | `text-md-custom` |
| lg   | 1.625rem  | 2.625rem    | Section headings | `text-lg-custom` |
| xl   | 2.063rem  | 3.25rem     | Page headings | `text-xl-custom` |

### Standard Tailwind Sizes

You can also use standard Tailwind sizes (text-xs, text-sm, text-lg, etc.) but the custom classes above include the exact line-height and letter-spacing from portfolio-react.

### Button Typography

Specialized sizes for buttons:

| Size | Font Size | Line Height | Class |
|------|-----------|-------------|-------|
| btn-xs | 0.688rem | 1rem | `text-btn-xs` |
| btn-sm | 0.813rem | 1.25rem | `text-btn-sm` |
| btn-md | 0.938rem | 1.5rem | `text-btn-md` |
| btn-lg | 1rem | 1.5rem | `text-btn-lg` |

## Usage Examples

### Body Content

```tsx
<div className="font-sans">
  <p className="text-sm-custom text-tx-body">
    This is body text at 1rem with proper line-height and letter-spacing.
  </p>
  <p className="text-xs-custom text-tx-secondary">
    Small label text at 0.813rem
  </p>
</div>
```

### Headings

```tsx
<h1 className="text-xl-custom font-display text-tx-primary">
  Main Page Heading
</h1>

<h2 className="text-lg-custom font-display text-tx-primary">
  Section Heading
</h2>

<h3 className="text-md-custom font-display text-tx-primary">
  Subsection Heading
</h3>
```

### Mixed Typography

```tsx
<article className="font-sans">
  <h1 className="text-5xl font-display text-tx-primary">
    Article Title
  </h1>

  <p className="text-sm-custom text-tx-secondary">
    Published on <time className="font-mono">2024-10-30</time>
  </p>

  <p className="text-sm-custom text-tx-body">
    Body paragraph with proper spacing and proportions
    following the portfolio-react type scale.
  </p>

  <blockquote className="text-md-custom text-tx-secondary italic">
    A quote in the medium size for emphasis
  </blockquote>
</article>
```

### Code Blocks

```tsx
<pre className="font-mono bg-bg-card p-4 rounded-lg">
  <code className="text-sm-custom text-tx-primary">
    const example = "Fraktion Mono";
    console.log(example);
  </code>
</pre>
```

## Text Color Hierarchy

Combine typography with semantic color tokens:

```tsx
<div>
  <h1 className="text-tx-primary">Primary heading (100%)</h1>
  <p className="text-tx-body">Body text (95%)</p>
  <p className="text-tx-secondary">Secondary info (70%)</p>
  <span className="text-tx-tertiary">Tertiary label (50%)</span>
  <span className="text-tx-disabled">Disabled state (22%)</span>
</div>
```

## Font Loading

Fonts are loaded using `next/font/local` for optimal performance:

- **Preloaded**: Fonts are loaded immediately
- **Font display**: `swap` for progressive enhancement
- **No layout shift**: Font metrics are known upfront
- **Self-hosted**: No external requests

## CSS Variables

Access fonts directly via CSS variables:

```css
body {
  font-family: var(--font-sans);
}

h1, h2, h3 {
  font-family: var(--font-display);
}

code, pre {
  font-family: var(--font-mono);
}
```

## Best Practices

1. **Use Whyte for body text** - Clean, readable sans-serif
2. **Use Whyte Inktrap for display** - Optimized for large sizes
3. **Use Fraktion Mono for code** - Clear monospace with multiple weights
4. **Maintain letter-spacing** - Always use the custom classes that include 0.02rem
5. **Respect the scale** - Don't create arbitrary sizes
6. **Combine with color tokens** - Use `text-tx-*` for semantic colors

## Font Weights

### Whyte
- 400 (Regular) - Default weight
- Italic variant available

### Whyte Inktrap
- 400 (Regular) - Default weight
- Italic variant available

### Fraktion Mono
- 300 (Light) - `font-light`
- 400 (Regular) - Default
- 700 (Bold) - `font-bold`
- All with italic variants

## Responsive Typography

Adjust sizes at breakpoints:

```tsx
<h1 className="text-xl-custom md:text-5xl font-display">
  Responsive Heading
</h1>

<p className="text-xs-custom md:text-sm-custom">
  Responsive body text
</p>
```

## Theme Considerations

The typography system works seamlessly with both themes:

- **Forest theme**: Warm, earthy backgrounds with consistent text colors
- **Opalite theme**: Cool, blue backgrounds with adjusted text contrast

Text opacity levels ensure proper readability in both themes.
