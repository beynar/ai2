import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

const defaultCard = cva({
	base: 'bg-background text-foreground flex flex-col rounded-xl transition-all tabular-nums raised-sm',
	variants: {
		size: {
			small: 'py-2 gap-2',
			normal: 'py-4 gap-4',
			large: 'py-6 gap-6'
		},
		color: {
			primary: 'bg-primary text-primary-contrast border-primary',
			secondary: 'bg-secondary text-secondary-contrast border-secondary',
			foreground: 'bg-foreground text-foreground-contrast border-foreground',
			background: 'bg-background text-color-contrast border-background-muted',
			danger: 'bg-danger text-danger-contrast border-danger',
			success: 'bg-success text-success-contrast border-success',
			warning: 'bg-warning text-warning-contrast border-warning',
			info: 'bg-info text-info-contrast border-info'
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
		color: 'background',
		variant: 'solid',
		disabled: false
	},
	compoundVariants: [
		{
			color: 'background',
			variant: 'solid',
			class: 'bg-background'
		},
		{
			color: 'background',
			variant: 'outline',
			class: 'border-background text-foreground'
		},
		{
			color: 'background',
			variant: 'soft',
			class: 'bg-background-lighter text-color-contrast'
		},
		{
			color: 'foreground',
			variant: 'outline',
			class: 'border-foreground/50'
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
			solid: 'text-color-contrast',
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
	base: 'text-foreground-muted',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		},
		variant: {
			solid: 'text-color-contrast/70',
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
			true: 'border-t border-background-muted',
			false: ''
		},
		hasBorderBottom: {
			true: 'border-b border-background-muted',
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
