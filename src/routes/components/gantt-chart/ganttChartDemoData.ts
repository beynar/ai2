import type { GanttCalendar } from '$lib/components/GanttChart/index.js';

export const parisProjectCalendar = {
	id: 'paris-project',
	title: 'Paris project calendar',
	timeZone: 'Europe/Paris',
	workingWeekdays: [1, 2, 3, 4, 5],
	workingIntervals: [{ start: '09:00', end: '17:00' }],
	exceptions: [{ date: '2026-08-15', type: 'non-working' }]
} satisfies GanttCalendar;

export const parisFourDayCalendar = {
	id: 'paris-four-day',
	title: 'Four-day resource calendar',
	timeZone: 'Europe/Paris',
	workingWeekdays: [1, 2, 3, 4],
	workingIntervals: [{ start: '09:00', end: '17:00' }]
} satisfies GanttCalendar;

export const newYorkProjectCalendar = {
	id: 'new-york-project',
	title: 'New York project calendar',
	timeZone: 'America/New_York',
	workingWeekdays: [1, 2, 3, 4, 5],
	workingIntervals: [{ start: '09:00', end: '17:00' }]
} satisfies GanttCalendar;
