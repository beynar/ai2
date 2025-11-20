# shadcn/ui to Svelai Token Conversion Guide

This guide helps you convert shadcn/ui design tokens (classNames) to the Svelai token system (contrast, surface, primary, etc.).

## Overview

### shadcn/ui System
- Uses Tailwind classes like `bg-background`, `text-foreground`, `text-muted-foreground`
- Format: `{property}-{token}` or `{token}-{property}`

### Svelai System
- Uses semantic colors: `primary`, `secondary`, `contrast`, `surface`, `danger`, `success`, `warning`, `info`
- Variants: `light`, `lighter`, `dark`, `muted`, `fg`
- Tailwind classes: `bg-primary`, `text-contrast`, `text-surface-muted`
- **Default color**: All Svelai components that receive a `color` prop default to `primary` if not specified

---

## Main Conversion Table

### Background and Text Colors

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-background` | `bg-surface-dark` | Main application background (darker for visual hierarchy) |
| `text-foreground` | `text-contrast` | Main text color |

### Primary Colors

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-primary` | `bg-primary` | Same |
| `text-primary` | `text-primary` | Same |
| `text-primary-foreground` | `text-primary-fg` | Text on primary background |

### Secondary Colors

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-secondary` | `bg-secondary` | Same |
| `text-secondary` | `text-secondary` | Same |
| `text-secondary-foreground` | `text-secondary-fg` | Text on secondary background |

### Muted Colors

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-muted` | `bg-surface-muted` | Muted background |
| `text-muted` | `text-contrast-muted` | Muted text |
| `text-muted-foreground` | `text-contrast-muted` | Muted text (same as above) |

**Note**: In Svelai, muted colors work differently than shadcn:
- **Semantic muted variants**: Svelai supports semantic muted colors like `primary-muted`, `danger-muted`, `success-muted`, `warning-muted`, `info-muted`, `secondary-muted`
- **Perfect color pairing**: A muted background color pairs perfectly with its semantic text color. For example:
  - `bg-danger-muted` works great with `text-danger`
  - `bg-primary-muted` works great with `text-primary`
  - `bg-success-muted` works great with `text-success`
- **General muted**: For general muted backgrounds/text without semantic meaning, use `surface-muted` for backgrounds and `contrast-muted` for text

### Accent Colors

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-accent` | `bg-secondary` | Accent background |
| `text-accent` | `text-secondary` | Accent text |
| `text-accent-foreground` | `text-secondary-fg` | Text on accent background |

### Destructive Colors

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-destructive` | `bg-danger` | Destructive actions |
| `text-destructive` | `text-danger` | Destructive text |
| `text-destructive-foreground` | `text-danger-fg` | Text on destructive background |

### Card and Popover

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-card` | `bg-surface` | Card background (lighter than main background for visual hierarchy) |
| `text-card` | `text-contrast` | Card text |
| `text-card-foreground` | `text-contrast` | Text on card |
| `bg-popover` | `bg-surface` | Popover background |
| `text-popover-foreground` | `text-contrast` | Text on popover |

### Borders and Inputs

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `border-border` | `border-surface-muted` | Standard border |
| `bg-input` | `bg-surface-light` | Input background |
| `border-input` | `border-surface-muted` | Input border |

### Focus and Ring

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `ring-ring` | `ring-primary` | Focus ring |
| `focus:ring-ring` | `focus:ring-primary` | Focus ring on focus |

### Border Radius

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `rounded-md` | `rounded-normal` or `rounded-large` | Medium radius (adjust based on your theme config) |
| `rounded-sm` | `rounded-small` | Small radius |
| `rounded-lg` | `rounded-large` | Large radius |

### Sidebar Classes (if applicable)

| shadcn/ui ClassName | Svelai ClassName | Notes |
|---------------------|------------------|-------|
| `bg-sidebar` | `bg-surface` or `bg-surface-dark` | Sidebar background |
| `text-sidebar-foreground` | `text-contrast` | Sidebar text |
| `bg-sidebar-primary` | `bg-primary` | Primary elements in sidebar |
| `bg-sidebar-accent` | `bg-secondary` | Accent elements in sidebar |
| `border-sidebar-border` | `border-surface-muted` | Sidebar border |

---

## Conversion Examples

### Example 1: Muted text

**shadcn/ui:**
```html
<p class="text-muted-foreground">Secondary text</p>
```

**Svelai:**
```html
<p class="text-contrast-muted">Secondary text</p>
```

### Example 2: Primary button

**shadcn/ui:**
```html
<button class="bg-primary text-primary-foreground">
  Click me
</button>
```

**Svelai:**
```html
<button class="bg-primary text-primary-fg">
  Click me
</button>
```

### Example 3: Card component

**shadcn/ui:**
```html
<div class="bg-card text-card-foreground border border-border rounded-md">
  Card content
</div>
```

**Svelai:**
```html
<div class="bg-surface text-contrast border border-surface-muted rounded-normal">
  Card content
</div>
```

### Example 4: Input with focus

**shadcn/ui:**
```html
<input class="bg-input border border-input focus:ring-ring rounded-md" />
```

**Svelai:**
```html
<input class="bg-surface-light border border-surface-muted focus:ring-primary rounded-normal" />
```

### Example 5: Destructive button

**shadcn/ui:**
```html
<button class="bg-destructive text-destructive-foreground">
  Delete
