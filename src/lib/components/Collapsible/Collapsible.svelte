<script lang="ts">
	import Slot from '../Slot/Slot.svelte';
	import type { CollapsibleProps } from './collapsible.props.js';
	import { useCollapsibleTheme } from './collapsible.theme.js';
	import { slide } from 'svelte/transition';
	import { caretUpDownIcon } from '../Icons/caretUpDown.js';
	import { caretDownIcon } from '../Icons/caretDown.js';
	import { plusIcon } from '../Icons/plus.js';
	import { minusIcon } from '../Icons/minus.js';

	let {
		ref = $bindable(),
		class: className,
		open = $bindable(undefined),
		defaultOpen = false,
		disabled = false,
		onOpenChange,
		size = 'normal',
		icon = 'caret',
		theme,
		trigger,
		children,
		...attachments
	}: CollapsibleProps = $props();

	const id = $props.id();

	// Internal state management
	let internalOpen = $state(defaultOpen);
	const isOpen = $derived(open !== undefined ? open : internalOpen);

	const contentId = $derived(`${id}-content`);

	const handleToggle = () => {
		if (disabled) return;
		const newOpen = !isOpen;
		if (open === undefined) {
			internalOpen = newOpen;
		} else {
			// If controlled, update the bound value
			open = newOpen;
		}
		onOpenChange?.(newOpen);
	};

	const classes = $derived(useCollapsibleTheme(theme));

	const collapsibleState = $derived(isOpen ? 'open' : 'closed');
</script>

<div
	bind:this={ref}
	data-state={collapsibleState}
	data-disabled={disabled ? '' : undefined}
	data-size={size}
	class={classes.container({ size, className })}
	{...attachments}
>
	<button
		type="button"
		aria-expanded={isOpen}
		aria-controls={contentId}
		data-state={collapsibleState}
		data-disabled={disabled ? '' : undefined}
		{disabled}
		class={classes.trigger({ size, disabled })}
		onclick={handleToggle}
	>
		<Slot render={trigger} />
		{#if typeof icon === 'function'}
			<Slot render={icon} class={classes.icon({ size })} payload={{ isOpen }} />
		{:else if icon === 'math'}
			<div style:transform="rotate({isOpen ? '180' : '0'}deg)" class={classes.icon({ size })}>
				{@render (collapsibleState === 'open' ? plusIcon : minusIcon)({ size: 16 })}
			</div>
		{:else if icon === 'caret'}
			<div style:transform="rotate({isOpen ? '180' : '0'}deg)" class={classes.icon({ size })}>
				{@render caretDownIcon({ size: 16 })}
			</div>
		{/if}
	</button>

	{#if isOpen}
		<div
			id={contentId}
			data-state={collapsibleState}
			data-disabled={disabled ? '' : undefined}
			class={classes.content({ size })}
			transition:slide={{ duration: 200 }}
		>
			<Slot payload={{ isOpen }} render={children} />
		</div>
	{/if}
</div>
