import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

// Vega look: a quiet surface (subtle ring + shadow-xs instead of a heavy raised
// shadow), medium-weight title, muted description. `size` scales typography
// only; `density` owns paddings and gaps ('large' matches vega's default
// 6-scale, 'normal' its sm 4-scale).
const defaultCard = cva({
	base: 'group/card text-foreground flex flex-col rounded-xl tabular-nums transition-all',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		density: {
			small: 'py-3 gap-3',
			normal: 'py-4 gap-4',
			large: 'py-6 gap-6'
		},
		// The color itself flows through the data-color attribute (bg-color /
		// ring-color / text-color-contrast resolve against it); the axis stays for
		// per-color theme overrides.
		color: {
			primary: '',
			secondary: '',
			foreground: '',
			background: '',
			danger: '',
			success: '',
			warning: '',
			info: ''
		},
		// Text color follows the SURFACE: contrast tone on a solid color fill,
		// plain foreground on transparent/tinted surfaces (contrast text there is
		// unreadable — it's meant for a color-filled background).
		variant: {
			solid: 'bg-color text-color-contrast ring-1 ring-foreground/10 shadow-xs',
			outline: 'bg-transparent text-foreground ring-1 ring-color',
			soft: 'bg-color-muted text-foreground',
			// No ! on bg-transparent: it would also defeat the clickable hover bg.
			ghost: 'bg-transparent text-foreground'
		},
		// Internal: set when the card has an onClick or href — interactive cards
		// get cursor, hover, press and keyboard-focus treatment.
		clickable: {
			true: 'state-layer cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:translate-y-px',
			false: ''
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed *:pointer-events-none',
			false: null
		}
	},
	defaultVariants: {
		size: 'normal',
		density: 'normal',
		color: 'background',
		variant: 'solid',
		clickable: false,
		disabled: false
	},
	compoundVariants: [
		// Solid cards also lift through border/shadow; the shared state layer owns
		// transient fill feedback for every clickable surface.
		{ clickable: true, variant: 'solid', class: 'hover:ring-foreground/25 hover:shadow-sm' },
		// Neutral card: an elevated surface distinct from the page background
		// (bg-background would blend in, especially in dark mode).
		{
			color: 'background',
			variant: 'solid',
			class: 'bg-background-light text-foreground'
		},
		{
			color: 'background',
			variant: 'outline',
			class: 'ring-foreground/15 text-foreground'
		},
		{
			color: 'background',
			variant: 'soft',
			class: 'bg-background-lighter text-foreground'
		},
		{
			color: 'foreground',
			variant: 'outline',
			class: 'ring-foreground/50'
		}
	]
});

const defaultCardHeader = cva({
	base: 'grid auto-rows-min items-start',
	variants: {
		density: {
			small: 'px-3 gap-0.5',
			normal: 'px-4 gap-1',
			large: 'px-6 gap-1.5'
		},
		hasAction: {
			true: 'grid-cols-[1fr_auto]',
			false: ''
		},
		hasBorder: {
			true: '',
			false: ''
		},
		variant: {
			solid: '',
			outline: '',
			soft: '',
			ghost: ''
		}
	},
	defaultVariants: {
		density: 'normal',
		hasAction: false,
		hasBorder: false
	}
});

const defaultCardTitle = cva({
	base: 'font-medium leading-normal',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-base',
			large: 'text-lg'
		},
		variant: {
			solid: 'text-color-contrast group-data-[color=background]/card:text-foreground',
			outline: 'text-color group-data-[color=background]/card:text-foreground',
			soft: 'text-color group-data-[color=background]/card:text-foreground',
			ghost: 'text-color group-data-[color=background]/card:text-foreground'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCardDescription = cva({
	base: 'text-foreground-muted leading-normal',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		variant: {
			solid: 'text-color-contrast/70 group-data-[color=background]/card:text-foreground-muted',
			outline: '',
			soft: '',
			ghost: ''
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCardAction = cva({
	base: 'col-start-2 row-span-2 row-start-1 self-start justify-self-end'
});

const defaultCardContent = cva({
	base: '',
	variants: {
		density: {
			small: 'px-3',
			normal: 'px-4',
			large: 'px-6'
		},
		hasBorderTop: {
			true: 'border-t border-background-muted',
			false: ''
		},
		hasBorderBottom: {
			true: 'border-b border-background-muted',
			false: ''
		}
	},
	defaultVariants: {
		density: 'normal'
	},
	compoundVariants: [
		{ hasBorderTop: true, density: 'small', class: 'pt-3' },
		{ hasBorderTop: true, density: 'normal', class: 'pt-4' },
		{ hasBorderTop: true, density: 'large', class: 'pt-6' },
		{ hasBorderBottom: true, density: 'small', class: 'pb-3' },
		{ hasBorderBottom: true, density: 'normal', class: 'pb-4' },
		{ hasBorderBottom: true, density: 'large', class: 'pb-6' }
	]
});

const defaultCardFooter = cva({
	base: 'flex flex-wrap items-center',
	variants: {
		density: {
			small: 'px-3 gap-2',
			normal: 'px-4 gap-2',
			large: 'px-6 gap-3'
		},
		hasBorder: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		density: 'normal',
		hasBorder: false
	}
});

export const cardTheme = {
	root: defaultCard,
	header: defaultCardHeader,
	title: defaultCardTitle,
	description: defaultCardDescription,
	action: defaultCardAction,
	content: defaultCardContent,
	footer: defaultCardFooter
};

export type CardTheme = typeof cardTheme;
export type CardThemeProps = InferComponentTheme<CardTheme>;
export const setCardTheme = setComponentTheme<CardTheme>('card');
export const useCardTheme = useComponentTheme<CardTheme>('card', cardTheme);
