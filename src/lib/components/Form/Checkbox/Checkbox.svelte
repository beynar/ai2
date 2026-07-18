<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import CheckboxLine from '../CheckboxesInput/CheckboxLine.svelte';
	import { useCheckboxesInputTheme } from '../CheckboxesInput/checkboxesInput.theme.js';
	import type { CheckboxProps } from './checkbox.props.js';

	let {
		value = $bindable(false),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		mode = 'normal',
		indeterminate = false,
		ariaLabel,
		theme,
		disabled,
		name,
		onValidate,
		visible,
		onChange,
		onClick,
		label,
		description,
		...rest
	}: CheckboxProps = $props();

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
		onChange: (checked) => {
			onChange?.(checked);
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
		onValidate: (checked) => {
			if (required && !checked) return true;
			return onValidate?.(checked) || false;
		},
		get name() {
			return name;
		},
		set name(v: string | undefined) {
			name = v;
		},
		get visible() {
			return visible;
		},
		type: 'checkbox'
	});

	const componentTheme = $derived(useCheckboxesInputTheme(theme));

	const setChecked = (checked: boolean) => {
		if (field.disabled) return;
		field.value = checked;
		onClick?.(checked);
	};
</script>

<Field
	attrs={{
		name: field.name,
		id: field.id
	}}
	{field}
	class={componentTheme.root({ mode })}
	theme={{
		...theme,
		inputContainer: {
			...theme?.inputContainer,
			base: componentTheme.checkboxesInputContainer({
				mode,
				class: theme?.inputContainer?.base,
				disabled: field.disabled
			})
		}
	}}
	{...rest}
>
	<CheckboxLine
		id={field.id}
		name={field.name}
		inputValue="true"
		checked={!!field.value}
		{indeterminate}
		{ariaLabel}
		disabled={field.disabled}
		{mode}
		{label}
		{description}
		classes={componentTheme}
		onCheckedChange={setChecked}
		onFocus={() => (field.focused = true)}
		onBlur={() => (field.focused = false)}
	/>
</Field>
