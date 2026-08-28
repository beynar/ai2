import { on } from 'svelte/events';
import { SvelteMap } from 'svelte/reactivity';

const focusableSelector = [
	'a[href]',
	'area[href]',
	'button',
	'input:not([type="hidden"])',
	'select',
	'textarea',
	'iframe',
	'object',
	'embed',
	'audio[controls]',
	'video[controls]',
	'summary',
	'[contenteditable]:not([contenteditable="false"])',
	'[tabindex]'
].join(',');

function isTabbable(element: HTMLElement): boolean {
	if (element.tabIndex < 0 || element.matches(':disabled')) return false;
	if (element.closest('[inert], [hidden], [aria-hidden="true"]')) return false;
	if (element.getClientRects().length === 0) return false;

	const style = getComputedStyle(element);
	return style.visibility !== 'hidden' && style.visibility !== 'collapse';
}

function getTabbableElements(node: HTMLElement): HTMLElement[] {
	const visibleElements = Array.from(node.querySelectorAll<HTMLElement>(focusableSelector)).filter(
		isTabbable
	);
	const radioGroups = new SvelteMap<
		HTMLFormElement | null,
		SvelteMap<string, HTMLInputElement>
	>();

	for (const element of visibleElements) {
		if (!(element instanceof HTMLInputElement) || element.type !== 'radio' || !element.name)
			continue;
		let formGroups = radioGroups.get(element.form);
		if (!formGroups) {
			formGroups = new SvelteMap();
			radioGroups.set(element.form, formGroups);
		}
		const current = formGroups.get(element.name);
		if (!current || element.checked) formGroups.set(element.name, element);
	}

	const elements = visibleElements.filter((element) => {
		if (!(element instanceof HTMLInputElement) || element.type !== 'radio' || !element.name)
			return true;
		return radioGroups.get(element.form)?.get(element.name) === element;
	});
	const positiveTabIndex = elements
		.filter((element) => element.tabIndex > 0)
		.sort((left, right) => left.tabIndex - right.tabIndex);
	const documentOrder = elements.filter((element) => element.tabIndex === 0);

	return [...positiveTabIndex, ...documentOrder];
}

export function useFocusTrap(options: { isActive: () => boolean }) {
	return {
		attachment: (node: HTMLElement) => {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (!options.isActive() || event.key !== 'Tab' || event.defaultPrevented) return;

				const tabbableElements = getTabbableElements(node);
				if (tabbableElements.length === 0) {
					event.preventDefault();
					node.focus();
					return;
				}

				const activeElement = node.ownerDocument.activeElement;
				const activeIndex = tabbableElements.indexOf(activeElement as HTMLElement);
				const firstElement = tabbableElements[0];
				const lastElement = tabbableElements[tabbableElements.length - 1];
				const shouldWrapBackward = event.shiftKey && activeIndex <= 0;
				const shouldWrapForward = !event.shiftKey && activeIndex === tabbableElements.length - 1;
				const shouldContainOutsideFocus = activeElement ? !node.contains(activeElement) : true;

				if (!shouldWrapBackward && !shouldWrapForward && !shouldContainOutsideFocus) return;

				event.preventDefault();
				(event.shiftKey ? lastElement : firstElement).focus();
			};

			node.tabIndex = node.tabIndex < 0 ? -1 : node.tabIndex;
			return on(node.ownerDocument, 'keydown', handleKeyDown);
		}
	};
}
