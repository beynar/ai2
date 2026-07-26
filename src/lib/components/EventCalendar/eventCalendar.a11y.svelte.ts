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

export type EventCalendarTimeTarget = Readonly<{
	key: string;
	day: EventCalendarDateOnly;
	column: number;
	row: number;
	verticalOrder: number;
	kind: 'day-header' | 'all-day' | 'time-slot' | 'item';
}>;

type TimeGridConfiguration = {
	targets: readonly EventCalendarTimeTarget[];
	direction: 'ltr' | 'rtl';
	onPage: (direction: -1 | 1) => boolean;
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
	private timeElements = new Map<string, HTMLElement>();
	private timeTargets: readonly EventCalendarTimeTarget[] = [];
	private timeTargetByKey = new Map<string, EventCalendarTimeTarget>();
	private focusedTimeTarget = $state<string | null>(null);
	private pendingTimeTarget: Pick<EventCalendarTimeTarget, 'column' | 'row' | 'kind'> | null = null;
	private onTimePage: (direction: -1 | 1) => boolean = () => false;
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

	configureTimeGrid(configuration: TimeGridConfiguration): void {
		this.timeTargets = configuration.targets;
		this.timeTargetByKey = new Map(configuration.targets.map((target) => [target.key, target]));
		this.direction = configuration.direction;
		this.onTimePage = configuration.onPage;

		let nextTarget = this.focusedTimeTarget
			? this.timeTargetByKey.get(this.focusedTimeTarget)
			: undefined;
		if (!nextTarget && this.pendingTimeTarget) {
			nextTarget = this.findNearestTimeTarget(this.pendingTimeTarget);
		}
		nextTarget ??= this.timeTargets[0];
		this.focusedTimeTarget = nextTarget?.key ?? null;
		if (this.pendingTimeTarget && nextTarget) this.scheduleTimeRestore(nextTarget.key);
	}

	registerTimeTarget(targetKey: string, node: HTMLElement): () => void {
		this.timeElements.set(targetKey, node);
		if (this.focusedTimeTarget === targetKey && this.pendingTimeTarget) {
			this.scheduleTimeRestore(targetKey);
		}
		return () => {
			if (typeof document !== 'undefined' && document.activeElement === node) {
				const target = this.timeTargetByKey.get(targetKey);
				if (target) this.pendingTimeTarget = target;
			}
			if (this.timeElements.get(targetKey) === node) this.timeElements.delete(targetKey);
		};
	}

	getTimeTargetTabIndex(targetKey: string): 0 | -1 {
		return this.focusedTimeTarget === targetKey ? 0 : -1;
	}

	handleTimeTargetFocus(targetKey: string): void {
		if (!this.timeTargetByKey.has(targetKey)) return;
		this.focusedTimeTarget = targetKey;
		this.pendingTimeTarget = null;
	}

	handleTimeTargetKeydown(event: KeyboardEvent, targetKey: string): boolean {
		if (event.altKey || event.ctrlKey || event.metaKey) return false;
		const current = this.timeTargetByKey.get(targetKey);
		if (!current) return false;

		let target: EventCalendarTimeTarget | undefined;
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			const physicalDirection: -1 | 1 = event.key === 'ArrowRight' ? 1 : -1;
			const direction: -1 | 1 =
				this.direction === 'rtl' ? (physicalDirection === 1 ? -1 : 1) : physicalDirection;
			target = this.findHorizontalTimeTarget(current, direction);
		} else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			target = this.findVerticalTimeTarget(current, event.key === 'ArrowDown' ? 1 : -1);
		} else if (event.key === 'Home' || event.key === 'End') {
			target = this.findEdgeTimeTarget(current, event.key === 'End');
		} else if (event.key === 'PageUp' || event.key === 'PageDown') {
			const direction = event.key === 'PageDown' ? 1 : -1;
			this.pendingTimeTarget = current;
			if (!this.onTimePage(direction)) this.pendingTimeTarget = null;
			event.preventDefault();
			return true;
		} else {
			return false;
		}

		event.preventDefault();
		if (target) this.focusTimeTarget(target);
		return true;
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
		this.timeElements.clear();
		this.timeTargets = [];
		this.timeTargetByKey.clear();
		this.focusedTimeTarget = null;
		this.pendingTimeTarget = null;
	}

	private focusTimeTarget(target: EventCalendarTimeTarget): void {
		const element = this.timeElements.get(target.key);
		this.focusedTimeTarget = target.key;
		if (!element) {
			this.pendingTimeTarget = target;
			this.scheduleTimeRestore(target.key);
			return;
		}
		this.pendingTimeTarget = null;
		element.focus();
	}

	private findHorizontalTimeTarget(
		current: EventCalendarTimeTarget,
		direction: -1 | 1
	): EventCalendarTimeTarget | undefined {
		const columns = [...new Set(this.timeTargets.map((target) => target.column))].sort(
			(left, right) => left - right
		);
		const columnIndex = columns.indexOf(current.column);
		const nextColumn = columns[columnIndex + direction];
		if (nextColumn === undefined) return undefined;
		return this.findNearestTimeTarget({ ...current, column: nextColumn });
	}

	private findVerticalTimeTarget(
		current: EventCalendarTimeTarget,
		direction: -1 | 1
	): EventCalendarTimeTarget | undefined {
		return this.timeTargets
			.filter(
				(target) =>
					target.column === current.column &&
					(direction > 0
						? target.verticalOrder > current.verticalOrder
						: target.verticalOrder < current.verticalOrder)
			)
			.sort((left, right) =>
				direction > 0
					? left.verticalOrder - right.verticalOrder
					: right.verticalOrder - left.verticalOrder
			)[0];
	}

	private findEdgeTimeTarget(
		current: EventCalendarTimeTarget,
		fromEnd: boolean
	): EventCalendarTimeTarget | undefined {
		const columns = this.timeTargets.map((target) => target.column);
		if (columns.length === 0) return undefined;
		const column = fromEnd ? Math.max(...columns) : Math.min(...columns);
		return this.findNearestTimeTarget({ ...current, column });
	}

	private findNearestTimeTarget(
		anchor: Pick<EventCalendarTimeTarget, 'column' | 'row' | 'kind'>
	): EventCalendarTimeTarget | undefined {
		return this.timeTargets
			.filter((target) => target.column === anchor.column)
			.sort((left, right) => {
				const rowDistance = Math.abs(left.row - anchor.row) - Math.abs(right.row - anchor.row);
				if (rowDistance !== 0) return rowDistance;
				return (
					getTimeTargetKindRank(left.kind, anchor.kind) -
					getTimeTargetKindRank(right.kind, anchor.kind)
				);
			})[0];
	}

	private scheduleTimeRestore(targetKey: string): void {
		const version = ++this.restoreVersion;
		queueMicrotask(() => {
			if (version !== this.restoreVersion || this.focusedTimeTarget !== targetKey) return;
			const element = this.timeElements.get(targetKey);
			if (!element) return;
			this.pendingTimeTarget = null;
			element.focus();
		});
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

function getTimeTargetKindRank(
	kind: EventCalendarTimeTarget['kind'],
	preferred: EventCalendarTimeTarget['kind']
): number {
	if (kind === preferred) return 0;
	if (kind === 'time-slot') return 1;
	if (kind === 'item') return 2;
	return 3;
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
