/* eslint-disable svelte/prefer-svelte-reactivity -- DOM registries and immutable configuration snapshots are not reactive state. */
import { addCivilMonths, isSupportedDateDomainError, parseDateOnly } from './eventCalendar.date.js';
import type { EventCalendarDateOnly } from './eventCalendar.types.js';

type MonthGridConfiguration = {
	days: readonly EventCalendarDateOnly[];
	enabledDays: ReadonlySet<EventCalendarDateOnly>;
	columnCount: number;
	leadingEmptyCells: number;
	direction: 'ltr' | 'rtl';
	onPage: (direction: -1 | 1, targetDay: EventCalendarDateOnly) => boolean;
};

/** Calendar-owned roving focus and live announcements. Later views extend this same owner. */
export class EventCalendarA11y {
	announcement = $state('');
	focusedDay = $state<EventCalendarDateOnly | null>(null);
	readonly liveRegionId: string;
	private dayElements = new Map<EventCalendarDateOnly, HTMLElement>();
	private days: readonly EventCalendarDateOnly[] = [];
	private enabledDays = $state.raw<ReadonlySet<EventCalendarDateOnly>>(new Set());
	private columnCount = 1;
	private leadingEmptyCells = 0;
	private direction: 'ltr' | 'rtl' = 'ltr';
	private onPage: (direction: -1 | 1, targetDay: EventCalendarDateOnly) => boolean = () => false;
	private pendingDay: EventCalendarDateOnly | null = null;
	private restoreVersion = 0;
	private lifecycleVersion = 0;

	constructor(liveRegionId: string) {
		this.liveRegionId = liveRegionId;
	}

	configureMonth(configuration: MonthGridConfiguration): void {
		this.days = configuration.days;
		this.enabledDays = configuration.enabledDays;
		this.columnCount = Math.max(1, configuration.columnCount);
		this.leadingEmptyCells = Math.max(0, configuration.leadingEmptyCells);
		this.direction = configuration.direction;
		this.onPage = configuration.onPage;

		const requestedDay = this.pendingDay ?? this.focusedDay;
		const nextDay = this.resolveEnabledDay(requestedDay);
		if (nextDay) this.focusedDay = nextDay;
		if (this.pendingDay) {
			this.pendingDay = nextDay;
			this.scheduleRestore();
		}
	}

	registerDay(day: EventCalendarDateOnly, node: HTMLElement): () => void {
		this.dayElements.set(day, node);
		if (this.pendingDay === day) this.scheduleRestore();
		return () => {
			if (typeof document !== 'undefined' && document.activeElement === node) {
				this.pendingDay = day;
			}
			if (this.dayElements.get(day) === node) this.dayElements.delete(day);
		};
	}

	getDayTabIndex(day: EventCalendarDateOnly): 0 | -1 {
		if (!this.enabledDays.has(day)) return -1;
		const focusDay = this.resolveEnabledDay(this.focusedDay);
		return focusDay === day ? 0 : -1;
	}

	handleDayFocus(day: EventCalendarDateOnly): void {
		if (!this.enabledDays.has(day)) return;
		this.focusedDay = day;
		this.pendingDay = null;
	}

	handleDayKeydown(event: KeyboardEvent, day: EventCalendarDateOnly): boolean {
		if (event.altKey || event.ctrlKey || event.metaKey) return false;
		const dayIndex = this.days.indexOf(day);
		if (dayIndex < 0) return false;

		let target: EventCalendarDateOnly | null;
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			const isNextPhysical = event.key === 'ArrowRight';
			const chronologicalDirection =
				this.direction === 'rtl' ? (isNextPhysical ? -1 : 1) : isNextPhysical ? 1 : -1;
			target = this.findEnabledByStep(dayIndex, chronologicalDirection);
		} else if (event.key === 'ArrowUp') {
			target = this.findEnabledByStep(dayIndex, -this.columnCount);
		} else if (event.key === 'ArrowDown') {
			target = this.findEnabledByStep(dayIndex, this.columnCount);
		} else if (event.key === 'Home') {
			target = this.findEnabledInRow(dayIndex, false);
		} else if (event.key === 'End') {
			target = this.findEnabledInRow(dayIndex, true);
		} else if (event.key === 'PageUp' || event.key === 'PageDown') {
			const direction = event.key === 'PageDown' ? 1 : -1;
			try {
				this.pendingDay = addCivilMonths(day, direction);
			} catch (error) {
				if (!isSupportedDateDomainError(error)) throw error;
				this.pendingDay = null;
				event.preventDefault();
				return true;
			}
			if (!this.onPage(direction, this.pendingDay)) this.pendingDay = null;
			this.scheduleRestore();
			event.preventDefault();
			return true;
		} else {
			return false;
		}

