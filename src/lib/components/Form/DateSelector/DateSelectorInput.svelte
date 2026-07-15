<script lang="ts">
	import Field from '../Field/Field.svelte';
	import { createFieldState } from '../Field/field.state.svelte.js';
	import DateSelector from './DateSelector.svelte';
	import type { DateSelectorInputMode, DateSelectorInputProps } from './dateSelector.props.js';

	type Mode = $$Generic<DateSelectorInputMode>;

	let {
		value = $bindable(null),
		errors = $bindable([]),
		focused = $bindable(false),
		open = $bindable(false),
		mode = 'date' as Mode,
		required = false,
		disabled,
		name,
		onValidate,
		onChange,
		visible,
		theme,
		closeOnSelect,
		presets,
		trigger,
		position,
		offset,
		mobileSheet,
		view,
		weekStartsOnMonday,
		weekdayLength,
		locale,
		minDate,
		maxDate,
		disabledDates,
		calendarLabel,
		id: selectorId,
		calendarTheme,
		size,
		...rest
	}: DateSelectorInputProps<Mode> = $props();

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
			return (mode === 'date' ? 'date' : 'calendar-range') as Mode extends 'date'
				? 'date'
				: 'calendar-range';
		}
	});

	// The selector panel is portaled, so focus moving into it looks like a focus
	// loss from here. Treat "popover open" as focused alongside real focus-within.
	let focusWithin = $state(false);
	$effect(() => {
		field.focused = focusWithin || open;
	});
</script>

<Field {field} {size} theme={theme?.field} {...rest}>
	<!-- display:contents wrapper: zero layout impact, catches bubbled focus on the trigger. -->
	<div
		class="contents"
		onfocusin={() => (focusWithin = true)}
		onfocusout={(e) => {
			if (!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget)) {
				focusWithin = false;
			}
		}}
	>
		<DateSelector
			{mode}
			value={field.value as any}
			onChange={(v: any) => {
				field.value = v;
			}}
			bind:open
			{closeOnSelect}
			{presets}
			{trigger}
			{position}
			{offset}
			{mobileSheet}
			{view}
			{weekStartsOnMonday}
			{weekdayLength}
			{locale}
			{minDate}
			{maxDate}
			{disabledDates}
			{calendarLabel}
			id={selectorId}
			disabled={field.disabled}
			theme={theme?.selector}
			{calendarTheme}
		/>
	</div>
</Field>
