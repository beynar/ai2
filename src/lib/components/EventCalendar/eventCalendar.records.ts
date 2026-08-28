import type {
	EventCalendarDateOnly,
	EventCalendarItem,
	EventCalendarOccurrence,
	EventCalendarRecurrenceRule
} from './eventCalendar.types.js';

type EventCalendarSchedule = {
	allDay: boolean;
	start: Date | EventCalendarDateOnly;
	end: Date | EventCalendarDateOnly;
};

export function cloneEventCalendarItem<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>
): EventCalendarItem<TItemFields> {
	const clone: Record<string, unknown> = {
		...item,
		start: cloneScheduleValue(item.start),
		end: cloneScheduleValue(item.end)
	};
	if (item.originalStart !== undefined)
		clone.originalStart = cloneScheduleValue(item.originalStart);
	if (item.resourceIds) clone.resourceIds = [...item.resourceIds];
	if (item.recurrence && typeof item.recurrence === 'object') {
		clone.recurrence = item.allDay
			? cloneRecurrenceRule(item.recurrence)
			: cloneRecurrenceRule(item.recurrence);
	}
	return clone as EventCalendarItem<TItemFields>;
}

export function replaceEventCalendarSchedule<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	schedule: EventCalendarSchedule
): EventCalendarItem<TItemFields> {
	const next: Record<string, unknown> = { ...item };
	delete next.recurrence;
	delete next.recurrenceTimeZone;
	delete next.recurringItemId;
	delete next.originalStart;
	setSchedule(next, schedule);
	return next as EventCalendarItem<TItemFields>;
}

export function replaceEventCalendarPlacement<TItemFields extends object>(
	item: EventCalendarItem<TItemFields>,
	schedule: EventCalendarSchedule
): EventCalendarItem<TItemFields> {
	const next: Record<string, unknown> = { ...item };
	setSchedule(next, schedule);
	return next as EventCalendarItem<TItemFields>;
}

export function getEventCalendarOccurrenceSeriesId<TItemFields extends object>(
	occurrence: EventCalendarOccurrence<TItemFields>
): string | undefined {
	if (!occurrence.isRecurring && occurrence.item.recurringItemId === undefined) return undefined;
	return occurrence.item.recurringItemId ?? occurrence.item.id;
}

function setSchedule(target: Record<string, unknown>, schedule: EventCalendarSchedule): void {
	target.start = cloneScheduleValue(schedule.start);
	target.end = cloneScheduleValue(schedule.end);
	if (schedule.allDay) target.allDay = true;
	else delete target.allDay;
}

function cloneRecurrenceRule<TDate extends Date | EventCalendarDateOnly>(
	rule: EventCalendarRecurrenceRule<TDate>
): EventCalendarRecurrenceRule<TDate> {
	return {
		...rule,
		...(rule.until === undefined ? {} : { until: cloneScheduleValue(rule.until) }),
		...(rule.byWeekday
			? {
					byWeekday: rule.byWeekday.map((weekday) =>
						typeof weekday === 'string' ? weekday : { ...weekday }
					)
				}
			: {}),
		...(rule.byMonthDay ? { byMonthDay: [...rule.byMonthDay] } : {}),
		...(rule.byMonth ? { byMonth: [...rule.byMonth] } : {}),
		...(rule.exDates ? { exDates: rule.exDates.map(cloneScheduleValue) } : {}),
		...(rule.rDates ? { rDates: rule.rDates.map(cloneScheduleValue) } : {})
	};
}

function cloneScheduleValue<T extends Date | EventCalendarDateOnly>(value: T): T {
	return (value instanceof Date ? new Date(value) : value) as T;
}
