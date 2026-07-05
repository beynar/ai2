import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultAlert = cva({
	base: 'relative w-full rounded-lg border px-4 py-3 text-sm flex gap-3 items-start',
	variants: {
		hasIcon: {
			true: '',
			false: ''
		},
		color: {
			primary: 'bg-primary text-primary-contrast border-primary',
			secondary: 'bg-secondary text-secondary-contrast border-secondary',
			foreground: 'bg-foreground text-foreground-contrast border-foreground',
			background: 'bg-background text-color-contrast border-background-muted',
			danger: 'bg-danger text-danger-contrast border-danger',
			success: 'bg-success text-success-contrast border-success',
			warning: 'bg-warning text-warning-contrast border-warning',
			info: 'bg-info text-info-contrast border-info'
		},
		variant: {
			solid: 'bg-color text-color-contrast border-color',
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
		color: 'background',
		variant: 'solid',
		size: 'normal',
		disabled: false
	},
	compoundVariants: [
		{
			color: 'background',
			variant: 'solid',
			class: 'bg-background border-background-muted'
		},
		{
			color: 'background',
			variant: 'outline',
			class: 'border-background-muted text-foreground'
		},
		{
			color: 'background',
			variant: 'soft',
			class: 'bg-background-lighter text-color-contrast'
		},
		{
			color: 'foreground',
			variant: 'outline',
			class: 'border-foreground/50'
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
	root: defaultAlert,
	prefix: defaultAlertPrefix,
	content: defaultAlertContent,
	title: defaultAlertTitle,
	description: defaultAlertDescription
};

export type AlertTheme = typeof alertTheme;
export type AlertThemeProps = InferComponentTheme<AlertTheme>;
export const setAlertTheme = setComponentTheme<AlertTheme>('alert');
export const useAlertTheme = useComponentTheme<AlertTheme>('alert', alertTheme);
