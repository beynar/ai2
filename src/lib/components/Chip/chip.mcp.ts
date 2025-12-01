export const chipDescription = `
# Chip Component

The Chip component is a compact element for displaying tags, labels, categories, or filters. It supports various colors, variants, sizes, and can act as a button or link.

## Basic Usage

\`\`\`svelte
<Chip>Tag</Chip>
<Chip color="primary">Primary Tag</Chip>
<Chip variant="outline">Outline Tag</Chip>
\`\`\`

## Props

### Core Props
- **color**: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' (default: 'primary')
  - Determines the color scheme

- **variant**: 'solid' | 'outline' | 'soft' (default: 'solid')
  - solid: Filled background with color
  - outline: Transparent background with colored border
  - soft: Semi-transparent background

- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: Compact size for dense layouts
  - normal: Standard size
  - large: Larger for emphasis

### Interactive Props
- **onClick**: (event: MouseEvent) => void - Click handler (makes chip a button)
- **onenter**: (event: PointerEvent) => void - Pointer enter handler
- **onleave**: (event: PointerEvent) => void - Pointer leave handler

### Link Props
- **href**: string - Makes chip render as anchor tag
- **target**: string - Link target (e.g., "_blank")
- **rel**: string - Link relationship

### Content Slots
- **children**: Snippet - Main chip content
- **prefix**: Snippet - Content before main text (typically icons)
- **suffix**: Snippet - Content after main text (typically close buttons or icons)

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Chip>
	<Prefix />     <!-- Optional prefix -->
	<Children />   <!-- Main content -->
	<Suffix />     <!-- Optional suffix -->
</Chip>
\`\`\`

## Examples

### Basic Chips
\`\`\`svelte
<Chip>Default</Chip>
<Chip variant="outline">Outline</Chip>
<Chip variant="soft">Soft</Chip>
\`\`\`

### Color Variants
\`\`\`svelte
<Chip color="primary">Primary</Chip>
<Chip color="secondary">Secondary</Chip>
<Chip color="danger">Danger</Chip>
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="info">Info</Chip>
\`\`\`

### Different Sizes
\`\`\`svelte
<Chip size="small">Small</Chip>
<Chip size="normal">Normal</Chip>
<Chip size="large">Large</Chip>
\`\`\`

### With Icons
\`\`\`svelte
<Chip>
	{#snippet prefix()}
		<Icon name="tag" />
	{/snippet}
	Tagged
</Chip>

<Chip>
	Category
	{#snippet suffix()}
		<Icon name="x" />
	{/snippet}
</Chip>
\`\`\`

### Interactive Chip (Button)
\`\`\`svelte
<script>
	function handleClick() {
		console.log('Chip clicked');
	}
</script>

<Chip onClick={handleClick}>
	Clickable
</Chip>
\`\`\`

### Removable Chip
\`\`\`svelte
<script>
	let tags = $state(['React', 'Vue', 'Svelte']);
	
	function removeTag(tag) {
		tags = tags.filter(t => t !== tag);
	}
</script>

{#each tags as tag}
	<Chip color="primary">
		{tag}
		{#snippet suffix()}
			<button onclick={() => removeTag(tag)}>
				<Icon name="x" size={12} />
			</button>
		{/snippet}
	</Chip>
{/each}
\`\`\`

### As Link
\`\`\`svelte
<Chip href="/tags/svelte" target="_blank">
	Svelte Tag
</Chip>
\`\`\`

### Status Chips
\`\`\`svelte
<Chip color="success" variant="soft">Active</Chip>
<Chip color="warning" variant="soft">Pending</Chip>
<Chip color="danger" variant="soft">Inactive</Chip>
\`\`\`

### With Custom Styling
\`\`\`svelte
<Chip class="shadow-md hover:shadow-lg transition-shadow">
	Custom Style
</Chip>
\`\`\`

### Filter Chips
\`\`\`svelte
<script>
	let filters = $state(['All', 'Active', 'Completed', 'Archived']);
	let selected = $state('All');
</script>

<div class="flex gap-2">
	{#each filters as filter}
		<Chip 
			variant={selected === filter ? 'solid' : 'outline'}
			color={selected === filter ? 'primary' : 'surface'}
			onClick={() => selected = filter}
		>
			{filter}
		</Chip>
	{/each}
</div>
\`\`\`

### Category Chips
\`\`\`svelte
<div class="flex flex-wrap gap-2">
	<Chip color="primary" variant="soft">JavaScript</Chip>
	<Chip color="secondary" variant="soft">TypeScript</Chip>
	<Chip color="info" variant="soft">CSS</Chip>
	<Chip color="success" variant="soft">HTML</Chip>
</div>
\`\`\`

## Rendering Behavior

- Renders as \`<button>\` when \`onClick\`, \`onenter\`, or \`onleave\` is provided
- Renders as \`<a>\` when \`href\` is provided
- Renders as \`<div>\` otherwise

## Accessibility

- Automatically sets appropriate ARIA roles
- Button chips support keyboard interaction
- Link chips support standard anchor behavior
- Proper focus states for interactive chips

## Notes

- The chip automatically determines its element type based on props
- Interactive chips have hover and focus states
- Suffix is commonly used for close/remove actions
- Prefix is typically used for icons or status indicators

## Theme Customization

The Chip component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **chip**: Main chip container styles
- **prefix**: Prefix icon/content styles
- **suffix**: Suffix icon/content styles

### Theme Type Definition

\`\`\`typescript
import type { ChipThemeProps } from 'svelai/chip';

// Example theme customization
const customTheme: ChipThemeProps = {
  chip: {
    base: 'custom-base-classes',
    size: {
      small: 'px-1.5 py-0.5 min-h-4 text-sm gap-1',
      normal: 'px-2 py-0.5 min-h-5 text-base gap-1',
      large: 'px-2.5 py-0.5 min-h-6 text-md gap-1.5'
    },
    color: {
      primary: 'bg-primary text-primary-fg',
      danger: 'bg-danger text-danger-fg'
    },
    variant: {
      solid: 'text-color-fg bg-color',
      outline: 'bg-opacity-0 text-color border-color border',
      soft: 'bg-color-muted text-color'
    }
  },
  prefix: {
    size: {
      small: 'w-2 h-2',
      normal: 'w-4 h-4',
      large: 'w-5 h-5'
    }
  },
  suffix: {
    size: {
      small: 'w-2 h-2',
      normal: 'w-4 h-4',
      large: 'w-5 h-5'
    }
  }
};
\`\`\`

### Available Variants

**chip**:
- base: Base classes applied to all chips
- Variants:
  - size: 'small' | 'normal' | 'large' - Controls padding, height, text size, and gap
  - color: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' - Color scheme
  - variant: 'solid' | 'outline' | 'soft' - Visual style variant

**prefix**:
- base: Base classes for prefix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size based on chip size

**suffix**:
- base: Base classes for suffix content
- Variants:
  - size: 'small' | 'normal' | 'large' - Icon size based on chip size

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<Chip 
  theme={{
    chip: {
      base: 'rounded-full shadow-md',
      size: {
        large: 'px-4 py-2 min-h-8'
      }
    }
  }}
>
  Custom Chip
</Chip>
\`\`\`

**Color and Variant Customization**:
\`\`\`svelte
<Chip 
  color="danger"
  variant="outline"
  theme={{
    chip: {
      variant: {
        outline: 'border-2 border-red-500 bg-red-50 text-red-700'
      }
    }
  }}
>
  Danger Chip
</Chip>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setChipTheme } from 'svelai/chip';
  
  setChipTheme({
    chip: {
      base: 'transition-all hover:scale-105',
      variant: {
        solid: 'shadow-sm hover:shadow-md',
        outline: 'border-2 hover:bg-color/10'
      }
    },
    prefix: {
      size: {
        normal: 'w-5 h-5'
      }
    }
  });
</script>
\`\`\`
`;
