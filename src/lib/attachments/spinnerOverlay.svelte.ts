import type { Colors } from '$lib/types/theme.js';
import { cva, setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
import { untrack } from 'svelte';

export type SpinnerOverlayOptions = {
	text?: string;
	loading?: boolean;
	class?: string;
	color?: Colors;
	size?: 'small' | 'normal' | 'large';
};

const defaultSpinnerOverlay = cva({
	base: 'absolute overflow-hidden flex gap-2 flex-col items-center justify-center backdrop-blur-[10px] z-10 w-full h-full rounded-inherit inset-0 bg-color/20 '
});

const defaultSpinnerOverlaySpinner = cva({
	base: 'ui-spinner order-2 text-color-fg',
	variants: {
		size: {
			small: 'w-4 h-4',
			normal: 'w-5 h-5',
			large: 'w-6 h-6'
		},
		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			contrast: 'text-contrast',
			surface: 'text-surface',
			danger: 'text-danger',
			success: 'text-success',
			warning: 'text-warning',
			info: 'text-info'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const defaultSpinnerOverlayText = cva({
	base: 'text-sm order-1 text-color-fg',
	variants: {
		size: {
			small: 'text-sm',
			normal: 'text-base',
			large: 'text-lg'
		},
		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			contrast: 'text-contrast',
			surface: 'text-surface',
			danger: 'text-danger',
			success: 'text-success',
			warning: 'text-warning',
			info: 'text-info'
		}
	},
	defaultVariants: {
		size: 'normal'
	}
});

const spinnerOverlayTheme = {
	overlay: defaultSpinnerOverlay,
	spinner: defaultSpinnerOverlaySpinner,
	text: defaultSpinnerOverlayText
};

export const setSpinnerOverlayTheme =
	setComponentTheme<typeof spinnerOverlayTheme>('spinnerOverlay');
export const useSpinnerOverlayTheme = useComponentTheme('spinnerOverlay', spinnerOverlayTheme);

export const spinnerOverlay = (opts: SpinnerOverlayOptions) => {
	const classes = $derived(useSpinnerOverlayTheme());
	let parentAnimation: Animation | undefined = undefined;
	let textAnimation: Animation | undefined = undefined;

	const getSpinnerOverlay = (node: HTMLElement) => {
		return node.querySelector('div:has(.ui-spinner)');
	};

	const getSpinner = (node: HTMLElement) => {
		return node.querySelector('.ui-spinner');
	};

	const getTextElement = (node: HTMLElement) => {
		return node.querySelector('[data-spinner-text]');
	};

	const destroy = (node: HTMLElement) => {
		if (!opts.loading) {
			getSpinnerOverlay(node)?.remove();
			textAnimation && textAnimation.cancel();
			parentAnimation && parentAnimation.cancel();
		}
	};

	const setSpinner = (node: HTMLElement, overlay: Element) => {
		let spinner = getSpinner(node);
		if (!spinner) {
			spinner = document.createElement('span');
			overlay.appendChild(spinner);
		}

		spinner.classList.add(...classes.spinner({ size: opts.size, color: opts.color }).split(' '));
		return spinner;
	};

	const setOverlay = (node: HTMLElement) => {
		let mounted = false;
		let overlay = getSpinnerOverlay(node);
		if (!overlay) {
			overlay = document.createElement('div');
			node.appendChild(overlay);
		} else {
			mounted = true;
		}
		overlay.classList.add(...classes.overlay({ class: opts.class }).split(' '));

		return [overlay, mounted] as const;
	};

	const setText = (node: HTMLElement, overlay: Element) => {
		let textElement = getTextElement(node);
		if (!opts.text) {
			textElement?.remove();
			return;
		}
		if (textElement) {
			textAnimation?.cancel();
			textElement.animate(
				[
					{ opacity: 1, transform: 'translateY(0px)' },
					{ opacity: 0, transform: 'translateY(-10px)' }
				],
				{
					duration: 200,
					direction: 'alternate'
				}
			).onfinish = () => {
				textElement!.textContent = opts.text || '';
				textAnimation = textElement?.animate(
					[
						{ opacity: 0, transform: 'translateY(10px)' },
						{ opacity: 1, transform: 'translateY(0)' }
					],
					{
						duration: 200,
						direction: 'alternate'
					}
				);
				textAnimation!.onfinish = () => {
					textAnimation = undefined;
				};
			};
		} else {
			textElement = document.createElement('p');
			textElement.setAttribute('data-spinner-text', 'true');
			textElement.textContent = opts.text || '';
			textElement.classList.add(...classes.text({ size: opts.size, color: opts.color }).split(' '));
			overlay.appendChild(textElement);
		}
	};

	const ensureParentIsPositioned = (node: HTMLElement) => {
		if (node) {
			const currentPosition = node.style.getPropertyValue('position');
			if (currentPosition !== 'relative' && currentPosition !== 'absolute') {
				node.style.setProperty('position', 'relative');
			}
		}
	};
	const setup = (node: HTMLElement) => {
		if (opts.loading) {
			ensureParentIsPositioned(node);
			const [overlay, mounted] = setOverlay(node);
			setText(node, overlay);
			setSpinner(node, overlay);

			if (!parentAnimation && !mounted) {
				parentAnimation = overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
					duration: 200,
					direction: 'alternate'
				});
			} else if (parentAnimation) {
				parentAnimation.reverse();
				parentAnimation.onfinish = () => {};
			}
		} else {
			if (parentAnimation) {
				parentAnimation.reverse();
				parentAnimation.onfinish = () => {
					destroy(node);
				};
			} else {
				const overlay = getSpinnerOverlay(node);
				if (overlay) {
					parentAnimation = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
						duration: 200
					});
					parentAnimation.onfinish = () => {
						destroy(node);
					};
				}
			}
		}
	};

	return (node: HTMLElement) => {
		opts.loading;
		opts.text;
		return untrack(() => {
			setup(node);
			return () => {
				destroy(node);
			};
		});
	};
};
