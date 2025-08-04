import { cva } from '../../utils/cva.js';
import type { Sizes, Colors } from '$lib/types/theme.js';
import type { Slot } from '$lib/components/Slot/slot.js';
import type { InferComponentTheme } from '$lib/utils/cva.js';
import type { WithAttachments } from '$lib/types/props.js';

export type BadgeProps = WithAttachments<{
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
}>;

const defaultBadge = cva({
	base: 'rounded-full flex items-center justify-center bg-color text-color-fg absolute z-10',
	variants: {
		size: {
			small: 'px-1 text-[10px] h-4 min-w-4',
			normal: 'px-1.5 text-xs h-5 min-w-5',
			large: 'px-2 text-sm h-6 min-w-6'
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
		size: 'small',
		position: 'topRight'
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

export const badgeStructure = `
<Badge>
	<Children />
</Badge>
`;

export const badgeTheme = {
	badge: defaultBadge
};
