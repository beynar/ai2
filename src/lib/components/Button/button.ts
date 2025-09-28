import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type ButtonVariant = 'solid' | 'outline' | 'soft' | 'ghost' | 'link';
export type ButtonPrimitiveProps<Payload extends Record<string, any> | undefined = undefined> =
	WithAttachments<
		WithSlot<
			{
				payload?: Payload;
				ref?: HTMLElement | null;
				href?: string;
				loading?: boolean;
				squared?: boolean;
				color?: Colors;
				variant?: ButtonVariant;
				size?: Sizes;
				fullWidth?: boolean;
				disabled?: boolean;
				onClick?: ((payload: Payload | undefined) => void) | null | undefined;
				onenter?: ((payload: Payload | undefined) => void) | null | undefined;
				onleave?: ((payload: Payload | undefined) => void) | null | undefined;
				/**
				 * The class name of the button. First element that the component outputs in the DOM.
				 */
				class?: string;
				target?: string;
				rel?: string;
				as?: 'string';
				theme?: InferComponentTheme<typeof buttonTheme>;
			},
			'suffix' | 'prefix' | 'children',
			Payload
		>
	>;

export type ButtonProps<Payload extends Record<string, any> | undefined = undefined> = Omit<
	ButtonPrimitiveProps<Payload>,
	'as'
>;

const defaultButton = cva({
	base: 'rounded cursor-pointer inline-flex whitespace-nowrap items-center justify-center relative transition-all duration-100 ease-in-out transform-origin-center overflow-hidden outline-none text-sm leading-[1.5rem]',
	variants: {
		size: {
			small: 'px-2.5 text-sm leading-4 h-6 gap-1',
			normal: 'px-4 py-2 h-8 text-base gap-2',
			large: 'px-6 py-2.5 text-md leading-7 h-9 gap-2.5'
		},
		color: {
			surface: 'bg-surface-dark text-color-fg',
			primary: 'bg-primary text-primary-fg',
			secondary: 'bg-secondary text-secondary-fg',
			contrast: 'bg-contrast text-contrast-fg',
			danger: 'bg-danger text-danger-fg',
			success: 'bg-success text-success-fg',
			warning: 'bg-warning text-warning-fg',
			info: 'bg-info text-info-fg'
		},
		variant: {
			solid: 'bg-color text-color-fg hover:bg-color/90 active:bg-color/80',
			outline: 'bg-color/0 border border-color hover:bg-color/10 text-color active:bg-color/20',
			soft: 'text-color hover:bg-color/30  bg-color-muted active:bg-color/20',
			ghost: 'text-color hover:bg-color-muted bg-color/0 active:bg-color-muted/70',
			link: 'bg-transparent hover:bg-opacity-60 text-color hover:underline active:bg-color-muted/60'
		},
		loading: {
			true: 'cursor-default pointer-events-none',
			false: null
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed',
			false: null
		},
		squared: {
			true: 'p-1 aspect-square',
			false: null
		},
		fullWidth: {
			true: '!w-full flex-1 max-w-full'
		}
	},
	defaultVariants: {
		color: 'contrast',
		variant: 'solid',
		size: 'normal'
	},
	compoundVariants: [
		{
			color: 'surface',
			variant: 'outline',
			class: 'border-surface-muted text-contrast hover:bg-surface-lighter'
		},
		{
			color: 'surface',
			variant: 'solid',
			class: 'active:bg-surface-light'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg hover:bg-surface-light'
		},
		{
			color: 'contrast',
			variant: 'ghost',
			class: 'hover:bg-contrast-muted/20 active:bg-contrast-muted/20'
		},
		{
			color: 'surface',
			variant: 'ghost',
			class: 'active:bg-surface-muted/10 text-surface-muted hover:bg-surface-muted/20'
		},
		{
			color: 'contrast',
			variant: 'link',
			class: 'active:bg-contrast-muted/10 text-contrast'
		},
		{
			color: 'surface',
			variant: 'link',
			class: 'active:bg-surface-muted/10 text-surface-muted'
		}
	]
});

const defaultButtonPrefix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultButtonSuffix = cva({
	base: 'max-w-6 max-h-6',
	variants: {
		size: {
			normal: 'max-w-6 max-h-6',
			large: 'max-w-7 max-h-7',
			small: 'max-w-4 max-h-4'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const buttonStructure = `
<Button>
	<Prefix />
	<Children />
	<Suffix />
</Button>
`;

export const buttonTheme = {
	button: defaultButton,
	prefix: defaultButtonPrefix,
	suffix: defaultButtonSuffix
};

export const agent = `
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
- **onenter**: (payload?: Payload) => void - Pointer enter event handler
- **onleave**: (payload?: Payload) => void - Pointer leave event handler

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
		<Icon name="plus" />
	{/snippet}
	Add Item
</Button>

<Button squared>
	{#snippet prefix()}
		<Icon name="settings" />
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
