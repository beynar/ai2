import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultContainer = cva({
	base: 'inline-flex items-center rounded outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all',
	variants: {
		size: {
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-1.5'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultStar = cva({
	base: 'relative inline-flex shrink-0 items-center justify-center',
	variants: {
		size: {
			small: 'size-5',
			normal: 'size-6',
			large: 'size-7'
		},
		interactive: {
			true: 'cursor-pointer',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		interactive: true
	}
});

const defaultStarBase = cva({
	base: 'absolute inset-0 text-foreground-muted/40'
});

const defaultStarFill = cva({
	base: 'absolute inset-y-0 overflow-hidden',
	variants: {
		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			foreground: 'text-foreground',
			background: 'text-background',
			danger: 'text-danger',
			success: 'text-success',
			warning: 'text-warning',
			info: 'text-info'
		}
	},
	defaultVariants: {
		color: 'warning'
	}
});

export const ratingInputTheme = {
	container: defaultContainer,
	star: defaultStar,
	starBase: defaultStarBase,
	starFill: defaultStarFill
};

export type RatingInputTheme = typeof ratingInputTheme;
export type RatingInputThemeProps = InferComponentTheme<RatingInputTheme>;
export const setRatingInputTheme = setComponentTheme<RatingInputTheme>('ratingInput');
export const useRatingInputTheme = useComponentTheme('ratingInput', ratingInputTheme);
