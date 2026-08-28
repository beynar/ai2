export function toMapError(value: unknown, fallback: string): Error {
	if (value instanceof Error) {
		return value;
	}

	const message =
		typeof value === 'string'
			? value
			: value && typeof value === 'object' && 'message' in value && typeof value.message === 'string'
				? value.message
				: fallback;

	return new Error(message, { cause: value });
}

export function reportMapError(error: Error, onerror: ((error: Error) => void) | undefined): void {
	if (onerror) {
		onerror(error);
		return;
	}

	console.error(error);
}
