# SvelAI Design System

A comprehensive Svelte component library with a powerful Tailwind CSS theming system.

## Installation

```bash
npm install svelai
# or
pnpm add svelai
# or
yarn add svelai
```

## Tailwind CSS Configuration

SvelAI uses the modern Tailwind CSS configuration format with `@plugin` directives in your CSS files.

### 1. Base Plugin Setup

In your `tailwind.config.js`:

```js
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svelai/**/*.{html,js,svelte,ts}']
};
```

### 2. Plugin Configuration

In your `app.css` (or main CSS file):

```css
@import 'tailwindcss';

/* Source SvelAI components */
@source "../node_modules/svelai/**/*";

/* Base plugin for utilities */
@plugin "svelai/tailwind" {
	raised-with-border: true;
}

/* Theme configuration */
@plugin "svelai/tailwind-theme" {
	name: 'light';
	default: true;
	colorscheme: 'light';
	radius: normal;
	spacing: large;
	/* Custom colors */
	primary: '#6366f1';
	secondary: '#6366f1';
	/* ... other theme options */
}
```

## Plugin Overview

SvelAI provides two distinct Tailwind plugins that work together to create a comprehensive design system:

### `@plugin "svelai/tailwind"`

**Purpose**: Core utilities and base functionality
**What it provides**:

- Custom color utilities (`text-color-*`, `bg-color-*`, `border-color-*`)
- Raised element utilities (`raised-*`)
- Window-based sizing utilities (`h-window`, `w-window`)
- Data attribute styling for theme switching
- Color opacity modifiers
- Base CSS variables and utility classes

**Configuration options**:

- Layout and interaction behavior
- Global styling preferences
- Utility customization

### `@plugin "svelai/tailwind-theme"`

**Purpose**: Theme definition and color palette generation
**What it provides**:

- CSS custom properties for all semantic colors
- Automatic color variant generation (light, dark, muted, etc.)
- Color scheme management
- Theme-specific styling
- Typography scale configuration
- Spacing and radius definitions

**Configuration options**:

- Complete theme definition including colors, spacing, typography
- Multiple theme support
- Color scheme settings

## Complete Configuration Reference

### Base Plugin Tokens (`@plugin "svelai/tailwind"`)

| Token                | Type      | Default | Description                                  |
| -------------------- | --------- | ------- | -------------------------------------------- |
| `raised-with-border` | `boolean` | `false` | Add borders to raised elements in light mode |

### Theme Plugin Tokens (`@plugin "svelai/tailwind-theme"`)

#### Core Theme Settings

| Token         | Type                | Default     | Description                             |
| ------------- | ------------------- | ----------- | --------------------------------------- |
| `name`        | `string`            | `undefined` | Unique identifier for the theme         |
| `default`     | `boolean`           | `false`     | Whether this is the default theme       |
| `colorscheme` | `'light' \| 'dark'` | `'light'`   | Base color scheme for the theme         |
| `prefersdark` | `boolean`           | `false`     | Apply theme when user prefers dark mode |

#### Semantic Colors

| Token       | Type     | Default (Light) | Default (Dark) | Description                   |
| ----------- | -------- | --------------- | -------------- | ----------------------------- |
| `primary`   | `string` | `#6366f1`       | `#6366f1`      | Primary brand color           |
| `secondary` | `string` | `#6366f1`       | `#6366f1`      | Secondary brand color         |
| `danger`    | `string` | `#ff0000`       | `#ff0000`      | Error and destructive actions |
| `success`   | `string` | `#0070f3`       | `#0070f3`      | Success states                |
| `warning`   | `string` | `#f5a623`       | `#f5a623`      | Warning states                |
| `info`      | `string` | `#50e3c2`       | `#50e3c2`      | Informational content         |
| `surface`   | `string` | `#fafafa`       | `#242524`      | Background surfaces           |
| `contrast`  | `string` | `#242524`       | `#fafafa`      | High contrast text            |

#### Color Variants (for each semantic color)

| Token Pattern     | Type     | Description                                   | Example           |
| ----------------- | -------- | --------------------------------------------- | ----------------- |
| `{color}-light`   | `string` | 15% lighter than base color                   | `primary-light`   |
| `{color}-lighter` | `string` | 25% lighter than base color                   | `primary-lighter` |
| `{color}-dark`    | `string` | 15% darker than base color                    | `primary-dark`    |
| `{color}-muted`   | `string` | 95% mixed with surface color                  | `primary-muted`   |
| `{color}-fg`      | `string` | Accessible foreground color (auto-calculated) | `primary-fg`      |

#### Layout & Spacing

| Token                         | Type                                                                         | Default     | Description                         |
| ----------------------------- | ---------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `radius`                      | `'normal' \| 'small' \| 'large' \| 'subtile' \| 'none' \| 'round' \| number` | `'normal'`  | Border radius for components        |
| `spacing`                     | `'normal' \| 'small' \| 'large' \| number`                                   | `'normal'`  | Base spacing unit                   |
| `radius-inert-elements`       | `number`                                                                     | `undefined` | Radius for non-interactive elements |
| `radius-interactive-elements` | `number`                                                                     | `undefined` | Radius for interactive elements     |
| `border-width`                | `number`                                                                     | `undefined` | Default border width in pixels      |
| `raised-with-border`          | `boolean`                                                                    | `false`     | Add borders to raised elements      |

