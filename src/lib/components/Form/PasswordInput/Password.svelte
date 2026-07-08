<script lang="ts">
	import { tick } from 'svelte';
	import Field from '../Field/Field.svelte';
	import FieldActionButton from '../Field/FieldActionButton.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import type { PasswordInputProps } from './passwordInput.props.js';
	import { usePasswordInputTheme } from './passwordInput.theme.js';
	import { eyeClosedIcon } from '$lib/components/Icons/eyeClosed.js';
	import { eyeIcon } from '$lib/components/Icons/eye.js';

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
		...rest
	}: PasswordInputProps = $props();

	let showPassword = $state(false);
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
		onChange: () => {},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		get required() {
			return required;
		},
		get name() {
			return name;
		},
		set name(v: string | undefined) {
			name = v;
		},
		get onValidate() {
			return onValidate;
		},
		get visible() {
			return visible;
		},
		type: 'password'
	});

	const classes = $derived(usePasswordInputTheme(theme));

	const togglePasswordVisibility = async () => {
		const input = field.node instanceof HTMLInputElement ? field.node : null;
		const selectionStart = input?.selectionStart;
		const selectionEnd = input?.selectionEnd;
		const selectionDirection = input?.selectionDirection ?? 'none';

		showPassword = !showPassword;
		await tick();

		if (input && selectionStart != null && selectionEnd != null) {
			input.focus({ preventScroll: true });
			input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
		}
	};
</script>

<Field
	{field}
	size={rest.size}
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
		data-1p-ignore
		type={showPassword ? 'text' : 'password'}
		{id}
		name={field.name}
		bind:value={field.value}
		bind:this={field.node}
		{placeholder}
		class={classes.input({ disabled: field.disabled, size: rest.size })}
		disabled={field.disabled}
	/>
	<FieldActionButton
		active={showPassword}
		size={rest.size}
		label={showPassword ? 'Hide password' : 'Show password'}
		aria-pressed={showPassword}
		disabled={field.disabled}
		prefix={showPassword ? eyeIcon : eyeClosedIcon}
		onClick={togglePasswordVisibility}
	/>
</Field>
