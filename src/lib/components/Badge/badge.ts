import { cva } from '../../utils/cva.js';
import type { Sizes, Colors } from '$lib/types/theme.js';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type BadgeProps = WithAttachments<{
	color?: Colors;
	position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
	size?: Sizes;
	variant?: 'soft' | 'solid' | 'outline';
	/**
	 * The class name of the badge. First element that the component outputs in the DOM.
	 */
	class?: string;
	children?: Slot;
	theme?: InferComponentTheme<typeof badgeTheme>;
}>;

const defaultBadge = cva({
	base: 'rounded-full flex items-center justify-center bg-color text-color-fg absolute z-10',
	variants: {
		size: {
			small: 'px-1 text-sm h-4 min-w-4',
			normal: 'px-1.5 text-base h-5 min-w-5',
			large: 'px-2 text-md h-6 min-w-6'
		},
		color: {
			primary: 'bg-primary text-primary-fg',
			secondary: 'bg-secondary text-secondary-fg',
			contrast: 'bg-contrast text-contrast-fg',
			surface: 'bg-surface-muted text-color-fg',
			danger: 'bg-danger text-danger-fg',
			success: 'bg-success text-success-fg',
			warning: 'bg-warning text-warning-fg',
			info: 'bg-info text-info-fg'
		},
		variant: {
			solid: 'text-color-fg',
			outline: 'bg-opacity-0 text-color border-color border',
			soft: 'bg-color/20 text-color'
		},
		position: {
			topRight: '-top-2 -right-2',
			topLeft: '-top-2 -left-2',
			bottomRight: '-bottom-2 -right-2',
			bottomLeft: '-bottom-2 -left-2'
		}
	},
	defaultVariants: {
		color: 'primary',
		variant: 'solid',
		size: 'small',
		position: 'topRight'
	},
	compoundVariants: [
		{
			color: 'surface',
			variant: 'outline',
			class: 'border-surface-muted text-contrast'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg'
		}
	]
});

export const badgeStructure = `
<Badge>
	<Children />
</Badge>
`;

export const badgeTheme = {
	badge: defaultBadge
};

export const agent = `
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

### Different Sizes
\`\`\`svelte
<div class="flex gap-4">
	<div class="relative">
		<Button size="small">Small</Button>
		<Badge size="small">1</Badge>
	</div>
	
	<div class="relative">
		<Button size="normal">Normal</Button>
		<Badge size="normal">12</Badge>
	</div>
	
	<div class="relative">
		<Button size="large">Large</Button>
		<Badge size="large">123</Badge>
	</div>
</div>
\`\`\`

### Color Variations
\`\`\`svelte
<div class="flex flex-wrap gap-4">
	<div class="relative">
		<Button>Primary</Button>
		<Badge color="primary">P</Badge>
	</div>
	
	<div class="relative">
		<Button>Secondary</Button>
		<Badge color="secondary">S</Badge>
	</div>
	
	<div class="relative">
		<Button>Danger</Button>
		<Badge color="danger">!</Badge>
	</div>
	
	<div class="relative">
		<Button>Success</Button>
		<Badge color="success">✓</Badge>
	</div>
	
	<div class="relative">
		<Button>Warning</Button>
		<Badge color="warning">⚠</Badge>
	</div>
	
	<div class="relative">
		<Button>Info</Button>
		<Badge color="info">i</Badge>
	</div>
</div>
\`\`\`

### Conditional Badge
\`\`\`svelte
<script>
	let notificationCount = $state(0);
</script>

<div class="relative">
	<Button>Messages</Button>
	{#if notificationCount > 0}
		<Badge color="danger">
			{notificationCount > 99 ? '99+' : notificationCount}
		</Badge>
	{/if}
</div>
\`\`\`

### Badge with Icons
\`\`\`svelte
<div class="relative">
	<Button variant="outline">
		Profile
	</Button>
	<Badge color="info" size="normal">
		{#snippet children()}
			<Icon name="star" size={12} />
		{/snippet}
	</Badge>
</div>
\`\`\`

### Custom Styling
\`\`\`svelte
<div class="relative">
	<Button>Custom</Button>
	<Badge 
		class="animate-pulse shadow-lg" 
		color="danger" 
		variant="solid"
	>
		New
	</Badge>
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

## Data Attributes

The badge automatically adds data attributes for styling:
- \`data-badge\`: Present on all badges
- \`data-position\`: Current position value
- \`data-color\`: Current color value
- \`data-size\`: Current size value
- \`data-variant\`: Current variant value

## Accessibility

- Use semantic content that screen readers can understand
- For purely decorative badges, consider adding \`aria-hidden="true"\`
- For notification counts, consider adding appropriate ARIA labels
- Ensure sufficient color contrast for readability

## Common Patterns

### Shopping Cart Badge
\`\`\`svelte
<script>
	let cartItems = $state([]);
</script>

<div class="relative">
	<Button variant="ghost">
		{#snippet prefix()}
			<Icon name="shopping-cart" />
		{/snippet}
		Cart
	</Button>
	{#if cartItems.length > 0}
		<Badge color="primary">
			{cartItems.length}
		</Badge>
	{/if}
</div>
\`\`\`

### Status Badge
\`\`\`svelte
<script>
	let userStatus = $state('online'); // 'online', 'away', 'offline'
	
	const statusConfig = {
		online: { color: 'success', text: '•' },
		away: { color: 'warning', text: '•' },
		offline: { color: 'surface', text: '•' }
	};
</script>

<div class="relative">
	<Avatar src="/user.jpg" />
	<Badge 
		color={statusConfig[userStatus].color}
		position="bottomRight"
	>
		{statusConfig[userStatus].text}
	</Badge>
</div>
\`\`\`

## Notes

- Badge uses absolute positioning with negative margins for proper overlap
- Content automatically determines minimum width (circular for single characters)
- Numbers are commonly used but any content (text, icons) is supported
- Consider using appropriate colors for semantic meaning (danger for errors, success for completed states)
- For large numbers, consider showing "99+" style truncation
`;
