export function getGanttValueSignature(value: unknown): string {
	return resolveValueSignature(value, new Map<object, number>());
}

function resolveValueSignature(value: unknown, seen: Map<object, number>): string {
	if (value === null) return 'null';
	if (value instanceof Date) return `date:${value.toISOString()}`;

	const valueType = typeof value;
	if (valueType === 'string') return `string:${JSON.stringify(value)}`;
	if (valueType === 'number') return `number:${Object.is(value, -0) ? '-0' : String(value)}`;
	if (valueType === 'boolean') return `boolean:${String(value)}`;
	if (valueType === 'undefined') return 'undefined';
	if (valueType === 'bigint') return `bigint:${String(value)}`;
	if (valueType === 'symbol') return `symbol:${String(value)}`;
	if (valueType === 'function') return `function:${String(value)}`;

	const objectValue = value as object;
	const seenIndex = seen.get(objectValue);
	if (seenIndex !== undefined) return `reference:${seenIndex}`;
	seen.set(objectValue, seen.size);

	if (Array.isArray(objectValue)) {
		return `array:[${objectValue.map((entry) => resolveValueSignature(entry, seen)).join(',')}]`;
	}
	if (objectValue instanceof Map) {
		return `map:[${Array.from(
			objectValue.entries(),
			([key, entry]) => `${resolveValueSignature(key, seen)}=>${resolveValueSignature(entry, seen)}`
		).join(',')}]`;
	}
	if (objectValue instanceof Set) {
		return `set:[${Array.from(objectValue, (entry) => resolveValueSignature(entry, seen)).join(
			','
		)}]`;
	}

	const record = objectValue as Record<string, unknown>;
	return `object:{${Object.keys(record)
		.filter((key) => record[key] !== undefined)
		.sort()
		.map((key) => `${JSON.stringify(key)}:${resolveValueSignature(record[key], seen)}`)
		.join(',')}}`;
}
