<script lang="ts">
	import { minusIcon } from '../../Icons/minus.js';
	import { plusIcon } from '../../Icons/plus.js';
	import Button from '../../Button/Button.svelte';
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
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
		onChange,
		visible,
		min,
		max,
		step,
		increment,
		...rest
	}: NumberInputProps = $props();

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
		onChange: (v) => onChange?.(v),
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
		onValidate: (val) => {
			if (typeof val === 'number') {
				if (min !== undefined && val < min) {
					return true;
				}
				if (max !== undefined && val > max) {
					return true;
				}
			}
			return onValidate?.(val) || false;
		},
		get visible() {
			return visible;
		},
		type: 'number'
	});

	const classes = $derived(useNumberInputTheme(theme));

	const configuredIncrement = $derived(increment ?? step ?? 1);
	const buttonIncrement = $derived(
		Number.isFinite(configuredIncrement) && configuredIncrement !== 0
			? Math.abs(configuredIncrement)
			: 1
	);
	const numericValue = $derived(
		typeof field.value === 'number' && Number.isFinite(field.value) ? field.value : null
	);
	const canDecrement = $derived(
		!field.disabled && (numericValue === null || min === undefined || numericValue > min)
	);
	const canIncrement = $derived(
		!field.disabled && (numericValue === null || max === undefined || numericValue < max)
	);
	const controlButtonClass = $derived.by(() => {
		if (rest.size === 'small') return '!size-5';
		if (rest.size === 'large') return '!size-7';
		return '!size-6';
	});

	const countDecimalPlaces = (value: number) => {
		const valueText = String(value);
		if (valueText.includes('e-')) {
			return Number(valueText.split('e-')[1]) || 0;
		}
		return valueText.split('.')[1]?.length ?? 0;
	};

	const clampValue = (nextValue: number) => {
		if (min !== undefined && nextValue < min) return min;
		if (max !== undefined && nextValue > max) return max;
		return nextValue;
	};

	const roundToIncrementPrecision = (baseValue: number, nextValue: number) => {
		const precision = Math.min(
			Math.max(countDecimalPlaces(buttonIncrement), countDecimalPlaces(baseValue)),
			12
		);
		return Number(nextValue.toFixed(precision));
	};

	const getEmptyBaseValue = (direction: 1 | -1) => {
		if (direction > 0 && min !== undefined) return min - buttonIncrement;
		if (direction < 0 && max !== undefined) return max + buttonIncrement;
		return 0;
	};

	const changeValue = (direction: 1 | -1) => {
		if (field.disabled) return;

		const baseValue = numericValue ?? getEmptyBaseValue(direction);
		field.value = clampValue(
			roundToIncrementPrecision(baseValue, baseValue + direction * buttonIncrement)
		);
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
		class={classes.input({ disabled: field.disabled, size: rest.size })}
	/>
	<div class="flex shrink-0 items-center gap-0.5">
		<Button
			type="button"
			variant="ghost"
			color="foreground"
			size={rest.size}
			squared
			label="Decrease value"
			disabled={!canDecrement}
			class={controlButtonClass}
			prefix={minusIcon}
			onClick={() => changeValue(-1)}
		/>
		<Button
			type="button"
			variant="ghost"
			color="foreground"
			size={rest.size}
			squared
			label="Increase value"
			disabled={!canIncrement}
			class={controlButtonClass}
			prefix={plusIcon}
			onClick={() => changeValue(1)}
		/>
	</div>
</Field>
