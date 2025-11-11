import { onDestroy } from 'svelte';

export const useThrottle = <T extends any[]>(callback?: (...args: T[]) => void, delay?: number) => {
	let timeout: ReturnType<typeof setTimeout>;
	let lastCall = 0;
	let lastArgs: T[] = [];

	onDestroy(() => {
		clearTimeout(timeout);
	});
	return (...args: T[]) => {
		const now = Date.now();
		if (now - lastCall < (delay ?? 200)) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				lastCall = now;
				callback?.(...lastArgs);
			}, delay);
		} else {
			lastCall = now;
			callback?.(...args);
		}
	};
};
