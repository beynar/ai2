# Svelai Theming Reference

## Table of Contents

- [Tailwind Plugin Setup](#tailwind-plugin-setup)
- [Theme Plugin Config](#theme-plugin-config)
- [Color Tokens](#color-tokens)
- [Color Variants](#color-variants)
- [Design Tokens](#design-tokens)
- [Main Plugin Config](#main-plugin-config)
- [Theme Svelte Component](#theme-svelte-component)
- [useTheme Hook](#usetheme-hook)
- [Dark / Light Mode](#dark--light-mode)
- [Component Theme Overrides](#component-theme-overrides)

---

## Tailwind Plugin Setup

Two plugins in CSS:

```css
/* Theme plugin - defines colors, tokens, color scheme */
@plugin './lib/tailwind/theme' { /* ... */ }

/* Main plugin - utility classes, spinner, raised borders */
@plugin './lib/tailwind/index' { /* ... */ }
```

## Theme Plugin Config

Full example with all keys:

```css
@plugin './lib/tailwind/theme' {
  name: custom;           /* string - used for data-theme attribute */
  default: true;          /* boolean - default theme for <html> */
  colorscheme: light;     /* 'light' | 'dark' */
  prefersDark: false;     /* boolean - auto-switch on prefers-color-scheme: dark */

  luminance: 5;           /* -100..100 - brightness adjustment */
  saturation: 10;         /* -100..100 - saturation adjustment */

  primary: #6366f1;       /* hex or Tailwind color name */
  secondary: #8b5cf6;
  danger: #ef4444;
  success: #22c55e;
  warning: #f59e0b;
  info: #3b82f6;
  surface: #FAFAFA;       /* hex only */
  contrast: #121212;      /* hex only */

  primary-light: #a5b4fc; /* override auto-generated variants */
  primary-dark: #4338ca;

  radius: normal;         /* preset or number (rem) */
  spacing: large;         /* preset or number (rem) */
  scale: majorThird;      /* typography scale */
  raised-with-border: true;
}
```

## Color Tokens

| Token       | Default (light)   | Default (dark)    | Accepts            |
|-------------|-------------------|-------------------|--------------------|
| `primary`   | `#6366f1`         | `#818cf8`         | hex, TW color name |
| `secondary` | `#6366f1`         | `#818cf8`         | hex, TW color name |
| `danger`    | `#ff0000`         | `#ff0000`         | hex, TW color name |
| `success`   | `#0070f3`         | `#0070f3`         | hex, TW color name |
| `warning`   | `#f5a623`         | `#f5a623`         | hex, TW color name |
| `info`      | `#50e3c2`         | `#50e3c2`         | hex, TW color name |
| `surface`   | `#FAFAFA`         | `#121212`         | hex only           |
| `contrast`  | `#121212`         | `#FAFAFA`         | hex only           |

## Color Variants

Each base color generates five variants (all overridable with `{color}-{variant}: #hex`):

| Suffix      | Generation Rule                       |
|-------------|---------------------------------------|
| `-light`    | +15% lightness                        |
| `-lighter`  | +25% lightness                        |
| `-dark`     | -15% lightness                        |
| `-muted`    | mixed with surface color              |
| `-fg`       | auto black/white for contrast on bg   |

Usage: `primary-light`, `danger-fg`, `surface-muted`, etc.

## Design Tokens

### `radius`

| Preset    | Value     |
|-----------|-----------|
| `none`    | 0         |
| `subtile` | 0.09rem   |
| `small`   | 0.125rem  |
| `normal`  | 0.25rem   |
| `large`   | 0.5rem    |
| `round`   | 1rem      |

Also accepts a raw number (rem).

### `spacing`

| Preset   | Value    |
|----------|----------|
| `small`  | 0.2rem   |
| `normal` | 0.25rem  |
| `large`  | 0.3rem   |

### `scale` (typography)

| Preset            | Ratio |
|-------------------|-------|
| `minorSecond`     | 1.067 |
| `majorSecond`     | 1.125 |
| `minorThird`      | 1.2   |
| `majorThird`      | 1.25  |
| `perfectFourth`   | 1.333 |
| `augmentedFourth` | 1.414 |

## Main Plugin Config

```css
@plugin './lib/tailwind/index' {
  raised-with-border: true;  /* borders on raised elements in light mode */
}
```

Also provides `.ui-spinner` utility class.

## Theme Svelte Component

Wrap your app once in `+layout.svelte`:

```svelte
<script>
  import { Theme } from 'svelai/theme';
</script>

<Theme colorScheme="auto">
  {@render children()}
</Theme>
```

**Props:**
- `colorScheme`: `'light'` | `'dark'` | `'auto'` (default `'auto'`)
- `children`: Snippet
- `class`: string

## useTheme Hook

```svelte
<script>
  import { useTheme } from 'svelai/theme';
  const theme = useTheme();
</script>
```

**Methods:**
- `theme.showTooltip({ ref, content, position?, size?, color?, offset?, class?, transition? })`
- `theme.hideTooltip()`
- `theme.setComponentTheme(componentName, themeObj)`
- `theme.getComponentTheme(componentName)`

**Reactive state:** `theme.tooltip`

## Dark / Light Mode

```svelte
<!-- Auto-detect system preference -->
<Theme colorScheme="auto">{@render children()}</Theme>

<!-- Force light -->
<Theme colorScheme="light">{@render children()}</Theme>

<!-- Force dark -->
<Theme colorScheme="dark">{@render children()}</Theme>
```

Toggle at runtime:

```svelte
<script>
  let colorScheme = $state('light');
</script>
<Theme {colorScheme}>
  <Button onclick={() => colorScheme = colorScheme === 'light' ? 'dark' : 'light'}>
    Toggle
  </Button>
  {@render children()}
</Theme>
```

CSS-level: set `prefersDark: true` in a second theme plugin block with `colorscheme: dark`.

Preference is persisted in `localStorage`.

## Component Theme Overrides

**Global** (affects all instances):

```svelte
<script>
  import { setButtonTheme } from 'svelai/button';
  import { setDialogTheme } from 'svelai/dialog';

  setButtonTheme({
    button: {
      base: 'custom-button-class',
      variants: { color: { custom: 'bg-purple-500 text-white' } }
    }
  });
</script>
```

**Per-instance** (via `theme` prop):

```svelte
<Button theme={{ button: { base: 'rounded-lg' } }} color="custom">
  Themed
</Button>
```

Global themes cascade; per-instance overrides take precedence.
