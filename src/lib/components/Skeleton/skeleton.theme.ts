import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultSkeleton = cva({
	base: 'animate-pulse rounded-md',
	variants: {
		color: {
			primary: 'bg-primary-light/50',
			secondary: 'bg-secondary-light/50',
			danger: 'bg-danger-light/50',
			success: 'bg-success-light/50',
			warning: 'bg-warning-light/50',
			info: 'bg-info-light/50',
			contrast: 'bg-contrast-muted/50',
			surface: 'bg-surface-muted/50'
		}
	},
	defaultVariants: {
		color: 'contrast'
	}
});

export const skeletonTheme = {
	skeleton: defaultSkeleton
};

export type SkeletonTheme = typeof skeletonTheme;
export type SkeletonThemeProps = InferComponentTheme<SkeletonTheme>;
export const setSkeletonTheme = setComponentTheme<SkeletonTheme>('skeleton');
export const useSkeletonTheme = useComponentTheme('skeleton', skeletonTheme);
