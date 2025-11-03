import type { Sizes, Colors } from '$lib/types/theme.js';
import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { ChipThemeProps } from './chip.theme.js';

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
			onClick?: (event: MouseEvent) => void;
			onenter?: (event: MouseEvent) => void;
			onleave?: (event: MouseEvent) => void;
			theme?: ChipThemeProps;
		},
		'children' | 'suffix' | 'prefix',
		undefined
	>
>;

