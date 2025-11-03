<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { PasswordInputProps } from './passwordInput.props.js';
	import { usePasswordInputTheme } from './passwordInput.theme.js';
	import ToggleButton from '$lib/components/ToggleButton/ToggleButton.svelte';
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
		visible,
		type: 'password'
	});

	const classes = $derived(usePasswordInputTheme(theme));
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
	{#snippet prefix()}
		<ToggleButton size="small" bind:checked={showPassword}>
			{#if showPassword}
				{@render eyeIcon({})}
			{:else}
				{@render eyeClosedIcon({})}
			{/if}
		</ToggleButton>
	{/snippet}
	<input
		data-1p-ignore
		type={showPassword ? 'text' : 'password'}
		{id}
		name={field.name}
		bind:value={field.value}
		bind:this={field.node}
		{placeholder}
		class={classes.input({ disabled: field.disabled })}
		disabled={field.disabled}
	/>
</Field>
