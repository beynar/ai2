<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { TextInputProps } from './textInput.props.js';
	import { useTextInputTheme } from './textInput.theme.js';

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
		onChange,

		...rest
	}: TextInputProps = $props();

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
		type: 'text'
	});

	const classes = $derived(useTextInputTheme(theme));
</script>

<Field
	{field}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.inputContainer({
				class: theme?.inputContainer?.base,
				disabled: field.disabled,
				size: rest.size
			})
		}
	}}
	{...rest}
>
	<input
		disabled={field.disabled}
		data-1p-ignore
		type="text"
		{id}
		name={field.name}
		bind:value={field.value}
		bind:this={field.node}
		bind:focused={field.focused}
		{placeholder}
		class={classes.input({ disabled: field.disabled, size: rest.size })}
	/>
</Field>
