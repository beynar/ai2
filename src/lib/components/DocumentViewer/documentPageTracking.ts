export interface DocumentUnitBounds {
	unit: number;
	start: number;
	end: number;
}

export const getDocumentUnitAtReadingPosition = (
	currentUnit: number,
	viewportStart: number,
	viewportSize: number,
	units: Iterable<DocumentUnitBounds>
) => {
	const viewportEnd = viewportStart + viewportSize;
	const readingPosition = viewportStart + viewportSize * 0.35;
	let closestUnit = currentUnit;
	let closestDistance = Number.POSITIVE_INFINITY;

	for (const unit of units) {
		if (unit.end <= viewportStart || unit.start >= viewportEnd) continue;
		const distance =
			readingPosition < unit.start
				? unit.start - readingPosition
				: readingPosition > unit.end
					? readingPosition - unit.end
					: 0;
		if (distance >= closestDistance) continue;
		closestDistance = distance;
		closestUnit = unit.unit;
	}

	return closestUnit;
};
