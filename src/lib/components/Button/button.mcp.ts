export const buttonDescription = `
# Button Component

The Button component is a flexible and customizable button element that supports various variants, sizes, colors, and interactive states.

## Basic Usage

\`\`\`svelte
<Button>Click me</Button>
<Button variant="outline">Outline Button</Button>
<Button color="primary" size="large">Large Primary Button</Button>
\`\`\`

## Props

### Core Props
- **variant**: 'solid' | 'outline' | 'soft' | 'ghost' | 'link' (default: 'solid')
  - solid: Filled background with color
  - outline: Transparent background with colored border
  - soft: Muted color background
  - ghost: Transparent background, shows background on hover
  - link: Text-only styling with underline on hover

- **color**: 'surface' | 'primary' | 'secondary' | 'contrast' | 'danger' | 'success' | 'warning' | 'info' (default: 'contrast')
  - Determines the color scheme of the button

- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - small: 24px height, smaller padding and text
  - normal: 32px height, standard padding
  - large: 36px height, larger padding and text

### Layout Props
- **fullWidth**: boolean (default: false) - Makes button take full width of container
- **squared**: boolean - Makes button square (aspect-ratio 1:1), auto-determined if only prefix/suffix is provided
- **disabled**: boolean (default: false) - Disables button interaction
- **loading**: boolean (default: false) - Shows loading state and disables interaction

### Link Props
- **href**: string - Makes button render as anchor tag
- **target**: string - Link target (e.g., "_blank")
- **rel**: string - Link relationship

### Event Props
- **onClick**: (payload?: Payload) => void - Click event handler
- **onEnter**: (payload?: Payload) => void - Pointer enter event handler
- **onLeave**: (payload?: Payload) => void - Pointer leave event handler

### Content Props (Slots)
- **children**: Snippet - Main button content
- **prefix**: Snippet - Content before main text (typically icons)
- **suffix**: Snippet - Content after main text (typically icons)
- **prefixProps**: object - Props passed to prefix slot
- **suffixProps**: object - Props passed to suffix slot
- **childrenProps**: object - Props passed to children slot

### Advanced Props
- **payload**: any - Data passed to event handlers and slots
- **ref**: HTMLElement - Reference to the button element
- **class**: string - Additional CSS classes
- **theme**: ComponentTheme - Custom theme overrides

## Structure

The button follows this DOM structure:
\`\`\`
<Button>
	<Prefix />    <!-- Optional prefix content -->
	<Children />  <!-- Main button content -->
	<Suffix />    <!-- Optional suffix content -->
</Button>
\`\`\`

## Examples

### Basic Buttons
\`\`\`svelte
<Button>Default Button</Button>
<Button variant="outline" color="primary">Primary Outline</Button>
<Button variant="soft" color="danger">Soft Danger</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
\`\`\`

### With Icons
\`\`\`svelte
<Button>
	{#snippet prefix()}
		{@render icon()}
	{/snippet}
	Add Item
</Button>

<Button squared>
	{#snippet prefix()}
		{@render icon()}
	{/snippet}
</Button>
\`\`\`

### Interactive States
\`\`\`svelte
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width Button</Button>
\`\`\`

### As Link
\`\`\`svelte
<Button href="/dashboard" target="_blank">Go to Dashboard</Button>
\`\`\`

### With Event Handlers
\`\`\`svelte
<script>
	let payload = { id: 123 };
	
	function handleClick(data) {
		console.log('Clicked with payload:', data);
	}
</script>

<Button {payload} onClick={handleClick}>
	Click with Payload
</Button>
\`\`\`

### Custom Styling
\`\`\`svelte
<Button class="shadow-lg border-2" color="primary" variant="outline">
	Custom Styled
</Button>
\`\`\`

## Accessibility

- Automatically sets appropriate ARIA roles (button/link)
- Supports keyboard navigation
- Disabled state prevents interaction
- Loading state provides visual feedback

## Notes

- When \`href\` is provided, renders as \`<a>\` tag, otherwise \`<button>\`
- \`squared\` is automatically determined when only prefix or suffix is provided without children
- All event handlers respect disabled state
- Icon sizing is automatically adjusted based on button size
`;
