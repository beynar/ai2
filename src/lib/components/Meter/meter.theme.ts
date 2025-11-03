import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultMeter = cva({
	base: 'flex flex-col gap-4 relative',
	variants: {
		size: {
			small: 'gap-2',
			normal: 'gap-4',
			large: 'gap-6'
		}
	}
});

const defaultMeterHeader = cva({
	base: 'flex w-full items-center justify-between relative',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
		}
	}
});

const defaultMeterContainer = cva({
	base: 'block relative',
	variants: {
		first: {
			true: 'rounded-l-full'
		},
		last: {
			true: 'rounded-r-full'
		}
	}
});

const defaultMeterLabel = cva({
	base: 'text-sm text-contrast-lighter',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultMeterHelper = cva({
	base: 'text-sm text-contrast-lighter',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultMeterDescription = cva({
	base: 'text-contrast-lighter text-sm',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultMeterProgress = cva({
	base: 'appearance-none block w-full h-1 !border-none !bg-color overflow-hidden text-primary rounded-[inherit] ',
	variants: {
		size: {
			small: 'h-1',
			normal: 'h-2',
			large: 'h-3'
		}
	}
});

const defaultMeterTrack = cva({
	base: 'flex items-center justify-start bg-surface-lighter rounded-full relative',
	variants: {
		size: {
			small: 'h-1',
			normal: 'h-2',
			large: 'h-3'
		}
	}
});

const defaultMeterIndicator = cva({
	base: 'absolute whitespace-nowrap w-fit rounded px-1 py-0.5 text-xs text-color mx-auto left-0 right-0',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		position: {
			top: '-top-5',
			bottom: '-bottom-5'
		}
	},
	defaultVariants: {
		position: 'top'
	}
});

const defaultMeterStep = cva({
	base: 'flex whitespace-nowrap items-center justify-between w-full text-xs absolute text-contrast-muted h-fit px-1.5 py-0.5',
	variants: {
		size: {
			small: 'text-xs px-1 py-0',
			normal: 'text-base px-1.5 py-0.5',
			large: 'text-md px-2 py-1'
		},
		position: {
			top: '-top-8',
			bottom: '-bottom-8'
		}
	},
	defaultVariants: {
		position: 'top'
	}
});

const defaultMeterStepLabel = cva({
	base: 'absolute whitespace-nowrap text-xs text-contrast-light',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-base',
			large: 'text-md'
		},
		position: {
			top: 'top-0 left-1/2 -translate-x-1/2 ',
			center: 'top-1/2 left-1/2 -translate-x-1/2 ',
			bottom: 'bottom-0 left-1/2 -translate-x-1/2'
		}
	},
	defaultVariants: {
		position: 'top'
	}
});

export const meterTheme = {
	meter: defaultMeter,
	header: defaultMeterHeader,
	container: defaultMeterContainer,
	label: defaultMeterLabel,
	helper: defaultMeterHelper,
	description: defaultMeterDescription,
	progress: defaultMeterProgress,
	track: defaultMeterTrack,
	indicator: defaultMeterIndicator,
	step: defaultMeterStep,
	stepLabel: defaultMeterStepLabel
};

export type MeterTheme = typeof meterTheme;
export type MeterThemeProps = InferComponentTheme<MeterTheme>;
export const setMeterTheme = setComponentTheme<MeterTheme>('meter');
export const useMeterTheme = useComponentTheme('meter', meterTheme);

