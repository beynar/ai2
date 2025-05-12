import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';

export type ChipProps = WithSlot<
	{
		class?: string;
		color?: Colors;
		size?: Sizes;
		variant?: 'solid' | 'outline' | 'soft';
		href?: string;
		target?: string;
		rel?: string;
		onclick?: (event: MouseEvent) => void;
		onenter?: (event: MouseEvent) => void;
		onleave?: (event: MouseEvent) => void;
		theme?: InferComponentTheme<typeof chipTheme>;
	},
	'children' | 'suffix' | 'prefix',
	undefined
>;

const defaultChip = cva({
	base: 'rounded-full w-fit flex justify-center items-center inline-flex whitespace-nowrap',
	variants: {
		size: {
			normal: 'px-2 py-1 text-xs leading-4 gap-1',
			large: 'px-2.5 py-1.5 text-base leading-5 gap-2',
			small: 'px-1.5 py-1 text-[10px] leading-[10px] gap-1'
		},
		color: {
			primary: 'bg-primary text-primary-fg',
			secondary: 'bg-secondary text-secondary-fg',
			contrast: 'bg-contrast text-contrast-fg',
			surface: 'bg-surface-muted text-color-fg',
			danger: 'bg-danger text-danger-fg',
			success: 'bg-success text-success-fg',
			warning: 'bg-warning text-warning-fg',
			info: 'bg-info text-info-fg'
		},
		variant: {
			solid: 'text-color-fg',
			outline: 'bg-opacity-0 text-color border-color border',
			soft: 'bg-color/20 text-color'
		}
	},
	defaultVariants: {
		color: 'primary',
		variant: 'solid',
		size: 'normal'
	}
});

const defaultChipPrefix = cva({
	base: 'w-4 h-4',
	variants: {
		size: {
			normal: 'w-4 h-4',
			large: 'w-5 h-5',
			small: 'w-2 h-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultChipSuffix = cva({
	base: 'w-4 h-4',
	variants: {
		size: {
			normal: 'w-4 h-4',
			large: 'w-5 h-5',
			small: 'w-2 h-2'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

export const chipTheme = {
	chip: defaultChip,
	prefix: defaultChipPrefix,
	suffix: defaultChipSuffix
};
