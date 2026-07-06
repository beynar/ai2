export const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
export const MINUTE_IN_MILLISECONDS = 60 * 1000;

export type TimeInputValueUnit =
	'minuteSinceMidnight' | 'secondSinceMidnight' | 'millisecondSinceMidnight';

export type TimeOption = {
	value: number;
	label: string;
};

export const normalizeTimeValue = (value: number, unit: TimeInputValueUnit) => {
	return unit === 'minuteSinceMidnight'
		? value * 60000
		: unit === 'secondSinceMidnight'
			? value * 1000
			: value;
};

export const denormalizeTimeValue = (value: number, unit: TimeInputValueUnit) => {
	return unit === 'minuteSinceMidnight'
		? value / 60000
		: unit === 'secondSinceMidnight'
			? value / 1000
			: value;
};

export const createTimeOptions = (minimum: number, maximum: number): TimeOption[] => {
	const start = Math.trunc(minimum);
	const end = Math.trunc(maximum);

	if (start > end) {
		return [];
	}

	return Array.from({ length: end - start + 1 }, (_, index) => {
		const optionValue = start + index;

		return {
			value: optionValue,
			label: optionValue.toString().padStart(2, '0')
		};
	});
};

export const getActiveTimeOption = (options: TimeOption[], activeValue: number | null) => {
	const activeOption = options.find((option) => option.value === activeValue);

	return activeOption?.value ?? options[0]?.value ?? 0;
};
