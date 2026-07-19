import { useTheme } from '$lib/components/Theme/theme.state.svelte.js';
import { easingFunctions } from '$lib/transitions/easingFunctions.js';
import type { TransitionConfig } from 'svelte/transition';

const verticalDurationMultiplier = 1.5;
const revealDurationMultiplier = 2.5;

type TextTransitionParams = {
	role: 'in' | 'out';
};

export const verticalText = () => {
	const theme = useTheme();

	return (node: HTMLElement, { role }: TextTransitionParams): TransitionConfig => ({
		duration: node.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches
			? 0
			: theme.transition.duration * verticalDurationMultiplier,
		easing: easingFunctions[theme.transition.easing],
		css: (t) => {
			const offset = (1 - t) * (role === 'in' ? -65 : 65);
			return `transform:translate3d(0,${offset}%,0);opacity:${t};`;
		}
	});
};

export const revealText = () => {
	const theme = useTheme();

	return (node: HTMLElement, { role }: TextTransitionParams): TransitionConfig => ({
		duration: node.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches
			? 0
			: theme.transition.duration * revealDurationMultiplier,
		easing: easingFunctions[theme.transition.easing],
		css: (t) => {
			const hidden = (1 - t) * 100;
			const clipPath = role === 'in' ? `inset(0 ${hidden}% 0 0)` : `inset(0 0 0 ${hidden}%)`;
			return `clip-path:${clipPath};`;
		}
	});
};
