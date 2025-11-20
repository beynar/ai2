import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

const defaultCard = cva({
	base: 'bg-surface text-contrast flex flex-col rounded-xl transition-all tabular-nums raised-sm',
	variants: {
		size: {
			small: 'py-2 gap-2',
			normal: 'py-4 gap-4',
			large: 'py-6 gap-6'
		},
		color: {
			primary: 'bg-primary text-primary-fg border-primary',
			secondary: 'bg-secondary text-secondary-fg border-secondary',
			contrast: 'bg-contrast text-contrast-fg border-contrast',
			surface: 'bg-surface text-color-fg border-surface-muted',
			danger: 'bg-danger text-danger-fg border-danger',
			success: 'bg-success text-success-fg border-success',
			warning: 'bg-warning text-warning-fg border-warning',
			info: 'bg-info text-info-fg border-info'
		},
		variant: {
			solid: 'bg-color border-color shadow-sm',
			outline: 'bg-transparent border-color ',
			soft: 'bg-color-muted  border-transparent!',
			ghost: 'bg-transparent! border-transparent!'
		},
		disabled: {
			true: 'opacity-55 cursor-not-allowed *:pointer-events-none',
			false: null
		}
	},
	defaultVariants: {
		size: 'normal',
		color: 'surface',
		variant: 'solid',
		disabled: false
	},
	compoundVariants: [
		{
			color: 'surface',
			variant: 'solid',
			class: 'bg-surface'
		},
		{
			color: 'surface',
			variant: 'outline',
			class: 'border-surface text-contrast'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg'
		},
		{
			color: 'contrast',
			variant: 'outline',
			class: 'border-contrast/50'
		}
	]
});

const defaultCardHeader = cva({
	base: 'grid auto-rows-min items-start',
	variants: {
		size: {
			small: 'px-2 gap-1',
			normal: 'px-4 gap-2',
			large: 'px-6 gap-3'
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
		size: 'normal',
		hasAction: false,
		hasBorder: false
	}
});

const defaultCardTitle = cva({
	base: 'leading-none font-semibold',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-base',
			large: 'text-lg'
		},
		variant: {
			solid: 'text-color-fg',
			outline: 'text-color',
			soft: 'text-color',
			ghost: 'text-color'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultCardDescription = cva({
	base: 'text-contrast-muted',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		variant: {
			solid: 'text-color-fg/70',
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
		size: {
			small: 'px-2',
			normal: 'px-4',
			large: 'px-6'
		},
		hasBorder: {
			true: '',
			false: ''
		},
		hasBorderTop: {
			true: 'border-t border-surface-muted',
			false: ''
		},
		hasBorderBottom: {
			true: 'border-b border-surface-muted',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		hasBorder: false
	},
	compoundVariants: [
		{
			hasBorderTop: true,
			size: 'small',
			class: 'pt-2'
		},
		{
			hasBorderTop: true,
			size: 'normal',
			class: 'pt-4'
		},
		{
			hasBorderTop: true,
			size: 'large',
			class: 'pt-6'
		},
		{
			hasBorderBottom: true,
			size: 'small',
			class: 'pb-2'
		},
		{
			hasBorderBottom: true,
			size: 'normal',
			class: 'pb-4'
		},
		{
			hasBorderBottom: true,
			size: 'large',
			class: 'pb-6'
		}
	]
});

const defaultCardFooter = cva({
	base: 'flex flex-wrap items-center ',
	variants: {
		size: {
			small: 'px-2 gap-1 ',
			normal: 'px-4 gap-2 ',
			large: 'px-6 gap-3 '
		},
		hasBorder: {
			true: '',
			false: ''
		}
	},
	defaultVariants: {
		size: 'normal',
		hasBorder: false
	}
});

export const cardTheme = {
	card: defaultCard,
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
export const useCardTheme = useComponentTheme('card', cardTheme);
