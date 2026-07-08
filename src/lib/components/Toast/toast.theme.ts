import type { FSOParams, FSOProps } from '$lib/transitions/transition.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import type { ToastPosition } from './toast.state.svelte.js';

const defaultToast = cva({
	// Only the stack-reflow properties transition: a bare `duration-500` would fall
	// back to `transition-property: all` and animate colors/borders on theme flips
	// or hover too. (Toast.svelte listens for the `translate` transitionend.)
	base: 'cursor-default absolute pointer-events-auto bg-background-light border border-background-muted text-foreground shadow-lg transition-[translate,scale,opacity] duration-500 flex items-start justify-between',
	variants: {
		richColors: {
			// Soft tinted surface with a colored border (Sonner-style), not a heavy fill.
			// `muted-readable` is the accent pushed to a legible lightness ON the muted
			// tint — dark text in light mode, light text in dark mode — so danger etc.
			// stay readable in both. Plain `text-color` is too dark on the dark muted bg.
			true: 'bg-color-muted text-color-muted-readable border-color/20',
			false: ''
		},
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			background: ''
		},
		size: {
			small: 'gap-2 rounded-md px-2.5 py-2 min-w-[220px] max-w-[300px]',
			normal: 'gap-2.5 rounded-lg px-3 py-2.5 min-w-[260px] max-w-[340px]',
			large: 'gap-3 rounded-xl px-4 py-3 min-w-[300px] max-w-[400px]'
		},
		// Full screen-width bar flush to the top/bottom edge (overrides width & rounding).
		banner: {
			true: 'w-full min-w-0 max-w-none rounded-none border-x-0 items-center shadow-xl',
			false: ''
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'foreground',
			class: 'bg-foreground text-background border-transparent'
		},
		{
			richColors: true,
			color: 'background',
			class: 'bg-background text-foreground border-background-muted'
		}
	],
	defaultVariants: { size: 'normal', banner: false }
});

const defaultToastPrefix = cva({
	base: 'aspect-square flex items-center justify-center text-color',
	variants: {
		size: {
			small: 'size-4 [&_svg]:size-4',
			normal: 'size-5 [&_svg]:size-5',
			large: 'size-6 [&_svg]:size-6'
		},
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			background: 'text-foreground'
		},
		richColors: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'foreground',
			class: 'text-background bg-foreground'
		}
	],
	defaultVariants: { size: 'normal' }
});

// Inline, top-aligned close button (sits in the header row next to the title, not
// floating outside the toast). Subtle by default, tinting on hover.
const defaultToastCloseIcon = cva({
	base: 'shrink-0 -mr-1 -mt-0.5 flex items-center justify-center rounded-md leading-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-color/40',
	variants: {
		size: {
			small: 'size-4 [&_svg]:size-3',
			normal: 'size-5 [&_svg]:size-3.5',
			large: 'size-6 [&_svg]:size-4'
		},
		richColors: {
			true: 'text-color-muted-readable/70 hover:bg-color/15 hover:text-color-muted-readable',
			false: 'text-foreground-muted hover:bg-background-muted hover:text-foreground'
		},
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			background: ''
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'foreground',
			class: 'text-background/60 hover:bg-background/15 hover:text-background'
		},
		{
			richColors: true,
			color: 'background',
			class: 'text-foreground-muted hover:bg-foreground/10 hover:text-foreground'
		}
	],
	defaultVariants: { size: 'normal' }
});

// Trailing container for the toast's `actions` buttons.
const defaultToastActions = cva({
	base: 'flex shrink-0 items-center gap-1'
});

// Duration progress bar, pinned to the toast's bottom edge. `overflow-hidden` +
// `rounded-b-md` clip the inner bar to the toast's corner radius (the root itself
// can't be clipped — the close icon sits outside it).
const defaultToastProgress = cva({
	base: 'pointer-events-none absolute inset-x-0 bottom-0 h-1 overflow-hidden rounded-b-lg bg-color/15'
});

