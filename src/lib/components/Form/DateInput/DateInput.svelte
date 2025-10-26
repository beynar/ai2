<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { dateInputTheme } from '$lib/components/Form/DateInput/dateInput.js';
	export const setDateInputTheme = setComponentTheme<typeof dateInputTheme>('dateInput');
	export const useDateInputTheme = useComponentTheme('dateInput', dateInputTheme);
</script>

<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import type { DateInputProps } from '$lib/components/Form/DateInput/dateInput.js';
	import { Maskito } from '@maskito/core';
	import { maskitoDateOptionsGenerator } from '@maskito/kit';
	import { untrack } from 'svelte';

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		format = 'dd/mm/yyyy',
		placeholder = format,
		locale,
		separator,
		required = false,
		theme,
		disabled,
		name,
		onValidate,
		readonly,
		visible,
		...rest
	}: DateInputProps = $props();

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
		onValidate,
		readonly,
		visible,
		type: 'date'
	});

	const classes = $derived(useDateInputTheme(theme));

	$effect(() => {
		const currentValue = value;
		untrack(() => {
			if (field.node) {
				(field.node as HTMLInputElement).value = formatDate(currentValue);
			}
		});
	});

	const formatDate = (date: Date | null) => {
		if (!date) return '';
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	const extractDate = (
		value: string,
		mask: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'mm/yy' | 'mm/yyyy' | 'yyyy' | 'yyyy/mm' | 'yyyy/mm/dd'
	) => {
		const buildRegex = (mask: string) => {
			const parts = mask.split('/');
			const regexParts = parts.map((part) => {
				switch (part) {
					case 'dd':
					case 'mm':
						return '(\\d{2})';
					case 'yyyy':
						return '(\\d{4})';
					case 'yy':
						return '(\\d{2})';
					default:
						return '\\' + part;
				}
			});
			return new RegExp('^' + regexParts.join('\\/') + '$');
		};
		const match = value.match(buildRegex(mask));

		if (!match) return null;

		const parts = mask.split('/');
		let year, month, day;
		parts.forEach((part, index) => {
			const value = match[index + 1];
			switch (part) {
				case 'dd':
					day = value;
					break;
				case 'mm':
					month = value;
					break;
				case 'yyyy':
					year = value;
					break;
				case 'yy':
					year = '20' + value;
					break;
			}
		});

		// Set default values for missing components
		year = year || new Date().getFullYear().toString();
		month = month || '01';
		day = day || '01';

		return new Date(Number(year), Number(month) - 1, Number(day));
	};

	const maskAction = (input: HTMLInputElement) => {
		const mask = maskitoDateOptionsGenerator({ mode: format, separator: '/' });
		const maskedElement = new Maskito(input, mask);

		if (value) {
			input.value = formatDate(value);
		}
		return {
			destroy: () => {
				maskedElement.destroy();
			}
		};
	};

	const handleInput = (e: Event) => {
		const currentValue = (e.currentTarget as HTMLInputElement).value;
		if (currentValue) {
			const date = extractDate(currentValue, format);
			field.value = date;
		}
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
		type="text"
		inputmode="decimal"
		{id}
		name={field.name}
		bind:this={field.node}
		{placeholder}
		class={classes.input()}
		use:maskAction
		oninput={handleInput}
	/>
</Field>
