---
name: building-with-svelai
description: Builds UIs with the svelai component library for SvelteKit. Covers component usage, theming, Tailwind plugin configuration, form inputs, overlays, layout primitives, and theme customization. Use when the user asks to build UI with svelai components, customize themes, or work with svelai form inputs.
---

# svelai Component Library

A configuration-over-markup component library for SvelteKit. Components are styled via a global theme system backed by a Tailwind CSS plugin.

## Contents

- [Import Convention](#import-convention)
- [Common Props](#common-props)
- [Snippet Pattern](#snippet-pattern)
- [Theme System](#theme-system)
- [Color Tokens](#color-tokens)
- [Design Tokens](#design-tokens)
- [Component Theme Customization](#component-theme-customization)
- [Component References](#component-references)

## Import Convention

All components use kebab-case package paths with PascalCase component names:

```svelte
<script>
  import { Button } from 'svelai/button';
  import { TextInput } from 'svelai/text-input';
  import { Dialog } from 'svelai/dialog';
  import { Popover } from 'svelai/popover';
</script>
```

## Common Props

Most components share these prop patterns:

### Colors
`color`: `'primary'` | `'secondary'` | `'success'` | `'warning'` | `'danger'` | `'info'` | `'surface'` | `'contrast'`

### Sizes
`size`: `'small'` | `'normal'` | `'large'`

### Variants (interactive components)
`variant`: `'solid'` | `'outline'` | `'soft'` | `'ghost'` | `'link'`

### Common
- `class`: string - Additional CSS classes
- `theme`: ComponentTheme - Per-instance theme overrides
- `ref`: HTMLElement - Bind to underlying DOM element
- `disabled`: boolean

## Snippet Pattern

Most components accept `prefix` and `suffix` snippets for composable content:

```svelte
<Button>
  {#snippet prefix()}<Icon name="plus" />{/snippet}
  Add Item
</Button>
```

`Slot` utility (`import { Slot } from 'svelai/slot'`) renders strings, numbers, Snippets, or components uniformly: `<Slot render={dynamicContent} />`

## Theme System

Three layers: Tailwind plugin (colors/tokens), `<Theme>` component (wraps app), `useTheme()` (runtime access).

```css
/* Tailwind plugin - defines colors and design tokens */
@plugin './lib/tailwind/theme' {
  name: custom;
  default: true;
  colorscheme: light;
  primary: #6366f1;
  secondary: #8b5cf6;
  danger: #ef4444;
  success: #22c55e;
  warning: #f59e0b;
  info: #3b82f6;
  surface: #FAFAFA;
  contrast: #121212;
  radius: normal;
  spacing: large;
  scale: majorThird;
}
```

```svelte
<!-- +layout.svelte - wrap app once -->
<script>
  import { Theme } from 'svelai/theme';
</script>
<Theme colorScheme="auto">{@render children()}</Theme>
```

Dark theme via `prefersDark: true` or named theme with `colorscheme: dark`. See [theming.md](theming.md) for full details.

## Color Tokens

Each base color generates variants: `{color}-light` (+15%), `{color}-lighter` (+25%), `{color}-dark` (-15%), `{color}-muted` (mixed with surface), `{color}-fg` (auto contrast). All overridable in plugin config.

Usage: `bg-primary`, `text-primary-fg`, `border-danger-dark`, `bg-surface-muted`.

## Design Tokens

| Token | Values | Default |
|-------|--------|---------|
| `radius` | `none` \| `subtile` \| `small` \| `normal` \| `large` \| `round` \| number | `normal` |
| `spacing` | `small` \| `normal` \| `large` \| number | `normal` |
| `scale` | `minorSecond` \| `majorSecond` \| `minorThird` \| `majorThird` \| `perfectFourth` \| `augmentedFourth` | `majorThird` |
| `raised-with-border` | boolean | `false` |

## Component Theme Customization

Every component has a theme object with parts (e.g., `button`, `prefix`, `suffix`). Each part has `base` classes and variant maps.

### Per-instance override

```svelte
<Button theme={{ button: { base: 'rounded-full shadow-lg' } }}>
  Custom
</Button>
```

### Global override

```svelte
<script>
  import { setButtonTheme } from 'svelai/button';

  setButtonTheme({
    button: {
      variant: { solid: 'shadow-md hover:shadow-lg transition-shadow' }
    }
  });
</script>
```

Pattern: `import { set{Component}Theme } from 'svelai/{kebab-name}'`

## Component References

**Theming & Config**: See [theming.md](theming.md) for full Tailwind plugin config and Theme component details.

**Display**: See [display.md](display.md) for Button, ButtonGroup, Badge, Avatar, Chip, Heading, Code, Meter, ToggleButton, ToggleButtonGroup, Icons.

**Form Inputs**: See [form-inputs.md](form-inputs.md) for TextInput, TextArea, NumberInput, PasswordInput, PhoneInput, DateInput, TimeInput, Select, Combobox, Switch, RadioInput, CheckboxesInput, FileInput, Calendar, Form, MultiStepForm.

**Layout & Navigation**: See [layout.md](layout.md) for Tabs, Tabbar, Stepper, Breadcrumbs, Accordion, Collapsible, Separator, Menu, PopupMenu, MenuOption, Carousel, ScrollArea, AspectRatio, Marquee.

**Overlays & Feedback**: See [overlays.md](overlays.md) for Dialog, Popover, Tooltip, Toast, Confirmation, Alert, NetworkIndicator.

**Data & Utility**: See [data-utility.md](data-utility.md) for Table, Card, Skeleton, Slot.

## Quick Patterns

### Form with validation
```svelte
<script>
  import { Form } from 'svelai/form';
  import { Button } from 'svelai/button';
</script>

<Form inputs={{
  email: { type: 'email', label: 'Email', required: true, class: 'col-span-1' },
  password: { type: 'password', label: 'Password', required: true, class: 'col-span-1' }
}} onSubmit={handleSubmit}>
  {#snippet footer({ form })}
    <Button type="submit" disabled={!form.isValid}>Submit</Button>
  {/snippet}
</Form>
```

### Confirmation dialog
```typescript
import { confirmation } from 'svelai/confirmation';

const { confirmed, result } = await confirmation({
  title: 'Delete item?',
  description: 'This cannot be undone.',
  confirm: 'Delete',
  cancel: 'Cancel',
  onConfirm: async () => {
    await deleteItem();
  }
});
```

### Toast notifications
```typescript
import { toast } from 'svelai/toast';

toast.success({ title: 'Saved!' });
toast.danger({ title: 'Error', description: 'Something went wrong.' });

// Loading toast
const t = toast.info({ title: 'Uploading...', loading: true, duration: false });
await upload();
t.remove();
toast.success({ title: 'Done!' });
```
