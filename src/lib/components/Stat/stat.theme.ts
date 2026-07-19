import { setComponentTheme, useComponentTheme } from '$lib/utils/cva/index.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva/index.js';

// `size` scales typography, icons, and the radius tied to that scale; `density`
// owns paddings and gaps ('small' matches the old small spacing, 'large'
// the old large spacing).
const defaultStatRoot = cva({
	base: 'raised-sm grid grid-cols-[minmax(0,1fr)_auto] border tabular-nums transition-colors',
	variants: {
		size: {
			small: 'rounded-lg',
			normal: 'rounded-xl',
			large: 'rounded-xl'
		},
		density: {
			small: 'gap-x-3 gap-y-1 p-3',
			normal: 'gap-x-4 gap-y-1 p-4',
			large: 'gap-x-5 gap-y-1.5 p-5'
		},
		color: {
			primary: 'border-primary',
			secondary: 'border-secondary',
			foreground: 'border-foreground',
			background: 'border-background-muted',
			danger: 'border-danger',
			success: 'border-success',
			warning: 'border-warning',
			info: 'border-info'
		},
		variant: {
			solid: 'border-color bg-color text-color-contrast',
			outline: 'border-color bg-transparent text-color-readable',
			soft: 'border-color/20 bg-color-muted text-color-muted-readable',
			ghost: 'border-transparent bg-transparent text-color-readable shadow-none'
		}
	},
	defaultVariants: {
		size: 'normal',
		density: 'normal',
		color: 'background',
		variant: 'solid'
	},
	compoundVariants: [
		{
			color: 'background',
			variant: 'solid',
			class: 'border-background-muted bg-background text-foreground'
		},
		{
			color: 'background',
			variant: 'outline',
			class: 'border-background-muted text-foreground'
		},
		{
			color: 'background',
			variant: 'soft',
			class: 'border-background-muted/70 bg-background-muted/45 text-foreground'
		},
		{
			color: 'background',
			variant: 'ghost',
			class: 'text-foreground'
		},
		{
			color: 'foreground',
			variant: 'solid',
			class: 'bg-foreground text-foreground-contrast'
		}
	]
});

const defaultStatLabel = cva({
	base: 'col-start-1 min-w-0 font-medium leading-tight text-current/65',
	variants: {
		size: {
			small: 'text-xs',
			normal: 'text-sm',
			large: 'text-base'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultStatValue = cva({
	base: 'col-start-1 min-w-0 font-semibold leading-none tracking-tight text-current',
	variants: {
		size: {
			small: 'text-xl',
			normal: 'text-2xl',
			large: 'text-3xl'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultStatIndicator = cva({
	base: 'col-start-2 row-span-2 row-start-1 inline-flex shrink-0 items-center justify-center self-start justify-self-end text-current/70 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	variants: {
		size: {
			small: '[&_svg]:size-4',
			normal: '[&_svg]:size-5',
			large: '[&_svg]:size-6'
		},
		variant: {
			default: '',
			icon: 'border border-current/15 bg-current/5',
			badge: 'border border-current/15 bg-current/5 font-medium',
			action:
				'state-layer border border-transparent bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50'
		},
		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			foreground: 'text-foreground-muted',
			background: 'text-foreground-muted',
			danger: 'text-danger',
			success: 'text-success',
			warning: 'text-warning',
			info: 'text-info'
		}
	},
	defaultVariants: {
		size: 'normal',
		variant: 'default',
		color: 'foreground'
	},
	compoundVariants: [
		{ variant: ['icon', 'action'], size: 'small', class: 'size-7 rounded-lg [&_svg]:size-3.5' },
		{ variant: ['icon', 'action'], size: 'normal', class: 'size-8 rounded-lg [&_svg]:size-4' },
		{ variant: ['icon', 'action'], size: 'large', class: 'size-10 rounded-xl [&_svg]:size-5' },
		{
			variant: 'badge',
			size: 'small',
			class: 'h-5 min-w-5 rounded-md px-1.5 text-[11px] [&_svg]:size-3'
		},
		{
			variant: 'badge',
			size: 'normal',
			class: 'h-6 min-w-6 rounded-md px-2 text-xs [&_svg]:size-3.5'
		},
		{
			variant: 'badge',
			size: 'large',
			class: 'h-7 min-w-7 rounded-lg px-2.5 text-sm [&_svg]:size-4'
		}
	]
});

const defaultStatTrend = cva({
	base: 'col-span-2 inline-flex min-w-0 items-center gap-1 font-medium leading-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
	variants: {
		size: {
			small: 'text-[11px] [&_svg]:size-3',
			normal: 'text-xs [&_svg]:size-3',
			large: 'text-sm [&_svg]:size-3.5'
		},
		trend: {
			up: 'text-success',
			down: 'text-danger',
			neutral: 'text-current/60'
		}
	},
	defaultVariants: {
		size: 'normal',
		trend: 'neutral'
	}
});

const defaultStatDescription = cva({
	base: 'col-span-2 min-w-0 text-current/60',
	variants: {
		size: {
			small: 'text-[11px]',
			normal: 'text-xs',
			large: 'text-sm'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultStatSeparator = cva({
	base: 'col-span-2',
	variants: {
		density: {
			small: 'my-1',
			normal: 'my-2',
			large: 'my-3'
		}
	},
	defaultVariants: {
		density: 'normal'
	}
});

export const statTheme = {
	root: defaultStatRoot,
	label: defaultStatLabel,
	value: defaultStatValue,
	indicator: defaultStatIndicator,
	trend: defaultStatTrend,
	description: defaultStatDescription,
	separator: defaultStatSeparator
};

export type StatTheme = typeof statTheme;
export type StatThemeProps = InferComponentTheme<StatTheme>;
export const setStatTheme = setComponentTheme<StatTheme>('stat');
export const useStatTheme = useComponentTheme<StatTheme>('stat', statTheme);
