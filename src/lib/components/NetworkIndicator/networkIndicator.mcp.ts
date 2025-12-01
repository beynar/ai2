export const networkIndicatorDescription = `
# NetworkIndicator Component

The NetworkIndicator component is a loading indicator that appears at the top of the page during navigation or network requests. It automatically displays during SvelteKit page transitions and can also be controlled programmatically. The indicator progressively grows from left to right with a smooth animation to provide visual feedback about loading states.

## Basic Usage

\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<NetworkIndicator />
\`\`\`

## Props

### Core Props
- **color**: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'contrast' | 'surface' (default: 'contrast')
  - Determines the color scheme of the network indicator
  - contrast: High contrast color (default)
  - primary, secondary, danger, success, warning, info: Semantic colors
  - surface: Muted surface color

- **size**: number (default: 3)
  - The height of the network indicator in pixels
  - Recommended range: 2-6px for optimal visibility without being intrusive

- **delay**: number (default: 300)
  - The animation delay/duration in milliseconds
  - Controls how fast the indicator animates

- **easing**: Easing (default: 'cubicInOut')
  - The easing function to use for animations
  - Options: 'linear', 'easeIn', 'easeOut', 'easeInOut', 'cubicIn', 'cubicOut', 'cubicInOut', 'quartIn', 'quartOut', 'quartInOut', 'quintIn', 'quintOut', 'quintInOut', 'sineIn', 'sineOut', 'sineInOut', 'expoIn', 'expoOut', 'expoInOut', 'circIn', 'circOut', 'circInOut', 'backIn', 'backOut', 'backInOut', 'elasticIn', 'elasticOut', 'elasticInOut', 'bounceIn', 'bounceOut', 'bounceInOut'

### Styling Props
- **class**: string - Additional CSS classes for the network indicator container
- **theme**: NetworkIndicatorThemeProps - Custom theme overrides

## Structure

\`\`\`
<NetworkIndicator />
\`\`\`

The component is typically placed in your root layout file (\`+layout.svelte\`) so it's available across all pages.

## Examples

### Basic Network Indicator
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<NetworkIndicator />
\`\`\`

### Custom Color
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<NetworkIndicator color="primary" />
\`\`\`

### Custom Size
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<NetworkIndicator size={5} />
\`\`\`

### Custom Delay and Easing
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<NetworkIndicator delay={500} easing="elasticOut" />
\`\`\`

### Different Sizes
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<!-- Thin indicator -->
<NetworkIndicator size={2} color="info" />

<!-- Medium indicator -->
<NetworkIndicator size={4} color="warning" />

<!-- Thick indicator -->
<NetworkIndicator size={6} color="danger" />
\`\`\`

### Programmatic Control
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator, toggleNetworkIndicator } from 'svelai/network-indicator';
	import { Button } from 'svelai/button';

	async function performAction() {
		toggleNetworkIndicator(); // Show loading
		try {
			await fetch('/api/data');
		} finally {
			toggleNetworkIndicator(); // Hide loading
		}
	}
</script>

<NetworkIndicator />

<Button onClick={performAction}>
	Perform Action
</Button>
\`\`\`

### Custom Theme
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<NetworkIndicator
	theme={{
		networkIndicator: {
			base: 'shadow-lg'
		}
	}}
/>
\`\`\`

## Automatic Display

The component automatically listens to SvelteKit's \`navigating\` store and displays during page transitions. No additional configuration is needed for this behavior.

## Programmatic Control

You can control the indicator manually using the \`toggleNetworkIndicator\` helper function:

\`\`\`typescript
import { toggleNetworkIndicator } from 'svelai/network-indicator';

// Show or hide the indicator
toggleNetworkIndicator();
\`\`\`

This is useful for showing loading states during API calls or other asynchronous operations. The function toggles between showing and hiding the indicator.

## Styling

The network indicator uses the Web Animations API for smooth, hardware-accelerated animations. You can customize the appearance by:

1. Using the \`color\` prop to change the color scheme (default: 'contrast')
2. Setting the \`size\` prop to control the height in pixels (default: 3px)
3. Adjusting the \`delay\` prop to control animation speed (default: 300ms)
4. Selecting an \`easing\` function for different animation styles (default: 'cubicInOut')
5. Adding custom classes via the \`class\` prop
6. Overriding the theme via the \`theme\` prop

## Common Patterns

### Layout Integration
\`\`\`svelte
<!-- +layout.svelte -->
<script lang="ts">
	import { NetworkIndicator } from 'svelai/network-indicator';
</script>

<NetworkIndicator />

<slot />
\`\`\`

### API Request Pattern
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator, toggleNetworkIndicator } from 'svelai/network-indicator';

	async function fetchData() {
		toggleNetworkIndicator();
		try {
			const response = await fetch('/api/data');
			const data = await response.json();
			// Handle data
		} finally {
			toggleNetworkIndicator();
		}
	}
</script>

<NetworkIndicator />
\`\`\`

### Conditional Display
\`\`\`svelte
<script lang="ts">
	import { NetworkIndicator, toggleNetworkIndicator } from 'svelai/network-indicator';
	import { onMount } from 'svelte';

	let isLoading = $state(false);

	function startLoading() {
		isLoading = true;
		toggleNetworkIndicator();
	}

	function stopLoading() {
		isLoading = false;
		toggleNetworkIndicator();
	}
</script>

<NetworkIndicator />
\`\`\`

## Accessibility

The NetworkIndicator is a purely visual component that provides feedback about loading states. Consider the following accessibility best practices:

- Use consistent colors that match your app's theme
- Keep the indicator thin (2-5px) to avoid being too intrusive
- Ensure the indicator color has sufficient contrast against your app's background
- Consider providing ARIA live regions for screen reader announcements of loading states
- The component is positioned fixed at the top of the viewport, making it visible but non-intrusive

## Notes

- The component is positioned fixed at the top of the viewport
- It uses the Web Animations API for smooth, hardware-accelerated animations
- The indicator progressively grows from left to right with a randomized pattern
- It automatically handles cleanup when unmounted
- The \`toggleNetworkIndicator\` function toggles between showing and hiding the indicator
- Multiple indicators can coexist if needed for different contexts
- The component automatically displays during SvelteKit page navigations via the \`navigating\` store
- The animation uses a randomized transform pattern for a more organic feel
- Default settings (3px height, 300ms delay, cubicInOut easing) provide a balanced user experience

## Theme Customization

The NetworkIndicator component uses a theme object that can be customized using the \`theme\` prop or by setting a global theme.

### Theme Structure

The theme object contains the following parts:
- **networkIndicator**: Main indicator bar styles

### Available Variants

**networkIndicator**:
- base: Base classes for indicator bar (positioned fixed at top)
- Variants:
  - color: 'primary' | 'secondary' | 'contrast' | 'surface' | 'danger' | 'success' | 'warning' | 'info' - Indicator color

### Usage Examples

**Basic Theme Override**:
\`\`\`svelte
<NetworkIndicator 
  theme={{
    networkIndicator: {
      base: 'fixed top-0 left-0 w-full z-[9999] rounded-xl',
      color: {
        primary: 'bg-primary shadow-primary'
      }
    }
  }}
/>
\`\`\`

**Custom Indicator Styling**:
\`\`\`svelte
<NetworkIndicator 
  color="success"
  theme={{
    networkIndicator: {
      base: 'fixed top-0 left-0 w-full z-[9999] shadow-lg',
      color: {
        success: 'bg-green-500 shadow-green-500'
      }
    }
  }}
/>
\`\`\`

**Global Theme Setting**:
\`\`\`svelte
<script>
  import { setNetworkIndicatorTheme } from 'svelai/network-indicator';
  
  setNetworkIndicatorTheme({
    networkIndicator: {
      base: 'fixed top-0 left-0 w-full z-[9999] origin-left rounded-xl',
      color: {
        contrast: 'bg-gray-900 shadow-gray-900',
        primary: 'bg-blue-500 shadow-blue-500'
      }
    }
  });
</script>
\`\`\`
`;
