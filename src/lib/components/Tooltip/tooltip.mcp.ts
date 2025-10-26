export const tooltipDescription = `
# Tooltip Component

The Tooltip component displays contextual information when hovering over or focusing on an element. It's a specialized Popover for brief, helpful text.

## Basic Usage

\`\`\`svelte
<script>
	import { useTheme } from '../Theme/theme.state.svelte.js';
	
	let buttonRef;
	const theme = useTheme();
	
	function showTooltip() {
		theme.showTooltip({
			ref: buttonRef,
			content: 'This is a tooltip',
			position: 'top'
		});
	}
	
	function hideTooltip() {
		theme.hideTooltip();
	}
</script>

<Button 
	bind:ref={buttonRef}
	onenter={showTooltip}
	onleave={hideTooltip}
>
	Hover me
</Button>

<Tooltip />
\`\`\`

## Theme API

Use the theme's tooltip methods to show/hide tooltips:

### showTooltip(config)
- **ref**: HTMLElement (required) - Element to anchor tooltip to
- **content**: string | Snippet (required) - Tooltip content
- **position**: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
- **size**: 'small' | 'normal' | 'large' (default: 'normal')
- **color**: Colors (default: 'surface')
- **offset**: number - Distance from reference element
- **class**: string - Additional CSS classes
- **transition**: TransitionConfig - Custom transition

### hideTooltip()
Hides the currently visible tooltip

## Props

### Styling Props
- **theme**: ComponentTheme - Custom theme overrides

## Examples

### Basic Tooltip
\`\`\`svelte
<script>
	const theme = useTheme();
	let buttonRef;
</script>

<Button 
	bind:ref={buttonRef}
	onenter={() => theme.showTooltip({
		ref: buttonRef,
		content: 'Click to submit'
	})}
	onleave={() => theme.hideTooltip()}
>
	Submit
</Button>
\`\`\`

### Different Positions
\`\`\`svelte
<Button 
	bind:ref={topRef}
	onenter={() => theme.showTooltip({
		ref: topRef,
		content: 'Top tooltip',
		position: 'top'
	})}
	onleave={() => theme.hideTooltip()}
>
	Top
</Button>

<Button 
	bind:ref={bottomRef}
	onenter={() => theme.showTooltip({
		ref: bottomRef,
		content: 'Bottom tooltip',
		position: 'bottom'
	})}
	onleave={() => theme.hideTooltip()}
>
	Bottom
</Button>
\`\`\`

### With Delay
\`\`\`svelte
<script>
	let timeoutId;
	
	function showDelayed() {
		timeoutId = setTimeout(() => {
			theme.showTooltip({
				ref: buttonRef,
				content: 'Delayed tooltip'
			});
		}, 500);
	}
	
	function hideDelayed() {
		clearTimeout(timeoutId);
		theme.hideTooltip();
	}
</script>

<Button 
	bind:ref={buttonRef}
	onenter={showDelayed}
	onleave={hideDelayed}
>
	Hover for 500ms
</Button>
\`\`\`

### Rich Content Tooltip
\`\`\`svelte
<Button 
	bind:ref={buttonRef}
	onenter={() => theme.showTooltip({
		ref: buttonRef,
		content: () => \`
			<div class="p-2">
				<strong>Pro Tip</strong>
				<p class="text-sm">Use Ctrl+S to save</p>
			</div>
		\`
	})}
	onleave={() => theme.hideTooltip()}
>
	Keyboard Shortcuts
</Button>
\`\`\`

### Icon with Tooltip
\`\`\`svelte
<Icon 
	name="info" 
	bind:ref={iconRef}
	onenter={() => theme.showTooltip({
		ref: iconRef,
		content: 'More information about this feature'
	})}
	onleave={() => theme.hideTooltip()}
/>
\`\`\`

### Different Colors
\`\`\`svelte
theme.showTooltip({
	ref: buttonRef,
	content: 'Success!',
	color: 'success'
})
\`\`\`

## Usage Pattern

The Tooltip component should be placed once in your app layout:

\`\`\`svelte
<!-- +layout.svelte -->
<script>
	import { Theme } from '$lib/components/Theme';
	import { Tooltip } from '$lib/components/Tooltip';
</script>

<Theme>
	<slot />
	<Tooltip />
</Theme>
\`\`\`

Then use the theme API to show/hide tooltips throughout your app.

## Accessibility

- Appears on both hover and focus
- Dismissed on mouse leave or blur
- Non-interactive (cannot be clicked)
- Uses appropriate ARIA attributes
- Does not block content behind it

## Notes

- Only one tooltip can be shown at a time
- Automatically positions to stay in viewport
- Brief content only (use Popover for interactive content)
- Tooltip is managed globally through theme state
- Does not lock scroll or trap focus
`;
