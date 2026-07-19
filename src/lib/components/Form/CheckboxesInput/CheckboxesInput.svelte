<script lang="ts" generics="Option extends CheckboxOption">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import type { CheckboxOption, CheckboxesInputProps } from './checkboxesInput.props.js';
	import { useCheckboxesInputTheme } from './checkboxesInput.theme.js';
	import Slot from '../../Slot/Slot.svelte';
	import { checkIcon } from '$lib/components/Icons/check.js';

	let {
		value = $bindable([]),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		items,
		mode = 'normal',
		theme,
		disabled,
		name,
		onValidate,
		visible,
		field: providedField,
		onChange,
		onClick,
		label,
		...rest
	}: CheckboxesInputProps<Option> = $props();

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
		onChange: (v) => onChange?.(v ?? []),
		get disabled() {
			return disabled;
		},
		set disabled(v: boolean | undefined) {
			disabled = v;
		},
		get required() {
			return required;
		},
		onValidate: (value) => {
			if (required) {
				if (value.length === 0) {
					return true;
				}
			}
			return onValidate?.(value) || false;
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
		type: 'checkboxes'
	});

	const componentTheme = $derived(useCheckboxesInputTheme(theme));
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
	{#each items as option (option.value)}
		{@const checked = field.value?.includes(option.value)}
		{@const optionId = `${field.name}-${option.value}`}
		{@const optionDisabled = Boolean(field.disabled || option.disabled)}
		<button
			type="button"
			disabled={optionDisabled}
			aria-controls={optionId}
			onclick={() => {
				if (optionDisabled) return;
				if (checked) {
					field.value = field.value?.filter((v) => v !== option.value);
				} else {
					field.value = [...(field.value || []), option.value];
				}
				onClick?.(option.value);
			}}
			class={componentTheme.checkboxesInputItem({ mode, checked, disabled: optionDisabled })}
		>
			<input
				hidden
				onchange={() => {
					if (optionDisabled) return;
					if (checked) {
						field.value = field.value?.filter((v) => v !== option.value);
					} else {
						field.value = [...(field.value || []), option.value];
					}
				}}
				style="transform: scale(0); opacity: 0; pointer-events: none; margin: -1px; position: absolute;"
				type="checkbox"
				{checked}
				name={field.name}
				id={optionId}
				value={option.value}
				disabled={optionDisabled}
			/>

			<!-- Checkbox Button Track -->
			<div
				class={componentTheme.checkboxesInputItemTrack({ mode, checked, disabled: optionDisabled })}
			></div>

			<!-- Checkbox Button Thumb -->
			<div
				class={componentTheme.checkboxesInputItemThumb({ checked, mode, disabled: optionDisabled })}
			>
				{@render checkIcon({ size: 40 })}
			</div>

			<!-- Label -->
			<Slot render={option.label} class={componentTheme.checkboxesInputItemLabel()} />

			<!-- Description -->
			<Slot render={option.description} class={componentTheme.checkboxesInputItemDescription()} />
		</button>
	{/each}
</Field>
