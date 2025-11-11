<script lang="ts">
	import type { DialogProps } from './dialog.props.js';
	import { useDialogTheme } from './dialog.theme.js';
	import { DialogState } from './dialog.state.svelte.js';
	import Slot from '../Slot/Slot.svelte';
	import { xIcon } from '../Icons/x.js';
	import Button from '../Button/Button.svelte';
	import { bgFade, fso } from '$lib/transitions/transition.js';

	let {
		id: customId,
		type,
		isOpen = $bindable(false),
		title,
		description,
		onClose,
		onOpen,
		size,
		transition,
		children,
		closeOnEscape = true,
		closeOnClickOutside = true,
		closable = true,
		class: className,
		header,
		headerProps,
		footer,
		footerProps,
		titleProps,
		descriptionProps,
		closeButton,
		closeButtonProps,
		trigger
	}: DialogProps = $props();

	const id = $props.id();
	const dialog = new DialogState({
		id: customId || id,
		get type() {
			return type;
		},
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
		get closeOnEscape() {
			return closeOnEscape;
		},
		get closeOnClickOutside() {
			return closeOnClickOutside;
		},
		get closable() {
			return closable;
		},
		onClose,
		onOpen
	});

	const classes = $derived(useDialogTheme());

	const hasHeader = $derived(!!(title || description));

	const in_out = fso();
	const bg_fade = bgFade();
</script>

{#if dialog.isOpen}
	<dialog
		id={dialog.id}
		aria-modal={true}
		aria-labelledby="{dialog.id}-label"
		class={classes.dialog({
			size: dialog.computedSize,
			type: dialog.computedType,
			className
		})}
		data-type={dialog.type}
		data-size={size}
		transition:bg_fade={{
			duration: 200,
			delay: 0,
			easing: 'linear'
		}}
		onintrostart={() => {
			dialog.element?.showModal?.();
		}}
		bind:this={dialog.element}
		{@attach dialog.attachment}
	>
		{#snippet CLOSE_BUTTON()}
			<Slot
				class={classes.closeButton({ size: dialog.computedSize })}
				render={closeButton}
				payload={dialog}
				props={closeButtonProps}
			>
				<Button
					squared
					class={classes.closeButton({ size: dialog.computedSize })}
					size="small"
					variant="ghost"
					onClick={() => dialog.close()}
				>
					{@render xIcon({ size: 20 })}
				</Button>
			</Slot>
		{/snippet}
		<div
			{@attach dialog.contentAttachment}
			data-type={dialog.type}
			in:in_out={dialog.computedTransition.in}
			out:in_out={dialog.computedTransition.out}
			onintroend={() => {
				dialog.hasTransitioned = true;
				onOpen?.(dialog);
			}}
			onoutrostart={() => {
				dialog.hasTransitioned = false;
			}}
			onoutroend={() => onClose?.(dialog)}
			class={classes.content({
				size: dialog.computedSize,
				type: dialog.computedType
			})}
		>
			<Slot
				as="header"
				render={header}
				payload={dialog}
				class={classes.header({ size: dialog.computedSize })}
				props={headerProps}
				renderIf={hasHeader}
			>
				<Slot
					class={classes.title({ size: dialog.computedSize })}
					render={title}
					payload={dialog}
					props={titleProps}
				/>
				<Slot
					class={classes.description({ size: dialog.computedSize })}
					render={description}
					payload={dialog}
					props={descriptionProps}
				/>
				{#if closable}
					{@render CLOSE_BUTTON()}
				{/if}
			</Slot>
			{#if !hasHeader}
				{@render CLOSE_BUTTON()}
			{/if}
			{@render children?.(dialog)}
			<Slot
				render={footer}
				class={classes.footer({ size: dialog.computedSize })}
				payload={dialog}
				props={footerProps}
			/>
		</div>
	</dialog>
{/if}
{#if trigger}
	{#if typeof trigger === 'function'}
		{@render trigger?.(dialog)}
	{:else}
		<Button {...trigger} onClick={() => dialog.open()}>{trigger.content}</Button>
	{/if}
{/if}
