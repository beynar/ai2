<script module lang="ts">
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { popoverTheme } from './popover.js';
	export const setPopoverTheme = setComponentTheme<typeof popoverTheme>('popover');
	export const usePopoverTheme = useComponentTheme('popover', popoverTheme);
</script>

<script lang="ts">
	import { useClickOutside } from '$lib/utils/useClickOutside.svelte.js';
	import { useFocusTrap } from '$lib/utils/useFocusTrap.svelte.js';
	import { useKeyDown } from '$lib/utils/useKeyDown.svelte.js';
	import { useScrollLock } from '$lib/utils/useScrollLock.svelte.js';
	import type { PopoverProps } from './popover.js';
	import { PopoverState } from './popover.state.svelte.js';
	import Button from '../Button/Button.svelte';
	import { fso } from '$lib/transitions/transition.js';
	import { useSafeArea } from '$lib/utils/safeArea.svelte.js';
	import { useHoverAction } from '$lib/utils/useHoverAction.svelte.js';

	let {
		id: customId,
		position,
		isOpen = $bindable(false),
		ref,
		onClose,
		onOpen,
		size,
		offset,
		transition,
		children,
		openOnHover = false,
		openOnClick = true,
		hoverDelay = 100,
		closeOnEscape = true,
		closeOnClickOutside = true,
		closeOnMouseLeave = false,
		directedTransition = true,
		lockScroll = true,
		class: className,
		fitTrigger = false,
		trigger
	}: PopoverProps = $props();

	const id = $props.id();
	const popover = new PopoverState({
		id: customId || id,
		get isOpen() {
			return isOpen;
		},
		set isOpen(value) {
			isOpen = value;
		},
		get size() {
			return size;
		},
		get transition() {
			return transition;
		},
		get directedTransition() {
			return directedTransition;
		},
		get position() {
			return position;
		},

		get offset() {
			return offset;
		},
		get externalRef() {
			return ref;
		},
		get fitTrigger() {
			return fitTrigger;
		},
		onClose,
		onOpen
	});

	useKeyDown({
		get isActive() {
			return closeOnEscape && popover.isOpen && (popover.isLastOfStack || popover.isLastOpen);
		},
		keys: ['Escape'],
		callback: () => {
			popover.close();
		}
	});

	useScrollLock({
		get isActive() {
			return (
				lockScroll &&
				!popover.parent &&
				popover.isOpen &&
				popover.theme.popovers.filter((d) => d.isOpen).length === 1
			);
		}
	});

	const safeArea = useSafeArea({
		// debug: true,
		get isActive() {
			return (
				popover.isOpen && closeOnMouseLeave && popover.children.filter((d) => d.isOpen).length === 0
			);
		},
		callback: popover.close,
		offset: 15
	});

	const clickOutside = useClickOutside({
		get isActive() {
			if (!closeOnClickOutside || popover.children.some((d) => d.isOpen)) {
				return false;
			}
			return popover.isOpen && popover.hasTransitioned;
		},
		callback: popover.close
	});

	const focusTrap = useFocusTrap({
		get isActive() {
			return false;
			return popover.isOpen && (popover.isLastOfStack || popover.isLastOpen);
		}
	});

	const hoverAction = useHoverAction({
		get isActive() {
			return openOnHover && !popover.isOpen;
		},
		onMouseEnter: () => {
			popover.open();
		},
		delay: hoverDelay
	});

	const classes = $derived(usePopoverTheme());

	const in_out = fso();

	const shouldShow = $derived(popover.isOpen && (popover.referenceElement || popover.externalRef));
</script>

{#if shouldShow}
	<dialog
		{@attach popover.dialog}
		{@attach clickOutside.reference}
		{@attach focusTrap.attachment}
		{@attach safeArea.reference}
		open={true}
		id={popover.id}
		aria-modal={true}
		aria-labelledby="{popover.id}-label"
		class={classes.popover({
			size: popover.computedSize,
			className
		})}
		in:in_out={popover.computedTransition.in}
		out:in_out={popover.computedTransition.out}
		onintroend={() => {
			popover.hasTransitioned = true;
			onOpen?.(popover);
		}}
		onoutrostart={() => {
			popover.hasTransitioned = false;
		}}
		onoutroend={() => onClose?.(popover)}
	>
		{@render children?.(popover)}
	</dialog>
{/if}
{#if trigger}
	{#if typeof trigger === 'function'}
		{@render trigger?.(popover)}
	{:else if typeof trigger !== 'boolean'}
		<Button
			{...trigger}
			onClick={() => openOnClick && popover.toggle()}
			{@attach hoverAction.reference}
			{@attach popover.reference}
			{@attach clickOutside.reference}
			{@attach safeArea.reference}>{trigger.content}</Button
		>
	{/if}
{/if}
