export const scrollAreaDescription = `
# ScrollArea Component

The ScrollArea component provides a customizable scrollable container with enhanced scrollbar styling and behavior.

## Basic Usage

\`\`\`svelte
<ScrollArea>
	<div class="content">
		<!-- Long content that scrolls -->
	</div>
</ScrollArea>
\`\`\`

## Props

### Core Props
- **children**: Snippet - Scrollable content
- **orientation**: 'vertical' | 'horizontal' | 'both' (default: 'vertical')
  - Direction of scrolling

### Behavior Props
- **hideScrollbar**: boolean (default: false) - Hide scrollbar visually
- **fadeScrollbar**: boolean (default: true) - Fade scrollbar when not scrolling

### Styling Props
- **class**: string - Additional CSS classes for container
- **theme**: ComponentTheme - Custom theme overrides

## Examples

### Basic Vertical Scroll
\`\`\`svelte
<ScrollArea class="h-64">
	{#each items as item}
		<div>{item}</div>
	{/each}
</ScrollArea>
\`\`\`

### Horizontal Scroll
\`\`\`svelte
<ScrollArea orientation="horizontal" class="w-full">
	<div class="flex gap-4">
		{#each images as image}
			<img src={image} alt="" class="h-32" />
		{/each}
	</div>
</ScrollArea>
\`\`\`

### Both Directions
\`\`\`svelte
<ScrollArea orientation="both" class="h-96 w-full">
	<div class="min-w-[2000px] min-h-[2000px]">
		Large content that scrolls both ways
	</div>
</ScrollArea>
\`\`\`

### Hidden Scrollbar
\`\`\`svelte
<ScrollArea hideScrollbar class="h-64">
	Content with hidden scrollbar
</ScrollArea>
\`\`\`

### Chat Messages
\`\`\`svelte
<ScrollArea class="h-96 flex flex-col-reverse">
	{#each messages as message}
		<div class="message">{message.text}</div>
	{/each}
</ScrollArea>
\`\`\`

## Notes

- Provides consistent scrollbar styling across browsers
- Scrollbar automatically fades when not in use
- Supports touch scrolling on mobile devices
- Can hide scrollbar while maintaining scroll functionality
`;
