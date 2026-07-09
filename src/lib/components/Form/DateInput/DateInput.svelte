<script lang="ts">
	import { Maskito } from '@maskito/core';
	import { maskitoDateOptionsGenerator } from '@maskito/kit';
	import CalendarPrimitive from '../Calendar/CalendarPrimitive.svelte';
	import Field from '../Field/Field.svelte';
	import FieldActionButton from '../Field/FieldActionButton.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import { calendarBlankIcon } from '../../Icons/calendarBlank.js';
	import Popover from '../../Popover/Popover.svelte';
	import type { PopoverState } from '../../Popover/popover.state.svelte.js';
	import type { DateInputProps } from './dateInput.props.js';
	import { useDateInputTheme } from './dateInput.theme.js';

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
		onChange,
		visible,
		type = 'date',
		...rest
	}: DateInputProps = $props();

	const id = $props.id();
	const dateSeparator = $derived(separator || '/');
	const calendarDisabledDates: (Date | [Date, Date])[] = [];
	let isCalendarOpen = $state(false);

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
		get type() {
			return type;
		}
	});

	const classes = $derived(useDateInputTheme(theme));

	const formatDate = (date: Date | null) => {
		if (!date) return '';
		const segments = {
			dd: String(date.getDate()).padStart(2, '0'),
			mm: String(date.getMonth() + 1).padStart(2, '0'),
			yy: String(date.getFullYear()).slice(-2),
			yyyy: String(date.getFullYear())
		};

		return format
			.split('/')
			.map((part) => segments[part as keyof typeof segments])
			.join(dateSeparator);
	};

	const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const extractDate = (inputValue: string) => {
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
			return new RegExp('^' + regexParts.join(escapeRegex(dateSeparator)) + '$');
		};
		const match = inputValue.match(buildRegex(format));

		if (!match) return null;

		const parts = format.split('/');
		let year: string | undefined;
		let month: string | undefined;
		let day: string | undefined;
		parts.forEach((part, index) => {
			const segmentValue = match[index + 1];
			switch (part) {
				case 'dd':
					day = segmentValue;
					break;
				case 'mm':
					month = segmentValue;
					break;
				case 'yyyy':
					year = segmentValue;
					break;
				case 'yy':
					year = '20' + segmentValue;
					break;
			}
		});

		year = year || new Date().getFullYear().toString();
		month = month || '01';
		day = day || '01';

		const yearNumber = Number(year);
		const monthNumber = Number(month);
		const dayNumber = Number(day);
		const date = new Date(yearNumber, monthNumber - 1, dayNumber);

		if (
			date.getFullYear() !== yearNumber ||
			date.getMonth() !== monthNumber - 1 ||
			date.getDate() !== dayNumber
		) {
			return null;
		}

		return date;
	};

	const syncInputValue = (date: Date | null) => {
		if (field.node instanceof HTMLInputElement) {
			field.node.value = formatDate(date);
		}
	};

	const maskAction = (input: HTMLInputElement) => {
		const mask = maskitoDateOptionsGenerator({ mode: format, separator: dateSeparator });
		const maskedElement = new Maskito(input, mask);

		if (value) {
			input.value = formatDate(value);
		}
		return () => {
			maskedElement.destroy();
		};
	};

	const handleInput = (e: Event) => {
		const currentValue = (e.currentTarget as HTMLInputElement).value;
		if (!currentValue) {
			field.value = null;
			return;
		}

		const date = extractDate(currentValue);
		if (date) {
			field.value = date;
		}
	};

	const handleCalendarChange = (date: Date | null, popover: PopoverState) => {
		field.value = date;
		field.focused = false;
		syncInputValue(date);
		popover.close();
	};

	$effect(() => {
		if (!field.focused) {
			syncInputValue(value);
		}
	});
</script>

<Popover
	id={`${id}-calendar-popover`}
	bind:open={isCalendarOpen}
	position="bottom-start"
	size="normal"
	class={classes.popover({ class: theme?.popover?.base })}
>
	{#snippet children(popover: PopoverState)}
		<div id={`${id}-calendar`} aria-label="Choose date">
			<CalendarPrimitive
				type="calendar"
				value={field.value}
				disabledDates={calendarDisabledDates}
				onChange={(date) => handleCalendarChange(date, popover)}
			/>
		</div>
	{/snippet}

	{#snippet trigger(popover: PopoverState)}
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
			{@attach popover.reference}
		>
			<input
				data-1p-ignore
				type="text"
				inputmode="decimal"
				{id}
				name={field.name}
				bind:this={field.node}
				{placeholder}
				disabled={field.disabled}
				class={classes.input({ disabled: field.disabled, size: rest.size })}
				{@attach maskAction}
				oninput={handleInput}
				onfocus={() => {
					field.focused = true;
					if (!field.disabled) {
						isCalendarOpen = true;
					}
				}}
				onblur={() => {
					field.focused = false;
				}}
			/>
			<FieldActionButton
				active={isCalendarOpen}
				size={rest.size}
				label="Choose date"
				aria-haspopup="dialog"
				aria-expanded={isCalendarOpen}
				aria-controls={isCalendarOpen ? `${id}-calendar` : undefined}
				disabled={field.disabled}
				prefix={calendarBlankIcon}
				onClick={() => {
					if (!field.disabled) {
						popover.toggle();
					}
				}}
			/>
		</Field>
	{/snippet}
</Popover>
