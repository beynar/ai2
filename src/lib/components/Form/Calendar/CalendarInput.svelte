<script lang="ts">
	import type { CalendarInputProps } from './calendarInput.props.js';
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import CalendarPrimitive from './CalendarPrimitive.svelte';
	import { useCalendarInputTheme } from './calendar.theme.js';

	type T = $$Generic<'calendar' | 'calendar-range'>;

	let {
		value = $bindable(null as CalendarInputProps<T>['value']),
		errors = $bindable([]),
		focused = $bindable(false),
		type = 'calendar' as T,
		required = false,
		disabled,
		name,
		onValidate,
		onChange,
		visible,
		theme,
		disabledDates = [],
		view,
		weekStartsOnMonday,
		weekStartsOn,
		today,
		weekdayLength,
		locale,
		ariaLabel,
		minDate,
		maxDate,
		cell,
		buttons,
		header,
		todayBadge,
		onViewChange,
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
			return (type || 'calendar') as T;
		}
	});
</script>

<Field {field} theme={theme?.field} {...rest}>
	<!-- display:contents wrapper: zero layout impact, catches bubbled focus so
	     bind:focused works like on the text inputs. -->
	<div
		class="contents"
		onfocusin={() => (field.focused = true)}
		onfocusout={(e) => {
			if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) {
				field.focused = false;
			}
		}}
	>
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
			{weekStartsOn}
			{today}
			{weekdayLength}
			{locale}
			{ariaLabel}
			disabled={field.disabled}
			{cell}
			{buttons}
			{header}
			{todayBadge}
			{onViewChange}
		/>
	</div>
</Field>
