export const badgeDescription = `
# Badge Component

The Badge component is a small, positioned indicator element used to display notifications, counts, status indicators, or labels. It can be positioned relative to other elements and supports various colors, sizes, and variants.

## Basic Usage

\`\`\`svelte
<div class="relative">
	<Button>Messages</Button>
	<Badge>5</Badge>
</div>
\`\`\`

## Props

### Core Props
- **color**: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' (default: 'primary')
  - Determines the color scheme of the badge

- **variant**: 'solid' | 'outline' | 'soft' (default: 'solid')
  - solid: Filled background with color
  - outline: Transparent background with colored border
  - soft: Semi-transparent background with color text

- **size**: 'small' | 'normal' | 'large' (default: 'small')
  - small: 16px height, minimal padding
  - normal: 20px height, standard padding
  - large: 24px height, larger padding

### Position Props
- **position**: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' (default: 'topRight')
  - Determines where the badge is positioned relative to its container

### Content Props
- **children**: Snippet - Badge content (text, numbers, icons)

### Styling Props
- **class**: string - Additional CSS classes for the badge container
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Badge>
	<Children />    <!-- Badge content -->
</Badge>
\`\`\`

## Examples

### Notification Badge
\`\`\`svelte
<div class="relative inline-block">
	<Button variant="outline">
		{#snippet prefix()}
			<Icon name="bell" />
		{/snippet}
		Notifications
	</Button>
	<Badge color="danger">3</Badge>
</div>
\`\`\`

### Status Indicators
\`\`\`svelte
<div class="relative">
	<Avatar src="/user.jpg" />
	<Badge color="success" variant="solid">•</Badge>
</div>

<div class="relative">
	<Avatar src="/user2.jpg" />
	<Badge color="warning" variant="soft">Away</Badge>
</div>
\`\`\`

### Different Positions
\`\`\`svelte
<div class="grid grid-cols-2 gap-4">
	<!-- Top Right (default) -->
	<div class="relative">
		<Button>Top Right</Button>
		<Badge position="topRight">TR</Badge>
	</div>
	
	<!-- Top Left -->
	<div class="relative">
		<Button>Top Left</Button>
		<Badge position="topLeft">TL</Badge>
	</div>
	
	<!-- Bottom Right -->
	<div class="relative">
		<Button>Bottom Right</Button>
		<Badge position="bottomRight">BR</Badge>
	</div>
	
	<!-- Bottom Left -->
	<div class="relative">
		<Button>Bottom Left</Button>
		<Badge position="bottomLeft">BL</Badge>
	</div>
</div>
\`\`\`

### Different Variants
\`\`\`svelte
<div class="flex gap-4">
	<div class="relative">
		<Button>Solid</Button>
		<Badge variant="solid" color="primary">99+</Badge>
	</div>
	
	<div class="relative">
		<Button>Outline</Button>
		<Badge variant="outline" color="danger">!</Badge>
	</div>
	
	<div class="relative">
		<Button>Soft</Button>
		<Badge variant="soft" color="success">✓</Badge>
	</div>
</div>
\`\`\`

## Positioning

The Badge component uses absolute positioning and requires its parent to have \`position: relative\`:

\`\`\`svelte
<!-- ✅ Correct - parent has relative positioning -->
<div class="relative">
	<Button>Content</Button>
	<Badge>1</Badge>
</div>

<!-- ❌ Incorrect - badge will position relative to document -->
<div>
	<Button>Content</Button>
	<Badge>1</Badge>
</div>
\`\`\`

## Accessibility

- Use semantic content that screen readers can understand
- For purely decorative badges, consider adding \`aria-hidden="true"\`
- For notification counts, consider adding appropriate ARIA labels
- Ensure sufficient color contrast for readability

## Notes

- Badge uses absolute positioning with negative margins for proper overlap
- Content automatically determines minimum width (circular for single characters)
- Numbers are commonly used but any content (text, icons) is supported
- Consider using appropriate colors for semantic meaning (danger for errors, success for completed states)
`;
