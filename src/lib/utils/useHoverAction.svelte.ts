import { onDestroy } from 'svelte';
import { on } from 'svelte/events';

type HoverActionHandlerOptions = {
	isActive: boolean;
	onMouseEnter: () => void;
	onMouseLeave?: () => void;
	delay?: number;
};
type Timeout = ReturnType<typeof setTimeout>;
export const useHoverAction = (props: HoverActionHandlerOptions) => {
	let timeouts = new Map<HTMLElement, Timeout>();
	let offs = new Set<() => void>();

	const wait = async (ref: HTMLElement) => {
		return new Promise((resolve) => {
			const timeout = setTimeout(() => {
				resolve(true);
				timeouts.delete(ref);
			}, props.delay);
			timeouts.set(ref, timeout);
		});
	};

	function onMouseEnter(this: HTMLElement) {
		if (timeouts.get(this)) {
			clearTimeout(timeouts.get(this));
			timeouts.delete(this);
		}
		if (props.delay) {
			wait(this).then(() => {
				props.isActive && props.onMouseEnter();
			});
		} else {
			props.isActive && props.onMouseEnter();
		}
	}
	function onMouseLeave(this: HTMLElement) {
		if (timeouts.get(this)) {
			clearTimeout(timeouts.get(this));
			timeouts.delete(this);
		}
		props.isActive && props.onMouseLeave?.();
	}

	const destroy = () => {
		offs.forEach((off) => off());
		offs.clear();
		timeouts.forEach((timeout) => clearTimeout(timeout));
		timeouts.clear();
	};
	onDestroy(destroy);

	return {
		get reference() {
			if (!props.isActive) return null;
			return (ref: HTMLElement) => {
				const offEnter = on(ref, 'mouseenter', onMouseEnter.bind(ref));
				const offLeave = on(ref, 'mouseleave', onMouseLeave.bind(ref));
				offs.add(offEnter);
				offs.add(offLeave);

				return () => {
					offLeave();
					offEnter();
					offs.delete(offEnter);
					offs.delete(offLeave);
					const timeout = timeouts.get(ref);
					if (timeout) {
						clearTimeout(timeout);
						timeouts.delete(ref);
					}
				};
			};
		},
		destroy
	};
};
