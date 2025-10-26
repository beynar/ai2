<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { calendarTheme } from '$lib/components/Form/Calendar/calendar.theme.js';
	export const setCalendarInputTheme = setComponentTheme<typeof calendarTheme>('calendar');
	export const useCalendarInputTheme = useComponentTheme('calendar', calendarTheme);
</script>

<script lang="ts">
	import type { CalendarInputProps, CalendarType } from './calendarInput.js';
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/fieldState.svelte.js';
	import CalendarPrimitive from './CalendarPrimitive.svelte';

	type T = $$Generic<CalendarType>;

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		type = 'calendar',
		required = false,
		disabled,
		name,
		onValidate,
		onChange,
		readonly,
		visible,
		theme,
		disabledDates,
		view,
		weekStartsOnMonday,
		weekdayLength,
		minDate,
		maxDate,
		cell,
		buttons,
		header,
		headerProps,
		...rest
	}: CalendarInputProps<T> = $props();

	const id = $props.id();

	const field = createFieldState({
		id,
		get value() {
			return value;
		},
		set value(v: any) {
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
			onChange?.(v as any);
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
		type: (type || 'calendar') as T
	});
</script>

<Field {field} theme={theme?.field} {...rest}>
	<CalendarPrimitive
		onChange={(v: any) => {
			field.value = v;
		}}
		theme={theme?.calendar}
		value={field.value as any}
		type={type || 'calendar'}
		{disabledDates}
		{minDate}
		{maxDate}
		{view}
		{weekStartsOnMonday}
		{weekdayLength}
		{cell}
		{buttons}
		{header}
		{headerProps}
	/>
</Field>
