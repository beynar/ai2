import type { FSOParams, FSOProps } from '$lib/transitions/transition.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import type { ToastPosition } from './toast.state.svelte.js';

const defaultToast = cva({
	// Only the stack-reflow properties transition: a bare `duration-500` would fall
	// back to `transition-property: all` and animate colors/borders on theme flips
	// or hover too. (Toast.svelte listens for the `translate` transitionend.)
	base: 'cursor-default absolute pointer-events-auto bg-background-light border border-background-lighter text-foreground transition-[translate,scale,opacity] duration-500 max-w-[300px] px-2 py-1.5 flex items-center justify-between gap-2 rounded-md min-w-[250px]',
	variants: {
		richColors: {
			true: 'bg-color-muted border-color-light text-color',
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
			small: '',
			normal: '',
			large: ''
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'foreground',
			class: 'bg-foreground text-background'
		},
		{
			richColors: true,
			color: 'background',
			class: 'bg-background text-foreground  border-background-muted'
		}
	]
});

const defaultToastPrefix = cva({
	base: 'max-h-6 aspect-square text-color',
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
	]
});

const defaultToastCloseIcon = cva({
	base: 'absolute aspect-square leading-none flex items-center justify-center size-4 rounded-full border border-background-lighter bg-background-light -top-1.5 -right-1.5',
	variants: {
		richColors: {
			true: 'bg-color-muted border border-color-light text-color',
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
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'foreground',
			class: 'text-background bg-foreground'
		},
		{
			richColors: true,
			color: 'background',
			class: 'bg-background text-foreground border-background-muted'
		}
	]
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
	}
});

const defaultToastContent = cva({
	base: 'grid flex-1',
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
	}
});

const defaultToastTitle = cva({
	base: 'text-sm font-semibold text-color',
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
			class: 'text-background'
		}
	]
});
const defaultToastDescription = cva({
	base: 'text-xs',
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
	}
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
	}
};
