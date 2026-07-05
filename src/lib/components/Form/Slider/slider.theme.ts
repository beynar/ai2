import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInputContainer = cva({
	base: 'w-full rounded text-foreground-light transition-all flex items-center gap-3',
	variants: {
		size: {
			small: 'py-1.5 text-xs',
			normal: 'py-2 text-sm',
			large: 'py-2.5 text-base'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-50',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		disabled: false
	}
});

const defaultRoot = cva({
	base: 'grid w-full gap-2',
	variants: {
		orientation: {
			horizontal: '',
			vertical: 'w-auto justify-items-center'
		},
		size: {
			small: 'gap-1.5',
			normal: 'gap-2',
			large: 'gap-2.5'
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal'
	}
});

const defaultControl = cva({
	base: 'flex w-full gap-3',
	variants: {
		orientation: {
			horizontal: 'items-center',
			vertical: 'w-auto flex-col items-center'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

const defaultTrack = cva({
	base: 'relative touch-none select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-background',
	variants: {
		orientation: {
			horizontal: 'h-2 w-full min-w-40',
			vertical: 'h-56 w-2'
		},
		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			danger: 'text-danger',
			success: 'text-success',
			warning: 'text-warning',
			info: 'text-info',
			foreground: 'text-foreground',
			background: 'text-background-contrast'
		},
		disabled: {
			true: 'cursor-not-allowed opacity-60',
			false: 'cursor-pointer'
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		color: 'primary',
		disabled: false
	}
});

const defaultTrackBackground = cva({
	base: 'bg-foreground/15 absolute rounded-full',
	variants: {
		orientation: {
			horizontal: 'inset-x-0 top-1/2 h-1.5 -translate-y-1/2',
			vertical: 'inset-y-0 left-1/2 w-1.5 -translate-x-1/2'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

const defaultRange = cva({
	base: 'absolute rounded-full bg-current',
	variants: {
		orientation: {
			horizontal: 'top-1/2 h-1.5 -translate-y-1/2',
			vertical: 'left-1/2 w-1.5 -translate-x-1/2'
		},
		dragRange: {
			true: 'cursor-grab active:cursor-grabbing',
			false: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		dragRange: false
	}
});

const defaultThumb = cva({
	base: 'absolute z-20 rounded-full border-2 border-background bg-current shadow-sm outline-none ring-offset-background transition-[box-shadow,transform] focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2',
	variants: {
		orientation: {
			horizontal: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
			vertical: 'left-1/2 -translate-x-1/2 translate-y-1/2'
		},
		size: {
			small: 'size-3.5',
			normal: 'size-4',
			large: 'size-5'
		},
		disabled: {
			true: 'cursor-not-allowed',
			false: 'cursor-grab active:cursor-grabbing'
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal',
		disabled: false
	}
});

const defaultValueLabels = cva({
	base: 'flex shrink-0 gap-1',
	variants: {
		orientation: {
			horizontal: 'flex-wrap items-center',
			vertical: 'items-center'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

const defaultValueLabel = cva({
	base: 'border-background-muted bg-background text-foreground inline-flex shrink-0 items-center justify-center rounded-full border font-medium leading-none tabular-nums',
	variants: {
		size: {
			small: 'min-w-8 px-2 py-1 text-xs',
			normal: 'min-w-10 px-2.5 py-1 text-xs',
			large: 'min-w-12 px-3 py-1.5 text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultMarks = cva({
	base: 'relative',
	variants: {
		orientation: {
			horizontal: 'h-5 w-full',
			vertical: 'absolute inset-y-0 left-full ml-3 w-16'
		},
		size: {
			small: 'text-xs',
			normal: 'text-xs',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal'
	}
});

const defaultMark = cva({
	base: 'absolute flex text-center',
	variants: {
		orientation: {
			horizontal: 'top-0 -translate-x-1/2 flex-col items-center gap-1',
			vertical: 'left-0 -translate-y-1/2 items-center gap-2'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

const defaultMarkDot = cva({
	base: 'bg-background-muted size-1.5 shrink-0 rounded-full'
});

const defaultMarkLabel = cva({
	base: 'text-foreground-muted leading-none whitespace-nowrap tabular-nums'
});

export const sliderTheme = {
	inputContainer: defaultInputContainer,
	root: defaultRoot,
	control: defaultControl,
	track: defaultTrack,
	trackBackground: defaultTrackBackground,
	range: defaultRange,
	thumb: defaultThumb,
	valueLabels: defaultValueLabels,
	valueLabel: defaultValueLabel,
	marks: defaultMarks,
	mark: defaultMark,
	markDot: defaultMarkDot,
	markLabel: defaultMarkLabel
};

export type SliderTheme = typeof sliderTheme;
export type SliderThemeProps = InferComponentTheme<SliderTheme>;
export const setSliderTheme = setComponentTheme<SliderTheme>('slider');
export const useSliderTheme = useComponentTheme('slider', sliderTheme);
