import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultNetworkIndicator = cva({
	base: 'fixed top-0 left-0 w-full z-[9999] origin-left rounded-xl',
	variants: {
		color: {
			primary: 'bg-primary shadow-primary',
			secondary: 'bg-secondary shadow-secondary',
			contrast: 'bg-contrast shadow-contrast',
			surface: 'bg-surface shadow-surface',
			danger: 'bg-danger shadow-danger',
			success: 'bg-success shadow-success',
			warning: 'bg-warning shadow-warning',
			info: 'bg-info shadow-info'
		}
	},
	defaultVariants: {
		color: 'contrast'
	}
});

export const networkIndicatorTheme = {
	networkIndicator: defaultNetworkIndicator
};

export type NetworkIndicatorTheme = typeof networkIndicatorTheme;
export type NetworkIndicatorThemeProps = InferComponentTheme<NetworkIndicatorTheme>;
export const setNetworkIndicatorTheme =
	setComponentTheme<NetworkIndicatorTheme>('networkIndicator');
export const useNetworkIndicatorTheme = useComponentTheme(
	'networkIndicator',
	networkIndicatorTheme
);
