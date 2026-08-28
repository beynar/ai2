export function unsupportedDiscriminant(value: unknown, path: string): never {
	throw new TypeError(`[Chart] ${path} "${String(readDiscriminant(value))}" is not supported.`);
}

function readDiscriminant(value: unknown): unknown {
	return typeof value === 'object' && value !== null && 'type' in value ? value.type : value;
}
