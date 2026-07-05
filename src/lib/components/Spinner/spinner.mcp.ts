export const spinnerDescription = `
# Spinner Component

The Spinner component is a standalone indeterminate loading indicator. It uses the global \`.ui-spinner\` engine from the Svelai Tailwind plugin, so applications can change the spinner animation from theme configuration without changing component markup.

## Basic Usage

\`\`\`svelte
<Spinner />
\`\`\`

## Props

- **size**: 'small' | 'normal' | 'large' (default: 'normal')
  - Controls indicator size and label typography.
- **color**: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'foreground' | 'background' (default: 'foreground')
  - Applies a theme color token to the indicator.
- **text**: string | Snippet
  - Optional visible loading text rendered after the indicator.
- **children**: Snippet
  - Rich visible label content. When provided, it replaces \`text\`.
- **label**: string (default: 'Loading')
  - Accessible label used when no visible text is rendered.
- **decorative**: boolean (default: false)
  - Removes status semantics and hides the spinner from assistive technology.
- **class**: string
  - Additional classes for the root element.
- **theme**: SpinnerThemeProps
  - Per-instance theme overrides.

## Examples

### Icon-only Spinner

\`\`\`svelte
<Spinner label="Loading results" />
\`\`\`

### Spinner With Text

\`\`\`svelte
<Spinner text="Loading results" />
\`\`\`

### Semantic Colors

\`\`\`svelte
<div class="flex items-center gap-3">
	<Spinner color="primary" />
	<Spinner color="success" />
	<Spinner color="danger" />
</div>
\`\`\`

### Decorative Spinner

\`\`\`svelte
<button aria-busy="true">
	<Spinner decorative size="small" />
	Saving
</button>
\`\`\`

## Accessibility

- The component renders \`role="status"\` and \`aria-live="polite"\` by default.
- When no visible text is provided, \`label\` becomes the accessible name.
- Use \`decorative\` when another nearby element already announces the loading state.

## Theme Customization

The theme object contains three parts:

- **root**: root inline-flex wrapper
- **indicator**: animated \`.ui-spinner\` element
- **label**: visible text wrapper

\`\`\`svelte
<script>
	import { setSpinnerTheme } from 'svelai/spinner';

	setSpinnerTheme({
		indicator: {
			size: {
				normal: '[--spinner-size:1.5rem]'
			}
		}
	});
</script>
\`\`\`
`;
