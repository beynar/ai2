<script lang="ts" generics="Option extends RadiosOption">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { RadiosOption, RadioInputProps } from './radioInput.props.js';
	import { useRadioInputTheme } from './radioInput.theme.js';
	import Slot from '../../Slot/Slot.svelte';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		options,
		mode = 'normal',
		theme,
		disabled,
		name,
		onValidate,
		visible,
		label,
		onChange,
		onClick,
		...rest
	}: RadioInputProps<Option> = $props();

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
			// console.log('onChange', v);
		},
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		required,
		onValidate,
		name,
		visible,
		type: 'radio'
	});

	const componentTheme = useRadioInputTheme(theme);
</script>

<!-- Create own field wrapper (when used standalone) -->
<Field
	attrs={{
		name: field.name,
		id: field.id
	}}
	as={'fieldset'}
	{field}
	{label}
	class={componentTheme.radiosInput({ mode })}
	{...rest}
	theme={{
		...theme,
		inputContainer: {
			...theme?.inputContainer,
			base: componentTheme.radiosInputContainer({
				mode,
				class: theme?.inputContainer?.base,
				disabled: field.disabled
			})
		}
	}}
>
	{#each options as option (option.value)}
		{@const checked = field.value === option.value}
		{@const optionId = `${field.name}-${option.value}`}
		<button
			aria-label={option.label}
			aria-controls={optionId}
			class={componentTheme.radiosInputItem({ mode, checked, disabled: field.disabled })}
			onclick={() => {
				if (field.disabled) return;
				if (!field.value || field.value !== option.value) {
					field.value = option.value;
				}
				onClick?.(option.value);
			}}
		>
			<input
				hidden
				onchange={() => {
					if (field.disabled) return;
					field.value = option.value;
				}}
				style="transform: scale(0); opacity: 0; pointer-events: none; margin: -1px; position: absolute;"
				type="radio"
				{checked}
				name={field.name}
				id={optionId}
				value={option.value}
				disabled={field.disabled}
			/>

			<!-- Radio Button Track -->
			<div
				class={componentTheme.radiosInputItemTrack({ mode, checked, disabled: field.disabled })}
			></div>

			<!-- Radio Button Thumb -->
			<div
				class={componentTheme.radiosInputItemThumb({ checked, mode, disabled: field.disabled })}
			></div>

			<!-- Label Content -->
			<div class={componentTheme.radiosInputItemLabel()}>
				{#if option.icon}
					<Slot render={option.icon} class={componentTheme.radiosInputItemIcon()} />
				{/if}
				<Slot render={option.label} />
			</div>

			<!-- Description -->
			<Slot render={option.description} class={componentTheme.radiosInputItemDescription()} />
		</button>
	{/each}
</Field>
