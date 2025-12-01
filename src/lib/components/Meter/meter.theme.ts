import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultMeter = cva({
	base: 'flex flex-col relative',
	variants: {
		size: {
			small: 'gap-1',
			normal: 'gap-2',
			large: 'gap-3'
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
	base: 'flex items-center justify-start bg-surface-muted/50 rounded-full relative',
	variants: {
		size: {
			small: 'h-1',
			normal: 'h-2',
			large: 'h-3'
		},
		labelsPosition: {
			top: 'mt-4',
			bottom: 'mb-4',
			both: 'mt-4 mb-4'
		}
	}
});

const defaultMeterIndicator = cva({
	base: 'absolute whitespace-nowrap w-fit rounded text-color mx-auto left-0 right-0 leading-none',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-sm'
		},
		position: {
			top: 'bottom-full	',
			bottom: 'top-full'
		}
	},
	defaultVariants: {
		position: 'top'
	}
});

const defaultMeterLegend = cva({
	base: 'flex flex-col',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	}
});

const defaultMeterLegendItem = cva({
	base: 'flex items-center gap-2 [&[data-color="danger"]_*]:text-danger [&[data-color="warning"]_*]:text-warning [&[data-color="success"]_*]:text-success [&[data-color="info"]_*]:text-info',
	variants: {
		size: {
			small: 'gap-1.5',
			normal: 'gap-2',
			large: 'gap-2.5'
		}
	}
});

const defaultMeterLegendIcon = cva({
	base: '[&>svg]:size-full',
	variants: {
		size: {
			small: 'w-3 h-3',
			normal: 'w-4 h-4',
			large: 'w-5 h-5'
		}
	}
});

const defaultMeterLegendLabel = cva({
	base: 'text-contrast-lighter',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	}
});

const defaultMeterLegendPercentage = cva({
	base: 'text-contrast-lighter font-medium',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
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
	legend: defaultMeterLegend,
	legendItem: defaultMeterLegendItem,
	legendIcon: defaultMeterLegendIcon,
	legendLabel: defaultMeterLegendLabel,
	legendPercentage: defaultMeterLegendPercentage
};

export type MeterTheme = typeof meterTheme;
export type MeterThemeProps = InferComponentTheme<MeterTheme>;
export const setMeterTheme = setComponentTheme<MeterTheme>('meter');
export const useMeterTheme = useComponentTheme('meter', meterTheme);
