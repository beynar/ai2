# Svelai Display Components Reference

## Table of Contents
- [Button](#button)
- [ButtonGroup](#buttongroup)
- [Badge](#badge)
- [Avatar / AvatarGroup](#avatar)
- [Chip](#chip)
- [Heading](#heading)
- [Code](#code)
- [Meter](#meter)
- [ToggleButton](#togglebutton)
- [ToggleButtonGroup](#togglebuttongroup)
- [Icons](#icons)

---

## Button
`import { Button } from 'svelai/button'`

### Unique Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| fullWidth | boolean | false | Takes full container width |
| squared | boolean | auto | Auto-detected when only prefix/suffix provided |
| loading | boolean | false | Shows loading state, disables interaction |
| href | string | - | Renders as `<a>` instead of `<button>` |
| target | string | - | Link target (with href) |
| rel | string | - | Link relationship (with href) |
| onClick | (payload?) => void | - | Click handler |
| onEnter | (payload?) => void | - | Pointer enter handler |
| onLeave | (payload?) => void | - | Pointer leave handler |
| payload | any | - | Data passed to event handlers |
| ref | HTMLElement | - | Element reference |

### Theme Parts
`button` (base, size, color, variant, loading, disabled, squared, fullWidth), `prefix` (base, size), `suffix` (base, size)

### Key Example
```svelte
<Button variant="outline" color="primary" loading={saving}>
  {#snippet prefix()}{@render saveIcon()}{/snippet}
  Save
</Button>
```

---

## ButtonGroup
`import { ButtonGroup } from 'svelai/button-group'`

### Unique Props
| Prop | Type | Notes |
|------|------|-------|
| buttons | Array\<ButtonProps\> | **Required.** Each item supports all Button props |

Shared props (size, color, variant, disabled) apply to all buttons. Individual button props override shared ones.

### Theme Parts
`buttonGroup` (base only -- handles border-radius/border connections)

### Key Example
```svelte
<ButtonGroup
  variant="outline" color="primary"
  buttons={[
    { children: 'Day', variant: selected === 'day' ? 'solid' : 'ghost', onClick: () => selected = 'day' },
    { children: 'Week', variant: selected === 'week' ? 'solid' : 'ghost', onClick: () => selected = 'week' }
  ]}
/>
```

---

## Badge
`import { Badge } from 'svelai/badge'`

Absolute-positioned indicator. **Parent must have `position: relative`.**

### Unique Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| position | 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' | 'topRight' | Position relative to parent |

Variants limited to: `solid`, `outline`, `soft`. Default color: `primary`. Default size: `small`.

### Theme Parts
`badge` (base, size, color, variant, position)

### Key Example
```svelte
<div class="relative inline-block">
  <Button>Notifications</Button>
  <Badge color="danger">3</Badge>
</div>
```

---

## Avatar
`import { Avatar, AvatarGroup } from 'svelai/avatar'`

### Avatar Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| user | { name: string; avatar?: string } & T | **Required** | Initials auto-extracted from name |
| delay | number | 0 | Delay before showing avatar (ms) |
| loadingState | 'waiting' \| 'loading' \| 'errored' \| 'success' | 'waiting' | Bindable |

prefix = bottom-left badge, suffix = bottom-right badge (both receive `{ name, avatar }` as snippet args).

### AvatarGroup Props
| Prop | Type | Notes |
|------|------|-------|
| users | Array\<{ name: string; avatar?: string } & T\> | **Required** |
| max | number | Show "+N" indicator after this count |
| avatar | Snippet\<{ user, index, avatarProps }\> | Custom avatar rendering |
| remainingCount | Snippet\<{ users, remaining }\> | Custom "+N" rendering |

### Theme Parts
`avatar` (base, size), `avatarImage` (base, size), `avatarPrefix` (base, size), `avatarSuffix` (base, size), `avatarInitials` (base, size)

### Key Example
```svelte
<AvatarGroup users={teamMembers} max={3} />

<Avatar user={{ name: 'Jane Doe', avatar: '/jane.jpg' }}>
  {#snippet suffix()}
    <div class="w-3 h-3 rounded-full bg-success border-2 border-surface"></div>
  {/snippet}
</Avatar>
```

---

## Chip
`import { Chip } from 'svelai/chip'`

Compact tag/label element. Renders as `<button>` (if onClick/onenter/onleave), `<a>` (if href), or `<div>`.

### Unique Props
| Prop | Type | Notes |
|------|------|-------|
| onClick | (event: MouseEvent) => void | Makes chip interactive |
| onenter | (event: PointerEvent) => void | Pointer enter |
| onleave | (event: PointerEvent) => void | Pointer leave |
| href | string | Renders as anchor |
| target | string | Link target |
| rel | string | Link relationship |

Variants limited to: `solid`, `outline`, `soft`. Default color: `primary`.

### Theme Parts
`chip` (base, size, color, variant), `prefix` (base, size), `suffix` (base, size)

### Key Example
```svelte
<Chip color="primary" variant="soft">
  {#snippet prefix()}{@render tagIcon()}{/snippet}
  Category
  {#snippet suffix()}
    <button onclick={() => remove(tag)}>{@render xIcon({ size: 12 })}</button>
  {/snippet}
</Chip>
```

---

## Heading
`import { Heading } from 'svelai/heading'`

### Unique Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| size | 'h1'-'h6' | 'h2' | Visual size + default HTML element |
| as | 'h1'-'h6' | - | Override HTML element (decouple visual from semantic) |
| weight | 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' | 'normal' | Font weight |
| align | 'left' \| 'center' \| 'right' | 'left' | Text alignment |
| underline | boolean | false | Adds underline decoration |
| muted | boolean | false | Reduced opacity |
| balanced | boolean | true | `text-wrap: balance` |
| trim | 'none' \| 'start' \| 'end' \| 'both' | 'both' | Vertical rhythm trimming |

No prefix/suffix slots. No color/variant props.

### Theme Parts
`heading` (base, size, weight, align, balanced, underline, muted)

### Key Example
```svelte
<Heading size="h1" as="h2" weight="bold" trim="both">Page Title</Heading>
<Heading size="h3" muted>Subtitle</Heading>
```

---

## Code
`import { Code } from 'svelai/code'`

### Unique Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| language | string | - | Language for syntax highlighting |
| inline | boolean | false | Inline `<code>` vs block `<pre><code>` |

No color/variant/size props.

### Theme Parts
`code` (base), `header` (base), `footer` (base), `container` (base), `pre` (base), `line` (base)

### Key Example
```svelte
<p>Use <Code inline>$state()</Code> for reactivity.</p>

<Code language="typescript">
  interface User { name: string; age: number; }
</Code>
```

---

## Meter
`import { Meter } from 'svelai/meter'`

Progress/measurement visualization with spring animations.

### Unique Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| value | Meter\<T\> \| Array\<Meter\<T\>\> | **Required** | `{ value, label?, color?, position?, data? }` |
| min | number | 0 | Minimum value |
| max | number | 100 | Maximum value |
| showIndicatorAs | 'value' \| 'percentage' | - | Indicator display format |
| steps | Array\<Step\> | - | `{ start, end?, label: Slot, color, position?, class?, labelClass?, data? }` |
| stiffness / damping / soft / precision | number | - | Spring animation params |

Slots: `label`, `description`, `helper`, `header`, `indicator` (receives `{ value, percentage, min, max }`)

### Theme Parts
`meter` (base, size), `header` (base, size), `container` (base, first, last), `label` (base, size), `helper` (base, size), `description` (base, size), `progress` (base, size), `track` (base, size, labelsPosition), `indicator` (base, size, position), `legend` (base, size), `legendItem` (base, size), `legendIcon` (base, size), `legendLabel` (base, size), `legendPercentage` (base, size)

### Key Example
```svelte
<Meter
  value={[
    { value: 45, color: 'primary', label: 'Used' },
    { value: 20, color: 'info', label: 'Cached' }
  ]}
  max={100}
  steps={[
    { start: 0, end: 50, label: 'Low', color: 'success' },
    { start: 50, end: 100, label: 'High', color: 'danger' }
  ]}
/>
```

---

## ToggleButton
`import { ToggleButton } from 'svelai/toggle-button'`

Two-state toggle button. Default variant: `outline`.

### Unique Props
| Prop | Type | Notes |
|------|------|-------|
| checked | boolean | **Bindable.** Toggle state |
| value | any | Value when used in a group |
| onChange | (checked: boolean) => void | State change callback |

Variants: `solid`, `outline`, `soft`, `ghost` (no `link`).

### Theme Parts
`button` (base, checked, disabled, color, variant, squared, size), `prefix` (base, size, checked), `suffix` (base, size, checked)

### Key Example
```svelte
<script>let isBold = $state(false);</script>
<ToggleButton bind:checked={isBold}>
  {#snippet prefix()}{@render boldIcon()}{/snippet}
  Bold
</ToggleButton>
```

---

## ToggleButtonGroup
`import { ToggleButtonGroup } from 'svelai/toggle-button-group'`

### Unique Props
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| buttons | Array\<ToggleButtonProps\> | **Required** | Each needs `value` and `children` |
| value | any \| Array\<any\> | - | **Bindable.** Selected value(s) |
| multiple | boolean | false | Allow multi-select (value becomes array) |
| onChange | (value) => void | - | Selection change callback |

### Theme Parts
`buttonGroup` (base only)

### Key Example
```svelte
<script>let formats = $state([]);</script>
<ToggleButtonGroup
  bind:value={formats}
  multiple
  buttons={[
    { value: 'bold', prefix: boldIcon.withProps({}) },
    { value: 'italic', prefix: italicIcon.withProps({}) }
  ]}
/>
```

---

## Icons
`import { iconNameIcon } from 'svelai/icons/iconName'`

1513 icons, each with 6 variants: `regular`, `bold`, `duotone`, `fill`, `light`, `thin`.

### Import Pattern
```ts
import { houseIcon, houseBoldIcon, houseFillIcon } from 'svelai/icons/house';
```

### IconProps
| Prop | Type | Default | Notes |
|------|------|---------|-------|
| size | number \| string | 1lh | Default matches line height |
| mirrored | boolean | false | Mirror horizontally |
| color | Colors \| string | inherit | Theme color or hex |

### Usage
```svelte
{@render houseIcon({ size: 24, color: 'primary' })}
```

### withProps (passing to components)
```svelte
<Button prefix={eyeClosedIcon.withProps({ color: 'danger' })}>Click me</Button>
```

This avoids verbose `{#snippet prefix()}...{/snippet}` markup. Icons inherit text color and default to `1lh` size, so props are often unnecessary.

---

## Global Theming Note
Each component exposes `set[Component]Theme()` from its import path (e.g., `setButtonTheme` from `'svelai/button'`).
