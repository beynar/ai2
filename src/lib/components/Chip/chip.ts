import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import { cva, type InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type ChipProps = WithAttachments<
	WithSlot<
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
	>
>;

const defaultChip = cva({
	base: 'rounded-large box-border w-fit justify-between max-w-fit min-w-min items-center inline-flex whitespace-nowrap',
	variants: {
		size: {
			small: 'px-1 h-4 text-[10px]  gap-1',
			normal: 'px-1.5 h-5 text-xs gap-1',
			large: 'px-2 h-6 text-sm  gap-1.5'
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
			solid: 'text-color-fg bg-color',
			outline: 'bg-opacity-0 text-color border-color border',
			soft: 'bg-color-muted text-color'
		}
	},
	defaultVariants: {
		color: 'primary',
		variant: 'solid',
		size: 'small'
	},
	compoundVariants: [
		{
			color: 'surface',
			variant: 'outline',
			class: 'border-surface-lighter text-contrast'
		},
		{
			color: 'surface',
			variant: 'soft',
			class: 'bg-surface-lighter text-color-fg'
		}
	]
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

export const chipStructure = `
<Chip>
	<Prefix />
	<Children />
	<Suffix />
</Chip>
`;

export const chipTheme = {
	chip: defaultChip,
	prefix: defaultChipPrefix,
	suffix: defaultChipSuffix
};
