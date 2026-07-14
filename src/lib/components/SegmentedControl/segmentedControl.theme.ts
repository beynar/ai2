import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';
import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';

const defaultSegmentedControl = cva({
	base: 'relative isolate inline-flex w-fit max-w-full items-center overflow-visible bg-background-muted/60 p-1',
	variants: {
		size: {
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-1.5'
		},
		variant: {
			normal: 'rounded-lg',
			pill: 'rounded-full'
		},
		disabled: {
			true: 'opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		variant: 'normal',
		disabled: false
	}
});

const defaultSegment = cva({
	base: "relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium text-foreground/70 outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/45 hover:text-foreground before:absolute before:top-1/2 before:-translate-y-1/2 before:content-[''] first-of-type:before:-left-1 last:before:-right-1",
	variants: {
		size: {
			small: 'gap-1 px-2 py-1 text-xs before:-right-px before:-left-px before:h-9 [&>svg]:size-3',
			normal:
				'gap-2 px-3 py-1 text-sm before:-right-0.5 before:-left-0.5 before:h-11 [&>svg]:size-3.5',
			large:
				'gap-2.5 px-4 py-1 text-base before:-right-[3px] before:-left-[3px] before:h-12 [&>svg]:size-4'
		},
		variant: {
			normal: 'rounded-md',
			pill: 'rounded-full'
		},
		selected: {
			true: 'text-color-contrast hover:text-color-contrast',
			false: ''
		},
		disabled: {
			true: 'pointer-events-none cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		variant: 'normal',
		selected: false,
		disabled: false
	}
});

const defaultIndicator = cva({
	base: 'pointer-events-none absolute top-0 left-0 bg-color shadow-sm will-change-transform data-[ready=true]:transition-[transform,width,height] data-[ready=true]:duration-300 data-[ready=true]:ease-[cubic-bezier(0.4,0,0.2,1)]',
	variants: {
		variant: {
			normal: 'rounded-md',
			pill: 'rounded-full'
		}
	},
	defaultVariants: {
		variant: 'normal'
	}
});

const defaultStaticIndicator = cva({
	base: 'pointer-events-none absolute inset-0 -z-10 bg-color shadow-sm',
	variants: {
		variant: {
			normal: 'rounded-md',
			pill: 'rounded-full'
		}
	},
	defaultVariants: {
		variant: 'normal'
	}
});

export const segmentedControlTheme = {
	root: defaultSegmentedControl,
	item: defaultSegment,
	indicator: defaultIndicator,
	staticIndicator: defaultStaticIndicator
};

export type SegmentedControlTheme = typeof segmentedControlTheme;
export type SegmentedControlThemeProps = InferComponentTheme<SegmentedControlTheme>;
export const setSegmentedControlTheme =
	setComponentTheme<SegmentedControlTheme>('segmentedControl');
export const useSegmentedControlTheme = useComponentTheme<SegmentedControlTheme>(
	'segmentedControl',
	segmentedControlTheme
);
