<script lang="ts" module>
	import { setComponentTheme, useComponentTheme } from '$lib/utils/cva.js';
	import { calendarInputTheme } from '$lib/components/Form/Calendar/calendarInput.js';
	export const setCalendarInputTheme =
		setComponentTheme<typeof calendarInputTheme>('calendarInput');
	export const useCalendarInputTheme = useComponentTheme('calendarInput', calendarInputTheme);
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
		containerClass,
		headerClass,
		dayClass,
		weekdayClass,
		gridClass,
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

	const classes = $derived(useCalendarInputTheme(theme));
</script>

<Field
	{field}
	theme={{
		...(theme || {}),
		inputContainer: {
			...(theme?.inputContainer || {}),
			base: classes.container({ class: theme?.inputContainer?.base })
		}
	}}
	{...rest}
>
	<CalendarPrimitive
		onChange={(v: any) => {
			field.value = v;
		}}
		value={field.value as any}
		type={type || 'calendar'}
		{disabledDates}
		{minDate}
		{maxDate}
		{view}
		{weekStartsOnMonday}
		{weekdayLength}
		containerClass={classes.container({ class: containerClass })}
		headerClass={classes.header({ class: headerClass })}
		dayClass={classes.day({ class: dayClass })}
		weekdayClass={classes.weekday({ class: weekdayClass })}
		gridClass={classes.grid({ class: gridClass })}
		{cell}
		{buttons}
		{header}
		{headerProps}
	/>
</Field>
