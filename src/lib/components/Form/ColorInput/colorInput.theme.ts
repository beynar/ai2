import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

// The color text input showing / accepting the value in the selected format (hex / rgb / hsl).
// Negative word-spacing halves the mono font's full-width spaces after rgb()/hsl() commas.
const defaultInput = cva({
	base: 'outline-none flex-1 w-full rounded bg-transparent resize-none placeholder:text-foreground-muted autofill:text-foreground-light appearance-none font-mono text-sm leading-normal [word-spacing:-0.5ch]',
	variants: {
		size: {
			small: 'text-xs h-5',
			normal: 'text-sm h-5',
			large: 'text-sm h-6'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

// The bordered field container wrapping the swatch and text input (mirrors the shared field frame).
const defaultInputContainer = cva({
	base: 'px-3 bg-background-light border border-background-muted rounded text-foreground w-full focus-within:ring-1 focus-within:ring-primary ring-0 transition-all flex items-center py-2',
	variants: {
		size: {
			small: 'py-1.5 text-xs',
			normal: 'py-1.5 text-sm',
			large: 'py-2 text-sm'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

// The popover panel; padding removed and width left to hug the embedded ColorPicker.
const defaultPopover = cva({
	base: 'w-auto max-w-[calc(100vw-2rem)] p-0'
});

// The color swatch rendered inside the leading FieldActionButton (the button primitive owns the
// hitbox, focus and disabled styles; its prefix slot owns the per-size dimensions, which the swatch
// fills). Filled state shows the current color over a CSS checkerboard (so alpha < 1 reads through);
// empty state is a neutral muted square.
const defaultSwatch = cva({
	base: 'relative size-full overflow-hidden rounded border border-background-muted',
	variants: {
		empty: {
			true: 'bg-background-muted',
			false: 'bg-[repeating-conic-gradient(#c7c7c7_0%_25%,#fff_0%_50%)] bg-[length:8px_8px]'
		}
	},
	defaultVariants: {
		empty: true
	}
});

export const colorInputTheme = {
	input: defaultInput,
	inputContainer: defaultInputContainer,
	popover: defaultPopover,
	swatch: defaultSwatch
};

export type ColorInputTheme = typeof colorInputTheme;
export type ColorInputThemeProps = InferComponentTheme<ColorInputTheme>;
export const setColorInputTheme = setComponentTheme<ColorInputTheme>('colorInput');
export const useColorInputTheme = useComponentTheme('colorInput', colorInputTheme);
