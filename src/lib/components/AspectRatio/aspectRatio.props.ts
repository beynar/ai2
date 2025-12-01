import type { WithSlot } from '$lib/components/Slot/slot.js';
import type { WithAttachments } from '$lib/types/props.js';
import type { AspectRatioThemeProps } from './aspectRatio.theme.js';

export type AspectRatioRatio =
	| '2x1'
	| '2x3'
	| '16x9'
	| '4x3'
	| '1x1'
	| '3x4'
	| '3x2'
	| '9x16'
	| '1x2';

type AspectRatioBaseProps = {
	ref?: HTMLElement | null;
	/**
	 * The class name of the aspect ratio container
	 */
	class?: string;
	/**
	 * Specify the aspect ratio
	 */
	ratio?: AspectRatioRatio;
	theme?: AspectRatioThemeProps;
};

type AspectRatioSlotProps = WithSlot<AspectRatioBaseProps, 'children'>;

export type AspectRatioProps = WithAttachments<AspectRatioSlotProps>;
