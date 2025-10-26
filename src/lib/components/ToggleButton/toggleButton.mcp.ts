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
- **value**: any - Value when used in a group

### Visual Props
- **color**: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' (default: 'primary')
- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' (default: 'outline')
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
<ToggleButton variant="solid" bind:checked>Solid</ToggleButton>
<ToggleButton variant="outline" bind:checked>Outline</ToggleButton>
<ToggleButton variant="soft" bind:checked>Soft</ToggleButton>
<ToggleButton variant="ghost" bind:checked>Ghost</ToggleButton>
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

- Uses proper ARIA attributes
- Keyboard accessible (Space/Enter to toggle)
- Focus states for keyboard navigation
- Screen reader friendly

## Notes

- Maintains toggle state between interactions
- Visual feedback for checked/unchecked states
- Can be used standalone or in ToggleButtonGroup
- Supports all standard button features
`;
