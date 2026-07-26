<script
	lang="ts"
	generics="TItemFields extends object = Record<never, never>, TResourceFields extends object = Record<never, never>"
>
	import Button from '$lib/components/Button/Button.svelte';
	import ButtonGroup from '$lib/components/ButtonGroup/ButtonGroup.svelte';
	import CalendarPrimitive from '$lib/components/Form/Calendar/CalendarPrimitive.svelte';
	import { calendarIcon } from '$lib/components/Icons/calendar.js';
	import { caretDownIcon } from '$lib/components/Icons/caretDown.js';
	import { caretLeftIcon } from '$lib/components/Icons/caretLeft.js';
	import { caretRightIcon } from '$lib/components/Icons/caretRight.js';
	import Popover from '$lib/components/Popover/Popover.svelte';
	import PopupMenu from '$lib/components/PopupMenu/PopupMenu.svelte';
	import SegmentedControl from '$lib/components/SegmentedControl/SegmentedControl.svelte';
	import Slot from '$lib/components/Slot/Slot.svelte';
	import type { Messages } from '$lib/i18n/en.js';
	import type { Density, Colors } from '$lib/types/theme.js';
	import type { Snippet } from 'svelte';
	import {
		fromDateJumpDate,
		getDateJumpBounds,
		getDateJumpDisabledDates,
		getDateJumpToday,
		toDateJumpDate
	} from './eventCalendar.dateJump.js';
	import {
		getHiddenWeekdays,
		getMaximumDateProfileAnchor,
		getZonedDay,
		parseDateOnly
	} from './eventCalendar.date.js';
	import type { EventCalendarHeaderPayload, EventCalendarSnapshot } from './eventCalendar.props.js';
	import type { EventCalendarState } from './eventCalendar.state.svelte.js';
	import type { EventCalendarClasses } from './eventCalendar.theme.js';
	import type { EventCalendarView } from './eventCalendar.types.js';

	let {
		calendar,
		snapshot,
		messages,
		direction,
		showDatePicker,
		density,
		color,
		disabled,
		stickyHeader,
		scrollMode,
		classes,
		header,
		actions
	}: {
		calendar: EventCalendarState<TItemFields, TResourceFields>;
		snapshot: EventCalendarSnapshot<TItemFields, TResourceFields>;
		messages: Messages;
		direction: 'ltr' | 'rtl';
		showDatePicker: boolean;
		density: Density;
		color: Colors;
		disabled: boolean;
		stickyHeader: boolean;
		scrollMode: 'contained' | 'page';
		classes: EventCalendarClasses;
		header?: Snippet<[EventCalendarHeaderPayload<TItemFields, TResourceFields>]>;
		actions?: Snippet<[EventCalendarSnapshot<TItemFields, TResourceFields>]>;
	} = $props();

	let pickerYear = $state(1970);
	let pickerMonth = $state(0);

	$effect.pre(() => {
		const anchorDay = parseDateOnly(getZonedDay(calendar.date, calendar.timeZone));
		pickerYear = anchorDay.year;
		pickerMonth = anchorDay.month - 1;
	});

	const profile = $derived(calendar.dateProfile);
	const hiddenWeekdays = $derived(getHiddenWeekdays(calendar));
	const pickerValue = $derived(toDateJumpDate(getZonedDay(calendar.date, calendar.timeZone)));
	const maximumPickerAnchor = $derived(getMaximumDateProfileAnchor(calendar));
	const pickerBounds = $derived(
		getDateJumpBounds(calendar.validRange, calendar.timeZone, maximumPickerAnchor)
	);
	const pickerDisabledDates = $derived(
		getDateJumpDisabledDates(pickerYear, pickerMonth, hiddenWeekdays)
	);
	const pickerToday = $derived(getDateJumpToday(calendar.todayInstant, calendar.timeZone));
	const previousIcon = $derived(direction === 'rtl' ? caretRightIcon : caretLeftIcon);
	const nextIcon = $derived(direction === 'rtl' ? caretLeftIcon : caretRightIcon);
	const viewLabels = $derived<Record<EventCalendarView, string>>({
		month: messages.eventCalendarMonthView,
		week: messages.eventCalendarWeekView,
		day: messages.eventCalendarDayView,
		days: messages.eventCalendarDaysView,
		agenda: messages.eventCalendarAgendaView,
		resource: messages.eventCalendarResourceView
	});
	const viewItems = $derived(
		calendar.enabledViews.map((enabledView) => ({
			value: enabledView,
			label: viewLabels[enabledView],
			ariaLabel: viewLabels[enabledView],
			disabled
		}))
	);
	const viewMenuItems = $derived(
		calendar.enabledViews.map((enabledView) => ({
			type: 'option' as const,
			title: viewLabels[enabledView],
			selected: enabledView === calendar.view,
			disabled,
			onClick: () => calendar.setView(enabledView)
		}))
	);
	const previousButton = $derived({
		type: 'button' as const,
		prefix: previousIcon,
		label: messages.eventCalendarPrevious,
		onClick: () => calendar.previous()
	});
	const nextButton = $derived({
		type: 'button' as const,
		prefix: nextIcon,
		label: messages.eventCalendarNext,
		onClick: () => calendar.next()
	});
	const currentViewLabel = $derived(viewLabels[calendar.view]);
