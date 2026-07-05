import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultBadge = cva({
	base: 'rounded-full flex items-center justify-center bg-color text-color-contrast absolute z-10',
	variants: {
		size: {
			small: 'px-1 text-sm h-4 min-w-4',
			normal: 'px-1.5 text-base h-5 min-w-5',
			large: 'px-2 text-md h-6 min-w-6'
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
			solid: 'text-color-contrast',
			outline: 'bg-opacity-0 text-color border-color border',
			soft: 'bg-color/20 text-color'
		},
		position: {
			topRight: '-top-2 -right-2',
			topLeft: '-top-2 -left-2',
			bottomRight: '-bottom-2 -right-2',
			bottomLeft: '-bottom-2 -left-2'
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
