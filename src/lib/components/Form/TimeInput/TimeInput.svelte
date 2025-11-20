<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { TimeInputProps } from './timeInput.props.js';
	import { useTimeInputTheme } from './timeInput.theme.js';
	import { Maskito } from '@maskito/core';
	import {
		maskitoTimeOptionsGenerator,
		type MaskitoTimeParams,
		maskitoStringifyTime,
		maskitoParseTime
	} from '@maskito/kit';
	import { untrack } from 'svelte';
	import { on } from 'svelte/events';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		as = 'millisecondSinceMidnight',
		format = 'HH:MM',
		maxValues,
		minValues,
		placeholder = format,
		required = false,
		theme,
		disabled,
		name,
		onValidate,
		visible,
		onChange,
		...rest
	}: TimeInputProps = $props();

	const id = $props.id();

	const normalizeValue = (value: number) => {
		return as === 'minuteSinceMidnight'
			? value * 60000
			: as === 'secondSinceMidnight'
				? value * 1000
				: value * 1;
	};
	const denormalizeValue = (value: number) => {
		return as === 'minuteSinceMidnight'
			? value / 60000
			: as === 'secondSinceMidnight'
				? value / 1000
				: value / 1;
	};

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
		onValidate: (value) => {
			const string = maskitoStringifyTime(normalizeValue(value), params);
			const parsed = maskitoParseTime(string, params);
			console.log('parsed', parsed);
			console.log('string', string);
			if (parsed === 0) {
				return true;
			}
			return onValidate?.(value) || false;
		},
		visible,
		type: 'time'
	});

	const classes = $derived(useTimeInputTheme(theme));

	const params = {
		timeSegmentMaxValues: maxValues,
		timeSegmentMinValues: minValues,
		mode: format
	} satisfies MaskitoTimeParams;

	const maskAction = (input: HTMLInputElement) => {
		untrack(() => {
			const mask = maskitoTimeOptionsGenerator(params);
			const maskedElement = new Maskito(input, mask);

			if (value && typeof value === 'number') {
				input.value = maskitoStringifyTime(normalizeValue(value), params);
			}
			const off = on(input, 'input', () => {
				const parsed = maskitoParseTime(input.value, params);
				field.value = denormalizeValue(parsed);
			});

			return () => {
				maskedElement.destroy();
				off();
			};
		});
	};
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
	<input
		data-1p-ignore
		inputmode="decimal"
		{id}
		name={field.name}
		bind:this={field.node}
		{placeholder}
		class={classes.input({ disabled: field.disabled })}
		disabled={field.disabled}
		{@attach maskAction}
	/>
</Field>
