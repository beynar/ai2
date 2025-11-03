<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { NumberInputProps } from './numberInput.props.js';
	import { useNumberInputTheme } from './numberInput.theme.js';

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
		visible,
		min,
		max,
		step,
		...rest
	}: NumberInputProps = $props();

	const id = $props.id();

	// Create validation function that combines user validation with min/max constraints

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
			// console.log('onChange', v);
		},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		required,
		name,
		onValidate: (val) => {
			if (typeof val === 'number') {
				if (min && val < min) {
					return true;
				}
				if (max && val > max) {
					return true;
				}
			}
			return onValidate?.(val) || false;
		},
		visible,
		type: 'number'
	});

	const classes = $derived(useNumberInputTheme(theme));
</script>

<Field
	{field}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({ class: theme?.inputContainer?.base, disabled: field.disabled })
		}
	}}
	{...rest}
>
	<input
		data-1p-ignore
		type="number"
		{id}
		name={field.name}
		bind:value={field.value}
		bind:this={field.node}
		{placeholder}
		{min}
		{max}
		{step}
		disabled={field.disabled}
		class={classes.input({ disabled: field.disabled })}
	/>
</Field>
