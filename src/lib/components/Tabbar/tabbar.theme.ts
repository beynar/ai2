import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultTabbar = cva({
	// relative: the shared active indicator is positioned against the root.
	base: 'relative flex w-full',
	variants: {
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col w-fit'
		},
		alignment: {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end'
		},
		size: {
			small: 'gap-0.5',
			normal: 'gap-1',
			large: 'gap-1.5'
		},
		variant: {
			underline: '',
			pill: 'w-fit rounded-full bg-background-muted/60 p-1'
		},
		fullWidth: {
			true: 'w-full',
			false: ''
		}
	},
	compoundVariants: [
		// A vertical pill track shouldn't be a stadium — soften to a large radius.
		{ variant: 'pill', orientation: 'vertical', class: 'rounded-2xl' },
		{ variant: 'pill', fullWidth: true, class: 'w-full' }
	],
	defaultVariants: {
		orientation: 'horizontal',
		alignment: 'start',
		size: 'normal',
		variant: 'underline'
	}
});

const defaultTab = cva({
	base: 'rounded relative cursor-pointer inline-flex items-center justify-center relative transition-all duration-150 ease-in-out outline-none whitespace-nowrap text-foreground/70',
	variants: {
		size: {
			small: 'px-2 py-1 text-xs gap-1',
			normal: 'px-3 py-1 text-sm gap-2 ',
			large: 'px-4 py-1 text-base gap-2.5 '
		},
		color: {
			background: '',
			primary: '',
			secondary: '',
			foreground: '',
			danger: '',
			success: '',
			warning: '',
			info: ''
		},
		active: {
			true: '',
			false: ''
		},
		focused: {
			true: 'bg-background-muted/50 text-foreground',
			false: ''
		},
		disabled: {
			true: 'opacity-50 cursor-not-allowed pointer-events-none',
			false: ''
		},
		orientation: {
			horizontal: '',
			vertical: 'w-full'
		},
		position: {
			top: '',
			bottom: '',
			left: '',
			right: ''
		},
		variant: {
			underline: '',
			pill: 'rounded-full'
		},
		fullWidth: {
			true: 'w-full',
			false: ''
		}
	},
	defaultVariants: {
		color: 'primary',
		size: 'normal',
		active: false,
		focused: false,
		disabled: false,
		orientation: 'horizontal',
		position: 'top',
		variant: 'underline'
	},
	compoundVariants: [
		// The moving indicator (see the `indicator` part) carries the underline/pill
		// visuals; the active tab itself only raises its text to full contrast.
		{ active: true, class: 'text-foreground' },
		{ variant: 'pill', focused: true, class: 'rounded-full' }
	]
});

// The single shared active indicator. It is measured onto the active tab by the
// component (inline transform/width/height) and slides there; `data-ready`
// enables the transition only after the first placement so mount doesn't animate
// from the origin.
const defaultTabIndicator = cva({
	base: 'pointer-events-none absolute left-0 top-0 will-change-transform data-[ready=true]:transition-[transform,width,height] data-[ready=true]:duration-300 data-[ready=true]:ease-[cubic-bezier(0.4,0,0.2,1)]',
	variants: {
		variant: {
			underline: 'rounded-full bg-color',
			pill: 'rounded-full bg-background shadow-sm border border-background-muted/50'
		}
	},
	defaultVariants: {
		variant: 'underline'
	}
});

const defaultTabPrefix = cva({
	base: '',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultTabSuffix = cva({
	base: '',
	variants: {
		size: {
			small: '',
			normal: '',
			large: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const tabbarTheme = {
	root: defaultTabbar,
	tab: defaultTab,
	indicator: defaultTabIndicator,
	prefix: defaultTabPrefix,
	suffix: defaultTabSuffix
};

export type TabbarTheme = typeof tabbarTheme;
export type TabbarThemeProps = InferComponentTheme<TabbarTheme>;
export const setTabbarTheme = setComponentTheme<TabbarTheme>('tabbar');
export const useTabbarTheme = useComponentTheme<TabbarTheme>('tabbar', tabbarTheme);
