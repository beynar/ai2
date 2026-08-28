<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import { calendarBlankIcon } from '$lib/components/Icons/calendarBlank.js';
	import Popover from '$lib/components/Popover/Popover.svelte';
	import CalendarPrimitive from '../Calendar/CalendarPrimitive.svelte';
	import {
		getCalendarDateKey,
		normalizeCalendarDate,
		type CalendarType,
		type CalendarValue
	} from '../Calendar/useCalendar.svelte.js';
	import type {
		DateSelectorMode,
		DateSelectorProps,
		DateSelectorValue
	} from './dateSelector.props.js';
	import { useDateSelectorTheme } from './dateSelector.theme.js';

	type Mode = $$Generic<DateSelectorMode>;
	let {
		mode = 'date' as Mode,
		value = $bindable(),
		open = $bindable(false),
		closeOnSelect = false,
		presets = [],
		trigger,
		position = 'bottom-start',
		offset,
		mobileSheet = false,
		view = 'single',
		weekStartsOnMonday = true,
		weekdayLength = 'narrow',
		locale,
		minDate,
		maxDate,
		disabledDates = [],
		disabled = false,
		calendarLabel = 'Choose dates',
		id,
		class: className,
		onChange,
		theme,
		calendarTheme
	}: DateSelectorProps<Mode> = $props();

	const classes = $derived(useDateSelectorTheme(theme));
	const calendarType = $derived(
		(mode === 'date'
			? 'calendar'
			: mode === 'range'
				? 'calendar-range'
				: 'calendar-multiple') as CalendarType
	);
	// The default trigger is a form control, so it must display its value — a
	// static label would leave the field looking empty after a selection.
	const formatDay = (date: Date) => date.toLocaleDateString(locale);
	const defaultTriggerLabel = $derived.by(() => {
		if (mode === 'date') {
			const date = value as Date | null;
			return date ? formatDay(date) : 'Choose dates';
		}
		if (mode === 'range') {
			const range = value as [Date | null, Date | null] | null;
			if (!range || (!range[0] && !range[1])) return 'Choose dates';
			const side = (date: Date | null) => (date ? formatDay(date) : '…');
			return `${side(range[0])} – ${side(range[1])}`;
		}
		const dates = value as Date[] | undefined;
		return dates?.length ? dates.map(formatDay).join(', ') : 'Choose dates';
	});
	const resolvedTrigger = $derived(
		trigger === undefined
			? {
					content: defaultTriggerLabel,
					suffix: calendarBlankIcon,
					disabled
				}
			: typeof trigger === 'object' && trigger !== null
				? { ...trigger, disabled: disabled || trigger.disabled }
				: trigger
	);
	const mergedCalendarTheme = $derived({
		...calendarTheme,
		root: {
			...calendarTheme?.root,
			base: classes.calendar({ class: calendarTheme?.root?.base })
		}
	});

	function normalizeValue(nextValue: DateSelectorValue<Mode>): DateSelectorValue<Mode> {
		if (mode === 'date') {
			const date = nextValue as Date | null;
			return (date ? normalizeCalendarDate(date) : null) as DateSelectorValue<Mode>;
		}
		if (mode === 'range') {
			const range = nextValue as [Date | null, Date | null] | null;
			return (
				range
					? [
							range[0] ? normalizeCalendarDate(range[0]) : null,
							range[1] ? normalizeCalendarDate(range[1]) : null
						]
					: null
			) as DateSelectorValue<Mode>;
		}
		return (nextValue as Date[])
			.map(normalizeCalendarDate)
			.sort((first, second) => first.getTime() - second.getTime()) as DateSelectorValue<Mode>;
	}

	function commitValue(nextValue: DateSelectorValue<Mode>, isSelectionComplete = true) {
		const normalizedValue = normalizeValue(nextValue);
		value = normalizedValue;
		onChange?.(normalizedValue);
		if (closeOnSelect && isSelectionComplete) open = false;
	}

	function handleCalendarChange(nextValue: CalendarValue<CalendarType>) {
		const isSelectionComplete =
			mode !== 'range' ||
			(mode === 'range' &&
				!!(nextValue as [Date | null, Date | null] | null)?.[0] &&
				!!(nextValue as [Date | null, Date | null] | null)?.[1]);
		commitValue(nextValue as DateSelectorValue<Mode>, isSelectionComplete);
	}

	function isPresetSelected(presetValue: DateSelectorValue<Mode>) {
		if (mode === 'date') {
			const currentDate = value as Date | null | undefined;
			const presetDate = presetValue as Date | null;
			return currentDate && presetDate
				? getCalendarDateKey(currentDate) === getCalendarDateKey(presetDate)
				: currentDate === presetDate;
		}

		if (mode === 'range') {
			const currentRange = value as [Date | null, Date | null] | null | undefined;
			const presetRange = presetValue as [Date | null, Date | null] | null;
			if (!currentRange || !presetRange) return currentRange === presetRange;
			return currentRange.every((date, index) => {
				const presetDate = presetRange[index];
				return date && presetDate
					? getCalendarDateKey(date) === getCalendarDateKey(presetDate)
					: date === presetDate;
			});
		}

		const currentDates = (value as Date[] | undefined) ?? [];
		const presetDates = presetValue as Date[];
		if (currentDates.length !== presetDates.length) return false;
		const currentKeys = currentDates.map(getCalendarDateKey).sort();
		const presetKeys = presetDates.map(getCalendarDateKey).sort();
		return currentKeys.every((dateKey, index) => dateKey === presetKeys[index]);
	}
</script>

<Popover
	{id}
	bind:open
	{position}
	{offset}
	{mobileSheet}
	mobileSheetSizeTransition={false}
	trigger={resolvedTrigger}
	class={classes.popover({ class: className })}
>
	{#snippet children()}
		<div class={classes.root({ withPresets: presets.length > 0, view })}>
			{#if presets.length > 0}
				<div class={classes.presets()} aria-label="Preset dates">
					{#each presets as preset (preset.label)}
						<Button
							variant={isPresetSelected(preset.value) ? 'soft' : 'ghost'}
							size="small"
							fullWidth
							{disabled}
							class={classes.preset()}
							onClick={() => commitValue(preset.value)}
						>
							{preset.label}
						</Button>
					{/each}
				</div>
			{/if}

			<CalendarPrimitive
				type={calendarType}
				value={value as CalendarValue<CalendarType>}
				{view}
				{weekStartsOnMonday}
				{weekdayLength}
				{locale}
				{minDate}
				{maxDate}
				{disabledDates}
				{disabled}
				ariaLabel={calendarLabel}
				theme={mergedCalendarTheme}
				onChange={handleCalendarChange}
			/>
		</div>
	{/snippet}
</Popover>
