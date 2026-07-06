import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultNetworkIndicator = cva({
	base: 'ui-network-indicator fixed top-0 left-0 w-full z-[9999] origin-left rounded-xl',
	variants: {
		variant: {
			bar: '',
			trail: 'overflow-hidden bg-transparent shadow-none',
			'trail-bounce': 'overflow-hidden bg-transparent shadow-none'
		},
		color: {
			primary: 'bg-primary shadow-primary',
			secondary: 'bg-secondary shadow-secondary',
			foreground: 'bg-foreground shadow-foreground',
			background: 'bg-background shadow-background',
			danger: 'bg-danger shadow-danger',
			success: 'bg-success shadow-success',
			warning: 'bg-warning shadow-warning',
			info: 'bg-info shadow-info'
		}
	},
	compoundVariants: [
		{
			variant: ['trail', 'trail-bounce'],
			color: [
				'primary',
				'secondary',
				'foreground',
				'background',
				'danger',
				'success',
				'warning',
				'info'
			],
			class: '!bg-transparent !shadow-none'
		}
	],
	defaultVariants: {
		variant: 'bar',
		color: 'foreground'
	}
});

const defaultNetworkIndicatorSegment = cva({
	base: 'absolute top-0 h-full rounded-full opacity-90 shadow-sm will-change-transform',
	variants: {
		color: {
			primary: 'bg-primary shadow-primary',
			secondary: 'bg-secondary shadow-secondary',
			foreground: 'bg-foreground shadow-foreground',
			background: 'bg-background shadow-background',
			danger: 'bg-danger shadow-danger',
			success: 'bg-success shadow-success',
			warning: 'bg-warning shadow-warning',
			info: 'bg-info shadow-info'
		}
	},
	defaultVariants: {
		color: 'foreground'
	}
});

export const networkIndicatorTheme = {
	root: defaultNetworkIndicator,
	segment: defaultNetworkIndicatorSegment
};

export type NetworkIndicatorTheme = typeof networkIndicatorTheme;
export type NetworkIndicatorThemeProps = InferComponentTheme<NetworkIndicatorTheme>;
export const setNetworkIndicatorTheme =
	setComponentTheme<NetworkIndicatorTheme>('networkIndicator');
export const useNetworkIndicatorTheme = useComponentTheme<NetworkIndicatorTheme>(
	'networkIndicator',
	networkIndicatorTheme
);
