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
			// The soft "toast" look: muted tint, colored border and a legible on-tint
			// accent (`muted-readable` = dark text light-mode, light text dark-mode).
			soft: 'bg-color-muted text-color-muted-readable border-color/20'
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
			class: 'bg-background-lighter text-foreground border-background-muted'
		},
		{
			color: 'foreground',
			variant: 'outline',
			class: 'border-foreground/50'
		},
		{
			color: 'foreground',
			variant: 'soft',
			class: 'bg-foreground text-background border-transparent'
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
	base: 'shrink-0 [&>svg]:text-current',
	variants: {
		size: {
			small: '[&>svg]:size-4 ',
			normal: '[&>svg]:size-5 ',
			large: '[&>svg]:size-6 '
		},
		// Soft alerts show a vivid, saturated icon badge (like the toast) rather than
		// inheriting the muted-readable text color.
		variant: {
			solid: '',
			outline: '',
			soft: '[&>svg]:text-color'
		},
		// Nudge the icon to the first text line only in multi-line alerts. A title-only
		// alert centers its row (items-center), so no nudge — keeps icon/title/close level.
		hasDescription: {
			true: 'translate-y-0.5',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		variant: 'solid',
		hasDescription: false
	}
});

// Inline close button (top-right, aligned with the title). Subtle by default,
// tinting on hover — mirrors the toast's close affordance.
const defaultAlertClose = cva({
	base: 'state-layer shrink-0 -mr-1 flex items-center justify-center rounded-md leading-none transition-colors outline-none focus-visible:ring-2 focus-visible:ring-color/40',
	variants: {
		size: {
			small: 'size-5 [&>svg]:size-3.5',
			normal: 'size-6 [&>svg]:size-4',
			large: 'size-7 [&>svg]:size-5'
		},
		variant: {
			solid: 'text-current/60 hover:text-current',
			outline: 'text-current/60 hover:text-current',
			soft: 'text-color-muted-readable/70 hover:text-color-muted-readable'
		}
	},
	defaultVariants: {
		size: 'normal',
		variant: 'solid'
	}
});

const defaultAlertTitle = cva({
	base: 'line-clamp-2 font-medium',
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
	description: defaultAlertDescription,
	close: defaultAlertClose
};

export type AlertTheme = typeof alertTheme;
export type AlertThemeProps = InferComponentTheme<AlertTheme>;
export const setAlertTheme = setComponentTheme<AlertTheme>('alert');
export const useAlertTheme = useComponentTheme<AlertTheme>('alert', alertTheme);
