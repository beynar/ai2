import type { EventCalendarInteractionBlockedInfo } from './eventCalendar.types.js';

export type EventCalendarInteractionResolution<TProposal> =
	| Readonly<{ state: 'pending' }>
	| Readonly<{ state: 'accepted'; proposal: TProposal }>
	| Readonly<{
			state: 'rejected';
			proposal: TProposal | null;
			reason: EventCalendarInteractionBlockedInfo['reason'];
			message: string;
	  }>;

export const pendingEventCalendarInteraction: EventCalendarInteractionResolution<never> = {
	state: 'pending'
};

export function acceptEventCalendarInteraction<TProposal>(
	proposal: TProposal
): EventCalendarInteractionResolution<TProposal> {
	return { state: 'accepted', proposal };
}

export function rejectEventCalendarInteraction<TProposal>(
	reason: EventCalendarInteractionBlockedInfo['reason'],
	proposal: TProposal | null = null
): EventCalendarInteractionResolution<TProposal> {
	return { state: 'rejected', proposal, reason, message: getRejectionMessage(reason) };
}

function getRejectionMessage(reason: EventCalendarInteractionBlockedInfo['reason']): string {
	switch (reason) {
		case 'business-hours':
			return 'The proposal is outside business hours.';
		case 'custom-policy':
			return 'The consumer policy rejected the proposal.';
		case 'disabled':
			return 'Calendar mutations are disabled.';
		case 'invalid-target':
			return 'The proposal has no valid calendar target.';
		case 'overlap':
			return 'The proposal conflicts with another event.';
		case 'read-only':
			return 'The target resource is read-only.';
		case 'stale':
			return 'The controlled calendar model changed during the operation.';
		case 'valid-range':
			return 'The proposal is outside the valid calendar range.';
	}
}
