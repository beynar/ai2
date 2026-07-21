import type { Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import { useTheme } from '../Theme/theme.state.svelte.js';
import { useHoverAction } from '$lib/utils/useHoverAction.svelte.js';
import type { Colors, Sizes } from '$lib/types/theme.js';
import type { FSOProps } from '$lib/transitions/transition.js';
import type { TooltipThemeProps } from './tooltip.theme.js';

export type TooltipProps = {
	size?: Sizes;
	class?: string;
	content: string | Snippet;
	position?: Placement;
	color?: Colors;
	variant?: 'solid' | 'outline' | 'soft';
	delay?: number;
	offset?: number;
	transition?: FSOProps;
	theme?: TooltipThemeProps;

	onOpen?: () => void;
	onClose?: () => void;
};
export const tooltip = (props: TooltipProps) => {
	const theme = useTheme();
	let refElement: HTMLElement | null = null;

	const hoverAction = useHoverAction({
		isActive: () => true,
		onMouseEnter: () => {
			if (refElement) {
				theme.tooltip = { ...props, ref: refElement };
			}
		},
		onMouseLeave: () => {
			theme.tooltip = null;
			theme.lastTooltipClosed = Date.now();
		},
		get delay() {
			const lastTooltipClosed = theme.lastTooltipClosed;
			const now = Date.now();
			if (lastTooltipClosed && now - lastTooltipClosed < (props.delay || 400)) {
				return 0;
			}
			return props.delay || 400;
		}
	});

	return (ref: HTMLElement) => {
		refElement = ref;
		const off = hoverAction.reference?.(ref);
		return () => {
			off?.();
			hoverAction.destroy();
		};
	};
};
