import { bind } from '$lib/utils/state.svelte.js';
import { untrack } from 'svelte';
import { on } from 'svelte/events';

export type CalendarType = 'calendar' | 'calendar-range';

export interface Event {
	start: Date;
	end: Date;
	title?: string;
	description?: string;
}

export interface Cell {
	isStartOfRange: boolean;
	isEndOfRange: boolean;
	visible: boolean;
	isInNextMonth: boolean;
	isInRange: boolean;
	isInPreviousMonth: boolean;
	selected: boolean;
	inMonth: boolean;
	day: number;
	date: Date;
	isToday: boolean;
	events: Event[];
	corner: string | null;
	attributes: Record<string, string | number | boolean | undefined>;
	disabled: boolean;
}

export interface Row<E extends Event> {
	cells: Cell[];
	events: E[];
}

export interface CalendarStateOptions<E extends Event, T extends CalendarType> {
	events?: E[];
	minDate?: Date | null;
	maxDate?: Date | null;
	type?: T;
	weekStartsOnMonday?: boolean;
	view?: 'single' | 'double';
	disabledDates?: (Date | [Date, Date])[];
	onChange?: T extends 'calendar'
		? (value: Date | null) => void
		: (value: [Date | null, Date | null] | null) => void;
	value?: T extends 'calendar' ? Date | null : [Date | null, Date | null] | null;
}

const getMonthName = (date: Date, locale?: string): string => {
	return date.toLocaleString(locale || undefined, { month: 'long' });
};

/**
 * Creates a date at noon local time to avoid timezone boundary issues.
 * 
 * **Why noon instead of midnight?**
 * 
 * When dates are created at midnight (00:00:00), they can shift to the previous or next day
 * when converted between timezones. For example:
 * - A date at midnight in Tokyo (UTC+9) might be interpreted as the previous day in London (UTC+0)
 * - A date at midnight in New York (UTC-5) might shift to the next day when sent to a server in UTC
 * 
 * By using noon (12:00:00), we ensure that:
 * - The date always represents the same calendar day regardless of timezone conversion
 * - January 15 at noon is always January 15 in any timezone
 * - No ambiguous date boundaries that could cause selection bugs
 * 
 * @param year - Full year (e.g., 2025)
 * @param month - Month index (0-11, where 0 = January)
 * @param day - Day of month (1-31)
 * @returns Date object at 12:00:00 local time
 * 
 * @example
 * ```typescript
 * // Creates January 15, 2025 at 12:00:00 PM local time
 * const date = createDateAtNoon(2025, 0, 15);
 * ```
 */
function createDateAtNoon(year: number, month: number, day: number): Date {
	return new Date(year, month, day, 12, 0, 0, 0);
}

/**
 * Compares two dates by year/month/day components (ignores time).
 * 
 * **Why compare by components instead of milliseconds?**
 * 
 * Comparing dates using `getTime()` includes the time component, which can cause issues
 * when dates have different times but represent the same calendar day. This function
 * compares only the date components (year, month, day), ignoring hours, minutes, seconds.
 * 
 * **Timezone Note:** This function compares dates in local time. For timezone-resistant
 * comparisons, ensure both dates are normalized to noon using `normalizeToNoon()` first.
 * 
 * @param date1 - First date to compare
 * @param date2 - Second date to compare
 * @returns true if both dates represent the same calendar day
 * 
 * @example
 * ```typescript
 * const date1 = new Date(2025, 0, 15, 12, 0, 0); // Jan 15 at noon
 * const date2 = new Date(2025, 0, 15, 0, 0, 0);  // Jan 15 at midnight
 * isSameDay(date1, date2); // true - same calendar day
 * ```
 */
function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

/**
 * Normalizes a date to noon for comparison purposes
 * 
 * **Why noon?** Creating dates at noon (12:00:00) instead of midnight avoids timezone boundary issues.
 * When dates cross timezone boundaries, midnight can shift to the previous or next day, but noon
 * always remains on the same calendar day regardless of timezone conversion.
 * 
 * @param date - The date to normalize
 * @returns A new Date object set to noon (12:00:00) on the same calendar day
 */