		if (!target) return true;
		event.preventDefault();
		this.focusDay(target);
		return true;
	}

	announce(message: string): void {
		const version = this.lifecycleVersion;
		this.announcement = '';
		queueMicrotask(() => {
			if (version !== this.lifecycleVersion) return;
			this.announcement = message;
		});
	}

	destroy(): void {
		this.lifecycleVersion += 1;
		this.restoreVersion += 1;
		this.dayElements.clear();
		this.days = [];
		this.enabledDays = new Set();
		this.pendingDay = null;
	}

	private focusDay(day: EventCalendarDateOnly): void {
		const element = this.dayElements.get(day);
		if (!element) {
			this.pendingDay = day;
			this.scheduleRestore();
			return;
		}
		this.focusedDay = day;
		this.pendingDay = null;
		element.focus();
	}

	private findEnabledByStep(index: number, step: number): EventCalendarDateOnly | null {
		for (
			let nextIndex = index + step;
			nextIndex >= 0 && nextIndex < this.days.length;
			nextIndex += step
		) {
			const day = this.days[nextIndex];
			if (this.enabledDays.has(day)) return day;
		}
		return null;
	}

	private findEnabledInRow(index: number, fromEnd: boolean): EventCalendarDateOnly | null {
		const visualIndex = index + this.leadingEmptyCells;
		const visualRowStart = Math.floor(visualIndex / this.columnCount) * this.columnCount;
		const rowStart = Math.max(0, visualRowStart - this.leadingEmptyCells);
		const rowEnd = Math.min(
			this.days.length,
			visualRowStart + this.columnCount - this.leadingEmptyCells
		);
		if (fromEnd) {
			for (let candidate = rowEnd - 1; candidate >= rowStart; candidate -= 1) {
				const day = this.days[candidate];
				if (this.enabledDays.has(day)) return day;
			}
			return null;
		}
		for (let candidate = rowStart; candidate < rowEnd; candidate += 1) {
			const day = this.days[candidate];
			if (this.enabledDays.has(day)) return day;
		}
		return null;
	}

	private resolveEnabledDay(day: EventCalendarDateOnly | null): EventCalendarDateOnly | null {
		if (day && this.enabledDays.has(day)) return day;
		const enabled = this.days.filter((candidate) => this.enabledDays.has(candidate));
		if (enabled.length === 0) return null;
		if (!day) return enabled[0];
		return enabled.reduce((closest, candidate) => {
			const closestDistance = Math.abs(compareDays(closest, day));
			const candidateDistance = Math.abs(compareDays(candidate, day));
			return candidateDistance < closestDistance ? candidate : closest;
		});
	}

	private scheduleRestore(): void {
		const version = ++this.restoreVersion;
		queueMicrotask(() => {
			if (version !== this.restoreVersion || !this.pendingDay) return;
			const day = this.resolveEnabledDay(this.pendingDay);
			if (!day) return;
			const element = this.dayElements.get(day);
			if (!element) return;
			this.focusedDay = day;
			this.pendingDay = null;
			element.focus();
		});
	}
}

function compareDays(left: EventCalendarDateOnly, right: EventCalendarDateOnly): number {
	const leftDate = parseDateOnly(left);
	const rightDate = parseDateOnly(right);
	return (
		(leftDate.year - rightDate.year) * 372 +
		(leftDate.month - rightDate.month) * 31 +
		leftDate.day -
		rightDate.day
	);
}
