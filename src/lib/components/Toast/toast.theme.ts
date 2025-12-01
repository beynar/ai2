import type { FSOParams, FSOProps } from '$lib/transitions/transition.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import type { ToastPosition } from './toast.state.svelte.js';

const defaultToast = cva({
	base: 'cursor-default absolute pointer-events-auto bg-surface-light border border-surface-lighter text-contrast duration-500 max-w-[300px] px-2 py-1.5 flex items-center justify-between gap-2 rounded-md min-w-[250px]',
	variants: {
		richColors: {
			true: 'bg-color-muted border-color-light text-color',
			false: ''
		},
		color: {
			primary: '',
			secondary: '',
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			surface: ''
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
			color: 'contrast',
			class: 'bg-contrast text-surface'
		},
		{
			richColors: true,
			color: 'surface',
			class: 'bg-surface text-contrast  border-surface-muted'
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
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			surface: 'text-contrast'
		},
		richColors: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'contrast',
			class: 'text-surface bg-contrast'
		}
	]
});

const defaultToastCloseIcon = cva({
	base: 'absolute aspect-square leading-none flex items-center justify-center size-4 rounded-full border border-surface-lighter bg-surface-light -top-1.5 -right-1.5',
	variants: {
		richColors: {
			true: 'bg-color-muted border border-color-light text-color',
			false: ''
		},
		color: {
			primary: '',
			secondary: '',
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			surface: ''
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'contrast',
			class: 'text-surface bg-contrast'
		},
		{
			richColors: true,
			color: 'surface',
			class: 'bg-surface text-contrast border-surface-muted'
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
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			surface: ''
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
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			surface: ''
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
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			surface: 'text-contrast'
		},
		richColors: {
			true: '',
			false: ''
		}
	},
	compoundVariants: [
		{
			richColors: true,
			color: 'contrast',
			class: 'text-surface'
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
			contrast: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			surface: ''
		},
		richColors: {
			true: '',
			false: ''
		}
	}
});

const toastTheme = {
	toast: defaultToast,
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
export const useToastTheme = useComponentTheme('toast', toastTheme);

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
