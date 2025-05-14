import { cva } from '../../utils/cva.js';
import type { Sizes, Colors } from '$lib/types/theme.js';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';

export type BadgeProps = {
	color?: Colors;
	position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
	size?: Sizes;
	variant?: 'soft' | 'solid' | 'outline';
	/**
	 * The class name of the badge. First element that the component outputs in the DOM.
	 */
	class?: string;
	children?: Slot;
	theme?: InferComponentTheme<typeof badgeTheme>;
};

const defaultBadge = cva({
	base: 'rounded-full flex items-center justify-center bg-color text-color-fg absolute z-10',
	variants: {
		size: {
			normal: ' text-xs min-h-5 min-w-5',
			large: ' text-base min-h-6 min-w-6',
			small: ' text-[10px] min-h-4 min-w-4'
		},
		color: {
			primary: '',
			secondary: '',
			contrast: '',
			surface: '',
			danger: '',
			success: '',
			warning: '',
			info: ''
		},
		variant: {
			solid: 'text-color-fg',
			outline: 'bg-opacity-0 text-color border-color border',
			soft: 'bg-color/20 text-color'
		},
		position: {
			topRight: '-top-2 -right-2',
			topLeft: '-top-2 -left-2',
			bottomRight: '-bottom-2 -right-2',
			bottomLeft: '-bottom-2 -left-2'
		}
	},
	defaultVariants: {
		color: 'primary',
		variant: 'solid',
		size: 'normal',
		position: 'topRight'
	}
});

export const badgeStructure = `
<Badge>
	<Children />
</Badge>
`;

export const badgeTheme = {
	badge: defaultBadge
};
