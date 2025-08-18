<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { selectTheme } from '$lib/components/Form/Select/select.js';
	export const setSelectTheme = setComponentTheme<typeof selectTheme>('select');
	export const useSelectTheme = useComponentTheme('select', selectTheme);
</script>

<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { SelectProps } from '$lib/components/Form/Select/select.js';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		placeholder = '',
		theme,
		disabled,
		name,
		onValidate,
		onChange,
		readonly,
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
		readonly,
		visible,
		type: 'select'
	});

	const classes = $derived(useSelectTheme(theme));
</script>

<Field
	{field}
	theme={{
		inputContainer: {
			base: classes.inputContainer()
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
		{placeholder}
		class={classes.input()}
	>
		{#if placeholder && !value}
			<option value="" disabled hidden>{placeholder}</option>
		{/if}
		{#each options || [] as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
</Field>
