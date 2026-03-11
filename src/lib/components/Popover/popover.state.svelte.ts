import { bind } from '$lib/utils/state.svelte.js';
import { getContext, hasContext, mount, onMount, setContext, untrack } from 'svelte';
import { useTheme } from '../Theme/theme.state.svelte.js';
import type { PopoverProps } from './popover.props.js';
import {
	autoPlacement,
	computePosition,
	autoUpdate,
	hide,
	offset,
	shift,
	flip,
	type Placement,
	type Alignment,
	type Side
} from '@floating-ui/dom';
import { useKeyDown } from '$lib/utils/useKeyDown.svelte.js';
import { useScrollLock } from '$lib/utils/useScrollLock.svelte.js';
import { useSafeArea } from '$lib/utils/safeArea.svelte.js';
import { useClickOutside } from '$lib/utils/useClickOutside.svelte.js';
import { useFocusTrap } from '$lib/utils/useFocusTrap.svelte.js';
import { useHoverAction } from '$lib/utils/useHoverAction.svelte.js';

type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
interface PopoverOptions
	extends MakeRequired<
		Pick<
			PopoverProps,
			| 'id'
			| 'size'
			| 'position'
			| 'transition'
			| 'onClose'
			| 'onOpen'
			| 'offset'
			| 'directedTransition'
			| 'closeOnEscape'
			| 'lockScroll'
			| 'closeOnMouseLeave'
			| 'closeOnClickOutside'
			| 'openOnHover'
			| 'hoverDelay'
			| 'openOnClick'
		>,
		| 'directedTransition'
		| 'closeOnEscape'
		| 'lockScroll'
		| 'closeOnMouseLeave'
		| 'closeOnClickOutside'
		| 'openOnHover'
		| 'hoverDelay'
		| 'openOnClick'
	> {
	isOpen: boolean;
	externalRef?: HTMLElement | null;
	fitTrigger: boolean;
}

export interface PopoverState extends PopoverOptions {}
export class PopoverState {
	defaultTransition = () => ({
		in: {
			x: 0,
			y: 0,
			scale: 0.98,
			opacity: 0
		},
		out: {
			x: 0,
			y: 0,
			scale: 0.98,
			opacity: 0
		}
	});
	triggerReference: HTMLElement | null = $state(null);
	referenceElement = $derived(this.triggerReference || this.externalRef);
	dialogElement: HTMLElement | null = $state(null);
	parent = getContext<PopoverState | null>('popover');
	children = $state<PopoverState[]>([]);
	hasChildOpen = $derived(this.children.some((d) => d.isOpen));
	hasTransitioned = $state(false);
	theme = useTheme();

	isLastOpen = $derived.by(() => {
		const openedPopovers = this.theme.popovers.filter((d) => d.isOpen);
		const openedChildren = this.children.filter((d) => d.isOpen);
		return (
			openedPopovers.length === 1 &&
			openedPopovers.at(0)?.id === this.id &&
			openedChildren.length === 0
		);
	});

	isLastOfStack = $derived(this.parent ? this.parent?.children.at(-1)?.id === this.id : true);
	computedSize = $derived(this.theme.resolveResponsiveProps(this.size, 'normal'));
	computedTransition = $derived(
		this.theme.resolveTransitionProps(this.transition, this.defaultTransition())
	);
	computedPosition = $derived(this.theme.resolveResponsiveProps(this.position, 'top'));

	// Hook instances
	safeArea = useSafeArea({
		isActive: () =>
			this.isOpen && this.closeOnMouseLeave && this.children.filter((d) => d.isOpen).length === 0,
		callback: () => this.close(),
		offset: 15
	});

	clickOutside = useClickOutside({
		isActive: () => {
			if (!this.closeOnClickOutside || this.children.some((d) => d.isOpen)) {
				return false;
			}
			return this.isOpen && this.hasTransitioned;
		},
		callback: () => {
			this.close();
		}
	});

	focusTrap = useFocusTrap({
		isActive: () => {
			return false;
			return this.isOpen && (this.isLastOfStack || this.isLastOpen);
		}
	});

