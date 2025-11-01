<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { textInputTheme } from '$lib/components/Form/TextInput/textInput.js';
	export const setTextInputTheme = setComponentTheme<typeof textInputTheme>('textInput');
	export const useTextInputTheme = useComponentTheme('textInput', textInputTheme);
</script>

<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { TextInputProps } from '$lib/components/Form/TextInput/textInput.js';

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
		readonly,
		visible,
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
		onValidate,
		readonly,
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
			base: classes.inputContainer({ class: theme?.inputContainer?.base })
		}
	}}
	{...rest}
>
	<input
		disabled={field.disabled}
		readonly={field.readonly}
		data-1p-ignore
		type="text"
		{id}
		name={field.name}
		bind:value={field.value}
		bind:this={field.node}
		bind:focused={field.focused}
		{placeholder}
		class={classes.input()}
	/>
</Field>
