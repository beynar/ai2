<script lang="ts">
	import { checkIcon } from '$lib/components/Icons/check.js';
	import Slot from '../../Slot/Slot.svelte';
	import type { Slot as SlotContent } from '../../Slot/slot.js';
	import type { CheckboxMode } from './checkboxesInput.props.js';
	import type { useCheckboxesInputTheme } from './checkboxesInput.theme.js';

	type CheckboxLineClasses = ReturnType<typeof useCheckboxesInputTheme>;

	let {
		id,
		name,
		inputValue = 'on',
		checked = false,
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
		disabled?: boolean;
		mode?: CheckboxMode;
		label?: SlotContent;
		description?: SlotContent;
		classes: CheckboxLineClasses;
		onCheckedChange: (checked: boolean) => void;
		onFocus?: () => void;
		onBlur?: () => void;
	} = $props();

	const toggle = () => {
		if (disabled) return;
		onCheckedChange(!checked);
	};
</script>

<button
	type="button"
	role="checkbox"
	aria-checked={checked}
	aria-controls={id}
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
		{name}
		{id}
		value={inputValue}
		{disabled}
	/>

	<div class={classes.checkboxesInputItemTrack({ mode, checked, disabled })}></div>

	<div class={classes.checkboxesInputItemThumb({ checked, mode, disabled })}>
		{@render checkIcon({ size: 40 })}
	</div>

	<Slot render={label} class={classes.checkboxesInputItemLabel()} />
	<Slot render={description} class={classes.checkboxesInputItemDescription()} />
</button>