	hoverAction = useHoverAction({
		isActive: () => this.openOnHover && !this.isOpen,
		onMouseEnter: () => {
			this.open();
		},
		delay: this.hoverDelay
	});

	addChild = (child: PopoverState) => () => {
		this.children.push(child);
		return () => {
			this.children = this.children.filter((d) => d.id !== child.id);
		};
	};

	constructor(options: PopoverOptions) {
		bind(this, options);
		setContext('popover', this);
		onMount(this.theme.addPopover(this));
		this.parent && onMount(this.parent.addChild(this));

		// Initialize hooks that don't return references

		useScrollLock({
			isActive: () =>
				this.lockScroll &&
				!this.parent &&
				this.isOpen &&
				this.theme.popovers.filter((d) => d.isOpen).length === 1
		});

		useKeyDown({
			isActive: () => {
				const isActive =
					this.closeOnEscape && this.isOpen && (this.isLastOfStack || this.isLastOpen);

				return isActive;
			},
			onWindow: () => this.closeOnEscape && this.isOpen && (this.isLastOfStack || this.isLastOpen),
			keys: ['Escape'],
			callback: () => {
				this.close();
			}
		});
	}

	toggle = () => {
		this.isOpen = !this.isOpen;
	};
	open = () => {
		this.isOpen = true;
	};

	close = () => {
		this.isOpen = false;
	};

	applyDirectedTransition = (node: HTMLElement, placement: Placement) => {
		const side = placement.split('-')[0] as Side;
		const alignment = placement.split('-')[1] as Alignment;
		const axis = side === 'top' || side === 'bottom' ? 'y' : 'x';
		const value = side === 'top' || side === 'left' ? 10 : -10;
		const transformOriginY = side === 'top' ? 'bottom' : side === 'bottom' ? 'top' : 'center';
		const transformOriginX =
			alignment === 'start' ? 'left' : alignment === 'end' ? 'right' : 'center';

		node.style.transformOrigin = `${transformOriginX} ${transformOriginY}`;
		Object.assign(this.computedTransition.in, {
			[axis]: value
		});
		Object.assign(this.computedTransition.out, {
			[axis]: value
		});
	};

	place = async (node: HTMLElement, mount = false) => {
		if (!mount && !this.hasTransitioned) {
			return;
		}
		if (this.fitTrigger) {
			const { width } = this.referenceElement!.getBoundingClientRect();
			node.style.width = `${width}px`;
			node.style.maxWidth = `${width}px`;
		}

		const { x, y, strategy, placement, middlewareData } = await computePosition(
			this.referenceElement!,
			node,
			{
				strategy: 'fixed',
				placement: this.computedPosition,

				middleware: [
					hide(),
					offset(this.offset ?? 5),
					// shift({
					// 	mainAxis: true,
					// 	crossAxis: true,
					// 	padding: 20,

					// }),
					flip({
						mainAxis: true,
						crossAxis: true,
						padding: 20
					})
				]
			}
		);

		Object.assign(node.style, {
			position: strategy,
			left: `${x}px`,
			top: `${y}px`
		});
		if (mount && !this.hasTransitioned && this.directedTransition) {
			this.applyDirectedTransition(node, placement);
		}
	};

	dialog = (node: HTMLDialogElement) => {
		this.dialogElement = node;
		void this.place(node, true);
		return autoUpdate(this.referenceElement!, node, () => this.place(node));
	};
	reference = (node: HTMLElement) => {
		return untrack(() => {
			this.triggerReference = node;

			// Gather all cleanup callbacks
			const cleanups: Array<(() => void) | void> = [];
			cleanups.push(this.clickOutside.reference?.(node));
			cleanups.push(this.safeArea.reference?.(node));
			cleanups.push(this.hoverAction.reference?.(node));

			// Return combined cleanup function
			return () => {
				cleanups.forEach((cleanup) => cleanup?.());
			};
		});
	};
}

// Use interface merging to add the properties

export const usePopoverContext = () => {
	const hasPopover = hasContext('popover');
	if (!hasPopover) {
		return null;
	}
	return getContext<PopoverState>('popover');
};
