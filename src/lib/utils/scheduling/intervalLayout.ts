export type SchedulingInterval = Readonly<{
	key: string;
	start: number;
	end: number;
	priority?: number;
}>;

export type SchedulingLaneInterval = SchedulingInterval &
	Readonly<{
		startIndex: number;
		endIndex: number;
	}>;

export type SchedulingLanePlacement = Readonly<{
	key: string;
	startIndex: number;
	endIndex: number;
	lane: number;
}>;

export type SchedulingOverlapPlacement = Readonly<{
	key: string;
	column: number;
	columnCount: number;
	span: number;
	visualStart: number;
	visualEnd: number;
	isZeroDuration: boolean;
}>;

export type SchedulingLaneLayout = Readonly<{
	placements: readonly SchedulingLanePlacement[];
	laneCount: number;
}>;

export type SchedulingOverlapLayout = Readonly<{
	placements: readonly SchedulingOverlapPlacement[];
	columnCount: number;
}>;

type MutableOverlapPlacement = {
	key: string;
	column: number;
	columnCount: number;
	span: number;
	visualStart: number;
	visualEnd: number;
	isZeroDuration: boolean;
	cluster: number;
};

export function packSchedulingLanes(
	intervals: readonly SchedulingLaneInterval[]
): SchedulingLaneLayout {
	validateIntervals(intervals);
	for (const interval of intervals) {
		if (!Number.isInteger(interval.startIndex) || !Number.isInteger(interval.endIndex)) {
			throw new TypeError('Scheduling lane indexes must be integers.');
		}
		if (interval.endIndex <= interval.startIndex) {
			throw new RangeError('Scheduling lane endIndex must follow startIndex.');
		}
	}

	const laneEnds: number[] = [];
	const placements: SchedulingLanePlacement[] = [];
	const ordered = [...intervals].sort((left, right) => {
		if (left.startIndex !== right.startIndex) return left.startIndex - right.startIndex;
		if (left.endIndex !== right.endIndex) return right.endIndex - left.endIndex;
		return compareSchedulingIntervals(left, right);
	});

	for (const interval of ordered) {
		let lane = laneEnds.findIndex((endIndex) => endIndex <= interval.startIndex);
		if (lane < 0) {
			lane = laneEnds.length;
			laneEnds.push(interval.endIndex);
		} else {
			laneEnds[lane] = interval.endIndex;
		}
		placements.push({
			key: interval.key,
			startIndex: interval.startIndex,
			endIndex: interval.endIndex,
			lane
		});
	}

	return { placements, laneCount: laneEnds.length };
}

export function packSchedulingOverlaps(
	intervals: readonly SchedulingInterval[],
	visualMinimum: number
): SchedulingOverlapLayout {
	validateIntervals(intervals);
	if (!Number.isFinite(visualMinimum) || visualMinimum <= 0) {
		throw new RangeError('Scheduling visualMinimum must be a positive finite number.');
	}

	const ordered = intervals
		.map((interval) => ({
			...interval,
			visualEnd: interval.end === interval.start ? interval.start + visualMinimum : interval.end
		}))
		.sort((left, right) => {
			if (left.start !== right.start) return left.start - right.start;
			if (left.visualEnd !== right.visualEnd) return right.visualEnd - left.visualEnd;
			return compareSchedulingIntervals(left, right);
		});
	const placements: MutableOverlapPlacement[] = [];
	const clusters: Array<{ start: number; end: number; columns: number[][] }> = [];
	let active: Array<{ end: number; column: number }> = [];
	let freeColumns: number[] = [];
	let cluster = -1;

	for (const interval of ordered) {
		active = active.filter((entry) => {
			if (entry.end > interval.start) return true;
			insertSorted(freeColumns, entry.column);
			return false;
		});
		if (active.length === 0) {
			cluster += 1;
			freeColumns = [];
			clusters.push({ start: placements.length, end: placements.length, columns: [] });
		}
		const column = freeColumns.shift() ?? active.length;
		active.push({ end: interval.visualEnd, column });
		active.sort((left, right) => left.end - right.end || left.column - right.column);
		const clusterRecord = clusters[cluster];
		const columnIntervals = clusterRecord.columns[column] ?? [];
		columnIntervals.push(placements.length);
		clusterRecord.columns[column] = columnIntervals;
		clusterRecord.end = placements.length + 1;
		placements.push({
			key: interval.key,
			column,
			columnCount: 0,
			span: 1,
			visualStart: interval.start,
			visualEnd: interval.visualEnd,
			isZeroDuration: interval.start === interval.end,
			cluster
		});
	}

	for (const clusterRecord of clusters) {
		const columnCount = clusterRecord.columns.length;
		const columnMaximumEnds = clusterRecord.columns.map((indexes) =>
			getColumnMaximumEnds(placements, indexes)
		);
		for (let index = clusterRecord.start; index < clusterRecord.end; index += 1) {
			const placement = placements[index];
			placement.columnCount = columnCount;
			for (let column = placement.column + 1; column < columnCount; column += 1) {
				if (
					columnHasOverlap(
						placements,
						clusterRecord.columns[column],
						columnMaximumEnds[column],
						placement
					)
				)
					break;
				placement.span += 1;
			}
		}
	}

	return {
		placements: placements.map((placement) => ({
			key: placement.key,
			column: placement.column,
			columnCount: placement.columnCount,
			span: placement.span,
			visualStart: placement.visualStart,
			visualEnd: placement.visualEnd,
			isZeroDuration: placement.isZeroDuration
		})),
		columnCount: clusters.reduce(
			(maximum, clusterRecord) => Math.max(maximum, clusterRecord.columns.length),
			0
		)
	};
}

