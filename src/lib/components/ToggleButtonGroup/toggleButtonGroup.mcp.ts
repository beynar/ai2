export const toggleButtonGroupDescription = `
# ToggleButtonGroup Component

ToggleButtonGroup renders a keyed set of ToggleButton items and exposes a bindable checked map.

## Basic Usage

\`\`\`svelte
<script>
	let formatting = $state({ bold: true, italic: false, underline: false });
</script>

<ToggleButtonGroup
	bind:value={formatting}
	variant="soft"
	color="foreground"
	items={{
		bold: { children: 'Bold' },
		italic: { children: 'Italic' },
		underline: { children: 'Underline' }
	}}
/>
\`\`\`

## Props

- **items**: Record<string, ToggleButtonProps> (required) - Keyed toggle button configurations.
- **value**: Record<keyof items, boolean> (bindable) - Checked state for each item key.
- **onChange**: (value) => void - Called with the full checked map after a toggle.
- **size**: 'small' | 'normal' | 'large' - Applied to every item.
- **color**: Colors - Applied to every item.
- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' - Applied to every item.
- **disabled**: boolean - Disables every item.
- **joined**: boolean - Renders the items as joined segments.
- **class**: string - Additional CSS classes for the root.
- **theme**: ToggleButtonGroupThemeProps - Theme overrides.

## Examples

### Icon Toolbar

\`\`\`svelte
<ToggleButtonGroup
	bind:value={formatting}
	items={{
		bold: { prefix: textBIcon },
		italic: { prefix: textItalicIcon },
		underline: { prefix: textUnderlineIcon }
	}}
/>
\`\`\`

### Joined Segments

\`\`\`svelte
<ToggleButtonGroup
	joined
	variant="outline"
	color="foreground"
	items={{
		left: { prefix: textAlignLeftIcon },
		center: { prefix: textAlignCenterIcon },
		right: { prefix: textAlignRightIcon }
	}}
/>
\`\`\`

### Change Handler

\`\`\`svelte
<ToggleButtonGroup
	items={{
		compact: { children: 'Compact' },
		comfortable: { children: 'Comfortable' }
	}}
	onChange={(value) => {
		console.log(value);
	}}
/>
\`\`\`

## Theme

- **root**: Main button group container styles.

\`\`\`svelte
<ToggleButtonGroup
	items={items}
	theme={{
		root: {
			base: 'flex items-center gap-1'
		}
	}}
/>
\`\`\`
`;