</script>

<div
	data-event-calendar-part="header"
	class={classes.header({
		density,
		color,
		view: calendar.view,
		disabled,
		class:
			stickyHeader && scrollMode === 'page'
				? 'sticky top-[var(--event-calendar-sticky-offset)] z-40'
				: undefined
	})}
>
	{#if header}
		{@const headerPayload = {
			...snapshot,
			previous: previousPart,
			today: todayPart,
			next: nextPart,
			title: titlePart,
			viewSwitcher: viewSwitcherPart,
			datePicker: datePickerPart,
			actions: actionsPart
		} satisfies EventCalendarHeaderPayload<TItemFields, TResourceFields>}
		<Slot render={header} payload={headerPayload} />
	{:else}
		<div
			data-event-calendar-part="navigation"
			class={classes.navigation({ density, color, view: calendar.view, disabled })}
		>
			<ButtonGroup
				items={[previousButton, nextButton]}
				size="small"
				variant="ghost"
				color="neutral"
				{disabled}
			/>
			{@render todayPart()}
		</div>
		{@render titlePart()}
		{@render datePickerPart()}
		{@render viewSwitcherPart()}
		{@render actionsPart()}
	{/if}
</div>

<span class="sr-only" aria-live="polite">
	{messages.eventCalendarViewAnnouncement(currentViewLabel)}
</span>

{#snippet previousPart()}
	<Button {...previousButton} squared size="small" variant="ghost" color="neutral" {disabled} />
{/snippet}

{#snippet todayPart()}
	<Button
		type="button"
		size="small"
		variant="outline"
		{color}
		{disabled}
		onClick={() => calendar.today()}
	>
		{messages.eventCalendarToday}
	</Button>
{/snippet}

{#snippet nextPart()}
	<Button {...nextButton} squared size="small" variant="ghost" color="neutral" {disabled} />
{/snippet}

{#snippet titlePart()}
	<div
		role="status"
		data-event-calendar-part="title"
		class={classes.title({ density, color, view: calendar.view, disabled })}
		aria-live="polite"
		aria-label={messages.eventCalendarRangeAnnouncement(profile.title)}
	>
		{profile.title}
	</div>
{/snippet}

{#snippet viewSwitcherPart()}
	<div
		data-event-calendar-part="view-switcher"
		class={classes.viewSwitcher({ density, color, view: calendar.view, disabled })}
	>
		<div class="hidden @2xl:block">
			<SegmentedControl
				items={viewItems}
				value={calendar.view}
				size="small"
				{color}
				ariaLabel={messages.eventCalendarViewSwitcher}
				onChange={(nextView) => calendar.setView(nextView)}
			/>
		</div>
		<div class="@2xl:hidden">
			<PopupMenu position="bottom-end" menu={{ items: viewMenuItems, density: 'small' }}>
				{#snippet trigger(popover)}
					<Button
						type="button"
						size="small"
						variant="outline"
						{color}
						suffix={caretDownIcon}
						label={messages.eventCalendarViewMenu}
						aria-haspopup="menu"
						aria-expanded={popover.isOpen}
						{disabled}
						onClick={() => popover.toggle()}
						{@attach popover.reference}
					>
						{currentViewLabel}
					</Button>
				{/snippet}
			</PopupMenu>
		</div>
	</div>
{/snippet}

{#snippet datePickerPart()}
	{#if showDatePicker}
		<Popover position="bottom-start">
			{#snippet trigger(popover)}
				<Button
					type="button"
					squared
					size="small"
					variant="ghost"
					color="neutral"
					prefix={calendarIcon}
					label={messages.eventCalendarChooseDate}
					aria-haspopup="dialog"
					aria-expanded={popover.isOpen}
					{disabled}
					onClick={() => {
						calendar.refreshNow();
						popover.toggle();
					}}
					{@attach popover.reference}
				/>
			{/snippet}
			{#snippet children(popover)}
				<CalendarPrimitive
					type="calendar"
					value={pickerValue}
					weekStartsOn={calendar.weekStartsOn}
					today={pickerToday}
					locale={calendar.locale}
					minDate={pickerBounds.minDate}
					maxDate={pickerBounds.maxDate}
					disabledDates={pickerDisabledDates}
					ariaLabel={messages.eventCalendarChooseDate}
					{disabled}
					onViewChange={({ startYear, startMonth }) => {
						pickerYear = startYear;
						pickerMonth = startMonth;
					}}
					onChange={(selectedDate) => {
						if (!selectedDate) return;
						calendar.goTo(fromDateJumpDate(selectedDate));
						popover.close();
					}}
				/>
			{/snippet}
		</Popover>
	{/if}
{/snippet}

{#snippet actionsPart()}
	{#if actions}
		<div
			data-event-calendar-part="actions"
			class={classes.actions({ density, color, view: calendar.view, disabled })}
		>
			<Slot render={actions} payload={snapshot} />
		</div>
	{/if}
{/snippet}
