import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

export const defaultTooltip = cva({
	// Visual only — positioning (fixed, z-index) lives on the Popover's wrapper. A `fixed` here
	// would take the panel out of flow and collapse the wrapper floating-ui measures.
	base: 'w-fit rounded raised isolate h-fit',
	variants: {
		size: {
			small: 'text-xs px-1 py-0.5',
			normal: 'text-sm px-1 py-0.5',
			large: 'text-base px-1.5 py-1'
		},
		color: {
			background: 'bg-background-light text-foreground',
			primary: 'bg-primary text-primary-contrast',
			secondary: 'bg-secondary text-secondary-contrast',
			foreground: 'bg-foreground text-foreground-contrast',
			success: 'bg-success text-success-contrast',
			warning: 'bg-warning text-warning-contrast',
			info: 'bg-info text-info-contrast',
			danger: 'bg-danger text-danger-contrast'
		}
	}
});

export const tooltipTheme = {
	root: defaultTooltip
};

export type TooltipTheme = typeof tooltipTheme;
export type TooltipThemeProps = InferComponentTheme<TooltipTheme>;
export const setTooltipTheme = setComponentTheme<TooltipTheme>('tooltip');
export const useTooltipTheme = useComponentTheme<TooltipTheme>('tooltip', tooltipTheme);
