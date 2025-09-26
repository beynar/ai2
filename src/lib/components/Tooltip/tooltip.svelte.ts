import { computePosition, flip, shift, type Placement } from '@floating-ui/dom';
import type { Snippet } from 'svelte';
import { useTheme } from '../Theme/theme.state.svelte.js';
import { on } from 'svelte/events';
import { offset } from '@floating-ui/dom';
import { hide } from '@floating-ui/dom';
import { useHoverAction } from '$lib/utils/useHoverAction.svelte.js';
import type { Colors } from '$lib/types/theme.js';
import type { FSOProps } from '$lib/transitions/transition.js';
import type { ResponsiveProps } from '../Theme/theme.js';

export type TooltipProps = {
	size?: 'small' | 'normal' | 'large';
	class?: string;
	content: string | Snippet;
	position?: Placement;
	color?: Colors;
	delay?: number;
	offset?: number;
	transition?: FSOProps;

	onOpen?: () => void;
	onClose?: () => void;
};
export const tooltip = (props: TooltipProps) => {
	const theme = useTheme();
	let refElement: HTMLElement | null = null;

	const hoverAction = useHoverAction({
		get isActive() {
			return true;
		},
		onMouseEnter: () => {
			console.log('refElement', refElement);
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
			if (lastTooltipClosed && now - lastTooltipClosed < 600) {
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
