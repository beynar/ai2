import {
	cva,
	setComponentTheme,
	useComponentTheme,
	type InferComponentTheme
} from '$lib/utils/cva/index.js';

const defaultProgressCircleRoot = cva({
	base: 'inline-flex shrink-0 items-center justify-center align-middle [--progress-circle-size:1.75rem]',
	variants: {
		size: {
			small: '[--progress-circle-size:1.25rem]',
			normal: '[--progress-circle-size:1.75rem]',
			large: '[--progress-circle-size:2.5rem]'
		},
		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			danger: 'text-danger',
			success: 'text-success',
			warning: 'text-warning',
			info: 'text-info',
			foreground: 'text-foreground',
			background: 'text-background'
		}
	},
	defaultVariants: {
		size: 'normal',
		color: 'primary'
	}
});

const defaultProgressCircleSvg = cva({
	base: 'size-[var(--progress-circle-size)] shrink-0 overflow-visible'
});

const defaultProgressCircleTrack = cva({
	base: 'stroke-foreground/20'
});

const defaultProgressCircleIndicator = cva({
	base: 'origin-center -rotate-90 stroke-current transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none'
});

export const progressCircleTheme = {
	root: defaultProgressCircleRoot,
	svg: defaultProgressCircleSvg,
	track: defaultProgressCircleTrack,
	indicator: defaultProgressCircleIndicator
};

export type ProgressCircleTheme = typeof progressCircleTheme;
export type ProgressCircleThemeProps = InferComponentTheme<ProgressCircleTheme>;
export const setProgressCircleTheme = setComponentTheme<ProgressCircleTheme>('progress-circle');
export const useProgressCircleTheme = useComponentTheme<ProgressCircleTheme>(
	'progress-circle',
	progressCircleTheme
);
