<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { SelectProps } from './select.props.js';
	import { useSelectTheme } from './select.theme.js';

	let {
		value = $bindable(''),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		placeholder = '',
		theme,
		disabled,
		name,
		size = 'normal',
		onValidate,
		onChange,
		visible,
		options,
		...rest
	}: SelectProps = $props();

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
		get onChange() {
			return onChange;
		},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		get required() {
			return required;
		},
		name,
		onValidate,
		visible,
		type: 'select'
	});

	const classes = $derived(useSelectTheme(theme));
</script>

<Field
	{field}
	{size}
	theme={{
		inputContainer: {
			base: classes.inputContainer({ size: size, disabled: field.disabled })
		},
		...(theme || {})
	}}
	{...rest}
>
	<select
		data-1p-ignore
		{id}
		name={field.name}
		bind:value={field.value}
		bind:this={field.node}
		class={classes.input({ size, disabled: field.disabled })}
		disabled={field.disabled}
	>
		{#if placeholder}
			<option disabled selected value="">{placeholder}</option>
		{/if}
		{#each options || [] as option (option.value)}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</Field>