const defaultToastSuffix = cva({
	base: 'max-h-10',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		},
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			background: ''
		},
		richColors: {
			true: '',
			false: ''
		}
	},
	defaultVariants: { size: 'normal' }
});

const defaultToastContent = cva({
	base: 'grid flex-1',
	variants: {
		size: {
			small: 'gap-0',
			normal: 'gap-0.5',
			large: 'gap-1'
		},
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			background: ''
		},
		richColors: {
			true: '',
			false: ''
		}
	},
	defaultVariants: { size: 'normal' }
});

const defaultToastTitle = cva({
	base: 'font-semibold leading-tight',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			background: ''
		},
		// Non-rich: the semantic accent on the neutral surface. Rich: the legible
		// on-muted variant so it stays readable in dark mode.
		richColors: {
			true: 'text-color-muted-readable',
			false: 'text-color'
		}
	},
	compoundVariants: [
		{ richColors: false, color: 'background', class: 'text-foreground' },
		{ richColors: true, color: 'foreground', class: 'text-background' },
		{ richColors: true, color: 'background', class: 'text-foreground' }
	],
	defaultVariants: { size: 'normal' }
});
const defaultToastDescription = cva({
	base: 'leading-snug opacity-90',
	variants: {
		size: {
			small: 'text-[0.6875rem]',
			normal: 'text-xs',
			large: 'text-sm'
		},
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			background: ''
		},
		richColors: {
			true: '',
			false: ''
		}
	},
	defaultVariants: { size: 'normal' }
});

// The fixed fullscreen <dialog> hosting every toast. Resets the UA dialog styles
// (margins, border, padding, sizing) and lets pointer events fall through — the
// toasts themselves re-enable pointer-events.
const defaultToaster = cva({
	base: 'pointer-events-none fixed inset-0 z-[9999] m-0 h-full w-full max-h-none max-w-none overflow-hidden border-0 bg-transparent p-0'
});

const toastTheme = {
	toaster: defaultToaster,
	root: defaultToast,
	prefix: defaultToastPrefix,
	actions: defaultToastActions,
	progress: defaultToastProgress,
	suffix: defaultToastSuffix,
	content: defaultToastContent,
	closeIcon: defaultToastCloseIcon,
	title: defaultToastTitle,
	description: defaultToastDescription
};
export type ToastTheme = typeof toastTheme;
export type ToastThemeProps = InferComponentTheme<ToastTheme>;
export const setToastTheme = setComponentTheme<ToastTheme>('toast');
export const useToastTheme = useComponentTheme<ToastTheme>('toast', toastTheme);

export const defaultToastAnimation: Record<
	ToastPosition,
	{
		in?: FSOParams;
		out?: FSOParams;
	}
> = {
	'top-left': {
		in: {
			y: -100,
			x: -100,
			opacity: 0
		},
		out: {
			y: -100,
			x: -100,
			opacity: 0
		}
	},
	'top-right': {
		in: {
			y: -100,
			x: 100,
			opacity: 0
		},
		out: {
			y: -100,
			x: 100,
			opacity: 0
		}
	},
	'top-center': {
		in: {
			y: -100,
			opacity: 0
		},
		out: {
			y: -100,
			opacity: 0
		}
	},
	'bottom-left': {
		in: {
			y: 100,
			x: -100,
			opacity: 0
		},
		out: {
			y: 100,
			x: -100,
			opacity: 0
		}
	},
	'bottom-right': {
		in: {
			y: 100,
			x: 100,
			opacity: 0
		},
		out: {
			y: 100,
			x: 100,
			opacity: 0
		}
	},
	'bottom-center': {
		in: {
			y: 100,
			opacity: 0
		},
		out: {
			y: 100,
			opacity: 0
		}
	},
	'banner-top': {
		in: {
			y: '-100%',
			opacity: 0
		},
		out: {
			y: '-100%',
			opacity: 0
		}
	},
	'banner-bottom': {
		in: {
			y: '100%',
			opacity: 0
		},
		out: {
			y: '100%',
			opacity: 0
		}
	}
};
