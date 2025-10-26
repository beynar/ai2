<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { passwordInputTheme } from '$lib/components/Form/PasswordInput/passwordInput.js';
	export const setPasswordInputTheme =
		setComponentTheme<typeof passwordInputTheme>('passwordInput');
	export const usePasswordInputTheme = useComponentTheme('passwordInput', passwordInputTheme);
</script>

<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { PasswordInputProps } from '$lib/components/Form/PasswordInput/passwordInput.js';
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
		readonly,
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
		readonly,
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
			base: classes.inputContainer({ class: theme?.inputContainer?.base })
		}
	}}
	{...rest}
>
	{#snippet prefix()}
		<ToggleButton size="small" bind:checked={showPassword}>
			{#if showPassword}
				{@render eyeIcon({ size: 16 })}
			{:else}
				{@render eyeClosedIcon({ size: 16 })}
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
		class={classes.input()}
	/>
</Field>
