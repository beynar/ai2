import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultContainer = cva({
	base: 'relative flex items-center overflow-hidden gap-1'
});

const defaultSlider = cva({
	base: 'display-grid py-4 relative whitespace-nowrap overflow-x-auto overflow-y-clip scroll-behavior-smooth overscroll-behavior-x-contain inline-size-full max-inline-size-[100vw] box-border scrollbar-width-none'
});

const defaultNavigationButton = cva({
	base: 'rounded cursor-pointer absolute inline-flex items-center justify-center transition-all duration-100 ease-in-out outline-none border-none',
	variants: {
		size: {
			xs: 'w-5 h-5',
			sm: 'w-6 h-6',
			md: 'w-8 h-8',
			lg: 'w-9 h-9',
			xl: 'w-10 h-10',
			default: 'w-8 h-8'
		},
		color: {
			surface: 'text-surface-muted  active:bg-surface-muted/10',
			primary: 'text-primary ',
			secondary: 'text-secondary ',
			contrast: 'text-contrast /20',
			danger: 'text-danger ',
			success: 'text-success ',
			warning: 'text-warning ',
			info: 'text-info '
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed pointer-events-none',
			false: null
		},
		direction: {
			previous: 'left-0',
			next: 'right-0'
		}
	},
	defaultVariants: {
		color: 'primary',
		size: 'default'
	}
});

const defaultDots = cva({
	base: 'absolute w-fit mx-auto right-0 left-0 flex flex-1 translate-x-1/2 items-center gap-1 duration-300',
	variants: {
		size: {
			xs: 'gap-1',
			sm: 'gap-1',
			md: 'gap-1.5',
			lg: 'gap-2',
			xl: 'gap-2.5',
			default: 'gap-1'
		},
		position: {
			top: 'top-1 bottom-auto',
			bottom: 'bottom-1 top-auto',
			left: 'left-4 right-auto top-1/2 -translate-y-1/2 translate-x-0 flex-col',
			right: 'right-4 left-auto top-1/2 -translate-y-1/2 translate-x-0 flex-col'
		}
	},
	defaultVariants: {
		size: 'default',
		position: 'bottom'
	}
});

const defaultDot = cva({
	base: 'rounded-full transition-all cursor-pointer border-none outline-none',
	variants: {
		size: {
			xs: 'h-1 w-1',
			sm: 'h-1.5 w-1.5',
			md: 'h-2 w-2',
			lg: 'h-2.5 w-2.5',
			xl: 'h-3 w-3',
			default: 'h-2 w-2'
		},
		color: {
			primary: 'bg-primary',
			secondary: 'bg-secondary',
			contrast: 'bg-contrast',
			surface: 'bg-surface',
			danger: 'bg-danger',
			success: 'bg-success',
			warning: 'bg-warning',
			info: 'bg-info'
		},
		active: {
			true: 'ring-1 ring-color ring-offset-1',
			false: null
		}
	},
	defaultVariants: {
		color: 'primary',
		size: 'default',
		active: false
	}
});

export const carouselTheme = {
	container: defaultContainer,
	slider: defaultSlider,
	navigationButton: defaultNavigationButton,
	dots: defaultDots,
	dot: defaultDot
};

export type CarouselTheme = typeof carouselTheme;
export type CarouselThemeProps = InferComponentTheme<CarouselTheme>;
export const setCarouselTheme = setComponentTheme<CarouselTheme>('carousel');
export const useCarouselTheme = useComponentTheme('carousel', carouselTheme);
