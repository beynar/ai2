import { Spring } from 'svelte/motion';

interface SpringOpts {
	stiffness?: number;
	damping?: number;
	precision?: number;
}
export const useSpringState = (opts: SpringOpts) => {
	// const theme = use_theme();
	const theme = {
		preferReducesMotion: false,
		stiffness: 1,
		damping: 1,
		precision: 1
	};
	return (value: number) => {
		return new Spring(value, {
			stiffness: theme.preferReducesMotion ? 1 : opts.stiffness,
			damping: theme.preferReducesMotion ? 1 : opts.damping,
			precision: theme.preferReducesMotion ? 1 : opts.precision
		});
	};
};
