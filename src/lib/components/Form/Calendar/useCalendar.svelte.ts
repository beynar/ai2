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
	inMonth: boolean;
	day: number;
	date: Date;
	isToday: boolean;
	events: Event[];
	corner: string | null;
	attributes: Record<string, any>;
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

export class CalendarState<E extends Event = Event, T extends CalendarType = 'calendar'> {
	type: T;
	view: 'single' | 'double' = 'single';
	today: Date = new Date();
	events: E[] = [];
	onChange: T extends 'calendar'
		? (value: Date | null) => void
		: (value: [Date | null, Date | null] | null) => void;
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
	disabledDates: (Date | [Date, Date])[] = [];
	disabledDatesMap = $derived.by(() =>
		this.disabledDates.reduce((acc: Map<string, boolean>, date) => {
			const range: Date[] = [];
			if (Array.isArray(date)) {
				// the array is a range. Iterate over the range and add the dates to the map
				const [start, end] = date;
				for (let i = start.getTime(); i <= end.getTime(); i += 1000 * 60 * 60 * 24) {
					range.push(new Date(i));
				}
			} else {
				range.push(date);
			}
			range.forEach((d) => {
				acc.set(d.toDateString(), true);
			});
			return acc;
		}, new Map<string, boolean>())
	);

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

				let cellDate = new Date(date.getFullYear(), date.getMonth(), day);
				let cellDay = Number(String(day));

				if (i === 0 && j < firstDay) {
					cellDay = daysInPreviousMonth - firstDay + j + 1;
					cellDate = new Date(
						date.getFullYear(),
						date.getMonth() - 1,
						daysInPreviousMonth - firstDay + j + 1
					);
					isInPreviousMonth = true;
				} else if (day > daysInMonth) {
					cellDay = daysAfter;
					cellDate = new Date(date.getFullYear(), date.getMonth() + 1, daysAfter);
					daysAfter++;
					isInNextMonth = true;
				} else {
					inMonth = true;
					cellDay = day;
					day++;
				}

				const dateString = cellDate.toDateString();
				const isStartOfRange = this.rangeStart
					? dateString === this.rangeStart.toDateString()
					: false;
				const isEndOfRange = this.rangeEnd ? dateString === this.rangeEnd.toDateString() : false;
				const isInRange =
					(this.type === 'calendar-range' &&
						this.rangeEnd &&
						this.rangeStart &&
						!isStartOfRange &&
						!isEndOfRange &&
						cellDate < this.rangeEnd &&
						cellDate > this.rangeStart) ||
					false;
				const isToday = dateString === new Date().toDateString();
				const isBeforeMinDate = this.minDate && cellDate.getTime() < this.minDate.getTime();
				const isAfterMaxDate = this.maxDate && cellDate.getTime() > this.maxDate.getTime();
				const isDisabled =
					this.disabledDatesMap.get(dateString) || isBeforeMinDate || isAfterMaxDate;

				row.cells.push({
					isStartOfRange,
					isEndOfRange,
					visible:
						this.view === 'single' ? true : isNextMonth ? !isInPreviousMonth : !isInNextMonth,
					isInNextMonth,
					isInRange,
					isInPreviousMonth,
					inMonth,
					day: cellDay,
					date: cellDate,
					isToday,
					events,
					corner,
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
						'data-date': cellDate.toISOString(),
						'data-is-past': !isToday && cellDate.getTime() < new Date().getTime()
					}
				});
			}

			if (!row.cells.every((cell) => !cell.inMonth)) {
				rows.push(row);
			}
		}
		return rows;
	};

	setRange = (start: Date | null, end?: Date | null): void => {
		this.rangeStart = start;
		this.rangeEnd = end || null;
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

	constructor(options: CalendarStateOptions<E, T>) {
		this.events = options.events || [];
		this.minDate = options.minDate || null;
		this.maxDate = options.maxDate || null;
		this.type = (options.type || 'calendar') as T;
		this.weekStartsOnMonday = options.weekStartsOnMonday || false;
		this.view = options.view || 'single';
		this.disabledDates = options.disabledDates || [];
		this.onChange = options.onChange as any;

		if (options.type === 'calendar-range') {
			const value = options.value as [Date | null, Date | null] | null;
			this.rangeStart = value?.[0] || null;
			this.rangeEnd = value?.[1] || null;
		} else {
			this.rangeStart = options.value as Date | null;
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

	cleanDate = (date: Date): Date => {
		const cleaned = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		cleaned.setUTCHours(0, 0, 0, 0);
		return cleaned;
	};

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

				const date = new Date(maybeCell.getAttribute('data-date')!);

				if (this.type === 'calendar') {
					this.rangeStart = date;
					(this.onChange as (value: Date | null) => void)?.(date);
				} else if (this.type === 'calendar-range') {
					if (this.rangeStart && this.rangeEnd) {
						this.rangeStart = date;
						this.rangeEnd = null;
					} else if (this.rangeStart) {
						if (date < this.rangeStart) {
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
