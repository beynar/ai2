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
- **color**: 'primary' | 'secondary' | 'foreground' | 'background' | 'danger' | 'success' | 'warning' | 'info' (default: 'primary')
  - Determines the color scheme of the badge

- **variant**: 'solid' | 'outline' | 'soft' (default: 'solid')
  - solid: Filled background with color
  - outline: Transparent background with colored border
  - soft: Muted semantic background with a readable semantic foreground

- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: 20px height, 8px horizontal padding, 12px text
  - normal: 24px height, 10px horizontal padding, 12px text
  - large: 28px height, 12px horizontal padding, 14px text

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
- Ensure sufficient color foreground for readability

## Notes

- Badge uses absolute positioning and half-size transforms for consistent corner overlap
- Badge uses the same pill geometry, spacing, typography, and color treatments as Chip
- Numbers are commonly used but any content (text, icons) is supported
- Consider using appropriate colors for semantic meaning (danger for errors, success for completed states)

## Theme Customization

The Badge component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **root**: Main badge container styles

### Theme Type Definition

\`\`\`typescript
import type { BadgeThemeProps } from 'svelai/badge';

// Example theme customization
const customTheme: BadgeThemeProps = {
  root: {
    base: 'absolute inline-flex items-center rounded-full font-medium',
    size: {
      small: 'h-5 gap-1 px-2 text-xs',
      normal: 'h-6 gap-1.5 px-2.5 text-xs',
      large: 'h-7 gap-1.5 px-3 text-sm'
    },
    color: {
      primary: 'bg-primary text-primary-contrast',
      danger: 'bg-danger text-danger-contrast'
    },
    variant: {
      solid: 'bg-color text-color-contrast',
      outline: 'border-color bg-color/0 text-color-readable',
      soft: 'bg-color-muted text-color-muted-readable'
    },
    position: {
      topRight: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
      topLeft: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      bottomRight: 'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
      bottomLeft: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2'
    }
  }
};
\`\`\`

### Available Variants

**root**:
- base: Base classes applied to all badges
- Variants:
  - size: 'small' | 'normal' | 'large' - Controls height, padding, and text size
  - color: 'primary' | 'secondary' | 'foreground' | 'background' | 'danger' | 'success' | 'warning' | 'info' - Color scheme
  - variant: 'solid' | 'outline' | 'soft' - Visual style variant
  - position: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft' - Positioning relative to parent

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<div class="relative">
  <Button>Notifications</Button>
  <Badge 
    theme={{
      root: {
        base: 'ring-2 ring-white',
        size: {
          normal: 'h-6 min-w-6 px-2 text-sm font-bold'
        }
      }
    }}
  >
    5
  </Badge>
</div>
\`\`\`

**Color and Variant Customization**:
\`\`\`svelte
<div class="relative">
  <Avatar src="/user.jpg" />
  <Badge 
    color="success"
    variant="outline"
    theme={{
      root: {
        variant: {
          outline: 'border-2 border-green-500 bg-white text-green-600'
        },
        position: {
          bottomRight: '-bottom-1 -right-1'
        }
      }
    }}
  >
    •
  </Badge>
</div>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setBadgeTheme } from 'svelai/badge';
  
  setBadgeTheme({
    root: {
      base: 'ring-2 ring-white shadow-md',
      variant: {
        solid: 'font-semibold',
        outline: 'border-2 bg-white',
        soft: 'bg-opacity-30'
      }
    }
  });
</script>
\`\`\`
`;
