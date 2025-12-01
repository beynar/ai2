export const themeDescription = `
# Theme Component

The Theme component provides a global theming system and state management for UI components. It manages color schemes, component themes, and global UI state like tooltips.

## Basic Usage

\`\`\`svelte
<!-- +layout.svelte -->
<script>
	import { Theme } from 'svelai/theme';
</script>

<Theme>
	<slot />
</Theme>
\`\`\`

## Theme State API

Access theme state using the \`useTheme()\` hook:

\`\`\`svelte
<script>
	import { useTheme } from 'svelai/theme';
	
	const theme = useTheme();
</script>
\`\`\`

## Theme Methods

### Tooltip Management
- **showTooltip(config)** - Display a tooltip
  - config: { ref, content, position?, size?, color?, offset?, class?, transition? }
- **hideTooltip()** - Hide current tooltip
- **tooltip** - Current tooltip state (reactive)

### Theme Customization
- **setComponentTheme(componentName, theme)** - Override component theme
- **getComponentTheme(componentName)** - Get component theme

## Props

### Theme Component Props
- **colorScheme**: 'light' | 'dark' | 'auto' (default: 'auto')
  - Controls the color scheme of the application
- **children**: Snippet - App content
- **class**: string - Additional CSS classes

## Examples

### Basic Theme Setup
\`\`\`svelte
<!-- +layout.svelte -->
<Theme>
	<nav><!-- Navigation --></nav>
	<main>
		<slot />
	</main>
	<Tooltip />
</Theme>
\`\`\`

### Dark Mode Toggle
\`\`\`svelte
<script>
	import { useTheme } from 'svelai/theme';
	
	const theme = useTheme();
	let colorScheme = $state('light');
</script>

<Theme colorScheme={colorScheme}>
	<Button onClick={() => colorScheme = colorScheme === 'light' ? 'dark' : 'light'}>
		Toggle Theme
	</Button>
	
	<slot />
</Theme>
\`\`\`

### Using Theme State
\`\`\`svelte
<script>
	const theme = useTheme();
	
	// Access current tooltip
	$effect(() => {
		console.log('Current tooltip:', theme.tooltip);
	});
</script>
\`\`\`

### Custom Component Themes
\`\`\`svelte
<script>
	import { setButtonTheme } from 'svelai/button';
	
	// Override button theme globally
	setButtonTheme({
		button: {
			base: 'custom-button-class',
			variants: {
				// ... custom variants
			}
		}
	});
</script>
\`\`\`

### Tooltip Integration
\`\`\`svelte
<script>
	const theme = useTheme();
	let buttonRef;
</script>

<Button 
	bind:ref={buttonRef}
	onenter={() => theme.showTooltip({
		ref: buttonRef,
		content: 'Button tooltip'
	})}
	onleave={() => theme.hideTooltip()}
>
	Hover Me
</Button>
\`\`\`

### Per-Component Theme Override
\`\`\`svelte
<script>
	const customButtonTheme = {
		button: {
			base: 'rounded-lg',
			variants: {
				color: {
					custom: 'bg-purple-500 text-white'
				}
			}
		}
	};
</script>

<Button theme={customButtonTheme} color="custom">
	Custom Themed Button
</Button>
\`\`\`

### System Color Scheme Detection
\`\`\`svelte
<!-- Auto detects user's system preference -->
<Theme colorScheme="auto">
	<slot />
</Theme>
\`\`\`

## Color Scheme Values

- **light** - Force light mode
- **dark** - Force dark mode
- **auto** - Detect from system preferences

## Theme Architecture

The theme system provides:
1. **Global color schemes** - Light/dark mode management
2. **Component themes** - Customizable styling for all components
3. **Shared state** - Tooltip, dialog, and other global UI state
4. **CSS variables** - Dynamic color tokens

## Theming Components

Each component can be themed using its dedicated theme setter:

\`\`\`svelte
import { setButtonTheme } from 'svelai/button';
import { setDialogTheme } from 'svelai/dialog';

setButtonTheme({ /* custom theme */ });
setDialogTheme({ /* custom theme */ });
\`\`\`

Or override per-instance:

\`\`\`svelte
<Button theme={customTheme}>Themed Button</Button>
\`\`\`

## Notes

- Theme component should wrap your entire app
- Only one Theme component should exist
- Color scheme preference is stored in localStorage
- System preference is detected via media queries
- Component themes cascade from global to local
- Tooltip state is managed globally for single instance
`;
