export function compareScheduleValues(
	leftStart: number,
	leftEnd: number,
	leftPriority: number,
	leftKey: string,
	rightStart: number,
	rightEnd: number,
	rightPriority: number,
	rightKey: string
): number {
	if (leftStart !== rightStart) return leftStart - rightStart;
	const leftDuration = leftEnd - leftStart;
	const rightDuration = rightEnd - rightStart;
	if (leftDuration !== rightDuration) return rightDuration - leftDuration;
	if (leftPriority !== rightPriority) return rightPriority - leftPriority;
	return leftKey < rightKey ? -1 : leftKey > rightKey ? 1 : 0;
}
