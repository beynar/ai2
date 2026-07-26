export type EventCalendarErrorCode =
	| 'invalid-prop'
	| 'invalid-item'
	| 'duplicate-item-id'
	| 'invalid-resource'
	| 'invalid-view'
	| 'invalid-time-zone'
	| 'invalid-recurrence'
	| 'unsupported-recurrence'
	| 'recurrence-limit'
	| 'invalid-adjustment'
	| 'missing-target'
	| 'stale-transaction';

/** A validation or state error owned by EventCalendar. */
export class EventCalendarError extends Error {
	readonly name = 'EventCalendarError';

	constructor(
		readonly code: EventCalendarErrorCode,
		message: string,
		readonly details?: Readonly<Record<string, unknown>>
	) {
		super(message);
	}
}
