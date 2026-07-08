import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultTabbar = cva({
	// relative: the shared active indicator is positioned against the root.
	base: 'relative flex w-full',
	variants: {
		orientation: {
			// Scroll (no visible scrollbar) when the tabs overflow their track.
			horizontal: 'flex-row overflow-x-auto scrollbar-none',
			vertical: 'flex-col w-fit overflow-y-auto scrollbar-none'
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
	// focus-visible only matches keyboard-driven focus (arrows/Tab), so pointer
	// clicks never show the ring. ring-inset: the scroll container's overflow-y
	// (forced to auto by overflow-x) would otherwise clip an outset ring.
	// whitespace-nowrap + default flex min-width:auto make tabs overflow (and
	// scroll) rather than compress when they don't fit. transition-colors (NOT
	// transition-all) eases only the label colour as the indicator slides — scoped
	// to colour so it never lags a layout/transform change.
	base: 'rounded relative cursor-pointer inline-flex items-center justify-center outline-none whitespace-nowrap text-foreground/70 transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-color/45',
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
			// No background change on focus — it clashes with the sliding indicator
			// (especially the pill). Keyboard focus is still signalled by the text
			// lifting to full contrast.
			true: 'text-foreground',
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
		// visuals. Active-tab text: the underline leaves it on the page surface (full
		// contrast foreground); the pill sits on a `color`-filled surface, so its text
		// flips to that color's contrast tone.
		{ active: true, variant: 'underline', class: 'text-foreground' },
		{ active: true, variant: 'pill', class: 'text-color-contrast' }
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
			// Colored raised pill (driven by data-color on the indicator). color
			// 'background' gives the neutral segmented-control look.
			pill: 'rounded-full bg-color shadow-sm'
		}
	},
	defaultVariants: {
		variant: 'underline'
	}
});

// The static (CSS-only) indicator, rendered INSIDE the active tab for SSR and the
// pre-hydration window. It is positioned purely by layout (no JS measurement), so
// it renders at the correct place on the server. Once hydrated, the component
// swaps it for the measured `indicator` above at the identical spot.
const defaultTabStaticIndicator = cva({
	base: 'pointer-events-none absolute bg-color',
	variants: {
		variant: {
			underline: 'rounded-full',
			pill: 'inset-0 -z-10 rounded-full shadow-sm'
		},
		// Only consulted for the underline variant (pill covers the whole tab).
		position: {
			top: '',
			bottom: '',
			left: '',
			right: ''
		}
	},
	compoundVariants: [
		{ variant: 'underline', position: 'top', class: 'inset-x-0 bottom-0 h-0.5' },
		{ variant: 'underline', position: 'bottom', class: 'inset-x-0 top-0 h-0.5' },
		{ variant: 'underline', position: 'left', class: 'inset-y-0 right-0 w-0.5' },
		{ variant: 'underline', position: 'right', class: 'inset-y-0 left-0 w-0.5' }
	],
	defaultVariants: {
		variant: 'underline',
		position: 'top'
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
	staticIndicator: defaultTabStaticIndicator,
	prefix: defaultTabPrefix,
	suffix: defaultTabSuffix
};

export type TabbarTheme = typeof tabbarTheme;
export type TabbarThemeProps = InferComponentTheme<TabbarTheme>;
export const setTabbarTheme = setComponentTheme<TabbarTheme>('tabbar');
export const useTabbarTheme = useComponentTheme<TabbarTheme>('tabbar', tabbarTheme);
