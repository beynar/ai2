<script module lang="ts">
	// declare global {
	// 	interface Document {
	// 		addEventListener<K extends keyof ModalTriggerEventMap>(
	// 			type: K,
	// 			listener: (this: Document, ev: ModalTriggerEventMap[K]) => void
	// 		): void;
	// 		dispatchEvent<K extends keyof ModalTriggerEventMap>(ev: ModalTriggerEventMap[K]): void;
	// 		removeEventListener<K extends keyof ModalTriggerEventMap>(
	// 			type: K,
	// 			listener: (this: Document, ev: ModalTriggerEventMap[K]) => void
	// 		): void;
	// 	}
	// }

	// export const toggleDialog = (id: string, open: boolean) => {
	// 	document.dispatchEvent(
	// 		new CustomEvent('open_dialog', {
	// 			detail: { id, open }
	// 		})
	// 	);
	// };

	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { dialogTheme } from './dialog.js';
	export const setDialogTheme = setComponentTheme<typeof dialogTheme>('dialog');
	export const useDialogTheme = useComponentTheme('dialog', dialogTheme);
</script>

<script lang="ts">
	import { useClickOutside } from '$lib/utils/useClickOutside.svelte.js';
	import { useFocusTrap } from '$lib/utils/useFocusTrap.svelte.js';

	import { useKeyDown } from '$lib/utils/useKeyDown.svelte.js';
	import { useScrollLock } from '$lib/utils/useScrollLock.svelte.js';

	import type { DialogProps } from './dialog.js';
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
		onClose,
		onOpen
	});

	useKeyDown({
		get isActive() {
			return (
				closeOnEscape && closable && dialog.isOpen && (dialog.isLastOfStack || dialog.isLastOpen)
			);
		},
		keys: ['Escape'],
		callback: () => {
			dialog.close();
		}
	});

	useScrollLock({
		get isActive() {
			return (
				!dialog.parent && dialog.isOpen && dialog.theme.dialogs.filter((d) => d.isOpen).length === 1
			);
		}
	});

	const clickOutside = useClickOutside({
		get isActive() {
			if (!closeOnClickOutside || dialog.children.some((d) => d.isOpen)) {
				return false;
			}
			return dialog.isOpen && dialog.hasTransitioned;
		},
		callback: dialog.close
	});

	const focusTrap = useFocusTrap({
		get isActive() {
			return false;
			return dialog.isOpen && (dialog.isLastOfStack || dialog.isLastOpen);
		}
	});

	const classes = $derived(useDialogTheme());

	const hasHeader = $derived(!!(title || description));
</script>

{#if dialog.isOpen}
	<dialog
		open={true}
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
		transition:bgFade={{
			duration: 200,
			delay: 0,
			easing: 'linear'
		}}
		bind:this={dialog.element}
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
			{@attach focusTrap.attachment}
			{@attach clickOutside.attachment}
			data-type={dialog.type}
			in:fso={dialog.computedTransition.in}
			out:fso={dialog.computedTransition.out}
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
