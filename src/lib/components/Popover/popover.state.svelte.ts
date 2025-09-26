import { bind } from '$lib/utils/state.svelte.js';
import { getContext, onMount, setContext } from 'svelte';
import { useTheme } from '../Theme/theme.state.svelte.js';
import type { PopoverProps } from './popover.js';
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

interface PopoverOptions
	extends Pick<
		PopoverProps,
		'id' | 'size' | 'position' | 'transition' | 'onClose' | 'onOpen' | 'offset'
	> {
	isOpen: boolean;
	externalRef?: HTMLElement | null;
}

const defaultTransition = {
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
} as const;

export interface PopoverState extends PopoverOptions {
	externalRef: HTMLElement | null;
}
export class PopoverState {
	triggerReference: HTMLElement | null = $state(null);
	referenceElement = $derived(this.triggerReference || this.externalRef);
	dialogElement: HTMLElement | null = $state(null);
	parent = getContext<PopoverState | null>('popover');
	children = $state<PopoverState[]>([]);
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

	isLastOfStack = $derived(this.parent?.children.at(-1)?.id === this.id);
	computedSize = $derived(this.theme.resolveResponsiveProps(this.size, 'normal'));
	computedTransition = $derived(
		this.theme.resolveTransitionProps(this.transition, defaultTransition)
	);
	computedPosition = $derived(this.theme.resolveResponsiveProps(this.position, 'top'));

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

	place = async (node: HTMLElement) => {
		const { x, y, strategy, placement, middlewareData } = await computePosition(
			this.referenceElement!,
			node,
			{
				strategy: 'fixed',
				placement: this.computedPosition,
				middleware: [
					hide(),
					offset(this.offset ?? 5),
					shift({
						mainAxis: true,
						padding: 20
					}),

					flip({})
				]
			}
		);

		node.setAttribute('data-placement', placement);
		Object.assign(node.style, {
			position: strategy,
			left: `${x}px`,
			top: `${y}px`
		});
	};

	dialog = (node: HTMLDialogElement) => {
		this.dialogElement = node;
		void this.place(node);
		return autoUpdate(this.referenceElement!, node, () => this.place(node));
	};
	reference = (node: HTMLElement) => {
		this.triggerReference = node;
	};
}

// Use interface merging to add the properties
