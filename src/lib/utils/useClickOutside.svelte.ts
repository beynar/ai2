import { SvelteSet } from 'svelte/reactivity';
import { on } from 'svelte/events';
import { untrack } from 'svelte';

type ClickOutsideHandlerOptions = {
	isActive: () => boolean;
	callback: () => void;
};

export const useClickOutside = (props: ClickOutsideHandlerOptions) => {
	const refs = new SvelteSet<HTMLElement>();
	let listener: (() => void) | null = null;
	const onClickOutside = (e: PointerEvent) => {
		if (!props.isActive()) return;
		let inRef = false;
		const path = e.composedPath();
		path.forEach((node) => {
			refs.forEach((ref) => {
				if (ref instanceof Node && node instanceof Node && ref?.isSameNode(node as HTMLElement)) {
					inRef = true;
				}
			});
		});
		if (!inRef) {
			props.callback();
		}
	};

	return {
		reference: (node: HTMLElement) => {
			return untrack(() => {
				refs.add(node);
				if (!listener) {
					listener = on(node.ownerDocument, 'pointerdown', onClickOutside);
				}
				return () => {
					refs.delete(node);
					if (listener && refs.size === 0) {
						listener();
						listener = null;
					}
				};
			});
		}
	};
};
