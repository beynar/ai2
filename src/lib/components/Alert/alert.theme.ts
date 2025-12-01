import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultAlert = cva({
	base: 'relative w-full rounded-lg border px-4 py-3 text-sm flex gap-3 items-start',
	variants: {
		hasIcon: {
			true: '',
			false: ''
		},
		color: {
			primary: 'bg-primary text-primary-fg border-primary',
			secondary: 'bg-secondary text-secondary-fg border-secondary',
			contrast: 'bg-contrast text-contrast-fg border-contrast',
			surface: 'bg-surface text-color-fg border-surface-muted',
			danger: 'bg-danger text-danger-fg border-danger',
			success: 'bg-success text-success-fg border-success',
			warning: 'bg-warning text-warning-fg border-warning',
			info: 'bg-info text-info-fg border-info'
		},
		variant: {
			solid: 'bg-color text-color-fg border-color',
			outline: 'bg-transparent border-color text-color',
			soft: 'bg-color-muted text-color border-transparent'
		},
		size: {
			small: 'px-3 py-2 text-xs',
			normal: 'px-4 py-3 text-sm',
			large: 'px-5 py-4 text-base'
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed pointer-events-none',
			false: null
		},
		hasDescription: {
			true: '',
			false: ''
		},
		hasTitle: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		hasIcon: false,
		color: 'surface',
		variant: 'solid',
		size: 'normal',
		disabled: false
	},
	compoundVariants: [
		{
			color: 'surface',
			variant: 'solid',
			class: 'bg-surface border-surface-muted'
		},
		{
			color: 'surface',
			variant: 'outline',
			class: 'border-surface-muted text-contrast'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg'
		},
		{
			color: 'contrast',
			variant: 'outline',
			class: 'border-contrast/50'
		},
		{
			color: 'danger',
			variant: 'soft',
			class: '[&>svg]:text-danger *:data-[slot=alert-description]:text-danger/90'
		},

		{
			hasDescription: false,
			hasTitle: true,
			hasIcon: true,
			class: 'items-center'
		}
	]
});

const defaultAlertPrefix = cva({
	base: '[&>svg]:text-current translate-y-0.5',
	variants: {
		size: {
			small: '[&>svg]:size-4 ',
			normal: '[&>svg]:size-5 ',
			large: '[&>svg]:size-6 '
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAlertTitle = cva({
	base: 'line-clamp-2 font-medium',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-base',
			large: 'text-md'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultAlertContent = cva({
	base: 'flex min-w-0 flex-1 flex-col gap-0.5'
});

const defaultAlertDescription = cva({
	base: 'flex flex-col gap-1 text-sm [&_p]:leading-relaxed',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const alertTheme = {
	alert: defaultAlert,
	prefix: defaultAlertPrefix,
	content: defaultAlertContent,
	title: defaultAlertTitle,
	description: defaultAlertDescription
};

export type AlertTheme = typeof alertTheme;
export type AlertThemeProps = InferComponentTheme<AlertTheme>;
export const setAlertTheme = setComponentTheme<AlertTheme>('alert');
export const useAlertTheme = useComponentTheme('alert', alertTheme);
