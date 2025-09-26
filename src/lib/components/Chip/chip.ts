import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type ChipProps = WithAttachments<
	WithSlot<
		{
			class?: string;
			color?: Colors;
			size?: Sizes;
			variant?: 'solid' | 'outline' | 'soft';
			href?: string;
			target?: string;
			rel?: string;
			onClick?: (event: MouseEvent) => void;
			onenter?: (event: MouseEvent) => void;
			onleave?: (event: MouseEvent) => void;
			theme?: InferComponentTheme<typeof chipTheme>;
		},
		'children' | 'suffix' | 'prefix',
		undefined
	>
>;

const defaultChip = cva({
	base: 'rounded-large box-border w-fit justify-between max-w-fit min-w-min items-center inline-flex',
	variants: {
		size: {
			small: 'px-1.5 py-0.5 min-h-4 text-sm  gap-1',
			normal: 'px-2 py-0.5 min-h-5 text-base gap-1',
			large: 'px-2.5 py-0.5 min-h-6 text-md  gap-1.5'
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
			solid: 'text-color-fg bg-color',
			outline: 'bg-opacity-0 text-color border-color border',
			soft: 'bg-color-muted text-color'
		}
	},
	defaultVariants: {
		color: 'primary',
		variant: 'solid',
		size: 'small'
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

const defaultChipPrefix = cva({
	base: 'w-4 h-4',
	variants: {
		size: {
			normal: 'w-4 h-4',
			large: 'w-5 h-5',
			small: 'w-2 h-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultChipSuffix = cva({
	base: 'w-4 h-4',
	variants: {
		size: {
			normal: 'w-4 h-4',
			large: 'w-5 h-5',
			small: 'w-2 h-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const chipStructure = `
<Chip>
	<Prefix />
	<Children />
	<Suffix />
</Chip>
`;

export const chipTheme = {
	chip: defaultChip,
	prefix: defaultChipPrefix,
	suffix: defaultChipSuffix
};

export const agent = `
# Chip Component

The Chip component is a compact, interactive element used to display information, trigger actions, or represent selections. It can function as a button, link, or display element with optional prefix and suffix content.

## Basic Usage

\`\`\`svelte
<Chip>Basic Chip</Chip>
<Chip color="primary" variant="outline">Primary Outline</Chip>
<Chip size="large" variant="soft">Large Soft Chip</Chip>
\`\`\`

## Props

### Core Props
- **color**: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' (default: 'primary')
  - Determines the color scheme of the chip

- **variant**: 'solid' | 'outline' | 'soft' (default: 'solid')
  - solid: Filled background with color
  - outline: Transparent background with colored border
  - soft: Muted color background with colored text

- **size**: 'small' | 'normal' | 'large' (default: 'small')
  - small: 16px height, minimal padding
  - normal: 20px height, standard padding
  - large: 24px height, larger padding

### Interactive Props
- **onClick**: (event: MouseEvent) => void - Click event handler
- **onenter**: (event: MouseEvent) => void - Mouse enter event handler
- **onleave**: (event: MouseEvent) => void - Mouse leave event handler

### Link Props
- **href**: string - Makes chip render as anchor tag
- **target**: string - Link target (e.g., "_blank")
- **rel**: string - Link relationship

### Content Props (Slots)
- **children**: Snippet - Main chip content
- **prefix**: Snippet - Content before main text (typically icons)
- **suffix**: Snippet - Content after main text (typically icons or close buttons)
- **prefixProps**: object - Props passed to prefix slot
- **suffixProps**: object - Props passed to suffix slot
- **childrenProps**: object - Props passed to children slot

### Styling Props
- **class**: string - Additional CSS classes for the chip container
- **theme**: ComponentTheme - Custom theme overrides

## Element Behavior

The chip automatically determines its HTML element based on props:
- **\`<a>\`** - When \`href\` is provided
- **\`<button>\`** - When \`onClick\`, \`onenter\`, or \`onleave\` is provided
- **\`<div>\`** - For display-only chips

## Structure

\`\`\`
<Chip>
	<Prefix />    <!-- Optional prefix content -->
	<Children />  <!-- Main chip content -->
	<Suffix />    <!-- Optional suffix content -->
</Chip>
\`\`\`

## Examples

### Basic Chips
\`\`\`svelte
<div class="flex gap-2">
	<Chip>Default</Chip>
	<Chip variant="outline">Outline</Chip>
	<Chip variant="soft">Soft</Chip>
</div>
\`\`\`

### Color Variations
\`\`\`svelte
<div class="flex flex-wrap gap-2">
	<Chip color="primary">Primary</Chip>
	<Chip color="secondary">Secondary</Chip>
	<Chip color="danger">Danger</Chip>
	<Chip color="success">Success</Chip>
	<Chip color="warning">Warning</Chip>
	<Chip color="info">Info</Chip>
</div>
\`\`\`

### Size Variations
\`\`\`svelte
<div class="flex items-center gap-2">
	<Chip size="small">Small</Chip>
	<Chip size="normal">Normal</Chip>
	<Chip size="large">Large</Chip>
</div>
\`\`\`

### Interactive Chips
\`\`\`svelte
<script>
	function handleClick() {
		console.log('Chip clicked!');
	}
	
	function handleHover() {
		console.log('Chip hovered!');
	}
</script>

<div class="flex gap-2">
	<Chip onClick={handleClick}>Clickable</Chip>
	<Chip onenter={handleHover} onleave={handleHover}>Hoverable</Chip>
</div>
\`\`\`

### Chips with Icons
\`\`\`svelte
<div class="flex gap-2">
	<Chip color="success">
		{#snippet prefix()}
			<Icon name="check" />
		{/snippet}
		Completed
	</Chip>
	
	<Chip color="info">
		{#snippet prefix()}
			<Icon name="info" />
		{/snippet}
		Information
		{#snippet suffix()}
			<Icon name="external-link" />
		{/snippet}
	</Chip>
</div>
\`\`\`

### Dismissible Chips
\`\`\`svelte
<script>
	let chips = $state(['Tag 1', 'Tag 2', 'Tag 3']);
	
	function removeChip(index) {
		chips = chips.filter((_, i) => i !== index);
	}
</script>

<div class="flex gap-2">
	{#each chips as chip, index}
		<Chip color="surface" variant="soft">
			{chip}
			{#snippet suffix()}
				<button onclick={() => removeChip(index)} class="hover:bg-black/10 rounded p-0.5">
					<Icon name="x" size={12} />
				</button>
			{/snippet}
		</Chip>
	{/each}
</div>
\`\`\`

### Link Chips
\`\`\`svelte
<div class="flex gap-2">
	<Chip href="/profile" color="primary">View Profile</Chip>
	<Chip href="https://example.com" target="_blank" color="info">
		External Link
		{#snippet suffix()}
			<Icon name="external-link" />
		{/snippet}
	</Chip>
</div>
\`\`\`

### Status Chips
\`\`\`svelte
<script>
	const statuses = [
		{ label: 'Active', color: 'success', variant: 'soft' },
		{ label: 'Pending', color: 'warning', variant: 'soft' },
		{ label: 'Inactive', color: 'surface', variant: 'outline' },
		{ label: 'Error', color: 'danger', variant: 'solid' }
	];
</script>

<div class="flex gap-2">
	{#each statuses as status}
		<Chip color={status.color} variant={status.variant}>
			{status.label}
		</Chip>
	{/each}
</div>
\`\`\`

### Filter Chips
\`\`\`svelte
<script>
	let selectedFilters = $state(['react', 'typescript']);
	
	const availableFilters = ['react', 'vue', 'svelte', 'typescript', 'javascript'];
	
	function toggleFilter(filter) {
		if (selectedFilters.includes(filter)) {
			selectedFilters = selectedFilters.filter(f => f !== filter);
		} else {
			selectedFilters = [...selectedFilters, filter];
		}
	}
</script>

<div class="flex gap-2">
	{#each availableFilters as filter}
		<Chip 
			onClick={() => toggleFilter(filter)}
			color={selectedFilters.includes(filter) ? 'primary' : 'surface'}
			variant={selectedFilters.includes(filter) ? 'solid' : 'outline'}
		>
			{filter}
			{#if selectedFilters.includes(filter)}
				{#snippet suffix()}
					<Icon name="check" size={12} />
				{/snippet}
			{/if}
		</Chip>
	{/each}
</div>
\`\`\`

### Avatar Chips
\`\`\`svelte
<div class="flex gap-2">
	<Chip variant="soft" color="surface">
		{#snippet prefix()}
			<img src="/avatar1.jpg" alt="User" class="w-full h-full rounded-full object-cover" />
		{/snippet}
		John Doe
	</Chip>
	
	<Chip variant="outline" color="primary">
		{#snippet prefix()}
			<div class="w-full h-full rounded-full bg-primary text-primary-fg flex items-center justify-center text-xs">
				JD
			</div>
		{/snippet}
		Jane Doe
	</Chip>
</div>
\`\`\`

### Custom Styling
\`\`\`svelte
<div class="flex gap-2">
	<Chip class="shadow-lg hover:shadow-xl transition-shadow" color="primary">
		Enhanced Shadow
	</Chip>
	
	<Chip class="animate-pulse" color="warning">
		Animated Chip
	</Chip>
</div>
\`\`\`

## Data Attributes

The chip automatically adds data attributes for styling:
- \`data-variant\`: Current variant value
- \`data-color\`: Current color value
- \`data-size\`: Current size value

## Accessibility

- Appropriate ARIA roles are set based on element type (button/link/none)
- Interactive chips are keyboard accessible
- Color alone is not used to convey information
- Sufficient color contrast for readability

## Common Use Cases

### Tag System
\`\`\`svelte
<script>
	let tags = $state(['frontend', 'react', 'typescript']);
</script>

<div class="flex flex-wrap gap-1">
	{#each tags as tag}
		<Chip size="small" variant="soft" color="primary">
			#{tag}
		</Chip>
	{/each}
</div>
\`\`\`

### Category Navigation
\`\`\`svelte
<script>
	let activeCategory = $state('all');
	const categories = ['all', 'electronics', 'clothing', 'books', 'sports'];
</script>

<div class="flex gap-2">
	{#each categories as category}
		<Chip 
			onClick={() => activeCategory = category}
			color={activeCategory === category ? 'primary' : 'surface'}
			variant={activeCategory === category ? 'solid' : 'outline'}
		>
			{category}
		</Chip>
	{/each}
</div>
\`\`\`

### Notification Chips
\`\`\`svelte
<div class="space-y-2">
	<Chip color="success" variant="soft">
		{#snippet prefix()}
			<Icon name="check-circle" />
		{/snippet}
		Success: Operation completed
	</Chip>
	
	<Chip color="danger" variant="soft">
		{#snippet prefix()}
			<Icon name="alert-circle" />
		{/snippet}
		Error: Something went wrong
	</Chip>
</div>
\`\`\`

## Best Practices

- Use consistent sizing within the same context
- Choose colors that align with semantic meaning
- Keep chip text concise and descriptive
- For interactive chips, provide clear visual feedback
- Use prefix/suffix icons to enhance understanding
- Consider accessibility when using color to convey state

## Notes

- Chips automatically adjust their HTML element based on functionality
- Icon sizing in prefix/suffix is automatically adjusted based on chip size
- The component supports both controlled and uncontrolled usage patterns
- Rounded corners are applied by default for a modern appearance
- Text is automatically prevented from wrapping to maintain chip shape
`;
