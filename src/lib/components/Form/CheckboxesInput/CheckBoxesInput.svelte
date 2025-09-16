<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { checkBoxesInputTheme } from './checkBoxesInput.js';
	export const setCheckBoxesInputTheme =
		setComponentTheme<typeof checkBoxesInputTheme>('checkboxesInput');
	export const useCheckBoxesInputTheme = useComponentTheme('checkboxesInput', checkBoxesInputTheme);
</script>

<script lang="ts" generics="Option extends CheckBoxesOption">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { CheckBoxesOption, CheckBoxesInputProps } from './checkBoxesInput.js';
	import Slot from '../../Slot/Slot.svelte';
	import { checkIcon } from '$lib/components/Icons/check.js';

	let {
		value = $bindable([]),
		errors = $bindable([]),
		focused = $bindable(false),
		required = false,
		options,
		mode = 'normal',
		theme,
		disabled,
		name,
		onValidate,
		readonly,
		visible,
		field: providedField,
		label,
		...rest
	}: CheckBoxesInputProps<Option> = $props();

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
		onValidate,
		name,
		readonly,
		visible,
		type: 'checkboxes'
	});

	const componentTheme = useComponentTheme('checkboxesInput', checkBoxesInputTheme)(theme);
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
	class={componentTheme.checkboxesInput({ mode })}
	theme={{
		...theme,
		inputContainer: {
			...theme?.inputContainer,
			base: componentTheme.checkboxesInputContainer({ mode, class: theme?.inputContainer?.base })
		}
	}}
>
	{#each options as option (option.value)}
		{@const checked = field.value?.includes(option.value)}
		{@const optionId = `${field.name}-${option.value}`}
		<label for={optionId} class={componentTheme.checkboxesInputItem({ mode, checked })}>
			<input
				hidden
				onchange={() => {
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
			/>

			<!-- Checkbox Button Track -->
			<div class={componentTheme.checkboxesInputItemTrack({ mode, checked })}></div>

			<!-- Checkbox Button Thumb -->
			<div class={componentTheme.checkboxesInputItemThumb({ checked, mode })}>
				{@render checkIcon({ size: 40 })}
			</div>

			<!-- Label -->
			<Slot render={option.label} class={componentTheme.checkboxesInputItemLabel()} />

			<!-- Description -->
			<Slot render={option.description} class={componentTheme.checkboxesInputItemDescription()} />
		</label>
	{/each}
</Field>
