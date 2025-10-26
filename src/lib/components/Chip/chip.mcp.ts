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
- **prefixProps**: object - Props passed to prefix slot
- **suffixProps**: object - Props passed to suffix slot
- **childrenProps**: object - Props passed to children slot

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
`;
