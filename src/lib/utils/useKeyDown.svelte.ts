import { watch } from 'runed';
import { on } from 'svelte/events';

export const useKeyDown = (opts: {
	isActive: boolean;
	callback: (event: KeyboardEvent) => void;
	keys: string[];
	onWindow?: boolean;
}) => {
	let offWindow: (() => void) | null;
	let offRef: (() => void) | null;

	const eventCallback = (event: KeyboardEvent) => {
		if (opts.keys.includes(event.key)) {
			event.preventDefault();
			opts.callback(event);
		}
	};

	$effect(() => {
		if (opts.isActive && !offWindow && opts.onWindow !== false) {
			offWindow = on(window, 'keydown', eventCallback);
		} else {
			offWindow?.();
			offWindow = null;
		}
	});

	return {
		get reference() {
			if (!opts.isActive) return null;
			return (ref: HTMLElement) => {
				if (!opts.isActive) return;
				const offRef = on(ref, 'keydown', eventCallback);
				return () => {
					offRef();
				};
			};
		}
	};
};
