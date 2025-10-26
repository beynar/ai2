export const accordionDescription = `
# Accordion Component

The Accordion component provides an interactive collapsible container for organizing content. It supports single or multiple expanded items, various visual styles, and customizable transitions.

## Basic Usage

\`\`\`svelte
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

### Behavior Props
- **oneAtATime**: boolean (default: true) - Whether only one item can be expanded at a time
- **onToggle**: (item: Item, isOpen: boolean) => void - Callback when item is toggled

### Visual Props
- **variant**: 'classic' | 'minimal' | 'bordered' (default: 'classic')
  - classic: Traditional accordion with borders
  - minimal: Clean design with minimal styling
  - bordered: Each item has visible borders

- **icon**: 'chevron' | 'math' | Snippet (default: 'math')
  - chevron: Down chevron that rotates
  - math: Plus/minus icon
  - Custom snippet for custom icons

- **size**: 'small' | 'normal' | 'large' - Size of the accordion items
- **splitted**: boolean - Adds spacing between accordion items

### Content Slots
- **actions**: Snippet - Additional actions in header
- **title**: Snippet - Custom title rendering
- **description**: Snippet - Custom description rendering
- **content**: Snippet - Custom content rendering
- **icon**: Snippet - Custom icon rendering

### Slot Props
- **actionsProps**: object - Props passed to actions slot
- **iconProps**: object - Props passed to icon slot
- **titleProps**: object - Props passed to title slot
- **descriptionProps**: object - Props passed to description slot
- **contentProps**: object - Props passed to content slot

### Styling Props
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides
- **transitions**: boolean - Enable/disable transitions

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

### Basic Accordion
\`\`\`svelte
<script>
	let items = [
		{ title: 'What is Svelte?', content: 'Svelte is a radical new approach to building user interfaces.' },
		{ title: 'Why use Svelte?', content: 'Svelte offers better performance and smaller bundle sizes.' }
	];
</script>

<Accordion {items} />
\`\`\`

### Multiple Expanded Items
\`\`\`svelte
<Accordion 
	{items}
	oneAtATime={false}
/>
\`\`\`

### With Descriptions
\`\`\`svelte
<script>
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
<Accordion variant="classic" {items} />
<Accordion variant="minimal" {items} />
<Accordion variant="bordered" {items} />
\`\`\`

### Different Icons
\`\`\`svelte
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
<Accordion 
	{items}
	splitted
	variant="bordered"
/>
\`\`\`

### With Event Handler
\`\`\`svelte
<script>
	function handleToggle(item, isOpen) {
		console.log(\`Item \${item.title} is now \${isOpen ? 'open' : 'closed'}\`);
	}
</script>

<Accordion 
	{items}
	onToggle={handleToggle}
/>
\`\`\`

### Custom Content Rendering
\`\`\`svelte
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
