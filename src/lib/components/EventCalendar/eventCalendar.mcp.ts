export const eventCalendarDescription = `
# EventCalendar

A typed scheduling calendar for Svelte 5. It renders month, week, day, configurable N-day, agenda, and resource-day views from one occurrence model. The consumer owns loading and persistence; EventCalendar owns range derivation, recurrence expansion, layout, selection, accessible interaction, validation, and immutable mutation transactions.

## Import

~~~svelte
<script lang="ts">
	import { EventCalendar, type EventCalendarItem } from 'svelai/event-calendar';

	let date = $state(new Date('2026-07-15T10:00:00.000Z'));
	let items = $state<EventCalendarItem[]>([]);
</script>

<EventCalendar bind:date bind:items timeZone="Europe/Paris" class="h-[42rem]" />
~~~

'date' and 'timeZone' are required. Contained scrolling also requires a definite height through 'class'. The display-zone name must be 'UTC' or an IANA zone; EventCalendar never infers a server/browser system zone.

## Data model

- Every range is half-open: [start, end). Timed boundaries are Date instants.
- All-day starts and exclusive ends are canonical YYYY-MM-DD strings. Valid civil dates span 0001-01-01 through 9999-12-31, but 9999-12-30 is the last selectable/renderable day because a rendered day needs an exclusive end. An all-day end may be 9999-12-31.
- Items need stable unique ids. Invalid items, resources, views, zones, recurrence, and stale transactions throw EventCalendarError with a public EventCalendarErrorCode.
- 'items' and 'resources' are immutable controlled collections: allocate a fresh outer array for every consumer update and replace changed definitions. EventCalendar never mutates consumer objects.
- EventCalendarItem<TItemFields> and EventCalendarResource<TResourceFields> preserve custom fields through props, snippets, callbacks, and API methods. Custom fields cannot redeclare calendar-owned keys.
- Foreground items can be timed, all-day, multi-day, or recurring. 'display: background' items are display-only and never interactive.
- Timed recurrence requires an explicit 'recurrenceTimeZone'. All-day recurrence remains floating civil dates.

## State and view props

- 'items': EventCalendarItem<TItemFields>[] = [] (bindable)
- 'view': 'month' | 'week' | 'day' | 'days' | 'agenda' | 'resource' = 'month' (bindable)
- 'views': ordered, unique enabled-view list = all six views. Resource is available only with at least one leaf resource.
- 'date': Date (required, bindable anchor instant)
- 'dayCount': positive integer = 3 (bindable; used by 'days')
- 'selection': EventCalendarSelection = empty (bindable)
- 'resources': EventCalendarResource<TResourceFields>[] = []
- 'loading': boolean = false. Marks content busy and blocks content interaction, not navigation.
- 'disabled': boolean = false. Blocks navigation, selection, and mutation.

The component never changes 'view' because its container becomes narrow. Previous/next/today, header controls, and the imperative API reassign bindable state and call matching change callbacks. External assignments do not echo the same callback. Navigation beyond the supported civil domain is a no-op; direct invalid anchors and jumps throw.

## Date, locale, and range props

- 'timeZone': required IANA name or 'UTC'
- 'locale': BCP-47 string; defaults to the active Svelai catalog locale
- 'i18n': per-instance Partial<Messages>
- 'dir': 'ltr' | 'rtl'; defaults to ambient direction
- 'weekStartsOn': 0..6; otherwise locale-derived
- 'validRange': half-open Date range
- 'onRangeChange(info)': receives view, anchor date, time zone, current/render/active/fetch ranges, and exact visibleDays

'fetchRange' is the clipped active rendering/interaction envelope. The consumer must return overlapping non-recurring definitions, recurring sources that expand into the range, moved exception definitions selected by current or reconstructed original occurrence overlap, and every returned exception's source. EventCalendar performs no requests, caching, retries, or error substitution.

## View settings

- Month: 'fixedWeeks=true', 'showOutsideDays=true', 'showWeekends=true', 'weekendDays=[0,6]', 'showWeekNumbers=false', 'maxItemsPerCell="auto"'.
- Time grids: 'dayStartHour=0', 'dayEndHour=24', 'interval=60', 'slotDuration=30', 'snapDuration=15', 'scrollToHour=7'.
- Conversion: 'defaultTimedItemDuration=60' minutes and 'defaultAllDayItemDuration=1' civil day.
- Agenda: 'agendaDayCount=30'.
- Current time: 'nowIndicator=true', 'nowIndicatorInterval=30000'.
- Work time: 'offDays=false', 'businessHours=[]', 'constrainToBusinessHours=false'.
- Scrolling/chrome: 'scrollMode="contained"', 'scrollbars="custom"', 'stickyHeader=false', 'showHeader=true', 'showDatePicker=false', 'showItemTooltip=false'.

Numeric and time settings are validated and never silently clamped. Hidden weekdays are removed from 'visibleDays'; day and agenda counts count rendered days.

## Interaction and persistence

Move, resize-start, resize-end, API updates, keyboard mode, and the single-pointer action menu share one proposal/validation/commit pipeline. Empty-slot drag creation produces a selected range; EventCalendar never fabricates a domain item.

- 'interactions': partial policy. Drag, resize, slot selection, keyboard, and single-pointer controls default on; duration preservation across all-day conversion defaults off.
- 'createActivation': drag-create only; defaults to distancePx 5, touchDelayMs 300, touchTolerancePx 8.
- 'allowOverlap': boolean or predicate = true.
- 'canUpdateItem(proposal)': synchronous live item validation.
- 'onItemUpdate(proposal)': accept, reject with false, or adjust placement/resource. Adjustments are fully revalidated.
- 'canSelectSlot(slot)': synchronous slot validation.
- Validation order is structural/editability/range, business hours, overlap, then custom policy.

'onItemsChange(nextItems, change)' runs after one accepted immutable reassignment. Persist 'nextItems' at the application boundary. On failure, call 'change.revert()' and then surface the original error. Revert is guarded and one-shot: it throws 'stale-transaction' rather than overwrite a newer calendar or consumer update.

Item callbacks are 'onItemClick', 'onItemDoubleClick', 'onMoreClick', and 'onInteractionBlocked'. Slot callbacks are 'onSlotClick' and 'onSlotSelect'. Bound-state callbacks are 'onViewChange', 'onDateChange', 'onDayCountChange', and 'onSelectionChange'.

## Recurrence

'recurrenceEditScope' is 'occurrence' by default, creating or updating a persisted exception with recurringItemId plus immutable originalStart. 'disabled' blocks recurring mutations. 'series' transforms the source and all bound exceptions atomically and is an assertion that the current 'items' collection contains the complete exception set for that editable series. A windowed consumer that cannot guarantee completeness must use 'occurrence' or 'disabled'.

Structured recurrence supports daily, weekly, monthly, and yearly rules with interval, count, inclusive until, weekdays including ordinals, month days, months, week start, exclusions, and additions. Supported raw RRULE strings are accepted with explicit restrictions on series transformations. Expansion is finite and capped; unsupported rules and cap exhaustion throw. 'expandRecurrence' is the synchronous bounded escape hatch.

## Resources

'resources' is a typed flat collection. 'parentId' creates groups; only leaves become resource-day columns and accept assignment. Unknown parents, cycles, and duplicate IDs throw. Foreground/background occurrences without a resolvable leaf appear in the localized Unassigned column. Resource moves use the same mutation pipeline. Parent and leaf input order is preserved.

## Snippet composition

Snippets replace content inside component-owned semantic and interactive wrappers:

- 'header': snapshot plus ready-made previous, today, next, title, viewSwitcher, datePicker, and actions snippets
- 'actions': calendar snapshot and API
- 'item': occurrence, segment, view, states, and defaultContent
- 'itemTooltip': occurrence, segment, view, and defaultAccessibleLabel
- 'monthCell': day/state/segments/overflow and defaultContent
- 'dayHeader', 'timeGutter', 'allDay'
- 'overflow' and 'overflowContent'
- 'agendaItem' and 'agendaDetails'
- 'resourceHeader'
- 'nowIndicatorContent', 'dragPreview', 'empty', and 'loadingContent'

Render 'defaultContent' or the ready-made header snippets when wrapping the built-ins. Snippet content cannot remove item focusability, labels, selection state, drag/resize wiring, disclosures, or live announcements.

EventCalendar does not own create/edit dialogs. Compose 'onSlotClick'/'onSlotSelect'/'onItemClick' with Svelai Dialog, Form, DateInput, TimeInput, Select, and Switch, then publish a fresh 'items' array.

## Imperative API

'bind:this' exposes EventCalendarApi<TItemFields>:

- navigation: next, previous, today, goTo, setView
- scrolling/ranges: scrollToTime, getVisibleRange, getActiveRange, getVisibleDays
- queries: getOccurrence, getOccurrences, getOccurrencesForDay
- immutable mutations: addItem, updateItem, updateOccurrence, removeItem
- selection/interaction: select, clearSelection, cancelInteraction

Unknown IDs/keys and invalid operations throw EventCalendarError. API mutations use the same validation and transaction callbacks as pointer and keyboard input.

## Theme and accessibility

'density' defaults to 'normal'; 'color' defaults to 'primary'; 'theme' accepts EventCalendarThemeProps. Import 'eventCalendarTheme', 'setEventCalendarTheme', and 'useEventCalendarTheme' from 'svelai/event-calendar'. Stable parts cover chrome, month, time grid, items/interactions, agenda, and resources. CSS metrics include --event-calendar-slot-height, --event-calendar-time-gutter-width, --event-calendar-day-min-width, --event-calendar-resource-min-width, --event-calendar-item-min-height, and --event-calendar-sticky-offset.

The active view exposes grids/groups/buttons/disclosures, roving focus, keyboard move/resize, Escape cancellation, a single-pointer action menu, 24px interaction targets, polite announcements, reduced-motion behavior, narrow-container wrapping/scrolling, and RTL-aware physical movement. Keyboard mutation starts from a focused item, uses arrows to propose, Enter to commit, and Escape to cancel.
`;