function compareSchedulingIntervals(left: SchedulingInterval, right: SchedulingInterval): number {
	if (left.start !== right.start) return left.start - right.start;
	const leftDuration = left.end - left.start;
	const rightDuration = right.end - right.start;
	if (leftDuration !== rightDuration) return rightDuration - leftDuration;
	const leftPriority = left.priority ?? 0;
	const rightPriority = right.priority ?? 0;
	if (leftPriority !== rightPriority) return rightPriority - leftPriority;
	return left.key < right.key ? -1 : left.key > right.key ? 1 : 0;
}

function validateIntervals(intervals: readonly SchedulingInterval[]): void {
	if (!Array.isArray(intervals)) throw new TypeError('Scheduling intervals must be an array.');
	const keys = new Set<string>();
	for (const interval of intervals) {
		if (!interval || typeof interval !== 'object' || typeof interval.key !== 'string') {
			throw new TypeError('Every scheduling interval requires a string key.');
		}
		if (keys.has(interval.key)) throw new RangeError(`Duplicate scheduling key: ${interval.key}.`);
		keys.add(interval.key);
		if (!Number.isFinite(interval.start) || !Number.isFinite(interval.end)) {
			throw new TypeError(`Scheduling interval ${interval.key} requires finite boundaries.`);
		}
		if (interval.end < interval.start) {
			throw new RangeError(`Scheduling interval ${interval.key} ends before it starts.`);
		}
		if (interval.priority !== undefined && !Number.isFinite(interval.priority)) {
			throw new TypeError(`Scheduling interval ${interval.key} priority must be finite.`);
		}
	}
}

function columnHasOverlap(
	placements: readonly MutableOverlapPlacement[],
	indexes: readonly number[],
	maximumEnds: readonly number[],
	target: SchedulingOverlapPlacement
): boolean {
	let low = 0;
	let high = indexes.length;
	while (low < high) {
		const middle = Math.floor((low + high) / 2);
		if (placements[indexes[middle]].visualStart < target.visualEnd) low = middle + 1;
		else high = middle;
	}
	return low > 0 && maximumEnds[low - 1] > target.visualStart;
}

function getColumnMaximumEnds(
	placements: readonly MutableOverlapPlacement[],
	indexes: readonly number[]
): readonly number[] {
	const maximumEnds: number[] = [];
	let maximum = Number.NEGATIVE_INFINITY;
	for (const index of indexes) {
		maximum = Math.max(maximum, placements[index].visualEnd);
		maximumEnds.push(maximum);
	}
	return maximumEnds;
}

function insertSorted(values: number[], value: number): void {
	let index = 0;
	while (index < values.length && values[index] < value) index += 1;
	values.splice(index, 0, value);
}