function normalizeToNoon(date: Date): Date {
	return createDateAtNoon(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Calendar state management for date selection components.
 * 
 * ## Timezone Handling
 * 
 * This calendar component is designed to be timezone-resistant:
 * 
 * - **All dates are created at noon (12:00:00) local time** - This prevents timezone boundary issues
 *   when dates are converted between timezones. A date at noon will always represent the same calendar
 *   day regardless of timezone conversion.
 * 
 * - **Date comparisons use date components** - Instead of comparing milliseconds (which includes time),
 *   this component compares dates by their year/month/day components using `isSameDay()` or normalized
 *   noon dates. This ensures consistent behavior across timezones.
 * 
 * - **Input dates are normalized** - All dates passed to the component (via props, constructor, or
 *   `setRange()`) are automatically normalized to noon to ensure consistency.
 * 
 * - **Date storage uses YYYY-MM-DD format** - The `data-date` attribute stores dates in YYYY-MM-DD
 *   format instead of ISO strings, avoiding timezone conversion issues when parsing.
 * 
 * ## Best Practices for Consumers
 * 
 * When using this component:
 * 
 * 1. **Provide dates at noon** - While the component will normalize dates, it's best practice for
 *    consumers to provide dates at noon (12:00:00) to avoid any edge cases.
 * 
 * 2. **Use Date objects, not strings** - Always pass Date objects, not date strings. The component
 *    handles timezone conversions internally.
 * 
 * 3. **Normalize dates before comparison** - When comparing dates returned from `onChange`, normalize
 *    them to noon first if you need to compare dates across timezones.
 * 
 * @example
 * ```typescript
 * // ✅ Good - Create date at noon
 * const selectedDate = new Date(2025, 0, 15, 12, 0, 0, 0);
 * 
 * // ❌ Avoid - Midnight can cause timezone issues
 * const badDate = new Date(2025, 0, 15, 0, 0, 0, 0);
 * ```
 */
export interface CalendarState<E extends Event = Event, T extends CalendarType = 'calendar'>
	extends CalendarStateOptions<E, T> {}
export class CalendarState<E extends Event = Event, T extends CalendarType = 'calendar'> {
	view: 'single' | 'double' = 'single';
	today: Date = new Date();
	events: E[] = [];
	date = $state(this.today);
	selected = $state(this.today);
	currentMonth = $derived(this.date.getMonth());
	currentMonthName = $derived(getMonthName(this.date));
	minDate = $state<Date | null>(null);
	maxDate = $state<Date | null>(null);
	nextMonthName = $derived(
		getMonthName(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1))
	);
	currentYear = $derived(this.date.getFullYear());
	nextYear = $derived(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1).getFullYear());
	weekStartsOnMonday = $state(false);
	rangeStart = $state<Date | null>(null);
	rangeEnd = $state<Date | null>(null);
	displayedMonthLabel = $derived.by((): string => {
		if (this.view === 'single') {
			return `${this.currentMonthName} ${this.currentYear}`;
		} else if (this.currentYear === this.nextYear) {
			return `${this.currentMonthName} - ${this.nextMonthName} ${this.currentYear}`;
		} else {
			return `${this.currentMonthName} ${this.currentYear} - ${this.nextMonthName} ${this.nextYear}`;
		}
	});
	eventsMap = $derived.by(() =>
		this.events.reduce((acc: Record<string, E[]>, event: E) => {
			const date = event.start.toDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(event);
			return acc;
		}, {})
	);
	/**
	 * Map of disabled dates for quick lookup.
	 * 
	 * **Timezone Note:** All dates in this map are normalized to noon to ensure consistent
	 * comparison regardless of the time component of the input disabled dates.
	 */
	disabledDates: (Date | [Date, Date])[] = [];
	/**
	 * Derived map for efficient disabled date checking.
	 * 
	 * **Timezone Handling:** 
	 * - Single dates are normalized to noon before being added to the map
	 * - Date ranges are iterated day-by-day using date components (not milliseconds)
	 * - Each date in the range is normalized to noon
	 * - Comparison uses `toDateString()` as a key, which compares by date components
	 */
	disabledDatesMap = $derived.by(() =>
		this.disabledDates.reduce((acc: Map<string, boolean>, date) => {
			const range: Date[] = [];
			if (Array.isArray(date)) {
				// the array is a range. Iterate over the range and add the dates to the map
				const [start, end] = date;
				// Normalize both dates to noon for comparison
				const normalizedStart = normalizeToNoon(start);
				const normalizedEnd = normalizeToNoon(end);
				
				// Iterate day by day using date components instead of milliseconds
				let currentDate = normalizedStart;
				while (currentDate <= normalizedEnd) {
					range.push(currentDate);
					// Create next day at noon
					currentDate = createDateAtNoon(
						currentDate.getFullYear(),
						currentDate.getMonth(),
						currentDate.getDate() + 1
					);
				}
			} else {
				range.push(normalizeToNoon(date));
			}
			range.forEach((d) => {
				acc.set(d.toDateString(), true);
			});
			return acc;
		}, new Map<string, boolean>())
	);

	/**
	 * Generates calendar rows for a given month view.
	 * 
	 * **Timezone Handling:**
	 * - All cell dates are created at noon using `createDateAtNoon()`
	 * - Date comparisons use `isSameDay()` or normalized noon dates
	 * - Min/max date comparisons normalize both dates to noon before comparing
	 * - Range comparisons normalize dates to noon before comparison
	 * 
	 * @param date - The date representing the month to display (defaults to current view date)
	 * @param weekStartsOnMonday - Whether weeks start on Monday (true) or Sunday (false)
	 * @param isNextMonth - Internal flag for double-month view
	 * @returns Array of rows, each containing cells for the calendar grid
	 */
	getCalendarRows = (
		date: Date = this.date,
		weekStartsOnMonday: boolean = this.weekStartsOnMonday,
		isNextMonth: boolean = false
	): Row<E>[] => {
		const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
		const weeks = Math.ceil(daysInMonth / 7) + 1;
		const daysInPreviousMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
		let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		const rows: Row<E>[] = [];

		if (weekStartsOnMonday) {
			firstDay = firstDay === 0 ? 6 : firstDay - 1;
		}

		let day = 1;
		let daysAfter = 1;

		for (let i = 0; i < weeks; i++) {
			const row: Row<E> = {
				cells: [],
				events: []
			};

			for (let j = 0; j < 7; j++) {
				const events: E[] = [];
				let inMonth = false;
				let isInNextMonth = false;
				let isInPreviousMonth = false;
				const corner =
					(i === 0 && j === 0 && 't-l') ||
					(i === 0 && j === 6 && 't-r') ||
					(i === weeks - 1 && j === 0 && 'b-l') ||
					(i === weeks - 1 && j === 6 && 'b-r') ||
					null;

				let cellDate = createDateAtNoon(date.getFullYear(), date.getMonth(), day);
				let cellDay = Number(String(day));

				if (i === 0 && j < firstDay) {
					cellDay = daysInPreviousMonth - firstDay + j + 1;
					cellDate = createDateAtNoon(
						date.getFullYear(),
						date.getMonth() - 1,
						daysInPreviousMonth - firstDay + j + 1
					);
					isInPreviousMonth = true;
				} else if (day > daysInMonth) {
					cellDay = daysAfter;
					cellDate = createDateAtNoon(date.getFullYear(), date.getMonth() + 1, daysAfter);
					daysAfter++;
					isInNextMonth = true;
				} else {
					inMonth = true;
					cellDay = day;
					day++;
				}

				const dateString = cellDate.toDateString();
				// Use isSameDay for consistent date comparison (replaces toDateString() comparison)
				const isStartOfRange = this.rangeStart
					? isSameDay(cellDate, this.rangeStart)
					: false;
				const isEndOfRange = this.rangeEnd ? isSameDay(cellDate, this.rangeEnd) : false;
				const isInRange =
					(this.type === 'calendar-range' &&
						this.rangeEnd &&
						this.rangeStart &&
						!isStartOfRange &&
						!isEndOfRange &&
						normalizeToNoon(cellDate) < normalizeToNoon(this.rangeEnd) &&
						normalizeToNoon(cellDate) > normalizeToNoon(this.rangeStart)) ||
					false;
				// Use isSameDay to compare with today (replaces toDateString() comparison)
				const isToday = isSameDay(cellDate, new Date());
				// Normalize dates to noon before comparison to avoid timezone issues
				const isBeforeMinDate = this.minDate && normalizeToNoon(cellDate) < normalizeToNoon(this.minDate);
				const isAfterMaxDate = this.maxDate && normalizeToNoon(cellDate) > normalizeToNoon(this.maxDate);
				const isDisabled =
					this.disabledDatesMap.get(dateString) || isBeforeMinDate || isAfterMaxDate;

				row.cells.push({
					isStartOfRange: this.type === 'calendar-range' ? isStartOfRange : false,
					isEndOfRange: this.type === 'calendar-range' ? isEndOfRange : false,
					visible:
						this.view === 'single' ? true : isNextMonth ? !isInPreviousMonth : !isInNextMonth,
					isInNextMonth,
					isInRange,
					isInPreviousMonth,
					selected: this.type === 'calendar' ? isStartOfRange : isStartOfRange || isEndOfRange,
					inMonth,
					day: cellDay,
					date: cellDate,
					isToday,
					events,
					corner,
					disabled: !!isDisabled,
					attributes: {
						style: `grid-row-start:${2 + i}; grid-column-start:${j + 1};`,
						'data-in-range': isInRange,
						'data-in-month': inMonth,
						'data-disabled': isDisabled ? true : undefined,
						disabled: isDisabled ? true : undefined,
						'data-is-today': isToday,
						'data-selected':
							this.type === 'calendar' ? isStartOfRange : isStartOfRange || isEndOfRange,
						'data-start-of-range':
							this.type === 'calendar' ? false : this.rangeComplete && isStartOfRange,
						'data-end-of-range':
							this.type === 'calendar' ? false : this.rangeComplete && isEndOfRange,
						'data-date': `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`,
						'data-is-past': !isToday && normalizeToNoon(cellDate) < normalizeToNoon(new Date())
					}
				});
			}

			if (!row.cells.every((cell) => !cell.inMonth)) {
				rows.push(row);
			}
		}
		return rows;
	};

	/**
	 * Sets the selected date range.
	 * 
	 * **Timezone Note:** Both start and end dates are automatically normalized to noon
	 * to ensure consistent behavior across timezones.
	 * 
	 * @param start - Start date of the range (or null to clear)
	 * @param end - End date of the range (optional, defaults to null)
	 */
	setRange = (start: Date | null, end?: Date | null): void => {
		this.rangeStart = start ? normalizeToNoon(start) : null;
		this.rangeEnd = end ? normalizeToNoon(end) : null;
	};

	rows = $derived.by(this.getCalendarRows);
	nextMonthRows = $derived.by(() =>
		this.getCalendarRows(
			new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1),
			this.weekStartsOnMonday,
			true
		)
	);
	rangeComplete = $derived(!!(this.rangeStart && this.rangeEnd));

	/**
	 * Creates a new CalendarState instance.
	 * 
	 * **Timezone Handling:** All input dates (value, minDate, maxDate, disabledDates) are
	 * automatically normalized to noon to ensure consistent behavior. This means:
	 * - Dates can be provided at any time, but will be normalized to noon internally
	 * - Dates returned from onChange will always be at noon
	 * - Comparisons and validations work correctly across timezones
	 * 
	 * @param options - Configuration options for the calendar
	 */
	constructor(options: CalendarStateOptions<E, T>) {
		bind(this, options);

		if (options.type === 'calendar-range') {
			const value = options.value as [Date | null, Date | null] | null;
			this.rangeStart = value?.[0] ? normalizeToNoon(value[0]) : null;
			this.rangeEnd = value?.[1] ? normalizeToNoon(value[1]) : null;
		} else {
			this.rangeStart = options.value ? normalizeToNoon(options.value as Date) : null;
		}
	}

	goNextMonth = (): void => {
		this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1);
	};

	goPrevMonth = (): void => {
		this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1);
	};

	goToToday = (): void => {
		this.date = this.today;
	};

	/**
	 * Normalizes a date to noon for consistent handling.
	 * 
	 * **Timezone Note:** This method creates a new date at noon (12:00:00) local time,
	 * which prevents timezone boundary issues when dates are converted between timezones.
	 * 
	 * @param date - The date to clean/normalize
	 * @returns A new Date object set to noon on the same calendar day
	 */
	cleanDate = (date: Date): Date => {
		return normalizeToNoon(date);
	};

	/**
	 * Sets up click handling for calendar cell selection.
	 * 
	 * **Timezone Handling:**
	 * - Parses YYYY-MM-DD format from data-date attribute (avoids ISO string timezone issues)
	 * - Creates date at noon using extracted year/month/day components
	 * - All returned dates are at noon, ensuring consistent behavior
	 * - Range comparisons normalize dates to noon before comparing
	 * 
	 * @param node - The HTML element containing the calendar grid
	 * @returns Cleanup function for the event listener
	 */
	calendar = (node: HTMLElement) => {
		untrack(() => {
			const onClick = (e: PointerEvent) => {
				const maybeCell = e
					.composedPath()
					.find(
						(node: EventTarget) => node instanceof HTMLElement && node.getAttribute('data-date')
					);

				if (!maybeCell || !(maybeCell instanceof HTMLElement)) {
					return;
				}

				if (maybeCell.getAttribute('data-disabled')) {
					return;
				}

				// Parse YYYY-MM-DD format and create date at noon
				// This format avoids timezone conversion issues compared to ISO strings
				const dateString = maybeCell.getAttribute('data-date')!;
				const [year, month, day] = dateString.split('-').map(Number);
				const date = createDateAtNoon(year, month - 1, day);

				if (this.type === 'calendar') {
					this.rangeStart = date;
					(this.onChange as (value: Date | null) => void)?.(date);
				} else if (this.type === 'calendar-range') {
					if (this.rangeStart && this.rangeEnd) {
						this.rangeStart = date;
						this.rangeEnd = null;
					} else if (this.rangeStart) {
						// Normalize dates to noon for comparison
						const normalizedDate = normalizeToNoon(date);
						const normalizedRangeStart = normalizeToNoon(this.rangeStart);
						if (normalizedDate < normalizedRangeStart) {
							this.rangeEnd = this.rangeStart;
							this.rangeStart = date;
						} else {
							this.rangeEnd = date;
						}
					} else {
						this.rangeStart = date;
					}
					(this.onChange as (value: [Date | null, Date | null] | null) => void)?.([
						this.rangeStart || null,
						this.rangeEnd || null
					]);
				}
			};

			return on(node, 'click', onClick);
		});
	};
}
