export const accordionDescription = `
# Accordion Component

The Accordion component provides an interactive collapsible container for organizing content. It supports single or multiple expanded items, various visual styles, and customizable transitions.

## Basic Usage

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
</script>

<Accordion 
	items={[
		{ title: 'Section 1', content: 'Content 1' },
		{ title: 'Section 2', content: 'Content 2' }
	]}
/>
\`\`\`

## Props

### Core Props
- **items**: Array<Item> (bindable) - Array of accordion items to display
- **titleKey**: string - Key to extract title from items (default: 'title')
- **contentKey**: string - Key to extract content from items (default: 'content')
- **descriptionKey**: string - Key to extract description from items (default: 'description')

### Layout Props
- **variant**: 'classic' | 'card' | 'outlined' (default: 'classic')
  - classic: Traditional accordion with borders
  - card: Card-style design
  - outlined: Each item has visible borders

- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: Compact accordion items
  - normal: Standard accordion items
  - large: Larger accordion items

- **splitted**: boolean (default: false) - Adds spacing between accordion items

### Event Props
- **onToggle**: (options: { item: Item; index: number; isOpen: boolean }) => void - Callback when item is toggled

### Slot Props
- **actions**: Snippet - Additional actions in header
- **title**: Snippet - Custom title rendering
- **description**: Snippet - Custom description rendering
- **content**: Snippet - Custom content rendering
- **icon**: Snippet - Custom icon rendering
- **actionsProps**: object - Props passed to actions slot
- **iconProps**: object - Props passed to icon slot
- **titleProps**: object - Props passed to title slot
- **descriptionProps**: object - Props passed to description slot
- **contentProps**: object - Props passed to content slot

### Behavior Props
- **oneAtATime**: boolean (default: true) - Whether only one item can be expanded at a time

### Visual Props
- **icon**: 'chevron' | 'math' | Snippet | false (default: 'math')
  - chevron: Down chevron that rotates
  - math: Plus/minus icon
  - Custom snippet for custom icons
  - false: Hide icon

- **transitions**: SlideTransitionProps - Transition configuration for accordion content

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

\`\`\`
<Accordion>
	<AccordionItem>
		<AccordionTrigger>
			<AccordionHeader>
				<Title />
				<Description />
			</AccordionHeader>
			<Icon />
		</AccordionTrigger>
		<AccordionContent />
	</AccordionItem>
</Accordion>
\`\`\`

## Examples

### Basic Example

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	
	let items = [
		{ title: 'What is Svelte?', content: 'Svelte is a radical new approach to building user interfaces.' },
		{ title: 'Why use Svelte?', content: 'Svelte offers better performance and smaller bundle sizes.' }
	];
</script>

<Accordion {items} />
\`\`\`

### Multiple Expanded Items

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	
	let items = [
		{ title: 'Section 1', content: 'Content 1' },
		{ title: 'Section 2', content: 'Content 2' }
	];
</script>

<Accordion 
	{items}
	oneAtATime={false}
/>
\`\`\`

### Advanced Example

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	import { Icon } from 'svelai/icons';
	
	let items = [
		{ 
			title: 'Getting Started',
			description: 'Learn the basics',
			content: 'Start by installing Svelte...'
		}
	];
</script>

<Accordion {items} />
\`\`\`

### Different Variants

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	
	let items = [
		{ title: 'Item 1', content: 'Content 1' }
	];
</script>

<!-- Classic variant -->
<Accordion variant="classic" {items} />

<!-- Card variant -->
<Accordion variant="card" {items} />

<!-- Outlined variant -->
<Accordion variant="outlined" {items} />
\`\`\`

### Different Icons

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	import { Icon } from 'svelai/icons';
	
	let items = [
		{ title: 'Section 1', content: 'Content 1' }
	];
</script>

<!-- Chevron icon -->
<Accordion icon="chevron" {items} />

<!-- Math (+/-) icon -->
<Accordion icon="math" {items} />

<!-- Custom icon -->
<Accordion {items}>
	{#snippet icon({ isOpen })}
		<Icon name={isOpen ? 'minus' : 'plus'} />
	{/snippet}
</Accordion>
\`\`\`

### With Custom Keys

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	
	let faqs = [
		{ question: 'How to install?', answer: 'Run npm install...' }
	];
</script>

<Accordion 
	items={faqs}
	titleKey="question"
	contentKey="answer"
/>
\`\`\`

### Splitted Layout

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	
	let items = [
		{ title: 'Section 1', content: 'Content 1' },
		{ title: 'Section 2', content: 'Content 2' }
	];
</script>

<Accordion 
	{items}
	splitted
	variant="outlined"
/>
\`\`\`

### With Event Handler

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	
	let items = [
		{ title: 'Section 1', content: 'Content 1' }
	];
	
	function handleToggle({ item, index, isOpen }) {
		console.log(\`Item \${item.title} at index \${index} is now \${isOpen ? 'open' : 'closed'}\`);
	}
</script>

<Accordion 
	{items}
	onToggle={handleToggle}
/>
\`\`\`

### Custom Content Rendering

\`\`\`svelte
<script>
	import { Accordion } from 'svelai/accordion';
	
	let items = [
		{ title: 'Section 1', content: 'Content 1' }
	];
</script>

<Accordion {items}>
	{#snippet title({ item })}
		<strong>{item.title}</strong>
	{/snippet}
	
	{#snippet content({ item })}
		<div class="p-4">
			{@html item.content}
		</div>
	{/snippet}
</Accordion>
\`\`\`

## Accessibility

- Automatically handles ARIA attributes
- Keyboard navigation support (Enter/Space to toggle)
- Focus management for expanded items
- Screen reader friendly with proper roles

## Notes

- Items are automatically assigned IDs if not provided
- Uses Melt UI's Accordion builder for accessibility
- Smooth transitions with Svelte's slide transition
- Supports bindable items for dynamic updates
`;