</button>
```

**Svelai:**
```html
<button class="bg-danger text-danger-fg">
  Delete
</button>
```

### Example 6: Muted background section

**shadcn/ui:**
```html
<section class="bg-muted text-muted-foreground">
  Muted section
</section>
```

**Svelai:**
```html
<section class="bg-surface-muted text-contrast-muted">
  Muted section
</section>
```

### Example 7: Accent hover state

**shadcn/ui:**
```html
<button class="bg-accent text-accent-foreground hover:bg-accent/90">
  Accent button
</button>
```

**Svelai:**
```html
<button class="bg-secondary text-secondary-fg hover:bg-secondary-dark">
  Accent button
</button>
```

### Example 8: Semantic muted color pairing

**shadcn/ui:**
```html
<div class="bg-muted text-muted-foreground">
  Warning message
</div>
```

**Svelai:**
```html
<!-- Semantic muted background pairs perfectly with semantic text -->
<div class="bg-danger-muted text-danger">
  Warning message
</div>

<!-- Or for general muted without semantic meaning -->
<div class="bg-surface-muted text-contrast-muted">
  General muted section
</div>
```

---

## Available Variants in Svelai

Each color in Svelai can have the following variants:

| Variant | ClassName Example | Description |
|---------|-------------------|-------------|
| `DEFAULT` | `bg-primary`, `text-primary` | Base color |
| `light` | `bg-primary-light` | 15% lighter |
| `lighter` | `bg-primary-lighter` | 25% lighter |
| `dark` | `bg-primary-dark` | 15% darker |
| `muted` | `bg-primary-muted`, `text-contrast-muted` | Mixed with surface (95%) |
| `fg` | `text-primary-fg` | Accessible text color (on colored background) |

### Variant Mapping from shadcn

| shadcn Concept | Svelai Variant | Example |
|----------------|----------------|---------|
| Base color | `DEFAULT` | `bg-primary` |
| Lighter color | `light` or `lighter` | `bg-primary-light` |
| Darker color | `dark` | `bg-primary-dark` |
| Muted color | `muted` | `bg-surface-muted` |
| Text on color | `fg` | `text-primary-fg` |

---

## Quick Decision Guide

### For Backgrounds
- Main background → `bg-surface-dark` (darker for visual hierarchy)
- Surface (cards, popovers) → `bg-surface` (lighter than main background)
- Muted background → `bg-surface-muted`
- Primary background → `bg-primary`
- Secondary background → `bg-secondary`
- Destructive background → `bg-danger`
- Accent background → `bg-secondary`

### For Text
- Main text → `text-contrast`
- Muted text → `text-contrast-muted`
- Text on primary → `text-primary-fg`
- Text on secondary → `text-secondary-fg`
- Text on danger → `text-danger-fg`
- Primary colored text → `text-primary`
- Secondary colored text → `text-secondary`
- Danger colored text → `text-danger`

### For Borders
- Standard border → `border-surface-muted`
- Input border → `border-surface-muted`
- Card border → `border-surface-muted`

### For Focus/Ring
- Focus ring → `ring-primary`
- Focus ring on focus → `focus:ring-primary`

### For Radius
- Small radius → `rounded-small`
- Normal radius → `rounded-normal`
- Large radius → `rounded-large`

---

## Important Notes

1. **Contextual colors**: Some shadcn tokens like `muted` can have different meanings depending on context. Use your judgment to choose between `surface-muted` and `contrast-muted`.

2. **Missing variants**: If shadcn uses a variant you don't have directly, use the closest variant:
   - `primary-light` can replace a lighter `primary`
   - `surface-muted` can replace a general `muted`

3. **Additional semantic colors**: Svelai offers `success`, `warning`, and `info` that don't exist directly in shadcn. Use them to enrich your palette.

4. **Border radius**: Radius values in Svelai are defined via theme (`normal`, `small`, `large`, etc.). Adapt shadcn's `rounded-*` values according to your configuration.

5. **Dark mode**: Svelai tokens automatically adapt to dark mode via the theme system. No separate `.dark` classes needed.

---

## Common Patterns

### Button Patterns

| Pattern | shadcn/ui | Svelai |
|---------|-----------|--------|
| Primary button | `bg-primary text-primary-foreground` | `bg-primary text-primary-fg` |
| Secondary button | `bg-secondary text-secondary-foreground` | `bg-secondary text-secondary-fg` |
| Destructive button | `bg-destructive text-destructive-foreground` | `bg-danger text-danger-fg` |
| Outline button | `border border-border bg-background` | `border border-surface-muted bg-surface-dark` |
| Ghost button | `hover:bg-muted` | `hover:bg-surface-muted` |

### Card Patterns

| Pattern | shadcn/ui | Svelai |
|---------|-----------|--------|
| Basic card | `bg-card text-card-foreground border border-border` | `bg-surface text-contrast border border-surface-muted` |
| Elevated card | `bg-card shadow-lg` | `bg-surface-light shadow-lg` |

### Input Patterns

| Pattern | shadcn/ui | Svelai |
|---------|-----------|--------|
| Basic input | `bg-input border border-input` | `bg-surface-light border border-surface-muted` |
| Focused input | `bg-input border border-input focus:ring-ring` | `bg-surface-light border border-surface-muted focus:ring-primary` |


