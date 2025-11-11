<script lang="ts">
	import Field, { useFieldTheme } from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { SwitchInputProps } from './switch.props.js';
	import { useSwitchInputTheme } from './switch.theme.js';
	import Slot from '$lib/components/Slot/Slot.svelte';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		theme,
		disabled,
		name,
		onValidate,
		visible,
		size = 'normal',
		label,
		labelProps,
		onChange,
		...rest
	}: SwitchInputProps = $props();

	const id = $props.id();

	const field = createFieldState({
		id,
		get value() {
			return value;
		},
		set value(v) {
			value = v;
		},
		get errors() {
			return errors;
		},
		set errors(v: any) {
			errors = v;
		},
		get focused() {
			return focused;
		},
		set focused(v: boolean) {
			focused = v;
		},
		onChange: (v) => {
			onChange?.(v);
		},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		required,
		name,
		onValidate,
		visible,
		type: 'switch'
	});

	const classes = $derived(useSwitchInputTheme(theme));
	const fieldClasses = $derived(useFieldTheme(theme));
	const onclick = () => {
		if (disabled) return;
		value = !value;
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (disabled) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			value = !value;
		}
	};
</script>

<Field
	{field}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({
				size,
				class: theme?.inputContainer?.base,
				disabled: field.disabled
			})
		}
	}}
	{...rest}
>
	<input
		onchange={onclick}
		name={field.id}
		id={'input-' + field.id}
		{value}
		hidden
		disabled={field.disabled}
		type="checkbox"
	/>
	<div
		bind:this={field.node}
		data-checked={!!value}
		aria-checked={!!value}
		role="switch"
		tabindex="0"
		class={classes.toggle({ checked: !!value, size, disabled })}
		{onclick}
		onkeydown={onKeydown}
	>
		<span class={classes.thumb({ checked: !!value, size })} data-checked={!!value}></span>
	</div>
	{#snippet suffix()}
		<Slot
			as="label"
			attrs={{
				for: 'input-' + field.id
			}}
			render={label}
			props={labelProps}
			class={fieldClasses.label()}
		/>
	{/snippet}
</Field>
