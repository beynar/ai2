<script lang="ts">
	import { checkIcon } from '$lib/components/Icons/check.js';
	import { minusIcon } from '$lib/components/Icons/minus.js';
	import Slot from '../../Slot/Slot.svelte';
	import type { Attachment } from 'svelte/attachments';
	import type { Slot as SlotContent } from '../../Slot/slot.js';
	import type { CheckboxMode } from './checkboxesInput.props.js';
	import type { useCheckboxesInputTheme } from './checkboxesInput.theme.js';

	type CheckboxLineClasses = ReturnType<typeof useCheckboxesInputTheme>;

	let {
		id,
		name,
		inputValue = 'on',
		checked = false,
		indeterminate = false,
		ariaLabel,
		disabled = false,
		mode = 'normal',
		label,
		description,
		classes,
		onCheckedChange,
		onFocus,
		onBlur
	}: {
		id: string;
		name?: string;
		inputValue?: string;
		checked?: boolean;
		indeterminate?: boolean;
		ariaLabel?: string;
		disabled?: boolean;
		mode?: CheckboxMode | 'control';
		label?: SlotContent;
		description?: SlotContent;
		classes: CheckboxLineClasses;
		onCheckedChange: (checked: boolean) => void;
		onFocus?: () => void;
		onBlur?: () => void;
	} = $props();

	const toggle = () => {
		if (disabled) return;
		onCheckedChange(indeterminate || !checked);
	};

	const syncIndeterminate: Attachment<HTMLInputElement> = (element) => {
		$effect(() => {
			element.indeterminate = indeterminate;
		});
	};
</script>

<button
	type="button"
	role="checkbox"
	aria-label={ariaLabel}
	aria-checked={indeterminate ? 'mixed' : checked}
	aria-controls={id}
	data-state={indeterminate ? 'mixed' : checked ? 'checked' : 'unchecked'}
	onclick={toggle}
	onfocus={onFocus}
	onblur={onBlur}
	class={classes.checkboxesInputItem({ mode, checked, disabled })}
>
	<input
		hidden
		onchange={toggle}
		style="transform: scale(0); opacity: 0; pointer-events: none; margin: -1px; position: absolute;"
		type="checkbox"
		{checked}
		{@attach syncIndeterminate}
		{name}
		{id}
		value={inputValue}
		{disabled}
	/>

	<div
		class={classes.checkboxesInputItemTrack({ mode, checked: checked || indeterminate, disabled })}
	></div>

	<div
		class={classes.checkboxesInputItemThumb({ checked: checked || indeterminate, mode, disabled })}
	>
		{#if indeterminate}
			{@render minusIcon({ size: 40 })}
		{:else}
			{@render checkIcon({ size: 40 })}
		{/if}
	</div>

	<Slot render={label} class={classes.checkboxesInputItemLabel()} />
	<Slot render={description} class={classes.checkboxesInputItemDescription({ mode, checked })} />
</button>
