export const tooltipDescription = `
# Tooltip Attachment

The tooltip attachment displays contextual information when hovering over an element. Use the \`{@attach}\` directive to attach tooltips to any element.

## Basic Usage

\`\`\`svelte
<script>
	import { tooltip } from 'svelai/tooltip';
</script>

<button {@attach tooltip({ content: 'Click to submit' })}>
	Submit
</button>
\`\`\`

## Props

- **content**: string | Snippet (required) - Tooltip content to display
- **position**: Placement (default: 'top') - Tooltip position relative to element
  - Options: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
- **size**: 'small' | 'normal' | 'large' (default: 'normal') - Visual size
- **color**: Colors (default: 'surface') - Color theme
- **delay**: number (default: 400) - Delay in ms before showing tooltip
- **offset**: number - Distance from reference element in pixels
- **class**: string - Additional CSS classes
- **transition**: FSOProps - Custom transition configuration
- **onOpen**: () => void - Callback when tooltip opens
- **onClose**: () => void - Callback when tooltip closes

## Examples

### Basic Text Tooltip
\`\`\`svelte
<script>
	import { tooltip } from 'svelai/tooltip';
</script>

<div {@attach tooltip({ content: 'This is helpful information' })}>
	Hover me
</div>
\`\`\`

### Different Positions
\`\`\`svelte
<button {@attach tooltip({ content: 'Top tooltip', position: 'top' })}>
	Top
</button>

<button {@attach tooltip({ content: 'Bottom tooltip', position: 'bottom' })}>
	Bottom
</button>

<button {@attach tooltip({ content: 'Left tooltip', position: 'left' })}>
	Left
</button>

<button {@attach tooltip({ content: 'Right tooltip', position: 'right' })}>
	Right
</button>
\`\`\`

### Different Colors
\`\`\`svelte
<button {@attach tooltip({ content: 'Success!', color: 'success' })}>
	Success
</button>

<button {@attach tooltip({ content: 'Warning!', color: 'warning' })}>
	Warning
</button>

<button {@attach tooltip({ content: 'Error!', color: 'danger' })}>
	Error
</button>
\`\`\`

### Custom Delay
\`\`\`svelte
<button {@attach tooltip({ content: 'Quick tooltip', delay: 100 })}>
	Quick (100ms)
</button>

<button {@attach tooltip({ content: 'Slow tooltip', delay: 1000 })}>
	Slow (1000ms)
</button>
\`\`\`

### Different Sizes
\`\`\`svelte
<button {@attach tooltip({ content: 'Small tooltip', size: 'small' })}>
	Small
</button>

<button {@attach tooltip({ content: 'Normal tooltip', size: 'normal' })}>
	Normal
</button>

<button {@attach tooltip({ content: 'Large tooltip', size: 'large' })}>
	Large
</button>
\`\`\`

### With Custom Offset
\`\`\`svelte
<button {@attach tooltip({ content: 'Far away', offset: 20 })}>
	20px offset
</button>
\`\`\`

### With Snippet Content
\`\`\`svelte
<script>
	import { tooltip } from 'svelai/tooltip';
</script>

{#snippet richContent()}
	<div class="p-2">
		<strong>Pro Tip</strong>
		<p class="text-sm">Use Ctrl+S to save</p>
	</div>
{/snippet}

<button {@attach tooltip({ content: richContent })}>
	Keyboard Shortcuts
</button>
\`\`\`

### With Callbacks
\`\`\`svelte
<button {@attach tooltip({
	content: 'Tracked tooltip',
	onOpen: () => console.log('Tooltip opened'),
	onClose: () => console.log('Tooltip closed')
})}>
	Track me
</button>
\`\`\`

### On Icons
\`\`\`svelte
<svg 
	{@attach tooltip({ content: 'More information' })}
	class="w-4 h-4"
>
	<!-- icon paths -->
</svg>
\`\`\`

### On Disabled Elements
\`\`\`svelte
<!-- Wrap disabled elements since they don't fire events -->
<span {@attach tooltip({ content: 'Feature coming soon' })}>
	<button disabled>Disabled Button</button>
</span>
\`\`\`

## Accessibility

- Automatically shows on hover and focus
- Dismissed on mouse leave or blur
- Non-interactive (cannot be clicked)
- Uses appropriate ARIA attributes
- Does not block content behind it

## Notes

- Only one tooltip shows at a time
- Automatically positions to stay in viewport using Floating UI
- Uses smart delay: subsequent tooltips show instantly if within 400ms of previous
- Brief content only (use Popover for interactive content)
- Tooltip is managed globally through theme state
- Does not lock scroll or trap focus
`;
