import { watch } from 'runed';
import { on } from 'svelte/events';

export const useKeyDown = (opts: {
	isActive: () => boolean;
	callback: (event: KeyboardEvent) => void;
	keys: string[];
	onWindow?: () => boolean;
	preventDefault?: boolean;
}) => {
	let offWindow: (() => void) | null;

	const eventCallback = (event: KeyboardEvent) => {
		if (opts.keys.includes(event.key)) {
			if (opts.preventDefault !== false) {
				// event.preventDefault();
			}
			opts.callback(event);
		}
	};

	$effect(() => {
		if (opts.isActive() && !offWindow && opts.onWindow?.() === true) {
			offWindow = on(window, 'keydown', eventCallback);
		} else {
			offWindow?.();
			offWindow = null;
		}
	});

	return {
		reference: (ref: HTMLElement) => {
			if (opts.isActive()) {
				return on(ref, 'keydown', eventCallback);
			}
		}
	};
};
