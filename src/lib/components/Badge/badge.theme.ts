import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultBadge = cva({
	base: 'absolute z-10 box-border inline-flex w-fit max-w-fit min-w-min items-center justify-center whitespace-nowrap rounded-full border border-transparent bg-clip-padding font-medium transition-all',
	variants: {
		size: {
			small: 'h-5 gap-1 px-2 text-xs',
			normal: 'h-6 gap-1.5 px-2.5 text-xs',
			large: 'h-7 gap-1.5 px-3 text-sm'
		},
		color: {
			primary: 'bg-primary text-primary-contrast',
			secondary: 'bg-secondary text-secondary-contrast',
			foreground: 'bg-foreground text-foreground-contrast',
			background: 'bg-background-muted text-color-contrast',
			danger: 'bg-danger text-danger-contrast',
			success: 'bg-success text-success-contrast',
			warning: 'bg-warning text-warning-contrast',
			info: 'bg-info text-info-contrast'
		},
		variant: {
			solid: 'bg-color text-color-contrast',
			outline: 'border-color bg-color/0 text-color-readable',
			soft: 'bg-color-muted text-color-muted-readable'
		},
		position: {
			topRight: 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
			topLeft: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
			bottomRight: 'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
			bottomLeft: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2'
		}
	},
	defaultVariants: {
		color: 'primary',
		variant: 'solid',
		size: 'small',
		position: 'topRight'
	},
	compoundVariants: [
		{
			color: 'background',
			variant: 'outline',
			class: 'border-background-muted text-foreground'
		},
		{
			color: 'background',
			variant: 'soft',
			class: 'bg-background-lighter text-color-contrast'
		}
	]
});

export const badgeTheme = {
	root: defaultBadge
};

export type BadgeTheme = typeof badgeTheme;
export type BadgeThemeProps = InferComponentTheme<BadgeTheme>;
export const setBadgeTheme = setComponentTheme<BadgeTheme>('badge');
export const useBadgeTheme = useComponentTheme<BadgeTheme>('badge', badgeTheme);
