<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { timeInputTheme } from '$lib/components/Form/TimeInput/timeInput.def.js';
	export const setTimeInputTheme = setComponentTheme<typeof timeInputTheme>('timeInput');
	export const useTimeInputTheme = useComponentTheme('timeInput', timeInputTheme);
</script>

<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { TimeInputProps } from '$lib/components/Form/TimeInput/timeInput.def.js';
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
		readonly,
		visible,
		...rest
	}: TimeInputProps = $props();

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
			// Date value changed
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
			const string = maskitoStringifyTime(value, params);
			const parsed = maskitoParseTime(string, params);
			if (parsed === 0) {
				return true;
			}
			return onValidate?.(value) || false;
		},
		readonly,
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
				switch (as) {
					case 'minuteSinceMidnight':
						input.value = maskitoStringifyTime(value * 60000, params);
						break;
					case 'secondSinceMidnight':
						input.value = maskitoStringifyTime(value * 1000, params);
						break;
					case 'millisecondSinceMidnight':
						input.value = maskitoStringifyTime(value, params);
						break;
				}
			}
			const off = on(input, 'input', () => {
				const parsed = maskitoParseTime(input.value, params);
				switch (as) {
					case 'minuteSinceMidnight':
						field.value = parsed / 60000;
						break;
					case 'secondSinceMidnight':
						field.value = parsed / 1000;
						break;
					case 'millisecondSinceMidnight':
						field.value = parsed;
						break;
				}
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
			base: classes.inputContainer({ class: theme?.inputContainer?.base })
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
		class={classes.input()}
		{@attach maskAction}
	/>
</Field>
