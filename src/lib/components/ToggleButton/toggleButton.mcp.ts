export const toggleButtonDescription = `
# ToggleButton Component

The ToggleButton component is a two-state button that can be toggled on and off, useful for binary settings and selections.

## Basic Usage

\`\`\`svelte
<script>
	let isActive = $state(false);
</script>

<ToggleButton bind:checked={isActive}>
	Toggle Me
</ToggleButton>
\`\`\`

## Props

### Core Props
- **checked**: boolean (bindable) - Toggle state
- **ariaLabel**: string - Accessible name for icon-only buttons
- **type**: 'button' | 'submit' | 'reset' (default: 'button') - Native button type. The default prevents accidental form submission.

### Visual Props
- **color**: 'primary' | 'secondary' | 'foreground' | 'background' | 'danger' | 'success' | 'warning' | 'info' (default: 'foreground')
- **variant**: 'outline' | 'ghost' (default: 'ghost')
- **size**: 'small' | 'normal' | 'large' (default: 'normal')

### State Props
- **disabled**: boolean (default: false) - Disables interaction

### Event Props
- **onChange**: (checked: boolean) => void - Called when toggle state changes

### Content Slots
- **children**: Snippet - Button content
- **prefix**: Snippet - Content before text (typically icons)
- **suffix**: Snippet - Content after text (typically icons)

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Examples

### Basic Toggle
\`\`\`svelte
<script>
	let checked = $state(false);
</script>

<ToggleButton bind:checked>
	{checked ? 'On' : 'Off'}
</ToggleButton>
\`\`\`

### With Icon
\`\`\`svelte
<script>
	let isBold = $state(false);
</script>

<ToggleButton bind:checked={isBold}>
	{#snippet prefix()}
		<Icon name="bold" />
	{/snippet}
	Bold
</ToggleButton>
\`\`\`

### Different Variants
\`\`\`svelte
<ToggleButton variant="ghost" bind:checked>Ghost</ToggleButton>
<ToggleButton variant="outline" bind:checked>Outline</ToggleButton>
\`\`\`

### Different Colors
\`\`\`svelte
<ToggleButton color="primary" bind:checked>Primary</ToggleButton>
<ToggleButton color="danger" bind:checked>Danger</ToggleButton>
<ToggleButton color="success" bind:checked>Success</ToggleButton>
\`\`\`

### Toolbar Buttons
\`\`\`svelte
<script>
	let format = $state({ bold: false, italic: false, underline: false });
</script>

<div class="flex gap-1">
	<ToggleButton bind:checked={format.bold}>
		{#snippet prefix()}
			<Icon name="bold" />
		{/snippet}
	</ToggleButton>
	<ToggleButton bind:checked={format.italic}>
		{#snippet prefix()}
			<Icon name="italic" />
		{/snippet}
	</ToggleButton>
	<ToggleButton bind:checked={format.underline}>
		{#snippet prefix()}
			<Icon name="underline" />
		{/snippet}
	</ToggleButton>
</div>
\`\`\`

### With Change Handler
\`\`\`svelte
<script>
	function handleChange(checked) {
		console.log('Toggled:', checked);
	}
</script>

<ToggleButton onChange={handleChange}>
	Notify Me
</ToggleButton>
\`\`\`

### Disabled State
\`\`\`svelte
<ToggleButton disabled checked>Disabled On</ToggleButton>
<ToggleButton disabled>Disabled Off</ToggleButton>
\`\`\`

## Accessibility

- Exposes the checked state through \`aria-pressed\`
- Renders \`type="button"\` unless explicitly overridden
- Keyboard accessible (Space/Enter to toggle)
- Focus states for keyboard navigation
- Screen reader friendly

## Notes

- Maintains toggle state between interactions
- Visual feedback for checked/unchecked states
- Can be used standalone or in ToggleButtonGroup
- Supports all standard button features

## Theme Customization

The ToggleButton component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **root**: Main button element styles
- **prefix**: Prefix icon/content styles
- **suffix**: Suffix icon/content styles

### Available Variants

**root**:
- base: Base classes for button element
- Variants:
  - checked: boolean - Checked/toggled state styling
  - disabled: boolean - Disabled state styling
  - color: Color variants
  - variant: 'outline' | 'ghost' - Button variant
  - squared: boolean - Square button styling
  - size: 'small' | 'normal' | 'large' - Button size

**prefix**:
- base: Base classes for prefix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size
  - checked: boolean - Checked state styling

**suffix**:
- base: Base classes for suffix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size
  - checked: boolean - Checked state styling

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<ToggleButton 
  bind:checked
  theme={{
    root: {
      base: 'rounded-md transition-all',
      checked: {
        true: 'bg-primary text-white',
        false: 'bg-gray-200'
      },
      size: {
        normal: 'px-4 py-2'
      }
    }
  }}
>
  Toggle
</ToggleButton>
\`\`\`

**Custom Checked State**:
\`\`\`svelte
<ToggleButton 
  bind:checked
  variant="outline"
  theme={{
    root: {
      variant: {
        outline: 'border-2'
      },
      checked: {
        true: 'border-primary bg-primary/10 text-primary',
        false: 'border-gray-300'
      }
    },
    prefix: {
      checked: {
        true: 'text-primary'
      }
    }
  }}
>
  {#snippet prefix()}
    <Icon name="check" />
  {/snippet}
  Toggle
</ToggleButton>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setToggleButtonTheme } from 'svelai/toggle-button';
  
  setToggleButtonTheme({
    root: {
      base: 'transition-all duration-100',
      checked: {
        true: 'bg-primary text-white',
        false: 'bg-gray-200'
      },
      size: {
        normal: 'px-4 py-2 h-8'
      }
    },
    prefix: {
      size: {
        normal: 'max-w-6 max-h-6'
      }
    }
  });
</script>
\`\`\`
`;
