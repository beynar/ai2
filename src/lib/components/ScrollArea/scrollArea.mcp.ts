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

## Theme Customization

The ScrollArea component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **base**: Main scroll area container styles
- **viewport**: Scrollable viewport container styles
- **content**: Scrollable content wrapper styles
- **scrollbar**: Scrollbar track styles
- **scrollbarThumb**: Scrollbar thumb/draggable part styles

### Available Variants

**base**:
- base: Base classes for main container

**viewport**:
- base: Base classes for viewport container

**content**:
- base: Base classes for scrollable content

**scrollbar**:
- base: Base classes for scrollbar track

**scrollbarThumb**:
- base: Base classes for scrollbar thumb

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<ScrollArea 
  theme={{
    base: {
      base: 'relative h-64'
    },
    scrollbar: {
      base: 'w-2 bg-gray-200 rounded-full'
    },
    scrollbarThumb: {
      base: 'bg-gray-400 rounded-full hover:bg-gray-500'
    }
  }}
>
  {#snippet children()}
    Long content here
  {/snippet}
</ScrollArea>
\`\`\`

**Custom Scrollbar Styling**:
\`\`\`svelte
<ScrollArea 
  theme={{
    scrollbar: {
      base: 'w-3 bg-gray-100 rounded-full'
    },
    scrollbarThumb: {
      base: 'bg-primary rounded-full hover:bg-primary/80 transition-colors'
    }
  }}
>
  {#snippet children()}
    Content
  {/snippet}
</ScrollArea>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setScrollAreaTheme } from 'svelai/scroll-area';
  
  setScrollAreaTheme({
    base: {
      base: 'relative'
    },
    scrollbar: {
      base: 'w-2 bg-gray-200 rounded-full'
    },
    scrollbarThumb: {
      base: 'bg-gray-400 rounded-full hover:bg-gray-500'
    }
  });
</script>
\`\`\`
`;
