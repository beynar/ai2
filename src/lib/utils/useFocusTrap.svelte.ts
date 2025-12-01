import { tick, untrack } from 'svelte';
import { on } from 'svelte/events';

export const useFocusTrap = (opts: { isActive: () => boolean }) => {
	let trapNode: HTMLElement | null;
	let listener: (() => void) | null;
	let focusableEls: HTMLElement[] = [];
	let mutationObserver: MutationObserver | null;
	let firstFocusableEl: HTMLElement | null;
	const findFirstFocusableEl = () => {
		const input = focusableEls.find((el) => el.tagName === 'INPUT');
		return input || focusableEls[0] || null;
	};

	const moveFocus = (e: KeyboardEvent) => {
		if (
			e.key === 'Tab' ||
			e.key === 'ArrowDown' ||
			e.key === 'ArrowUp' ||
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowRight'
		) {
			const direction: 'forward' | 'backward' =
				e.shiftKey || e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? 'backward' : 'forward';

			if (
				document.activeElement &&
				e.key !== 'Tab' &&
				['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)
			) {
				return;
			}
			e.preventDefault();

			const nextIndex =
				focusableEls.indexOf(document.activeElement as HTMLElement) +
				(direction === 'forward' ? 1 : -1);
			const nextFocusableEl =
				direction === 'forward'
					? nextIndex === focusableEls.length
						? firstFocusableEl
						: focusableEls[nextIndex]
					: nextIndex === -1
						? focusableEls[focusableEls.length - 1]
						: focusableEls[nextIndex];
			nextFocusableEl?.focus();
		}
	};

	const setFocusableEls = () => {
		focusableEls = Array.from(
			opts.isActive() && trapNode
				? trapNode.querySelectorAll(
						'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
					)
				: []
		);
	};

	const focusTrap = (node: HTMLElement) => {
		firstFocusableEl = findFirstFocusableEl();
		listener = on(window, 'keydown', moveFocus);

		setFocusableEls();
		if (!mutationObserver) {
			mutationObserver = new MutationObserver(setFocusableEls);
		}
		mutationObserver?.observe(node, { childList: true, subtree: true });
		tick().then(() => firstFocusableEl?.focus());
	};

	const unfocusTrap = (node: HTMLElement) => {
		listener?.();
		mutationObserver?.disconnect();
		listener = null;
		mutationObserver = null;
		focusableEls = [];
		firstFocusableEl = null;
		trapNode = null;
	};

	return {
		attachment: (node: HTMLElement) => {
			if (!opts.isActive()) return;
			return untrack(() => {
				focusTrap(node);
				trapNode = node;
				return () => {
					unfocusTrap(node);
				};
			});
		}
	};
};
