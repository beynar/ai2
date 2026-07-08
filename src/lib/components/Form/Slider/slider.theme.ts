import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { type InferComponentTheme, cva } from '$lib/utils/cva/index.js';

const defaultInputContainer = cva({
	base: 'w-full rounded text-foreground-light transition-all flex items-center gap-3',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
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
		},
		size: {
			small: '',
			normal: '',
			large: ''
		},
		variant: {
			default: '',
			thick: ''
		},
		marks: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		marks: false
	},
	compoundVariants: [
		{ orientation: 'horizontal', marks: true, class: 'h-auto items-start' },
		{ variant: 'default', orientation: 'horizontal', size: 'small', marks: false, class: 'h-3.5' },
		{ variant: 'default', orientation: 'horizontal', size: 'normal', marks: false, class: 'h-4' },
		{ variant: 'default', orientation: 'horizontal', size: 'large', marks: false, class: 'h-5' },
		{ variant: 'thick', orientation: 'horizontal', size: 'small', marks: false, class: 'h-4' },
		{ variant: 'thick', orientation: 'horizontal', size: 'normal', marks: false, class: 'h-5' },
		{ variant: 'thick', orientation: 'horizontal', size: 'large', marks: false, class: 'h-6' }
	]
});

const defaultTrack = cva({
	base: 'relative touch-none select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-background',
	variants: {
		orientation: {
			horizontal: 'w-full min-w-40',
			vertical: 'h-56'
		},
		size: {
			small: '',
			normal: '',
			large: ''
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
		},
		variant: {
			default: '',
			thick: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal',
		color: 'primary',
		disabled: false,
		variant: 'default'
	},
	compoundVariants: [
		{ orientation: 'horizontal', variant: 'default', class: 'h-2' },
		{ orientation: 'vertical', variant: 'default', class: 'w-2' },
		{ orientation: 'horizontal', variant: 'thick', size: 'small', class: 'h-4' },
		{ orientation: 'horizontal', variant: 'thick', size: 'normal', class: 'h-5' },
		{ orientation: 'horizontal', variant: 'thick', size: 'large', class: 'h-6' },
		{ orientation: 'vertical', variant: 'thick', size: 'small', class: 'w-4' },
		{ orientation: 'vertical', variant: 'thick', size: 'normal', class: 'w-5' },
		{ orientation: 'vertical', variant: 'thick', size: 'large', class: 'w-6' }
	]
});

const defaultTrackBackground = cva({
	base: 'bg-foreground/15 absolute rounded-full',
	variants: {
		orientation: {
			horizontal: '',
			vertical: ''
		},
		variant: {
			default: '',
			thick: 'inset-0'
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		variant: 'default'
	},
	compoundVariants: [
		{
			orientation: 'horizontal',
			variant: 'default',
			class: 'inset-x-0 top-1/2 h-1.5 -translate-y-1/2'
		},
		{
			orientation: 'vertical',
			variant: 'default',
			class: 'inset-y-0 left-1/2 w-1.5 -translate-x-1/2'
		}
	]
});

const defaultRange = cva({
	base: 'absolute rounded-full bg-current',
	variants: {
		orientation: {
			horizontal: '',
			vertical: ''
		},
		size: {
			small: '',
			normal: '',
			large: ''
		},
		dragRange: {
			true: 'cursor-grab active:cursor-grabbing',
			false: ''
		},
		variant: {
			default: '',
			thick: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal',
		dragRange: false,
		variant: 'default'
	},
	compoundVariants: [
		{
			orientation: 'horizontal',
			variant: 'default',
			class: 'top-1/2 h-1.5 -translate-y-1/2'
		},
		{
			orientation: 'vertical',
			variant: 'default',
			class: 'left-1/2 w-1.5 -translate-x-1/2'
		},
		{
			orientation: 'horizontal',
			variant: 'thick',
			class: 'inset-y-0'
		},
		{
			orientation: 'vertical',
			variant: 'thick',
			class: 'inset-x-0'
		}
	]
});

const defaultThumb = cva({
	base: 'group absolute z-20 flex size-11 touch-none appearance-none items-center justify-center rounded-full border-0 bg-transparent p-0 outline-none',
	variants: {
		orientation: {
			horizontal: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
			vertical: 'left-1/2 -translate-x-1/2 translate-y-1/2'
		},
		size: {
			small: '',
			normal: '',
			large: ''
		},
		disabled: {
			true: 'cursor-not-allowed',
			false: 'cursor-grab active:cursor-grabbing'
		},
		color: {
			primary: '',
			secondary: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			foreground: '',
			background: ''
		},
		variant: {
			default: '',
			thick: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal',
		disabled: false,
		color: 'primary',
		variant: 'default'
	}
});

const defaultThumbHitbox = cva({
	base: 'absolute z-30 block touch-none rounded-full bg-transparent',
	variants: {
		orientation: {
			horizontal: 'top-1/2 -translate-x-1/2 -translate-y-1/2',
			vertical: 'left-1/2 -translate-x-1/2 translate-y-1/2'
		},
		size: {
			small: 'size-12',
			normal: 'size-14',
			large: 'size-16'
		},
		disabled: {
			true: 'pointer-events-none cursor-not-allowed',
			false: 'cursor-grab active:cursor-grabbing'
		},
		variant: {
			default: 'hidden',
			thick: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal',
		disabled: false,
		variant: 'default'
	}
});

const defaultThumbVisual = cva({
	base: 'pointer-events-none rounded-full border-2 border-background bg-current shadow-sm ring-offset-background transition-[box-shadow,transform] group-focus-visible:ring-2 group-focus-visible:ring-current group-focus-visible:ring-offset-2',
	variants: {
		orientation: {
			horizontal: '',
			vertical: ''
		},
		size: {
			small: 'size-3.5',
			normal: 'size-4',
			large: 'size-5'
		},
		color: {
			primary: '',
			secondary: '',
			danger: '',
			success: '',
			warning: '',
			info: '',
			foreground: '',
			background: ''
		},
		variant: {
			default: '',
			thick: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal',
		color: 'primary',
		variant: 'default'
	},
	compoundVariants: [
		{ variant: 'thick', class: 'border-0 shadow-none' },
		{ variant: 'thick', color: 'primary', class: 'bg-primary-contrast' },
		{ variant: 'thick', color: 'secondary', class: 'bg-secondary-contrast' },
		{ variant: 'thick', color: 'danger', class: 'bg-danger-contrast' },
		{ variant: 'thick', color: 'success', class: 'bg-success-contrast' },
		{ variant: 'thick', color: 'warning', class: 'bg-warning-contrast' },
		{ variant: 'thick', color: 'info', class: 'bg-info-contrast' },
		{ variant: 'thick', color: 'foreground', class: 'bg-foreground-contrast' },
		{ variant: 'thick', color: 'background', class: 'bg-background' },
		{ orientation: 'horizontal', variant: 'thick', size: 'small', class: 'h-3 w-5' },
		{ orientation: 'horizontal', variant: 'thick', size: 'normal', class: 'h-4 w-7' },
		{ orientation: 'horizontal', variant: 'thick', size: 'large', class: 'h-5 w-9' },
		{ orientation: 'vertical', variant: 'thick', size: 'small', class: 'h-5 w-3' },
		{ orientation: 'vertical', variant: 'thick', size: 'normal', class: 'h-7 w-4' },
		{ orientation: 'vertical', variant: 'thick', size: 'large', class: 'h-9 w-5' }
	]
});

const defaultValueLabels = cva({
	base: 'flex shrink-0 gap-1',
	variants: {
		orientation: {
			horizontal: 'flex-wrap items-center',
			vertical: 'items-center'
		},
		size: {
			small: '',
			normal: '',
			large: ''
		},
		variant: {
			default: '',
			thick: ''
		},
		marks: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		orientation: 'horizontal',
		size: 'normal',
		variant: 'default',
		marks: false
	},
	compoundVariants: [
		{ orientation: 'horizontal', marks: true, variant: 'default', class: 'mt-1 -translate-y-1/2' },
		{
			orientation: 'horizontal',
			marks: true,
			variant: 'thick',
			size: 'small',
			class: 'mt-2 -translate-y-1/2'
		},
		{
			orientation: 'horizontal',
			marks: true,
			variant: 'thick',
			size: 'normal',
			class: 'mt-2.5 -translate-y-1/2'
		},
		{
			orientation: 'horizontal',
			marks: true,
			variant: 'thick',
			size: 'large',
			class: 'mt-3 -translate-y-1/2'
		}
	]
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
			horizontal: 'mt-1.5 h-5 w-full',
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
	thumbHitbox: defaultThumbHitbox,
	thumbVisual: defaultThumbVisual,
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
