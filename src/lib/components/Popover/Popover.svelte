<script lang="ts">
	import type { PopoverProps } from './popover.props.js';
	import { usePopoverTheme } from './popover.theme.js';
	import { PopoverState } from './popover.state.svelte.js';
	import Button from '../Button/Button.svelte';
	import { fso } from '$lib/transitions/transition.js';
	import { portal } from '$lib/attachments/portal.js';

	let {
		id: customId,
		position,
		ref,
		onClose,
		onOpen,
		size,
		offset,
		transition,
		children,
		open = $bindable(false),
		openOnHover = false,
		openOnClick = true,
		hoverDelay = 100,
		closeOnEscape = true,
		closeOnClickOutside = true,
		closeOnMouseLeave = false,
		directedTransition = true,
		lockScroll = true,
		fitTrigger = false,
		class: className,
		trigger,
		theme
	}: PopoverProps = $props();

	const id = $props.id();
	const popover = new PopoverState({
		id: customId || id,
		get isOpen() {
			return open;
		},
		set isOpen(value) {
			open = value;
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
		get closeOnEscape() {
			return closeOnEscape;
		},
		get lockScroll() {
			return lockScroll;
		},
		get closeOnMouseLeave() {
			return closeOnMouseLeave;
		},
		get closeOnClickOutside() {
			return closeOnClickOutside;
		},
		get openOnHover() {
			return openOnHover;
		},
		get hoverDelay() {
			return hoverDelay;
		},
		get openOnClick() {
			return openOnClick;
		},
		onClose,
		onOpen
	});

	const classes = $derived(usePopoverTheme(theme));

	const in_out = fso();

	const visible = $derived(popover.isOpen && (popover.referenceElement || popover.externalRef));
</script>

{#if visible}
	<dialog
		{@attach portal()}
		{@attach popover.dialog}
		{@attach popover.clickOutside.reference}
		{@attach popover.focusTrap.attachment}
		{@attach popover.safeArea.reference}
		open={true}
		id={popover.id}
		class={classes.root()}
	>
		<!-- The panel is a child of the portaled wrapper, so it is never re-parented mid-transition
		     (which would break the intro). It carries the visuals, transform-origin, and animation. -->
		<div
			class={classes.popover({ size: popover.computedSize, className })}
			style:transform-origin={popover.transformOrigin}
			style:width={popover.triggerWidth != null ? `${popover.triggerWidth}px` : undefined}
			style:max-width={popover.triggerWidth != null ? `${popover.triggerWidth}px` : undefined}
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
		</div>
	</dialog>
{/if}
{#if trigger}
	{#if typeof trigger === 'function'}
		{@render trigger?.(popover)}
	{:else if typeof trigger !== 'boolean'}
		<Button
			{...trigger}
			onClick={() => openOnClick && popover.toggle()}
			{@attach popover.reference}
		>
			{trigger.content}
		</Button>
	{/if}
{/if}
