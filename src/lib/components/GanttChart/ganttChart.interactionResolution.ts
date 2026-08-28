import type { GanttInteractionBlockedInfo } from './ganttChart.types.js';

export type GanttInteractionResolution<TProposal> =
	| Readonly<{ state: 'pending' }>
	| Readonly<{ state: 'accepted'; proposal: TProposal }>
	| Readonly<{
			state: 'rejected';
			proposal: TProposal | null;
			reason: GanttInteractionBlockedInfo['reason'];
			message: string;
	  }>;

export const pendingGanttInteraction: GanttInteractionResolution<never> = {
	state: 'pending'
};

export function acceptGanttInteraction<TProposal>(
	proposal: TProposal
): GanttInteractionResolution<TProposal> {
	return { state: 'accepted', proposal };
}

export function rejectGanttInteraction<TProposal>(
	reason: GanttInteractionBlockedInfo['reason'],
	message: string,
	proposal: TProposal | null = null
): GanttInteractionResolution<TProposal> {
	return { state: 'rejected', proposal, reason, message };
}