#### Color Adjustments

| Token        | Type     | Default     | Description                                |
| ------------ | -------- | ----------- | ------------------------------------------ |
| `luminance`  | `number` | `undefined` | Global luminance adjustment (-100 to 100)  |
| `saturation` | `number` | `undefined` | Global saturation adjustment (-100 to 100) |

#### Typography (Future Support)

| Token   | Type        | Default     | Description                          |
| ------- | ----------- | ----------- | ------------------------------------ |
| `scale` | `TypeScale` | `undefined` | Fluid typography scale configuration |

### Value Types Reference

#### Radius Values

- `'normal'` → 0.25rem (4px)
- `'small'` → 0.125rem (2px)
- `'large'` → 0.5rem (8px)
- `'subtile'` → 0.09rem (~1.5px)
- `'none'` → 0rem (0px)
- `'round'` → 1rem (16px)
- `number` → Custom rem value

#### Spacing Values

- `'normal'` → 0.25rem (4px)
- `'small'` → 0.2rem (~3px)
- `'large'` → 0.3rem (~5px)
- `number` → Custom rem value

#### Color Values

- Hex colors: `#6366f1`, `#ff0000`
- Tailwind color names: `blue`, `red`, `emerald` (uses -500 shade)
- CSS color functions: `rgb(99, 102, 241)`, `hsl(239, 84%, 67%)`

#### Type Scale Values (Future)

- `'minorSecond'` (1.067)
- `'majorSecond'` (1.125)
- `'minorThird'` (1.2)
- `'majorThird'` (1.25)
- `'perfectFourth'` (1.32)
- `'augmentedFourth'` (1.414)
- `'perfectFifth'` (1.5)
- `'goldenRatio'` (1.618)

## Configuration Examples

### Custom Color Variants

You can override specific color variants:

```css
@plugin "svelai/tailwind-theme" {
	primary: '#6366f1';
	primary-light: '#8b8cf8';
	primary-lighter: '#a5a6fa';
	primary-dark: '#4f46e5';
	primary-muted: '#f1f1ff';
	primary-fg: '#ffffff';
}
```

### Using Tailwind Colors

You can reference any Tailwind color by name:

```css
@plugin "svelai/tailwind-theme" {
	primary: blue; /* Uses blue-500 as base */
	secondary: emerald;
	danger: red;
}
```

**Available Tailwind colors**: `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `black`

## Usage in Components

### CSS Classes

SvelAI extends Tailwind with semantic color utilities:

```html
<!-- Background colors -->
<div class="bg-color-primary">Primary background</div>
<div class="bg-color-primary-light">Light primary background</div>
<div class="bg-color-surface-muted">Muted surface</div>

<!-- Text colors -->
<p class="text-color-contrast">High contrast text</p>
<p class="text-color-primary-fg">Primary foreground</p>

<!-- Borders -->
<div class="border-color-primary">Primary border</div>

<!-- With opacity modifiers -->
<div class="bg-color-primary/50">50% opacity primary</div>
<div class="text-color-danger/75">75% opacity danger text</div>
```

### Raised Elements

Special utility for elevated surfaces:

```html
<!-- Standard shadow with light theme borders -->
<div class="raised-lg">Elevated card</div>

<!-- No shadow -->
<div class="raised-none">Flat element</div>

<!-- Custom shadows -->
<div class="raised-[0_4px_12px_rgba(0,0,0,0.1)]">Custom shadow</div>
```

### Window Utilities

Dynamic viewport-based sizing:

```html
<div class="h-window">Full window height</div>
<div class="w-window">Full window width</div>
```

## Multiple Themes

You can define multiple themes and switch between them in your `app.css`:

```css
/* Light theme (default) */
@plugin "svelai/tailwind-theme" {
	name: 'light';
	default: true;
	colorscheme: 'light';
	primary: '#6366f1';
}

/* Dark theme */
@plugin "svelai/tailwind-theme" {
	name: 'dark';
	colorscheme: 'dark';
	primary: '#8b5cf6';
	surface: '#1a1a1a';
}

/* Custom theme */
@plugin "svelai/tailwind-theme" {
	name: 'brand';
	primary: '#ff6b35';
	secondary: '#004e92';
}
```

Switch themes programmatically:

```js
// Set theme on html element
document.documentElement.setAttribute('data-theme', 'dark');
```

## Complete Example

**tailwind.config.js:**

```js
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svelai/**/*.{html,js,svelte,ts}']
};
```

**app.css:**

```css
@import 'tailwindcss';

/* Source SvelAI components */
@source "../node_modules/svelai/**/*";

/* Base plugin for utilities */
@plugin "svelai/tailwind" {
	raised-with-border: true;
}

/* Light theme */
@plugin "svelai/tailwind-theme" {
	name: 'light';
	default: true;
	colorscheme: 'light';
	primary: blue;
	secondary: emerald;
	danger: red;
	success: green;
	radius: normal;
	spacing: large;
	raised-with-border: true;
}

/* Dark theme */
@plugin "svelai/tailwind-theme" {
	name: 'dark';
	colorscheme: 'dark';
	prefersdark: true;
	primary: '#8b5cf6';
	surface: '#1a1a1a';
	contrast: '#ffffff';
	radius: large;
	spacing: normal;
}
```

This configuration provides a complete theming system with semantic colors, consistent spacing, and automatic dark mode support.
