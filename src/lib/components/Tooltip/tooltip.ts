import { cva } from '$lib/utils/cva.js';

export const defaultTooltip = cva({
	base: 'z-[+50] fixed w-fit rounded  raised isolate h-fit',
	variants: {
		size: {
			small: 'text-xs px-1 py-0.5',
			normal: 'text-sm  px-1 py-0.5 text-danger',
			large: 'text-base px-1.5 py-1'
		},
		color: {
			surface: 'bg-surface-light text-contrast',
			primary: 'bg-primary text-primary-fg',
			secondary: 'bg-secondary text-secondary-fg',
			contrast: 'bg-contrast text-contrast-fg',
			success: 'bg-success text-success-fg',
			warning: 'bg-warning text-warning-fg',
			info: 'bg-info text-info-fg',
			danger: 'bg-danger text-danger-fg'
		}
	}
});

export const tooltipTheme = {
	tooltip: defaultTooltip
};
