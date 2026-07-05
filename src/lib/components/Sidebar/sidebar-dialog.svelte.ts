import { tick } from 'svelte';

const focusableSelector = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])'
].join(',');

type MobileSidebarDialogOptions = {
	get isOpen(): boolean;
	get isMobile(): boolean;
	get panel(): HTMLElement | null;
	close: () => void;
};

const getFocusableElements = (panel: HTMLElement) =>
	[...panel.querySelectorAll<HTMLElement>(focusableSelector)].filter(
		(element) =>
			element.tabIndex >= 0 &&
			!element.hasAttribute('disabled') &&
			element.getAttribute('aria-disabled') !== 'true' &&
			element.getAttribute('aria-hidden') !== 'true' &&
			!element.closest('[disabled], [aria-disabled="true"], [hidden], [inert]')
	);

export function useMobileSidebarDialog(options: MobileSidebarDialogOptions) {
	let restoreFocusTo: HTMLElement | null = null;

	const focusPanel = async () => {
		await tick();
		const panel = options.panel;
		if (!panel || !options.isOpen || !options.isMobile) return;

		(getFocusableElements(panel)[0] ?? panel).focus({ preventScroll: true });
	};

	const trapFocus = (event: KeyboardEvent) => {
		const panel = options.panel;
		if (!panel) return;

		const focusableElements = getFocusableElements(panel);
		if (focusableElements.length === 0) {
			event.preventDefault();
			panel.focus({ preventScroll: true });
			return;
		}

		const firstElement = focusableElements[0];
		const lastElement = focusableElements.at(-1);
		if (!firstElement || !lastElement) return;

		const activeElement = document.activeElement;
		if (!panel.contains(activeElement)) {
			event.preventDefault();
			firstElement.focus({ preventScroll: true });
			return;
		}

		if (event.shiftKey && activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus({ preventScroll: true });
			return;
		}

		if (!event.shiftKey && activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus({ preventScroll: true });
		}
	};

	$effect(() => {
		if (!options.isOpen || !options.isMobile) return;

		restoreFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		void focusPanel();

		const onKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				options.close();
				return;
			}

			if (event.key === 'Tab') trapFocus(event);
		};

		window.addEventListener('keydown', onKeydown, true);

		return () => {
			window.removeEventListener('keydown', onKeydown, true);
			document.body.style.overflow = previousOverflow;
			restoreFocusTo?.focus({ preventScroll: true });
			restoreFocusTo = null;
		};
	});
}
